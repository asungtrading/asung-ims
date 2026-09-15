/* Asung IMS — 화면 공통 도구
   ─────────────────────────────────────────────
   ⚠️ 여기를 고치면 모든 화면이 바뀐다. 고친 뒤 CHECKLIST.md 를 처음부터 훑는다.
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js
   📌 2026-09-15 · 화면 다섯에 복사돼 있던 것을 모았다.

   담은 것
     esc / dim / yn / num       값 표시
     imsPage                    1,000행 캡을 넘지 않게 나눠 읽기(정본 §10-j 3-a)
     imsSaved                   ⚠️ update 가 RLS 에 막히면 에러가 아니라 0행이다
     imsQ                       검색창 지연 입력
     imsParam                   화면 사이 이동(?id= · ?sku=)
*/
(function () {
  "use strict";

  /* ── 값 표시 ───────────────────────────────── */
  const esc = (v) =>
    String(v === null || v === undefined ? "" : v)
      .replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

  const dim = (v) =>
    (v === null || v === undefined || v === "") ? '<span class="dim">—</span>' : esc(v);

  /* ⚠️ 색은 is_active 에만 쓴다 — colored:false 면 회색으로 나온다(§10-j 3-e) */
  const yn = (v, colored) => {
    if (v === null || v === undefined) return '<span class="dim">—</span>';
    if (colored === false) return v ? '<span class="neutral">✓</span>' : '<span class="dim">·</span>';
    return v ? '<span class="on">✓</span>' : '<span class="off">✗</span>';
  };

  const num = (v) =>
    (v === null || v === undefined || v === "") ? '<span class="dim">—</span>' : esc(v);

  /* ── 나눠 읽기 ─────────────────────────────────
     ⚠️⚠️ PostgREST 는 한 번에 1,000행까지만 준다. 조용히 잘린다(이 프로젝트 사고 5건).
        지금 캡을 넘는 표는 넷이다 —
        ref_bin 2,675 · product_family 1,141 · product 18,714 · product_supplier 12,721
        ⭐ 넘지 않는 표도 예외를 두지 않는다. 나중에 늘면 그때 잘린다.
     쓰는 법:
        const p = imsPage(100);
        const { data, error } = await p.run(qry);   // qry 에 .range() 를 붙여 돌린다
        p.render({ range:"#range", prev:"#prev", next:"#next" }, reload);
  */
  function imsPage(size) {
    const st = { size: size || 100, page: 0, total: 0, got: 0 };

    st.reset = () => { st.page = 0; return st; };

    st.run = async (qry) => {
      const from = st.page * st.size;
      const res = await qry.range(from, from + st.size - 1);
      st.total = res.count || 0;
      st.got = (res.data || []).length;
      return res;
    };

    st.render = (sel, reload) => {
      const from = st.page * st.size;
      const a = st.total ? from + 1 : 0;
      const b = Math.min(from + st.got, st.total);
      const el = (s) => (typeof s === "string" ? document.querySelector(s) : s);
      const r = el(sel.range), p = el(sel.prev), n = el(sel.next);
      if (r) r.textContent =
        `${a.toLocaleString()}–${b.toLocaleString()} / ${st.total.toLocaleString()}`;
      if (p) { p.disabled = st.page === 0; p.onclick = () => { if (st.page > 0) { st.page--; reload(); } }; }
      if (n) { n.disabled = (from + st.size) >= st.total; n.onclick = () => { st.page++; reload(); }; }
    };

    return st;
  }

  /* ── 저장 확인 ─────────────────────────────────
     ⚠️⚠️ PostgREST update 가 RLS 에 막히면 에러가 아니라 **0행**이다.
        .select() 로 되읽어 0행이면 저장되지 않은 것이다(§10-j 3-f · staff.html 이 선례).
     쓰는 법:
        const r = await imsSaved(sb.from("supplier").update(patch).eq("id", id).select());
        if (!r.ok) toast(r.reason, true);
  */
  async function imsSaved(builder) {
    const { data, error } = await builder;
    if (error) return { ok: false, reason: error.message, data: null };
    if (!data || data.length === 0) {
      return { ok: false, reason: "Not saved — you may not have permission.", data: null };
    }
    return { ok: true, reason: "", data: data };
  }

  /* ── 검색창 ───────────────────────────────────
     ⚠️ 검색은 서버에서 한다(ilike/or). 받아 와서 거르면 첫 페이지 안에서만 찾는다. */
  function imsQ(sel, onChange, delay) {
    const el = typeof sel === "string" ? document.querySelector(sel) : sel;
    if (!el) return;
    let t = null;
    el.addEventListener("input", (e) => {
      clearTimeout(t);
      t = setTimeout(() => onChange(e.target.value.trim()), delay || 250);
    });
  }

  /* ── 화면 사이 이동 ──────────────────────────── */
  const imsParam = (k) => new URLSearchParams(location.search).get(k);

  /* ── 헤더 ─────────────────────────────────────
     이름·역할을 찍고 Sign Out 을 건다. 화면마다 복사하던 두 줄. */
  function imsHeader(me) {
    const w = document.getElementById("who");
    if (w) w.textContent = me.name + " · " + me.role;
    const b = document.getElementById("logoutBtn");
    if (b) b.onclick = () => window.imsAuth.signOut();
  }

  window.esc = esc;
  window.dim = dim;
  window.yn = yn;
  window.num = num;
  window.imsPage = imsPage;
  window.imsSaved = imsSaved;
  window.imsQ = imsQ;
  window.imsParam = imsParam;
  window.imsHeader = imsHeader;
})();
