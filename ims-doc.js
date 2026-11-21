/* ims-doc.js — 문서 판 그리기 · 인쇄 · 메일 (doc v5 · 2026-11-21 · Claude Code · mail-rcpt-1(판정 1497 · asung-wms 20261121172000): 메일 창 To 칸 아래 Contacts 체크 목록 — 미리 보기의 contacts(청구처 + 문서 매장 · 주소당 한 줄) · 켜면 To 칸에 더하고 끄면 뺀다(쳐 넣은 주소는 그대로) · 이번 메일에만 · 열 명 넘으면 화면이 먼저 막는다 · contacts 가 없거나 한 줄이면 doc v4 모양 그대로 ← doc v4 · 2026-11-21 · Claude Code · mail-att-a2(판정 1464 ~ 1467 · 1473 · 1481 · asung-wms 5f0cba4 · 16fb86c): 메일 창에 추가 첨부 칸 — Attach files…(끌어다 놓기) · From IMS…(doc_attach_pick_list) · 빼기 · 닫으면 이번에 올린 것 지움 · 첨부 없으면 doc v3a 와 같은 호출 / 넣는 CSS 색을 var(이름, 옛 색) + 다크 한 줄(판정 1274 ~ 1281 · 라이트 무변) ← doc v3a · 2026-10-19 · 대화 Claude · Send 가 되면 창을 닫고 아래 안내를 잠깐(Caleb 「send를 누르고 바로 저 화면에서 빠져나오게」) ← doc v3 · mailDialog · mailList · noteDialog — doc-3a 2485e04 의 doc_mail_send · list · cancel ← doc v2 인쇄 printDoc · printBtn ← doc v1a Mustache 를 파일 안에 ← doc v1 cdnjs)
   정본: 판정 521 ~ 526 · asung-wms doc-1a 31c39cd · doc-1b1 dc3aa77 · doc-1b2 aedd043
   ⭐ 판(doc_template.body)은 로직 없는 Mustache — {{x}} 는 HTML 이스케이프 · {{#sec}} 목록 · 조건 · {{^sec}} 없을 때
   ⭐ 값의 꼴(돈 · 날짜 · %)은 DB 창구 doc_data 가 만든다 — 여기서는 셈하지 않는다
   ⚠️ 그린 판은 sandbox iframe(스크립트 · 같은 출처 없음) 안에만 넣는다 — 판에 스크립트가 섞여도 돌지 않는다(DB 검사가 먼저 막는다 · 두 겹)
   ⚠️ 판 검사의 정본은 DB(doc_template_check) — 여기에는 검사가 없다 */
(function () {
  "use strict";
  /* mustache.js 4.2.0(npm 그대로 · 바이트 복사) — 이 파일 안에 넣었다(doc v1a)
     ⚠️ doc v1 은 cdnjs 에서 불렀는데 Caleb 화면에서 「renderer did not start」 — 파일은 왔으나 window.Mustache 가 서지 않았다
        (UMD 가 페이지의 define · module · exports 를 보면 그쪽으로 들어간다 · 무엇이 가로챘는지는 못 봤다)
     ⇒ 그 셋을 이 안에서 undefined 로 가리고 this = window 로 돌린다 · CDN 장애에도 인쇄가 선다
     License (MIT): The MIT License
     
     Copyright (c) 2009 Chris Wanstrath (Ruby)
     Copyright (c) 2010-2014 Jan Lehnardt (JavaScript)
     Copyright (c) 2010-2015 The mustache.js community
     
     Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     
     The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
  (function () { var exports, module, define;   // eslint-disable-line no-unused-vars
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?module.exports=factory():typeof define==="function"&&define.amd?define(factory):(global=global||self,global.Mustache=factory())})(this,function(){"use strict";var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}function primitiveHasOwnProperty(primitive,propName){return primitive!=null&&typeof primitive!=="object"&&primitive.hasOwnProperty&&primitive.hasOwnProperty(propName)}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var lineHasNonSpace=false;var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;var indentation="";var tagIndex=0;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length);indentation+=chr}else{nonSpace=true;lineHasNonSpace=true;indentation+=" "}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n"){stripSpace();indentation="";tagIndex=0;lineHasNonSpace=false}}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);if(type==">"){token=[type,value,start,scanner.pos,indentation,tagIndex,lineHasNonSpace]}else{token=[type,value,start,scanner.pos]}tagIndex++;tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}stripSpace();openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,intermediateValue,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){intermediateValue=context.view;names=name.split(".");index=0;while(intermediateValue!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(intermediateValue,names[index])||primitiveHasOwnProperty(intermediateValue,names[index]);intermediateValue=intermediateValue[names[index++]]}}else{intermediateValue=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit){value=intermediateValue;break}context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.templateCache={_cache:{},set:function set(key,value){this._cache[key]=value},get:function get(key){return this._cache[key]},clear:function clear(){this._cache={}}}}Writer.prototype.clearCache=function clearCache(){if(typeof this.templateCache!=="undefined"){this.templateCache.clear()}};Writer.prototype.parse=function parse(template,tags){var cache=this.templateCache;var cacheKey=template+":"+(tags||mustache.tags).join(":");var isCacheEnabled=typeof cache!=="undefined";var tokens=isCacheEnabled?cache.get(cacheKey):undefined;if(tokens==undefined){tokens=parseTemplate(template,tags);isCacheEnabled&&cache.set(cacheKey,tokens)}return tokens};Writer.prototype.render=function render(template,view,partials,config){var tags=this.getConfigTags(config);var tokens=this.parse(template,tags);var context=view instanceof Context?view:new Context(view,undefined);return this.renderTokens(tokens,context,partials,template,config)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate,config){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate,config);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate,config);else if(symbol===">")value=this.renderPartial(token,context,partials,config);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context,config);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate,config){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials,config)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate,config)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate,config)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate,config)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate,config){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate,config)};Writer.prototype.indentPartial=function indentPartial(partial,indentation,lineHasNonSpace){var filteredIndentation=indentation.replace(/[^ \t]/g,"");var partialByNl=partial.split("\n");for(var i=0;i<partialByNl.length;i++){if(partialByNl[i].length&&(i>0||!lineHasNonSpace)){partialByNl[i]=filteredIndentation+partialByNl[i]}}return partialByNl.join("\n")};Writer.prototype.renderPartial=function renderPartial(token,context,partials,config){if(!partials)return;var tags=this.getConfigTags(config);var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null){var lineHasNonSpace=token[6];var tagIndex=token[5];var indentation=token[4];var indentedValue=value;if(tagIndex==0&&indentation){indentedValue=this.indentPartial(value,indentation,lineHasNonSpace)}var tokens=this.parse(indentedValue,tags);return this.renderTokens(tokens,context,partials,indentedValue,config)}};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context,config){var escape=this.getConfigEscape(config)||mustache.escape;var value=context.lookup(token[1]);if(value!=null)return typeof value==="number"&&escape===mustache.escape?String(value):escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};Writer.prototype.getConfigTags=function getConfigTags(config){if(isArray(config)){return config}else if(config&&typeof config==="object"){return config.tags}else{return undefined}};Writer.prototype.getConfigEscape=function getConfigEscape(config){if(config&&typeof config==="object"&&!isArray(config)){return config.escape}else{return undefined}};var mustache={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:undefined,escape:undefined,parse:undefined,render:undefined,Scanner:undefined,Context:undefined,Writer:undefined,set templateCache(cache){defaultWriter.templateCache=cache},get templateCache(){return defaultWriter.templateCache}};var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials,config){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials,config)};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache});
  }).call(window);

  function loadRenderer() {
    if (window.Mustache && typeof window.Mustache.render === "function") return Promise.resolve(window.Mustache);
    return Promise.reject(new Error("The document renderer did not start — reload the page (Ctrl+F5) and try again."));
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


  /* ── doc v2 — 인쇄 ──────────────────────────────────────────
     쓰는 판(doc_config.active[kind]) → doc_template_get → doc_data → 그리기 → 숨은 iframe 에서 브라우저 인쇄
     ⚠️ iframe sandbox = allow-same-origin(바깥에서 print 를 부르려고) + allow-modals(인쇄 창) — allow-scripts 는 없다(판의 스크립트는 돌지 않는다)
     ⚠️ 문서가 여럿(ship_ready 묶음 둘)이면 한 장씩 차례로 인쇄 창을 연다
     ⚠️ 판이 없으면 「Settings → Documents」 로 보낸다 — 판 없이 아무것도 찍지 않는다 */
  async function findInvoiceId(sb, number) {
    const { data, error } = await sb.from("so_invoice").select("id").eq("invoice_number", String(number)).limit(1);
    if (error) throw new Error(error.message);
    if (!data || !data.length) throw new Error("Invoice " + number + " was not found.");
    return data[0].id;
  }
  function printHtml(html) {
    return new Promise((resolve) => {
      const f = document.createElement("iframe");
      f.setAttribute("sandbox", "allow-same-origin allow-modals");
      f.setAttribute("aria-hidden", "true");
      f.style.cssText = "position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0";
      let fired = false;   // onload 가 두 번 와도 인쇄 창은 한 번
      f.onload = () => {
        if (fired) return; fired = true;
        setTimeout(() => {
          try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { console.warn("print:", e); }
          setTimeout(() => { f.remove(); resolve(); }, 800);
        }, 120);
      };
      f.srcdoc = html;
      document.body.appendChild(f);
    });
  }
  async function printDoc(sb, kind, ref) {
    if (!KIND_LBL[kind]) throw new Error("Unknown document " + kind);
    let r = Object.assign({}, ref || {});
    if (r.invoice_number && !r.invoice_id) { r.invoice_id = await findInvoiceId(sb, r.invoice_number); delete r.invoice_number; }
    const cf = await sb.rpc("doc_config");
    if (cf.error) throw new Error(cf.error.message);
    const act = ((cf.data || {}).active || {})[kind];
    if (!act) throw new Error("No layout is in use for the " + KIND_LBL[kind].toLowerCase() + " yet — an admin sets one in Settings → Documents.");
    const tg = await sb.rpc("doc_template_get", { p_template_id: act.template_id });
    if (tg.error) throw new Error(tg.error.message);
    if (!tg.data || !tg.data.body) throw new Error("The layout in use was not found — check Settings → Documents.");
    const d = await data(sb, kind, r);
    const docs = (d && d.docs) || [];
    if (!docs.length) throw new Error("There is nothing to print.");
    for (const doc of docs) await printHtml(await render(tg.data.body, doc));
    return { printed: docs.length, version: act.version, groups: d.groups || null };
  }
  /* 단추 하나에 붙이는 도우미 — 누르는 동안 막고 · 실패는 alert 로 */
  async function printBtn(btn, sb, kind, ref) {
    const old = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Preparing…"; }
    try { return await printDoc(sb, kind, ref); }
    catch (e) { alert("Could not print — " + e.message); return null; }
    finally { if (btn) { btn.disabled = false; btn.textContent = old; } }
  }


  /* ── doc v3 — 문서 메일(판정 529 · 530 · doc-3a · 3b) ───────────────
     mailDialog: doc_mail_send(p_commit false) 미리 보기 → 받는 주소 · 제목 · 본문 고치기 → 보내기(p_commit true)
       ship_ready 는 먼저 EF doc 으로 PDF 를 만들고 그 doc_file_id 를 넘긴다(일꾼은 ship_ready 를 못 만든다)
     mailList: doc_mail_list → 보낸 메일 · 건너뛴 자동 메일 · 아직 안 나간 것은 취소(doc_mail_cancel · 메모 필수)
     ⚠️ 판정은 DB 가 한다 — 화면은 창구가 돌려준 글을 그린다 */
  function h(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  /* doc v4(mail-att-a2 · 판정 1274 ~ 1281 다크): 넣는 CSS 의 색은 전부 var(이름, 옛 색) — 라이트 값 = 고치기 전 색 그대로(시험이 둘째 값을 옛 글과 맞춘다)
     · ims-ui.css 이름은 라이트 값이 옛 색과 같은 것만(--ims-surface #fff · --bad #b42318) · 나머지는 --dk-<bg|ln|tx>-<hex>(라이트 :root 에 없거나 같은 hex — 화면 선례)
     · 다크 값은 아래 html[data-theme="dark"] 한 줄(IMS · POS 만 · WMS 라이트 고정) — 다른 화면이 같은 이름에 준 다크 값을 그대로 썼다 */
  function css() {
    if (document.getElementById("imsDocCss")) return;
    const st = document.createElement("style"); st.id = "imsDocCss";
    st.textContent = 'html[data-theme="dark"]:is([data-ims-mode="ims"],[data-ims-mode="pos"]){--dk-bg-0f172a73:rgba(0,0,0,.6);--dk-bg-00000040:rgba(0,0,0,.6);--dk-ln-e3e7ee:#2a313b;--dk-ln-d5dae2:#3a4350;--dk-tx-5b6472:#98a2b0;'
      + "--dk-bg-fff7e6:#413316;--dk-ln-f5d38a:#76552d;--dk-tx-067647:#71f4bd;--dk-bg-ecfdf3:#164128;--dk-ln-abefc6:#2d764a;--dk-bg-fef3f2:#1c2129;--dk-ln-fecdca:#76312d;--dk-tx-8a94a6:#6f7a88;--dk-bg-1f2933:#e6e9ee;--dk-tx-ffffff:#12161c}"
      + ".idm{position:fixed;inset:0;background:var(--dk-bg-0f172a73,rgba(15,23,42,.45));display:flex;align-items:flex-start;justify-content:center;z-index:9999;padding:48px 12px;overflow:auto}"
      + ".idm .bx{background:var(--ims-surface,#fff);border-radius:14px;max-width:640px;width:100%;box-shadow:0 20px 50px var(--dk-bg-00000040,rgba(0,0,0,.25))}"
      + ".idm h4{margin:0;padding:14px 18px;border-bottom:1px solid var(--dk-ln-e3e7ee,#e3e7ee);font-size:15px}"
      + ".idm .bd{padding:14px 18px;display:flex;flex-direction:column;gap:10px;font-size:13px}"
      + ".idm label{display:flex;flex-direction:column;gap:3px;font-weight:600;font-size:12.5px}"
      + ".idm input,.idm textarea{font:inherit;font-weight:400;border:1px solid var(--dk-ln-d5dae2,#d5dae2);border-radius:9px;padding:7px 9px}"
      + ".idm .ft{display:flex;gap:8px;justify-content:flex-end;padding:12px 18px;border-top:1px solid var(--dk-ln-e3e7ee,#e3e7ee)}"
      + ".idm .nt{font-size:12px;color:var(--dk-tx-5b6472,#5b6472)}.idm .wn{background:var(--dk-bg-fff7e6,#fff7e6);border:1px solid var(--dk-ln-f5d38a,#f5d38a);border-radius:9px;padding:8px 10px;font-size:12.5px}"
      + ".idm .er{color:var(--bad,#b42318)}.idm .ok{color:var(--dk-tx-067647,#067647)}"
      + ".idml table{width:100%;border-collapse:collapse;font-size:12.5px}.idml th,.idml td{text-align:left;padding:6px 8px;border-top:1px solid var(--dk-ln-e3e7ee,#e3e7ee);vertical-align:top}"
      + ".idml .st{display:inline-block;border-radius:999px;padding:1px 8px;font-size:11.5px;border:1px solid var(--dk-ln-d5dae2,#d5dae2)}"
      + ".idml .st.sent{background:var(--dk-bg-ecfdf3,#ecfdf3);border-color:var(--dk-ln-abefc6,#abefc6)}.idml .st.failed,.idml .st.unknown{background:var(--dk-bg-fef3f2,#fef3f2);border-color:var(--dk-ln-fecdca,#fecdca)}.idml .st.cancelled{color:var(--dk-tx-8a94a6,#8a94a6)}"
      /* doc v4 새 규칙(mail-att-a2) — 첨부 칸 · 고르기 창 · 색은 기존 이름만 */
      + ".idm .ida{display:flex;flex-direction:column;gap:6px;border:1px dashed var(--dk-ln-d5dae2,#d5dae2);border-radius:10px;padding:10px}"
      + ".idm .ida.drag{border-color:var(--accent,#2f6df6);background:var(--ims-sel-bg,#eef3ff)}"
      + ".idm .ida-h{display:flex;gap:8px;align-items:baseline;font-weight:600;font-size:12.5px}.idm .ida-h .nt{font-weight:400}"
      + ".idm .ida-l{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}"
      + ".idm .ida-l li{display:flex;gap:8px;align-items:center;font-size:12.5px;border-top:1px solid var(--dk-ln-e3e7ee,#e3e7ee);padding-top:4px}"
      + ".idm .ida-l li:first-child{border-top:0;padding-top:0}.idm .ida-l .fn{flex:1;min-width:0;overflow-wrap:anywhere}"
      + ".idm .ida-b{display:flex;gap:8px;flex-wrap:wrap;align-items:center}"
      + ".idm .tg{display:inline-block;border:1px solid var(--dk-ln-d5dae2,#d5dae2);border-radius:999px;padding:0 7px;font-size:11px;font-weight:400;margin-left:4px;white-space:nowrap}"
      + ".idm .tg.cx{color:var(--bad,#b42318);border-color:var(--dk-ln-fecdca,#fecdca)}.idm .tg.me{color:var(--accent,#2f6df6)}"
      + ".idm .bx.wide{max-width:980px}.idm .ipk-t{display:flex;gap:6px;flex-wrap:wrap;align-items:center}"
      + ".idm .ipk{overflow:auto;max-height:52vh}.idm .ipk table{width:100%;border-collapse:collapse;font-size:12px}"
      + ".idm .ipk th,.idm .ipk td{text-align:left;padding:5px 6px;border-top:1px solid var(--dk-ln-e3e7ee,#e3e7ee);vertical-align:top}.idm .ipk td.num{text-align:right;white-space:nowrap}"
      + ".idm .ipk input[type=checkbox]{padding:0}"
      /* doc v5 새 규칙(mail-rcpt-1) — 연락처 체크 목록 · 색은 기존 이름만 */
      + ".idm .idc{display:flex;flex-direction:column;gap:4px;border:1px solid var(--dk-ln-e3e7ee,#e3e7ee);border-radius:10px;padding:8px 10px}"
      + ".idm .idc-h{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap;font-weight:600;font-size:12.5px}.idm .idc-h .nt{font-weight:400}"
      + ".idm .idc-l{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:3px;max-height:190px;overflow:auto}"
      + ".idm .idc-l label{flex-direction:row;gap:8px;align-items:baseline;font-weight:400;cursor:pointer}"
      + ".idm .idc-l label.off{cursor:default;color:var(--dk-tx-5b6472,#5b6472)}"
      + ".idm .idc-l input[type=checkbox]{padding:0;flex:none;align-self:center}"
      + ".idm .idc-l .fn{flex:1;min-width:0;overflow-wrap:anywhere}.idm .idc-l .ad{font-weight:600}";
    document.head.appendChild(st);
  }
  function overlay(inner, wide) {
    css();
    const ov = document.createElement("div"); ov.className = "idm"; ov.innerHTML = '<div class="bx' + (wide ? " wide" : "") + '">' + inner + "</div>";
    document.body.appendChild(ov);
    return ov;
  }
  /* doc v3a — 화면 아래 잠깐 뜨는 안내(창을 닫은 뒤 「보냈다」를 알린다) */
  function toast(text) {
    css();
    const t = document.createElement("div");
    t.setAttribute("role", "status");
    t.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:var(--dk-bg-1f2933,#1f2933);color:var(--dk-tx-ffffff,#fff);padding:10px 16px;border-radius:10px;font-size:13px;z-index:10000;box-shadow:0 8px 24px var(--dk-bg-00000040,rgba(0,0,0,.25))";
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  /* ── doc v4 — 문서 메일 추가 첨부(mail-att-a2 · 판정 1464 ~ 1467 · 1473 · 1481 · asung-wms A-1a 5f0cba4 · A-1b 16fb86c) ──
     · 형식 일곱 확장자(1464) · 파일 하나 10 MB · 합계는 미리 보기의 attach_limit(문서 PDF 몫을 뺀 값 · 1465) · 10 개(attach_max_files)
     · 화면이 먼저 막고 서버가 다시 막는다 — 서버 글은 그대로 보인다(다시 쓰지 않는다)
     · 올리기 = 버킷 mail-files/<uuid>.<소문자 확장자>(contentType 은 확장자로 · 브라우저 형식은 믿지 않는다) → mail_upload_add
     · 빼기 = 이번 창에서 올린 것은 mail_upload_delete(아직 안 보냈다 · 1466) · 고른 것은 목록에서만
     · 창을 닫으면(보내지 않고) 이번 창에서 올린 것을 지운다 — 실패해도 닫는다(남은 파일은 무해 · 콘솔에만)
     · 첨부가 없으면 doc_mail_send 호출은 doc v3a 와 같은 키 집합(p_attach 키 자체를 넣지 않는다)
     · ⚠️ ship_ready 는 미리 보기 때 PDF 가 없어 서버가 1 MB 몫으로 셈한다 — 보낼 때 실제 PDF 크기로 다시 막는다(미룬 일)
     · 항목 꼴 {key, src: 'upload' | 'pick' | 'auto', kind: 'upload' | 'doc', id, name, bytes, sha, mine, checked, state}
       src 'auto' = 뒤 차수 B 의 팩킹 리스트 자리(1473 — 체크된 채 들어가고 뺄 수 있다) · 이번엔 만들지 않는다 · p_attach 에 싣는 길도 B 가 정한다 */
  const ATT_MIME = {
    pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", csv: "text/csv",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  const ATT_FILE_MAX = 10485760;                 // 파일 하나(버킷 file_size_limit · mail_upload_bytes_ck)
  const ATT_LIMIT_DEFAULT = 9437184;             // 미리 보기가 attach_limit 을 주기 전(10 MB − 문서 PDF 몫 1 MB)
  const ATT_MAX_DEFAULT = 10;
  function fmtBytes(n) {
    n = Number(n || 0);
    if (n >= 1048576) return (n / 1048576).toFixed(1) + " MB";
    if (n >= 1024) return Math.max(1, Math.round(n / 1024)) + " KB";
    return n + " B";
  }
  function extOf(name) { const m = /\.([A-Za-z0-9]+)$/.exec(String(name || "")); return m ? m[1].toLowerCase() : ""; }
  function newUuid() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    const b = new Uint8Array(16); window.crypto.getRandomValues(b); b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const x = Array.from(b, (v) => v.toString(16).padStart(2, "0")).join("");
    return x.slice(0, 8) + "-" + x.slice(8, 12) + "-" + x.slice(12, 16) + "-" + x.slice(16, 20) + "-" + x.slice(20);
  }
  function fileBuf(f) {
    if (typeof f.arrayBuffer === "function") return f.arrayBuffer();
    return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsArrayBuffer(f); });
  }
  async function sha256Hex(f) {
    const d = await window.crypto.subtle.digest("SHA-256", await fileBuf(f));
    return Array.from(new Uint8Array(d), (v) => v.toString(16).padStart(2, "0")).join("");
  }

  /* 첨부 칸 하나 — mailDialog 가 bd 안의 상자(box)에 붙인다 · 바깥에는 attachArg · busy · cleanup · markSent 만 */
  function attachBox(sb, kind, ref, box, p0) {
    const items = [];
    let limit = Number(p0.attach_limit) > 0 ? Number(p0.attach_limit) : ATT_LIMIT_DEFAULT;
    let maxFiles = Number(p0.attach_max_files) > 0 ? Number(p0.attach_max_files) : ATT_MAX_DEFAULT;
    let closed = false, sent = false, seq = 0, nkey = 0;
    const docLbl = KIND_LBL[kind].toLowerCase();
    box.className = "ida";
    box.innerHTML = '<div class="ida-h">Attachments <span class="nt" data-x="sum"></span></div>'
      + '<ul class="ida-l" data-x="list"></ul>'
      + '<div class="ida-b"><button type="button" class="pobtn" data-x="pc">Attach files…</button><button type="button" class="pobtn" data-x="ims">From IMS…</button>'
      + '<span class="nt">or drop files here · PDF, JPG, PNG, XLSX, CSV, DOCX · up to 10 MB each</span>'
      + '<input type="file" multiple hidden data-x="file" accept=".pdf,.jpg,.jpeg,.png,.xlsx,.csv,.docx"></div>'
      + '<div data-x="amsg"></div>';
    const $ = (x) => box.querySelector('[data-x="' + x + '"]');
    const amsg = (cls, t) => { const m = $("amsg"); m.className = cls || ""; m.textContent = t || ""; };
    const live = () => items.filter((i) => i.state !== "gone" && i.src !== "auto");
    const used = () => live().reduce((s, i) => s + Number(i.bytes || 0), 0);
    function attachArg() {
      return items.filter((i) => i.state === "ok" && i.checked && i.src !== "auto" && i.id)
        .map((i) => (i.kind === "upload" ? { upload_id: i.id } : { doc_file_id: i.id }));
    }
    function draw() {
      const L = live();
      $("sum").textContent = L.length ? L.length + " of " + maxFiles + " extra files · " + fmtBytes(used()) + " of " + fmtBytes(limit) : "No extra files · up to " + maxFiles + " files, " + fmtBytes(limit) + " in all";
      $("list").innerHTML = '<li><span class="fn">PDF of this ' + h(docLbl) + '</span><span class="nt">attached · made with the layout in use</span></li>'
        + items.filter((i) => i.state !== "gone").map((i) =>
          '<li data-k="' + i.key + '">' + (i.src === "auto" ? '<input type="checkbox" data-chk="' + i.key + '"' + (i.checked ? " checked" : "") + ">" : "")
          + '<span class="fn">' + h(i.name) + (i.cancelled ? '<span class="tg cx">cancelled</span>' : "") + '</span>'
          + '<span class="nt">' + h(i.state === "uploading" ? "uploading…" : fmtBytes(i.bytes)) + " · " + h(i.origin) + "</span>"
          + (i.src === "auto" ? "" : '<button type="button" class="xbtn" data-rm="' + i.key + '" title="Remove from this email">×</button>') + "</li>").join("");
      $("list").querySelectorAll("[data-rm]").forEach((b) => { b.onclick = () => remove(Number(b.dataset.rm)); });
      $("list").querySelectorAll("[data-chk]").forEach((c) => { c.onchange = () => { const it = items.find((i) => i.key === Number(c.dataset.chk)); if (it) it.checked = c.checked; }; });
    }
    /* 미리 보기 다시 — 첨부가 있을 때만 p_attach 를 싣는다 · 받는 칸(To · Subject · Message)은 덮지 않는다 · 늦게 온 옛 답은 버린다 */
    async function recheck() {
      const arg = attachArg(), my = ++seq;
      if (!arg.length) { draw(); return; }
      const r = await sb.rpc("doc_mail_send", { p_kind: kind, p_ref: ref, p_commit: false, p_attach: arg });
      if (my !== seq || closed) return;
      if (r.error) { amsg("er", r.error.message); draw(); return; }
      const d = r.data || {};
      if (Number(d.attach_limit) > 0) limit = Number(d.attach_limit);
      if (Number(d.attach_max_files) > 0) maxFiles = Number(d.attach_max_files);
      (d.attachments || []).forEach((a) => {
        const id = a.upload_id || a.doc_file_id;
        const it = items.find((i) => i.id === id && i.state === "ok");
        if (it) { if (a.filename) it.name = a.filename; if (a.bytes != null) it.bytes = Number(a.bytes); }
      });
      draw();
    }
    /* 화면에서 먼저 막기 — 개수 · 합계(올리는 중인 것도 센다) */
    function roomFor(name, bytes) {
      if (live().length + 1 > maxFiles) return "At most " + maxFiles + " extra files in one email — " + name + " was not attached.";
      if (used() + bytes > limit) return name + " (" + fmtBytes(bytes) + ") would bring the extra files to " + fmtBytes(used() + bytes) + " — this email can carry " + fmtBytes(limit) + " of extra files. It was not attached.";
      return null;
    }
    async function addFiles(list) {
      const fs = Array.from(list || []);
      const errs = [];
      const todo = [];
      for (const f of fs) {
        const ext = extOf(f.name);
        if (!ATT_MIME[ext]) { errs.push(f.name + ": only PDF, JPG, PNG, XLSX, CSV and DOCX files can be attached."); continue; }
        if (!(f.size > 0)) { errs.push(f.name + " is empty."); continue; }
        if (f.size > ATT_FILE_MAX) { errs.push(f.name + " is " + fmtBytes(f.size) + " — one file can be at most 10 MB."); continue; }
        const room = roomFor(f.name, f.size);
        if (room) { errs.push(room); continue; }
        const it = { key: ++nkey, src: "upload", kind: "upload", id: null, name: f.name, bytes: f.size, sha: null, mine: true, checked: true, state: "uploading", origin: "from this computer" };
        items.push(it); todo.push([it, f, ext]);
      }
      amsg(errs.length ? "er" : "", errs.join(" "));
      draw();
      for (const [it, f, ext] of todo) {
        const e = await uploadOne(it, f, ext);
        if (e) errs.push(e);
        if (closed) return;
        amsg(errs.length ? "er" : "", errs.join(" "));
        draw();
      }
      if (todo.length) await recheck();
    }
    async function uploadOne(it, f, ext) {
      try {
        it.sha = await sha256Hex(f);
        if (items.some((o) => o !== it && o.state !== "gone" && o.sha && o.sha === it.sha)) { it.state = "gone"; return f.name + " is already attached."; }
        if (it.state === "gone") return null;   // 올리기 전에 빼거나 창을 닫았다
        const path = newUuid() + "." + ext;
        const up = await sb.storage.from("mail-files").upload(path, f, { upsert: false, contentType: ATT_MIME[ext] });
        if (up.error) { it.state = "gone"; return up.error.message; }
        const r = await sb.rpc("mail_upload_add", { p: { kind, ref, path, original_name: f.name, sha256: it.sha } });
        if (r.error) { it.state = "gone"; console.warn("mail-files: stored but not registered (left in the bucket):", path); return r.error.message; }
        const d = r.data || {};
        it.id = d.upload_id; it.name = d.filename || f.name; it.bytes = Number(d.bytes || f.size);
        if (it.state === "gone" || closed) { await dropUpload(it); return null; }   // 올리는 동안 빼거나 닫았다 — 지운다
        it.state = "ok";
        return null;
      } catch (e) { it.state = "gone"; return f.name + ": " + (e && e.message ? e.message : String(e)); }
    }
    async function dropUpload(it) {
      if (!it.mine || !it.id || it.dropped) return null;
      it.dropped = true;
      const r = await sb.rpc("mail_upload_delete", { p_upload_id: it.id });
      if (r.error) { console.warn("mail_upload_delete:", it.id, r.error.message); return r.error.message; }
      return null;
    }
    async function remove(key) {
      const it = items.find((i) => i.key === key);
      if (!it || it.state === "gone") return;
      const was = it.state;
      it.state = "gone";
      amsg("", "");
      draw();
      if (was === "ok" && it.mine) { const e = await dropUpload(it); if (e) amsg("er", e); }   // 올리는 중이면 uploadOne 이 끝난 뒤 지운다
      await recheck();
    }
    function addPicked(rows) {
      const errs = [];
      for (const r of rows) {
        const kindR = r.source === "upload" ? "upload" : "doc";
        if (items.some((i) => i.state !== "gone" && i.id === r.id)) continue;
        const room = roomFor(r.filename, Number(r.bytes || 0));
        if (room) { errs.push(room); continue; }
        const num = r.invoice_number || r.credit_number || r.doc_number || ((r.so_numbers || [])[0]) || "";
        items.push({ key: ++nkey, src: "pick", kind: kindR, id: r.id, name: r.filename, bytes: Number(r.bytes || 0), sha: null, mine: false, checked: true, state: "ok", cancelled: !!r.cancelled,
          origin: kindR === "upload" ? "uploaded file in IMS" : "from IMS" + (r.doc_kind && KIND_LBL[r.doc_kind] ? " · " + KIND_LBL[r.doc_kind] : "") + (num ? " " + num : "") });
      }
      amsg(errs.length ? "er" : "", errs.join(" "));
      draw();
      return recheck();
    }
    const inp = $("file");
    $("pc").onclick = () => inp.click();
    inp.onchange = () => { const fl = Array.from(inp.files || []); inp.value = ""; addFiles(fl); };
    box.addEventListener("dragover", (e) => { e.preventDefault(); box.classList.add("drag"); });
    box.addEventListener("dragleave", () => box.classList.remove("drag"));
    box.addEventListener("drop", (e) => { e.preventDefault(); box.classList.remove("drag"); addFiles((e.dataTransfer && e.dataTransfer.files) || []); });
    $("ims").onclick = () => pickDialog(sb, kind, ref, { has: (id) => items.some((i) => i.state !== "gone" && i.id === id), onPick: addPicked });
    draw();
    return {
      attachArg,
      busy: () => items.some((i) => i.state === "uploading"),
      markSent: () => { sent = true; },
      /* 창을 닫을 때 — 보내지 않았으면 이번 창에서 올린 것을 지운다(올리는 중인 것은 uploadOne 이 끝나며 closed 를 보고 지운다) */
      cleanup: () => {
        closed = true;
        if (sent) return Promise.resolve();
        return Promise.all(items.filter((i) => i.mine && i.id && i.state === "ok").map((i) => dropUpload(i))).catch((e) => console.warn("mail attach cleanup:", e));
      },
      _items: items,   // 시험용(읽기만)
    };
  }

  /* 「From IMS…」 고르기 창 — doc_attach_pick_list(범위는 서버가 정한다 · 1467 · 1481) · 탭 doc | upload | sent · 이름 · 번호 검색 · 50 씩 쪽 */
  const PICK_TABS = [["doc", "Documents"], ["upload", "Uploaded"], ["sent", "Sent before"]];
  const PICK_PAGE = 50;
  function pickDialog(sb, kind, ref, o) {
    const ov = overlay('<h4>Attach files from IMS</h4><div class="bd">'
      + '<div class="ipk-t">' + PICK_TABS.map(([k, l]) => '<button type="button" class="pobtn" data-tab="' + k + '">' + h(l) + "</button>").join("")
      + '<input type="search" autocomplete="off" placeholder="File name or number" data-x="q" style="flex:1;min-width:160px"></div>'
      + '<div class="nt" data-x="scope"></div><div class="ipk" data-x="rows"><div class="nt">Loading…</div></div>'
      + '<div class="ipk-t"><button type="button" class="pobtn" data-x="prev">‹ Prev</button><span class="nt" data-x="pg"></span><button type="button" class="pobtn" data-x="next">Next ›</button></div>'
      + '<div data-x="msg"></div></div>'
      + '<div class="ft"><button type="button" class="pobtn" data-x="close">Cancel</button><button type="button" class="pobtn go" data-x="add" disabled>Attach</button></div>', true);
    const $ = (x) => ov.querySelector('[data-x="' + x + '"]');
    const ts = (s) => (typeof window.imsTs === "function" ? window.imsTs(s) : (s || ""));
    const st = { source: "doc", q: "", offset: 0, total: 0, rows: [] };
    const picked = new Map();   // id → 행(탭 · 쪽을 넘어도 남는다)
    let my = 0, tq = null;
    const addBtn = $("add");
    const syncAdd = () => { addBtn.disabled = !picked.size; addBtn.textContent = picked.size ? "Attach " + picked.size : "Attach"; };
    async function load() {
      const n = ++my;
      ov.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("go", b.dataset.tab === st.source));
      const f = { source: st.source, limit: PICK_PAGE, offset: st.offset };
      if (st.q) f.q = st.q;
      const r = await sb.rpc("doc_attach_pick_list", { p_kind: kind, p_ref: ref, p_filters: f });
      if (n !== my) return;
      if (r.error) { $("rows").innerHTML = '<div class="er">' + h(r.error.message) + "</div>"; $("pg").textContent = ""; return; }
      const d = r.data || {};
      st.total = Number(d.total || 0); st.rows = d.files || [];
      const sc = (d.scope || []).map((c) => c.name).filter(Boolean);
      $("scope").textContent = sc.length ? "Files of " + sc.join(", ") : "";
      $("rows").innerHTML = st.rows.length ? "<table><thead><tr><th></th><th>File</th><th>Kind</th><th>Order</th><th>Invoice / credit</th><th>Store</th><th>Date</th><th>Size</th><th>Sent</th></tr></thead><tbody>"
        + st.rows.map((x, i) => {
          const had = o.has(x.id);
          const num = x.invoice_number || x.credit_number || "";
          return "<tr><td><input type=\"checkbox\" data-i=\"" + i + "\"" + (had || picked.has(x.id) ? " checked" : "") + (had ? " disabled title=\"Already attached\"" : "") + "></td>"
            + "<td>" + h(x.filename) + (x.this_doc ? '<span class="tg me">this document</span>' : "") + (x.cancelled ? '<span class="tg cx">cancelled</span>' : "") + "</td>"
            + "<td>" + h(x.source === "upload" ? "Uploaded file" : (KIND_LBL[x.doc_kind] || x.doc_kind || "")) + "</td>"
            + "<td>" + h((x.so_numbers || []).join(", ")) + "</td><td>" + h(num) + "</td>"
            + "<td>" + h((x.stores || []).join(", ")) + "</td><td>" + h(ts(x.at)) + (x.by_name ? '<div class="nt">' + h(x.by_name) + "</div>" : "") + "</td>"
            + '<td class="num">' + h(fmtBytes(x.bytes)) + "</td>"
            + "<td>" + (Number(x.sent_count) > 0 ? h("sent " + x.sent_count + (Number(x.sent_count) === 1 ? " time" : " times")) + (x.sent_this_doc ? '<div class="nt">with this document</div>' : "") : "") + "</td></tr>";
        }).join("") + "</tbody></table>"
        : '<div class="nt">' + (st.q ? "No files match." : "No files here yet.") + "</div>";
      $("rows").querySelectorAll("[data-i]").forEach((c) => { c.onchange = () => {
        const x = st.rows[Number(c.dataset.i)];
        if (c.checked) picked.set(x.id, x); else picked.delete(x.id);
        syncAdd();
      }; });
      $("pg").textContent = st.total ? (st.offset + 1) + "–" + Math.min(st.offset + st.rows.length, st.total) + " of " + st.total : "";
      $("prev").disabled = st.offset <= 0;
      $("next").disabled = st.offset + PICK_PAGE >= st.total;
    }
    ov.querySelectorAll("[data-tab]").forEach((b) => { b.onclick = () => { st.source = b.dataset.tab; st.offset = 0; load(); }; });
    $("q").oninput = () => { clearTimeout(tq); tq = setTimeout(() => { st.q = $("q").value.trim(); st.offset = 0; load(); }, 300); };
    $("q").onkeydown = (e) => { if (e.key === "Enter") { clearTimeout(tq); st.q = $("q").value.trim(); st.offset = 0; load(); } };
    $("prev").onclick = () => { st.offset = Math.max(0, st.offset - PICK_PAGE); load(); };
    $("next").onclick = () => { st.offset += PICK_PAGE; load(); };
    $("close").onclick = () => ov.remove();
    addBtn.onclick = () => { const rows = Array.from(picked.values()); ov.remove(); o.onPick(rows); };
    syncAdd();
    load();
    return ov;
  }

  const MAIL_KINDS = ["final_invoice", "credit_note", "sales_order", "ship_ready"];
  /* ── doc v5 — 받는 사람 체크 목록(mail-rcpt-1 · 판정 1497 · asung-wms 20261121172000) ──
     · 재료 = 미리 보기의 contacts [{customer_name, role bill_to|store, name, email, include_in_email, is_default, picked, flag bad_shape|cap|null, also[]}] — 주소당 한 줄
     · 체크의 참 = To 칸 — 체크는 To 칸에 그 주소가 있느냐를 그린다(보이는 것 = 가는 것) · To 칸을 손으로 고치면 체크가 따라온다
     · 켜면 To 칸 끝에 더하고 끄면 그 주소만 뺀다 — 직원이 쳐 넣은 다른 주소 · 순서는 그대로 · 이번 메일에만(연락처 설정은 Customers 화면)
     · 열 명(RCPT_MAX)이 차면 더 켜지지 않는다 — 서버(doc_mail_send)가 같은 수로 다시 막는다
     · bad_shape(주소 모양 아님)는 고를 수 없다 · contacts 가 없거나(옛 DB) 한 줄 이하면 아무것도 그리지 않는다(doc v4 모양) */
  const RCPT_MAX = 10;
  function toList(v) { return String(v || "").split(/[,;]/).map((s) => s.trim()).filter(Boolean); }
  function contactsBox(box, toEl, contacts, say) {
    const rows = Array.isArray(contacts) ? contacts.filter((c) => c && c.email) : [];
    if (rows.length < 2) { box.remove(); return null; }
    const key = (s) => String(s || "").trim().toLowerCase();
    box.className = "idc";
    box.innerHTML = '<div class="idc-h">Contacts <span class="nt">Tick who gets this email. This email only — contact settings stay as they are (change them in Customers).</span></div>'
      + '<ul class="idc-l">' + rows.map((c, i) => {
        const bad = c.flag === "bad_shape";
        const who = (c.customer_name || "") + (c.role === "store" ? " · store" : " · bill-to") + (Array.isArray(c.also) && c.also.length ? " · also at " + c.also.join(", ") : "");
        return '<li><label' + (bad ? ' class="off"' : "") + '><input type="checkbox" data-ct="' + i + '"' + (bad ? " disabled" : "") + ">"
          + '<span class="fn">' + (c.name ? h(c.name) + " · " : "") + '<span class="ad">' + h(c.email) + "</span>"
          + (c.is_default ? '<span class="tg">default</span>' : "")
          + (c.include_in_email ? "" : '<span class="tg">not in emails</span>')
          + (bad ? '<span class="tg cx">not an email address</span>' : "")
          + (c.flag === "cap" ? '<span class="tg cx">left out — over ' + RCPT_MAX + "</span>" : "")
          + '</span><span class="nt">' + h(who) + "</span></label></li>";
      }).join("") + "</ul>";
    const boxes = Array.from(box.querySelectorAll("[data-ct]"));
    function sync() {
      const have = toList(toEl.value).map(key);
      boxes.forEach((b) => { const c = rows[Number(b.dataset.ct)]; b.checked = c.flag !== "bad_shape" && have.indexOf(key(c.email)) >= 0; });
    }
    boxes.forEach((b) => {
      b.onchange = () => {
        const c = rows[Number(b.dataset.ct)], k = key(c.email), cur = toList(toEl.value);
        if (b.checked) {
          if (cur.map(key).indexOf(k) < 0) {
            if (cur.length >= RCPT_MAX) { b.checked = false; say("er", "At most " + RCPT_MAX + " recipients in one email — untick or remove someone first. " + c.email + " was not added."); return; }
            cur.push(c.email);
          }
        } else {
          for (let i = cur.length - 1; i >= 0; i--) if (key(cur[i]) === k) cur.splice(i, 1);
        }
        toEl.value = cur.join(", ");
        say("", "");
        sync();
      };
    });
    toEl.addEventListener("input", sync);
    sync();
    return { sync };
  }

  async function mailDialog(sb, kind, ref, opts) {
    const o = opts || {};
    if (MAIL_KINDS.indexOf(kind) < 0) { alert("This document is not emailed to customers."); return null; }
    const ov = overlay('<h4>Email the ' + h(KIND_LBL[kind].toLowerCase()) + '</h4><div class="bd"><div class="nt">Preparing…</div></div>'
      + '<div class="ft"><button class="pobtn" data-x="close">Cancel</button><button class="pobtn go" data-x="send" disabled>Send</button></div>');
    const bd = ov.querySelector(".bd"), send = ov.querySelector('[data-x="send"]');
    let done = null, att = null;
    const close = () => { ov.remove(); if (att) att.cleanup(); };   // doc v4: 보내지 않고 닫으면 이번 창에서 올린 파일을 지운다(실패해도 닫는다)
    ov.querySelector('[data-x="close"]').onclick = close;
    const pv = await sb.rpc("doc_mail_send", { p_kind: kind, p_ref: ref, p_commit: false });
    if (pv.error) { bd.innerHTML = '<div class="er">' + h(pv.error.message) + "</div>"; return null; }
    const p = pv.data || {};
    bd.innerHTML = '<div class="nt">From <b>' + h(p.from_name || "") + "</b> &lt;" + h(p.from || "") + "&gt;" + (p.reply_to ? " · replies go to " + h(p.reply_to) : "") + "</div>"
      + (p.redirect_to ? '<div class="wn">Test mode — this email goes to <b>' + h(p.redirect_to) + "</b>, not to the customer.</div>" : "")
      + '<label>To <input type="search" autocomplete="off" data-f="to"></label>'
      + '<div data-x="ct"></div>'
      + '<label>Subject <input type="search" autocomplete="off" data-f="subject"></label>'
      + '<label>Message <textarea rows="7" data-f="body"></textarea></label>'
      + '<div class="nt">The PDF of this ' + h(KIND_LBL[kind].toLowerCase()) + " is attached, made with the layout in use. The email goes out within a minute or two.</div>"
      + '<div data-x="att"></div>'
      + '<div data-x="msg"></div>';
    bd.querySelector('[data-f="to"]').value = p.to || "";
    bd.querySelector('[data-f="subject"]').value = p.subject || "";
    bd.querySelector('[data-f="body"]').value = p.body || "";
    att = attachBox(sb, kind, ref, bd.querySelector('[data-x="att"]'), p);
    send.disabled = false;
    const msg = (cls, t) => { const m = bd.querySelector('[data-x="msg"]'); m.className = cls; m.textContent = t; };
    contactsBox(bd.querySelector('[data-x="ct"]'), bd.querySelector('[data-f="to"]'), p.contacts, msg);   // doc v5: contacts 가 없거나 한 줄이면 자리를 지운다(doc v4 모양)
    send.onclick = async () => {
      const to = bd.querySelector('[data-f="to"]').value.trim(), subject = bd.querySelector('[data-f="subject"]').value.trim(), body = bd.querySelector('[data-f="body"]').value;
      if (!to) { msg("er", "Type the address to send to."); return; }
      if (toList(to).length > RCPT_MAX) { msg("er", "At most " + RCPT_MAX + " recipients in one email — you have " + toList(to).length + ". Remove some and send again. Nothing was sent."); return; }   // doc v5: 서버와 같은 상한을 화면이 먼저
      if (att.busy()) { msg("er", "Wait until the files finish uploading."); return; }
      send.disabled = true; msg("nt", "Sending…");
      let fileId = null;
      if (kind === "ship_ready") {
        msg("nt", "Making the PDF…");
        const r = await sb.functions.invoke("doc", { body: { action: "render", kind, ref, reason: "send" } });
        const files = (r.data && r.data.files) || [];
        if (r.error || !files.length) { msg("er", "Could not make the PDF — " + ((r.data && r.data.error) || (r.error && r.error.message) || "no file came back") + ". Nothing was sent."); send.disabled = false; return; }
        if (files.length > 1) { msg("er", "This makes " + files.length + " invoices — email each order on its own. Nothing was sent."); send.disabled = false; return; }
        fileId = files[0].doc_file_id;
      }
      const args = { p_kind: kind, p_ref: ref, p_commit: true, p_to: to, p_subject: subject, p_body: body };
      if (fileId) args.p_doc_file_id = fileId;
      const extra = att.attachArg();
      if (extra.length) args.p_attach = extra;   // doc v4: 첨부가 없으면 키 자체가 없다(doc v3a 와 같은 호출)
      const { data, error } = await sb.rpc("doc_mail_send", args);
      if (error) { msg("er", error.message); send.disabled = false; return; }
      done = data;
      att.markSent();
      close();
      toast("Email queued — it goes out within a minute or two.");   // doc v3a — 기다리지 않는다
      if (typeof o.onDone === "function") { try { o.onDone(data); } catch (e) { console.warn(e); } }
    };
    return done;
  }

  const ST_LBL = { waiting_pdf: "making PDF", queued: "waiting to send", sending: "sending", sent: "sent", failed: "failed", unknown: "result unknown", cancelled: "cancelled" };
  const SKIP_LBL = { no_email: "No automatic email — the customer has no email address", reissue: "No automatic email — this invoice was reissued", error: "Automatic email could not be prepared" };
  async function mailList(sb, kind, ref, box) {
    if (!box) return;
    css(); box.classList.add("idml");
    const { data, error } = await sb.rpc("doc_mail_list", { p_kind: kind, p_ref: ref });
    if (error) { box.innerHTML = '<div class="msg err">' + h(error.message) + "</div>"; return; }
    const ms = (data && data.mails) || [], sk = (data && data.skipped) || [];
    const ts = (s) => (typeof window.imsTs === "function" ? window.imsTs(s) : (s || ""));
    let out = "";
    if (ms.length) out += "<table><thead><tr><th>When</th><th>To</th><th>Subject</th><th>Status</th><th>By</th><th></th></tr></thead><tbody>" + ms.map((m) =>
      "<tr><td>" + h(ts(m.sent_at || m.created_at)) + "</td><td>" + h(m.original_to || m.to) + (m.original_to && m.to && m.original_to !== m.to ? '<div class="dim" style="font-size:11.5px">test mode → ' + h(m.to) + "</div>" : "") + "</td>"
      + "<td>" + h(m.subject) + "</td><td><span class=\"st " + h(m.status) + "\">" + h(ST_LBL[m.status] || m.status) + "</span>" + (m.last_error && m.status !== "sent" ? '<div class="dim" style="font-size:11.5px">' + h(m.last_error) + "</div>" : "") + "</td>"
      + "<td>" + (m.auto ? "automatic" : h(m.created_by_name || "")) + "</td>"
      + "<td>" + (m.status === "waiting_pdf" || m.status === "queued" ? '<button class="xbtn" data-mcancel="' + h(m.outbox_id) + '" title="Stop this email">Cancel</button>' : "") + "</td></tr>").join("") + "</tbody></table>";
    if (sk.length) out += sk.map((k) => '<div class="dim" style="font-size:12px;margin-top:6px">' + h(SKIP_LBL[k.reason] || k.reason) + (k.detail ? " — " + h(k.detail) : "") + " · " + h(ts(k.created_at)) + "</div>").join("");
    box.innerHTML = out || '<div class="msg">No emails yet.</div>';
    box.querySelectorAll("[data-mcancel]").forEach((b) => { b.onclick = async () => {
      const note = prompt("Why stop this email? (required)"); if (note === null) return;
      if (!note.trim()) { alert("A reason is required."); return; }
      const r = await sb.rpc("doc_mail_cancel", { p_outbox_id: b.dataset.mcancel, p_note: note.trim() });
      if (r.error) { alert(r.error.message); return; }
      mailList(sb, kind, ref, box);
    }; });
  }
  /* 메모 고치기 창(인보이스 · 크레딧 메모 — 판정 526) — onSave(text) 가 오류 글을 돌려주면 창에 그대로 */
  function noteDialog(title, current, onSave) {
    const ov = overlay("<h4>" + h(title) + '</h4><div class="bd"><label>Note on the document (customers see it) <textarea rows="5" maxlength="2000" data-f="n"></textarea></label><div class="nt">Up to 2,000 characters. Leave it empty to remove the note.</div><div data-x="msg"></div></div>'
      + '<div class="ft"><button class="pobtn" data-x="close">Cancel</button><button class="pobtn go" data-x="save">Save note</button></div>');
    ov.querySelector('[data-f="n"]').value = current || "";
    ov.querySelector('[data-x="close"]').onclick = () => ov.remove();
    ov.querySelector('[data-x="save"]').onclick = async () => {
      const m = ov.querySelector('[data-x="msg"]'); m.className = "nt"; m.textContent = "Saving…";
      const err = await onSave(ov.querySelector('[data-f="n"]').value);
      if (err) { m.className = "er"; m.textContent = err; return; }
      ov.remove();
    };
  }

  window.imsDoc = { loadRenderer, render, frame, data, shipReadySample, printDoc, printBtn, printHtml, mailDialog, mailList, noteDialog, KINDS, KIND_LBL };
})();
