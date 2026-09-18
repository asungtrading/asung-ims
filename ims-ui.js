/* Asung IMS — 화면 공통 도구
   ─────────────────────────────────────────────
   ⚠️ 여기를 고치면 모든 화면이 바뀐다. 고친 뒤 CHECKLIST.md 를 처음부터 훑는다.
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js
   📌 2026-09-15 · 화면 다섯에 복사돼 있던 것을 모았다.

   담은 것
     esc / dim / yn / num       값 표시
     imsTs                      timestamptz → 토론토 시각(분까지) · ⚠️ date 칸에는 쓰지 않는다
     imsPage                    1,000행 캡을 넘지 않게 나눠 읽기(정본 §10-j 3-a)
     imsSaved                   ⚠️ update 가 RLS 에 막히면 에러가 아니라 0행이다 · ⭐ [2026-09-18] seenAt 을 주면 덮어쓰기를 막고 누가·언제 바꿨는지 돌려준다
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

  /* ── 시각 표시 ─────────────────────────────────
     ⚠️ timestamptz(created_at · updated_at …)만 — 토론토 시각으로 보인다.
        date 칸(valid_from · last_supplied · cin7_modified_on)은 시간대가 없다 — 그대로 dim() 으로 쓴다.
     [실사고 2026-09-15] staff.html 이 ISO 문자열을 잘라 UTC 로 보였다(19:16 → 토론토 15:16). */
  const imsTs = (v) => {
    if (v === null || v === undefined || v === "") return '<span class="dim">—</span>';
    const d = new Date(v);
    if (isNaN(d)) return esc(v);
    return esc(d.toLocaleString("sv-SE", {
      timeZone: "America/Toronto",
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
    }));
  };

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

  /* ── 저장 확인 · 덮어쓰기 알림 ─────────────────────
     ⚠️⚠️ PostgREST update 가 RLS 에 막히면 에러가 아니라 **0행**이다.
        .select() 로 되읽어 0행이면 저장되지 않은 것이다(§10-j 3-f · staff.html 이 선례).
     ⭐ [2026-09-18 · 동시 편집 1차] 둘째 인자 seenAt(읽었을 때의 updated_at)을 주면
        · 빌더 뒤에 .eq("updated_at", seenAt) 을 붙여 「내가 읽었을 때와 같은가」를 함께 검사하고
        · 0행이면 같은 행을 되읽어 원인을 가른다 — 남이 지웠다 / 남이 바꿨다(⭐ conflict) / 권한이 없다
        · 바꿨다면 현재 값(current)과 마지막으로 고친 사람(by · updated_by → ims_staff.name)과 시각(at)을 돌려준다.
        ⚠️ seenAt 이 없으면 지금과 똑같이 돈다 — 기존 호출 전부 안 깨진다.
     쓰는 법:
        const r = await imsSaved(sb.from("supplier").update(patch).eq("id", id).select());                 // 지금 그대로
        const r = await imsSaved(sb.from("po_invoice").update(patch).eq("id", id).select(), h.updated_at); // ⭐ 읽었을 때의 updated_at 을 그대로 넘긴다
        if (!r.ok) { toast(r.reason, true); if (r.conflict) { … } }   // conflict 면 r.current 로 화면을 갈아 끼우고 r.by · r.at 을 보여 준다 · 사람이 다시 저장한다
     ⚠️ seenAt 은 PostgREST 가 돌려준 문자열 **그대로** 넘긴다 — 자르거나 Date 로 바꾸면 늘 거부된다(timestamptz 표현이 흔들린다).
     ⚠️ 빌더는 .select() 뒤에도 같은 객체다(postgrest-js PostgrestFilterBuilder · select() 가 this 를 돌려준다 · 2.116.0 소스 확인) — 그래서 .eq() 를 뒤에 붙일 수 있다.
     되읽기는 빌더의 url(표 · id=eq.…)에서 표와 id 를 읽어 window.sb 로 한다 — 셋째 인자 { table, id } 를 주면 그것을 쓴다(빌더 모양이 다른 화면용).
     반환: { ok, conflict, removed, reason, data, current, by, at }
        ok:true                       → data(되읽은 행들)
        ok:false · conflict:false     → reason(권한 없음 또는 에러) · 지금과 같다
        ok:false · conflict:true      → removed:true 이면 남이 지웠다 · 아니면 current(현재 행 · updated_by_staff 포함) · by(이름 · null 이면 "system") · at(updated_at 원문)
     ⚠️ 화면 문자열은 전부 영어 · 시각은 imsTs 로 토론토 · 문장은 「… — nothing was saved」로 끝난다(§5 권한 규약 ②의 말투).
  */
  async function imsSaved(builder, seenAt, ref) {
    if (seenAt) builder = builder.eq("updated_at", seenAt);
    const { data, error } = await builder;
    if (error) return { ok: false, conflict: false, reason: error.message, data: null };
    if (data && data.length) return { ok: true, conflict: false, reason: "", data: data };
    if (!seenAt) {
      return { ok: false, conflict: false, reason: "Not saved — you may not have permission.", data: null };
    }
    // ── 0행 + seenAt: 되읽어 원인을 가른다 ──
    let table = ref && ref.table, id = ref && ref.id;
    try {
      if ((!table || !id) && builder && builder.url) {
        const u = builder.url instanceof URL ? builder.url : new URL(String(builder.url));
        table = table || u.pathname.split("/").filter(Boolean).pop();
        const idq = u.searchParams.get("id");                    // "eq.<uuid>"
        id = id || (idq && idq.startsWith("eq.") ? idq.slice(3) : null);
      }
    } catch (_) { /* 빌더 모양을 못 읽으면 아래 일반 문장으로 */ }
    const client = window.sb;
    if (!table || !id || !client) {
      return { ok: false, conflict: false,
               reason: "Not saved — it may have been removed or changed by someone else just now — nothing was saved", data: null };
    }
    const cur = await client.from(table)
      .select("*, updated_by_staff:ims_staff!updated_by(name)")
      .eq("id", id).maybeSingle();
    if (cur.error) {
      return { ok: false, conflict: false,
               reason: "Not saved — it may have been removed or changed by someone else just now — nothing was saved", data: null };
    }
    const row = cur.data;
    if (!row) {
      return { ok: false, conflict: true, removed: true, current: null, by: null, at: null,
               reason: "Not saved — this record was removed by someone else just now — nothing was saved", data: null };
    }
    if (String(row.updated_at) !== String(seenAt)) {
      const by = row.updated_by_staff && row.updated_by_staff.name ? row.updated_by_staff.name : "system";
      const at = imsTs(row.updated_at);
      return { ok: false, conflict: true, removed: false, current: row, by: by, at: row.updated_at,
               reason: "Not saved — " + by + " changed this record at " + at + " after you opened it. Review the current values, then save again — nothing was saved",
               data: null };
    }
    return { ok: false, conflict: false, reason: "Not saved — you may not have permission.", data: null };
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
  window.imsTs = imsTs;
  window.imsPage = imsPage;
  window.imsSaved = imsSaved;
  window.imsQ = imsQ;
  window.imsParam = imsParam;
  window.imsHeader = imsHeader;
})();
