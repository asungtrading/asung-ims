/* Asung IMS — 연체 알림(Overdue) 공용 (ovd-2 · 2026-10-26 · 대화 Claude)
   ─────────────────────────────────────────────
   판정 768 ~ 771 · asung-wms ovd-1 57156b2 — 손님을 고르는 순간(POS · 새 SO) 청구처에 기한이 지난 인보이스가 있으면 창
   ⭐ 셈은 DB 한 곳 — so_customer_overdue(p_customer_id) → {bill_to_name, bill_to_differs, count, oldest_days,
        by_currency:[{currency_code, count, amount}], invoices:[상위 10], available:[{currency_code, available}]}
   ⭐ 막지 않는다 — OK 를 눌러야 닫힌다(바깥 클릭 · Esc 로 닫히지 않는다 · 판정 769)
   ⭐ 기한 지난 것만(판정 768 · C.B.S 도 여유 0일 · 판정 770) · 받아 둔 돈 · 크레딧이 있으면 한 줄(판정 771)
   ⚠️ 읽기가 실패하면 조용히 넘어간다(오더를 막지 않는다) · 콘솔에만
   쓰는 법: imsOverdue.check(sb, customerId)   // Promise — 창이 없으면 바로, 있으면 OK 를 누른 뒤 끝난다
*/
(function () {
  "use strict";
  const BUILD = "2026-10-26 · overdue v1";
  const e = (v) => (window.esc ? window.esc(v) : String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const amt = (n) => Number(n || 0).toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const plural = (n, one, many) => `${n} ${Number(n) === 1 ? one : many}`;

  function style() {
    if (document.getElementById("ovdStyle")) return;
    const s = document.createElement("style");
    s.id = "ovdStyle";
    s.textContent =
      ".ovd-head{font-size:14px;line-height:1.55;margin:0 0 10px}" +
      ".ovd-head b{color:var(--bad)}" +
      ".ovd-sums{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}" +
      ".ovd-sum{border:1px solid #f1c4c0;background:#fdf3f2;color:var(--bad);border-radius:8px;padding:4px 10px;font-size:13px;font-weight:600}" +
      ".ovd-tbl{width:100%;border-collapse:collapse;font-size:12.5px}" +
      ".ovd-tbl th{text-align:left;color:var(--muted);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.03em;border-bottom:1px solid var(--line);padding:5px 6px}" +
      ".ovd-tbl td{border-bottom:1px solid var(--line);padding:5px 6px}" +
      ".ovd-tbl td.num,.ovd-tbl th.num{text-align:right;font-variant-numeric:tabular-nums}" +
      ".ovd-more{font-size:12px;color:var(--muted);margin-top:6px}" +
      ".ovd-avail{font-size:12.5px;color:var(--good);margin-top:12px}" +
      ".ovd-note{font-size:12px;color:var(--muted);margin-top:10px}";
    document.head.appendChild(s);
  }

  function show(d) {
    style();
    let m = document.getElementById("ovdModal");
    if (!m) {
      m = document.createElement("div");
      m.className = "pomodal"; m.id = "ovdModal"; m.hidden = true;
      m.innerHTML = '<div class="pobox" role="alertdialog" aria-modal="true" aria-labelledby="ovdTitle" id="ovdBox"></div>';
      document.body.appendChild(m);
    }
    const box = document.getElementById("ovdBox");
    const sums = (d.by_currency || []).map((c) => `<span class="ovd-sum">${e(c.currency_code)} ${amt(c.amount)} <span style="font-weight:400">· ${plural(c.count, "invoice", "invoices")}</span></span>`).join("");
    const inv = d.invoices || [];
    const rows = inv.map((v) => `<tr><td class="mono">${e(v.invoice_number)}</td><td>${e(v.due_on || "")}</td>
        <td class="num">${e(v.days_overdue)}</td><td class="num">${e(v.currency_code)} ${amt(v.remaining)}</td></tr>`).join("");
    const avail = (d.available || []).filter((a) => Number(a.available) > 0);
    box.innerHTML = `<h4 id="ovdTitle">Overdue invoices</h4>
      <div class="pbody">
        <p class="ovd-head">${d.bill_to_differs ? `This customer is billed to ${e(d.bill_to_name)}, which` : e(d.bill_to_name || "This customer")} has <b>${plural(d.count, "overdue invoice", "overdue invoices")}</b> — the oldest is ${plural(d.oldest_days, "day", "days")} past due.</p>
        <div class="ovd-sums">${sums}</div>
        <table class="ovd-tbl"><thead><tr><th>Invoice</th><th>Due</th><th class="num">Days overdue</th><th class="num">Still owed</th></tr></thead><tbody>${rows}</tbody></table>
        ${Number(d.count) > inv.length ? `<div class="ovd-more">… and ${Number(d.count) - inv.length} more — see Sales Invoices.</div>` : ""}
        ${avail.length ? `<div class="ovd-avail">Money already received or credit on account, not yet applied: ${avail.map((a) => `${e(a.currency_code)} ${amt(a.available)}`).join(" · ")} — it can go against these invoices.</div>` : ""}
        <div class="ovd-note">This does not stop the order. It is a reminder to ask about payment.</div>
      </div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn go" id="ovdOk">OK</button></div>`;
    m.hidden = false;
    return new Promise((resolve) => {
      const ok = document.getElementById("ovdOk");
      ok.onclick = () => { m.hidden = true; box.innerHTML = ""; resolve(); };
      setTimeout(() => ok.focus(), 30);
    });
  }

  async function check(sb, customerId) {
    if (!sb || !customerId) return;
    try {
      const { data, error } = await sb.rpc("so_customer_overdue", { p_customer_id: customerId });
      if (error) { console.warn("overdue check:", error.message); return; }
      if (!data || !(Number(data.count) > 0)) return;
      await show(data);
    } catch (err) {
      console.warn("overdue check:", err && err.message ? err.message : err);
    }
  }

  window.imsOverdue = { check, build: BUILD };
})();
