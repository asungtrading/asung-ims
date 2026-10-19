/* ims-doc.js — 문서 판 그리기 (doc v1 · 2026-10-19 · 대화 Claude)
   정본: 판정 521 ~ 526 · asung-wms doc-1a 31c39cd · doc-1b1 dc3aa77 · doc-1b2 aedd043
   ⭐ 판(doc_template.body)은 로직 없는 Mustache — {{x}} 는 HTML 이스케이프 · {{#sec}} 목록 · 조건 · {{^sec}} 없을 때
   ⭐ 값의 꼴(돈 · 날짜 · %)은 DB 창구 doc_data 가 만든다 — 여기서는 셈하지 않는다
   ⚠️ 그린 판은 sandbox iframe(스크립트 · 같은 출처 없음) 안에만 넣는다 — 판에 스크립트가 섞여도 돌지 않는다(DB 검사가 먼저 막는다 · 두 겹)
   ⚠️ 판 검사의 정본은 DB(doc_template_check) — 여기에는 검사가 없다 */
(function () {
  "use strict";
  const MUSTACHE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";   // 고정 판
  let loading = null;

  function loadRenderer() {
    if (window.Mustache) return Promise.resolve(window.Mustache);
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = MUSTACHE_SRC;
      s.onload = () => window.Mustache ? resolve(window.Mustache) : reject(new Error("The document renderer did not start."));
      s.onerror = () => { loading = null; reject(new Error("Could not load the document renderer — check the internet connection and try again.")); };
      document.head.appendChild(s);
    });
    return loading;
  }

  const KINDS = ["final_invoice", "sales_order", "ship_ready", "credit_note", "internal_receipt"];
  const KIND_LBL = {
    final_invoice: "Final invoice",
    sales_order: "Sales order",
    ship_ready: "Ship Ready (proforma)",
    credit_note: "Credit note",
    internal_receipt: "Internal invoice receipt",
  };

  /* 판 + 문서 하나 → HTML 글 */
  async function render(body, doc) {
    const M = await loadRenderer();
    return M.render(String(body || ""), doc || {});   // 부분 판 없음 · 구분자 기본
  }

  /* 상자 안에 sandbox iframe 하나 — 그린 글을 넣는다 */
  function frame(box, html, opts) {
    const o = opts || {};
    box.innerHTML = "";
    const f = document.createElement("iframe");
    f.setAttribute("sandbox", "");                    // 스크립트 · 폼 · 같은 출처 · 창 열기 모두 막음
    f.setAttribute("referrerpolicy", "no-referrer");
    f.title = o.title || "Document preview";
    f.style.cssText = "width:100%;height:" + (o.height || 1050) + "px;border:1px solid var(--line,#d5dae2);border-radius:10px;background:#fff";
    f.srcdoc = html;
    box.appendChild(f);
    return f;
  }

  /* doc_data 부르기 — {kind, docs:[…]} (ship_ready 는 groups 도) */
  async function data(sb, kind, ref) {
    const { data, error } = await sb.rpc("doc_data", { p_kind: kind, p_ref: ref });
    if (error) throw new Error(error.message);
    return data;
  }

  /* Settings 미리 보기 전용 — 발행된 인보이스 하나로 Ship Ready 모양을 흉내 낸다
     (진짜 Ship Ready 는 Ship & invoice 화면의 입력으로 doc_data('ship_ready') 가 만든다) */
  function shipReadySample(doc) {
    const d = JSON.parse(JSON.stringify(doc || {}));
    d.doc = Object.assign({}, d.doc, { kind: "ship_ready", title: "PROFORMA" });
    d.invoice = Object.assign({}, d.invoice);
    d.invoice.calc_at = d.doc.printed_at || "";
    delete d.invoice.number;
    return d;
  }

  window.imsDoc = { loadRenderer, render, frame, data, shipReadySample, KINDS, KIND_LBL };
})();
