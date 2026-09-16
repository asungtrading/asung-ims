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

   쓰는 법 (각 화면 스크립트 맨 위에서):
     imsAuth.start({ requireManager:false }, (sb, me) => { ... });
   - 세션은 Supabase 가 브라우저에 유지한다 → 한 번 로그인하면 계속 유지.
   - 로그아웃: imsAuth.signOut()
   - "Change Password" 버튼은 {changePw:true} 를 준 화면에만 붙는다.
*/
(function(){
  const cfg = window.IMS_CONFIG || {};
  let sb=null, me=null, onReady=null, opts={};

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
    if(opts.requireManager && !(data.role==="manager"||data.role==="admin")){
      loginErr("This screen is for managers and admins only."); await sb.auth.signOut(); return false;
    }
    // per-screen permission for managers (admin always passes): "split" | "admin" | "staff"
    if(opts.requirePerm && data.role==="manager"){
      const perms=Array.isArray(data.perms)?data.perms:[];   // ⚠️ IMS 는 기본 권한을 주지 않는다
      if(!perms.includes(opts.requirePerm)){
        loginErr("You don't have access to this screen. Please contact your administrator.");
        await sb.auth.signOut(); return false;
      }
    }
    me=data; return true;
  }


  /* ---- bfcache fix: pages restored from back-forward cache resume with dead
     in-flight requests (spinners hang forever). Force a clean reload on restore. ---- */
  window.addEventListener("pageshow", function(e){ if(e.persisted) location.reload(); });

  /* ---- shared nav dropdown (☰ Menu on every screen) ---- */
  function setupNavMenu(meData){
    const btn=document.querySelector('button[title="Main menu"]');
    if(!btn || btn._imsNav) return;
    btn._imsNav=true;
    // ⬜ IMS 화면이 늘면 여기에 더한다. 셋째 값은 requirePerm — null 이면 로그인만으로 보인다
    const items=[
      ["Settings","settings.html",null],
      ["Suppliers","suppliers.html",null],
      ["Products","products.html",null],
      ["Families","families.html",null],
      ["Supplier Products","supplier-products.html",null],
      ["Purchase Orders","po.html",null],
      ["Staff","staff.html",null],
      ["Home","index.html",null],
    ];
    const isAdmin=meData.role==="admin", isMgr=meData.role==="manager";
    const perms=Array.isArray(meData.perms)?meData.perms:[];
    const vis=items.filter(it=>!it[2] || isAdmin || (isMgr&&perms.includes(it[2])));
    if(!document.getElementById("imsNavCss")){
      const st=document.createElement("style"); st.id="imsNavCss";
      st.textContent='.ims-nav{position:absolute;z-index:2000;background:#fff;border:1px solid #e3e6eb;border-radius:12px;box-shadow:0 12px 32px rgba(15,20,30,.16);padding:6px;min-width:180px;display:none}'
        +'.ims-nav a{display:block;padding:10px 13px;border-radius:8px;font-size:13.5px;font-weight:600;color:#1e2430;text-decoration:none}'
        +'.ims-nav a:hover{background:#f2f4f8}'
        +'.ims-nav a.cur{background:#eef3ff;color:#3b5bdb;pointer-events:none}';
      document.head.appendChild(st);
    }
    const dd=document.createElement("div"); dd.className="ims-nav";
    const here=(location.pathname.split("/").pop()||"index.html").toLowerCase();
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
  };
  window.imsAuth=imsAuth;
})();
