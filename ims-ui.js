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
     imsThumb / imsThumbFill    줄 표의 SKU 썸네일(40px · 누르면 크게 · 판정 208 · 2026-10-01 thumb-1) · ⚠️ 실패해도 던지지 않는다
     imsPhotoUrl / imsPhotoPrimary  창고 화면용 대표 사진 읽기(판정 224 · wms-img-1) — 같은 캐시 · 같은 창구 · Map(sku → {url, from_parent} | null) · ⚠️ 실패해도 던지지 않는다
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

  /* ── 썸네일 ───────────────────────────────────
     판정 208 (2026-10-01 thumb-1) — PO · SO · 트랜스퍼 · Stock adjustment 의 줄 표에서 SKU 왼쪽 작은 사진(40px) · 누르면 크게.
     쓰는 법 (이것이 약속이다 — 네 화면이 이대로 부른다):
       imsThumb(sku)            → '<span class="ims-thumb" data-thumb="SKU"></span>'  (SKU 는 esc + " 도 막는다 · 빈 SKU 는 data-thumb 없는 빈 칸)
       await imsThumbFill(root) → root(요소 · 선택자 · 없으면 document) 안의 아직 안 채운 [data-thumb] 를 모아 채운다 · await 안 해도 된다
     · 한 번에 읽기 — 서로 다른 SKU 를 모아 product_image_primary(p_skus) 한 번(500 개씩 · 반환은 입력 SKU 마다 한 행이라 1,000 캡 아래)
     · 캐시 — 이 페이지에서 한 번 읽은 SKU 는 다시 묻지 않는다(사진 없음 · 없는 SKU 도) · 읽는 중인 SKU 는 그 약속을 같이 기다린다
     · 공개 주소 — <SUPABASE_URL>/storage/v1/object/public/product-images/<storage_path> (products.html 의 photoUrl 과 같은 모양 · 조각마다 encodeURIComponent)
     · from_parent(세트가 낱개 사진을 빌림 · 판정 194) → .parent + 모서리 점 + title "Single's photo"
     · ⚠️⚠️ 실패해도 화면은 산다 — rpc 오류 · window.sb 없음 · 권한 없음 → console.warn 한 줄 · 칸은 빈 칸 · throw 하지 않는다.
       못 읽은 SKU 는 캐시에도 .done 에도 안 남겨 다음 imsThumbFill 이 다시 묻는다(일시 오류가 페이지 내내 굳지 않게).
     · 크게 보기 — 자기 덮개 #imsThumbZoom(화면의 #modal · .pomodal 은 건드리지 않는다 · z-index 9000) · 배경 클릭 · Esc · Open original(새 탭)
       이벤트는 첫 imsThumbFill 때 document 에 한 번(capture) — 썸네일 클릭은 줄의 클릭 처리기로 안 번지고 · Esc 는 열린 고치기 대화상자까지 닫지 않는다 */
  const THUMB_BUCKET = "product-images";
  const THUMB_CHUNK = 500;
  const thumbCache = new Map();    // sku → { url, from_parent } | null(사진 없음 · 없는 SKU)
  const thumbPending = new Map();  // sku → Promise(읽는 중)
  let thumbWired = false;

  const thumbUrl = (path) => {
    const cfg = window.IMS_CONFIG || {};
    return `${cfg.SUPABASE_URL || ""}/storage/v1/object/public/${THUMB_BUCKET}/${String(path).split("/").map(encodeURIComponent).join("/")}`;
  };

  const imsThumb = (sku) => {
    const s = sku === null || sku === undefined ? "" : String(sku);
    if (!s) return '<span class="ims-thumb"></span>';
    return `<span class="ims-thumb" data-thumb="${esc(s).replace(/"/g, "&quot;")}"></span>`;
  };

  async function thumbQuery(part) {
    try {
      const sb = window.sb;
      if (!sb || typeof sb.rpc !== "function") throw new Error("window.sb not ready");
      const { data, error } = await sb.rpc("product_image_primary", { p_skus: part });
      if (error) throw error;
      const got = new Map((data || []).map((r) => [r.sku, r]));
      for (const s of part) {
        const r = got.get(s);
        thumbCache.set(s, r && r.storage_path ? { url: thumbUrl(r.storage_path), from_parent: !!r.from_parent } : null);
      }
    } catch (e) {
      console.warn("imsThumb: product_image_primary failed —", (e && e.message) || e);
    } finally {
      for (const s of part) thumbPending.delete(s);
    }
  }

  function thumbPaint(cell) {
    if (cell.classList.contains("done")) return;
    const sku = cell.getAttribute("data-thumb");
    if (!thumbCache.has(sku)) return;            // 못 읽었다 — 빈 칸 그대로 · 다음 fill 이 다시 묻는다
    const hit = thumbCache.get(sku);
    cell.classList.add("done");
    if (!hit) { cell.classList.add("none"); cell.innerHTML = ""; return; }
    cell.innerHTML = `<img loading="lazy" alt="" src="${esc(hit.url)}">` + (hit.from_parent ? '<i class="p"></i>' : "");
    if (hit.from_parent) { cell.classList.add("parent"); cell.title = "Single's photo"; }
  }

  function thumbZoomOpen(src) {
    let z = document.getElementById("imsThumbZoom");
    if (!z) {
      z = document.createElement("div");
      z.id = "imsThumbZoom";
      z.innerHTML = '<div class="box"><img alt=""><a class="orig" target="_blank" rel="noopener">Open original</a></div>';
      document.body.appendChild(z);
    }
    z.querySelector("img").setAttribute("src", src);
    z.querySelector("a.orig").setAttribute("href", src);
    z.classList.add("open");
  }
  function thumbZoomClose() {
    const z = document.getElementById("imsThumbZoom");
    if (z) z.classList.remove("open");
  }
  function thumbWire() {
    if (thumbWired) return;
    thumbWired = true;
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!t || typeof t.closest !== "function") return;
      const img = t.closest(".ims-thumb img");
      if (img) { e.preventDefault(); e.stopPropagation(); thumbZoomOpen(img.getAttribute("src")); return; }
      if (t.closest("#imsThumbZoom")) {
        e.stopPropagation();
        if (!t.closest("#imsThumbZoom img, #imsThumbZoom a")) thumbZoomClose();
      }
    }, true);
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const z = document.getElementById("imsThumbZoom");
      if (z && z.classList.contains("open")) { e.preventDefault(); e.stopImmediatePropagation(); thumbZoomClose(); }
    }, true);
  }

  async function thumbLoad(skus) {           // 캐시 · 읽는 중을 뺀 SKU 를 500 씩 product_image_primary · 전부 끝날 때까지(거절하지 않는다 · thumbQuery 가 warn) · imsThumbFill 과 imsPhotoPrimary 가 같이 쓴다
    const fresh = skus.filter((s) => !thumbCache.has(s) && !thumbPending.has(s));
    for (let i = 0; i < fresh.length; i += THUMB_CHUNK) {
      const part = fresh.slice(i, i + THUMB_CHUNK);
      const p = thumbQuery(part);
      for (const s of part) thumbPending.set(s, p);
    }
    await Promise.all([...new Set(skus.map((s) => thumbPending.get(s)).filter(Boolean))]);
  }

  async function imsThumbFill(root) {
    try {
      const base = typeof root === "string" ? document.querySelector(root) : (root || document);
      if (!base || typeof base.querySelectorAll !== "function") return;
      const cells = Array.from(base.querySelectorAll(".ims-thumb[data-thumb]:not(.done)"));
      if (!cells.length) return;
      thumbWire();
      const skus = [...new Set(cells.map((c) => c.getAttribute("data-thumb")).filter(Boolean))];
      await thumbLoad(skus);
      for (const c of cells) thumbPaint(c);
    } catch (e) {
      console.warn("imsThumbFill:", (e && e.message) || e);
    }
  }

  /* ── 창고 화면용 대표 사진 읽기(wms-img-1 · 판정 224 · 2026-10-01) ─────
     픽 · 팩 · 리시빙 · Fulfillment 가 줄을 그린 뒤 그 화면 SKU 를 모아 한 번 부른다 · thumb-1 과 같은 캐시(thumbCache · thumbPending) · 같은 창구 · 같은 주소 짓기(thumbUrl)
       imsPhotoUrl(storage_path)     → 공개 주소 문자열(없으면 "")
       await imsPhotoPrimary(skus[]) → Map(sku → { url, from_parent } | null(사진 없음 · 없는 SKU)) · 중복 SKU 는 하나로 · 못 읽은 SKU 는 Map 에 없다(캐시에도 안 남아 다음 호출이 다시 묻는다)
     · ⚠️⚠️ throw 하지 않는다 — rpc 오류 · window.sb 없음 · 권한 없음이면 warn 한 줄(thumbQuery) · 빈 Map */
  const imsPhotoUrl = (path) => (path ? thumbUrl(path) : "");
  async function imsPhotoPrimary(skus) {
    const out = new Map();
    try {
      const list = [...new Set((Array.isArray(skus) ? skus : []).map((s) => (s === null || s === undefined ? "" : String(s))).filter(Boolean))];
      if (!list.length) return out;
      await thumbLoad(list);
      for (const s of list) if (thumbCache.has(s)) out.set(s, thumbCache.get(s));
    } catch (e) {
      console.warn("imsPhotoPrimary:", (e && e.message) || e);
    }
    return out;
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
  window.imsThumb = imsThumb;
  window.imsThumbFill = imsThumbFill;
  window.imsPhotoUrl = imsPhotoUrl;
  window.imsPhotoPrimary = imsPhotoPrimary;
})();
