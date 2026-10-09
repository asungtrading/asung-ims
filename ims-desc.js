/* Asung IMS — 상품 설명(판정 381 · 401 · 402 · DB desc-1b 9184853)
   ─────────────────────────────────────────────
   ⭐⭐ 설명은 이 파일의 imsDesc 로만 그린다 — 원문 칸(cin7_description · description_html)을 innerHTML 로 직접 그리지 마라(CHECKLIST)
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js → ims-desc.js (esc · imsTs · imsAuth 를 쓴다)
   📌 2026-10-09 · 대화 Claude · desc v1 · desc v1a(손대지 않은 Save 는 저장하지 않는다 — 비교 기준 = 편집 창이 열린 직후의 글)

   DB(desc-1b) 사실 — 2026-10-09 실측
     product · product_family: description_html(null = Cin7 을 따른다 · '' = 일부러 비움) · description_edited_at · description_edited_by
     뷰 product_description(kind · id · sku · name · is_active · html_effective · is_edited · edited_at · edited_by)
     뷰 product_description_edited(… · edited_by_name · differs_from_cin7) — IMS 에서 고친 것만
     표 ref_embed_host(kind · host · is_active) — iframe 허락 host 한 줄씩(판정 402 · 시작값 다섯)
     창구 product_update op description_set {sku | family_sku, html, old} · description_follow_cin7 {sku | family_sku, old}
       old = 지금 description_html(고친 적 없으면 null) · 막기 description_forbidden:<code> · html_missing · description_not_edited · changed_elsewhere
     ⚠️ 문지기 product_description_guard — 창구 밖 쓰기는 조용히 되돌아간다(손 SQL 포함)

   거르기(판정 402) — 화면이 서버보다 더 깎는 쪽으로만 갈린다(desc-1 ⬜3)
     허락: 서식 · 표 · style= · img(모든 출처) · iframe(ref_embed_host 의 host 와 정확 일치)
     거름: 그 밖의 iframe · script · on…= · javascript: · object · embed · form · meta · link · base · <style> 태그
     DOMPurify 3.1.6(cdnjs · 고정 판 · 2024 판이라 2 주 규칙을 넘는다)

   담은 것
     imsDesc.card(kind, row)                 카드 HTML(자리만) — kind "product" | "family" · row = 표의 행(select "*")
     imsDesc.wire(root, opts)                카드를 채운다 · opts = { kind, row, sb, onChanged }
     imsDesc.clean(html)                     → Promise<{ html, removed[] }> — 다른 화면 · 미리 보기용
*/
(function () {
  "use strict";

  const PURIFY_URL = "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js";
  const FORBID_TAGS = ["script", "style", "object", "embed", "form", "meta", "link", "base"];
  const escA = (v) => esc(v).replace(/"/g, "&quot;");   // 속성 값(공통 esc 는 큰따옴표를 막지 않는다)

  /* ── DOMPurify · 허락 host 를 한 번만 읽는다 ───────────────── */
  let purifyP = null, hostsP = null, hostSet = null, removedIframes = [];
  function loadPurify() {
    if (window.DOMPurify) return Promise.resolve(window.DOMPurify);
    if (purifyP) return purifyP;
    purifyP = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = PURIFY_URL; s.crossOrigin = "anonymous"; s.referrerPolicy = "no-referrer";
      s.onload = () => window.DOMPurify ? res(window.DOMPurify) : rej(new Error("DOMPurify did not load"));
      s.onerror = () => { purifyP = null; rej(new Error("Could not load the description filter — check the connection and reload.")); };
      document.head.appendChild(s);
    }).then(P => {
      /* iframe 은 허락 host 만 — 나머지는 지우고 무엇을 지웠는지 적는다 */
      P.addHook("uponSanitizeElement", (node, data) => {
        if (data.tagName !== "iframe") return;
        let host = "";
        try { host = new URL(node.getAttribute("src") || "", "https://invalid.local").host.toLowerCase(); } catch (e) {}
        if (!host || host === "invalid.local" || !hostSet || !hostSet.has(host)) {
          removedIframes.push("iframe" + (host && host !== "invalid.local" ? " (" + host + ")" : ""));
          if (node.parentNode) node.parentNode.removeChild(node);
        }
      });
      return P;
    });
    return purifyP;
  }
  function loadHosts(sb) {
    if (hostsP) return hostsP;
    hostsP = sb.from("ref_embed_host").select("host").eq("kind", "iframe").eq("is_active", true)
      .then(({ data, error }) => {
        if (error) { hostsP = null; throw new Error(error.message); }
        hostSet = new Set((data || []).map(x => String(x.host).toLowerCase()));
        return hostSet;
      });
    return hostsP;
  }

  /* ── 거르기 한 곳 ─────────────────────────────────────── */
  async function clean(html, sb) {
    const P = await loadPurify();
    if (sb) await loadHosts(sb);
    if (!hostSet) hostSet = new Set();   // host 를 못 읽었으면 iframe 은 전부 지운다(안전한 쪽)
    removedIframes = [];
    const out = P.sanitize(String(html || ""), {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"],
      FORBID_TAGS: FORBID_TAGS,
    });
    const removed = removedIframes.slice();
    (P.removed || []).forEach(x => {
      if (x.element && x.element.nodeName) {
        const t = x.element.nodeName.toLowerCase();
        if (t !== "#text" && t !== "#comment" && t !== "iframe") removed.push("<" + t + ">");
      } else if (x.attribute && x.attribute.name) {
        const n = x.attribute.name.toLowerCase();
        const v = String(x.attribute.value || "").trim().toLowerCase();
        removed.push(n.startsWith("on") ? n + "=" : (v.startsWith("javascript:") ? "javascript: link" : n + "="));
      }
    });
    return { html: out, removed };
  }
  const summarize = (list) => {
    const m = {}; list.forEach(x => { m[x] = (m[x] || 0) + 1; });
    return Object.keys(m).map(k => esc(k) + (m[k] > 1 ? " ×" + m[k] : "")).join(" · ");
  };

  /* ── 모양(한 번만) ────────────────────────────────────── */
  function ensureStyle() {
    if (document.getElementById("imsDescStyle")) return;
    const st = document.createElement("style"); st.id = "imsDescStyle";
    st.textContent = `
      .idesc-view{padding:12px 14px;max-height:460px;overflow:auto;line-height:1.5;font-size:13px}
      .idesc-view img,.idesc-ed img{max-width:100%;height:auto}
      .idesc-view iframe,.idesc-ed iframe{max-width:100%}
      .idesc-view table,.idesc-ed table{display:block;overflow-x:auto;max-width:100%}
      .idesc-view .dim{font-style:italic}
      .idesc-bar{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}
      .idesc-bar .pobtn{min-width:34px}
      .idesc-ed{border:1px solid var(--line,#d0d5dd);border-radius:6px;padding:10px 12px;min-height:280px;max-height:58vh;overflow:auto;background:var(--card,#fff);line-height:1.5;font-size:13px}
      .idesc-ed:focus{outline:2px solid var(--accent,#3b5bdb);outline-offset:1px}
      .idesc-src{width:100%;min-height:280px;max-height:58vh;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;box-sizing:border-box}
      .idesc-cut{background:#fff4e5;border:1px solid #f2c48d;border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px}
      #idescModal .pobox{max-width:1000px}
    `;
    document.head.appendChild(st);
  }
  function modal(html) {
    ensureStyle();
    let m = document.getElementById("idescModal");
    if (!m) {
      m = document.createElement("div"); m.className = "pomodal"; m.id = "idescModal";
      m.innerHTML = '<div class="pobox" id="idescBox"></div>';
      document.body.appendChild(m);
    }
    document.getElementById("idescBox").innerHTML = html;
    m.hidden = false;
    return document.getElementById("idescBox");
  }
  function closeModal() { const m = document.getElementById("idescModal"); if (m) { m.hidden = true; document.getElementById("idescBox").innerHTML = ""; } }

  /* ── 카드 ─────────────────────────────────────────────── */
  const canEdit = () => !!(window.imsAuth && imsAuth.canWrite && imsAuth.canWrite("master"));
  function card(kind, row) {
    ensureStyle();
    const edited = row.description_html !== null && row.description_html !== undefined;
    const chip = edited ? '<span class="chip warn" style="text-transform:none">edited in IMS</span>'
                        : '<span class="chip" style="text-transform:none">from Cin7</span>';
    const btns = canEdit() ? `<span style="margin-left:auto;display:flex;gap:6px">
        ${edited ? '<button class="pobtn" data-idesc="follow" title="Drop the IMS text and follow Cin7 again">Follow Cin7 again</button>' : ""}
        ${edited ? '<button class="pobtn" data-idesc="orig" title="Show the Cin7 original next to it">Cin7 original</button>' : ""}
        <button class="pobtn go" data-idesc="edit">Edit description</button></span>` : "";
    return `<div class="card" data-idesc-card="${escA(kind)}"><h3 class="ims-sec" data-sec="" style="display:flex;align-items:center;gap:8px">Description ${chip}${btns}</h3>
      <div class="idesc-view" data-idesc-view><span class="dim">Loading…</span></div>
      <div class="note" data-idesc-note></div>
      <div data-idesc-orig hidden></div></div>`;
  }

  async function wire(root, opts) {
    const { kind, row, sb, onChanged } = opts;
    const el = root.querySelector(`[data-idesc-card="${kind}"]`);
    if (!el) return;
    const view = el.querySelector("[data-idesc-view]"), note = el.querySelector("[data-idesc-note]");
    const edited = row.description_html !== null && row.description_html !== undefined;
    const effective = edited ? row.description_html : row.cin7_description;

    let shown;
    try { shown = await clean(effective, sb); }
    catch (e) { view.innerHTML = `<span class="msg err">${esc(e.message)}</span>`; return; }
    view.innerHTML = shown.html.trim() ? shown.html
      : `<span class="dim">${edited && row.description_html === "" ? "Left empty on purpose in IMS." : "No description."}</span>`;

    const parts = [];
    if (edited) {
      parts.push(`Edited in IMS ${imsTs(row.description_edited_at)}<span data-idesc-who></span> — the daily Cin7 reload no longer changes it.`);
    } else {
      parts.push("Follows Cin7 — the daily reload keeps it up to date. Saving an edit here makes IMS the owner of this text.");
    }
    if (shown.removed.length) parts.push(`<span style="color:var(--warn,#b54708)">Not shown (not allowed on the site): ${summarize(shown.removed)}.</span>`);
    note.innerHTML = parts.join("<br>");

    if (edited) {   // 누가 — 뷰의 이름(읽을 수 없으면 비워 둔다)
      sb.from("product_description_edited").select("edited_by_name").eq("kind", kind).eq("id", row.id).maybeSingle()
        .then(({ data }) => { const w = el.querySelector("[data-idesc-who]"); if (w && data && data.edited_by_name) w.textContent = " by " + data.edited_by_name; })
        .catch(() => {});
    }

    el.querySelectorAll("[data-idesc]").forEach(b => {
      const a = b.dataset.idesc;
      b.onclick = async () => {
        if (a === "edit") return openEditor(opts, effective);
        if (a === "follow") return followCin7(opts);
        if (a === "orig") {
          const o = el.querySelector("[data-idesc-orig]");
          if (!o.hidden) { o.hidden = true; o.innerHTML = ""; b.textContent = "Cin7 original"; return; }
          const c = await clean(row.cin7_description, sb);
          o.innerHTML = `<div class="note" style="border-top:1px dashed var(--line,#d0d5dd)">Cin7 original — not used while the IMS text is kept${c.removed.length ? " · not shown: " + summarize(c.removed) : ""}</div>
            <div class="idesc-view">${c.html.trim() ? c.html : '<span class="dim">Cin7 has no description.</span>'}</div>`;
          o.hidden = false; b.textContent = "Hide Cin7 original";
        }
      };
    });
  }

  /* ── 편집기 ───────────────────────────────────────────── */
  async function openEditor(opts, effective) {
    const { kind, row, sb } = opts;
    let first;
    try { first = await clean(effective, sb); } catch (e) { alert(e.message); return; }
    const box = modal(`<h4>Description — <span class="mono">${esc(row.sku)}</span> ${esc(row.name || "")}</h4>
      <div class="pbody">
        ${first.removed.length ? `<div class="idesc-cut">Left out when this opened (not allowed on the site): ${summarize(first.removed)}.
          Saving keeps them out. The Cin7 original is not changed.</div>` : ""}
        <div class="idesc-bar">
          <button class="pobtn" data-cmd="bold" title="Bold"><b>B</b></button>
          <button class="pobtn" data-cmd="italic" title="Italic"><i>I</i></button>
          <button class="pobtn" data-cmd="underline" title="Underline"><u>U</u></button>
          <button class="pobtn" data-cmd="h2" title="Heading">H2</button>
          <button class="pobtn" data-cmd="h3" title="Small heading">H3</button>
          <button class="pobtn" data-cmd="p" title="Normal text">Text</button>
          <button class="pobtn" data-cmd="insertUnorderedList" title="Bulleted list">• List</button>
          <button class="pobtn" data-cmd="insertOrderedList" title="Numbered list">1. List</button>
          <button class="pobtn" data-cmd="link" title="Make the selected text a link">Link</button>
          <button class="pobtn" data-cmd="unlink" title="Remove the link">Unlink</button>
          <button class="pobtn" data-cmd="removeFormat" title="Clear bold, italic and colours from the selection">Clear format</button>
          <span style="flex:1"></span>
          <button class="pobtn" data-cmd="src" title="Edit the HTML directly">HTML</button>
        </div>
        <div class="idesc-ed" contenteditable="true" spellcheck="true" data-ed></div>
        <textarea class="idesc-src" data-src hidden></textarea>
        <div class="note">Pasted text is cleaned the same way. YouTube and Facebook videos are kept; other embedded boxes are dropped.</div>
      </div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn" data-m="cancel">Cancel</button><button class="pobtn go" data-m="save">Save</button></div>`);
    const ed = box.querySelector("[data-ed]"), src = box.querySelector("[data-src]");
    ed.innerHTML = first.html;
    /* desc v1a — 손대지 않았는지는 「원문」이 아니라 「편집 창에 넣은 직후 같은 방식으로 꺼내 거른 글」과 비교한다
       (원문과 비교하면 거른 몫(POWR 등)만큼 늘 달라 손대지 않은 Save 가 IMS 소유로 바뀐다 · Caleb 2026-10-09 「손대지 않았으면 cin7 버전으로 재적재」) */
    const norm = h => { const t = String(h || "").trim(); return t.replace(/<br\s*\/?>|&nbsp;|\s|<p>\s*<\/p>/gi, "") === "" ? "" : t; };
    const edStart = ed.innerHTML;
    const baseline = norm((await clean(edStart, sb)).html);
    let srcMode = false;

    box.querySelectorAll("[data-cmd]").forEach(b => {
      b.onmousedown = e => e.preventDefault();   // 고른 글자를 잃지 않게
      b.onclick = async () => {
        const c = b.dataset.cmd;
        if (c === "src") {
          if (!srcMode) { src.value = ed.innerHTML; src.hidden = false; ed.hidden = true; srcMode = true; b.textContent = "Done with HTML"; }
          else { const r = await clean(src.value, sb); ed.innerHTML = r.html; src.hidden = true; ed.hidden = false; srcMode = false; b.textContent = "HTML"; }
          box.querySelectorAll("[data-cmd]").forEach(x => { if (x.dataset.cmd !== "src") x.disabled = srcMode; });
          return;
        }
        ed.focus();
        if (c === "h2" || c === "h3" || c === "p") document.execCommand("formatBlock", false, "<" + c + ">");
        else if (c === "link") {
          const u = (prompt("Link address (https://…)") || "").trim();
          if (!u) return;
          if (!/^(https?:|mailto:)/i.test(u)) { alert("Use a full address starting with https://"); return; }
          document.execCommand("createLink", false, u);
        }
        else document.execCommand(c, false, null);
      };
    });
    ed.addEventListener("paste", async e => {
      const h = e.clipboardData && e.clipboardData.getData("text/html");
      if (!h) return;   // 글자만이면 브라우저 그대로
      e.preventDefault();
      const r = await clean(h, sb);
      document.execCommand("insertHTML", false, r.html);
      if (r.removed.length) alert("Some pasted parts are not allowed on the site and were left out: " + r.removed.join(", "));
    });

    box.querySelector('[data-m="cancel"]').onclick = () => {
      const now = srcMode ? src.value : ed.innerHTML;
      if (now !== edStart && !confirm("Close without saving your changes?")) return;
      closeModal();
    };
    box.querySelector('[data-m="save"]').onclick = async () => {
      const r = await clean(srcMode ? src.value : ed.innerHTML, sb);
      const html = norm(r.html);
      const isEdited = row.description_html !== null && row.description_html !== undefined;
      if (html === baseline) { closeModal(); return; }   // desc v1a — 손대지 않았다 → 저장 안 함 · Cin7 을 계속 따른다(고친 적 있는 것은 그대로 IMS 글)
      if (html === "" && !confirm("Save an empty description? The site will show none — Cin7's text is not used while the IMS text is kept.")) return;
      if (!isEdited && !confirm("Save this description in IMS?\n\nFrom now on the daily Cin7 reload will not change it. You can go back with “Follow Cin7 again”.")) return;
      const line = Object.assign({ op: "description_set", html: html, old: isEdited ? row.description_html : null },
                                 kind === "family" ? { family_sku: row.sku } : { sku: row.sku });
      await runTwoStep(opts, [line]);
    };
  }

  async function followCin7(opts) {
    const { kind, row } = opts;
    if (!confirm(`Follow Cin7 again for ${row.sku}?\n\nThe text written in IMS is dropped and the Cin7 description is used. The daily reload keeps it up to date from then on.`)) return;
    const line = Object.assign({ op: "description_follow_cin7", old: row.description_html },
                               kind === "family" ? { family_sku: row.sku } : { sku: row.sku });
    await runTwoStep(opts, [line]);
  }

  /* ── 저장 — 두 번 부르기(판정 176 · products.html runWindow 와 같은 순서) ── */
  async function runTwoStep(opts, lines) {
    const { sb, onChanged } = opts;
    modal(`<h4>Checking…</h4><div class="pbody"><div class="msg">Checking with the server…</div></div>`);
    const r1 = await sb.rpc("product_update", { p_changes: lines, p_commit: false, p_ack: [] });
    if (r1.error) return showResult({ error: r1.error.message });
    const d1 = r1.data || {};
    if ((d1.blocks || []).length) return showResult(d1);
    if ((d1.warnings || []).length) return showResult(d1, () => commit(d1.warnings.map(w => w.key)));
    return commit([]);

    async function commit(ack) {
      modal(`<h4>Saving…</h4><div class="pbody"><div class="msg">Saving…</div></div>`);
      const r2 = await sb.rpc("product_update", { p_changes: lines, p_commit: true, p_ack: ack });
      if (r2.error) return showResult({ error: r2.error.message });
      const d2 = r2.data || {};
      if (d2.committed) { closeModal(); if (onChanged) await onChanged(); return; }
      if ((d2.blocks || []).length) return showResult(d2);
      return showResult(d2, () => commit((d2.warnings || []).map(w => w.key)));
    }
  }
  function showResult(d, onGo) {
    const li = x => `<li>${x.sku ? `<span class="sk">${esc(x.sku)}</span> — ` : ""}${esc(x.message)}</li>`;
    const blocks = d.blocks || [], warns = d.warnings || [];
    const body = d.error ? `<div class="msg err">${esc(d.error)}</div>`
      : `${blocks.length ? `<h5>Not saved — fix these first</h5><ul class="blk">${blocks.map(li).join("")}</ul>` : ""}
         ${warns.length ? `<h5>${blocks.length ? "Also" : "Please confirm"}</h5><ul class="wrn">${warns.map(li).join("")}</ul>` : ""}`;
    const go = (!d.error && !blocks.length && onGo) ? '<button class="pobtn go" data-m="go">Save anyway</button>' : "";
    const box = modal(`<h4>${d.error ? "Could not save" : blocks.length ? "Not saved" : "Check before saving"}</h4>
      <div class="pbody res">${body}</div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn" data-m="close">${go ? "Cancel" : "Close"}</button>${go}</div>`);
    box.querySelector('[data-m="close"]').onclick = closeModal;
    const g = box.querySelector('[data-m="go"]'); if (g) g.onclick = onGo;
  }

  window.imsDesc = { card, wire, clean: (html, sb) => clean(html, sb) };
})();
