/* Asung IMS — 내보내기(Export) 공용 (exp-2 · 2026-10-26 · 대화 Claude)
   ─────────────────────────────────────────────
   판정 699 · 700 · 759 ~ 764 · deferred 300 — Products · Customers · Suppliers 목록의 「↓ Export…」
   ⭐ 칸 목록도 · 값도 DB 창구가 정한다(판정 763) — 화면은 고르게 하고 CSV 로 쓰기만 한다
      export_columns(p_kind) → {kind, columns:[{key, label, group, default, text}]} · 고를 수 없는 칸은 목록에 없다
      product_export · customer_export · supplier_export(지금 목록의 거르기 + p_columns) →
        {kind, total, row_count, truncated, columns:[{key, label, text}], rows:[[…]], forced_filter?}
   ⭐ 고른 칸은 이 브라우저에 기억(localStorage ims_export_cols_<kind> · 직원 · PC 마다 따로 · 업무 값 아님)
   ⭐ text 칸(SKU · 바코드 …)은 ="…" — 엑셀이 숫자로 바꾸거나 앞 0 을 지우지 않게(판정 628)
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js → ims-export.js
   쓰는 법: imsExport.open({ sb, kind: "product", title: "Export products", file: "products",
                             args: () => ({ p_q: …, … }), note: "" })
*/
(function () {
  "use strict";
  const BUILD = "2026-10-26 · export v1";
  const RPC = { product: "product_export", customer: "customer_export", supplier: "supplier_export" };
  const NOUN = { product: "products", customer: "customers", supplier: "suppliers" };
  const e = (v) => (window.esc ? window.esc(v) : String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(new Date());
  const fmtN = (n) => Number(n || 0).toLocaleString("en-CA");
  const keyOf = (kind) => "ims_export_cols_" + kind;

  function loadPicks(kind) {
    try { const v = JSON.parse(localStorage.getItem(keyOf(kind)) || "null"); return Array.isArray(v) ? v : null; }
    catch (err) { return null; }
  }
  function savePicks(kind, keys) {
    try { localStorage.setItem(keyOf(kind), JSON.stringify(keys)); } catch (err) { /* 저장 못 해도 내보내기는 된다 */ }
  }

  /* CSV — 다른 화면(stock · so · po)과 같은 꼴: UTF-8 BOM · CRLF · 필요할 때만 따옴표 */
  function csvCell(v) {
    if (v === null || v === undefined) return "";
    const t = String(v);
    return /[",\r\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
  }
  function cellValue(v, isText) {
    if (v === null || v === undefined || v === "") return "";
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (typeof v === "object") return JSON.stringify(v);
    if (isText) return '="' + String(v).replace(/"/g, '""') + '"';
    return v;
  }
  function download(name, rows) {
    const txt = "\uFEFF" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], { type: "text/csv;charset=utf-8" }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  /* 이 창에만 쓰는 꼴 — 공통 .pomodal · .pobox · .pobtn 위에 칸 격자만 더한다 */
  function style() {
    if (document.getElementById("imxStyle")) return;
    const s = document.createElement("style");
    s.id = "imxStyle";
    s.textContent =
      ".imx-intro{font-size:12.5px;color:var(--muted);margin:0 0 12px}" +
      ".imx-note{font-size:12.5px;color:var(--warn);margin:-4px 0 12px}" +
      ".imx-grp{border:1px solid var(--line);border-radius:10px;margin-bottom:10px}" +
      ".imx-gh{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#fafbfd;border-bottom:1px solid var(--line);border-radius:10px 10px 0 0;font-size:12.5px;font-weight:700}" +
      ".imx-gh .n{font-weight:400;color:var(--muted)}" +
      ".imx-gh .sp{flex:1}" +
      ".imx-mini{border:1px solid var(--line);background:#fff;border-radius:7px;padding:2px 8px;font:inherit;font-size:11.5px;cursor:pointer;color:var(--muted)}" +
      ".imx-mini:hover{background:#f2f4f8;color:var(--ink)}" +
      ".imx-cols{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:2px 12px;padding:8px 10px}" +
      ".imx-cols label{display:flex;align-items:center;gap:6px;font-size:12.5px;padding:3px 0;cursor:pointer;user-select:none}" +
      ".imx-stat{font-size:12.5px;color:var(--muted)}" +
      ".imx-stat.ok{color:var(--good)}" +
      ".imx-stat.bad{color:var(--bad)}";
    document.head.appendChild(s);
  }

  function shell() {
    let m = document.getElementById("imxModal");
    if (!m) {
      m = document.createElement("div");
      m.className = "pomodal"; m.id = "imxModal"; m.hidden = true;
      m.innerHTML = '<div class="pobox" id="imxBox" role="dialog" aria-modal="true" aria-labelledby="imxTitle"></div>';
      document.body.appendChild(m);
    }
    return m;
  }

  function open(opt) {
    if (!opt || !opt.sb || !RPC[opt.kind]) return;
    style();
    const sb = opt.sb, kind = opt.kind, noun = NOUN[kind];
    const m = shell(), box = document.getElementById("imxBox");
    let cols = [], busy = false, done = false;

    const close = () => { if (busy) return; m.hidden = true; box.innerHTML = ""; document.removeEventListener("keydown", onKey); };
    const onKey = (ev) => { if (ev.key === "Escape") close(); };
    m.onclick = (ev) => { if (ev.target === m) close(); };
    document.addEventListener("keydown", onKey);

    box.innerHTML = `<h4 id="imxTitle">${e(opt.title || "Export")}</h4>
      <div class="pbody"><div class="msg">Loading columns…</div></div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn" data-x="close">Close</button></div>`;
    box.querySelector('[data-x="close"]').onclick = close;
    m.hidden = false;

    sb.rpc("export_columns", { p_kind: kind }).then(({ data, error }) => {
      if (error) { fail(error.message); return; }
      cols = (data && data.columns) || [];
      if (!cols.length) { fail("There are no columns you can export from this list."); return; }
      draw();
    }, (err) => fail(err && err.message ? err.message : String(err)));

    function fail(msg) {
      box.querySelector(".pbody").innerHTML = `<div class="msg err">${e(msg)}</div>`;
    }

    function draw() {
      const saved = loadPicks(kind);
      const avail = new Set(cols.map((c) => c.key));
      const keep = saved ? saved.filter((k) => avail.has(k)) : [];
      const on = new Set(keep.length ? keep : cols.filter((c) => c.default).map((c) => c.key));
      const groups = [];
      cols.forEach((c) => {
        let g = groups.find((x) => x.name === c.group);
        if (!g) { g = { name: c.group || "Other", cols: [] }; groups.push(g); }
        g.cols.push(c);
      });
      const body = box.querySelector(".pbody");
      body.innerHTML =
        `<p class="imx-intro">The file has one row for each of the ${e(noun)} that match the filters on this list now — every page, not just the one on screen. Pick the columns to put in it.</p>` +
        (opt.note ? `<p class="imx-note">${e(opt.note)}</p>` : "") +
        groups.map((g, gi) => `<div class="imx-grp">
          <div class="imx-gh">${e(g.name)} <span class="n" data-gn="${gi}"></span><span class="sp"></span>
            <button class="imx-mini" data-ga="${gi}">All</button><button class="imx-mini" data-gz="${gi}">None</button></div>
          <div class="imx-cols">${g.cols.map((c) => `<label><input type="checkbox" data-k="${e(c.key)}"${on.has(c.key) ? " checked" : ""}> ${e(c.label)}</label>`).join("")}</div>
        </div>`).join("");
      const foot = box.querySelector(".pfoot");
      foot.innerHTML = `<button class="pobtn" data-x="dflt">Defaults</button>
        <button class="pobtn" data-x="all">All</button>
        <button class="pobtn" data-x="none">None</button>
        <span class="sp"></span><span class="imx-stat" id="imxStat"></span>
        <button class="pobtn" data-x="close">Cancel</button>
        <button class="pobtn go" data-x="go">Download CSV</button>`;

      const boxes = () => Array.from(body.querySelectorAll("input[data-k]"));
      const picked = () => boxes().filter((b) => b.checked).map((b) => b.getAttribute("data-k"));
      const stat = (txt, cls) => { const s = document.getElementById("imxStat"); s.textContent = txt; s.className = "imx-stat" + (cls ? " " + cls : ""); };
      const count = () => {
        groups.forEach((g, gi) => {
          const n = g.cols.filter((c) => { const b = body.querySelector(`input[data-k="${CSS.escape(c.key)}"]`); return b && b.checked; }).length;
          body.querySelector(`[data-gn="${gi}"]`).textContent = n + " of " + g.cols.length;
        });
        const n = picked().length;
        if (!done) stat(n ? n + (n === 1 ? " column" : " columns") : "Pick at least one column");
        foot.querySelector('[data-x="go"]').disabled = !n || busy;
      };
      const setAll = (list, v) => { list.forEach((c) => { const b = body.querySelector(`input[data-k="${CSS.escape(c.key)}"]`); if (b) b.checked = v; }); done = false; count(); };

      body.onchange = () => { done = false; count(); };
      groups.forEach((g, gi) => {
        body.querySelector(`[data-ga="${gi}"]`).onclick = () => setAll(g.cols, true);
        body.querySelector(`[data-gz="${gi}"]`).onclick = () => setAll(g.cols, false);
      });
      foot.querySelector('[data-x="all"]').onclick = () => setAll(cols, true);
      foot.querySelector('[data-x="none"]').onclick = () => setAll(cols, false);
      foot.querySelector('[data-x="dflt"]').onclick = () => {
        boxes().forEach((b) => { const c = cols.find((x) => x.key === b.getAttribute("data-k")); b.checked = !!(c && c.default); });
        done = false; count();
      };
      foot.querySelector('[data-x="close"]').onclick = close;
      foot.querySelector('[data-x="go"]').onclick = go;
      count();

      async function go() {
        const keys = cols.map((c) => c.key).filter((k) => picked().includes(k));   // 목록 순서 그대로
        if (!keys.length || busy) return;
        busy = true; done = false;
        const btn = foot.querySelector('[data-x="go"]');
        btn.disabled = true; btn.textContent = "Preparing…"; stat("Reading every row — this can take a few seconds");
        try {
          const args = Object.assign({}, typeof opt.args === "function" ? opt.args() : (opt.args || {}), { p_columns: keys });
          const { data, error } = await sb.rpc(RPC[kind], args);
          if (error) throw error;
          const dc = (data && data.columns) || [];
          const out = [dc.map((c) => c.label)];
          ((data && data.rows) || []).forEach((r) => { out.push(dc.map((c, i) => cellValue(r[i], c.text))); });
          download(`${opt.file || noun}-${today()}.csv`, out);
          savePicks(kind, keys);
          done = true;
          let msg = `Downloaded ${fmtN(data.row_count)} ${data.row_count === 1 ? "row" : "rows"}`;
          if (data.truncated) msg += ` — only the first ${fmtN(data.row_count)} of ${fmtN(data.total)}. Narrow the filters to get the rest`;
          else msg += ".";
          if (data.forced_filter) msg += " Active, purchasable suppliers only.";
          stat(msg, data.truncated ? "bad" : "ok");
          foot.querySelector('[data-x="close"]').textContent = "Close";
        } catch (err) {
          stat((err && err.message) ? err.message : String(err), "bad");
        } finally {
          busy = false; btn.textContent = "Download CSV"; btn.disabled = !picked().length;
        }
      }
    }
  }

  window.imsExport = { open, build: BUILD };
})();
