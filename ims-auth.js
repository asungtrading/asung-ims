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
     · 모드(IMS · WMS)는 탭 줄 왼쪽에 선다 — 아래 setupTabs 주석.

   쓰는 법 (각 화면 스크립트 맨 위에서):
     imsAuth.start({ changePw:true }, (sb, me) => { ... });
     선택: { requireScreen:'purchasing' } — 그 화면 값이 null 인 사람은 들어오지 못한다(문장 후 signOut).
           { requireManager:true } — worker 는 들어오지 못한다(manager·supervisor·admin 통과). ⚠️ 2026-09-17 현재 어느 화면도 두 옵션을 쓰지 않는다(grep 0).
   - 세션은 Supabase 가 브라우저에 유지한다 → 한 번 로그인하면 계속 유지.
   - 로그아웃: imsAuth.signOut()
   - "Change Password" 버튼은 {changePw:true} 를 준 화면에만 붙는다.
*/
(function(){
  const cfg = window.IMS_CONFIG || {};
  let sb=null, me=null, access=null, onReady=null, opts={};

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
        <div class="brand">ASUNG IMS</div>   <!-- ⬜ 로고 파일을 이 레포로 옮기면 img 로 바꾼다 -->
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
      setTimeout(()=>{ const mm=document.getElementById("imsPwModal"); if(mm)mm.classList.remove("show"); btn.disabled=false; btn.textContent="Change"; },1200);
    }catch(e){ msg.className="msg err"; msg.textContent="Error: "+(e.message||e); btn.disabled=false; btn.textContent="Change"; }
  }

  /* after login: insert "Change Password" next to #logoutBtn — ONLY when the page
     opts in with {changePw:true} (index launcher). Module screens stay clean. */
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
    // 화면 값 게이트 — requireScreen:'purchasing' 등(옛 이름 requirePerm 도 같은 뜻으로 받는다 · 값 어휘는 새 것: purchasing · master · receiving · staff)
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

  /* ---- 탭 줄 = 모드 + 묶음 + 그 묶음의 탭 (헤더 바로 아래 한 줄 · 2026-09-17 · 묶음은 2026-09-25) ----
     ⭐ [Caleb] 탭 줄 왼쪽 끝에 모드(IMS · WMS) · 구분선 · 그 뒤에 그 모드의 화면 탭 — 줄이 늘지 않고 「지금 어디 있나」가 한 줄에 보인다.
        (기각: 헤더 안에 작게 · 헤더와 탭 사이 한 줄 더)
     · 모드 부분은 **고를 것이 있을 때만** 그린다 — 들어갈 수 있고(access.modes) 보이는 화면이 하나라도 있는 모드가 둘 이상일 때.
       화면이 없는 모드는 안 그린다(WMS 는 리시빙 화면이 서기 전까지 안 보인다) · 모드가 하나뿐인 사람(창고 직원)에게도 안 그린다.
     · 모드를 누르면 그 모드의 **첫 보이는 화면**으로 간다(마지막 화면 기억 없음 — 저장할 곳이 필요해진다).
     · 탭은 메뉴를 대신하지 않는다 — 자주 오가는 화면(items 다섯째 칸 true · 지금은 구매 넷)만 선다. 마스터는 어쩌다 열어 메뉴에만.
     · 탭은 지금 화면의 모드에 속한 것만 · 지금 화면은 .cur 로 눌리지 않는다(.ims-nav a.cur 선례). 그냥 링크다(화면이 통째로 다시 뜬다).
     ⭐ [Caleb 2026-09-25] 모드 뒤에 **묶음**(items 여섯째 칸 · 'purchasing' | 'sales' | null) — [모드 IMS·WMS] | [묶음 Purchasing · Sales] | [지금 화면 묶음의 탭들].
        · 묶음 부분은 모드 부분과 같은 규칙 — 지금 화면이 묶음에 속하고, 이 사람이 「탭 화면이 보이는 묶음」을 둘 이상 볼 때만 그린다.
          지금 화면이 묶음 밖(Settings 등)이면 안 그린다 · 묶음이 하나뿐인 사람(구매만 · 판매만)에게도 안 그린다.
        · ⚠️ 묶음을 누르면 그 묶음의 **첫 보이는 탭 화면**으로 간다 — 모드는 「첫 보이는 화면」(탭 여부 무관)이라 규칙이 다르다.
          지금은 묶음 화면이 전부 탭이라 결과가 같지만, 탭 아닌 묶음 화면이 생기면 갈린다(묶음 = 탭 줄의 자리라 탭으로 간다).
        · 탭은 지금 화면의 **묶음**에 속한 것만(모드가 같아도 다른 묶음의 탭은 안 선다) · 모양은 .mode · .sep 을 그대로 쓴다(ims-ui.css 무접촉).
     ⚠️ 줄을 그리는 조건: 모드 부분이 있거나, 묶음 부분이 있거나, 지금 화면이 탭 묶음에 있을 때. 전부 아니면(Settings 등 · 모드 하나) 종전처럼 줄 없음.
     ⚠️ <header> 가 없으면 조용히 아무것도 안 한다. 모양은 ims-ui.css 「탭 줄」 구역(.ims-tabs · .mode · .sep).
     ⚠️ --ims-tabs-h 는 그대로 :root 에 적는다 — po.html 의 .list .rows max-height 가 빼 쓴다. */
  function setupTabs(items, vis, here){
    const header=document.querySelector("header");
    if(!header || document.getElementById("imsTabs")) return;
    const cur=vis.find(it=>it[1].toLowerCase()===here)||items.find(it=>it[1].toLowerCase()===here);
    const curMode=cur?cur[3]:null;
    const curGroup=cur?(cur[5]||null):null;
    // 모드 후보 = 들어갈 수 있고 + 보이는 화면이 하나 이상
    const modeDefs=[["ims","IMS"],["wms","WMS"]];
    const modes=modeDefs.filter(([m])=>access.modes.includes(m) && vis.some(it=>it[3]===m));
    // 묶음 후보 = 지금 화면의 모드 안에서, 보이는 **탭** 화면이 하나 이상인 묶음(2026-09-25)
    const groupDefs=[["purchasing","Purchasing"],["sales","Sales"]];
    const groups=groupDefs.filter(([g])=>vis.some(it=>it[4]===true && it[3]===curMode && it[5]===g));
    const tabs=vis.filter(it=>it[4]===true && it[3]===curMode && (it[5]||null)===curGroup);
    const showModes=modes.length>1;
    const showGroups=!!curGroup && groups.length>1;
    const showTabs=!!curMode && tabs.some(it=>it[1].toLowerCase()===here);
    if(!showModes && !showGroups && !showTabs) return;
    const nav=document.createElement("nav"); nav.id="imsTabs"; nav.className="ims-tabs"; nav.setAttribute("aria-label","Mode and screens");
    let html="";
    if(showModes){
      html+=modes.map(([m,label])=>{
        const first=vis.find(it=>it[3]===m);                 // 그 모드의 첫 보이는 화면
        const on=(m===curMode);
        return `<a href="${first[1]}" class="mode ${on?"cur":""}"${on?' aria-current="true"':""} title="Switch to ${label}">${label}</a>`;
      }).join("");
      if(showGroups || showTabs) html+='<span class="sep" aria-hidden="true"></span>';
    }
    if(showGroups){
      html+=groups.map(([g,label])=>{
        const first=vis.find(it=>it[4]===true && it[3]===curMode && it[5]===g);   // 그 묶음의 첫 보이는 탭 화면(모드와 다르다 — 위 주석)
        const on=(g===curGroup);
        return `<a href="${first[1]}" class="mode ${on?"cur":""}"${on?' aria-current="true"':""} title="Go to ${label}">${label}</a>`;
      }).join("");
      if(showTabs) html+='<span class="sep" aria-hidden="true"></span>';
    }
    if(showTabs){
      html+=tabs.map(it=>{
        const on=it[1].toLowerCase()===here;
        return `<a href="${it[1]}" class="${on?"cur":""}"${on?' aria-current="page"':""}>${it[0]}</a>`;
      }).join("");
    }
    nav.innerHTML=html;
    header.insertAdjacentElement("afterend", nav);
    document.documentElement.style.setProperty("--ims-tabs-h", nav.offsetHeight+"px");
  }

  /* ---- shared nav dropdown (☰ Menu on every screen) ---- */
  function setupNavMenu(meData){
    const btn=document.querySelector('button[title="Main menu"]');
    if(!btn || btn._imsNav) return;
    btn._imsNav=true;
    // ⬜ IMS 화면이 늘면 여기에 더한다 — 메뉴와 탭이 **이 배열 하나**에서 나온다(2026-09-17).
    //    [이름, 주소, 화면 값(perms 어휘 · null 이면 로그인만으로 보인다), 모드('ims'|'wms' · null 이면 두 모드 다), 탭에 서나(true 면 그 묶음의 탭 줄에), 묶음('purchasing'|'sales'|null · 2026-09-25)]
    //    ⭐ 화면 값은 ims_perm_catalog() 의 다섯 — purchasing · master · receiving · staff · sales(20260923224900). 노출 = access.screens[값] 이 null 이 아니면('read' 도 보인다).
    //    ⭐ 탭은 자주 오가는 화면만(구매 다섯 · 판매 · Caleb). 마스터·Staff·Home 은 메뉴에만 · 묶음 null.
    //    ⭐ [2026-09-25 Caleb] 이름은 보이는 글자만 바꿨다(파일 이름 그대로) — Purchase Invoices(invoices.html) · Supplier Payments(payments.html). ✅ [2026-09-25] 판매 묶음 전부 섰다 — Sales Invoices(so-invoices.html) · Customer Payments(so-payments.html) · Credit Notes(so-credits.html) · Backorders(so-backorders.html).
    //       ☰ Menu 순서 = 마스터들 · 구매 묶음 · 판매 묶음 · Staff · Home.
    //    ✅ [2026-09-18] Receiving 이 섰다 — PO 문서의 한 갈래(인보이스·비용·결제와 같은 층)라 모드는 'ims' · 구매 넷 뒤(Caleb). 카탈로그 receiving.room 도 'ims'(마이그레이션 같은 날).
    //    ⬜ WMS 모드의 창고 작업 화면은 나중에 ["…","…","receiving","wms",true] 로 따로 선다 — 그 순간 WMS 모드가 탭 줄에 나타난다(같은 표 · 화면은 둘).
    const items=[
      ["Settings","settings.html","master","ims",false,null],
      ["Suppliers","suppliers.html","master","ims",false,null],
      ["Products","products.html","master","ims",false,null],
      ["Families","families.html","master","ims",false,null],
      ["Supplier Products","supplier-products.html","master","ims",false,null],
      ["Purchase Orders","po.html","purchasing","ims",true,"purchasing"],
      ["Purchase Invoices","invoices.html","purchasing","ims",true,"purchasing"],
      ["Charges","charges.html","purchasing","ims",true,"purchasing"],
      ["Supplier Payments","payments.html","purchasing","ims",true,"purchasing"],
      ["Receiving","receiving.html","receiving","ims",true,"purchasing"],
      ["Sales Orders","so.html","sales","ims",true,"sales"],
      ["Sales Invoices","so-invoices.html","sales","ims",true,"sales"],
      ["Customer Payments","so-payments.html","sales","ims",true,"sales"],
      ["Credit Notes","so-credits.html","sales","ims",true,"sales"],
      ["Backorders","so-backorders.html","sales","ims",true,"sales"],
      ["Staff","staff.html","staff","ims",false,null],
      ["Home","index.html",null,null,false,null],
    ];
    // ⭐ 판정은 ims_access() 가 했다 — 여기서는 그 결과만 읽는다(role·perms 를 다시 가르지 않는다)
    const scr=(access&&access.screens)||{};
    const vis=items.filter(it=>!it[2] || !!scr[it[2]]);
    if(!document.getElementById("imsNavCss")){
      const st=document.createElement("style"); st.id="imsNavCss";
      st.textContent='.ims-nav{position:absolute;z-index:2000;background:#fff;border:1px solid #e3e6eb;border-radius:12px;box-shadow:0 12px 32px rgba(15,20,30,.16);padding:6px;min-width:180px;display:none}'
        +'.ims-nav a{display:block;padding:10px 13px;border-radius:8px;font-size:13.5px;font-weight:600;color:#1e2430;text-decoration:none}'
        +'.ims-nav a:hover{background:#f2f4f8}'
        +'.ims-nav a.cur{background:#eef3ff;color:#3b5bdb;pointer-events:none}';
      document.head.appendChild(st);
    }
    // 현재 화면 = 경로의 마지막 조각(소문자) · 「/」로 끝나면 index.html · 쿼리(?id=)·해시는 pathname 에 없다
    const here=(location.pathname.split("/").pop()||"index.html").toLowerCase();
    try{ setupTabs(items, vis, here); }catch(e){ console.warn("tabs failed", e); }   // 탭 줄이 죽어도 메뉴는 산다
    const dd=document.createElement("div"); dd.className="ims-nav";
    dd.innerHTML=vis.map(it=>`<a href="${it[1]}" class="${it[1]===here?"cur":""}">${it[0]}</a>`).join("");
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
      opts=options||{}; onReady=(a,b)=>{ try{setupNavMenu(b);}catch(e){} cb(a,b); };
      if(!cfg.SUPABASE_ANON_KEY || cfg.SUPABASE_ANON_KEY.includes("PASTE_")){
        injectStyles(); showLogin(""); loginErr("Setup needed: add the anon key to ims-config.js.");
        return;
      }
      sb=supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      window.sb=sb;
      sb.auth.onAuthStateChange((event)=>{ if(event==="PASSWORD_RECOVERY"){ showChangePw(); } });
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
  };
  window.imsAuth=imsAuth;
})();
