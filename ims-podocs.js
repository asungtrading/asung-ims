/* Asung IMS — PO · charge documents (drive-3 · 2026-10-24 · 대화 Claude)
   ─────────────────────────────────────────────
   판정 691 · 697 · 698 · 703 · 704 · 706 · 708 — 받은 서류(인보이스 · BOL · 원산지 · 패킹 · B3/CAD · 기타)를
   PO 화면(po.html) 또는 비용 빌 화면(charges.html)에서 올린다 → 비공개 버킷 po-documents → 창구 po_doc_add
   → 드라이브 일꾼이 IMS Documents 로 보낸다(drive_since 뒤 · drive_enabled on 일 때).
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js → ims-podocs.js
   ⚠️ 판정은 DB 가 한다 — 종류 · 크기(10 MB) · 형식(pdf · jpeg · png) · 권한(purchasing 쓰기)은 po_doc_add 가 다시 본다.
      화면의 검사는 빨리 알려 주는 것뿐이다.
   ⚠️ 치우기는 지우지 않는다 — is_active false · 드라이브에 간 것은 REMOVED_ 이름(704) · 버킷 파일은 남는다.
   쓰는 법: imsPoDocs.mount(el, { sb, poId, invoices })   또는   imsPoDocs.mount(el, { sb, chargeId })
*/
(function () {
  "use strict";
  const BUILD = "2026-10-24 · podocs v1";
  const BUCKET = "po-documents";
  const MAX = 10485760;
  const KINDS = [["invoice", "Invoice"], ["bol", "BOL"], ["coo", "Certificate of Origin"], ["packing", "Packing list"], ["b3", "B3 / CAD"], ["other", "Other"]];
  const KIND = Object.fromEntries(KINDS);
  const EXT = { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png" };
  const e = (v) => (window.esc ? window.esc(v) : String(v == null ? "" : v));
  const ts = (v) => (window.imsTs ? window.imsTs(v) : (v || ""));
  const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(new Date());
  const size = (b) => (b == null ? "" : b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");
  const canWrite = () => !!(window.imsAuth && window.imsAuth.canWrite && window.imsAuth.canWrite("purchasing"));

  async function sha256(file) {
    const buf = await file.arrayBuffer();
    const h = await crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function driveText(d) {
    const dr = d.drive || {};
    if (!d.is_active) return dr.file_id ? '<span class="dim">Renamed REMOVED_ in Drive</span>' : '<span class="dim">—</span>';
    if (dr.file_id) return `<span class="on" title="${e(dr.file_name || "")}">In Drive</span>`;
    if (dr.status === "failed") return `<span class="off" title="${e(dr.last_error || "")}">Drive failed</span>`;
    if (dr.status === "queued" || dr.status === "sending") return '<span class="dim">Waiting to go to Drive</span>';
    return '<span class="dim" title="Drive saving is not switched on for documents from this date">Not sent</span>';
  }

  function mount(el, opt) {
    if (!el || !opt || !opt.sb) return;
    const sb = opt.sb;
    const scope = opt.poId ? "po" : "charge";
    const refId = opt.poId || opt.chargeId;
    if (!refId) return;
    const invoices = opt.invoices || [];
    let showRemoved = false;

    async function load() {
      el.innerHTML = '<div class="card"><h3 class="ims-sec">Documents</h3><div class="msg">Loading…</div></div>';
      const args = scope === "po" ? { p_po_id: refId, p_charge_id: null } : { p_po_id: null, p_charge_id: refId };
      const { data, error } = await sb.rpc("po_doc_list", args);
      if (error) {
        el.innerHTML = `<div class="card"><h3 class="ims-sec">Documents</h3><div class="msg err">${e(error.message)}</div></div>`;
        return;
      }
      draw(data || []);
    }

    function draw(docs) {
      const live = docs.filter((d) => d.is_active);
      const shown = showRemoved ? docs : live;
      const nRemoved = docs.length - live.length;
      const rows = shown.map((d) => {
        const what = [d.doc_number ? `<span class="mono">${e(d.doc_number)}</span>` : "", d.description ? e(d.description) : ""].filter(Boolean).join(" · ") || '<span class="dim">—</span>';
        const also = (d.shortcuts || []).length ? `<div class="dim" style="font-size:11.5px">Also in ${(d.shortcuts || []).map((s) => e(s.po_number)).join(", ")}</div>` : "";
        const gone = d.is_active ? "" : ` <span class="tag off" title="${e(d.removed_note || "")}">Removed ${e(ts(d.removed_at))}</span>`;
        return `<tr${d.is_active ? "" : ' style="opacity:.55"'}>
          <td><span class="tag">${e(KIND[d.kind] || d.kind)}</span>${gone}</td>
          <td class="mono">${e(d.doc_date || "")}</td>
          <td>${what}${also}</td>
          <td><a class="lnk" href="#" data-view="${e(d.id)}" title="Open">${e(d.original_name)}</a> <span class="dim">${e(size(d.bytes))}</span></td>
          <td><span class="dim" style="font-size:12px">${e(ts(d.uploaded_at))}${d.uploaded_by_name ? " · " + e(d.uploaded_by_name) : ""}</span></td>
          <td>${driveText(d)}</td>
          <td style="white-space:nowrap">${d.is_active && canWrite() ? `<button class="pobtn" data-rm="${e(d.id)}">Remove</button>` : ""}</td>
        </tr>`;
      });
      el.innerHTML = `<div class="card">
        <h3 class="ims-sec">Documents <span class="n">${live.length}</span></h3>
        <div style="display:flex;gap:8px;align-items:center;padding:10px 12px;flex-wrap:wrap">
          ${canWrite() ? '<button class="pobtn go" data-up="1">Upload a document</button>' : ""}
          ${nRemoved ? `<label class="dim" style="font-size:12.5px"><input type="checkbox" data-showrm ${showRemoved ? "checked" : ""}> Show removed (${nRemoved})</label>` : ""}
          <span class="dim" style="font-size:12px;margin-left:auto">PDF, JPEG or PNG · up to 10 MB</span>
        </div>
        ${rows.length ? `<table><thead><tr><th>Kind</th><th>Date</th><th>Number · description</th><th>File</th><th>Uploaded</th><th>Drive</th><th></th></tr></thead><tbody>${rows.join("")}</tbody></table>`
                      : '<div class="msg">No documents yet.</div>'}
        <div class="posub">Invoices, BOLs, certificates of origin, packing lists, B3 / CAD and anything else that belongs to this ${scope === "po" ? "order" : "charge"}. Removing hides a document here and renames it REMOVED_ in Drive — nothing is deleted.</div>
      </div>`;
      const byId = Object.fromEntries(docs.map((d) => [d.id, d]));
      el.querySelectorAll("[data-view]").forEach((a) => { a.onclick = (ev) => { ev.preventDefault(); view(byId[a.dataset.view]); }; });
      el.querySelectorAll("[data-rm]").forEach((b) => { b.onclick = () => remove(byId[b.dataset.rm]); });
      const up = el.querySelector("[data-up]"); if (up) up.onclick = openUpload;
      const sr = el.querySelector("[data-showrm]"); if (sr) sr.onchange = () => { showRemoved = sr.checked; draw(docs); };
    }

    async function view(d) {
      if (!d) return;
      const w = window.open("", "_blank");
      const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(d.path, 120);
      if (error || !data) { if (w) w.close(); alert("Could not open the file — " + (error ? error.message : "no link")); return; }
      if (w) w.location = data.signedUrl; else window.location.href = data.signedUrl;
    }

    async function remove(d) {
      if (!d) return;
      const note = prompt(`Remove "${d.original_name}"?\n\nIt is hidden here and renamed REMOVED_ in Drive. Nothing is deleted.\n\nReason (optional):`, "");
      if (note === null) return;
      const { error } = await sb.rpc("po_doc_remove", { p_doc_id: d.id, p_note: note.trim() || null });
      if (error) { alert(error.message); return; }
      await load();
    }

    function openUpload() {
      const m = document.createElement("div");
      m.className = "pomodal";
      const invOpts = scope === "po" && invoices.length
        ? `<div class="frow" data-invrow hidden><label>Supplier invoice</label><select data-f="inv"><option value="">— not linked —</option>${invoices.map((i) => `<option value="${e(i.id)}">${e(i.invoice_number || i.number || i.id)}${i.status ? " · " + e(i.status) : ""}</option>`).join("")}</select></div>`
        : "";
      m.innerHTML = `<div class="pobox" style="max-width:560px">
        <h4>Upload a document</h4>
        <div class="pbody" style="display:flex;flex-direction:column;gap:10px">
          <div class="frow"><label>File</label><input type="file" data-f="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"></div>
          <div class="frow"><label>Kind</label><select data-f="kind">${KINDS.map(([k, l]) => `<option value="${k}">${e(l)}</option>`).join("")}</select></div>
          ${invOpts}
          <div class="frow"><label>Document number</label><input type="text" data-f="num" maxlength="80" placeholder="optional — e.g. the invoice or BOL number"></div>
          <div class="frow"><label data-desclbl>Description</label><input type="text" data-f="desc" maxlength="200" placeholder="optional"></div>
          <div class="frow"><label>Document date</label><input type="date" data-f="date" value="${e(today())}"></div>
          <div class="dim" style="font-size:12px">The date and number go into the file name in Drive. PDF, JPEG or PNG up to 10 MB.</div>
          <div data-msg class="dim" style="font-size:13px"></div>
        </div>
        <div class="pfoot"><span class="sp"></span><button class="pobtn" data-x>Cancel</button><button class="pobtn go" data-go>Upload</button></div>
      </div>`;
      document.body.appendChild(m);
      const f = (k) => m.querySelector(`[data-f="${k}"]`);
      const msg = m.querySelector("[data-msg]");
      const say = (cls, t) => { msg.className = cls; msg.textContent = t; };
      const sync = () => {
        const k = f("kind").value;
        const ir = m.querySelector("[data-invrow]"); if (ir) ir.hidden = k !== "invoice";
        m.querySelector("[data-desclbl]").textContent = k === "other" ? "Description (required)" : "Description";
        f("desc").placeholder = k === "other" ? "what is this? — e.g. Insurance certificate" : "optional";
      };
      f("kind").onchange = sync; sync();
      const close = () => m.remove();
      m.querySelector("[data-x]").onclick = close;
      m.onclick = (ev) => { if (ev.target === m) close(); };
      const go = m.querySelector("[data-go]");
      go.onclick = async () => {
        const file = f("file").files[0];
        const kind = f("kind").value;
        const desc = f("desc").value.trim();
        if (!file) return say("res err", "Choose a file.");
        const ext = EXT[file.type];
        if (!ext) return say("res err", "Only PDF, JPEG or PNG files can be uploaded.");
        if (file.size <= 0 || file.size > MAX) return say("res err", `The file is ${size(file.size)} — it must be 10 MB or less.`);
        if (kind === "other" && !desc) return say("res err", "Other needs a short description.");
        go.disabled = true; say("dim", "Uploading…");
        try {
          const hash = await sha256(file);
          const path = `${scope}/${refId}/${crypto.randomUUID()}.${ext}`;
          const upr = await sb.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false });
          if (upr.error) { go.disabled = false; return say("res err", "Upload failed — " + upr.error.message); }
          const p = { kind, description: desc || null, doc_number: f("num").value.trim() || null, doc_date: f("date").value || null,
                      original_name: file.name, path, sha256: hash };
          if (scope === "po") p.po_id = refId; else p.po_charge_id = refId;
          const inv = f("inv"); if (inv && kind === "invoice" && inv.value) p.po_invoice_id = inv.value;
          const { data, error } = await sb.rpc("po_doc_add", { p });
          if (error) { go.disabled = false; return say("res err", error.message); }
          close();
          await load();
          if (data && data.drive_file_name) console.log("podocs: Drive name", data.drive_file_name);
        } catch (err) {
          go.disabled = false; say("res err", String(err && err.message || err));
        }
      };
    }

    load();
    return { reload: load };
  }

  window.imsPoDocs = { mount, build: BUILD };
})();
