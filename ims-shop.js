/* Asung IMS — Shopify 카드(shop-2c · 판정 404 ~ 415 · DB shop-2a1 81d779c · shop-2a2 0d3eb6e · EF shop-2b 2f6136f)
   ─────────────────────────────────────────────
   ⚠️ 부르는 순서: supabase-js → ims-config.js → ims-ui.js → ims-auth.js → ims-shop.js (esc · imsTs · imsPhotoUrl · imsAuth 를 쓴다)
   📌 2026-10-10 · 대화 Claude · shop v2(stock-1c · 판정 421 ~ 425): 스토어 줄마다 위치별 「Stock on Shopify」 표(뷰 shop_stock_list · 변형 × 위치 · 보낸 숫자 · 시각 · 에러 · 보내는 중) · 「Send stock now」(EF stock_push · 바로 · 판정 415 결) · family 구성원 화면에도 그 변형의 위치별 숫자 · 안내 글 sold out → not available(판정 425)
   📌 2026-10-10 · shop v1 · shop v1a(Open in Shopify 링크 밑줄 없앰 — Caleb 화면 시험) · shop v1b(판정 416: products.html Edit 안에서도 읽기만으로 보인다 — card(kind, { readOnly }) · wire opts.readOnly → 단추 없음)

   읽기(DB — 화면은 표를 직접 쓰지 않는다)
     뷰 shop_store_list     스토어(code · label · shop_domain · is_active)
     뷰 shop_listing_list   스토어 × 대상 한 줄 — is_on · turned_on/off_at · *_by_name · shopify_product_gid · handle · shopify_status
                            · last_pushed_at · last_status(ok | error | pending) · last_error · open_queue(열린 큐 수) · last_queue_done_at
   쓰기
     창구 shop_listing_set(p_changes, p_commit, p_ack) — 문 ims_require_write('shopify') · 두 번 부르기(판정 176)
       listing_on / listing_off {store_code, family_sku | sku, old}  old = 화면이 본 is_on 글자('true' | 'false') · 한 번도 안 켰으면 null
       family_web_image_set {family_sku, product_image_id | null, old}  old = 화면이 본 web_image_id(null 이면 null)
     뷰 shop_stock_list(stock-1a) — 변형 × 위치 한 줄: product_id · sku · store_id · location_name · warehouse_name · quantity · sent_at · last_status · last_error · open_queue
     EF shopify {action:'stock_push', store, family_sku | sku} — 재고를 바로(force) · 200 { ok, sent_items, activated, items[], blocked[] } · 404 · 409 · 403 · 502
     EF shopify {action:'push', store, family_sku | sku} — 판정 415: Send now 는 큐를 거치지 않고 바로(직원 길 · 서버가 ims_can_write('shopify'))
       200 result ok | skipped_same_hash · 422 description_forbidden_after_clean:… · 404 · 409 · 502 — 응답 몸은 error.context.json()

   판정
     404 세트는 sellable 만 · 405 끄면 ARCHIVED(지우지 않음) · 406 꺼진 구성원 = 그 변형만 Sold out · 413 IMS 주권(숨기는 길 = 보냄 끄기)
     415 Send now = 바로 보내기 · 켜기 · 끄기는 큐 → cron 1 분(ims-shop-drain) → 카드가 몇 초마다 다시 읽는다
     family 구성원(낱개 · family_id 있음)은 family 로만 보낸다(shop-2-0) — 상품 화면에는 링크만

   담은 것
     imsShop.card(kind, o)          카드 HTML(자리만) — kind "product" | "family" · o = { readOnly }(판정 416 · Edit 안)
     imsShop.wire(root, opts)       채운다 · opts = { kind, row, sb, family (상품의 family 행 · 있으면), members ([{id, sku}] · family 만), readOnly }
*/
(function () {
  "use strict";

  const POLL_MS = 4000, POLL_MAX = 30;           // 켜기 · 끄기 뒤 4 초 × 30 = 2 분까지 다시 읽는다(cron 1 분 + EF 몇 초)
  const canShop = () => !!(window.imsAuth && imsAuth.canWrite && imsAuth.canWrite("shopify"));
  const gidNum = (g) => { const m = String(g || "").match(/(\d+)$/); return m ? m[1] : ""; };
  const adminUrl = (domain, gid) => {
    const h = String(domain || "").replace(/\.myshopify\.com$/i, "");
    const n = gidNum(gid);
    return h && n ? `https://admin.shopify.com/store/${encodeURIComponent(h)}/products/${n}` : "";
  };

  /* ── 모양(한 번만) ────────────────────────────────────── */
  function ensureStyle() {
    if (document.getElementById("imsShopStyle")) return;
    const st = document.createElement("style"); st.id = "imsShopStyle";
    st.textContent = `
      .ishop-row{display:grid;grid-template-columns:minmax(150px,1.1fr) minmax(200px,2fr) auto;gap:10px 14px;align-items:start;padding:10px 14px;border-top:1px solid var(--line,#e4e7ec)}
      .ishop-row:first-of-type{border-top:0}
      .ishop-store b{display:block;font-size:13px}
      .ishop-store span{font-size:11.5px}
      .ishop-state{font-size:12.5px;line-height:1.55}
      .ishop-state .chip{margin-right:4px}
      .ishop-err{color:var(--bad,#b42318);font-size:12px;word-break:break-word}
      .ishop-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
      .ishop-btns a.pobtn{text-decoration:none;color:inherit;display:inline-flex;align-items:center}
      .ishop-res{grid-column:1 / -1;font-size:12.5px;padding:6px 10px;border-radius:8px;background:#f5f7fb}
      .ishop-res.bad{background:#fef3f2;color:var(--bad,#b42318)}
      .ishop-res.good{background:#ecfdf3;color:#067647}
      .ishop-web{display:flex;gap:12px;align-items:center;padding:10px 14px;border-top:1px solid var(--line,#e4e7ec)}
      .ishop-web img{width:64px;height:64px;object-fit:contain;border:1px solid var(--line,#e4e7ec);border-radius:8px;background:#fff}
      .ishop-pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px}
      .ishop-pick button{border:2px solid var(--line,#e4e7ec);border-radius:10px;background:#fff;padding:6px;cursor:pointer;text-align:center;font-size:11px}
      .ishop-pick button.cur{border-color:#3b5bdb}
      .ishop-pick img{width:100%;height:90px;object-fit:contain;display:block;margin-bottom:4px}
      .ishop-pick .none{height:90px;display:flex;align-items:center;justify-content:center;color:var(--muted,#667085)}
      .res .blk li{color:var(--bad)} .res .wrn li{color:var(--warn)}
      .ishop-stock{grid-column:1 / -1;font-size:12.5px}
      .ishop-stock table{border-collapse:collapse;width:auto;min-width:320px}
      .ishop-stock th,.ishop-stock td{padding:3px 12px 3px 0;text-align:left;border-bottom:1px solid var(--line,#e4e7ec)}
      .ishop-stock th{font-weight:600;font-size:11px;color:var(--muted,#667085);text-transform:uppercase;letter-spacing:.03em}
      .ishop-stock td.num{text-align:right;font-variant-numeric:tabular-nums}
      .ishop-stock .cap{font-weight:600;margin:2px 0 4px}
      @media (max-width:760px){.ishop-row{grid-template-columns:1fr}.ishop-btns{justify-content:flex-start}}
    `;
    document.head.appendChild(st);
  }
  function modal(html) {
    ensureStyle();
    let m = document.getElementById("ishopModal");
    if (!m) {
      m = document.createElement("div"); m.className = "pomodal"; m.id = "ishopModal";
      m.innerHTML = '<div class="pobox" id="ishopBox"></div>';
      document.body.appendChild(m);
    }
    document.getElementById("ishopBox").innerHTML = html;
    m.hidden = false;
    return document.getElementById("ishopBox");
  }
  function closeModal() { const m = document.getElementById("ishopModal"); if (m) { m.hidden = true; document.getElementById("ishopBox").innerHTML = ""; } }

  /* ── 카드 자리 ────────────────────────────────────────── */
  function card(kind, o) {
    ensureStyle();
    const ro = !!(o && o.readOnly);
    return `<div class="card" data-ishop-card="${esc(kind)}">
      <h3 class="ims-sec" data-sec="" style="display:flex;align-items:center;gap:8px">Shopify <span class="n" data-ishop-n></span>${ro ? '<span class="dim" style="margin-left:auto;font-weight:400;text-transform:none;font-size:11px;font-family:inherit">Save or Cancel first to change this</span>' : ""}</h3>
      <div data-ishop-body><div class="msg">Loading…</div></div>
      <div class="note" data-ishop-note></div></div>`;
  }

  /* ── 재고 표(stock-1c) — 한 스토어의 변형 × 위치 ── */
  function stockBlock(rows, isOn) {
    if (!rows.length) return isOn ? `<div class="ishop-stock"><div class="cap">Stock on Shopify</div><span class="dim">Not sent yet.</span></div>` : "";
    const locs = [...new Set(rows.map(r => r.location_name || r.warehouse_name))].sort();
    const bySku = {};
    rows.forEach(r => { (bySku[r.sku] = bySku[r.sku] || { sku: r.sku, q: {}, at: null, errs: [], open: 0 }); const x = bySku[r.sku];
      x.q[r.location_name || r.warehouse_name] = r.quantity;
      if (r.sent_at && (!x.at || r.sent_at > x.at)) x.at = r.sent_at;
      if (r.last_status === "error" && r.last_error) x.errs.push(r.last_error);
      x.open = Math.max(x.open, Number(r.open_queue) || 0); });
    const list = Object.values(bySku).sort((a, b) => String(a.sku).localeCompare(String(b.sku)));
    const waiting = list.some(x => x.open > 0);
    return `<div class="ishop-stock"><div class="cap">Stock on Shopify${waiting ? ` <span style="color:var(--warn,#b54708);font-weight:400">· sending… (within a minute)</span>` : ""}</div>
      <table><thead><tr>${list.length > 1 ? "<th>SKU</th>" : ""}${locs.map(l => `<th style="text-align:right">${esc(l)}</th>`).join("")}<th>Sent</th></tr></thead><tbody>
      ${list.map(x => `<tr>${list.length > 1 ? `<td class="mono">${esc(x.sku)}</td>` : ""}${locs.map(l => `<td class="num">${x.q[l] == null ? '<span class="dim">—</span>' : esc(String(Number(x.q[l])))}</td>`).join("")}
        <td class="dim">${x.at ? esc(imsTs(x.at)) : "—"}${x.errs.length ? `<div class="ishop-err">${esc(x.errs.join(" · "))}</div>` : ""}</td></tr>`).join("")}
      </tbody></table></div>`;
  }
  const stockWaiting = (rows) => rows.some(r => Number(r.open_queue) > 0);

  /* ── 채우기 ───────────────────────────────────────────── */
  const pollers = new WeakMap();
  async function wire(root, opts) {
    const { kind } = opts;
    const el = root.querySelector(`[data-ishop-card="${kind}"]`);
    if (!el) return;
    await fill(el, opts, 0);
  }

  async function fill(el, opts, pollN) {
    const { kind, row, sb, family } = opts;
    const body = el.querySelector("[data-ishop-body]"), note = el.querySelector("[data-ishop-note]"), nEl = el.querySelector("[data-ishop-n]");
    const isMember = kind === "product" && row.family_id && !row.parent_product_id;
    const isSet = kind === "product" && !!row.parent_product_id;

    /* family 구성원 — family 로만 보낸다(단추 없음) */
    if (isMember) {
      const fam = family || {};
      const off = !(row.is_active && row.sellable !== false);
      const sk = await sb.from("shop_stock_list").select("store_id,store_code,product_id,sku,location_name,warehouse_name,quantity,sent_at,last_status,last_error,open_queue").eq("product_id", row.id);
      if (!el.isConnected) return;
      const skRows = sk.data || [];
      const byStoreCode = {}; skRows.forEach(r => { (byStoreCode[r.store_code || r.store_id] = byStoreCode[r.store_code || r.store_id] || []).push(r); });
      const memberStock = Object.keys(byStoreCode).sort().map(c => `<div class="ishop-row"><div class="ishop-store"><b>${esc(c)}</b></div>${stockBlock(byStoreCode[c], true)}</div>`).join("");
      body.innerHTML = memberStock + `<div class="msg" style="text-align:left;padding:12px 14px">
        Sent to Shopify as a variant of its family
        <a class="lnk mono" href="families.html?id=${esc(row.family_id)}">${esc(fam.sku || "family")}</a>${fam.name ? " " + esc(fam.name) : ""}
        — switch it on or off there.${off ? `<br><span style="color:var(--warn,#b54708)">This variant is inactive or not sellable — in Shopify it shows as not available, with stock 0 (it is not removed).</span>` : ""}</div>`;
      note.innerHTML = ""; nEl.textContent = "";
      const prevM = pollers.get(el); if (prevM) { clearTimeout(prevM); pollers.delete(el); }
      if (stockWaiting(skRows) && pollN < POLL_MAX) pollers.set(el, setTimeout(() => { if (el.isConnected) fill(el, opts, pollN + 1); }, POLL_MS));
      return;
    }
    if (isSet && row.sellable === false) {
      body.innerHTML = `<div class="msg" style="text-align:left;padding:12px 14px">Sets are not sent to Shopify. Only a set marked sellable can be switched on.</div>`;
      note.innerHTML = ""; nEl.textContent = "";
      return;
    }

    const stockIds = kind === "family" ? (opts.members || []).map(m => m.id) : [row.id];
    const [st, ls, sk] = await Promise.all([
      sb.from("shop_store_list").select("id,code,label,shop_domain,is_active").order("code"),
      sb.from("shop_listing_list").select("*").eq(kind === "family" ? "family_id" : "product_id", row.id),
      stockIds.length ? sb.from("shop_stock_list").select("store_id,product_id,sku,location_name,warehouse_name,quantity,sent_at,last_status,last_error,open_queue").in("product_id", stockIds) : Promise.resolve({ data: [] }),
    ]);
    if (!el.isConnected) return;
    if (st.error || ls.error) { body.innerHTML = `<div class="msg err">${esc((st.error || ls.error).message)}</div>`; return; }
    const stores = (st.data || []).filter(s => s.is_active || (ls.data || []).some(l => l.store_id === s.id));
    const byStore = {}; (ls.data || []).forEach(l => { byStore[l.store_id] = l; });
    nEl.textContent = String((ls.data || []).filter(l => l.is_on).length);

    if (!stores.length) { body.innerHTML = `<div class="msg">No Shopify store is set up — Settings → Shopify Stores.</div>`; note.innerHTML = ""; return; }

    const can = canShop() && !opts.readOnly;   // shop v1b — Edit 안에서는 단추 없이 읽기만(판정 416)
    let anyWaiting = false;
    body.innerHTML = stores.map(s => {
      const l = byStore[s.id] || null;
      const waiting = !!(l && Number(l.open_queue) > 0);
      if (waiting) anyWaiting = true;
      const skRows = (sk.data || []).filter(r => r.store_id === s.id);
      if (l && l.is_on && stockWaiting(skRows)) anyWaiting = true;
      const sent = !l ? '<span class="dim">Not sent</span>'
        : l.is_on ? `<span class="on">Sent</span> <span class="dim">· on ${esc(imsTs(l.turned_on_at))}${l.turned_on_by_name ? " by " + esc(l.turned_on_by_name) : ""}</span>`
                  : `<span class="off">Switched off</span> <span class="dim">· ${esc(imsTs(l.turned_off_at))}${l.turned_off_by_name ? " by " + esc(l.turned_off_by_name) : ""}</span>`;
      const sh = l && l.shopify_product_gid
        ? `<span class="chip ${l.shopify_status === "ACTIVE" ? "good" : "warn"}">${esc(l.shopify_status || "?")}</span>`
          + (l.last_status === "ok" ? `<span class="chip good">last send ok</span>` : l.last_status === "error" ? `<span class="chip bad">last send failed</span>` : "")
          + (l.last_pushed_at ? ` <span class="dim">${esc(imsTs(l.last_pushed_at))}</span>` : "")
        : (l && l.is_on ? '<span class="dim">Not in Shopify yet</span>' : "");
      const err = l && l.last_status === "error" && l.last_error ? `<div class="ishop-err">${esc(l.last_error)}</div>` : "";
      const wait = waiting ? `<div style="color:var(--warn,#b54708)">Sending… (within a minute)</div>` : "";
      const url = l ? adminUrl(s.shop_domain, l.shopify_product_gid) : "";
      const target = kind === "family" ? { family_sku: row.sku } : { sku: row.sku };
      const tj = esc(JSON.stringify(target));
      const old = l ? String(!!l.is_on) : "";
      const btns = [];
      if (can && s.is_active) {
        if (l && l.is_on) {
          btns.push(`<button class="pobtn go" data-ishop="push" data-store="${esc(s.code)}" data-t="${tj}" title="Send to Shopify now and show the result">Send now</button>`);
          btns.push(`<button class="pobtn" data-ishop="stockpush" data-store="${esc(s.code)}" data-t="${tj}" title="Send the stock numbers to Shopify now and show the result">Send stock now</button>`);
          btns.push(`<button class="pobtn" data-ishop="off" data-store="${esc(s.code)}" data-t="${tj}" data-old="${esc(old)}" title="Stop sending — the Shopify product becomes Archived (not deleted)">Turn off</button>`);
        } else {
          btns.push(`<button class="pobtn go" data-ishop="on" data-store="${esc(s.code)}" data-t="${tj}" data-old="${esc(old)}" title="Send this to the Shopify store">Turn on</button>`);
        }
      }
      if (url) btns.push(`<a class="pobtn" href="${esc(url)}" target="_blank" rel="noopener" title="Open the product in the Shopify admin">Open in Shopify</a>`);
      return `<div class="ishop-row" data-ishop-row="${esc(s.code)}">
        <div class="ishop-store"><b>${esc(s.label || s.code)}</b><span class="mono dim">${esc(s.shop_domain)}${s.is_active ? "" : " · store off"}</span></div>
        <div class="ishop-state">${sent}<div>${sh}</div>${err}${wait}</div>
        <div class="ishop-btns">${btns.join("")}</div>
        ${l && l.is_on ? stockBlock(skRows, true) : ""}
      </div>`;
    }).join("") + (kind === "family" ? `<div data-ishop-web></div>` : "");

    note.innerHTML = "Shopify follows IMS — prices, photos, text and variants changed here go to Shopify within a minute. "
      + "Showing it on the website (sales channels) is done in Shopify. To hide a product, turn it off here — it becomes Archived."
      + (can || opts.readOnly ? "" : ` <span class="dim">You can see this, but turning it on or off needs the Shopify permission.</span>`);

    el.querySelectorAll("[data-ishop]").forEach(b => {
      b.onclick = () => act(el, opts, b);
    });
    if (kind === "family") await fillWeb(el, opts, can);

    /* 켜기 · 끄기 뒤 — 큐가 빌 때까지 몇 초마다 다시 읽는다 */
    const prev = pollers.get(el); if (prev) { clearTimeout(prev); pollers.delete(el); }
    if (anyWaiting && pollN < POLL_MAX) {
      pollers.set(el, setTimeout(() => { if (el.isConnected) fill(el, opts, pollN + 1); }, POLL_MS));
    }
  }

  /* ── 단추 ─────────────────────────────────────────────── */
  async function act(el, opts, b) {
    const a = b.dataset.ishop, store = b.dataset.store;
    let target; try { target = JSON.parse(b.dataset.t); } catch (e) { return; }
    const who = target.family_sku || target.sku;
    if (a === "push") return pushNow(el, opts, store, target, b);
    if (a === "stockpush") return stockPushNow(el, opts, store, target, b);
    if (a === "on" || a === "off") {
      const msg = a === "on"
        ? `Send ${who} to the Shopify store "${store}"?\n\nIt goes to Shopify within a minute. It is not shown on the website until someone publishes it in Shopify.`
        : `Turn off ${who} on the Shopify store "${store}"?\n\nThe Shopify product becomes Archived (hidden, not deleted). Turning it on again brings it back.`;
      if (!confirm(msg)) return;
      const line = Object.assign({ op: a === "on" ? "listing_on" : "listing_off", store_code: store, old: b.dataset.old === "" ? null : b.dataset.old }, target);
      await runTwoStep(opts.sb, [line], async () => { await fill(el, opts, 0); });
    }
  }

  async function pushNow(el, opts, store, target, b) {
    const rowEl = b.closest("[data-ishop-row]");
    const old = rowEl.querySelector(".ishop-res"); if (old) old.remove();
    const res = document.createElement("div"); res.className = "ishop-res"; res.textContent = "Sending to Shopify…";
    rowEl.appendChild(res);
    rowEl.querySelectorAll("button").forEach(x => { x.disabled = true; });
    const { data, error } = await opts.sb.functions.invoke("shopify", { body: Object.assign({ action: "push", store }, target) });
    let r = data;
    if (error) { try { r = await error.context.json(); } catch (e) { r = { ok: false, error: error.message }; } }
    r = r || { ok: false, error: "No answer from the server" };
    if (r.ok && r.result === "skipped_same_hash") {
      res.className = "ishop-res"; res.textContent = "Nothing changed — Shopify already has the same content.";
    } else if (r.ok) {
      res.className = "ishop-res good";
      res.textContent = `Sent · ${r.status || ""} · ${r.variants} variant${r.variants === 1 ? "" : "s"} · ${r.media} photo${r.media === 1 ? "" : "s"}`
        + (r.clean && r.clean.removed && r.clean.removed.length ? ` · left out of the description: ${r.clean.removed.join(", ")}` : "");
    } else {
      res.className = "ishop-res bad";
      const e = String(r.error || "Failed");
      res.textContent = e.indexOf("description_forbidden_after_clean") >= 0
        ? "Not sent — the description still has something the site does not allow. Edit the description once and save it, then send again. (" + e + ")"
        : "Not sent — " + e;
    }
    /* 결과 줄은 남기고 위의 상태만 새로 읽는다 */
    const keep = res.outerHTML;
    await fill(el, opts, 0);
    const again = el.querySelector(`[data-ishop-row="${CSS.escape(store)}"]`);
    if (again) again.insertAdjacentHTML("beforeend", keep);
  }

  async function stockPushNow(el, opts, store, target, b) {
    const rowEl = b.closest("[data-ishop-row]");
    const old = rowEl.querySelector(".ishop-res"); if (old) old.remove();
    const res = document.createElement("div"); res.className = "ishop-res"; res.textContent = "Sending stock to Shopify…";
    rowEl.appendChild(res);
    rowEl.querySelectorAll("button").forEach(x => { x.disabled = true; });
    const { data, error } = await opts.sb.functions.invoke("shopify", { body: Object.assign({ action: "stock_push", store }, target) });
    let r = data;
    if (error) { try { r = await error.context.json(); } catch (e) { r = { ok: false, error: error.message }; } }
    r = r || { ok: false, error: "No answer from the server" };
    const blocked = (r.blocked || []).filter(x => x.result === "error");
    const itemErr = (r.items || []).filter(x => x.result === "error");
    if (r.ok && !itemErr.length) {
      res.className = "ishop-res good";
      res.textContent = `Stock sent · ${r.sent_items || 0} number${r.sent_items === 1 ? "" : "s"}`
        + (r.activated ? ` · ${r.activated} location link${r.activated === 1 ? "" : "s"} added` : "")
        + (blocked.length ? ` · not sent: ${blocked.map(x => x.sku + (x.error ? " (" + x.error + ")" : "")).join(", ")}` : "");
    } else {
      res.className = "ishop-res bad";
      const msgs = [r.error].concat(itemErr.map(x => x.sku + ": " + x.error)).concat(blocked.map(x => x.sku + ": " + x.error)).filter(Boolean);
      res.textContent = "Stock not sent — " + (msgs.join(" · ") || "Failed");
    }
    const keep = res.outerHTML;
    await fill(el, opts, 0);
    const again = el.querySelector(`[data-ishop-row="${CSS.escape(store)}"]`);
    if (again) again.insertAdjacentHTML("beforeend", keep);
  }

  /* ── family 웹 대표 사진(판정 374 · shop-2a1 web_image_id) ───────────── */
  async function fillWeb(el, opts, can) {
    const { row, sb } = opts;
    const box = el.querySelector("[data-ishop-web]"); if (!box) return;
    const ids = (opts.members || []).map(m => m.id);
    let imgs = [];
    if (ids.length) {
      const { data } = await sb.from("product_image").select("id,product_id,storage_path,is_primary,sort_order").in("product_id", ids).eq("is_active", true);
      imgs = data || [];
    }
    if (!el.isConnected) return;
    const skuOf = {}; (opts.members || []).forEach(m => { skuOf[m.id] = m.sku; });
    const curImg = row.web_image_id ? imgs.find(x => x.id === row.web_image_id) : null;
    const firstPrimary = imgs.filter(x => x.is_primary).sort((a, b) => String(skuOf[a.product_id]).localeCompare(String(skuOf[b.product_id])))[0] || null;
    const shown = curImg || firstPrimary;
    box.innerHTML = `<div class="ishop-web">
      ${shown ? `<img src="${esc(imsPhotoUrl(shown.storage_path))}" alt="">` : `<span class="dim">No photo</span>`}
      <div style="flex:1;font-size:12.5px"><b>First photo on Shopify</b><br>
        ${curImg ? `Chosen: photo of <span class="mono">${esc(skuOf[curImg.product_id] || "")}</span>`
          : row.web_image_id ? `<span style="color:var(--warn,#b54708)">The chosen photo is no longer an active photo of a variant — the default is used.</span>`
          : `<span class="dim">Not chosen — uses the first variant's main photo${firstPrimary ? ` (<span class="mono">${esc(skuOf[firstPrimary.product_id] || "")}</span>)` : ""}.</span>`}</div>
      ${can && imgs.length ? `<button class="pobtn" data-ishop-webpick>Choose photo</button>` : ""}
    </div>`;
    const pb = box.querySelector("[data-ishop-webpick]");
    if (pb) pb.onclick = () => openPicker(el, opts, imgs, skuOf);
  }

  function openPicker(el, opts, imgs, skuOf) {
    const { row, sb } = opts;
    const list = imgs.slice().sort((a, b) => String(skuOf[a.product_id]).localeCompare(String(skuOf[b.product_id])) || (b.is_primary - a.is_primary) || (a.sort_order - b.sort_order));
    const box = modal(`<h4>First photo on Shopify — <span class="mono">${esc(row.sku)}</span></h4>
      <div class="pbody"><div class="ishop-pick">
        <button data-pick="" class="${row.web_image_id ? "" : "cur"}"><div class="none">Default</div>first variant's main photo</button>
        ${list.map(x => `<button data-pick="${esc(x.id)}" class="${x.id === row.web_image_id ? "cur" : ""}">
          <img src="${esc(imsPhotoUrl(x.storage_path))}" alt=""><span class="mono">${esc(skuOf[x.product_id] || "")}</span>${x.is_primary ? " · main" : ""}</button>`).join("")}
      </div></div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn" data-m="close">Cancel</button></div>`);
    box.querySelector('[data-m="close"]').onclick = closeModal;
    box.querySelectorAll("[data-pick]").forEach(b => {
      b.onclick = async () => {
        const id = b.dataset.pick || null;
        if (id === (row.web_image_id || null)) { closeModal(); return; }
        const line = { op: "family_web_image_set", family_sku: row.sku, product_image_id: id, old: row.web_image_id || null };
        await runTwoStep(sb, [line], async () => {
          const { data } = await sb.from("product_family").select("web_image_id").eq("id", row.id).maybeSingle();
          if (data) row.web_image_id = data.web_image_id;
          await fill(el, opts, 0);
        });
      };
    });
  }

  /* ── 두 번 부르기(판정 176 · ims-desc.js 와 같은 순서) ── */
  async function runTwoStep(sb, lines, onDone) {
    modal(`<h4>Checking…</h4><div class="pbody"><div class="msg">Checking with the server…</div></div>`);
    const r1 = await sb.rpc("shop_listing_set", { p_changes: lines, p_commit: false, p_ack: [] });
    if (r1.error) return showResult({ error: r1.error.message });
    const d1 = r1.data || {};
    if ((d1.blocks || []).length) return showResult(d1);
    if ((d1.warnings || []).length) return showResult(d1, () => commit(d1.warnings.map(w => w.key)));
    return commit([]);

    async function commit(ack) {
      modal(`<h4>Saving…</h4><div class="pbody"><div class="msg">Saving…</div></div>`);
      const r2 = await sb.rpc("shop_listing_set", { p_changes: lines, p_commit: true, p_ack: ack });
      if (r2.error) return showResult({ error: r2.error.message });
      const d2 = r2.data || {};
      if (d2.committed) { closeModal(); if (onDone) await onDone(d2); return; }
      if ((d2.blocks || []).length) return showResult(d2);
      return showResult(d2, () => commit((d2.warnings || []).map(w => w.key)));
    }
  }
  function showResult(d, onGo) {
    const li = x => `<li>${esc(x.message)}</li>`;
    const blocks = d.blocks || [], warns = d.warnings || [];
    const body = d.error ? `<div class="msg err">${esc(d.error)}</div>`
      : `${blocks.length ? `<h5>Not saved — fix these first</h5><ul class="blk">${blocks.map(li).join("")}</ul>` : ""}
         ${warns.length ? `<h5>${blocks.length ? "Also" : "Please confirm"}</h5><ul class="wrn">${warns.map(li).join("")}</ul>` : ""}`;
    const go = (!d.error && !blocks.length && onGo) ? '<button class="pobtn go" data-m="go">Go ahead</button>' : "";
    const box = modal(`<h4>${d.error ? "Could not save" : blocks.length ? "Not saved" : "Check before saving"}</h4>
      <div class="pbody res">${body}</div>
      <div class="pfoot"><span class="sp"></span><button class="pobtn" data-m="close">${go ? "Cancel" : "Close"}</button>${go}</div>`);
    box.querySelector('[data-m="close"]').onclick = closeModal;
    const g = box.querySelector('[data-m="go"]'); if (g) g.onclick = onGo;
  }

  window.imsShop = { card, wire };
})();
