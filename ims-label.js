/* Asung IMS — 바코드 라벨 인쇄 공용 창 (lbl v1 · 2026-10-27 · 대화 Claude)
   ─────────────────────────────────────────────
   Caleb 2026-10-27(lbl-0 회신 뒤): DYMO 호환 감열 프린터 · DYMO 규격 용지 · 창고 PC(Windows) 브라우저 인쇄
     · 제품 라벨 = WMS Stock Lookup(wms-stock.html) · IMS Products 상세(products.html) — 제품에도 · 선반에도 붙인다
     · 칸 라벨   = IMS Settings → Bins(settings.html) 만 — 칸 이름 글자 그대로 바코드(Code 128)
     · 항목은 찍을 때마다 체크로 고른다(「모두 다 들어가는 게 아니야 · 선택적으로」)
     · 바코드 없는 제품 = 「No barcode」 · 여러 제품에 걸린 바코드 = 경고만(가) · 4×6 은 큰(4 인치) 프린터
   ⭐ 바코드 기호는 「저장된 글자 그대로 읽히게」(lbl-0 이견 6) — 12 자리 + 체크 맞음 = UPC-A · 13 자리 · 첫 자리 ≠ 0 · 체크 맞음 = EAN-13 ·
      8 자리 + 체크 맞음 = EAN-8 · 그 밖의 ASCII = Code 128 · ASCII 아님 = 「Barcode can't be printed」
      (WMS 스캔 대조는 btrim 뒤 정확 일치 — 0 으로 시작하는 13 자리를 EAN-13 으로 찍으면 스캐너가 12 자리를 낼 수 있다)
   ⭐ 읽기만 — product · product_barcode · ref_bin · ref_warehouse(모두 authenticated select · lbl-0 2) · 쓰기 0 · DB 창구 없음
      읽기는 loadProducts() 한 곳(판정 270 처럼 표 읽기를 닫게 되면 이 함수만 창구로 바꾼다)
   ⭐ localStorage(이 PC 만 · 업무 값 아님 · CLAUDE.md 5 절 예외 셋 — 선례 ims_pos_store):
      ims_label_size_<kind> 마지막 크기 · ims_label_fields_<kind>_<크기> 마지막 항목 · ims_label_rotate 이 PC 의 「90° 돌리기」
   ⭐ 인쇄 = 숨은 iframe(ims-doc.js printHtml 과 같은 꼴 · 스크립트 없음) — 바코드 SVG 는 이 창에서 그려 글자로 넘긴다
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js → ims-label.js · JsBarcode 는 필요할 때 이 파일이 싣는다(jsdelivr 3.11.6 — 레포 wms-picklist.js 와 같은 판)
   쓰는 법: imsLabel.open({ sb, kind:"product", productId, preferSku })   ·   imsLabel.open({ sb, kind:"bin" })
*/
(function () {
  "use strict";
  const BUILD = "2026-10-27 · lbl v1b";   // lbl v1b — 브랜드(칸 라벨의 창고 줄도) 가운데 정렬(Caleb) ← lbl v1a — SKU 가운데 정렬(Caleb 「sku의 가운데 정렬」)
  const JSB = "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js";

  /* 크기 — 읽는 방향(긴 변 = 가로) · 인치 · lbl-0 이견 2: 프린터 쪽 방향은 PC 마다 「90° 돌리기」로 맞춘다
     30321 · 30323 · 30256 · 1744907 은 대화 Claude 기억(판매처로 확인한 것은 30347 · 30332 · 30346 · 30334) */
  const SIZES = [
    { code: "30347",   w: 1.5,    h: 1,      label: "30347 — 1 × 1-1/2 in" },
    { code: "30332",   w: 1,      h: 1,      label: "30332 — 1 × 1 in" },
    { code: "30346",   w: 1.875,  h: 0.5,    label: "30346 — 1/2 × 1-7/8 in" },
    { code: "30334",   w: 2.25,   h: 1.25,   label: "30334 — 2-1/4 × 1-1/4 in" },
    { code: "30321",   w: 3.5,    h: 1.4,    label: "30321 — 1.4 × 3-1/2 in" },
    { code: "30323",   w: 4,      h: 2.125,  label: "30323 — 2-1/8 × 4 in" },
    { code: "30256",   w: 4,      h: 2.3125, label: "30256 — 2-5/16 × 4 in" },
    { code: "1744907", w: 6,      h: 4,      label: "1744907 — 4 × 6 in (4-inch printer)", big: true },
  ];
  const FIELDS = {
    product: [["sku", "SKU", true], ["barcode", "Barcode", true], ["digits", "Barcode number", true], ["name", "Name", true], ["brand", "Brand", true]],
    bin:     [["barcode", "Barcode", true], ["name", "Bin name", true], ["warehouse", "Warehouse", false]],
  };
  const MIN_MODULE_IN = 0.0075;   // 막대 한 칸이 이보다 가늘면 「스캔이 안 될 수 있음」(짐작 — 300 dpi 에서 약 2.25 점)

  const e = (v) => (window.esc ? window.esc(v) : String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (err) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (err) { /* 저장 못 해도 인쇄는 된다 */ } },
  };

  /* ── JsBarcode 싣기(한 번) ── */
  let jsbP = null;
  function loadJsBarcode() {
    if (window.JsBarcode) return Promise.resolve();
    if (jsbP) return jsbP;
    jsbP = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = JSB; s.onload = () => res(); s.onerror = () => { jsbP = null; rej(new Error("Could not load the barcode library — check the internet connection.")); };
      document.head.appendChild(s);
    });
    return jsbP;
  }

  /* ── 기호 고르기(lbl-0 4 · 이견 6) ── */
  function gtinOk(d) {
    let sum = 0;
    for (let i = d.length - 2, k = 0; i >= 0; i--, k++) sum += Number(d[i]) * (k % 2 === 0 ? 3 : 1);
    return (10 - (sum % 10)) % 10 === Number(d[d.length - 1]);
  }
  function symbology(code) {
    const s = String(code == null ? "" : code);
    if (!s) return null;
    if (/^\d{12}$/.test(s) && gtinOk(s)) return "UPC";
    if (/^[1-9]\d{12}$/.test(s) && gtinOk(s)) return "EAN13";
    if (/^\d{8}$/.test(s) && gtinOk(s)) return "EAN8";
    if (/^[\x20-\x7E]+$/.test(s)) return "CODE128";
    return null;
  }
  /* 바코드 SVG 글자 + 막대 칸 수(가로 모듈) — 실패하면 null */
  function barcodeSvg(code, format) {
    try {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      window.JsBarcode(svg, code, { format, displayValue: false, margin: 0, width: 1, height: 60, background: "#ffffff", lineColor: "#000000" });
      const w = parseFloat(svg.getAttribute("width")) || 0, h = parseFloat(svg.getAttribute("height")) || 60;   // JsBarcode 는 "116px" 처럼 단위를 붙인다
      if (!w) return null;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.removeAttribute("width"); svg.removeAttribute("height"); svg.removeAttribute("style");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("shape-rendering", "crispEdges");
      return { svg: svg.outerHTML, modules: w };
    } catch (err) { return null; }
  }

  /* ── 라벨 한 장의 HTML(인치) — 화면 미리 보기 · 인쇄가 같은 것을 쓴다 ── */
  function fitText(boxW, fs, chars) {   // 대략 한 줄에 들어가는 글자 수(짐작 — 평균 글자 폭 0.55em)
    return Math.max(4, Math.floor(boxW / (fs * 0.55)));
  }
  function clip(t, n) { t = String(t || ""); return t.length > n ? t.slice(0, Math.max(1, n - 1)) + "…" : t; }
  function labelHtml(size, item, f) {
    const W = size.w, H = size.h;
    const pad = Math.min(0.07, H * 0.08, W * 0.05);
    const w = W - pad * 2, h = H - pad * 2;
    const fs = Math.max(0.05, Math.min(h * 0.11, w * 0.08, 0.18));   // 글자 기준 크기(인치) — 바코드가 남은 높이를 갖는다
    const warn = [];
    const rows = [];
    let used = 0;
    const line = (txt, k, cls) => { const hh = fs * k * 1.18; used += hh; rows.push(`<div class="${cls}" style="font-size:${(fs * k).toFixed(4)}in;height:${hh.toFixed(4)}in;line-height:${hh.toFixed(4)}in">${e(txt)}</div>`); };
    let barRow = -1, digits = null;

    if (item.kind === "product") {
      if (f.brand && item.brand) line(clip(item.brand, fitText(w, fs * 0.75)), 0.75, "br");
      if (f.name && item.name) {
        const lines = h >= 0.85 ? 2 : 1, k = 0.85, per = fitText(w, fs * k);
        const hh = fs * k * 1.15 * lines; used += hh;
        rows.push(`<div class="nm" style="font-size:${(fs * k).toFixed(4)}in;line-height:${(fs * k * 1.15).toFixed(4)}in;max-height:${hh.toFixed(4)}in;-webkit-line-clamp:${lines}">${e(clip(item.name, per * lines))}</div>`);
      }
      if (f.barcode) { barRow = rows.length; rows.push(null); }
      if (f.digits && item.code) digits = item.code;
      if (f.digits && digits) line(digits, 0.75, "dg");
      if (f.sku && item.sku) line(item.sku, 1.1, "sk");
    } else {
      if (f.barcode) { barRow = rows.length; rows.push(null); }
      if (f.name && item.name) line(item.name, 1.35, "bn");
      if (f.warehouse && item.warehouse) line(clip(item.warehouse, fitText(w, fs * 0.7)), 0.7, "br");
    }

    if (barRow >= 0) {
      const gap = rows.length > 1 ? fs * 0.25 : 0;
      const bh = Math.max(0.1, h - used - gap);
      let inner;
      if (!item.code) inner = `<div class="nob" style="font-size:${(fs * 0.85).toFixed(4)}in">No barcode</div>`;
      else if (!item.format) inner = `<div class="nob" style="font-size:${(fs * 0.85).toFixed(4)}in">Barcode can't be printed</div>`;
      else {
        const b = barcodeSvg(item.code, item.format);
        if (!b) inner = `<div class="nob" style="font-size:${(fs * 0.85).toFixed(4)}in">Barcode can't be printed</div>`;
        else {
          inner = b.svg;
          const qz = item.format === "CODE128" ? 10 : 9;   // 양쪽 조용한 자리(모듈) 짐작
          const mod = w / (b.modules + qz * 2);
          if (mod < MIN_MODULE_IN) warn.push("bars_thin");
          if (bh < 0.25) warn.push("bars_short");
          inner = `<div class="bw" style="padding:0 ${(mod * qz).toFixed(4)}in">${inner}</div>`;
        }
      }
      rows[barRow] = `<div class="bc" style="height:${bh.toFixed(4)}in;margin:${(gap / 2).toFixed(4)}in 0">${inner}</div>`;
    }
    if (used > h + 0.01) warn.push("text_overflow");
    const html = `<div class="lb" style="width:${W}in;height:${H}in;padding:${pad.toFixed(4)}in">${rows.join("")}</div>`;
    return { html, warn };
  }
  const LABEL_CSS =
    ".lb{box-sizing:border-box;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#fff;color:#000;font-family:Arial,Helvetica,sans-serif}" +
    ".lb div{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:0 0 auto}" +
    ".lb .nm{white-space:normal;display:-webkit-box;-webkit-box-orient:vertical;word-break:break-word}" +
    ".lb .br{color:#000;text-align:center}" +
    ".lb .sk,.lb .bn{font-weight:700;letter-spacing:.02em}" +
    ".lb .sk{text-align:center}" +
    ".lb .bn{font-family:'Courier New',monospace}" +
    ".lb .dg{font-family:'Courier New',monospace;text-align:center;letter-spacing:.06em}" +
    ".lb .bc{display:flex;align-items:stretch;justify-content:center}" +
    ".lb .bw{flex:1;display:flex;box-sizing:border-box}" +
    ".lb .bw svg{width:100%;height:100%;display:block}" +
    ".lb .nob{margin:auto;font-weight:700;border:1px dashed #000;padding:0 .4em}";

  /* ── 인쇄(숨은 iframe · 스크립트 없음) ── */
  function printPages(size, pages, rotate) {
    const PW = rotate ? size.h : size.w, PH = rotate ? size.w : size.h;
    const body = pages.map((p) => rotate
      ? `<div class="pg"><div style="position:absolute;left:0;top:0;width:${size.w}in;height:${size.h}in;transform-origin:0 0;transform:translate(${size.h}in,0) rotate(90deg)">${p}</div></div>`
      : `<div class="pg">${p}</div>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Labels</title><style>
      @page{size:${PW}in ${PH}in;margin:0}
      html,body{margin:0;padding:0;background:#fff}
      .pg{position:relative;width:${PW}in;height:${PH}in;overflow:hidden;break-after:page;page-break-after:always}
      .pg:last-child{break-after:auto;page-break-after:auto}
      ${LABEL_CSS}
    </style></head><body>${body}</body></html>`;
    return new Promise((resolve) => {
      const f = document.createElement("iframe");
      f.setAttribute("sandbox", "allow-same-origin allow-modals");
      f.setAttribute("aria-hidden", "true");
      f.style.cssText = "position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0";
      let fired = false;
      f.onload = () => {
        if (fired) return; fired = true;
        setTimeout(() => {
          try { f.contentWindow.focus(); f.contentWindow.print(); } catch (err) { console.warn("print:", err); }
          setTimeout(() => { f.remove(); resolve(); }, 1200);
        }, 150);
      };
      f.srcdoc = html;
      document.body.appendChild(f);
    });
  }

  /* ── 창 꼴(공통 .pomodal · .pobox 위에 몇 줄) ── */
  function style() {
    if (document.getElementById("lblStyle")) return;
    const s = document.createElement("style");
    s.id = "lblStyle";
    s.textContent =
      "#lblBox{max-width:820px}" +
      ".lbl-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}" +
      "@media(max-width:720px){.lbl-grid{grid-template-columns:1fr}}" +
      ".lbl-f{margin-bottom:12px}" +
      ".lbl-f>.t{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px}" +
      ".lbl-f select,.lbl-f input[type=number],.lbl-f input[type=search],.lbl-f input[type=text]{font:inherit;font-size:13px;border:1px solid var(--line);border-radius:8px;padding:6px 8px;width:100%;box-sizing:border-box;background:#fff}" +
      ".lbl-chk{display:flex;flex-wrap:wrap;gap:4px 14px}" +
      ".lbl-chk label{display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer;user-select:none}" +
      ".lbl-items{display:flex;flex-direction:column;gap:4px;max-height:170px;overflow:auto;border:1px solid var(--line);border-radius:8px;padding:6px}" +
      ".lbl-items label{display:flex;gap:7px;align-items:flex-start;font-size:12.5px;cursor:pointer}" +
      ".lbl-items .s{font-family:var(--mono);font-weight:700}" +
      ".lbl-items .d{color:var(--muted)}" +
      ".lbl-prev{background:#eef1f5;border-radius:10px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px;min-height:160px;justify-content:center}" +
      ".lbl-prev .stage{box-shadow:0 1px 3px rgba(0,0,0,.18);background:#fff}" +
      ".lbl-prev .cap{font-size:11.5px;color:var(--muted);text-align:center}" +
      ".lbl-warn{font-size:12.5px;color:var(--warn);margin:6px 0 0}" +
      ".lbl-warn div{margin-top:3px}" +
      ".lbl-note{font-size:12px;color:var(--muted);margin-top:6px;line-height:1.45}" +
      ".lbl-two{display:grid;grid-template-columns:1fr 1fr;gap:8px}" +
      ".lbl-stat{font-size:12.5px;color:var(--muted)}" +
      ".lbl-stat.bad{color:var(--bad)}" +
      ".lbl-list{font-family:var(--mono);font-size:12px;color:var(--muted);max-height:72px;overflow:auto;margin-top:6px;word-break:break-all}" +
      LABEL_CSS;
    document.head.appendChild(s);
  }
  function shell() {
    let m = document.getElementById("lblModal");
    if (!m) {
      m = document.createElement("div");
      m.className = "pomodal"; m.id = "lblModal"; m.hidden = true;
      m.innerHTML = '<div class="pobox" id="lblBox" role="dialog" aria-modal="true" aria-labelledby="lblTitle"></div>';
      document.body.appendChild(m);
    }
    return m;
  }

  /* ── 읽기(한 곳) ── */
  async function loadProducts(sb, productId) {
    const cols = "id,sku,name,brand_name,parent_product_id,pack_factor,is_active";
    const p = await sb.from("product").select(cols).eq("id", productId).maybeSingle();
    if (p.error) throw new Error(p.error.message);
    if (!p.data) throw new Error("Product not found.");
    const baseId = p.data.parent_product_id || p.data.id;
    const [base, sets] = await Promise.all([
      baseId === p.data.id ? Promise.resolve({ data: p.data }) : sb.from("product").select(cols).eq("id", baseId).maybeSingle(),
      sb.from("product").select(cols).eq("parent_product_id", baseId).order("pack_factor").order("sku"),
    ]);
    if (base.error) throw new Error(base.error.message);
    if (sets.error) throw new Error(sets.error.message);
    const list = [base.data || p.data].concat((sets.data || []).filter((x) => x.is_active || x.id === p.data.id));
    const ids = list.map((x) => x.id);
    const bc = await sb.from("product_barcode").select("product_id,barcode,is_primary").eq("is_active", true).in("product_id", ids);
    if (bc.error) throw new Error(bc.error.message);
    const by = {};
    (bc.data || []).forEach((b) => { (by[b.product_id] = by[b.product_id] || []).push(b); });
    Object.values(by).forEach((a) => a.sort((x, y) => (y.is_primary ? 1 : 0) - (x.is_primary ? 1 : 0)));
    const codes = [...new Set((bc.data || []).map((b) => b.barcode))];
    const shared = {};
    if (codes.length) {
      const s = await sb.from("product_barcode").select("product_id,barcode").eq("is_active", true).in("barcode", codes);
      if (!s.error) {
        const m = {};
        (s.data || []).forEach((x) => { (m[x.barcode] = m[x.barcode] || new Set()).add(x.product_id); });
        Object.keys(m).forEach((k) => { if (m[k].size > 1) shared[k] = m[k].size; });
      }
    }
    return { list, by, shared, startId: p.data.id };
  }
  async function loadBins(sb, warehouseId) {
    const out = [];
    for (let from = 0; from < 20000; from += 1000) {   // ⚠️ PostgREST 1,000 행 캡 — 창고 하나가 2 천을 넘는다
      const r = await sb.from("ref_bin").select("id,name").eq("warehouse_id", warehouseId).eq("is_active", true).order("name").range(from, from + 999);
      if (r.error) throw new Error(r.error.message);
      out.push(...(r.data || []));
      if (!r.data || r.data.length < 1000) break;
    }
    return out;
  }
  /* 존 = 이름 앞 영문 글자 + 바로 뒤가 숫자(lbl-0 7 · ref_bin.zone 은 비어 있다) · 그 밖은 Other */
  function zoneOf(name) { const m = /^([A-Za-z]+)(?=\d)/.exec(name || ""); return m ? m[1].toUpperCase() : "Other"; }
  const keyOf = (s) => String(s || "").toUpperCase();   // 범위 · 정렬은 대문자 글자 코드 순(WMS 칸 스캔은 대소문자를 가리지 않는다)

  /* ── 창 ── */
  async function open(opt) {
    if (!opt || !opt.sb) return;
    const kind = opt.kind === "bin" ? "bin" : "product";
    style();
    const sb = opt.sb;
    const m = shell(), box = document.getElementById("lblBox");
    let busy = false;
    const close = () => { if (busy) return; m.hidden = true; box.innerHTML = ""; document.removeEventListener("keydown", onKey); };
    const onKey = (ev) => { if (ev.key === "Escape") close(); };
    m.onclick = (ev) => { if (ev.target === m) close(); };
    document.addEventListener("keydown", onKey);
    box.innerHTML = `<h4 id="lblTitle">${kind === "bin" ? "Print bin labels" : "Print label"}</h4>
      <div class="pbody"><div class="msg">Loading…</div></div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn" data-x="close">Close</button></div>`;
    box.querySelector('[data-x="close"]').onclick = close;
    m.hidden = false;
    const fail = (msg) => { box.querySelector(".pbody").innerHTML = `<div class="msg err">${e(msg)}</div>`; };

    try { await loadJsBarcode(); } catch (err) { fail(err.message); return; }

    /* 공통 상태 */
    const st = {
      size: SIZES.find((s) => s.code === ls.get("ims_label_size_" + kind)) || SIZES[kind === "bin" ? 3 : 0],
      rotate: ls.get("ims_label_rotate") === true,
      copies: 1,
    };
    const fieldsFor = (size) => {
      const saved = ls.get(`ims_label_fields_${kind}_${size.code}`);
      const o = {};
      FIELDS[kind].forEach(([k, , d]) => { o[k] = saved && typeof saved[k] === "boolean" ? saved[k] : d; });
      return o;
    };
    st.f = fieldsFor(st.size);

    /* 종류별 데이터 */
    let P = null;                          // 제품: {list, by, shared, startId}
    let B = { whs: [], wh: null, all: [], zone: "", q: "", from: "", to: "" };   // 칸
    if (kind === "product") {
      try { P = await loadProducts(sb, opt.productId); } catch (err) { fail(err.message); return; }
      const pref = opt.preferSku ? P.list.find((x) => keyOf(x.sku) === keyOf(opt.preferSku)) : null;
      st.pid = (pref || P.list.find((x) => x.id === P.startId) || P.list[0]).id;
      st.code = ((P.by[st.pid] || [])[0] || {}).barcode || "";
    } else {
      const w = await sb.from("ref_warehouse").select("id,name").eq("is_active", true).order("name");
      if (w.error) { fail(w.error.message); return; }
      B.whs = (w.data || []).filter((x) => x.name !== "IN_TRANSIT");
      if (!B.whs.length) { fail("No active warehouse."); return; }
    }

    const body = box.querySelector(".pbody");
    const foot = box.querySelector(".pfoot");

    function productItem(pid, code) {
      const p = P.list.find((x) => x.id === pid);
      return { kind: "product", sku: p.sku, name: p.name, brand: p.brand_name, code, format: code ? symbology(code) : null };
    }
    function binTargets() {
      const zf = B.zone, q = keyOf(B.q).trim(), a = keyOf(B.from).trim(), z = keyOf(B.to).trim();
      return B.all.filter((b) => {
        const k = keyOf(b.name);
        if (zf && zoneOf(b.name) !== zf) return false;
        if (q && !k.includes(q)) return false;
        if (a && k < a) return false;
        if (z && k > z) return false;
        return true;
      });
    }
    function binItem(b) { return { kind: "bin", name: b.name, warehouse: B.wh ? B.wh.name : "", code: b.name, format: symbology(b.name) }; }

    function warnText(codes, item) {
      const out = [];
      if (st.size.big) out.push("4 × 6 labels need the 4-inch label printer.");
      if (codes.includes("bars_thin")) out.push("The bars are very thin at this size — the barcode may not scan. Try a bigger label.");
      if (codes.includes("bars_short")) out.push("The barcode is very short at this size — it may not scan. Turn off some lines or use a bigger label.");
      if (codes.includes("text_overflow")) out.push("Not everything fits — some text may be cut. Turn off a line or use a bigger label.");
      if (item && item.kind === "product" && item.code && P.shared[item.code]) out.push(`This barcode is on ${P.shared[item.code]} products — scanning it in the warehouse may be refused. Fix it in Products.`);
      return out;
    }

    function draw() {
      const sizeSel = `<select data-k="size">${SIZES.map((s) => `<option value="${s.code}"${s.code === st.size.code ? " selected" : ""}>${e(s.label)}</option>`).join("")}</select>`;
      const chk = FIELDS[kind].map(([k, lab]) => `<label><input type="checkbox" data-fk="${k}"${st.f[k] ? " checked" : ""}> ${e(lab)}</label>`).join("");
      let left = "";
      if (kind === "product") {
        const items = P.list.map((p) => {
          const pf = p.parent_product_id ? ` · set of ${Number(p.pack_factor || 0)}` : " · single";
          const n = (P.by[p.id] || []).length;
          return `<label><input type="radio" name="lblp" value="${e(p.id)}"${p.id === st.pid ? " checked" : ""}>
            <span><span class="s">${e(p.sku)}</span><span class="d">${e(pf)}${n ? "" : " · no barcode"}${p.is_active ? "" : " · inactive"}</span><br>${e(p.name || "")}</span></label>`;
        }).join("");
        const bcs = P.by[st.pid] || [];
        const bcSel = bcs.length > 1
          ? `<div class="lbl-f"><div class="t">Barcode</div><select data-k="code">${bcs.map((b) => `<option value="${e(b.barcode)}"${b.barcode === st.code ? " selected" : ""}>${e(b.barcode)}${b.is_primary ? " (main)" : ""}${P.shared[b.barcode] ? " — on " + P.shared[b.barcode] + " products" : ""}</option>`).join("")}</select></div>` : "";
        left = `${P.list.length > 1 ? `<div class="lbl-f"><div class="t">Product</div><div class="lbl-items">${items}</div></div>` : ""}
          ${bcSel}
          <div class="lbl-f"><div class="t">Label size</div>${sizeSel}</div>
          <div class="lbl-f"><div class="t">Print on the label</div><div class="lbl-chk">${chk}</div></div>
          <div class="lbl-f"><div class="t">Copies</div><input type="number" data-k="copies" min="1" max="500" step="1" value="${st.copies}"></div>`;
      } else {
        const t = B.wh ? binTargets() : [];
        const zones = B.wh ? [...new Set(B.all.map((b) => zoneOf(b.name)))].sort((a, b) => (a === "Other") - (b === "Other") || (a < b ? -1 : a > b ? 1 : 0)) : [];
        left = `<div class="lbl-f"><div class="t">Warehouse</div><select data-k="wh"><option value="">Pick a warehouse…</option>${B.whs.map((w) => `<option value="${e(w.id)}"${B.wh && B.wh.id === w.id ? " selected" : ""}>${e(w.name)}</option>`).join("")}</select></div>
          ${B.wh ? `<div class="lbl-f"><div class="t">Which bins</div>
            <div class="lbl-two"><select data-k="zone"><option value="">All zones</option>${zones.map((z) => `<option value="${e(z)}"${z === B.zone ? " selected" : ""}>${e(z)}</option>`).join("")}</select>
            <input type="search" data-k="q" placeholder="Name contains" value="${e(B.q)}"></div>
            <div class="lbl-two" style="margin-top:6px"><input type="text" data-k="from" placeholder="From (e.g. A010101)" value="${e(B.from)}"><input type="text" data-k="to" placeholder="To (e.g. A010520)" value="${e(B.to)}"></div>
            <div class="lbl-stat${t.length ? "" : " bad"}" style="margin-top:6px">${t.length.toLocaleString("en-CA")} of ${B.all.length.toLocaleString("en-CA")} active bins</div>
            <div class="lbl-list">${t.slice(0, 60).map((b) => e(b.name)).join(" · ")}${t.length > 60 ? " …" : ""}</div></div>` : ""}
          <div class="lbl-f"><div class="t">Label size</div>${sizeSel}</div>
          <div class="lbl-f"><div class="t">Print on the label</div><div class="lbl-chk">${chk}</div></div>
          <div class="lbl-f"><div class="t">Copies of each bin</div><input type="number" data-k="copies" min="1" max="10" step="1" value="${st.copies}"></div>`;
      }

      /* 미리 보기 — 첫 장 · 읽는 방향 · 화면에 맞게 줄임 */
      let item = null;
      if (kind === "product") item = productItem(st.pid, st.code);
      else if (B.wh) { const t = binTargets(); if (t.length) item = binItem(t[0]); }
      let prev = '<div class="cap">Pick a warehouse to see a label.</div>', warns = [];
      if (item) {
        const L = labelHtml(st.size, item, st.f);
        const scale = Math.min(1, 330 / (st.size.w * 96), 220 / (st.size.h * 96));
        prev = `<div class="stage" style="width:${(st.size.w * 96 * scale).toFixed(1)}px;height:${(st.size.h * 96 * scale).toFixed(1)}px;overflow:hidden">
            <div style="transform:scale(${scale.toFixed(4)});transform-origin:0 0;width:${st.size.w}in;height:${st.size.h}in">${L.html}</div></div>
          <div class="cap">${e(st.size.label)}${kind === "bin" && B.wh ? " · first bin shown" : ""}</div>`;
        warns = warnText(L.warn, item);
      } else if (kind === "bin" && B.wh) prev = '<div class="cap">No bins match.</div>';
      if (st.size.big && !warns.length) warns.push("4 × 6 labels need the 4-inch label printer.");

      body.innerHTML = `<div class="lbl-grid"><div>${left}</div>
        <div><div class="lbl-prev">${prev}</div>
          ${warns.length ? `<div class="lbl-warn">${warns.map((w) => `<div>⚠ ${e(w)}</div>`).join("")}</div>` : ""}
          <div class="lbl-f" style="margin-top:12px"><div class="lbl-chk"><label><input type="checkbox" data-k="rotate"${st.rotate ? " checked" : ""}> Rotate 90° for this printer</label></div>
            <div class="lbl-note">The first time on a PC: in the print window pick the label printer, paper = the same label number, margins None, scale 100%, and turn headers and footers off. If labels come out sideways or shrunk, tick “Rotate 90°” — this PC remembers it.</div></div>
        </div></div>`;

      const total = kind === "product" ? st.copies : (B.wh ? binTargets().length * st.copies : 0);
      foot.innerHTML = `<span class="lbl-stat" id="lblStat">${total ? `${total.toLocaleString("en-CA")} label${total === 1 ? "" : "s"}` : ""}</span>
        <span class="sp"></span>
        <button class="pobtn" data-x="close">Close</button>
        <button class="pobtn go" data-x="print"${total && item ? "" : " disabled"}>Print</button>`;
      foot.querySelector('[data-x="close"]').onclick = close;
      foot.querySelector('[data-x="print"]').onclick = doPrint;
      wire();
    }

    function wire() {
      const on = (sel, ev, fn) => body.querySelectorAll(sel).forEach((el) => { el.addEventListener(ev, fn); });
      on('[data-k="size"]', "change", (ev) => { st.size = SIZES.find((s) => s.code === ev.target.value) || st.size; ls.set("ims_label_size_" + kind, st.size.code); st.f = fieldsFor(st.size); draw(); });
      on("[data-fk]", "change", (ev) => { st.f[ev.target.dataset.fk] = ev.target.checked; ls.set(`ims_label_fields_${kind}_${st.size.code}`, st.f); draw(); });
      on('[data-k="rotate"]', "change", (ev) => { st.rotate = ev.target.checked; ls.set("ims_label_rotate", st.rotate); });
      on('[data-k="copies"]', "change", (ev) => {
        const max = kind === "bin" ? 10 : 500;
        const n = Math.floor(Number(ev.target.value));
        st.copies = Number.isFinite(n) ? Math.min(max, Math.max(1, n)) : 1; draw();
      });
      on('input[name="lblp"]', "change", (ev) => { st.pid = ev.target.value; st.code = ((P.by[st.pid] || [])[0] || {}).barcode || ""; draw(); });
      on('[data-k="code"]', "change", (ev) => { st.code = ev.target.value; draw(); });
      on('[data-k="wh"]', "change", async (ev) => {
        const w = B.whs.find((x) => x.id === ev.target.value) || null;
        B.wh = w; B.all = []; B.zone = ""; B.q = ""; B.from = ""; B.to = "";
        if (!w) { draw(); return; }
        body.querySelector(".lbl-prev").innerHTML = '<div class="cap">Loading bins…</div>';
        try {
          const all = await loadBins(sb, w.id);
          all.sort((a, b) => { const x = keyOf(a.name), y = keyOf(b.name); return x < y ? -1 : x > y ? 1 : 0; });
          if (B.wh === w) B.all = all;
        } catch (err) { fail(err.message); return; }
        draw();
      });
      on('[data-k="zone"]', "change", (ev) => { B.zone = ev.target.value; draw(); });
      ["q", "from", "to"].forEach((k) => on(`[data-k="${k}"]`, "change", (ev) => { B[k] = ev.target.value; draw(); }));
    }

    async function doPrint() {
      if (busy) return;
      let pages = [];
      if (kind === "product") {
        const L = labelHtml(st.size, productItem(st.pid, st.code), st.f);
        for (let i = 0; i < st.copies; i++) pages.push(L.html);
      } else {
        const t = binTargets();
        if (t.length * st.copies > 3000 && !confirm(`${(t.length * st.copies).toLocaleString("en-CA")} labels — print them all?`)) return;
        t.forEach((b) => { const L = labelHtml(st.size, binItem(b), st.f); for (let i = 0; i < st.copies; i++) pages.push(L.html); });
      }
      if (!pages.length) return;
      busy = true;
      const btn = foot.querySelector('[data-x="print"]');
      btn.disabled = true; btn.textContent = "Opening print…";
      try { await printPages(st.size, pages, st.rotate); }
      finally { busy = false; btn.disabled = false; btn.textContent = "Print"; }
    }

    draw();
  }

  window.imsLabel = { open, build: BUILD, _symbology: symbology };
})();
