/* ims-doc.js — 문서 판 그리기 · 인쇄 · 메일 (doc v3 · 2026-10-19 · 대화 Claude · mailDialog · mailList · noteDialog — doc-3a 2485e04 의 doc_mail_send · list · cancel ← doc v2 인쇄 printDoc · printBtn ← doc v1a Mustache 를 파일 안에 ← doc v1 cdnjs)
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
  function css() {
    if (document.getElementById("imsDocCss")) return;
    const st = document.createElement("style"); st.id = "imsDocCss";
    st.textContent = ".idm{position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:flex-start;justify-content:center;z-index:9999;padding:48px 12px;overflow:auto}"
      + ".idm .bx{background:#fff;border-radius:14px;max-width:640px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.25)}"
      + ".idm h4{margin:0;padding:14px 18px;border-bottom:1px solid #e3e7ee;font-size:15px}"
      + ".idm .bd{padding:14px 18px;display:flex;flex-direction:column;gap:10px;font-size:13px}"
      + ".idm label{display:flex;flex-direction:column;gap:3px;font-weight:600;font-size:12.5px}"
      + ".idm input,.idm textarea{font:inherit;font-weight:400;border:1px solid #d5dae2;border-radius:9px;padding:7px 9px}"
      + ".idm .ft{display:flex;gap:8px;justify-content:flex-end;padding:12px 18px;border-top:1px solid #e3e7ee}"
      + ".idm .nt{font-size:12px;color:#5b6472}.idm .wn{background:#fff7e6;border:1px solid #f5d38a;border-radius:9px;padding:8px 10px;font-size:12.5px}"
      + ".idm .er{color:#b42318}.idm .ok{color:#067647}"
      + ".idml table{width:100%;border-collapse:collapse;font-size:12.5px}.idml th,.idml td{text-align:left;padding:6px 8px;border-top:1px solid #e3e7ee;vertical-align:top}"
      + ".idml .st{display:inline-block;border-radius:999px;padding:1px 8px;font-size:11.5px;border:1px solid #d5dae2}"
      + ".idml .st.sent{background:#ecfdf3;border-color:#abefc6}.idml .st.failed,.idml .st.unknown{background:#fef3f2;border-color:#fecdca}.idml .st.cancelled{color:#8a94a6}";
    document.head.appendChild(st);
  }
  function overlay(inner) {
    css();
    const ov = document.createElement("div"); ov.className = "idm"; ov.innerHTML = '<div class="bx">' + inner + "</div>";
    document.body.appendChild(ov);
    return ov;
  }
  const MAIL_KINDS = ["final_invoice", "credit_note", "sales_order", "ship_ready"];
  async function mailDialog(sb, kind, ref, opts) {
    const o = opts || {};
    if (MAIL_KINDS.indexOf(kind) < 0) { alert("This document is not emailed to customers."); return null; }
    const ov = overlay('<h4>Email the ' + h(KIND_LBL[kind].toLowerCase()) + '</h4><div class="bd"><div class="nt">Preparing…</div></div>'
      + '<div class="ft"><button class="pobtn" data-x="close">Cancel</button><button class="pobtn go" data-x="send" disabled>Send</button></div>');
    const bd = ov.querySelector(".bd"), send = ov.querySelector('[data-x="send"]');
    let done = null;
    const close = () => { ov.remove(); };
    ov.querySelector('[data-x="close"]').onclick = close;
    const pv = await sb.rpc("doc_mail_send", { p_kind: kind, p_ref: ref, p_commit: false });
    if (pv.error) { bd.innerHTML = '<div class="er">' + h(pv.error.message) + "</div>"; return null; }
    const p = pv.data || {};
    bd.innerHTML = '<div class="nt">From <b>' + h(p.from_name || "") + "</b> &lt;" + h(p.from || "") + "&gt;" + (p.reply_to ? " · replies go to " + h(p.reply_to) : "") + "</div>"
      + (p.redirect_to ? '<div class="wn">Test mode — this email goes to <b>' + h(p.redirect_to) + "</b>, not to the customer.</div>" : "")
      + '<label>To <input type="search" autocomplete="off" data-f="to"></label>'
      + '<label>Subject <input type="search" autocomplete="off" data-f="subject"></label>'
      + '<label>Message <textarea rows="7" data-f="body"></textarea></label>'
      + '<div class="nt">The PDF of this ' + h(KIND_LBL[kind].toLowerCase()) + " is attached, made with the layout in use. The email goes out within a minute or two.</div>"
      + '<div data-x="msg"></div>';
    bd.querySelector('[data-f="to"]').value = p.to || "";
    bd.querySelector('[data-f="subject"]').value = p.subject || "";
    bd.querySelector('[data-f="body"]').value = p.body || "";
    send.disabled = false;
    const msg = (cls, t) => { const m = bd.querySelector('[data-x="msg"]'); m.className = cls; m.textContent = t; };
    send.onclick = async () => {
      const to = bd.querySelector('[data-f="to"]').value.trim(), subject = bd.querySelector('[data-f="subject"]').value.trim(), body = bd.querySelector('[data-f="body"]').value;
      if (!to) { msg("er", "Type the address to send to."); return; }
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
      const { data, error } = await sb.rpc("doc_mail_send", args);
      if (error) { msg("er", error.message); send.disabled = false; return; }
      done = data;
      msg("ok", "Queued — it goes out within a minute or two.");
      send.textContent = "Sent"; ov.querySelector('[data-x="close"]').textContent = "Close";
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
