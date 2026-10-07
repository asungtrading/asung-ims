/* Asung IMS shared login module
   ─────────────────────────────────────────────
   원본: asung-wms 의 wms-auth.js (2026-09-15 복사 · IMS 용으로 고침)
   ⚠️ 복사본이다. WMS 쪽을 고쳐도 여기 따라오지 않는다 — 반대도 같다.
      복사로 간 이유: IMS 는 다른 Supabase 프로젝트라 URL·anon key·사용자 표가 전부 다르다.

   IMS 용으로 바뀐 곳 넷 (정본 docs/design/po-module.md §10-h)
     ① 설정            WMS_CONFIG → IMS_CONFIG (Asung-IMS)
     ② 신원 조회       wms_staff → ims_staff · ⭐ .eq("auth_user_id", user.id)
                       ⚠️ 이메일이 아니라 auth.uid() 로 잇는다 — 이메일이 바뀌어도 안 끊어지고
                          대소문자 문제가 없다(WMS 가 겪은 함정)
     ③ 활성 판정       data.active → data.is_active  ⚠️ 안 고치면 undefined 라 비활성 계정이 통과한다
     ④ perms 기본값    WMS 는 없으면 ["split","admin","staff"] → IMS 는 [] (권한을 기본으로 주지 않는다)

   ⭐ 판정은 DB 한 곳 — ims_access() (2026-09-17 · 리시빙 ③ 차수 · 마이그레이션 20260917230000)
     로그인 뒤 RPC 한 번: { role, name, modes:['wms','ims'…], screens:{purchasing|master|receiving|staff: 'write'|'read'|null}, warehouses: null(전부)|[uuid…] }
     · 화면은 role·perms 를 직접 가르지 않는다(role 이 넷이 됐다 — 예전 코드는 'manager' 만 알았다).
     · 메뉴·탭 노출 = screens[값] 이 null 이 아니면 보인다('read' 도 보인다 — 읽기 전용으로 들어간다).
     · RPC 가 실패하거나 null 이면 로그인을 막는다 — 조용히 전부 열지 않는다.
     · 화면이 쓰는 법: me.access (콜백의 me 에 실려 온다) 또는 imsAuth.access · imsAuth.canWrite('purchasing') · imsAuth.canView('master')
       ⚠️ me 의 기존 칸(role·perms·name …)은 그대로다 — 화면들의 me.role === 'admin' 은 깨지지 않는다.

   ⭐⭐ 레이아웃 (2026-09-30 · lay-1 · 판정 149 ~ 167) — 이 파일이 모든 화면의 <header> 에 그려 넣는다. 화면 파일은 안 고쳤다.
     · 헤더 왼쪽 = 로고(asung-logo-dark.png · .brand 자리) + 모드 셋(IMS · WMS · POS · 고를 것이 둘 이상일 때만 · 판정 149 · 160)
     · IMS 화면 = 윗줄 펼침 메뉴 Purchasing ▾ · Sales ▾ · Inventory ▾ · Action Center · Settings ▾ (판정 153) · ☰ Menu 는 감춘다
       ✅ [2026-09-30 밤 lay-1c · 판정 169] Purchasing · Sales 의 **문서 화면**에서는 헤더 아래 탭 줄이 다시 선다(lay-1 전 모양) — 펼침 = 다른 갈래로 건너가는 길 · 탭 = 같은 갈래 안 옆 화면
     · WMS 화면 = 로고 + 모드만 더하고 나머지는 그대로(탭 줄 · ☰ Menu · 판정 160) · ☰ 의 내용은 WMS 화면만(IMS 로 가는 길은 모드 단추 하나)
     · POS 화면 = 로고 + 모드 + 이름 + Sign Out (판정 159) · ☰ 감춤 · 펼침 · 탭 없음
     · 110% 는 IMS · POS 만(판정 154 · 157) — 이 파일이 읽히는 즉시 <html data-ims-mode="ims|wms|pos"> 를 달고 ims-ui.css 가 zoom 을 건다
       ⚠️ 화면 파일이 <html data-ims-mode="…"> 를 미리 달아 두면 그대로 둔다(첫 그림부터 110% — 번쩍임이 없다 · 화면 차수에서)
     · 문(index.html) 도우미: imsAuth.firstScreen() · imsAuth.inRecovery (판정 163 · 비밀번호 복구 흐름을 깨지 않는다)
     · 모양은 전부 ims-ui.css 「헤더 — 로고 · 모드 · 윗줄 펼침」 구역 — 펼침 자리는 CSS(position:absolute) · 좌표 계산 없음(zoom 아래 어긋나지 않게)

   쓰는 법 (각 화면 스크립트 맨 위에서):
     imsAuth.start({ changePw:true }, (sb, me) => { ... });
     선택: { requireScreen:'purchasing' } — 그 화면 값이 null 인 사람은 들어오지 못한다(문장 후 signOut).
           ✅ [2026-09-30 실측] 열한 화면이 쓴다 — receiving · transfers · stock-moves · stock-adjustments · wms-* 일곱 (grep 11)
           { requireManager:true } — worker 는 들어오지 못한다(manager·supervisor·admin 통과). 2026-09-30 현재 어느 화면도 쓰지 않는다(grep 0).
   - 세션은 Supabase 가 브라우저에 유지한다 → 한 번 로그인하면 계속 유지.
   - 로그아웃: imsAuth.signOut()
   - "Change Password" 버튼은 {changePw:true} 를 준 화면에만 붙는다. ✅ [2026-09-30 실측] IMS 화면 22 가 준다(WMS 일곱만 안 준다) — index 하나가 아니다.
*/
(function(){
  const cfg = window.IMS_CONFIG || {};
  const IMS_AUTH_BUILD = "nav v5";     // 헤더 빌드 표시 뒤에 붙는다(#buildTag 뒤 · 공통 js 의 판) — 이 파일을 고치면 올린다
  let sb=null, me=null, access=null, onReady=null, opts={};

  /* ⚠️ 비밀번호 복구 — 재설정 메일의 주소는 location.origin+location.pathname(doForgot) 이라 index 로 돌아온다.
     문이 곧바로 다른 화면으로 보내면 PASSWORD_RECOVERY 대화상자가 사라진다 ⇒ 주소의 type=recovery 를 **동기로 먼저** 읽어 둔다
     (supabase-js 가 해시를 처리해 지우기 전 · 이벤트는 비동기라 문의 콜백보다 늦을 수 있다). 문은 imsAuth.inRecovery 로 묻는다. */
  let recovery = /(^|[#&?])type=recovery(&|$)/.test(location.hash) || /(^|[&?])type=recovery(&|$)/.test(location.search);

  /* ---- 화면 표 — 메뉴 · 모드 · 탭이 **이 배열 하나**에서 나온다 (2026-09-17 · 2026-09-30 lay-1 재배치) ----
     [이름, 주소, 화면 값(perms 어휘 · null 이면 로그인만으로 보인다), 모드('ims'|'wms'|'pos'), 탭에 서나(true 면 그 갈래의 탭 줄에 · 판정 169: IMS 는 Purchasing · Sales 의 문서 화면 열 줄 · WMS 는 일곱 전부 · 마스터 · Inventory · Action Center · Settings 는 false = 펼침에만), 갈래]
     ⭐ 화면 값은 ims_perm_catalog() 의 어휘 — purchasing · master · receiving · staff · sales · stock_adjust · transfer · stock_move · picking · packing · fulfillment · wms_receiving · wms_manage.
        노출 = access.screens[값] 이 null 이 아니면('read' 도 보인다). ⚠️ 이 차수(lay-1)는 열쇠 칸을 하나도 바꾸지 않았다.
     ⭐ 갈래(여섯째) — IMS 윗줄 펼침의 자리: 'purchasing' · 'sales' · 'inventory' · 'action' · 'settings' (판정 150 · 151 · 152 · 164 · 165 · 166) · null = 펼침에 안 선다(Dashboard) · WMS 는 'warehouse' 하나.
        갈래는 그 사람에게 보이는 화면이 하나라도 있을 때만 선다 · 줄 순서 = 펼침 안 순서.
     ⭐ 모드 — 'pos' 는 DB 모드가 아니다(ims_perm_catalog modes = wms · ims 둘뿐 · 20260928201753). POS 모드는 **화면 쪽에서만**: access.modes 에 'ims' 가 있고 pos.html 이 보이면(sales 열쇠) 선다 — 아래 canEnter · ⬜ 판정 거리(lay-1 보고 ①).
     ⚠️ 빈 링크를 메뉴에 두지 않는다(판정 162) — 아직 없는 화면은 **주석 줄로 순서 자리만**. ⚠️ dashboard.html · system-check.html 은 lay-2 가 짓는다(같이 push).
     ⚠️ [2026-09-30] 이름은 보이는 글자만(파일 · 열쇠 무변): Manager List → 「Action Center」(판정 165) · Purchase Invoices → 「Purchase Invoices & Credits」(invoices.html · 판정 170 · 화면 <title> 과 같다 · 이 화면이 크레딧도 다룬다 · & 는 네 출력 경로 전부 esc() 를 지난다) · Supplier Payments(payments.html) · Purchase Receipts(receiving.html · 판정 40).
     ⚠️ Supplier Products 는 상품 화면이 설 때까지 Inventory 의 Products 바로 뒤(판정 151 임시) — 그 뒤 메뉴에서 빠진다.
     ⚠️ [2026-10-01 thumb-1] Product Sheet(product-sheet.html) 를 Products 뒤에 더했다(판정 200) · Supplier Products 빼기는 Sheet 가 선 뒤 · Families 는 메뉴에 남는다(판정 210 · 203 고침) · 상품 만들기 · 사진 ⬜ 자리는 Products 가 맡아 지웠다
     ✅ Home(index.html) 줄은 없앴다 — index 는 문이다(판정 163). */
  const items=[
    // IMS 첫 화면 — 펼침에 안 선다(갈래 null) · 로고 · IMS 모드 단추 · firstScreen() 이 여기로 보낸다 (판정 158 · 163 · lay-2)
    ["Dashboard","dashboard.html",null,"ims",false,null],
    // Purchasing (판정 150 · 탭 다섯 = 문서 화면 · 판정 169)
    ["Purchase Orders","po.html","purchasing","ims",true,"purchasing"],
    ["Purchase Invoices & Credits","invoices.html","purchasing","ims",true,"purchasing"],
    ["Charges","charges.html","purchasing","ims",true,"purchasing"],
    ["Supplier Payments","payments.html","purchasing","ims",true,"purchasing"],
    ["Purchase Receipts","receiving.html","receiving","ims",true,"purchasing"],
    ["Suppliers","suppliers.html","master","ims",false,"purchasing"],
    // Sales (판정 150 · 탭 다섯 = 문서 화면 · 판정 169 · POS 는 모드로 갈라 여기 없다 · 판정 159)
    ["Sales Orders","so.html","sales","ims",true,"sales"],
    ["Sales Invoices","so-invoices.html","sales","ims",true,"sales"],
    ["Customer Payments","so-payments.html","sales","ims",true,"sales"],
    ["Credit Notes","so-credits.html","sales","ims",true,"sales"],
    ["Backorders","so-backorders.html","sales","ims",true,"sales"],
    ["Customers","customers.html","sales","ims",false,"sales"],   // cs-5 ①(2026-10-05 · 판정 236 ~ 241) — 판정 150 · 162 의 자리 · 보기는 sales 읽기 · 쓰기는 창구가 가른다
    // Inventory (판정 150 · 151)
    ["Stock Availability","stock.html",null,"ims",false,"inventory"],   // stk-3(2026-10-06 · 판정 257 · 258) — 브랜치별 가용 · bin · 움직임 · 열쇠 없음 = 로그인한 직원 누구나(창구 문 = 활성 직원)
    ["Products","products.html","master","ims",false,"inventory"],
    ["Product Sheet","product-sheet.html","master","ims",false,"inventory"],
    ["Supplier Products","supplier-products.html","master","ims",false,"inventory"],
    ["Families","families.html","master","ims",false,"inventory"],
    ["Stock Adjustments","stock-adjustments.html","stock_adjust","ims",false,"inventory"],
    ["Transfers","transfers.html","transfer","ims",false,"inventory"],
    ["Bin Moves (office)","stock-moves.html","stock_move","ims",false,"inventory"],
    // Action Center — 펼침 없이 링크 하나 (판정 152 · 165 · 파일 manager-list.html · 열쇠 sales 그대로)
    ["Action Centre","manager-list.html","sales","ims",false,"action"],
    // Settings (판정 150 · 151 · 166)
    ["Settings","settings.html","master","ims",false,"settings"],
    ["Surcharge Groups","surcharge-groups.html","master","ims",false,"settings"],   // surcharge-4b(판정 231) — 보기는 master · 고치기는 admin(창구)
    ["Staff","staff.html","staff","ims",false,"settings"],
    ["Discount Rules","discount-rules.html","master","ims",false,"settings"],   // dr v1(2026-10-06 · dsc-4 · 판정 285 · 330 ~ 344) — 보기 · 고치기 master · 쿠폰 발행 · 무효
    ["System Check","system-check.html",null,"ims",false,"settings"],
    // POS 모드 — pos.html 하나 · 펼침 · ☰ 없음 (판정 159)
    ["POS","pos.html","sales","pos",false,null],
    // WMS 모드 — 탭 줄 · ☰ Menu 유지 (판정 160) · ⭐ Split & Waves 맨 앞(판정 173) — 탭 · ☰ · WMS 모드 단추 · 로고 · firstScreen() 이 이 순서를 따른다:
    //   wms_manage 가 있는 사람(매니저 이상)의 WMS 첫 화면 = Split & Waves · 없는 창고 직원 = Picking
    ["Split & Waves","wms-manager.html","wms_manage","wms",true,"warehouse"],
    ["Picking","wms-picker.html","picking","wms",true,"warehouse"],
    ["Packing","wms-packer.html","packing","wms",true,"warehouse"],
    ["Fulfillment","wms-fulfillment.html","fulfillment","wms",true,"warehouse"],
    ["Receiving","wms-receiver.html","wms_receiving","wms",true,"warehouse"],
    ["Bin Moves","wms-mover.html","stock_move","wms",true,"warehouse"],
    ["WMS Admin","wms-admin.html","wms_manage","wms",true,"warehouse"],
  ];
  const modeDefs=[["ims","IMS"],["wms","WMS"],["pos","POS"]];     // 순서 = 모드 단추 순서 = firstScreen() 의 우선순위 (판정 163)
  const groupDefs=[                                                  // [갈래, 보이는 이름, 펼침 없이 링크 하나인가]
    ["purchasing","Purchasing",false],
    ["sales","Sales",false],
    ["inventory","Inventory",false],
    ["action","Action Centre",true],
    ["settings","Settings",false],
  ];

  // 현재 화면 = 경로의 마지막 조각(소문자) · 「/」로 끝나면 index.html · 쿼리(?id=)·해시는 pathname 에 없다
  const here=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const hereItem=items.find(it=>it[1].toLowerCase()===here)||null;
  // 파일 이름으로 모드를 정한다 — 표에 있으면 그 줄 · 없으면 wms-*.html 은 wms · 나머지(index · dashboard · 모르는 것)는 ims
  function modeOfFile(f){ const it=items.find(x=>x[1].toLowerCase()===f); if(it&&it[3]) return it[3]; return /^wms-/.test(f)?"wms":"ims"; }
  const hereMode=modeOfFile(here);
  // ⭐ 110% — 로그인을 기다리지 않고 **읽히는 즉시**(동기) 단다 · ims-ui.css: html[data-ims-mode="ims"],html[data-ims-mode="pos"]{zoom:1.1}
  //    화면 파일이 미리 달아 둔 값은 그대로 둔다(첫 그림부터 맞는 크기 · 번쩍임 0 — 화면 차수가 <html data-ims-mode="…"> 를 넣을 수 있게).
  if(!document.documentElement.getAttribute("data-ims-mode")) document.documentElement.setAttribute("data-ims-mode", hereMode);

  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

  function injectStyles(){
    if(document.getElementById("imsAuthStyle")) return;
    const s=document.createElement("style"); s.id="imsAuthStyle";
    s.textContent=`
      #imsLogin{position:fixed;inset:0;z-index:9999;background:#f7f8fa;display:flex;align-items:center;justify-content:center;font-family:"Inter",system-ui,-apple-system,"Malgun Gothic","Apple SD Gothic Neo",sans-serif}
      #imsLogin .wcard{width:360px;max-width:92vw;background:#fff;border:1px solid #e5e9ef;border-radius:16px;box-shadow:0 4px 24px rgba(16,22,30,.08);padding:30px 28px}
      #imsLogin h2{margin:0 0 4px;font-size:19px;color:#12161c}
      #imsLogin .sub{margin:0 0 20px;color:#6b7686;font-size:13px}
      #imsLogin label{display:block;font-size:11px;font-family:ui-monospace,Menlo,monospace;color:#6b7686;text-transform:uppercase;letter-spacing:.04em;margin:12px 0 5px}
      #imsLogin input{width:100%;border:1px solid #e5e9ef;border-radius:9px;padding:11px 12px;font-size:14px;font-family:inherit}
      #imsLogin input:focus{outline:none;border-color:#2f6df6;box-shadow:0 0 0 3px rgba(47,109,246,.12)}
      #imsLogin button.main{width:100%;margin-top:18px;border:0;background:#12161c;color:#fff;border-radius:9px;padding:12px;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
      #imsLogin button.main:disabled{opacity:.6;cursor:default}
      #imsLogin .err{margin-top:12px;color:#dc2626;font-size:12.5px;min-height:16px;font-weight:600}
      #imsLogin .ok{margin-top:6px;color:#16a34a;font-size:12.5px;min-height:16px;font-weight:600}
      #imsLogin .brand{font-family:ui-monospace,Menlo,monospace;font-weight:800;font-size:13px;color:#12161c;margin-bottom:18px;text-align:center}
      #imsLogin .brand img{height:36px;width:auto;display:inline-block}
      #imsLogin .linkrow{margin-top:14px;text-align:center}
      #imsLogin .link{background:none;border:0;color:#2f6df6;font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;padding:4px;width:auto;margin:0}
      #imsPwModal{position:fixed;inset:0;z-index:10000;background:rgba(16,22,30,.45);display:none;align-items:center;justify-content:center;font-family:"Inter",system-ui,-apple-system,"Malgun Gothic","Apple SD Gothic Neo",sans-serif}
      #imsPwModal.show{display:flex}
      #imsPwModal .wcard{width:340px;max-width:92vw;background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.3);padding:26px 24px}
      #imsPwModal h3{margin:0 0 4px;font-size:17px;color:#12161c}
      #imsPwModal p{margin:0 0 16px;color:#6b7686;font-size:12.5px}
      #imsPwModal label{display:block;font-size:11px;font-family:ui-monospace,Menlo,monospace;color:#6b7686;text-transform:uppercase;margin:10px 0 5px}
      #imsPwModal input{width:100%;border:1px solid #e5e9ef;border-radius:9px;padding:11px 12px;font-size:14px;font-family:inherit}
      #imsPwModal input:focus{outline:none;border-color:#2f6df6;box-shadow:0 0 0 3px rgba(47,109,246,.12)}
      #imsPwModal .row{display:flex;gap:8px;margin-top:18px}
      #imsPwModal .row button{flex:1;border:0;border-radius:9px;padding:11px;font:inherit;font-size:13.5px;font-weight:700;cursor:pointer}
      #imsPwModal .cancel{background:#eef1f6;color:#12161c}
      #imsPwModal .save{background:#12161c;color:#fff}
      #imsPwModal .msg{margin-top:12px;font-size:12.5px;font-weight:600;min-height:16px}
      #imsPwModal .msg.err{color:#dc2626} #imsPwModal .msg.ok{color:#16a34a}
    `;
    document.head.appendChild(s);
  }

  /* login screen */
  function showLogin(prefillMsg){
    injectStyles();
    let el=document.getElementById("imsLogin");
    if(!el){
      el=document.createElement("div"); el.id="imsLogin";
      el.innerHTML=`<div class="wcard">
        <div class="brand"><img src="asung-logo-dark.png" alt="ASUNG"></div>   <!-- ✅ [2026-09-30 lay-1] 로고 파일을 이 레포로 옮겼다(asung-wms 에서 바이트 복사 · 판정 149) -->
        <h2>Sign In</h2>
        <p class="sub">Sign in with your company email and password.</p>
        <label>Email</label>
        <input id="imsEmail" type="email" autocomplete="username" placeholder="you@asung.ca">
        <label>Password</label>
        <input id="imsPw" type="password" autocomplete="current-password" placeholder="XXXXXXXX">
        <button class="main" id="imsLoginBtn">Sign In</button>
        <div class="err" id="imsErr"></div>
        <div class="ok" id="imsOk"></div>
        <div class="linkrow"><button class="link" id="imsForgot">Forgot your password?</button></div>
      </div>`;
      document.body.appendChild(el);
      document.getElementById("imsLoginBtn").onclick=doLogin;
      document.getElementById("imsForgot").onclick=doForgot;
      document.getElementById("imsPw").addEventListener("keydown",e=>{if(e.key==="Enter")doLogin();});
      document.getElementById("imsEmail").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("imsPw").focus();});
    }
    el.style.display="flex";
    if(prefillMsg) document.getElementById("imsErr").textContent=prefillMsg;
    setTimeout(()=>{const f=document.getElementById("imsEmail"); if(f)f.focus();},50);
  }
  function hideLogin(){ const el=document.getElementById("imsLogin"); if(el)el.style.display="none"; }
  function loginErr(m){ const e=document.getElementById("imsErr"),o=document.getElementById("imsOk"); if(o)o.textContent=""; if(e)e.textContent=m||""; }
  function loginOk(m){ const e=document.getElementById("imsErr"),o=document.getElementById("imsOk"); if(e)e.textContent=""; if(o)o.textContent=m||""; }

  async function doLogin(){
    loginErr("");
    const email=document.getElementById("imsEmail").value.trim();
    const pw=document.getElementById("imsPw").value;
    if(!email||!pw){ loginErr("Enter your email and password."); return; }
    const btn=document.getElementById("imsLoginBtn"); btn.disabled=true; btn.textContent="Signing in…";
    try{
      const {error}=await sb.auth.signInWithPassword({email,password:pw});
      if(error){ loginErr("Sign-in failed: check your email or password."); btn.disabled=false; btn.textContent="Sign In"; return; }
      const ok=await resolveIdentity();
      if(!ok){ btn.disabled=false; btn.textContent="Sign In"; return; }
      hideLogin(); btn.disabled=false; btn.textContent="Sign In";
      attachAccountControls();
      onReady(sb, me);
    }catch(e){ loginErr("Error: "+(e.message||e)); btn.disabled=false; btn.textContent="Sign In"; }
  }

  /* forgot password (email link) */
  async function doForgot(){
    const email=document.getElementById("imsEmail").value.trim();
    if(!email){ loginErr("Enter your email first, then click this."); return; }
    loginErr("");
    try{
      const redirectTo=location.origin+location.pathname;
      const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo});
      if(error){ loginErr("Send failed: "+error.message); return; }
      loginOk("A reset link has been sent to your email. Please check your inbox.");
    }catch(e){ loginErr("Error: "+(e.message||e)); }
  }

  /* change-password modal */
  function ensurePwModal(){
    injectStyles();
    let m=document.getElementById("imsPwModal");
    if(m) return m;
    m=document.createElement("div"); m.id="imsPwModal";
    m.innerHTML=`<div class="wcard">
      <h3>Change Password</h3>
      <p>Enter a new password (at least 6 characters).</p>
      <label>New password</label>
      <input id="imsNewPw" type="password" autocomplete="new-password" placeholder="XXXXXXXX">
      <label>Confirm new password</label>
      <input id="imsNewPw2" type="password" autocomplete="new-password" placeholder="XXXXXXXX">
      <div class="row"><button class="cancel" id="imsPwCancel">Cancel</button><button class="save" id="imsPwSave">Change</button></div>
      <div class="msg" id="imsPwMsg"></div>
    </div>`;
    document.body.appendChild(m);
    document.getElementById("imsPwCancel").onclick=()=>{ m.classList.remove("show"); };
    document.getElementById("imsPwSave").onclick=savePw;
    document.getElementById("imsNewPw2").addEventListener("keydown",e=>{if(e.key==="Enter")savePw();});
    return m;
  }
  function showChangePw(){ const m=ensurePwModal(); document.getElementById("imsNewPw").value=""; document.getElementById("imsNewPw2").value=""; document.getElementById("imsPwMsg").textContent=""; m.classList.add("show"); setTimeout(()=>document.getElementById("imsNewPw").focus(),50); }
  async function savePw(){
    const msg=document.getElementById("imsPwMsg"); msg.className="msg";
    const p1=document.getElementById("imsNewPw").value, p2=document.getElementById("imsNewPw2").value;
    if(p1.length<6){ msg.className="msg err"; msg.textContent="Must be at least 6 characters."; return; }
    if(p1!==p2){ msg.className="msg err"; msg.textContent="Passwords do not match."; return; }
    const btn=document.getElementById("imsPwSave"); btn.disabled=true; btn.textContent="Changing…";
    try{
      const {error}=await sb.auth.updateUser({password:p1});
      if(error){ msg.className="msg err"; msg.textContent="Change failed: "+error.message; btn.disabled=false; btn.textContent="Change"; return; }
      msg.className="msg ok"; msg.textContent="Password changed successfully.";
      recovery=false;     // 복구가 끝났다 — 문이 이제 보내도 된다(아래 이벤트로 알린다)
      setTimeout(()=>{ const mm=document.getElementById("imsPwModal"); if(mm)mm.classList.remove("show"); btn.disabled=false; btn.textContent="Change";
        try{ document.dispatchEvent(new CustomEvent("ims:password-changed")); }catch(e){} },1200);
    }catch(e){ msg.className="msg err"; msg.textContent="Error: "+(e.message||e); btn.disabled=false; btn.textContent="Change"; }
  }

  /* after login: insert "Change Password" next to #logoutBtn — ONLY when the page
     opts in with {changePw:true}. ✅ [2026-09-30] IMS 화면 22 가 준다 · WMS 일곱은 안 준다(창고 화면은 깨끗하게). */
  function attachAccountControls(){
    if(!opts.changePw) return;
    const lo=document.getElementById("logoutBtn");
    if(!lo || document.getElementById("imsPwBtn")) return;
    const b=document.createElement("button");
    b.id="imsPwBtn"; b.type="button"; b.textContent="Change Password"; b.title="Change password";
    b.className=lo.className;
    if(lo.getAttribute("style")) b.setAttribute("style", lo.getAttribute("style"));
    b.onclick=showChangePw;
    lo.parentNode.insertBefore(b, lo);
  }

  async function resolveIdentity(){
    const {data:{user}}=await sb.auth.getUser();
    if(!user){ loginErr("Could not verify session."); return false; }
    const {data,error}=await sb.from("ims_staff").select("*").eq("auth_user_id",user.id).maybeSingle();
    if(error){ loginErr("Staff lookup failed: "+error.message); return false; }
    if(!data){ loginErr("This account is not registered. Please contact your administrator."); await sb.auth.signOut(); return false; }
    if(data.is_active===false){ loginErr("This account is inactive."); await sb.auth.signOut(); return false; }

    // ⭐ 판정은 DB 한 곳 — ims_access() (security definer · 호출자 = auth.uid()). 화면은 role/perms 를 직접 가르지 않는다.
    //    실패(네트워크·RPC 오류) = 로그인 막음 · signOut 은 안 한다(새로고침으로 다시 시도) — 조용히 전부 열지 않는다.
    //    null = 행 없음·비활성(위에서 이미 걸렀으니 여기 오면 DB 와 화면이 어긋난 것) — 막고 signOut.
    const acc=await sb.rpc("ims_access");
    if(acc.error){ loginErr("Access check failed: "+acc.error.message+" — reload to try again."); return false; }
    if(!acc.data || typeof acc.data!=="object"){ loginErr("Your access could not be determined. Please contact your administrator."); await sb.auth.signOut(); return false; }
    access=acc.data;
    access.modes=Array.isArray(access.modes)?access.modes:[];
    access.screens=(access.screens&&typeof access.screens==="object")?access.screens:{};

    if(opts.requireManager && !["manager","supervisor","admin"].includes(data.role)){
      loginErr("This screen is for managers and admins only."); await sb.auth.signOut(); return false;
    }
    // 화면 값 게이트 — requireScreen:'purchasing' 등(옛 이름 requirePerm 도 같은 뜻으로 받는다 · 값 어휘는 ims_perm_catalog 의 것)
    const need=opts.requireScreen||opts.requirePerm;
    if(need && !access.screens[need]){
      loginErr("You don't have access to this screen. Please contact your administrator.");
      await sb.auth.signOut(); return false;
    }
    me=data;
    me.access=access;      // 화면이 me.access.screens.purchasing === 'read' · me.access.warehouses 로 묻는다 (기존 칸은 그대로)
    return true;
  }


  /* ---- bfcache fix: pages restored from back-forward cache resume with dead
     in-flight requests (spinners hang forever). Force a clean reload on restore. ---- */
  window.addEventListener("pageshow", function(e){ if(e.persisted) location.reload(); });

  /* ═══════════════════════════════════════════════════════════════
     헤더 — 로고 · 모드 · 윗줄 펼침 · WMS 탭 줄 · ☰ (2026-09-30 lay-1)
     ⭐ 판정은 ims_access() 가 했다 — 여기서는 그 결과만 읽는다(role·perms 를 다시 가르지 않는다)
     ═══════════════════════════════════════════════════════════════ */
  function visibleItems(){ const scr=(access&&access.screens)||{}; return items.filter(it=>!it[2] || !!scr[it[2]]); }
  // 모드에 들어갈 수 있나 — 'pos' 는 DB 모드가 아니라 ims 모드로 들어간다(위 items 주석 · 판정 거리 ①)
  function canEnter(m){ const ms=(access&&access.modes)||[]; return m==="pos" ? ms.includes("ims") : ms.includes(m); }
  // 모드 후보 = 들어갈 수 있고 + 보이는 화면이 하나 이상 (2026-09-17 규칙 그대로 · 모드 셋으로)
  function modeCandidates(vis){ return modeDefs.filter(([m])=>canEnter(m) && vis.some(it=>it[3]===m)); }
  // 그 모드의 첫 보이는 화면 — items 순서라 IMS 는 Dashboard · WMS 는 Split & Waves 부터(wms_manage 없으면 Picking · 판정 173) · POS 는 pos.html (판정 163)
  function firstOfMode(vis,m){ return vis.find(it=>it[3]===m)||null; }
  // 문이 쓴다 — 로그인 뒤 그 사람의 첫 모드 첫 화면 주소 · 하나도 없으면 null (판정 163 · R8)
  function firstScreen(){ if(!access) return null; const vis=visibleItems(); for(const [m] of modeCandidates(vis)){ const f=firstOfMode(vis,m); if(f) return f[1]; } return null; }

  /* 헤더 왼쪽 — .brand 자리에 로고 · 그 뒤 모드 셋(둘 이상일 때만) · IMS 면 윗줄 펼침 · 빌드 표시 뒤에 공통 js 판
     ⚠️ 화면 파일은 안 고친다 — 기존 <header> 안에 그려 넣는다. <header> 가 없으면 조용히 아무것도 안 한다.
     ⚠️ ☰ Menu(button[title="Main menu"])는 IMS · POS 에서 **감춘다**(지우지 않는다 · 화면 파일 무접촉). WMS 는 그대로(판정 160). */
  function setupHeader(vis){
    const header=document.querySelector("header");
    if(!header || header.querySelector(".ims-logo")) return;
    header.classList.add("ims-hdr","ims-hdr-"+hereMode);
    const modes=modeCandidates(vis);
    // 로고 → 지금 모드의 첫 화면(IMS 면 Dashboard) · 지금 모드에 못 들어가는 사람(WMS 직원이 IMS 주소를 친 경우)은 그 사람의 첫 화면
    const homeOf=canEnter(hereMode)?firstOfMode(vis,hereMode):null;
    const logoHref=(homeOf&&homeOf[1])||firstScreen()||"index.html";
    const logo=document.createElement("a"); logo.className="ims-logo"; logo.href=logoHref; logo.title="Home";
    logo.innerHTML='<img src="asung-logo-dark.png" alt="ASUNG">';
    const brand=header.querySelector(".brand");
    if(brand){ brand.textContent=""; brand.classList.add("ims-brand"); brand.appendChild(logo); }
    else header.insertAdjacentElement("afterbegin", logo);
    let anchor=brand||logo;
    if(modes.length>1){
      const mn=document.createElement("nav"); mn.className="ims-modes"; mn.setAttribute("aria-label","Mode");
      mn.innerHTML=modes.map(([m,label])=>{
        const first=firstOfMode(vis,m); const on=(m===hereMode);
        return `<a href="${esc(first[1])}" class="mode${on?" cur":""}"${on?' aria-current="true"':""} title="Switch to ${label}">${label}</a>`;
      }).join("");
      anchor.insertAdjacentElement("afterend", mn); anchor=mn;
    }
    // 빌드 표시 — 화면의 #buildTag(화면 판) 바로 뒤에 공통 js 판을 작게 (화면이 뒤에 textContent 를 써도 안 지워진다 · 별 요소)
    const tag=document.createElement("span"); tag.className="dim ims-authtag"; tag.title="ims-auth.js build"; tag.textContent=IMS_AUTH_BUILD;
    const bt=document.getElementById("buildTag");
    if(bt && bt.parentNode===header) bt.insertAdjacentElement("afterend", tag); else anchor.insertAdjacentElement("afterend", tag);
    // ☰ — IMS · POS 는 감춘다(내용이 윗줄 펼침 · POS 는 화면 하나) · WMS 는 setupNavMenu 가 그대로 쓴다
    const menuBtn=header.querySelector('button[title="Main menu"]');
    if(menuBtn && hereMode!=="wms") menuBtn.style.display="none";
    if(hereMode==="ims"){
      const nav=renderTopNav(vis);
      if(nav){
        const sp=header.querySelector(".sp");
        if(sp) sp.insertAdjacentElement("beforebegin", nav); else header.appendChild(nav);
        wireDropdowns(nav);
      }
    }
  }

  /* IMS 윗줄 펼침 — 갈래마다 <div class="ims-grp"><button> + <div class="ims-drop"> · 'action' 처럼 flat 인 갈래는 링크 하나 (판정 153 · 152)
     · 갈래는 보이는 화면이 하나라도 있을 때만 · 지금 화면이 든 갈래는 .cur · 펼침 안 지금 화면 줄도 .cur
     · 자리는 CSS(.ims-grp{position:relative} · .ims-drop{position:absolute}) — getBoundingClientRect 를 안 쓴다(zoom 아래 좌표가 1.1 배 어긋난다) */
  function renderTopNav(vis){
    const curGroup=hereItem?(hereItem[5]||null):null;
    let html="";
    for(const [g,label,flat] of groupDefs){
      const list=vis.filter(it=>it[3]==="ims" && it[5]===g);
      if(!list.length) continue;
      const on=(g===curGroup);
      if(flat){   // 링크 하나 — 갈래에 줄이 둘 이상 생기면 flat 을 false 로 바꾼다(첫 줄만 쓴다)
        const it=list[0]; const c=it[1].toLowerCase()===here;
        html+=`<a class="ims-grpbtn flat${c?" cur":""}" href="${esc(it[1])}"${c?' aria-current="page"':""}>${esc(label)}</a>`;
        continue;
      }
      html+=`<div class="ims-grp${on?" cur":""}" data-grp="${g}"><button type="button" class="ims-grpbtn" aria-haspopup="true" aria-expanded="false">${esc(label)}<span class="car" aria-hidden="true">▾</span></button><div class="ims-drop" role="menu">`
        + list.map(it=>{ const c=it[1].toLowerCase()===here; return `<a role="menuitem" href="${esc(it[1])}" class="${c?"cur":""}"${c?' aria-current="page"':""}>${esc(it[0])}</a>`; }).join("")
        + '</div></div>';
    }
    if(!html) return null;
    const nav=document.createElement("nav"); nav.className="ims-top"; nav.setAttribute("aria-label","Screens");
    nav.innerHTML=html;
    return nav;
  }
  /* 펼침 열고 닫기 — 여는 일은 **여기 한 곳**(판정 168 · 2026-09-30 밤 · lay-1b) · 상태는 .ims-grp.open 하나(aria-expanded 함께)
     · 마우스(pointerType mouse): 올리면 열린다 · 다른 갈래에 올리면 먼저 것이 **즉시** 닫힌다(겹침 0) · 갈래 밖으로 나가면 CLOSE_MS 뒤 닫힌다 ·
       그 사이 같은 갈래(단추 · 펼침)로 다시 들어오면 예약 취소(단추와 펼침 사이 4px 틈 — 옛 CSS 「다리」의 몫) · 단추를 눌러도 닫지 않는다(올려서 이미 열려 있다 · 깜빡임 방지 · R2)
     · 터치 · 펜: 올리기 없음 · 단추 클릭으로 열고 닫는다(토글) · 키보드(Enter · Space) 도 클릭과 같다
       ⚠️ 어느 손가락인지는 click 의 pointerType 이 아니라 **pointerdown 에서 기억**한다 — click 이 PointerEvent 가 아닌 브라우저가 있다(짐작 · Firefox · Safari 옛 판) · pointerdown 이 없었으면(키보드) 토글
       ⚠️ mouseenter · mouseover 는 쓰지 않는다 — 터치가 흉내 내 보낸다 · pointerenter 는 버블링하지 않아 .ims-grp 마다 단다(펼침은 자식이라 들어가도 leave 가 안 난다)
     · Action Center(flat 링크)에 마우스를 올리면 열린 것이 닫힌다(옆으로 지나가며 겹쳐 남지 않게 · R4)
     · 바깥 클릭 · Esc → 전부 닫힘 · nav 마다 한 번만 단다(_imsWired)
     ⚠️ [실사고 2026-09-30 밤 · Caleb 화면 po.html 크롬] lay-1 은 CSS :hover 로도 열리던 길이 있어 클릭으로 연 Sales 와 올려서 연 Inventory 가 **겹쳤다** — CSS 여는 규칙(hover 미디어 블록)은 지웠다(ims-ui.css) */
  const CLOSE_MS=200;
  function wireDropdowns(nav){
    if(nav._imsWired) return; nav._imsWired=true;
    const grps=Array.from(nav.querySelectorAll(".ims-grp"));
    let closeTimer=null, pendingGrp=null, lastPointer=null;
    const cancelClose=()=>{ if(closeTimer){ clearTimeout(closeTimer); } closeTimer=null; pendingGrp=null; };
    const setOpen=(g,on)=>{ g.classList.toggle("open",on); const b=g.querySelector(".ims-grpbtn"); if(b) b.setAttribute("aria-expanded",on?"true":"false"); };
    const closeAll=()=>{ cancelClose(); grps.forEach(g=>setOpen(g,false)); };
    const openOnly=(g)=>{ cancelClose(); grps.forEach(x=>{ if(x!==g) setOpen(x,false); }); setOpen(g,true); };
    const scheduleClose=(g)=>{ cancelClose(); pendingGrp=g; closeTimer=setTimeout(()=>{ closeTimer=null; if(pendingGrp===g) setOpen(g,false); pendingGrp=null; },CLOSE_MS); };
    grps.forEach(g=>{
      const b=g.querySelector(".ims-grpbtn");
      g.addEventListener("pointerenter",(e)=>{ if(e.pointerType!=="mouse") return; openOnly(g); });
      g.addEventListener("pointerleave",(e)=>{ if(e.pointerType!=="mouse") return; if(g.classList.contains("open")) scheduleClose(g); });
      b.addEventListener("pointerdown",(e)=>{ lastPointer=e.pointerType||null; });
      b.addEventListener("click",(e)=>{
        e.stopPropagation();
        const pt=lastPointer; lastPointer=null;
        if(pt==="mouse"){ openOnly(g); return; }                                     // 올려서 이미 열려 있다 — 눌러도 그대로
        const was=g.classList.contains("open"); closeAll(); if(!was) setOpen(g,true); // 터치 · 펜 · 키보드 — 토글 · 한 번에 하나
      });
    });
    nav.querySelectorAll(".ims-grpbtn.flat").forEach(a=>a.addEventListener("pointerenter",(e)=>{ if(e.pointerType==="mouse") closeAll(); }));
    document.addEventListener("click",(e)=>{ if(!nav.contains(e.target)) closeAll(); });
    document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeAll(); });
  }

  /* 헤더 높이 변수 — 화면이 빼 쓴다
     --ims-hdr-h     헤더 전체 높이(sticky)
     --ims-hdr-extra 헤더가 두 줄로 꺾였을 때 늘어난 만큼(윗줄 펼침이 둘째 줄로 내려간 높이) · 한 줄이면 0px — ims-ui.css 의 .list{top} 이 더한다
     --ims-tabs-h    「헤더 아래에서 내용이 밀린 만큼」 = extra + 탭 줄 높이(IMS Purchasing · Sales 문서 화면 · WMS) — po · so · so-invoices · so-payments · so-credits 의 .list .rows max-height 가 빼 쓴다(옛 뜻 그대로 · 탭 줄이 없는 화면에서는 extra 뿐)
     ⚠️ 좁은 폭: 윗줄 펼침이 로고와 같은 줄에 못 서면(nav.offsetTop 이 로고 아래) header.ims-wrap 을 달아 둘째 줄 **전체**로 내린다(가로 스크롤이 아니다) — 이름 · Sign Out 은 첫 줄 오른쪽에 남는다 */
  let hdrTimer=null;
  function setHeaderVars(){
    const header=document.querySelector("header"); if(!header) return;
    const root=document.documentElement.style;
    const nav=header.querySelector(".ims-top");
    let extra=0;
    if(nav){
      header.classList.remove("ims-wrap");
      const brand=header.querySelector(".ims-brand")||header.querySelector(".ims-logo");
      if(brand && nav.offsetTop>=brand.offsetTop+brand.offsetHeight) header.classList.add("ims-wrap");
      const d=nav.style.display; nav.style.display="none"; const h1=header.offsetHeight; nav.style.display=d; const h2=header.offsetHeight;
      extra=Math.max(0,h2-h1);
    }
    root.setProperty("--ims-hdr-extra", extra+"px");
    const tabs=document.getElementById("imsTabs");
    root.setProperty("--ims-tabs-h", (extra+(tabs?tabs.offsetHeight:0))+"px");
    root.setProperty("--ims-hdr-h", header.offsetHeight+"px");
  }

  /* ---- 탭 줄 = 지금 화면 갈래의 탭 (헤더 바로 아래 한 줄 · 2026-09-17 · 모드 부분은 2026-09-30 헤더로 올라갔다 — 판정 160) ----
     · 탭 = items 다섯째 칸 true 이고 **지금 화면과 같은 모드 · 같은 갈래**인 보이는 화면 · 지금 화면이 그중 하나일 때만 그린다(lay-1 전 규칙 — Suppliers 처럼 같은 갈래라도 탭 아닌 화면에서는 줄이 서지 않는다)
     · IMS: Purchasing · Sales 의 문서 화면 열 줄(판정 169 · lay-1c) · WMS: 일곱 · POS: 없음(판정 159) · 갈래 없는 화면(Dashboard): 없음
     · 지금 화면은 .cur 로 눌리지 않는다 · 그냥 링크다(화면이 통째로 다시 뜬다)
     ⚠️ sticky 가 아니다 — 헤더(sticky)만 남고 이 줄은 함께 스크롤된다(lay-1 전과 같다). 높이는 setHeaderVars 가 --ims-tabs-h 에 더한다. 모양은 ims-ui.css 「탭 줄」 구역(.ims-tabs). */
  function setupTabs(vis){
    const header=document.querySelector("header");
    if(!header || document.getElementById("imsTabs") || hereMode==="pos") return;
    const curGroup=hereItem?(hereItem[5]||null):null;
    if(!curGroup) return;
    const tabs=vis.filter(it=>it[4]===true && it[3]===hereMode && (it[5]||null)===curGroup);
    if(!tabs.some(it=>it[1].toLowerCase()===here)) return;
    const gdef=groupDefs.find(([g])=>g===curGroup);
    const glabel=gdef?gdef[1]:(curGroup==="warehouse"?"Warehouse":curGroup);
    const nav=document.createElement("nav"); nav.id="imsTabs"; nav.className="ims-tabs"; nav.setAttribute("aria-label",glabel+" screens");
    nav.innerHTML=tabs.map(it=>{
      const on=it[1].toLowerCase()===here;
      return `<a href="${esc(it[1])}" class="${on?"cur":""}"${on?' aria-current="page"':""}>${esc(it[0])}</a>`;
    }).join("");
    header.insertAdjacentElement("afterend", nav);
  }

  /* ---- ☰ Menu — WMS 화면만 (판정 160 · 내용은 WMS 화면만 · IMS 로 가는 길은 모드 단추 하나) ----
     IMS · POS 에서는 setupHeader 가 단추를 감췄다 — 여기서는 그리지 않는다.
     ⚠️ 자리를 getBoundingClientRect + scrollY 로 잡는다 — WMS 는 zoom 밖(100%)이라 어긋나지 않는다. IMS · POS(110%)에서 이 코드를 되살리려면 CSS 자리로 바꿔야 한다. */
  function setupNavMenu(vis){
    const btn=document.querySelector('button[title="Main menu"]');
    if(!btn || btn._imsNav || hereMode!=="wms") return;
    btn._imsNav=true;
    const list=vis.filter(it=>it[3]==="wms");
    if(!document.getElementById("imsNavCss")){
      const st=document.createElement("style"); st.id="imsNavCss";
      st.textContent='.ims-nav{position:absolute;z-index:2000;background:#fff;border:1px solid #e3e6eb;border-radius:12px;box-shadow:0 12px 32px rgba(15,20,30,.16);padding:6px;min-width:180px;display:none}'
        +'.ims-nav a{display:block;padding:10px 13px;border-radius:8px;font-size:13.5px;font-weight:600;color:#1e2430;text-decoration:none}'
        +'.ims-nav a:hover{background:#f2f4f8}'
        +'.ims-nav a.cur{background:#eef3ff;color:#3b5bdb;pointer-events:none}';
      document.head.appendChild(st);
    }
    const dd=document.createElement("div"); dd.className="ims-nav";
    dd.innerHTML=list.map(it=>`<a href="${esc(it[1])}" class="${it[1].toLowerCase()===here?"cur":""}">${esc(it[0])}</a>`).join("");
    document.body.appendChild(dd);
    btn.onclick=(e)=>{
      e.stopPropagation();
      const open=dd.style.display==="block";
      if(open){ dd.style.display="none"; return; }
      dd.style.display="block";
      const r=btn.getBoundingClientRect(), w=dd.offsetWidth;
      dd.style.top=(r.bottom+6+window.scrollY)+"px";
      dd.style.left=Math.max(8, Math.min(window.innerWidth-w-8, r.right-w+window.scrollX))+"px";
    };
    document.addEventListener("click",(e)=>{ if(dd.style.display==="block" && !dd.contains(e.target) && e.target!==btn) dd.style.display="none"; });
  }

  // 로그인 뒤 한 번 — 헤더 · WMS 탭 · ☰ · 높이 변수 (각각 try — 하나가 죽어도 화면 콜백은 돈다)
  function setupNav(){
    const vis=visibleItems();
    try{ setupHeader(vis); }catch(e){ console.warn("header failed", e); }
    try{ setupTabs(vis); }catch(e){ console.warn("tabs failed", e); }
    try{ setupNavMenu(vis); }catch(e){ console.warn("menu failed", e); }
    try{ setHeaderVars(); }catch(e){ console.warn("header vars failed", e); }
    if(!window._imsHdrResize){ window._imsHdrResize=true; window.addEventListener("resize",()=>{ clearTimeout(hdrTimer); hdrTimer=setTimeout(()=>{ try{ setHeaderVars(); }catch(e){} },80); }); }
  }

  /* ---- 화면(탭) 세션 ID ----
     원본(WMS)에서 그대로 가져왔다. WMS 는 같은 사람의 다른 탭을 가르는 데 쓴다(규칙 28).
     ⬜ IMS 에는 아직 쓰는 곳이 없다 — 쓸 곳이 생길 때까지 그대로 둔다.
     sessionStorage 라 하드 리로드에 유지되고 탭마다 다르며 탭을 닫으면 사라진다. */
  let memSid=null;
  function newSid(){ return (window.crypto&&crypto.randomUUID) ? crypto.randomUUID() : (Date.now().toString(36)+"-"+Math.random().toString(36).slice(2)); }
  function sessionId(){
    const K="ims_session_id";
    try{
      let v=sessionStorage.getItem(K);
      if(!v){ v=newSid(); sessionStorage.setItem(K,v); }
      return v;
    }catch(e){
      if(!memSid) memSid=newSid();
      return memSid;
    }
  }

  const imsAuth={
    async start(options, cb){
      if(typeof options==="function"){ cb=options; options={}; }
      opts=options||{}; onReady=(a,b)=>{ try{setupNav();}catch(e){} cb(a,b); };
      if(!cfg.SUPABASE_ANON_KEY || cfg.SUPABASE_ANON_KEY.includes("PASTE_")){
        injectStyles(); showLogin(""); loginErr("Setup needed: add the anon key to ims-config.js.");
        return;
      }
      sb=supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      window.sb=sb;
      sb.auth.onAuthStateChange((event)=>{ if(event==="PASSWORD_RECOVERY"){ recovery=true; showChangePw(); } });
      const {data:{session}}=await sb.auth.getSession();
      if(session){
        const ok=await resolveIdentity();
        if(ok){ hideLogin(); attachAccountControls(); onReady(sb, me); return; }
      }
      showLogin("");
    },
    async signOut(){ if(sb){ await sb.auth.signOut(); } location.reload(); },
    changePassword(){ showChangePw(); },
    sessionId,          // 이 화면(탭)의 세션 UUID — 위 주석(상태 vs 정체)
    get me(){ return me; },
    get sb(){ return sb; },
    // ⭐ 권한 — ims_access() 의 결과(로그인 뒤 한 번). 화면이 「쓸 수 있나 · 읽기 전용인가 · 창고 경계」를 여기서 묻는다.
    //    access.screens.purchasing === 'read' → 읽기 전용(입력칸 잠금은 화면 몫 · 다음 차수) · access.warehouses === null → 창고 전부
    get access(){ return access; },
    canView(screen){ return !!(access&&access.screens&&access.screens[screen]); },
    canWrite(screen){ return !!(access&&access.screens&&access.screens[screen]==="write"); },
    // ⭐ 문(index.html) 도우미 (2026-09-30 lay-1 · 판정 163)
    //    firstScreen() — 로그인 뒤 그 사람의 첫 모드 첫 화면 주소(IMS → dashboard.html · WMS 만 → 첫 보이는 WMS 화면(매니저 이상 Split & Waves · 창고 직원 Picking · 판정 173) · POS 만 → pos.html · 없으면 null) · 로그인 전(access 없음)엔 null
    //    inRecovery   — 비밀번호 재설정 링크로 돌아온 상태(주소의 type=recovery 또는 PASSWORD_RECOVERY 이벤트) · true 면 문은 보내지 말고 머문다 ·
    //                   새 비밀번호가 저장되면 false 가 되고 document 에 "ims:password-changed" 이벤트가 난다 — 문은 그때 firstScreen() 으로
    firstScreen,
    get inRecovery(){ return recovery; },
    get mode(){ return hereMode; },                       // 이 화면의 모드('ims'|'wms'|'pos') — 파일 이름으로 정했다
    visibleScreens(){ return visibleItems().map(it=>({name:it[0],href:it[1],key:it[2],mode:it[3],group:it[5]})); },   // 대시보드 등이 바로가기를 그릴 때
    build:IMS_AUTH_BUILD,
  };
  window.imsAuth=imsAuth;
})();
