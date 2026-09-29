# IMS 화면 점검 목록

`ims.asung.ca` 의 화면이 제대로 도는지 눈으로 확인하는 목록.
⚠️ **화면을 고친 뒤에는 이 목록을 처음부터 한 번 훑는다.** 특히 공통 파일(`ims-ui.css` ·
`ims-ui.js` · `ims-auth.js`)을 건드렸으면 **전 화면**을 본다 — 한 곳을 고치면 열여덟이(2026-09-25 밤 기준 · §0-a) 움직인다.

⚠️ **화면을 새로 만들면 이 문서에 항목을 더한다.** 안 더하면 낡은 목록이 되고,
낡은 목록은 「통과했다」는 거짓 안심만 준다.

📌 숫자는 2026-09-15 실측(화면·SQL · Caleb)이다. 적재가 다시 돌면 달라진다 —
그때는 숫자를 고치고 **언제 왜 달라졌는지**를 한 줄 남긴다.

---

## 0. 공통 — 모든 화면

```
[ ] 로그인하지 않은 상태로 열면 로그인 화면이 뜬다
[ ] 로그인하면 오른쪽 위에 이름·역할이 뜬다 (예: Caleb · admin)
[ ] ☰ Menu 를 누르면 열아홉이 보인다 (2026-09-17 Charges · Payments · 2026-09-18 Receiving · 2026-09-25 Sales Orders · Sales Invoices · Customer Payments · Credit Notes · Backorders · POS · Manager List 추가 · 이름 둘 바뀜)  → ✅ [2026-09-26] wms_manage 열쇠가 있는 사람(admin · supervisor · 켜 준 manager)에게는 Split & Waves 가 Manager List 뒤에 더 보여 **스물**(⑤-4a · 7-m) · worker 는 그대로 열아홉 이하  → ✅ [2026-09-26 밤] Picking(wms-picker.html · 7-n)이 Manager List 뒤 · Split & Waves 앞에 더 보인다 — picking 열쇠는 worker 기본이라 **worker 도 WMS 모드에 Picking 하나** · admin 은 스물하나(⑤-4b)  → ✅ [2026-09-26 밤] Packing(wms-packer.html · 7-o)이 Picking 뒤에 더 — worker 는 Picking · Packing 둘 · admin 은 스물둘(⑤-4c)  → ✅ [2026-09-27] Fulfillment(wms-fulfillment.html · 7-p)가 Packing 뒤 · Split & Waves 앞에 더 — fulfillment 열쇠는 worker 기본이라 worker 는 Picking · Packing · Fulfillment 셋 · admin 은 스물셋(⑤-5a)  → ✅ [2026-09-27] WMS Admin(wms-admin.html · 7-q)이 Split & Waves 뒤에 더 — wms_manage 열쇠(manager 는 켜 준 사람만) · worker 는 그대로 셋 · admin 은 스물넷(⑤-5b)  → ✅ [2026-09-27 밤] Receiving(wms-receiver.html · 7-r)이 Fulfillment 뒤 · Split & Waves 앞에 더 — wms_receiving 열쇠(WMS 방 · min_role 없음 — ⑤-6a2 판정 39 부터 worker 도 **사람마다 켠다**(staff.html) · Caleb 이 worker 7 에게 넷을 켰다) · worker 는 넷 · admin 은 스물다섯(⑤-6a)  → ✅ [2026-09-27] 판정 40 — 오피스 입고 메뉴 이름 「Receiving」 → **「Purchase Receipts」**(receiving.html · 화면 값 · 파일 이름 무변) · 창고 화면이 「Receiving」
    Settings · Suppliers · Products · Families · Supplier Products ·
    Purchase Orders · Purchase Invoices · Charges · Supplier Payments · Receiving · Sales Orders · Sales Invoices · Customer Payments · Credit Notes · Backorders · POS · Manager List · Staff · Home
    ⭐ [2026-09-25 밤] POS · Manager List 는 ☰ Menu 에만 있다 — 탭 줄에는 안 선다(items 다섯째 false · 묶음 null) · 판매 탭은 그대로 다섯
    ⭐ Manager List 는 manager 이상이 쓰는 화면이지만 **읽기는 sales 열쇠로 열린다**(메뉴에 sales 화면 값) — worker 도 열 수는 있고 확인 단추만 안 보인다(진짜 문은 DB)
    ⭐ [2026-09-25] 순서 = 마스터들 · 구매 묶음 · 판매 묶음 · Staff · Home · 이름은 보이는 글자만 바꿨다(파일은 invoices.html · payments.html 그대로)
[ ] 머리 아래 탭 줄 = [모드] | [묶음] | [지금 화면 묶음의 탭들] (2026-09-25 묶음 칸 신설 · ims-auth.js items 여섯째 칸)
    구매 화면에서 다섯 — Purchase Orders · Purchase Invoices · Charges · Supplier Payments · Receiving · 판매 화면에서 다섯 — Sales Orders · Sales Invoices · Customer Payments · Credit Notes · Backorders(2026-09-25 밤)
    ⭐ 탭은 자주 오가는 화면만이다(Caleb). 마스터·Staff·Home 은 ☰ Menu 에만 있다
    ⚠️ 탭·메뉴는 **권한으로 갈린다** — receiving 권한이 없으면 Receiving 이 아예 안 보이고, sales 권한이 없으면 Sales Orders 가 안 보인다(빈 탭이 아니다)
[ ] 묶음 칸(PURCHASING · SALES · 모드 칸과 같은 모양)은 **구매·판매 둘 다 보는 사람에게만**, 그리고 지금 화면이 묶음 안일 때만 뜬다
    · 구매·판매 둘 다: po.html 에서 「PURCHASING(눌림) · SALES | 구매 탭 다섯」 · so.html 에서 「PURCHASING · SALES(눌림) | Sales Orders(눌림) · Sales Invoices · Customer Payments · Credit Notes · Backorders」
    · 구매만 · 판매만: 묶음 칸 없이 탭만(지금까지와 같다) · Settings 등 묶음 밖 화면: 묶음 칸 없음
    · SALES 를 누르면 판매 묶음의 첫 보이는 **탭** 화면(so.html)으로 간다 · 모드 칸(IMS·WMS)은 WMS 화면이 서기 전까지 여전히 안 보인다  → ✅ [2026-09-26] Split & Waves(7-m)로 WMS 화면이 섰다 — wms 모드 + wms_manage 가 있는 사람에게 모드 칸 「IMS · WMS」가 뜬다 · WMS 를 누르면 wms-manager.html
[ ] 지금 보고 있는 화면은 메뉴에서 눌리지 않는다(현재 표시)
[ ] Sign Out 이 되고, 다시 열면 로그인 화면이다
[ ] 화면 글자가 전부 영문이다
[ ] ☰ Menu 가 이름·역할 바로 옆에 있다 (다른 버튼보다 앞)
```

⚠️ 콘솔(F12)에 빨간 오류가 없어야 한다. 화면이 떠도 오류가 나면 일부만 도는 것일 수 있다.

### 0-a. 공통 파일(`ims-ui.css` · `ims-ui.js` · `ims-auth.js`)을 고쳤을 때

한 곳을 고치면 **열여덟**이 움직인다(⚠️ `index.html` 은 공통을 안 부른다 — 셋만 부른다).
📌 [정정 2026-09-16 저녁] 「여섯」은 2026-09-15 의 수다 — po.html(09-16 오전)로 일곱 · invoices.html(09-16 저녁)로 여덟이 됐는데 이 줄을 안 고쳤다.
📌 [정정 2026-09-18] 여덟도 낡았다 — charges·payments(09-17 오후)로 열 · receiving(09-18)으로 열하나다.
   ⚠️ 이 수가 두 번 연속 낡았다. 화면을 더하면서 **같은 커밋에** 이 줄을 고친다.
📌 [정정 2026-09-25] so.html(09-25 · 대화 Claude)로 열둘 · so-invoices.html(09-25 저녁)로 열셋 · so-payments.html(09-25 밤)로 열넷 · so-credits.html(09-25 밤)로 열다섯이다 — 넷 다 같은 커밋에 고쳤다.
📌 [정정 2026-09-25 밤] so-backorders.html(09-25 밤 · 대화 Claude)로 열여섯 · pos.html(09-25 밤 · 대화 Claude)로 열일곱 · manager-list.html(09-25 밤 · 대화 Claude)로 **열여덟**이다 — 각각 같은 커밋에 고쳤다.
📌 [정정 2026-09-26] wms-manager.html(09-26 · Claude Code ⑤-4a · 운영 manager.html 의 복사본)로 **열아홉**이다 — 같은 커밋에 고쳤다. ⚠️ WMS 화면은 공통 셋에 더해 wms-picklist.js(픽리스트 인쇄 · 운영에서 복사)도 부른다 — 그 파일을 고치면 wms-*.html 만 움직인다.
📌 [정정 2026-09-26 밤] wms-picker.html(09-26 밤 · Claude Code ⑤-4b · 운영 picker.html 의 복사본)로 **스물**이다 — 같은 커밋에 고쳤다. picker 는 wms-confirm-modal.js(부족 완료 마찰 모달)도 부른다.
📌 [정정 2026-09-26 밤] wms-packer.html(09-26 밤 · Claude Code ⑤-4c · 운영 packer.html 의 복사본)로 **스물하나**다 — 같은 커밋에 고쳤다. packer 도 wms-picklist.js · wms-confirm-modal.js 를 부른다.
📌 [정정 2026-09-27] wms-fulfillment.html(09-27 · Claude Code ⑤-5a · 운영 fulfillment.html 의 복사본)로 **스물둘**이다 — 같은 커밋에 고쳤다. fulfillment 는 wms-packing.js(팔렛 · 박스 라벨 · 오더 소계 줄 · 운영에서 바이트 그대로 복사 · DB 접점 0)를 부른다 — 그 파일을 고치면 wms-fulfillment.html 만 움직인다(picker · packer 는 안 쓴다).
📌 [정정 2026-09-27] wms-admin.html(09-27 · Claude Code ⑤-5b · 운영 admin.html 의 복사본 · Status · Rollback · Finalized 세 탭)로 **스물셋**이다 — 같은 커밋에 고쳤다. admin 도 wms-packing.js(팩킹리스트 재출력의 라벨 · 소계 줄)를 부른다 — wms-packing.js 를 고치면 wms-fulfillment · wms-admin 둘이 움직인다.
📌 [정정 2026-09-27 밤] wms-receiver.html(09-27 밤 · Claude Code ⑤-6a · 운영 receiver.html 의 복사본 · 마이그레이션 없음)로 **스물넷**이다 — 같은 커밋에 고쳤다. receiver 는 공통 셋만 부른다(wms-*.js 없음 · 인쇄는 JsBarcode CDN).
📌 [2026-09-27 · a03af89] 판정 40 — 두 Receiving 이름: 오피스 receiving.html 의 메뉴 · 탭 이름 = 「Purchase Receipts」 · 창고 wms-receiver.html = 「Receiving」 · 화면 값(receiving · wms_receiving) · 파일 이름 무변 ⇒ 0 절 ☰ Menu 줄의 「Receiving」 은 구매 묶음에서 「Purchase Receipts」 로 읽는다
📌 [2026-09-27 밤 · ⑤-6c2] 판정 43 — off-PO 흐름 = 창고 직원 한 번(스캔 → **바로 놓는다** · 운영의 「승인 전 풋어웨이 차단」 없앰) · 매니저 한 번(받는다 · 무상 = 원가 0 / 받는다 · 청구 = 단가 / 거절 = 장부 없음 · 「어느 칸에서 빼라」) · 정하기 전엔 「선반에는 있고 장부에는 없다」(Health 150 이 알린다)
📌 [2026-09-27 밤 · ⑤-6c2] 판정 44 — 정하는 화면 = 오피스 Purchase Receipts(receiving.html · 대화 Claude · 6c3) 하나 · WMS Admin Receiving 탭은 「정해야 할 off-PO」 목록(보이기만) · 줄 = 딥링크 `receiving.html?receipt=<po_receipt.id>&diff=<po_receipt_diff.id>`(같은 창) · 정하는 단추는 Purchase Receipts 에만
📌 [2026-09-27 밤 · ⑤-6c2] 판정 45 A — 정할 사람의 권한 = 그 manager 에게 staff.html 에서 RECEIVING 을 write 로(사람마다 · 오피스 입고 전체를 준다) · 지금 켤 필요 없다(시험은 admin) · 켜는 때 = 비밀번호를 나눠 주기 전(컷오버 준비 목록)
📌 [2026-09-28 · 오피스 판 b693d8c] 판정 46 — 「Finalized — 견적 · 결제 · 마무리 대기」 목록 = so.html 목록 필터 「Finalized — waiting for the office」(값 packed · 넓은 · 좁은 목록 둘 다) · Manager List 탭은 없다 · 같은 모집단의 창고용은 wms-admin Finalized 탭 · 판정 17 글자 표는 so.html 안에 하나(SO_STATUS_LABEL) — 공통 셋(ims-ui.js)은 무접촉(공통화는 뒤의 정리 차수 · 그때 이 절 재점검)
```
📌 [2026-09-28 · adj-b 0c96926] 메뉴 항목 **스물다섯 → 스물여섯** — Stock Adjustments(stock-adjustments.html · 열쇠 stock_adjust · ims · Manager List 뒤 · 메뉴에만 · 탭 아님 · 열쇠 없는 supervisor 도 메뉴는 보이고 읽기만) · 화면을 여는 공통 셋 사용 화면은 스물다섯(stock-adjustments.html 더함)
📌 [2026-09-28 · 칸 옮기기 7fca511 · c9b2ed0] 메뉴 항목 **스물여섯 → 스물여덟** — Bin Moves(wms-mover.html · 열쇠 stock_move · wms · Receiving 뒤 · Split & Waves 앞 · 탭) · Bin Moves (office)(stock-moves.html · 같은 열쇠 · ims · Stock Adjustments 뒤 · 메뉴에만 · 탭 아님 · 메뉴 필터는 screens 만 본다 — ims-auth.js:344) · 화면을 여는 공통 셋 사용 화면은 스물일곱(wms-mover.html · stock-moves.html 더함)
📌 [2026-09-29 · ⑥-1 tf-scr-1] 메뉴 항목 **스물여덟 → 스물아홉** — Transfers(transfers.html · 열쇠 transfer · ims · Bin Moves (office) 뒤 · 메뉴에만 · 탭 아님 · 자리는 임시 — 판정 82 메뉴 정리 때 다시) · 화면을 여는 공통 셋 사용 화면은 스물여덟(transfers.html 더함) · ⚠️ 아래 「스물네 화면」 목록 줄은 낡았다(「스물네」 세 줄 65 · 69 · 70 + 스물넷 이름 목록 줄 66 = 네 곳) — 판정 82 메뉴 정리 때 한 번에 고친다
[ ] 스물네 화면을 각각 열어 0절이 전부 통과한다 (특히 「글자만 나온다」 = CSS 링크 · 「아예 안 뜬다」 = ims-ui.js 순서)
    settings · suppliers · products · families · supplier-products · po · invoices · charges · payments · receiving · so · so-invoices · so-payments · so-credits · so-backorders · pos · manager-list · wms-manager · wms-picker · wms-packer · wms-fulfillment · wms-receiver · wms-admin · staff
[ ] 그 다음 2~7-e 절을 처음부터 훑는다 — 숫자까지
[ ] 함수를 더하기만 했으면 그 함수를 쓰는 화면만 본다 (예: imsTs → staff.html)
[ ] 공통에 새 이름(.클래스 · 함수)을 더했으면 스물네 html 에서 같은 이름을 grep 한다 — .note 가 겹쳤던 실사고(2026-09-15) · wms-manager.html · wms-picker.html · wms-packer.html · wms-fulfillment.html · wms-receiver.html · wms-admin.html 은 제 <style> 에 .tag · .panel · .hint · .list 같은 이름을 따로 갖는다(원본 그대로 · 나중에 선언돼 이긴다)
[ ] 메뉴 항목(ims-auth.js items)을 더했으면 스물네 화면 전부에서 ☰ Menu 의 수·순서와 탭 줄을 본다
    ⚠️ 항목의 다섯째 값이 탭 노출이다 — true 면 탭에도, false 면 ☰ Menu 에만 선다
    ⚠️ 여섯째 값이 묶음이다('purchasing' · 'sales' · null) — 탭은 같은 묶음끼리만 한 줄에 선다 · null 이면 탭 줄에 묶음 칸이 안 뜬다(2026-09-25)
[ ] ⭐ PostgREST 로 바로 쓰는 자리를 건드렸으면 `imsSaved()` 의 계약을 본다 —
    둘째 인자 seenAt 을 주면 낡은 값 저장을 막고, **안 주면 예전과 똑같이 돈다**(2026-09-18).
    ⚠️ 지금 이 인자를 넘기는 화면은 **하나도 없다**(한 번 붙였다가 되돌렸다 · 정본 §13-f)
[ ] ⭐⭐ 검사 다섯째(2026-09-26 · ⑤-4a · 절대 조건) — 운영 WMS 에서 복사해 온 화면(wms-*.html · wms-*.js)이나 ims-auth.js 를 고쳤으면
    `grep -c 'wms-config\|wms-auth\|WMS_CONFIG\|gftpcnkxbdjzzfvzwcfl' wms-manager.html wms-picker.html wms-packer.html wms-fulfillment.html wms-receiver.html wms-admin.html wms-picklist.js wms-confirm-modal.js wms-packing.js ims-auth.js` 가 **코드 줄에서 0** 이다
    — 운영 프로젝트(asung-WMS)로 가는 길(설정 · 로그인 · 주소)이 이 레포에 없다 · asung-ims 에 wms-config.js 를 두지 않는다 · 화면의 Network 탭에 운영 주소 요청 0.
    ⚠️ ims-auth.js 머리 주석의 출처 메모 두 줄(3행 「원본: asung-wms 의 wms-auth.js」 · 8행 「WMS_CONFIG → IMS_CONFIG」)은 낱말만 있고 길이 아니다 — 2026-09-26 실측 grep -c 2 는 그 둘이다(코드 줄 0).
[ ] ⭐ 검사 여섯째(2026-09-27 · ⑤-5c1 부터 · ⑤-5c3 에서 도구를 바꿈) — 화면 파일을 옮기거나 구간을 잘라 넣었으면 **정의 없이 불리는 이름**이 0 인지 **범위를 보는** 도구로 본다: 모든 <script> 를 이어 eslint `no-undef`(레포 밖 임시 폴더 · npm i eslint · env browser · ecmaVersion 2022 · sourceType script · 공통 전역 globals = imsAuth · imsHeader · esc · wmsPacking · wmsPickList · wmsConfirmModal · IMS_CONFIG · supabase · jspdf) 로 돌려 0 ·
    📌 [2026-09-28] 도구 = **eslint 8**(레포 밖 임시 폴더에서 `npm i eslint@8` · `--no-eslintrc -c <json>` · env browser + es2022) — 시스템 eslint 6.4 는 es2022 를 모른다(「Environment key "es2022" is unknown」)
    + 휴리스틱 하나: 원본에 없는 줄 가운데 「`//` 뒤에 코드가 이어지는 줄」(`//…; const|let|v.|if(|return|x =`)이 0 — 줄 가운데 주석이 뒤 문장을 삼키는 사고를 잡는다.
    ⚠️ 검사 넷(단추↔처리 · id · node --check · CSS)은 이것을 못 잡는다 — [실사고 둘 · 2026-09-27] ① wa v1 의 Finalized 탭이 renderFulfillStats(Stats 구간과 함께 빠짐)로 Loading 에서 멈췄다 ② wa v1.3 의 Stats 가 조립 주석이 **줄 가운데** 들어가 `v.pick++; const m=dur(p)` 를 삼켜 ReferenceError 로 비었다(wa v1.4 에서 고침) —
       ②는 「파일 어딘가에 선언돼 있으면 통과」 하는 acorn 식 검사(⑤-5c1 · 5c2)가 못 잡았다(`m` 이 다른 함수에 선언돼 있었다) ⇒ 범위를 보는 no-undef 로 · 도구 · 명령 · 출력 원문만 보고에(스크립트는 레포에 넣지 않는다).
```
📌 정본 규칙: `asung-wms/docs/design/po-module.md` §10-j 3-g.

---

## 1. `index.html` — 배선 확인

```
[ ] Signed in as 에 name · email · role · perms · is_active · auth_user_id 가 나온다
[ ] Database connection 의 다섯 줄이 초록 숫자다
    supplier 257 · product 18,714 · product_supplier 12,728 · ref_brand 415 · ims_staff 2
```
⚠️ 어느 줄이라도 빨간 오류면 그 표의 RLS 나 이름이 어긋난 것이다.

---

## 2. `settings.html` — ref_ 여덟

```
[ ] 왼쪽에 여덟이 뜬다 (Brand · Category · Unit · Currency · Payment Term · Account · Warehouse · Bin)
[ ] 표를 누르면 오른쪽 제목이 ref_ 없이 뜬다 (「Bin」 · 「ref_bin」 아님)
[ ] 왼쪽 숫자가 맞는다
    Brand 415 · Category 19 · Unit 44 · Currency 2
    Payment Term 34 · Account 289 · Warehouse 3 · Bin 2,675
[ ] ⭐ Bin 에서 1–100 / 2,675 가 뜨고 → 로 넘어간다   ← 1,000행 캡 점검
[ ] Bin 의 Warehouse 열에 창고 이름이 나온다 (조인)
[ ] Brand 에서 아무 브랜드나 검색하면 나온다 (첫 100행 밖의 것도)
[ ] Active only 를 켜면 숫자가 줄거나 같다
[ ] ⚠️ Staging 열의 ✗ 가 회색 가운뎃점이다 (빨강 아님) — is_active 만 색을 쓴다
```

---

## 3. `suppliers.html` — 공급처 (⭐ 쓰기 — is_purchasable)

왼쪽 필터는 체크박스 둘(Active only · Hide discontinued)과 Purchasable 드롭다운 하나(All · Yes · No · Not set)다.
⚠️ 숫자는 **Active only 상태**에 따라 다르다 — 항목마다 그 상태를 적었다. [SQL 실측 2026-09-15 · Caleb]

```
[ ] admin 으로 열면 왼쪽에 체크박스 둘과 Purchasable 드롭다운(All · Yes · No · Not set)이 보인다
[ ] 기본 상태(Active only 켜짐 · All)에서 1–100 / 226
[ ] Active only 를 풀면(All) / 257 · 목록의 inactive 태그와 상세의 inactive 칩이 빨강
[ ] Active only 켜진 채로 Yes → 1–100 / 161 · No → 1–56 / 56
    ⚠️ [정정 2026-09-15 오후 · SQL 실측] 처음엔 「Purchasable 217」로 적었다 — 「226 − 판정없음 31」로
    어림한 값을 실측처럼 적은 것. 판정 없음은 활성 9 · 전체 40 이고 is_purchasable=false 인 곳도 56 있다
[ ] Active only 켜진 채로 Not set → 작업 시작 시점 9 (2026-09-15 · ⭐ 판정할수록 줄어든다 — 0 이 목표)
[ ] Active only 를 끄고 Not set → 40 (그중 31곳은 비활성 — ⭐ 판정 대상이 아니다 · Caleb 2026-09-15.
    Cin7 에서 비활성이면 「지금 여기서 안 산다」가 이미 말해져 있다. 다시 활성이 되면 활성 목록에 저절로 뜬다)
[ ] Active only 켜진 채로 Yes + Hide discontinued ⭐ / 138   ← 실제 매입처
[ ] 목록에서 미판정 행은 not set 태그가 회색 (빨강 아님 — 잘못된 상태가 아니라 아직 안 본 상태다)
[ ] discontinued 태그가 황갈색 (inactive 의 빨강과 다르다)
[ ] 한 곳을 누르면 오른쪽에 상세가 뜬다
[ ] 상세 칩 아래에 Purchasable 고르는 자리가 있다 (Not set · Yes · No) — 지금 값이 골라져 있다
[ ] ⭐ 고르면 바로 저장되고 옆에 Saved 가 초록으로 뜬다 · 저장 중에는 드롭다운이 잠긴다
[ ] 저장하면 위쪽 칩이 바뀌고, 오른쪽 상세는 그대로 열려 있다
    · Not set 으로 걸러 놓고 Yes 로 바꾸면 그 행이 목록에서 빠지고 왼쪽 숫자가 하나 준다 (9 → 8)
    · All 로 보고 있으면 행이 남고 숫자는 그대로다
[ ] ⭐ 잘못 눌렀으면 상세의 드롭다운에서 Not set 을 다시 고른다 — 목록에 돌아오고 숫자가 돌아온다 (8 → 9)
    (상세를 비우지 않는 이유가 이것이다 · §10-j 3-d)
[ ] 상세 맨 아래 Updated 가 토론토 시각이다 — ⚠️ UTC 로 보이면 틀린 것. 시간 수를 세지 말고 지금 시계와 맞는지 본다
[ ] 저장한 뒤 Updated 가 방금 시각으로 바뀐다 (supplier_set_updated_at 트리거 · SQL 로 확인)
[ ] 저장이 막히면 Not saved 가 빨갛게 뜨고 드롭다운이 이전 값으로 돌아간다
    ⚠️ 지금은 재현할 수 없다 — authenticated 에 UPDATE 가 살아 있어 막히지 않는다(SQL 실측). 코드로 확인(2026-09-15).
       RLS 를 걸면 그때 눈으로 본다
[ ] Cygnus Beauty Supply 를 열면 Products linked 236 · of which default 122
[ ] 연락처가 둘 이상인 곳이 있다 (예: Ashton Adams LTD 2)
[ ] Discounts 는 전부 None. (supplier_discount 0행 — 채우면 달라진다)
[ ] 검색어나 필터·드롭다운을 바꾸면 오른쪽이 비워진다 · ← → 로 페이지를 넘기면 그대로다 · 저장 뒤에도 그대로다 (§10-j 3-d)
```

⚠️ **매니저로 로그인하면** 왼쪽에 체크박스·드롭다운이 아예 안 보이고 138곳(활성 · 구매 가능 · 미단종)만 나온다.
상세에는 Purchasable 고르는 자리가 없다 — 칩까지만 보인다.
（admin 계정만 있으면 건너뛴다 — 매니저를 추가한 뒤 확인한다）

📌 브라우저 확인 2026-09-15 · Caleb — 드롭다운 넷 · Not set 9 · Yes 로 8 · 상세 유지 · Updated 가 시계와 맞음 · Not set 으로 되돌려 9. 다섯 통과.

---

## 4. `products.html` — 제품

```
[ ] 기본 상태(Active only + Singles)에서 ⭐ 1–100 / 8,771   ← 활성 낱개
[ ] Kind 를 Sets only 로 바꾸면 세트만 · 캐럿이 사라진다
[ ] Kind 를 All 로 바꾸면 수가 는다
[ ] ⭐ 세트가 딸린 낱개에 ▸ 와 「N sets」가 붙고, 누르면 아래로 펼쳐진다
[ ] Brand 를 입력하면 그 브랜드만 · Category 드롭다운도 걸린다
[ ] AS92082 를 검색 → Sets of this product 에 AS92082-6 · 공급처 Meqi Trading 1
[ ] AS92082-6 을 열면 Suppliers 가 「None — sets are bought through the parent.」
    ⭐ admin 이면 제목 옆에 show 1 inactive 체크가 있고, 켜면 흐린 줄이 나온다
[ ] CVT18157 을 열면 combo · 6 components · Components 표에 낱개 여섯
[ ] UNF18259(립오일)를 열면 combo · 4 components 이면서 Suppliers 에 ChangLi 7.92
[ ] 구성품 SKU 를 누르면 그 제품으로 이동한다
[ ] ADA96539 를 열면 Same family 에 형제들이 뜨고 열 제목이 Size 다
[ ] FAMILY 칸이 파란 링크이고 누르면 families.html 로 간다
[ ] ⭐ 검색어나 Kind·Brand·Category 를 바꾸면 오른쪽이 비워진다 · ← → 로 페이지를 넘기면 그대로다 (§10-j 3-d)
    ⚠️ 구성품·형제 SKU 를 눌러 이동할 때는 비워지지 않는다 — 코드가 넣는 검색어다
```

---

## 5. `families.html` — 패밀리

```
[ ] 1–100 / 1,141
[ ] 축 드롭다운에 Color (501) 가 있다   ⭐ Color 463 + color 38 을 화면에서 합친 것
[ ] 축 드롭다운에 Flavor (7) 가 있다    ⭐ Flavor 4 + Flavour 3
[ ] ⚠️ color · Flavour 가 따로 뜨지 않는다
[ ] 축을 고르면 그 축의 패밀리만 나온다
[ ] 한 패밀리를 열면 Members 에 속한 제품이 옵션값과 함께 뜬다
[ ] 「Family is a loose grouping…」 안내가 보인다
[ ] SKU 를 누르면 products.html 로 이동한다
```

---

## 6. `supplier-products.html` — 공급처별 제품

```
[ ] 왼쪽 공급처 목록이 뜬다 (admin 기본은 138곳 — Show all suppliers 로 넓힌다)
[ ] Cygnus Beauty Supply 를 고르면
    Products linked 236 · Default here 122 · No price 0
[ ] 최근 매입일 순으로 정렬돼 있다
[ ] Default only 를 켜면 수가 준다
[ ] ⭐ SKU 를 누르면 products.html 이 열리고 그 제품 상세가 바로 뜬다
    ⚠️ 여기서 「Search for a product.」만 뜨면 ?id= 진입 순서가 깨진 것이다(2026-09-15 실사고)
[ ] No price 가 0 이 아닌 공급처가 있다 (전체 1,227줄이 어딘가에 몰려 있다)
```

---

## 7. `staff.html` — 직원 (쓰기)

```
[ ] 2 / 2 · 1 active
[ ] Test Staff 가 흐리게 + inactive 칩
[ ] 자기 행에 you 칩이 붙고 ROLE·ACTIVE 가 잠겨 있다
    「You can't change your own role or status…」 안내가 보인다
[ ] EMAIL 과 AUTH USER ID 는 보이기만 하고 못 고친다
[ ] ⭐ 다른 사람의 NOTE 를 고치고 Save → 저장된다 (UPDATED 가 바뀐다)
[ ] ⚠️ 저장이 막히면 「Not saved」가 뜬다 (조용히 지나가지 않는다)
[ ] + Add staff 로 이름·이메일·역할을 넣으면 계정이 만들어지고
    ⭐ 임시 비밀번호가 한 번 뜬다 (복사 버튼)
[ ] 만든 사람이 Supabase → Authentication → Users 에도 생긴다
[ ] 삭제 버튼이 없다 (직원은 지우지 않고 is_active 로 내린다)
```

⚠️ **매니저로 로그인하면** 편집·추가 UI 가 아예 안 보인다(읽기 전용).

---

## 7-a. `po.html` — 발주 (⑤ 넓은 목록 · 국면 · 할인 편집 · 인보이스 만들기 · 2026-09-16 저녁 다시 씀)

뒷단: 뷰 `po_list`(목록 · 국면 다섯 · doc_numbers) · RPC `po_detail`(상세 · 캐럿) · 쓰기 RPC `po_create` · `po_lines_paste` · `po_line_update/delete` · `po_discount_save/delete` · `po_invoice_create`
— asung-wms `20260916190000`(목록·상세·po_create) · `20260916181719`(라인 쓰기) · `20260916200000`(할인 줄 · 인보이스 만들기). ⭐ 계산(할인 체인 · 미지급 · 국면)은 뷰·RPC 값을 그리기만 한다.
📌 [2026-09-16 저녁] 이 절은 읽기 화면(36c1fc2) 기준으로 적힌 것을 넓은 목록 차수(54fefb0)와 할인·인보이스 차수(a867578)에 맞춰 **다시 썼다.** 앞 판의 좁은 목록 항목(「1–2 / 2」 등)은 이제 맞지 않는다.
⚠️ 아래 숫자는 **검증 데이터**다 — po 8행(PO-02001a·b · PO-02002~02007 · 2026-09-16 저녁 · Caleb 이 SQL·화면으로 넣었다). 발주를 만들면 늘고 컷오버 때 지운다.
   실측으로 아는 것: PO-02001a closed · PO-02001b confirmed · PO-02005 cancelled(라인 13) · PO-02007 confirmed(Strength of Nature · 라인 13 · 소계 586.92 · USD · Net 30).
   ⬜ PO-02002·02003·02004·02006 의 상태는 적지 않았다 — 처음 훑을 때 세어 넣고 날짜를 붙인다.

```
두 모드
[ ] 열면 **넓은 목록**이 화면 전체다 — 왼쪽 좁은 목록·오른쪽 상세는 없다 (Caleb: 「들어갔다 나왔다 하는 게 Cin7 은 많이 불편하다」)
[ ] 행을 누르면 왼쪽 좁은 목록 + 오른쪽 상세로 바뀌고, 상세 위 「☰ List」로 왼쪽 목록을 접고 펼 수 있다 (접으면 상세가 전체를 쓴다)
[ ] 상세의 「‹ All purchase orders」로 넓은 목록에 돌아온다 · 필터·검색어는 그대로다 (두 모드가 같은 필터를 쓴다)

넓은 목록 — 필터 순서: 공급처 → 날짜 → 상태 → 검색 (Caleb 실측: 「주로 공급처별이 가장 많고 그다음이 날짜」)
[ ] Status 기본 Open(draft+confirmed) · 드롭다운은 Open · Draft · Confirmed · Closed · Cancelled · All
    ⬜ Open / All / Cancelled 의 수를 적어라 (모집단 po 8행 · 2026-09-16 저녁 · Cancelled 는 최소 1 = PO-02005)
[ ] Supplier 드롭다운에 활성 공급처가 뜬다 (226곳 · 2026-09-15 SQL · 캡 아래) · 고르면 그 공급처만
[ ] 날짜 둘(Ordered from–to)을 넣으면 order_date 범위로 걸린다 · Clear 로 전부 초기화
[ ] 검색칸에 778812 를 치면(All) PO-02001a 가 나온다 — ⭐ 인보이스·크레딧·비용 **번호**로도 찾힌다(doc_numbers) · 10039192310530(CBSA)으로 PO-02001a·PO-02002 둘
[ ] 열 순서: Status(점 다섯) · PO · Ordered · Required · Supplier · Lines · Net · Received · Invoiced · Charges · Unpaid
[ ] 표 아래 「Unpaid is per document, not per PO … Do not add this column up.」 안내가 보인다 (문서 기준 · 두 발주에 걸친 문서는 둘 다에 · 세로로 더하면 두 번 센다)

국면 다섯(점 · 회색=아직 · 주황=일부 · 초록=다 됐다) — 마우스를 올리면 「Order — done」처럼 뜻이 뜬다
[ ] PO-02001a: 다섯 다 초록 (주문·청구·입고·비용·결제) · Unpaid 「30.90 credit due」(음수 = 받을 돈 · 결함 아님) · 태그 closed + split + credit
[ ] PO-02001b: 주문만 초록 · 나머지 회색 · Received 0 / 100
[ ] PO-02002: 주문 초록 · 청구 회색인데 결제 초록 · 비용 초록 — ⭐ 문서 기준(CBSA 를 다 냈다)이라 맞는 결과다. Charges 1,949.88
[ ] PO-02005(Cancelled 로 걸러서): 라인 13 인데 주문 점이 **회색이 아니다**(확정 전 취소면 주황 · 확정 뒤면 초록) — 취소는 상태 칩(cancelled)이 보여 주고 국면은 사실로 판정한다(Caleb)
[ ] PO-02007: 주문 초록 · Net 586.92 USD · Lines 13 · Received 0 / 156 · 나머지 회색 (⚠️ 아래 인보이스 만들기 검증을 하면 청구 점이 초록으로 바뀐다)
[ ] 라인 0 인 발주(있다면)는 주문 점이 회색이다 — draft 도 confirmed 도

상세 — 머리
[ ] PO-02001a 를 열면 칩 closed(초록) · 「split into 1」 · 「PO-02001b →」 링크 · 통계 Subtotal 2,446.80 · Discount −436.26 · Net 2,010.54 · Charges 597.49 · Received 920 / 920
[ ] 왼쪽 표에 Required by · Contact · Bill to · Tax rule · Inventory acct 가 있다 — ⚠️ PO-02001a~02007 은 전부 「—」다(칸이 2026-09-16 저녁에 생겼고 옛 문서는 채우지 않았다 · backfill 없음)
[ ] ⭐ 새로 만든 발주(+ New purchase order)에는 Contact·Bill to·Tax rule·Inventory acct(_59_ Inventory Asset)가 채워진다 — 공급처에 연락처·주소가 없으면 「—」 + 만들 때 warnings(contact_unset · address_unset — 오류가 아니다 · 활성 226 중 주소 0건 143곳이라 대다수에서 뜬다)
[ ] Created by · Confirmed by 옆 시각이 토론토다 (⚠️ UTC 로 보이면 틀린 것)

상세 — 라인 · 입고 (앞 판과 같다)
[ ] Lines 3 — Remaining 전부 0(회색) · AMP00405 Received 600 · Receipts 4 — AMP00405 가 A010101 400 + A010102 200
[ ] draft·confirmed 에서 수량·단가를 칸에서 바로 고친다 · 받은 것보다 적게 → DB 가 거부한 문장이 그대로 뜬다 (「… 600 already received …」)
[ ] closed(PO-02001a)·cancelled 에서는 입력칸이 없다

상세 — ⭐ 할인 줄 편집 (2026-09-16 저녁 · po_discount_save/delete · 라인에 할인 칸은 없다)
[ ] PO-02001a(closed): Discounts 2 — Trade 17% · Damage 1% · Source 「added here」(SQL 로 넣은 것 · supplier_discount_id null) · 「× factor 0.8217 = 2,010.54」 · 입력칸 없음
[ ] PO-02001b(confirmed): Discounts 2 에 이름·퍼센트 입력칸과 × 버튼 · 「Add a discount」 버튼이 있다
[ ] PO-02007 에 「Add a discount」 → Name Trade · Percent 5 → 줄이 Seq 1 로 생기고 Net 이 586.92 → 557.57 로 바뀐다 (586.92 × 0.95 = 557.574 → 557.57)
    · 퍼센트를 10 으로 고치면 Net 528.23 · × 로 지우면 586.92 로 돌아온다 (검증 뒤 지운다 — 다른 항목의 숫자가 이 줄을 전제하지 않는다)
[ ] 「17% 와 1% 를 함께 넣으면 17.83% 가 된다 — 18% 가 아니다」 안내가 모달에 보인다 (차례로 곱한다)
[ ] closed 문서에 SQL 로 po_discount_save 를 부르면 「PO PO-02001a is closed — discounts cannot be changed …」 — 화면에는 버튼이 없으므로 SQL 로만 확인

상세 — ⭐ 인보이스 만들기 (2026-09-16 저녁 · po_invoice_create · 만든 뒤는 invoices.html 이 이어받는다)
[ ] 라인이 있는 draft·confirmed·closed 발주에 「Create an invoice」 버튼 · cancelled 와 라인 0 인 발주에는 없다
[ ] PO-02007 에서 누르면 모달 — Kind · Number · Document date(오늘) · Printed total(비워 둘 수 있다) · Check · Create(Check 전에는 잠김)
[ ] Number 없이 Check → 「The document number is needed.」
[ ] Number SON-TEST-1 · total 비움 · Check → 표 13줄 · Ordered 12 · Already billed 0 · To bill 12 · 「13 lines · 13 will be copied · total_amount_missing」
[ ] Create → invoices.html?id=… 로 넘어가 그 문서가 열린다 (7-b 로 이어진다)
[ ] 다시 PO-02007 에서 같은 번호로 Check → warnings 에 invoice_number_exists · Create → 「Invoice SON-TEST-1 already exists for Strength of Nature …」
[ ] 다 청구된 발주(SON-TEST-1 뒤의 PO-02007 · 또는 PO-02001a)에서 Check → 13줄 전부 fully_invoiced · 「0 will be copied」 · Create 잠김
[ ] ⬜ 아직 없다 [2026-09-16 저녁 · 검토 이견 2 · 대화 Claude 가 고친다]: Kind 에 Credit note 옵션이 남아 있고 고르면 Create 가 영원히 잠긴다(크레딧 + PO 는 줄이 비는 조정 크레딧이라 ok 0) · 문구도 「Nothing left to bill」로 틀리다
    ⇒ 고쳐진 뒤: Kind 는 Invoice 하나 · 크레딧은 invoices.html 에서 만든다. 고칠 때까지 이 항목은 「Credit note 를 고르면 만들 수 없다」로 본다

갈라진 문서 · 진입
[ ] 「PO-02001b →」 를 누르면 좁은 목록 검색칸이 PO-02001 · Status All 로 바뀌고 b 가 열린다 · b 에서 「← PO-02001a」 로 돌아온다
[ ] po.html?po=PO-02001b 로 들어오면 b 가 열린다 · po.html?po=PO-99999 는 「PO-99999 not found.」
[ ] 없는 발주(지워진 id)를 열면 「That purchase order is gone.」
[ ] 검색어나 Status 를 바꾸면 오른쪽이 비워진다 · ← → 로 페이지를 넘기면 그대로다 (§10-j 3-d)
```

⚠️ **매니저로 로그인해도** Status 드롭다운과 필터가 보인다 — 발주 목록은 감출 것이 아니다(코드 주석). （매니저 계정이 아직 없다）
⚠️ 콘솔 오류 「Cannot read properties of null (reading 'onchange') at po.html:1180」 — [2026-09-16 저녁 조사] 배포본(a867578)은 1,137행이고 어느 커밋(36c1fc2 → a867578)에도 1,180행이 없다.
   imsAuth.start 콜백 안에서 forEach 로 onchange 를 거는 자리는 코드에 **없다**(콜백 안 forEach 는 wclear 의 `.value = ""` 하나). 커밋되지 않은 다른 사본이나 콘솔에 남은 옛 기록으로 **짐작**한다.
   ⇒ 강력 새로 고침 뒤 다시 나면 그때 `curl -s https://ims.asung.ca/po.html | wc -l` 로 배포본 행수를 대조한다.

---

## 7-b. `invoices.html` — 인보이스 · 크레딧 (2026-09-16 저녁 신설 · 대화 Claude)

뒷단: 뷰 `po_invoice_list`(목록) · RPC `po_invoice_detail`(상세) · 쓰기 RPC `po_invoice_line_add/update/delete` · `po_invoice_add_po_lines` · `po_invoice_confirm` · `po_discount_save/delete`(p_target invoice) — asung-wms `20260916200000`.
⭐ 돈(계산값 · 차이 · 갚을 돈 · 미지급 · 크레딧 잔액)은 `po_invoice_money` 뷰의 값을 그리기만 한다. 화면은 계산하지 않는다.
⚠️ 모집단: po_invoice **2행**(2026-09-16 저녁 · 7-a 의 SON-TEST-1 검증을 하기 **전**) — AMP-778812(invoice · confirmed · Ampro) · CN-AMP-778812-1(credit · confirmed · AMP-778812 에 붙음). 검증을 하면 SON-TEST-1 이 늘어 3행이 된다.
⚠️ 크레딧은 별 표가 아니다 — po_invoice 의 doc_kind=credit · 금액은 **양수**로 담겨 있다(찍힌 대로) · 빼는 것은 계산에서. 「왜 30.90 이 양수지」는 결함이 아니다.

```
공통 · 목록
[ ] ☰ Menu 에 Purchase Invoices 가 Purchase Orders 바로 뒤에 있고, 이 화면에서는 눌리지 않는다 (2026-09-25 이름 바뀜 · 파일은 invoices.html 그대로)
[ ] 열면 넓은 목록 하나다 — 왼쪽 좁은 목록이 없다(발주와 다르다 · 한 장을 열면 상세가 화면 전체)
[ ] 필터 순서: Supplier(활성 226 · 경비처 포함 — 좁히지 않는다 · Caleb 2026-09-16) · Kind(Invoices & credits · Invoices · Credits) · Date from–to · Status(Draft & confirmed 기본 · Draft · Confirmed · Cancelled · All) · Balance(Any · Unpaid only · Credit due only) · 검색 · Clear
[ ] 기본 상태(Draft & confirmed · Invoices & credits)에서 1–2 / 2 (모집단 2행 · 2026-09-16 저녁)
[ ] Kind 를 Credits 로 → / 1 (CN-AMP-778812-1) · Invoices 로 → / 1
[ ] Balance 를 Credit due only 로 → AMP-778812 하나(unpaid −30.90) · Unpaid only 로 → 「No documents match.」(2행 다 미지급 0 이하)
[ ] 검색칸에 778812 → 2행 · PO-02001 → 2행(⭐ po_numbers — 발주 번호로도 찾힌다) · Ampro → 2행
[ ] 열 순서: Number · Kind · Date · Due · Supplier · POs · Printed · Computed · Diff · Payable · Paid · Balance · Status
[ ] AMP-778812 행: Kind invoice · POs PO-02001a · Printed 2,197.54 USD · Computed 2,197.54 · Diff 0.00(회색) · Payable 2,010.54 · Paid 2,010.54 · Balance 「30.90 credit due」 · confirmed(초록)
[ ] CN-AMP-778812-1 행: 번호 아래 「for AMP-778812」 · Kind credit · Printed 30.90 · Computed 30.90 · Diff 0.00 · Payable 30.90(뜻은 뺄 돈)
    ⬜ 아직 없다 [2026-09-16 저녁 · 검토 이견 3 · 대화 Claude 가 고친다]: 크레딧 행의 Paid·Balance 가 인보이스 뜻 그대로다(Paid 0.00 = 실제로는 「쓴 금액」 · Balance 0.00 회색 = 사실은 붙은 크레딧이라 잔액 없음). 「쓸 수 있는 크레딧」(remaining)이 목록에 안 보인다
    ⇒ 고쳐진 뒤: doc_kind 로 갈라 크레딧은 Used · Remaining 을 그린다. 고칠 때까지 이 두 칸은 크레딧 행에서 **읽지 않는다**
[ ] 표 아래 「Printed is what the supplier put on the document and stays the source of truth …」 안내가 보인다

상세 — AMP-778812 (confirmed · 편집 불가)
[ ] 행을 누르면 상세가 화면 전체 · 칩 invoice · confirmed(초록) · 버튼은 「‹ All documents」 · 「Reopen」 둘뿐(Add·Confirm 없음)
[ ] 통계 아홉: Goods 2,446.80 · Discount 0.8217 · Other lines 187.00 · Computed 2,197.54 · Printed 2,197.54 · Diff 0.00 · Payable 2,010.54 · Paid 2,010.54 · Balance 「30.90 credit due」
[ ] Printed total · Due date 가 글자로만 보인다(입력칸 없음)
[ ] Lines 4 — goods 3(AMP00405 600 · … · PO PO-02001a #1~3 · PO qty = Qty · Received = Qty · Qty diff 0 회색) · charge 1(Freight 187 · 「not payable」 태그 · PO —)
    ⚠️ 단가가 발주와 다르면 단가 아래 「PO 3.39」처럼 작게 뜬다 — 지금 데이터는 같아서 안 뜬다
[ ] Discounts 2 — Trade 17 · Damage 1 · Source 「added here」(SQL 로 넣어 supplier_discount_id null) · 「Goods 2,446.80 × 0.8217 = 2,010.54」
[ ] Purchase orders 1 — PO-02001a · closed · Lines 3 · Qty 920 · Amount 2,446.80
[ ] Credit notes against this invoice 1 — CN-AMP-778812-1 · confirmed · Printed 30.90 · Net 30.90 · Used —
[ ] Payments 1 — WIRE-20260916-01 · Paid 2,010.54 USD · Discount — · Applied 2,010.54 · Account BMO USD CHEQUING
[ ] 「Reopen」 → 확인 → 「… has payments applied (2010.54) — cannot reopen …」 이 그대로 뜬다(alert · 삼키지 않는다)
[ ] Created by · Confirmed by 옆 시각이 토론토다

상세 — CN-AMP-778812-1 (credit)
[ ] 칩 credit · confirmed · 「for AMP-778812」 · 통계의 이름이 Credit net · Used · Remaining 으로 바뀐다 · Remaining 「—」(붙은 크레딧은 잔액 없음)
[ ] 「Credit notes against this invoice」 카드가 없다(크레딧에는 안 그린다) · Lines 1 — AMP00415 10 @ 3.09 · Qty diff 가 음수로 뜬다(10 − 그 라인의 입고 합 · 예 −590)(크레딧 줄은 인보이스 수량이 아니라 돌려받은 수량이라 입고와 비교하면 뜻이 없다 — ⬜ 크레딧 줄에서는 Qty diff 를 비우는 것이 맞다 · 사소 · 미룸)

⭐ draft 편집 — 7-a 에서 SON-TEST-1 을 만든 뒤 (invoices.html?id=… 로 넘어와 있다)
[ ] 칩 invoice · draft · 버튼 다섯: ‹ All documents · Add a line · Add a discount · Add lines from a PO · Confirm
[ ] 통계: Goods 586.92 · Discount 1 · Computed 586.92 · Printed 0.00(경고색) · Diff −586.92(경고색) · Payable 586.92 · Balance 586.92 — ⭐ 총액을 안 넣었다는 것이 크게 보인다(계산값으로 채우지 않는다)
[ ] Lines 13 — 수량·단가 입력칸 · Payable 체크 · × 버튼 · PO PO-02007 #1~13 · PO qty 12 · Received 0 · Qty diff 12(경고색 — 아직 안 받았다)
[ ] 「Add a discount」 → Special · 10 → Discounts 1 · Source added here · Payable 528.23 · Diff −528.23 (586.92 × 0.9 = 528.228)
[ ] Printed total 칸에 528.23 → Saved · Diff 0.00(회색으로 돌아온다)
[ ] 「Add a line」 → Kind charge · Freight · 1 · 25 · 「billed here but settled elsewhere」 → Lines 14 · Computed 553.23 · Payable 528.23(운임은 빠진다) · Diff −25.00
[ ] 그 줄의 Payable 체크를 켜면 Payable 553.23 · 끄면 528.23 · × 로 지우면 Lines 13
[ ] 수량 칸을 11 로 고치면 Goods 가 줄고 Diff 가 움직인다 · 빈 값이나 글자를 넣으면 이전 값으로 돌아온다
[ ] 「Add lines from a PO」 → 같은 공급처 발주 목록(Strength of Nature 는 PO-02007 하나) → 누르면 「no_uninvoiced_lines」 alert(이미 다 청구됨) · 줄은 안 는다
    ⬜ 아직 없다 [2026-09-16 저녁 · 검토 이견 4 · 대화 Claude 가 고친다]: 미리 보기 없이 바로 넣는다. 고쳐진 뒤: Check → Add 두 단계
[ ] 「Confirm」 → 확인 문구 → 총액이 맞으면 confirmed · 경고 없음 · 총액이 0 이거나 다르면 alert 「⚠ total_amount_zero / total_differs_from_lines」 — 막지 않는다
[ ] confirmed 가 되면 입력칸·Add 버튼이 사라지고 「Reopen」만 남는다 · Reopen → draft 로 돌아온다(결제 없음)
[ ] draft 에서 「Add a discount」 이름 없이 Add → 「A name and a percent are needed.」 · 「Add a line」 설명 없이 → 「A description is needed …」

⭐⬜ 아직 없다 — 크레딧 만들기 [2026-09-16 저녁 · 검토 이견 1 · 가장 크다 · 대화 Claude 가 고친다]
[ ] 인보이스 상세에 「Create a credit note」 버튼이 **없다.** 뒷단(po_invoice_create · p_credit_for_invoice_id)은 「인보이스 수량 − 입고」 차이만큼 줄이 채워진 크레딧 초안을 주지만 화면에서 부르는 길이 없다.
    Caleb 이 필요하다고 한 기능(「화면이 물어보고 누르면 초안 · 숫자를 손으로 옮기지 않는다」)이다.
    ⇒ 고쳐진 뒤 볼 것: AMP-778812 에서 누르면 Check 결과 3줄 전부 no_difference(200/200 · 600/600 · 120/120) · 「no_qty_difference」 · Create 하면 빈 크레딧 초안 · 확정 시도 → 「… has no lines …」
       SON-TEST-1(입고 0)에서 누르면 13줄 전부 ok · diff 12 → Create → 크레딧 초안에 13줄 · Credit net 586.92(할인 줄은 복사되지 않는다 — 공급처 문서에 적힌 대로)

진입
[ ] invoices.html?id=<uuid> 로 들어오면 그 문서가 바로 열린다(po.html 이 만든 뒤 이렇게 넘긴다) · 없는 id 는 「That document is gone.」
[ ] Esc 로 모달이 닫힌다 · 검색어·필터를 바꾸면 첫 페이지로 돌아간다
```

⚠️ **매니저로 로그인해도** 필터·편집 버튼이 보인다 — 인보이스는 감출 것이 아니다(발주와 같다). （매니저 계정이 아직 없다）
📌 검증이 끝나면 SON-TEST-1 · 그 할인 줄 · Freight 줄은 남겨도 된다(검증 데이터는 지우지 않는다 · Caleb) — 다만 7-a·7-b 의 「모집단 2행」 항목은 3행 기준으로 고치고 날짜를 붙인다.

---

## 7-c. `charges.html` — 비용 (2026-09-17 낮 신설 · 대화 Claude)

뒷단: 뷰 `po_charge_list`(목록) · RPC `po_charge_detail`(상세) · 쓰기 RPC `po_charge_create` ·
`po_charge_alloc_add/update/delete/spread` · `po_charge_confirm` — asung-wms `20260917150000`.
⭐ 비용은 **공급사가 아닌 제3자**(관세청 · 관세사 · 운송사)가 청구한다. 그래서 인보이스와 다른 문서다.
⭐⭐ 배분은 **고친 줄만 바뀐다.** 한 줄을 고쳐도 다른 줄은 안 건드린다 — 둘이 각자 다른 줄을 고치면 둘 다 산다.
⚠️ `unallocated ≠ 0` 이면 확정이 거부된다. 「미배분 0」이 확정의 문지기다.
⚠️ 모집단: `po_charge` **2행**(2026-09-18 실측) —
   `10039192310530`(CBSA 관세 · CAD 2,547.37 · confirmed · 미배분 0.00 · 미지급 0.00) ·
   `FX-TEST-1`(CAD 100.00 · draft · 미배분 0.00 · 미지급 100.00 · 통화 섞기 시험용).

```
공통 · 목록
[ ] 탭 줄에서 Charges 가 Purchase Invoices 뒤에 있고, 이 화면에서는 눌리지 않는다
[ ] 열면 넓은 목록 하나다 — 왼쪽 좁은 목록이 없다
[ ] 기본 상태에서 2행이 보인다 (2026-09-18 실측)
[ ] 10039192310530 행: CAD 2,547.37 · confirmed(초록) · 미지급 0.00
[ ] FX-TEST-1 행: CAD 100.00 · draft · 미지급 100.00
[ ] 검색칸에 CBSA → 1행 · FX → 1행

상세 · 머리
[ ] 문서를 열면 머리 칸(문서 날짜 · 총액 · 메모)이 인라인으로 고쳐진다 — draft 일 때만
[ ] 고치고 나면 Due date 옆에 「Saved」가 잠깐 뜬다
    ⚠️ reload() 가 머리를 다시 그려 곧 지워진다 — 원래 그렇다(2026-09-18 확인 · 고칠 거리)
[ ] confirmed 문서는 입력칸이 안 그려진다
    ⬜ 뒷단은 아직 안 막는다 — 「확정 뒤 머리 칸 잠금」은 미뤄 둔 것(정본 §13-f)

배분
[ ] 발주를 더하면 배분 줄이 선다 · 금액을 인라인으로 고친다
[ ] ⭐ 한 줄을 고쳐도 다른 줄의 금액이 안 바뀐다 (설계다 · 정본 §11-f)
[ ] Spread 를 누르면 배분이 통째로 덮인다 — 지금 배분을 보고 누르는 것이라 되돌릴 수 없다
[ ] 미배분이 0 이 아니면 Confirm 이 거부되고, 문장이 얼마가 남았는지 말한다
[ ] 배분 합 ≠ 총액인 채로 저장하려 하면 막힌다

⚠️ [2026-09-18] 같은 줄을 둘이 동시에 고치면 **뒤가 조용히 이긴다.** 아직 막지 않는다 —
   처방은 리시빙에서 만든 뒤 가져온다(정본 §13-f · WMS 의 「Keep theirs / Use mine」 모양)
```

---

## 7-d. `payments.html` — 결제 (2026-09-17 밤 신설 · 대화 Claude)

뒷단: 뷰 `po_payment_list`(목록) · RPC `po_payment_detail`(상세) · 쓰기 RPC `po_payment_create` ·
`po_payment_alloc_set/delete` — asung-wms `20260917190000`.
⭐⭐ **한 결제 = 한 통화.** 통화가 다른 문서를 한 결제에 섞을 수 없다.
⭐ 확정된 문서에만 충당한다 · **취소가 없고 삭제만** 있다(정본 §2 규약).
⚠️ 결제에는 문서 번호가 없다 — `reference`(EFT·WIRE 번호)로 부른다.
⚠️ 모집단: `po_payment` **3행**(2026-09-18 실측) —
   `EFT-20260916-02`(CAD 2,496.42 + 할인 50.95 · TD CAD · CBSA 문서에 충당 · 균형 t) ·
   `WIRE-20260916-01`(USD 2,010.54 · BMO USD · 환율 1.39325 · AMP-778812 · 균형 t) ·
   `wire`(USD 586.92 · BMO USD · 문서 5566 · Strength of Nature · 균형 t · 시험으로 만든 것).

```
공통 · 목록
[ ] 탭 줄에서 Supplier Payments 가 Charges 뒤에 있고, 이 화면에서는 눌리지 않는다 (2026-09-25 이름 바뀜 · 파일은 payments.html 그대로)
[ ] 기본 상태에서 3행이 보인다 (2026-09-18 실측)
[ ] 열에 통화·계좌가 보인다 — CAD 하나 · USD 둘
[ ] EFT-20260916-02 행: CAD 2,496.42 · 할인 50.95 · 충당 합 2,547.37 (⭐ 할인만큼 더 갚아진다)
[ ] WIRE-20260916-01 행: USD 2,010.54 · 환율 1.39325 · AMP-778812
[ ] 검색칸에 WIRE → 1행 · Ampro → 1행

상세 · 충당
[ ] 문서를 고르면 그 통화의 미지급 문서만 후보에 뜬다
[ ] ⭐ 통화가 다른 문서는 후보에 아예 없다 — 섞으려 해도 고를 수가 없다
[ ] 금액을 인라인으로 고치면 충당 합과 미충당이 함께 바뀐다
[ ] 확정 안 된(draft) 문서는 후보에 없다
[ ] 삭제는 되고, 취소 버튼은 없다

⚠️ [2026-09-18] 크레딧을 결제에 쓰는 길이 아직 없다 — 검산 부호가 뒤집힌다(정본 §13-f)
⚠️ 조기결제 할인의 HST 매입세액은 회계사에게 물을 것으로 남아 있다
```

---

## 7-e. `receiving.html` — Purchase Receipts(오피스 입고 · 판정 40 으로 메뉴 이름이 「Receiving」 → 「Purchase Receipts」 · 2026-09-18 신설 · 대화 Claude)

뒷단: 뷰 `po_receipt_list`·`po_receipt_diff_list`(목록) · RPC `po_receipt_detail`(상세) ·
쓰기 RPC `po_receipt_create` · `po_receipt_work_save/delete/split/putaway/putaway_all/unassign` ·
`po_receipt_confirm` · `po_receipt_delete` · 도우미 `ims_last_bin` —
asung-wms `20260918161537` · `163552` · `173042` · `174428` · `203805`.

⭐⭐ **일이 두 단계다** — ① 검수(인보이스대로 왔는지 센다 · 빈을 모른다) → ② 풋어웨이(자리에 갖다 놓는다).
   사람도 시점도 다르다. 그래서 표도 둘로 갈려 있다(작업 줄 → 확정하면 입고 줄).
⭐ **기준은 PO 확정 수량 하나.** 인보이스 합은 옆에 보이기만 하고 아무것도 결정하지 않는다.
⭐ 이 화면에서는 **빈을 고르는 순간 놓인 것**이다(「자리를 정했다」와 「갖다 놨다」를 안 가른다).
⭐⭐ [2026-09-19] **확정이 원장에 닿는다.** 확정하면 `inv_post_receipt` 가 `po_in` 사건을 쓰고 재고가 는다 —
   Cin7 을 한 번도 거치지 않는다. ⚠️ **초과는 기준까지만** 원장에 간다 ⇒ **원장 합 ≠ 입고 줄 합이 정상**이다.
   ⚠️ 원장은 append-only 다 — 확정은 되돌릴 수 없고, 잘못 들어간 사건은 상쇄로만 고친다(아직 그 길이 없다).
⚠️ 모집단: `po_receipt` **2행**(2026-09-18 실측) —
   `RCV-00005`(confirmed · PO-02011a · 센 것 10 · 놓은 것 10 · 차이 큐에 short 1건) ·
   `RCV-00006`(draft · PO-02011b · 0 · 0).
📌 `RCV-00001`~`00004` 는 검증에서 소비됐다 — **번호가 비는 것은 설계대로다**(롤백해도 시퀀스는 안 돌아온다).

```
공통 · 목록
[ ] 탭 줄에서 Receiving 이 Supplier Payments 뒤 다섯째에 있고, 이 화면에서는 눌리지 않는다
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-18 · count + putaway」다 (판이 맞는지 여기서 가른다)
[ ] 필터: Supplier · Warehouse · Status(Draft & confirmed 기본) · Date from–to · 검색 · Clear · New receipt
[ ] 기본 상태에서 2행 (2026-09-18 실측)
[ ] 열 순서: Number · Received · PO · Supplier · Warehouse · Lines · Ordered · Counted · To place · Status
[ ] RCV-00005 행: PO-02011a · 센 것 10 · To place 0(회색) · confirmed(초록)
[ ] 읽기 전용 사용자에게는 New receipt 버튼이 **아예 안 보인다**
[ ] ⭐ [2026-09-19] 열린 차이가 있는 입고는 Status 옆에 **「1 to settle」** 칩이 붙는다
    ⚠️ 확정된 것끼리는 이 칩 말고 구별할 길이 없다 — 안 뜨면 뒷단의 open_diffs 를 본다

새 입고
[ ] New receipt → 확정된 PO 만 후보에 뜬다 (draft 는 없다)
[ ] PO-02011b 를 고르고 Start receiving → RCV-… 가 서고 상세가 열린다
[ ] ⭐ 같은 PO 로 또 만들려 하면 거부되고, 문장이 **이미 열린 입고의 번호**를 말한다
[ ] `po.html` 의 confirmed 발주에 **Receive** 버튼이 있고, 누르면 그 PO 가 미리 골라진 채로 열린다

① Count
[ ] PO 라인이 **전부** 보인다 — 아직 안 센 라인도(그게 찾아야 할 물건이다)
[ ] 열: # · Item · Ordered · Invoiced · Received before · Counted · Diff · Rows
[ ] 수량을 적으면 저장되고 Diff 가 바뀐다 (적게 세면 −, 많이 세면 빨간 +)
[ ] ⭐ 이미 빈에 넣은 것보다 적게 세려 하면 **거부**되고 「reduce or remove the bin rows first」가 뜬다

② Put away
[ ] 센 라인만 보인다
[ ] 지난번에 넣은 자리가 있으면 「Last time: A050902 · 2026-09-08」과 「Use A050902」 버튼이 뜬다
    ⭐ [2026-09-19] **속이 원장으로 바뀌었다** — 「우리가 입고한 자리」가 아니라 **「지금 재고가 있는 자리」**다.
      출고·이동·조정까지 안다. ⚠️ **화면은 한 줄도 안 고쳤다**(ims_last_bin 뒤에 감춰져 있다)
    ⚠️ 그래서 어제와 답이 다를 수 있다 — 그것이 맞다
    ⚠️ IN_TRANSIT · 빈 문자열 bin · 비활성 bin 은 후보에서 빠진다
[ ] 「choose a bin」을 누르면 그 창고의 빈이 300개씩 뜨고, 타이핑하면 좁혀진다
[ ] ⭐ 빈 이름을 치고 Enter → 정확히 하나면 바로 들어간다 (스캐너 길)
[ ] ⭐ Split → 수량과 빈을 함께 고른다 · 나눠도 **라인 합은 그대로**다
[ ] ⭐ 같은 빈으로 또 보내면 **두 줄이 하나로 합쳐진다** (에러가 아니다)
[ ] ↩ 를 누르면 **빈이 지워지고** 「choose a bin」으로 돌아간다
[ ] 미배정 줄이 이미 있으면 ↩ 가 거기 합쳐진다 — 줄이 하나가 된다
[ ] To place 가 0 이 되면 회색으로 바뀐다

확정
[ ] 자리를 못 정한 것이 남아 있으면 Confirm 이 **풋어웨이 탭으로 보내고** 얼마가 남았는지 말한다
[ ] Confirm 을 누르면 대화상자가 결과를 먼저 말한다 — 몇 개가 재고로 들어가고, 부족분이 있으면 갈라진다는 것과 「되돌릴 수 없다」
[ ] ⭐⭐ [2026-09-19] 확정 뒤 알림이 **재고 이야기를 먼저** 한다 — 「156 went into stock.」
[ ] ⭐ 초과로 확정하면 한 줄이 더 붙는다 — 「3 more than ordered arrived — it is in the bin but not in
    the books until the difference is settled.」
    ⚠️ **물건은 빈에 있는데 장부에는 없다.** 이 문장과 차이 큐 말고는 그것을 말해 주는 곳이 없다
[ ] ⭐⭐ 덜 받고 확정 → 발주가 갈라지고 **알림이 뜬다**: 「PO-02011 is now PO-02011a」 · 「PO-02011b 로 이어진다」
[ ] 확정 뒤 머리에 「The rest of this order carries on as PO-02011b」가 보인다
[ ] 확정 뒤 단계 탭이 사라지고 **Received** 표가 뜬다 (라인 · 빈 · 수량 · 받은 날 · 사람)
[ ] Confirm 과 Delete 버튼이 사라진다
[ ] 차이가 났으면 **Differences** 표에 「1 open」과 함께 뜬다 (short · 기대 12 · 받음 10 · −2)
[ ] 확정된 입고를 지우려 하면 거부된다

⚠️ [2026-09-18 · 09-19 갱신] 아직 없는 것 — 차이를 닫는 길(닫아도 재고로 넣을 방법이 없다) ·
   PO 밖 물건 받기 · 팩→낱개 환산 · **확정 취소(원장 상쇄가 필요하다)** ·
   트랜스퍼 입고(IMS 에 트랜스퍼 문서가 없다) · 창고 접근으로 목록 거르기 (정본 §13-f)
⭐ [2026-09-27 · 대화 Claude 80a98b9 · ⑤-6c3] **off-PO 결정 UI** — 빌드 표시 「2026-09-27 · off-PO decide」 · 판정 43 · 44 · 45 · 창구 `po_receipt_diff_settle_off_po(p_diff_id, p_resolution, p_unit_price, p_note)`(asung-wms 20260928025627:310)
   들어오는 길 = WMS Admin Receiving 탭 「Decide in Purchase Receipts →」 = `receiving.html?receipt=<po_receipt.id>&diff=<po_receipt_diff.id>`(같은 창 · 옛 `?id=` 도 그대로) → 그 입고가 열리고 그 차이 줄로 스크롤 · 아직 안 정했고 쓰기 권한이 있으면 결정 창이 바로 뜬다
   ⚠️ 정할 사람 = 오피스 RECEIVING write(판정 45 A · 확정 · 부족 · 초과 · 삭제도 함께 받는다) · 지금은 admin 으로 시험 · manager 에게는 비밀번호 전에 켠다
[ ] ?receipt=&diff= 로 열면 그 입고 · 그 줄(off-PO 태그 · 칸 · 놓은 사람)이 보이고 「Decide an off-PO item」 창이 뜬다 · 쓰기 권한이 없으면 「waiting for a decision」 글자만(단추 없음)
[ ] Decision 셋 — 「Accepted — billed, into stock at the invoice price」 · 「Accepted — free, into stock at no cost」 · 「Rejected — set aside and returned to the supplier」(「Nothing goes into stock.」)
[ ] billed 는 Unit price(PO 통화) 필수 — 0 이하 → 「Enter the unit price from the supplier invoice (more than 0).」 · 외화 PO 면 「≈ 단가 × 환율 = … per unit in the base currency (the database computes the real figure)」 미리보기
[ ] Save decision(「This cannot be undone here.」) → 받은 것 = Settled 칸 「in stock — cannot be reopened」 · 단추 없음
[ ] 거절 = 「still on <칸> — the warehouse takes it off」(빨강) + Reopen · 창고가 Removed 를 누른 뒤 = 「taken off <칸> by <이름> · 시각」 · Reopen 사라짐
[ ] 시험 뒤 확인 쿼리(대화 Claude · begin read only · 시험 전 0 행 확인됨) 요지 — 그 입고의 off_po 차이 줄(resolution · bin · placed · removed) · 원장 po_in `line_ref <diff_id>:offpo`(occurred_on = received_on) · 레이어 cost_source free / manual — 거절 줄은 원장 · 레이어 0
   ⚠️ 끝까지 시험(창고 스캔 → 놓기 → 여기 결정 → 창고 Removed)은 7-r 의 「Caleb 시험 순서」 · 아직 안 돌렸다(2026-09-27 · Caleb 「테스트는 나중에 할께」)  → ✅ [2026-09-27 밤] 돌았다 — RCV-00029 · ABE10612 5 accepted_billed 3.1 E020202 → 원장 po_in +5 · 레이어 4.319075 manual / ABE12006 3 rejected · removed t · 원장 · 레이어 0(정본 so-module §24-s) · ⚠️ 6b Delete(RCV-00029)는 그대로 안 했다
```

⭐ [2026-09-28 · 대화 Claude b693d8c · 오피스 판 1] **창고 작업 상태(WAREHOUSE WORK)** — 빌드 표시 「2026-09-28 · warehouse state」 · 판정 30(경고만 · 막지 않는다 · 오피스 혼자 받는 길은 그대로) · 창구 `wms_recv_state(p_receipt_id)`(asung-wms 20260926232330:530 · 읽기) · 확정 반환 `warnings` 의 `wms_not_completed`(:578)
   ⚠️ `po_receipt_detail` 에는 wms 가 없다 — 화면이 wms_recv_state 를 따로 읽는다 · 목록 칩은 안 넣었다(⬜) · 머리 kv 의 「WAREHOUSE」 는 창고 이름 · 이 줄은 「WAREHOUSE WORK」
```
[ ] 헤더 빌드 표시가 「2026-09-28 · warehouse state」다
[ ] draft 입고 상세 머리에 WAREHOUSE WORK 줄 — 창고가 Complete 했으면 「Completed by <이름> · <시각>」 · 보류 중이면 빨간 「On hold in the warehouse」 · 아니면 빨간 「Not marked complete in the warehouse yet」(Reopen 됐으면 「· reopened by <이름> · <시각>」)
[ ] ⭐ WMS Admin Receiving 에서 Reopen 한 입고를 여기서 Confirm → 확인 창에 「The warehouse has not marked this receipt complete — the count may still change.」(보류면 「… ON HOLD …」) — 취소하면 아무것도 안 바뀐다 · 막지는 않는다(판정 30)
[ ] 그대로 확정하면 확정 뒤 안내에 「The warehouse had not marked this receipt complete when it was confirmed — the count could still have been changing.」 · Complete 뒤 확정이면 이 줄이 없다
[ ] Caleb(admin) 시험 2026-09-28 — RCV-00028 Reopen 뒤 빨간 줄 · 확정 창 경고를 보고 취소 ✅ (그 뒤 창고에서 다시 Complete · 미확정 그대로)
```

---

## 7-f. `so.html` — 판매 오더 (2026-09-25 신설 · 대화 Claude · 「2026-09-25 · so v1」 → v1.1(경고 읽기 쉽게 · 인보이스 링크) → v1.2(다 받은 인보이스면 결제 단추 숨김 · Due at issue) → v1.3(줄 넣기 가용 재고 · 세트 숨김) → v1.4(Include sets 는 매니저만) → **2판** v2(보류·풀기 · 나누기 · 창고 바꾸기 · 백오더 진행 · 병합 · 줄의 Stock 칸 · 병합 초안의 견적 알림) → v2.1(not reserved) → v2.2(Hold 는 잡힌 줄이 있을 때만) → **v2.3**(잡힐 것 없으면 Proceed 막힘) → **v2.4**(Release to WMS · Recall from WMS) → **v2.5**(판정 17 글자 · Qty out · 시각 줄 · Finalized 필터 판정 46 · b693d8c) → **v3**(Finalize — ship and invoice · f73b980))

뒷단: 읽기 RPC `so_detail` · `so_family_members` · `so_payment_default_account` · 표 `so`(select) ·
쓰기 RPC `so_create` · `so_line_add` · `so_lines_paste` · `so_line_update` · `so_line_remove` · `so_charge_set/remove` ·
`so_header_update` · `so_reprice` · `so_confirm` · `so_unconfirm` · `so_cancel` · `so_delete` · `so_pos_confirm` · `so_pos_reopen` ·
`so_counter_ship` · `so_payment_add` — asung-wms 정본 `docs/design/so-module.md` §12~§21.
2판(v2~): 읽기 `so_available_many`(줄 넣기 가용 재고) · 표 `so_reserve`(select · 줄마다 지금 예약 kind) · `so_merge_requote_hint`(병합 초안의 오늘 견적) ·
쓰기 `so_hold` · `so_reallocate`(풀기) · `so_divide` · `so_change_location` · `so_backorder_proceed` · `so_merge` — 전부 미리 보기(p_commit false) → 같은 입력으로 실행 · 결과 표는 확정 미리 보기와 같은 모양(lines · siblings).

⭐⭐ **계산 규칙의 정본은 DB 다** — 가격 · 할인 · 세금 · 합계 · 잔액을 화면이 다시 짜지 않는다. `so_detail` · `so_counter_ship`(미리 보기)이 준 값을 그린다.
⭐ 쓰기는 전부 창구(RPC) — SO 표는 select 만 열려 있다. 거부 문장은 DB 가 「… nothing was saved」로 준다 — 그대로 보인다.
⭐ 이 판이 담은 것: 목록 · 새 오더 · 머리 · 줄 · 운임 · 합계 · 확정(창고 길 미리 보기) · counter 확정·나갔다 · 결제 넣기 · 뭉치.
   **2판(v2 · 2026-09-25 밤 「so.html 2판 가자」)이 더한 것**: 보류 · 풀기 · 나누기 · 창고 바꾸기 · 백오더 진행 · 병합 · 줄의 Stock 칸 · 병합 초안의 견적 알림.
   **아직 자리만(눌리지 않는다)**: Release to WMS · Finish on POS(POS 오더는 pos.html 에서 끝낸다 · 7-k) · 오피스 마무리 · 인쇄.
⚠️ 권한: 줄·머리·결제 = sales 열쇠 · 확정·counter·취소·보류·풀기·나누기·창고 바꾸기·백오더 진행 = manager 이상(단추가 manager 에게만 뜬다) · 병합 = 초안이면 sales · 확정 뒤는 manager · Unconfirm = supervisor 이상 · Include sets 체크는 manager 이상에게만 보인다(v1.4).
⚠️ 모집단: 테스트 DB 의 `so` 는 **0행**이 정상이다(검증은 전부 rollback · 번호 SO-25000 부터) — 첫 오더가 SO-25000 이면 시퀀스가 제자리다.

```
공통 · 목록
[ ] 탭 줄에 Sales Orders 가 있고 이 화면에서는 눌리지 않는다 · 구매도 보는 사람이면 왼쪽에 PURCHASING · SALES(눌림) 묶음 칸이 있다
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · so v2.3」다
[ ] 넓은 목록(처음 화면): 필터 Channel(All · Warehouse · Counter · POS) · 주문일 from–to · Status(Open 기본 · Draft · Confirmed · With warehouse · Shipped · Fulfilled · Cancelled · All) · 검색(SO number · customer · reference) · Clear · + New sales order
[ ] 열 순서: SO · Status · Channel · Ordered · Customer · Reference · Warehouse · Currency
[ ] 행을 누르면 좁은 목록 + 상세로 바뀌고, ‹ All orders 로 돌아온다 · ☰ List 로 좁은 목록을 접고 편다
[ ] 탭 줄이 있어도 목록이 화면 아래로 밀리지 않는다(--ims-tabs-h · po.html 과 같은 식)

새 오더
[ ] + New → 손님을 이름으로 찾아 고른다 → Channel(Warehouse · Counter) · Warehouse(손님 기본 창고가 미리 골라짐) → Create
[ ] Counter 는 창고가 필수다 — 비우고 만들면 DB 가 거부한다(so_create)
[ ] 새 오더는 draft · SO-25000 부터 · 머리에 손님의 티어 · 결제조건 · 통화 · 배송지가 복사돼 있다 · 세금 규칙은 배송지 주에서 「from ship-to」
[ ] 비활성 손님은 후보에 안 뜬다(뜨면 so_create 가 거부한다)

줄 넣기 · 붙여넣기 (draft 만)
[ ] Add lines → SKU 로 찾아 수량 · Free? · Note 를 적고 Check → 판정이 뜬 뒤 Add lines · Check 없이는 Add lines 가 눌리지 않는다
[ ] ⭐ [v1.3] 찾은 제품마다 **가용 재고**가 붙는다 — 「available N EA」(0 이면 빨강) · 잡힌 몫이 있으면 「(on hand N · reserved N)」 · 오더 창고 기준 · so_available_many 한 번(창고 잔고 − 열린 할당 · 낱개 EA) — 화면이 계산하지 않는다
[ ] ⭐ [v1.3] 세트(parent_product_id 있는 제품 · 케이스·팩)는 찾기에서 **기본으로 숨는다** — 케이스도 낱개 SKU × 수량으로 판다(Caleb 「낱개 sku에 36을 넣어」) · 붙여넣기는 세트 SKU 를 그대로 받는다
[ ] ⭐ [v1.4] 「Include sets (cases · packs)」 체크는 **매니저 이상에게만** 보인다 · 켜면 세트도 뜨고 가용은 낱개 재고를 pack_factor 로 나눠 「N EA = M × pf」로 보인다(나눠 보이기 · 계산 아님)
[ ] Paste lines → 한 줄에 SKU 와 수량(탭 · 쉼표 · 공백 둘) · Check → 줄마다 Verdict(ok · merged · ask · duplicate · not_found · inactive · no_price) → Add lines
[ ] ⭐ 같은 SKU 를 또 넣으면 시스템 줄은 **합쳐지고 합친 수량으로 다시 견적**된다(6+6=12 → 수량 할인) · 사람이 정한 줄(단가 덮어씀 · 수동 할인)은 단가가 같을 때만
[ ] 가격 없는 제품은 줄이 서되 unit price 가 비어 있고(no_price) 확정이 막는다
[ ] 무상 줄(Free?)은 단가 0 · 사유가 붙는다

줄 고치기 (draft 만)
[ ] 줄의 수량 · 할인 % · 단가 칸을 바로 고친다 — 단가를 치면 시스템 가격을 덮어쓴다(override) · ↺ 가 시스템 가격으로 되돌린다
[ ] 수량을 바꾸면 시스템 줄은 다시 견적된다 · 덮어쓴 줄·수동 할인 줄은 수량만 바뀐다
[ ] × 로 줄을 뺀다 · Add a charge 로 운임 줄(이름 · 금액 ≥ 0)을 넣고 ✎ · × 로 고치고 뺀다
[ ] 머리 칸(Reference · Price tier · Order discount % · Tax rule · Comments · Shipping notes · Ship to…)을 고치면 저장되고, 티어·주문일·손님 할인을 바꾸면 경고 reprice_suggested 가 뜬다 → Reprice 가 시스템 줄만 다시 매긴다
[ ] 합계 네 칸: Lines · Order discount · Charges · Tax(규칙 이름 · 없으면 노란 경고) · Total
[ ] Delete draft 로 초안을 지운다(확정 뒤엔 단추가 없다)

확정 미리 보기 (warehouse 길 · manager)
[ ] Confirm… → 「preview」 창: 줄마다 Ordered · Result · Reserved · Backorder · Preorder · Preorder? 체크 — **아무것도 저장되지 않는다**(「Nothing is saved until you press Confirm.」)
[ ] Preorder? 를 체크하거나 「Confirm on hold」를 켜면 미리 보기가 바로 다시 계산된다
[ ] Confirm → confirmed · 모자란 줄은 형제(SO-25000a · stock_short)로 갈리고 뭉치 표에 보인다 · 프리오더는 b
[ ] 세금 규칙이 없거나 가격 없는 줄이 있으면 DB 가 거부하고 문장이 무엇이 빠졌는지 말한다
[ ] 확정 뒤(warehouse) 단추: Release to WMS 는 여전히 **회색** · manager 에게 Hold 또는 Release hold · Proceed backorder…(백오더·프리오더 줄이 있을 때만) · Divide… · Change warehouse… · Merge… · Unconfirm 은 supervisor 에게만 · Cancel order… 는 manager
[ ] ⭐ [v2·v2.1] 줄 표의 **Stock 칸**(확정 뒤 · so_reserve 를 읽는다): reserved N(초록) · not reserved N · on hold · backorder N · preorder N — 예약이 없으면 「—」 · hold 는 「잡지 않고 멈춰 둔」 것이라 not reserved 로 읽힌다(Caleb 「not reserved가 직관적」)

2판 — 보류 · 풀기 · 나누기 · 창고 바꾸기 · 백오더 진행 · 병합 (manager · 전부 미리 보기 → 같은 입력으로 실행)
[ ] Hold → 확인 창 → so_hold → 오더 전체의 예약이 풀리고 「On hold — N line(s)」 · 줄의 Stock 칸이 not reserved · on hold 로 · ⭐ [v2.2] Hold 는 **잡힌 줄(reserved)이 있을 때만** 뜬다(백오더 형제엔 안 뜬다 · so_hold 가 거부한다)
[ ] Release hold(보류 중일 때) → 확인 창 → so_reallocate → 결과 표(잡을 수 있는 만큼 잡고 나머지는 백오더 형제) → Close 로 다시 읽는다
[ ] Proceed backorder… → 미리 보기 표(# · SKU · Ordered · Result · Reserved · Backorder · Preorder · Will split off · Backorder lines ended here: N) → Proceed → Done. · Backorders 화면(7-j)과 같은 창구
[ ] ⭐ [v2.3] 잡힐 것이 하나도 없으면 Proceed 가 **막히고** 「Nothing can be reserved yet — … Proceed does not wait for stock」이 뜬다(걸어 두면 들어올 때 잡힌다는 오해를 막는다)
[ ] Divide… → 줄마다 Move 수량(전부 또는 일부) → Check → 표(Moves · whole line · Reservation 이 따라가는 수량) · 「New order: SO-…」 → Divide → 형제(manual split)가 뭉치 표에 선다 · 머리는 이 오더 것을 그대로
[ ] Change warehouse… → Move to(다른 창고) → Preview → 「from → to」 + 결과 표(예약을 풀고 새 창고에서 다시 잡는다 · 모자란 몫은 백오더 형제 · 예약이 없으면 「no reservations to move」) → Change warehouse
[ ] Merge…(초안·확정 · warehouse) → 같은 손님·창고·통화의 draft·confirmed warehouse 오더 표(이 오더는 미리 체크) · 둘 이상 골라야 Preview → Orders · Header from(가장 오래된 원본) · Order date(합친 날) · 머리 차이 표 · 줄(받은 가격 그대로 · kept apart 사유 · free) · 경고(charges_not_merged · head_differs · backorder_siblings_stay_open · preorder_lines_need_reflag · superseded_not_reopenable 이 사람 말로) → Merge → 새 초안으로 화면이 옮겨 간다 · 되돌리기 없음
[ ] ⭐ 병합 미리 보기와 **병합으로 만든 초안**의 머리 밑에 「today's quote would be better for: line N SKU 가격 → 견적가 · SKU as one line of N → 견적가」 알림(so_merge_requote_hint) — 저절로 바뀌지 않는다 · 줄을 손으로 고쳐야

counter 확정 · 나갔다 (manager)
[ ] Counter 오더의 Confirm → 확인 창(「Every line is reserved as it is — counter orders never split or backorder.」) → 재고를 보지 않고 전 줄 reserved · 형제 없음
[ ] Reopen as draft → draft 로 돌아오고 예약이 풀린다(worker 는 거부)
[ ] Hand over — ship and invoice… → 줄마다 To ship · Bin(지금 재고 있는 칸이 미리 채워짐) · Qty · From · + bin 으로 칸을 나눈다
[ ] ⭐ 목표보다 적게 보내려 하면 거부된다(counter 는 백오더 없음 — 줄이려면 다시 열어 줄을 고친다)
[ ] Ship and invoice → shipped 와 발행이 한 번에 · 인보이스 번호(60000~)와 받은 금액·미수가 보인다 · 이 오더를 대상으로 적어 둔 선결제가 저절로 붙는다

결제 넣기 (sales)
[ ] Take a deposit…(draft·confirmed) / Take a payment…(발행 뒤) → Method · Amount(남은 금액이 미리 들어 있다) · Paid on(오늘 · 미래 불가) · Reference · Account · Note
[ ] ⭐ [v1.2] 인보이스를 **다 받았으면** Take a payment… 단추가 숨는다(누르면 넣을 곳 없는 돈이 손님 잔액으로 가던 자리 · Caleb 화면 시험 2026-09-25)
[ ] ⭐ [v1.1·v1.2] 상세의 Invoice 표: Number(링크 → so-invoices.html?inv=…) · Status · Issued · Due · Total · **Due at issue**(종이에 찍힌 값) · Paid · Still owed(오늘 값) — 재발행 사슬의 옛 장도 같은 표에 링크로
[ ] [v1.1] so_copy_customer 의 경고(bill_to_empty 등 일곱)가 코드가 아니라 사람 말로 보인다
[ ] Method 를 바꾸면 「Default account: …」 힌트가 바뀐다 · 기본 계좌가 없는 조합이면 「pick one」이라 말하고 고르게 한다
[ ] Record payment → 저장되고 상세의 받은 금액·잔액이 바뀐다 · 초안에 넣은 선결제는 발행 때 auto_deposit 로 붙는다

취소 · 뭉치
[ ] Cancel order… → 사유 필수 · Check → 이 오더가 이어받은 백오더 줄이 있으면 목록이 뜨고 「다시 열까」를 골라야 넘어간다 → Cancel the order
[ ] 형제(백오더 a · 프리오더 b · 나눈 것)는 뭉치 표에 번호·상태·남은 수량으로 보이고, 합쳐진 오더는 merged_into 로 어디로 갔는지 답한다
창고로 보내기 · 거둬들이기 (v2.4 · 창구 so_release_to_wms · so_wms_recall)
[ ] 창고(warehouse) 길의 Confirmed 오더에 Release to WMS 가 보인다 → 누르면 Released to WMS(at_wms) · 그 자리에 Recall from WMS 단추
[ ] 보류 중(on hold) · 백오더 · 선주문 줄이 있으면 Release 가 막혀 있고 까닭이 뜬다
[ ] Recall from WMS → Confirmed 로 돌아온다
[ ] 창고가 일을 시작했으면(picking) Recall 이 막혀 있다
[ ] sales 쓰기가 없는 사람에게는 Release · Recall 둘 다 안 보인다
[ ] 빌드 표시 so v2.4
```

⭐ [2026-09-28 · 대화 Claude · 오피스 판] **so v2.5**(b693d8c · 판정 17 글자 · Qty out · 시각 줄 · Finalized 필터 판정 46 · 검토함 읽기) → **so v3**(f73b980 · Finalize 창) · 마이그레이션 0 · 정본 so-module §24-s
   뒷단 더한 것: 읽기 `wms_so_handoff(p_so_id)`(asung-wms 20260926204246:142 · 팔렛 · 박스 in · lb · shorts) · 표 `wms_order_finalize` · `wms_order_review`(select · 읽기) · `ims_staff(id,name)`(시각 줄 이름) · 쓰기 `so_finalize(p_orders, p_commit, p_shipped_on)`(:259 · sales)
   ⚠️ so_finalize 는 handoff 의 picks 만 읽는다 — 치수는 화면이 wms_so_handoff 로 따로 보인다 · packed 오더의 운임은 이 창에서만(so_charge_set 은 draft 전용)
   ⚠️⚠️ v3 실행은 **되돌릴 수 없다** — 원장 차감(inv_post_sale) · 인보이스 번호(nextval) · packed 재료를 소진한다 ⇒ 시험 순서 = v2.5 · Purchase Receipts 경고 → v3 미리 보기 → **맨 마지막에** 실행 → 확인 쿼리(읽기) · 다음 packed 재료는 새 오더로 한 바퀴(정본 §24-q)
```
so v2.5
[ ] 빌드 표시가 so v2.5 이후(지금 「2026-09-28 · so v3」)
[ ] 목록 · 상세 · 뭉치 표의 상태가 판정 17 글자 — Draft · Confirmed · Released to WMS · Working · Finalized · Shipped · Fulfilled · Cancelled(저장값 packed 는 「Finalized」)
[ ] Status 필터(넓은 · 좁은 목록 둘 다)에 「Finalized — waiting for the office」 — packed 창고 오더만 뜬다(판정 46)
[ ] 확정 뒤 줄 표 머리가 「Qty out」(전 「Shipped」)
[ ] 창고 길 오더의 상세 오른쪽에 시각 줄 셋 — Released to WMS · Working · Finalized(토론토 시각 + 이름) · 되돌려 지워진 칸은 「—」 · counter · POS 오더엔 안 뜬다
[ ] Finalized 줄 아래 packing list / direct · 유닛 수 · 치수 없는 유닛(빨강) · 검토함(창고 매니저가 켠 것 · 읽기만 · 켜고 끄는 곳은 WMS Admin Finalized 탭)
so v3 — Finalize 창
[ ] packed 오더 상세에 「Finalize — ship and invoice…」(sales 쓰기가 있을 때만)
[ ] 창을 열면 팔렛 · 박스 표(in · lb · 항목 수) · 치수 없음이면 「⚠ N unit(s) have no dimensions — ask the warehouse before quoting freight.」 · 덜 싼 줄이면 「⚠ Packed less than ordered: SKU n of m — the rest goes to a backorder order.」
[ ] 운임 이름 · 금액(비우면 운임 줄 없음 · 「No freight line.」) · 택배사 · 추적번호 · 배송 메모
[ ] 미리 보기가 한 번 저절로 돈다 — 「Preview ready — nothing has been saved yet.」 · 아무것도 안 바뀐다(번호 무변)
[ ] 입력을 바꾸면 실행 단추가 꺼진다 · Preview 를 다시 눌러야 켜진다 · 바뀐 입력으로 누르면 「Preview again first — the inputs changed.」
[ ] 실행 → 확인 창 「Finalize SO-…? … This cannot be undone.」 → 결과 = 인보이스 번호 · amount due · remaining · 백오더 번호(모자란 몫) · warnings
[ ] 📌 줄 빼기(removed · 손님이 뺐다)는 이 판에 없다(⬜ 다음 판)
[ ] ⭐ Caleb(admin) 시험 2026-09-28 — SO-25003 실행 ✅ · 확인 쿼리: SO-25003 fulfilled · shipped t · closed t / SO-25003a cancelled / SO-25003b confirmed(모자란 1) · inv_ledger sale_out C070303 CON00156 −11 ims · so_invoice_number_seq 60002 — Cin7 없이 IMS 만으로 닫힌 첫 창고 오더
```
⬜ Finalize 창의 줄 빼기(removed · 판정 9) · 견적서(so_proforma) 인쇄 단추 · 판정 17 표 공통화(ims-ui.js · manager-list · pos · so-backorders · 0-a 재점검)

⚠️ [2026-09-25 밤] 아직 없는 것 — Release to WMS(단추 자리만) · 오피스 마무리(so_finalize) · 인쇄 · 손님 잔액 화면 (정본 §14~§21). 보류·나누기·창고 바꾸기·백오더 진행·병합은 2판(v2)으로 섰다 · 백오더 목록은 so-backorders.html(7-j) · POS 계산대는 pos.html(7-k) · 「재고 없이 나갔다」 관리는 manager-list.html(7-l)로 섰다. → ✅ [2026-09-26] Release to WMS · Recall from WMS 는 v2.4 로 섰다 → ✅ [2026-09-28] 오피스 마무리(so_finalize)는 v3 로 섰다 · 인쇄 · 손님 잔액 화면은 그대로

---

## 7-g. `so-invoices.html` — 판매 인보이스 (2026-09-25 신설 · 대화 Claude · 「2026-09-25 · inv v1」 → v1.1(계좌 이름 · 결제 날짜 링크 · 다 받으면 결제 단추 숨김 · Due at issue 줄) → **v1.2**(Raise a credit note… · 크레딧 번호 링크))

뒷단: 읽기 뷰 `so_invoice_list`(PostgREST · range · search_text) · RPC `so_invoice_detail` · `so_invoice_ar_summary` — asung-wms `20260925191843`(so-inv-read-1) ·
쓰기 RPC `so_payment_add`(새 결제 · 이 인보이스에 붙는다 · sales) · `so_payment_detach`(manager) · `so_invoice_cancel`(manager · 사유 필수) · `so_invoice_reissue`(manager) — 정본 §17~§19.

⭐⭐ **남은 금액 · 받은 돈 · 연체 일수는 DB 가 준다**(`so_invoice_remaining` 한 곳) — 화면이 다시 계산하지 않는다. Still owed = total − 결제 붙임 − 크레딧 붙임.
⭐ 인쇄는 다음 판(Print 단추 회색 · Caleb 2026-09-25) · 받아 둔 돈을 손으로 붙이기 · 크레딧 붙이기는 Customer Payments · Credit Notes 화면에서(아직 없음).
⚠️ 권한: 결제 넣기 = sales 열쇠 · 떼기 · 취소 · 재발행 = manager 이상(단추가 manager 에게만 뜬다).
⚠️ 모집단(테스트 DB · 2026-09-25 실측): 인보이스 **1장** — 60000(issued · Clore Inc. (BLW) · total 176.30 · 선결제 100 auto_deposit · Still owed 76.30 · 기한 2026-10-25). 검증 자료(79001~)는 전부 rollback 이라 **안 보인다**.

```
공통 · 목록
[ ] 탭 줄에 Sales Invoices 가 Sales Orders 뒤에 있고 이 화면에서는 눌리지 않는다 · 구매도 보는 사람이면 PURCHASING · SALES(눌림) 묶음 칸
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · inv v1.2」다
[ ] 넓은 목록(처음 화면): Show(Open — still owed 기본 · Overdue · Open with no due date · Paid in full · Cancelled · All) · 검색(Invoice · customer · SO number · reference) · Clear
[ ] 열 순서: Invoice · Status · Issued · Due · Customer · Orders · Total · Paid · Credited · Still owed
[ ] 60000 한 행: issued · Clore Inc. (BLW) · Orders SO-25000 · 176.30 · Paid 100.00 · Credited 0 · Still owed 76.30 · 연체 칩 없음(기한 전)
[ ] 검색에 SO-25000 을 치면 60000 이 찾힌다(뷰의 search_text — 오더 번호·ref 까지) · Paid in full 로 바꾸면 0행 · Cancelled 0행
[ ] Overdue 로 바꾸면 연체 일수 큰 순으로 정렬된다(지금은 0행)
[ ] 행을 누르면 좁은 목록 + 상세 · ‹ All invoices 로 돌아온다 · ☰ List 로 접고 편다 · 탭 줄이 있어도 목록이 밀리지 않는다(--ims-tabs-h)

미수 요약(넓은 목록 머리)
[ ] 통화별 한 줄: Still owed(open 수) · Overdue(inv 수) · Not yet due · 1–30 days · 31–60 · 61–90 · Over 90 · (있으면) No due date · 「As of <오늘> (Toronto) · overdue counts days past the due date.」
[ ] 지금 값: CAD Still owed 76.30 · 1 open · Overdue 0 · Not yet due 76.30 · 나머지 0 · No due date 칸은 안 뜬다(0이면 숨긴다)
[ ] 버킷 합 + No due date = Still owed(DB 가 그렇게 준다 · so_invoice_ar_summary)

한 장(상세)
[ ] 머리: 번호 · 상태 칩 · 발행일 · 기한(연체면 「N days overdue」 칩) · 청구처 · 결제조건 · 통화 · Cancelled(취소면 시각 + 사유)
[ ] 합계 칸: Lines · Order discount · Charges · Tax · Total · Deposit applied · Credit applied · Balance forward · Amount due(종이에 찍힌 값) · Still owed(오늘 값 · 연체면 노란 경고)
[ ] 기한이 없는 인보이스(결제조건 없음)는 「⚠ No due date …」 경고가 뜨고 연체로 세지 않는다(지금 실물엔 없다 — 만들어 보기 전엔 못 본다)
[ ] Orders on this invoice: SO 번호 링크(so.html?so=…) · 상태 · 배송지 · 세금 규칙·세율 · 취소된 걸림은 「detached」 태그
[ ] Lines: line_no 순 · kind(product · charge · order_discount) · SKU · 수량 · 단가 · 금액 · 세금
[ ] Payments: 붙임마다 날짜 · 방법 · 참조 · 계좌 · 붙인 몫 · 결제 금액 · 결제의 남은 금액 · 출처(manual · auto_deposit · auto_balance) · 떼어진 것은 「detached <시각> · 사유」로 남는다
    지금 값: 60000 에 100.00 wire auto_deposit + 76.30 cash manual 두 줄(Still owed 0)
[ ] ⭐ [v1.1] 결제 줄의 계좌가 **코드가 아니라 이름**으로(_105_ → BMO CAD CHEQUING 류 · 이름 찾기는 전 계좌 · 고르기는 활성 BANK 또는 _5_) · 결제 **날짜가 링크**(→ so-payments.html?pay=…)
[ ] ⭐ [v1.1] 합계 아래 「Due at issue <amount_due> — deposit applied · credit applied · money on account」 한 줄이 종이 값과 오늘 값을 가른다
[ ] Credits applied · Returns against this invoice · Other invoices for these orders(재발행 사슬) · Customer balance(통화 · 받아 둔 돈 · 진 빚 · 예약 · 가용)는 **있을 때만** 표가 뜬다
[ ] ⭐ [v1.2] 살아 있는 인보이스에 **Raise a credit note…**(manager 만 · 링크 → so-credits.html?inv=<id> · Credit Notes 화면이 준비물을 읽고 새 크레딧 창을 연 채로 뜬다)
[ ] ⭐ [v1.2] Credits applied · Returns against this invoice 표의 **크레딧 번호가 링크**(→ so-credits.html?cr=CR-…)
[ ] 없는 id 로 열면(?id= 를 틀리게) 「없다」로 가른다(DB 가 null 을 준다)

결제 넣기 (sales)
[ ] Take a payment… → Method · Amount(Still owed 가 미리 들어 있다) · Paid on(오늘 · 미래 불가) · Reference · Branch(비우면 손님 기본) · Account(기본 계좌 힌트) · Note
[ ] ⭐ [v1.1] Still owed 가 0 이면(다 받음) Take a payment… 단추가 **숨는다** — 지금 실물 60000 이 그렇다(단추 없음)
[ ] Record payment → 저장되고 Payments 표에 한 줄 · Still owed 가 준다 · 요약 머리도 준다
[ ] ⭐ Still owed 보다 많이 넣으면 넘친 몫은 손님 잔액(받아 둔 돈)으로 남는다 — DB 가 정한다 · 화면은 그대로 보인다

떼기 · 취소 · 재발행 (manager)
[ ] Payments 표의 × → 사유(필수) → 결제는 남고 손님 계정으로 돌아간다 · 그 줄은 「detached」로 남는다 · Still owed 가 는다
[ ] Cancel invoice… → 사유(필수) → cancelled · 오더는 shipped 로 돌아간다 · 자동으로 붙었던 결제는 함께 풀린다 · 손으로 붙인 것이 있으면 DB 가 「먼저 떼라」로 거부
[ ] 취소된 장에서 Reissue… → 확인(「dated today (Toronto) · Tax rates are taken as of today」) → 새 번호(60001~)로 다시 서고 옛 장은 cancelled 로 남는다 · 새 장의 「Other invoices for these orders」에 옛 장이 보인다
[ ] worker 에게는 Cancel · Reissue · × 가 아예 안 보인다
```

⚠️ [2026-09-25] 아직 없는 것 — 인쇄(PDF) · pg_trgm 검색 인덱스(정본 ⬜). 받아 둔 돈 손으로 붙이기(so_payment_attach) · Customer Payments 화면은 7-h · 크레딧 붙이기 · Credit Notes 화면은 7-i 로 섰다.

---

## 7-h. `so-payments.html` — 손님 결제 (2026-09-25 신설 · 대화 Claude · 1판 「2026-09-25 · pay v1」)

뒷단: 읽기 뷰 `so_payment_list`(PostgREST · range · search_text) · RPC `so_payment_detail` — asung-wms `20260925195701`(so-pay-read-1) ·
쓰기 RPC `so_payment_add`(받아 둔 돈 · sales) · `so_payment_refund`(manager) · `so_payment_attach`(sales) · `so_payment_propose`(제안 · 읽기) · `so_payment_detach`(manager) · `so_payment_void`(manager) — 정본 §18 · §19.

⭐⭐ **결제 남은 금액 = `so_payment_remaining` 한 곳**(뷰가 부른다) · 인보이스 남은 금액 = `so_invoice_remaining` — 화면이 다시 계산하지 않는다.
⭐ 환불은 붙일 돈이 아니다 — Not attached 가 비고 「크레딧이 갚은 몫 · 받아 둔 돈에서 나간 몫」 두 칸으로 보인다(§19 0-9). Held for orders = 대상 오더에 걸려 발행을 기다리는 돈(손님 잔액 available 에서 빠진다 · 발행 순간 저절로 붙는다).
⭐ 특정 인보이스에 받는 것은 Sales Invoices 에서 · 특정 오더의 선결제는 Sales Orders 에서 — 이 화면의 「Record a payment」는 **받아 둔 돈**(인보이스 없이)이다.
⚠️ 권한: 받기 · 붙이기 = sales 열쇠 · 환불 · 떼기 · 취소(void) = manager 이상(Refund… 단추 · Void · detach 가 manager 에게만).
⚠️ 모집단(테스트 DB · 2026-09-25 실측): 결제 **2건**(Clore Inc. (BLW) · CAD · 2026-09-25 · 참조 없음) — wire 100.00(60000 에 auto_deposit · 대상 SO-25000) · cash 76.30(60000 에 manual). 둘 다 Attached = Amount · Not attached 0.

```
공통 · 목록
[ ] 탭 줄에 Customer Payments 가 Sales Invoices 뒤에 있고 이 화면에서는 눌리지 않는다 · 구매도 보는 사람이면 PURCHASING · SALES(눌림) 묶음 칸
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · pay v1」다
[ ] 넓은 목록(처음 화면): Show(Active 기본 · Not attached — money on account · Held for orders · Refunds · Voided · All) · Method(All methods + 여덟) · 검색(Reference · customer · invoice · SO number · note) · Clear · Refund…(manager 만) · + Record a payment
[ ] 열 순서: Paid on · Status · Customer · Method · Reference · Account · Amount · Attached · Not attached · Invoices · orders
[ ] 실물 두 줄: wire 100.00 Attached 100.00 Not attached 0 · Invoices 60000 · orders SO-25000 / cash 76.30 Attached 76.30 · 60000 · Account 는 코드가 아니라 이름
[ ] Not attached 로 바꾸면 0행(둘 다 다 붙었다) · Held for orders 0행 · Refunds 0행 · Voided 0행 · All 2행
[ ] 검색에 60000 을 치면 둘 다 · SO-25000 을 치면 wire 하나(대상 오더는 wire 만) — 뷰의 search_text(참조 · 손님 · 인보이스 · 오더 · 방법 · 계좌 코드 · 메모)
[ ] 행을 누르면 좁은 목록 + 상세 · ‹ All payments · ☰ List · 탭 줄이 있어도 목록이 밀리지 않는다(--ims-tabs-h)

받아 둔 돈 넣기 (sales)
[ ] + Record a payment → 손님을 이름으로 고른다 → Method · Amount · Paid on(오늘 · 미래 불가) · Reference · Branch(비우면 손님 기본) · Account(기본 계좌 힌트 · 없는 조합이면 고르게) · Note → Record payment(손님을 고르기 전엔 눌리지 않는다)
[ ] 넣으면 목록에 Not attached = Amount 로 서고, 그 손님의 다음 인보이스 발행 때 저절로 붙는다(auto_balance · DB)
[ ] USD 손님(Xeonium 류)은 방법에 따라 기본 계좌가 없어 「pick the account」가 뜬다(§18-a 판정 2)

환불 (manager)
[ ] Refund… → 손님 → Method · Amount · Paid on · Reference · Branch · Account(**필수** — 「pick the account the money leaves from」) · Note → Record refund
[ ] 받아 둔 돈 + 진 빚(크레딧)보다 많으면 DB 가 거부하고 문장이 얼마까지인지 말한다 · 크레딧이 있으면 크레딧부터 갚는다(상세 「Credit notes this refund paid off」)
[ ] 환불 줄: Status refund · Attached — · Not attached 비어 있음 · 상세에 크레딧이 갚은 몫 · 받아 둔 돈에서 나간 몫

한 건(상세)
[ ] 머리: 날짜 · 상태 칩 · 손님 · 방법 · 참조 · 계좌(이름) · 브랜치 · 금액 · Attached · Not attached · Held for orders · 넣은 사람 · 메모 · void 면 시각 + 사유
[ ] Attached to invoices: 인보이스(링크 → so-invoices) · On this invoice · Invoice total · How it attached(manual · auto_deposit · auto_balance) · When · 떼어진 줄은 남되 「detached」
    지금 값: wire → 60000 100.00 auto_deposit · cash → 60000 76.30 manual
[ ] Held for orders: 대상 오더(링크 → so.html) · 상태 · 발행됐나 — wire 에 SO-25000(fulfilled · 발행됨)
[ ] Open invoices of this customer(붙일 돈이 있을 때만 · 같은 통화): Invoice · Issued · Due · Orders · Still owed — 지금 실물엔 없다(Clore 미수 0)
[ ] Customer balance: 통화 · Money on account · Credit owed · Held for orders · Available — Clore CAD 전부 0
[ ] 없는 id(?pay= 틀리게)는 「없다」로 가른다

붙이기 · 떼기 · 취소 (sales / manager)
[ ] Not attached > 0 인 결제에 Attach to invoices… → 같은 손님·같은 통화의 미수 인보이스 표(Still owed · Attach 칸) · Suggest (oldest first)(so_payment_propose · 오래된 것부터 금액을 채운다 · 사람이 고친다) → Attach → so_payment_attach
[ ] 인보이스 Still owed 보다 · 결제 Not attached 보다 많이 넣으면 DB 가 거부한다(한도 셋)
[ ] Attached to invoices 표의 detach(manager) → 사유(필수) → 돈이 받아 둔 돈으로 돌아간다 · 줄은 「detached」로 남는다
[ ] Void payment…/Void refund…(manager) → 사유(필수) → status voided · 붙은 것이 있으면 DB 가 「먼저 떼라」로 거부 · 환불 취소는 그 환불이 갚은 크레딧 몫이 함께 풀린다 · 지우지 않는다
[ ] worker 에게는 Refund… · Void · detach 가 아예 안 보인다
```

⚠️ [2026-09-25] 아직 없는 것 — 손님별 잔액 화면 · 영수증 인쇄 (정본 §18-g · §19-g). 크레딧 노트 화면(7-i) · 백오더 화면(7-j)은 같은 날 밤 섰다.

---

## 7-i. `so-credits.html` — 크레딧 노트 (2026-09-25 신설 · 대화 Claude · 「2026-09-25 · cr v1」 → **v1.1**(상세 Tax — 머리 세율이 비면 줄의 세율))

뒷단: 읽기 뷰 `so_credit_list` · `so_invoice_list`(새 크레딧의 인보이스 찾기) · RPC `so_credit_detail`(키 넷 더한 판) · `so_credit_prepare`(준비물) — asung-wms `20260925205011`(so-credit-read-1) ·
쓰기 RPC `so_credit_issue`(manager · 미리 보기 p_commit false) · `so_credit_attach`(sales) · `so_credit_detach`(manager) · `so_credit_cancel`(manager) — 정본 §19.

⭐⭐ **크레딧 남은 금액 = `so_credit_remaining` 한 곳** · 「더 돌려받을 수 있는 수량」 · 돌려놓을 칸 기본 = `so_credit_prepare`(발행 창구와 같은 식) — 화면이 다시 계산하지 않는다.
⭐ 단가 · 세율은 인보이스 줄에서 굳는다 — 화면은 보내지 않는다 · 금액 · 세금 · 수수료 제안은 **미리 보기**가 준다 · 같은 p 로 발행(issue_contract 그대로: p = {issued_on, reason, note, invoice_id, warehouse_id, lines[]}).
⭐ 이번 판은 **IMS 인보이스의 반품만**(Caleb 2026-09-25) — Cin7 판매 반품은 전환 전 다음 판 · 환불은 Customer Payments 의 Refund · 인쇄는 다음 판(Print 회색).
⚠️ 권한: 발행 · 취소 · 떼기 = manager 이상(+ New · Cancel credit note… · detach 가 manager 에게만 · 진짜 문은 DB) · 붙이기 = sales 열쇠.
⚠️ 모집단(테스트 DB · 2026-09-25 실측): 크레딧 **0장**. 검증 자료(CR-79001~)는 전부 rollback 이라 안 보인다 — 첫 실물은 CR-01000 이 된다(시퀀스 1000 · is_called f).

```
공통 · 목록
[ ] 탭 줄에 Credit Notes 가 Customer Payments 뒤에 있고 이 화면에서는 눌리지 않는다 · 구매도 보는 사람이면 PURCHASING · SALES(눌림) 묶음 칸
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · cr v1.1」다
[ ] 넓은 목록(처음 화면): Show(Open — not used up 기본 · Issued · Cancelled · All) · 검색(Credit · customer · invoice · reason · note) · Clear · + New credit note(manager 만)
[ ] 열 순서: Credit · Status · Issued · Customer · For invoice · Reason · Total · Applied · Refunded · Remaining
[ ] 지금은 0행 — 「비어 있음」이 문장으로 보인다(오류 아님)
[ ] 행을 누르면 좁은 목록 + 상세 · ‹ All credit notes · ☰ List · 탭 줄이 있어도 목록이 밀리지 않는다(--ims-tabs-h)

새 크레딧(manager) — 인보이스에서 낸다
[ ] + New → 인보이스를 번호 · 손님 · SO 번호로 찾는다(so_invoice_list · issued 만) → 고르면 so_credit_prepare 가 준비물을 읽어 창이 채워진다
[ ] Sales Invoices 의 「Raise a credit note…」로 오면(?inv=<id>) 그 인보이스가 미리 골라진 채로 창이 열린다(manager 가 아니면 안 열린다)
[ ] 머리: Reason(customer_return · damaged · billing_error · other) · Note(Other 면 필수) · Credit date(오늘 · 미래 불가) · Goods come back to(원판매 창고가 기본)
[ ] 제품 줄 표: # · Item · Sold · Credited(issued 크레딧이 이미 돌려받은 수량 · 취소는 안 센다) · Can return(= Sold − Credited) · Unit · Return(입력) · Back to stock(to bin + 칸 기본값 미리 채움 | not restocked · damaged/b_grade/not_returned/other(+note))
[ ] ⭐ Can return 보다 많이 적으면 DB 가 거부하고 문장이 「only N can still be returned」를 말한다(화면은 막지 않는다 · 창구가 정본)
[ ] 운임 줄 표: Charge · On invoice · Already credited · Credit(입력 · 남은 몫까지)
[ ] Charge a fee 체크(판 지 60일 넘으면 미리 켜져 있다 · restock_fee.applies) · Fee account(설정이 비어 있어 「— pick an account」 · 안 고르면 DB 가 거부) · 수수료 금액은 미리 보기가 제안한다(20%)
[ ] Other 줄(Description · Amount · account 필수) — 가격 정정·굿윌
[ ] Preview → 줄마다 금액 · 세금(인보이스 줄의 단가·세율) · totals(lines · fee(≤ 0) · tax · total) · fee_suggested · warnings(restock_fee_window:N · fee_rate_mixed …) — **아무것도 저장되지 않는다** · Issue credit note 는 Preview 뒤에만 눌린다
[ ] Issue credit note → CR-01000 부터 · 돌아오는 줄은 원장 credit_in(Stock back 표) · 진 빚(Customer balance · Credit owed)이 는다
[ ] 같은 p 로 두 번 누르면 두 번째는 Can return 초과로 거부된다(창구가 막는다)

한 장(상세)
[ ] 머리: 번호 · 상태 칩 · 발행일 · 손님 · For invoice(링크 → so-invoices.html?inv=…) · 사유 · 메모 · 창고 · Total · Applied · Refunded · Remaining
[ ] 오른쪽 kv 의 Tax(v1.1): 머리에 tax_rule 이 있으면 그 이름(+세율 %) · **IMS 인보이스에서 낸 크레딧은 머리가 비어 있다**(세율은 인보이스 줄에서 줄마다 굳는다) → 줄의 세율을 모아 「13% · from the invoice lines」로 보인다(여러 세율이면 「 · 」로 잇는다) · 줄에도 없으면 「—」(Caleb 화면 시험 2026-09-25 · 옛 「Tax rule」 줄은 머리가 비면 빈칸이었다)
[ ] Lines: # · Kind(product · freight · tax · other · restocking_fee) · Item · Qty · Stock(칸 | not restocked 사유) · Unit · Amount · Tax · Account
[ ] Used on: 인보이스(링크) 또는 환불 결제(날짜 · 방법 · 참조) · Amount · How(manual · auto) · When · 떼어진 것은 「detached」로 남되 표에 보인다
[ ] Open invoices of this customer(Remaining > 0 이고 살아 있을 때만 · 같은 통화 · 오래된 순): Invoice · Issued · Due · Orders · Still owed · From this credit(이미 붙인 몫)
[ ] Stock back(돌아온 줄이 있을 때만): Date · SKU · Warehouse · Bin · Qty
[ ] Customer balance: 통화 · Money on account · Credit owed · Held for orders · Available · Open invoices

붙이기 · 떼기 · 취소
[ ] Remaining > 0 인 크레딧에 Attach to invoices…(sales) → 같은 손님·통화의 미수 인보이스 표(Still owed · Attach 칸) · Fill oldest first(남은 몫을 위에서부터 나눠 적는 입력 도우미 · 한도 검사는 DB) → Attach → so_credit_attach
[ ] 인보이스 Still owed 보다 · 크레딧 Remaining 보다 많이 넣으면 DB 가 거부한다
[ ] Used on 표의 detach(manager · 인보이스 붙임만 — 환불에 쓰인 몫은 떼지 못한다) → 사유(필수) → 진 빚으로 돌아간다 · 줄은 「detached」
[ ] Cancel credit note…(manager) → 사유(필수) → 붙은 것이 있으면 DB 가 「detach it first」 · 돌아온 재고가 이미 팔렸으면 거부 · 취소되면 Stock back 이 반대 사건으로 나간다(Stock back 표에 −) · 번호는 남는다
[ ] worker 에게는 + New · Cancel · detach 가 아예 안 보인다 · 붙이기는 sales 열쇠가 있어야
```

⚠️ [2026-09-25] 아직 없는 것 — 인쇄(PDF) · Cin7 판매 반품(오더 번호로 되짚기 · 줄 손으로 · 창구 cin7{…} 은 있다) · B급 칸 · 손님별 크레딧 잔액 화면 (정본 §19-g).

---

## 7-j. `so-backorders.html` — 백오더 (2026-09-25 밤 신설 · 대화 Claude · 「2026-09-25 · bo v1」 → v1.1(다른 창고 가용을 이름별로) → v1.2(무상 줄 필터 칸 없앰 · 요약 숫자로 거른다) → **v1.3**(잡힐 것 없으면 진행 막힘))

뒷단: 읽기 RPC `so_backorder_list(p_filters jsonb)` — 분류 여덟 · 무상 줄(owed) · 창고별 가용 · 손님 · 제품 · 주문일 순(asung-wms `20260924153856` · 정본 §15 ③c) ·
쓰기 RPC `so_backorder_proceed(p_so_id, p_commit)` — manager · 미리 보기(false) → 진행(true) — 정본 §15.
필터 채우기: `ref_warehouse` · `supplier` · `ref_brand`(is_active · 이름순) · 손님은 `customer` 를 이름 ilike 로 60행(9,469 명이라 서버에서 찾는다).

⭐ 백오더는 **「줄」이 단위**다 — 오더를 나눈 형제(SO-25001a)의 열린 backorder 예약 + 끝난 장부 줄. 그래서 목록 한 장(상세 칸 없음) · 손님마다 묶어 보인다.
⭐ 입고됨(arrived) = 백오더가 생긴 뒤 그 창고에 po_in 이나 다른 창고에서 온 트랜스퍼가 있었다(조정 · 반품 · 조립 · 출발 없는 도착은 안 셈 · 판정 6·7).
⚠️ 가용 · 입고 판정 · 이어받기는 DB 가 한다 — 화면이 다시 계산하지 않는다(정렬도 창구 순서 그대로).
⚠️ 알림(notified)은 아직 IMS 가 쓰지 않는다 — 입고 메일은 GAS 가 Cin7 에서 보낸다. 화면에 알림 열이 없는 것은 「안 보냈다」가 아니다.
⚠️ 권한: proceed = manager 이상(단추도 manager 에게만 · 진짜 문은 DB) · 목록은 sales 화면 값.
⚠️ 모집단: 아직 실측 없음 — 첫 훑기 때 요약(Lines · Open · Ended · 있으면 Free lines we owe)의 수를 여기 적는다.

```
공통 · 목록
[ ] 탭 줄에 Backorders 가 Credit Notes 뒤(판매 다섯의 마지막)에 있고 이 화면에서는 눌리지 않는다 · 구매도 보는 사람이면 PURCHASING · SALES(눌림) 묶음 칸
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · bo v1.3」다
[ ] 필터 줄 순서: State(Open backorders 기본 · Ended · All) · Branch(All branches + 창고) · 손님 단추(All customers) · Default supplier(All suppliers · No default supplier · 공급처들) · Brand · SKU starts with · Arrived(any · Arrived since · Not arrived yet) · Ordered from — to · How it ended · Clear
    ⭐ [v1.2] Free lines 필터 칸은 **없앴다**(Caleb 「실제로는 거의 없는 상황이라」) — 무상 줄은 요약 숫자로 거른다(아래)
[ ] How it ended(Taken over by a new order · Proceeded · Expired · Cancelled · Merged)는 State 가 Open 이면 **숨는다** · Ended · All 에서만 보인다
[ ] 요약: Lines · Open · Ended — 필터에 따라 바뀐다 · ⭐ [v1.2] 「Free lines we owe」는 **1 이상일 때만** 넷째로 보이고, 이름을 누르면 그것만 거른다(「— showing only these」) · 다시 누르면 풀린다 · Clear 도 푼다(무상 백오더는 만료·이어받기로 닫히지 않아 드물어도 보이게 둔다 · §15 판정 15·16)
[ ] 열 순서: Order · Ordered · Product · Supplier · brand · Branch · Open · Waiting · Stock · State · (proceed)
[ ] 손님 이름이 묶음 행(회색 · 굵게 · 한 칸)으로 먼저 서고 그 아래에 그 손님의 줄들 — 창구가 손님 · 제품 · 주문일 순으로 준다
[ ] Order = so.html?so=번호 링크 · Product = SKU(pack_factor 가 1보다 크면 ×N) + 이름 · Supplier 가 없으면 「no default supplier」 · Open = 열린 수량 + 「of 주문 수량」 · Waiting = 「N d」
[ ] Stock(열린 줄만): 「arrived」(초록) 또는 「not yet」(회색) + 「here N · 창고이름 N · 창고이름 N」 — ⭐ [v1.1] available_other 는 숫자가 아니라 {창고 이름: 가용 EA} 라 **다른 창고를 이름별로** 보인다(v1 은 「other NaN」이었다) · 없으면 「—」
[ ] State: 열린 줄은 「open」 · 무상 줄이면 「free — we owe it」 · 끝난 줄은 회색으로 taken over · proceeded · expired · cancelled · merged + 이어받은 SO 링크 + (no longer wanted 가 있을 때) 「taken N · no longer wanted N」
[ ] 표 밑 안내문 — Arrived 의 뜻 · 「Here = … then each other branch by name (EA)」 · 「Mail notices are still sent from Cin7」
[ ] 맞는 줄이 없으면 「No backorders match.」(오류 아님) · 창구 오류면 빨간 문장
[ ] 페이지 100줄 · ← → · 「a–b / total」 · 필터를 바꾸면 첫 페이지로
[ ] Clear → 모든 필터 비움 · State 는 Open · 손님은 All customers · How it ended 숨김 · 무상 줄 거르기도 풀림
[ ] ?customer=<uuid> · ?sku=ABC 로 들어오면 그 손님(단추 글자가 이름) · 그 SKU 가 걸린 채 열린다

손님 고르기
[ ] All customers 단추 → 모달 「Backorders of one customer」 · 이름으로 검색(치면 찾는다 · 60행) · 고르면 단추 글자가 손님 이름이 되고 목록이 다시 읽힌다
[ ] 모달의 All customers → 손님 조건 풀림 · Cancel · Esc 로 닫힌다

진행(manager) — 재고가 들어온 백오더를 지금 잡는다
[ ] 열린 줄에만 proceed 단추 · worker 에게는 아예 안 보인다
[ ] 누르면 모달 「Proceed SO-… — reserve stock that is here now」 · 먼저 미리 보기(p_commit false — 창구가 트랜잭션 안에서 돌리고 되돌린다 · 아무것도 안 쓴다)
[ ] 미리 보기 표: # · SKU · Ordered · Result(kind) · Reserved · Still backordered(0 이면 회색) · 형제가 갈리면 「Will split off: SO-… 사유」 · 「Nothing is saved until you press Proceed. Backorder lines ended here: N」
[ ] Proceed 는 미리 보기가 온 뒤에만 눌린다 → p_commit true → 표가 결과로 바뀌고 「Done.」 · 「Split off:」 · 아래에 「Proceeded.」 · Cancel 이 Close 로 바뀌고 닫으면 목록을 다시 읽는다
[ ] ⭐ [v1.3] 미리 보기에서 **잡힐 줄이 하나도 없으면(Reserved 전부 0) Proceed 가 막힌 채**로 「Nothing can be reserved yet — … Proceed does not wait for stock: press it again after stock arrives」가 뜬다(「스탁이 들어오면 자동으로 reserve 한다」는 오해를 막는다 · so.html 의 Proceed backorder… 와 같은 문장)
[ ] 창구가 거부하면(권한 · 상태) 문장이 모달 안에 뜨고 Proceed 가 다시 눌린다
```

⚠️ [2026-09-25] 아직 없는 것 — 알림(notified) 표시 · 보내기(입고 메일은 GAS·Cin7) · so.html 의 「백오더 진행」 단추(자리만 · 이 화면의 proceed 가 대신한다) · 인쇄 (정본 §15).

---

## 7-k. `pos.html` — POS 계산대 (2026-09-25 밤 신설 · 대화 Claude · 1판 「2026-09-25 · pos v1」)

뒷단(정본 6-f · ④a 판정): 읽기 `so_detail` · `so_pos_open_list(p_location_id)` · `so_pos_finish(p_commit false)`(미리 보기 = 금액·받은 돈·미수) · 표 `so`(select · 이 매장의 draft) · `customer` · `product` · `product_barcode` · `ref_warehouse` · `ref_tax_rule`(direction sale) ·
쓰기 `so_create`(channel pos · intake pos · 창고 필수) · `so_line_add` · `so_line_update` · `so_line_remove` · `so_header_update`(세금 규칙 · 판정 11) · `so_pos_confirm` · `so_pos_reopen` · `so_payment_add`(target_so_ids = 이 오더) · `so_pos_finish(p_commit true)`.

⭐ 흐름: 손님(계정 손님만 · 판정 10) → 스캔 → Confirm(금액 · 재고는 보지 않고 전부 잡는다) → 결제(그 자리에서 · 나눠 내기) → Finish(출고 + 인보이스 · 막지 않는다 · 판정 5) · Park(잠시 두기 · 새 상태 없음 · 판정 16) · 다시 열기.
⭐ 한 판 화면이다(목록/상세 두 모드가 아니다) — 왼쪽 판매 · 오른쪽 큰 금액과 단추 · 아래 「Parked and open at this store」.
⚠️ 금액 · 세금 · 받은 돈 · 미수는 DB 가 준다(so_detail · so_pos_finish 미리 보기) — 화면이 다시 계산하지 않는다.
⚠️ 권한: 전부 sales 열쇠(판정 6 · R5 의 예외) — 역할 문 없음(manager 단추 없음).
⚠️ 계산대 매장은 **기기에 기억한다**(localStorage `ims_pos_store`) — 이 기기의 편의일 뿐 · 오더의 창고는 so 에 굳는다. 다른 기기에서 열면 매장을 다시 고른다(상태 저장이 아니다).
   예외 — asung-wms `CLAUDE.md` 5절 「localStorage 에 상태를 두지 마라」의 예외(기기의 자리 · 조건 셋 · Caleb 2026-09-25). ⚠️ asung-ims 에는 CLAUDE.md 가 없다 — 규칙은 asung-wms 것을 본다.
⚠️ ☰ Menu 에만 있고 탭 줄에는 안 선다(ims-auth.js items 탭 false · 묶음 null) — 이 화면에서 탭 줄·묶음 칸이 안 뜨는 것이 정상이다.
⚠️ 모집단: 아직 실측 없음 — 첫 훑기 때 첫 POS 오더 번호(SO-25xxx · so 시퀀스 공용)와 인보이스 번호(60000~)를 여기 적는다.

```
공통 · 매장
[ ] ☰ Menu 에 POS 가 Backorders 뒤 · Staff 앞에 있고 이 화면에서는 눌리지 않는다 · 탭 줄은 없다
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · pos v1」다
[ ] 왼쪽 위 매장 select(「— this counter's store —」 + 활성 창고) · 고르면 이 기기에 기억되고 다시 열면 골라져 있다 · 아래 「Parked and open at this store」가 그 매장 것으로 바뀐다
[ ] 매장을 안 고르고 손님을 고르면 「Pick this counter's store first (top left).」로 막힌다

새 판매 · 손님
[ ] + New sale → 「Customer for this sale」 모달 → 이름으로 검색(활성 손님만 · 40행 · 티어 · 결제조건이 밑줄로) → 고르면 so_create(pos · 이 매장) → 화면이 그 오더로 바뀐다(SO-… · draft)
[ ] 손님 줄에 이름 · 티어 · 결제조건 · 오른쪽에 매장 이름 · 스캔 칸이 살아나고 포커스가 간다

스캔 · 줄 (draft 만)
[ ] 스캔 칸에 바코드 → Enter → 정확히 하나 맞으면 줄 +1(so_line_add · qty 1) · 바코드가 없으면 SKU 정확히 → 그것도 없으면 「Find a product」 모달이 그 글자로 열린다(「Nothing matched that code exactly」)
[ ] Find… → SKU · 이름으로 찾기(활성 · 세트 아닌 것만 · 40행) → 고르면 줄이 는다
[ ] 같은 SKU 를 다시 스캔하면 수량이 합쳐진다 · 다른 가격으로 이미 있으면 「already on the sale at another price — change that line's quantity instead」
[ ] 줄 표(최근 것이 위): Item(SKU · 이름 · list 가격 · −할인% · no price) · Qty(− N +) · Unit · Total · ✕ · 수량이 0 이 되면 줄이 빠진다
[ ] 경고 칩이 사람 말로(세금 규칙 없음 · 가격 없는 줄 · 티어 다름 · 청구지 없음) · 세금 규칙이 없으면 그 밑에 Tax rule select 가 뜨고 고르면 so_header_update
[ ] 오른쪽 TOTAL(큰 글자) · Items · Tax(규칙 이름 · 없으면 「no rule」) — 전부 so_detail 의 totals

Confirm · 다시 열기 · Park
[ ] Confirm — show the amount(줄이 있을 때만) → so_pos_confirm → confirmed · 재고를 보지 않고 전부 잡힌다 · 스캔 칸이 잠기고 「Confirmed — Reopen to add or change items」
[ ] 확정 뒤 오른쪽에 Paid · (있으면) Credit / on account · **To pay**(so_pos_finish 미리 보기의 amount_due) · 결제 단추 넷(Cash · Debit · Credit · e-Transfer) · Finish · Park · Reopen
[ ] Reopen to change items → 확인 창(「Payments already taken stay on it.」) → so_pos_reopen → draft 로 · 받은 돈은 남는다
[ ] Park → 화면만 비운다(새 상태 없음 · 오더는 확정 그대로 · 재고 잡힌 채) → 아래 표에 confirmed 로 남고 어느 계산대에서나 눌러 이어받는다

결제 (sales · 대상 = 이 오더)
[ ] 결제 단추 → 모달: Amount(To pay 가 미리) · Cash 면 Cash given → 거스름돈이 「change N」으로 · Reference(카드는 slip / approval no.) → Record → so_payment_add(target_so_ids = 이 오더 · 오늘 · 매장 창고)
[ ] 나눠 내기 = 결제를 두 번 넣는다 · Cash 는 받아 둔 금액을 적는다(거스름돈은 기록하지 않는다) · 넣으면 Paid · To pay 가 바뀐다
[ ] 0 이하 금액은 「Give an amount above zero.」

Finish
[ ] Finish — hand over and invoice → 미리 보기 모달: Total · Paid for this sale · (있으면) Credit / money on account used · 「Still owed — goes on the invoice N」 또는 「Nothing left to pay」 · 장부보다 많이 나가면 「N EA more than the book shows here — it still goes; the manager list will show it」
[ ] Finish → so_pos_finish(true) → 출고 + 인보이스 한 번 · 막지 않는다(미수는 인보이스에 남는다 · 결제조건 이름) → 화면 가운데에 인보이스 번호(큰 글자) · 손님 · SO 번호 · 「Paid in full」 또는 「Still owed N」 · Sales Invoices 링크(?inv=번호) · + New sale
[ ] 인쇄는 다음 판(「Printing comes in the next version」)

Parked and open at this store
[ ] 확정된 것(so_pos_open_list · Sale · Customer · confirmed · Amount · Paid · 확정한 사람)과 초안(이 매장 pos draft · 「draft — scanning」 · 만든 시각)이 한 표에 · 누르면 그 오더가 열린다
[ ] 그날 안 끝난 확정 판매는 「from YYYY-MM-DD — not finished」(stale) 로 붉게 · 안내문 「A confirmed sale not finished by the end of the day shows on the manager list.」
[ ] ?so=SO-번호 로 들어오면(channel pos 만) 그 판매가 열린다
```

⚠️ [2026-09-25] 아직 없는 것 — 영수증·인보이스 인쇄 · 현금 서랍·거스름돈 기록(거스름돈은 기록하지 않는 것이 판정) · so.html 의 Finish on POS 단추(자리만 · 이 화면이 대신한다) (정본 6-f · §18). 매니저의 「안 끝난 판매」 목록은 manager-list.html 의 POS not finished 탭으로 섰다(7-l · 같은 날 밤).
   · 사진 — 오른쪽 판 맨 위에 방금 스캔한 제품의 사진을 크게 · 그 아래 합계 · 세금 · 결제 단추 · 사진 없는 제품은 그 자리에 SKU 와 이름을 크게(Caleb 2026-09-25).
     전제: IMS 제품 마스터에 사진 칸 · Cin7 사진 파일을 우리 저장소로 복사(지금 사진은 Cin7 주소라 Cin7 을 끄면 죽을 수 있다) — 마스터 쓰기(상품 등록) 차례.

---

## 7-l. `manager-list.html` — 매니저 목록 (2026-09-25 밤 신설 · 대화 Claude · 1판 「2026-09-25 · ml v1」)

뒷단(④a 판정 7·8 — 관리 화면은 「바로잡는 곳이 어디냐」로 나눈다 · 장부·돈은 IMS 쪽 = 이 화면 · 창고 작업은 WMS 쪽):
읽기 RPC `so_stock_short_list(p_filters)`(unchecked_only · warehouse_id) · `so_pos_open_list(p_location_id)` · 뷰 `so_invoice_list`(is_open · payment_term_name · 남은 금액은 `so_invoice_remaining` 한 곳) · 표 `so`(channel counter · 최근 30일) · `ref_warehouse` · `ref_payment_term`(net_days) ·
쓰기 RPC `so_stock_short_confirm(p_doc_number, p_sku, p_warehouse, p_note)` — manager + sales|receiving · 열쇠는 doc·sku·warehouse(판정 7).

⭐ 모양은 운영 WMS admin 을 따랐다 — **탭 넷 · 배지 · 미해결은 전량 · 해결된 것은 기간**.
⭐ 탭 넷: ① Sold without stock(원장 판매 부족분 sale_shortfall) · ② Unpaid at hand-over(즉시 결제 조건인데 인보이스에 남은 돈) · ③ POS not finished(Confirm 뒤 그날 안에 Finish 안 된 POS · 판정 15) · ④ Counter orders(WMS 를 거치지 않고 나간 두 번째 길 · 6-b ③ · 최근 30일).
⭐ **즉시 결제의 정의 = `ref_payment_term.net_days` 가 0 인 결제조건 이름들**(C.B.S · C.O.D · Due on receipt 같은 것) — 시작할 때 한 번 읽어 IMMEDIATE 로 들고, 인보이스 뷰를 payment_term_name IN (…) 로 거른다. 그런 조건이 하나도 없으면 목록은 빈다(「no such term found」).
⚠️ 손님 결제조건 자료가 엉켜 있다(Net30 6,305) — 진짜 즉시 결제 손님이 정리될 때까지 Unpaid 탭은 그 자료만큼만 정확하다(잘못 있거나 빠진다). 화면 안내문에도 적혀 있다.
⚠️ 남은 금액 · 부족분 · stale 판정은 DB 가 준다 — 화면이 다시 계산하지 않는다. 확인(Mark checked)은 재고를 바꾸지 않는다 — 선반을 세고 평소 방식으로 재고를 고친 뒤 찾은 것을 적는다.
⚠️ 권한: 읽기는 sales 열쇠(메뉴 노출도 sales) · **Mark checked… 단추만 manager 이상**(진짜 문은 DB · so_stock_short_confirm) · 나머지 탭은 읽기만.
⚠️ 메뉴에만 있고 탭 줄에는 안 선다(items 탭 false · 묶음 null) — 탭 줄이 없는 것이 정상.
⚠️ 모집단: 아직 실측 없음 — 첫 훑기 때 배지 셋(Sold without stock · Unpaid · POS not finished)의 수를 여기 적는다.

```
공통 · 탭 · 배지
[ ] ☰ Menu 에 Manager List 가 POS 뒤 · Staff 앞에 있고 이 화면에서는 눌리지 않는다 · 탭 줄은 없다
[ ] 헤더 왼쪽 빌드 표시가 「2026-09-25 · ml v1」다
[ ] 탭 넷 순서: Sold without stock · Unpaid at hand-over · POS not finished · Counter orders — 처음은 Sold without stock · ?tab=short|unpaid|pos|counter 로 들어오면 그 탭
[ ] 배지 셋(Counter orders 엔 없다): 0 이면 회색 · 1 이상이면 빨강 — 탭을 바꾸지 않아도 셋이 한 번에 읽힌다(so_stock_short_list unchecked_only · 인보이스 뷰 count · so_pos_open_list stale_count) · 확인·브랜치 바꿈 뒤 다시 읽힌다
[ ] 오른쪽 Branch select(All branches + 활성 창고) — Sold without stock · POS not finished · Counter orders 를 거른다
[ ] ⬜ **Branch 거르기가 Unpaid at hand-over 탭에는 안 먹는다** — 인보이스의 오더 창고를 봐야 하는데 so_invoice_list 뷰에 창고 칸이 없어 이번 판은 전부 보인다(⬜ 뷰에 창고 칸 · 그때 배지도 같이)
[ ] worker 로 열면 화면은 열리되 Mark checked… 가 없다

① Sold without stock
[ ] 두 묶음: 「Not checked yet — N(· M with unknown cost)」은 기간과 상관없이 **전량** · 「Checked — from to · N」은 최근 30일(from·to 는 창구가 준다)
[ ] 열: Sold on · Order(링크 — pos 채널이면 pos.html?so= · 아니면 so.html?so= · 채널 태그) · Customer · SKU · Branch · Qty short · Cost(cost_source · 모르면 「cost unknown」 빨강) · 마지막 칸(확인 전 = Mark checked… · 확인 뒤 = checked · 누가 · 언제 · 메모)
[ ] Mark checked…(manager) → prompt(「What did you find? (counted, fixed, reason)」 · 비워도 된다 · Cancel 이면 아무것도 안 한다) → so_stock_short_confirm → 배지·목록이 다시 읽힌다 · 재고는 안 바뀐다
[ ] 없으면 「Nothing to check.」 · 「None in this period.」 · 안내문 「the goods were there, the count was not … Checking does not change stock.」

② Unpaid at hand-over
[ ] 열: Invoice(링크 → so-invoices.html?inv=) · Issued(+ N d 지남) · Customer · Term · Orders(SO 번호들 · warehouse 아니면 채널 태그) · Total(통화) · Paid · credited · Still owed(파랑)
[ ] 대상 = is_open 인 인보이스 중 결제조건 이름이 IMMEDIATE 에 있는 것 · 오래된 순 · 300장까지 · 다 받으면 목록에서 빠진다
[ ] 안내문에 즉시 결제 조건 이름들이 나열된다(예 「C.B.S · C.O.D · Due on receipt」) · 결제조건 정리 중이라는 ⚠️
[ ] 없으면 「No unpaid invoices on a pay-now term.」

③ POS not finished
[ ] 열: Sale(링크 → pos.html?so=) · Customer · Branch · Confirmed(시각 · 누가) · Amount · Paid · 상태(「not finished — from an earlier day」 빨강 = stale 이 위로 · 「today · parked or at the counter」 회색)
[ ] 배지는 stale 만 센다 · 표는 오늘 것도 보인다 · 안내문 「holds its stock until it is finished … cancel it on Sales Orders」
[ ] 없으면 「No open POS sales.」

④ Counter orders
[ ] 최근 30일(order_date 기준) · 번호 내림차순 · 300장까지 · 배지 없음
[ ] 열: Order(링크 → so.html?so=) · Status · Ordered · Customer · Branch · Handed over(shipped_at · 내보낸 사람 · 아직이면 —)
[ ] 없으면 「No counter orders in the last 30 days.」
```

⚠️ [2026-09-25] 아직 없는 것 — Unpaid 탭의 Branch 거르기(뷰에 창고 칸) · 기간 고르기(Checked 30일 · Counter 30일 고정) · 창고 작업 쪽 관리 목록(WMS 쪽 · ⑤) · 결제조건 자료 정리 뒤 Unpaid 탭 재검(⚠️ 위) (정본 ④a 판정 7·8·15 · 6-b ③).

---

## 7-m. `wms-manager.html` — Split & Waves (2026-09-26 신설 · Claude Code ⑤-4a · 1판 「2026-09-26 · wm v1」 · 1.1판 「2026-09-27 · wm v1.1」 → Claude Code tf-2a **wm v1.2** 「2026-09-29 · wm v1.2」 = 판정 83 트랜스퍼 갈래(아래 tf-2a 절) = ⑤-5a 띄어쓰기 8곳(「1lines · 12units」 → 「1 lines · 12 units」 · 로직 무변) · 운영 `asung-wms/manager.html` 의 복사본을 IMS 표 · 창구 위에 옮겼다)

뒷단(⑤-2a1 · 정본 `asung-wms/docs/design/so-module.md` §24-i · 판정 17 · 18 · 25 · 33): 읽기 표 `so`(status at_wms · channel warehouse · 내 창고 location_id) + `customer!so_customer_id_fkey(name)`(청구처 FK 와 둘이라 이름을 박는다) + `so_line`(보낼 줄 qty_ordered − qty_removed > 0) ·
`wms_zone_sequence`(23행 · 열쇠 warehouse_id|zone) · `ref_warehouse`(id,name) · `ims_staff`(id,name 만 · 이름은 id 로 잇는다) · 읽기 RPC `so_pick_plan(p_so_id)`(줄 · 계획 칸 picks · need_ea · short_ea · warnings) ·
쓰기 RPC `wms_batch_create(p_so_id, p_batches [{line_ids}])` · `wms_wave_create(p_so_ids[])` — 각 한 번 · 첫 줄 ims_require_write(wms_manage) · 둘째 ims_can_warehouse · at_wms 만 · 과제 + 줄 + 계획 칸 + at_wms→picking 이 한 트랜잭션(실패 청소 · 라벨 셈은 창구 몫).

⭐ 진입점은 `ims-config.js` · `ims-auth.js` 뿐(0-a 검사 다섯째) — 운영 WMS(wms.asung.ca · asung-WMS)는 컷오버까지 Cin7 과 그대로 돈다 · 이 화면은 테스트 프로젝트(Asung-IMS)의 오더만 본다.
⭐ 권한 = wms_manage 열쇠(카탈로그 min_role manager · 판정 25 · manager 는 staff.html 에서 사람마다 켠다 · admin · supervisor 는 전부) · 모드 'wms' · 탭 true · 묶음 'warehouse' — 탭 줄 「IMS · WMS | Split & Waves」(WMS 안 화면이 하나라 묶음 칸 없음).
⭐ 글자(판정 17): at_wms = Released to WMS · picking = Working — 오피스 so.html 과 같은 글자(화면 안 STATUS_LABEL 표 하나). 사진 없음(판정 33) · 소유권 비교 없음(me.name 은 픽리스트 「Printed · by」 표시용만).
⭐ 옛 화면과 다른 것(⑪): voided 목록 · ⊘ 단추 · Cin7 보류 벨트(holdBelt) · Needs review 띠가 없다 — 같은 띠에 계획의 경고(Short: SKU −n · 칸 없음 warnings)가 뜬다 · 창고 단추(All · TOR · EDM)는 동선 순서가 있는 창고 ∩ 내 창고(me.access.warehouses · null = 전부)에서 만든다 ·
   존은 칸 이름에서 낸다(에드먼턴 E+존 글자 · 토론토 첫 글자 — 옛 wms_sku_bins.zone 규칙 · 테스트 DB 15,934행 전부 일치 · ref_bin.zone 은 비어 있다) · 픽리스트 Ship To 는 so 의 ship_to_* 를 두 줄로 조립(wms-picklist.js 는 그대로) · 오더 id 는 uuid(카드 data-id).
⚠️ 배치 · 웨이브를 만들면 그 오더는 picking(Working)이 된다 — 되돌리기 화면(admin · wms_rollback · wms_unwave)은 ⑤-5 에 선다. **그 전에는 화면에서 못 되돌린다**(⑤-4b picker 시험에 그 과제를 쓴다).
⚠️ 오피스가 거둬들인 오더(so.html Recall)는 창구가 막는다(「Order … is confirmed — only orders released to the WMS can be batched — nothing was saved」) → 화면이 목록을 다시 읽어 카드를 치운다. 실시간 알림은 없다(새로고침 · 실패 뒤 재읽기).
⚠️ 모집단(2026-09-26 테스트 DB · Claude Code 실측): at_wms 창고 오더 **1**(SO-25003 · Asung Trading Inc. · JOJOJO - Joel Chang · Wholesale · C.B.S · CON00156 12 · 계획 칸 C070303 · short 0) · 동선 순서 23 · 창고 4(단추는 둘) · 직원 21.

```
[ ] 로그인 뒤 헤더 「이름 · 역할」 · 「2026-09-27 · wm v1.1」 · ☰ Menu 에 Split & Waves(Manager List 뒤) · 탭 줄 「IMS · WMS | Picking · Packing · Fulfillment · Split & Waves」
    worker(wms_manage 없음)는 메뉴에 없고 주소로 열면 「You don't have access to this screen. Please contact your administrator.」 뒤 로그아웃
[ ] 왼쪽 「RELEASED TO WMS」 에 SO-25003 한 장 — JOJOJO - Joel Chang · Toronto 태그(파랑) · 1 lines · 12 units · Wholesale · 수 1 · 창고 단추 All · TOR · EDM · 가격 등급 드롭다운에 Wholesale
[ ] 카드를 누르면 오른쪽 「SO-25003 · Toronto · 1 lines · 12 units · Released to WMS by <풀어 준 사람 이름>」 · 경고 띠 없음 · 미리 보기 배치 SO-25003-1 — 줄 「C · CON00156 · CREME OF NATURE … · C070303 · 12」 · 「1 lines · 12 units → 1 batches」
[ ] max units 를 6 으로 줄여 Preview 해도 1 batches(한 줄은 쪼개지 않는다) · max lines · max units 에서 Enter 가 Preview
[ ] Create batches → 확인 → 토스트 「SO-25003 → 1 batches created · Working」 · 픽리스트 창 한 장(바코드 SO-25003-1 · Order · Order Date 2026-09-25 · Terms C.B.S (Cash Before Shipment) · Ship To(so 의 ship_to_* · 비면 줄 없음) · Warehouse Toronto · Price Tier Wholesale · Printed · by 이름 · Customer · Total Lines 1 · Total Units 12 · Zones C · Batch 1 of 1) · 카드가 목록에서 사라져 「No orders released to the WMS.」
[ ] so.html 에서 SO-25003 이 Working(picking) · Recall 단추는 없다(picking 은 못 거둔다 — ⑤-5 되돌리기까지 그대로)
[ ] Group 모드: 제목 「SMALL ORDERS」 · max lines 5 · max units 100 · 「No small orders match the limits.」 또는 카드 · 하나만 고르면 「1 / 10 totes — select at least 2」 로 Create wave 잠김 · 둘 이상은 이번 모집단으로 못 본다(오더를 하나 더 Release 하면 W-MMDD-1 · 요약 장 + 오더마다 한 장 · 토스트 「… created — 2 totes · Working」)
[ ] 거둬들인 오더 재현 — 카드를 고른 채 so.html 다른 탭에서 Recall from WMS → 돌아와 Create batches → 「Failed to create batches: Order … — only orders released to the WMS can be batched — nothing was saved」 · 목록이 다시 읽혀 카드가 사라진다 · so.html 에서 confirmed 그대로
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 — fazgmyvzzhqybtvtktyg(테스트)만
```

⚠️ [2026-09-26] 아직 없는 것 — picker(⑤-4b · wms-picker.html · 읽기 창구 wms_pick_lines) · packer(⑤-4c) · 되돌리기 · Health(⑤-5) · 픽리스트 재인쇄 · 웨이브 실측(오더 둘 이상) · 검토함(wms_order_review · 판정 22 · 끔) ·
   존 마스터(ref_bin.zone) — 채워지면 so_pick_plan 이 주는 값을 먼저 쓴다(지금은 칸 이름 규칙) · 창고 단추의 짧은 이름(TOR · EDM)은 이름에 Edmonton 이 드는지로 가른다(CLAUDE.md §3 규칙 그대로 · 셋째 창고가 생기면 고친다).

⭐ [2026-09-29 · Claude Code tf-2a · 판정 83] **wm v1.2 — 트랜스퍼 갈래** — 판매 조회 줄(sb.from("so") · so_line · so(...) 임베드)은 그대로 · 트랜스퍼 갈래를 옆에 더했다(patch ~/asung/prompts/tf-2a-*.patch · − 줄은 보고에 이유).
```
[ ] 빌드 표시 「2026-09-29 · wm v1.2」 · 판매 오더 목록 · 카드 · 미리 보기 · 인쇄가 어제와 같다(판매 한 바퀴 먼저)
[ ] transfers.html 에서 Release to WMS 한 TRF 가 RELEASED TO WMS 에 판매 옆에 — 손님 자리에 도착 창고 이름 · 꼬리표 「Transfer」 · 가격 등급 드롭다운에 안 든다(tier 없음) · 창고 단추(TOR · EDM)는 출발 창고
[ ] 카드를 누르면 「TRF-00001 · Toronto · N lines · N units · Transfer to <도착 창고> · Released to WMS」 · 미리 보기 배치 TRF-00001-1(so_pick_plan 이 문서 id 로) · 부족이면 Short 띠
[ ] Create batches → 토스트 「TRF-00001 → 1 batches created · Transfer to <도착 창고> · Working」 · 픽리스트 = Ship To 「Transfer to <도착 창고>」 · Customer <도착 창고> · Order Date · Terms · Price Tier 줄 없음(판정 72 묶음 열 7)
[ ] Group 모드에 TRF 도 후보(줄 · 낱개 한도 안이면) · 웨이브 토트 줄에 꼬리표 Transfer
```

---

## 7-n. `wms-picker.html` — Picking (2026-09-26 밤 신설 · Claude Code ⑤-4b · 1판 「2026-09-26 · pk v1」 → Claude Code tf-2a **pk v1.1** 「2026-09-29 · pk v1.1」 = 판정 83 트랜스퍼 갈래(아래 tf-2a 절) · 운영 `asung-wms/picker.html` 의 복사본을 IMS 표 · 창구 위에 옮겼다)

뒷단(⑤-2a2 · ⑤-4b · 정본 `asung-wms/docs/design/so-module.md` §24 · 판정 17 · 20 · 21 · 25 · 33): 읽기 창구 **`wms_pick_lines(p_task_ids[])`**(20260927010322 · 줄 · 제품 · base_sku · 세트 · 바코드(낱개 factor 1 + 세트 factor pack) · 계획 칸 · 실제 칸 · 존 · 창고 가용 — 한 번 · 51줄 0.34초 실측) ·
표 `wms_pick_tasks` · `wms_waves`(+ 임베드 `so(id,so_number,status,location_id,location_name,customer!so_customer_id_fkey(name))` · `wms_pick_task_lines(count)`) · `wms_pick_task_lines`(스캔 저장 · picked_by uuid) · `wms_reports`(wrong_location · barcode_mismatch · **stock_short** qty_expected/qty_found · reported_by uuid) · `so`(상태 배너 · 재인쇄 머리) · `wms_zone_sequence` · `ref_warehouse` · `ims_staff`(id,name) ·
쓰기 RPC `wms_complete_pick(p_lines · p_task_id|p_wave_id · p_mistakes · p_short_refresh · p_short_delete · p_session_id)` · `wms_hold_pick` · `wms_resume_hold` — 첫 줄 ims_require_write(picking) · ims_can_warehouse · CAS(assigned_to = 나 · in_progress · session).

⭐ 진입점은 `ims-config.js` · `ims-auth.js` 뿐(0-a 검사 다섯째) — 운영 WMS 는 그대로 돈다 · 이 화면은 테스트 프로젝트의 과제만 본다.
⭐ 권한 = picking 열쇠(WMS 방 · **worker 기본** · manager 는 켜 준 사람 · admin · supervisor 전부) · 모드 'wms' · 탭 「IMS · WMS | Picking · Split & Waves」(wms_manage 없는 worker 는 「Picking」 하나 — 모드 하나뿐이면 모드 칸도 안 뜬다).
⭐ 소유권 비교는 전부 **me.id**(ims_staff.id) — assigned_to · held_by · completed_by · 창구의 worker · 세션은 `imsAuth.sessionId()`(탭마다 · sessionStorage). me.name 은 presence 열쇠 · 픽리스트 「Printed · by」 표시용만. 남의 이름은 ims_staff(id,name) 표에서 `nameOf`.
⭐ 옛 화면과 다른 것: wms_orders · wms_order_lines · wms_sku_bins · wms_sku_snapshot · wms_discrepancies 없음(전부 창구 한 번) · Cin7 보류 · void 대신 **「SO-x is <상태> — this batch is no longer Working」 빨간 배너**(so.status ≠ picking · 진행 중은 숨기지 않는다 · 대기 풀에서는 숨긴다 · 판정 21) ·
   「Not enough stock」 = wms_reports stock_short(판정 20 · 열린 것 = resolved_at null · 완료 창구가 refresh/delete) · 사진 없음(판정 33 · HAS_IMAGES false — 사진 칸 · 「Image differs」 단추를 안 그린다 · 코드는 산다) · 창고 = me.access.warehouses(null = 전부) · 존 · 칸 · 바코드는 창구가 준다(화면 계산 없음) · 동선 순서 열쇠 warehouse_id|zone · 계획 칸이 둘이면 「C070303 ×6, C070304 ×6」.
⚠️ 완료하면 그 과제는 completed · SO 는 **여전히 picking(Working)** — packed 는 Finalize(⑤-2b · ⑤-4c 뒤)가 찍는다. 완료한 과제는 ⑤-4c packer 시험 재료다 · 되돌리기 화면(admin · wms_rollback)은 ⑤-5.
⚠️ 모집단(2026-09-26 밤 테스트 DB · Claude Code 실측): 대기 픽 과제 **1**(SO-25003-1 · 과제 47 · pending · CON00156 12 · 계획 칸 C070303 · 바코드 075724001565 · 가용 45) · 웨이브 0.

```
[ ] 로그인 뒤 헤더 「이름 · 역할」 · 「2026-09-26 · pk v1」 · ☰ Menu 에 Picking(Manager List 뒤 · Split & Waves 앞) · 탭 줄 「IMS · WMS | Picking · Split & Waves」(admin) · worker 계정이면 Picking 만
[ ] 「Pick a waiting batch from your warehouse to start.」 · Waiting Batches 에 SO-25003-1 — JOJOJO - Joel Chang · 1 lines · Toronto 태그 · Start 단추 · 오더 스캔 칸에 SO-25003 Enter → 그 카드만(Showing SO-25003 · Clear)
[ ] Start → 픽 화면: 제목 SO-25003-1 · 「Toronto · JOJOJO - Joel Chang」 · 진행 막대 0% · Single 뷰 — 존 C · 칸 C070303 · 🗺 · 이름 CREME OF NATURE … · CON00156 · 「Avail 45」 · Barcode 075724001565 · 0 / 12 · − + · Enter quantity · Prev/Next · 1 / 1 · ⚑ Wrong location · ⚑ Barcode changed · ⚠ Not enough stock (사진 칸 · Image differs 없음 = 판정 33)
[ ] so.html 에서 SO-25003 은 그대로 Working(picking) · wms_pick_tasks 47 이 in_progress · assigned_to = 내 ims_staff.id · session_id 채워짐(Network 의 PATCH)
[ ] 바코드 075724001565 를 스캔(또는 타이핑 + Enter) → 초록 「✓ CON00156 +1 (1/12)」 · 진행 막대 · 다시 열면(리로드 → ?batch=47 복원) 1/12 그대로(wms_pick_task_lines.picked_base) · 모르는 바코드 → 빨간 「✕ Barcode not in this batch」 + 사이렌
[ ] List 뷰 ↔ Single 토글 · List 의 행을 누르면 그 줄 임시 Single(← Back to list) · 🖨 Print → 픽리스트 창(바코드 SO-25003-1 · Order · Terms · Ship To · Warehouse Toronto · Printed · by 이름 · Batch 1 of 1)
[ ] (선택) 수량을 12 아래로 두고 「⚠ Not enough stock」 → confirm → 「Stock shortage declared」 · 단추 ✓ · manager-list.html Sold without stock 이 아니라 wms_reports 에 kind stock_short 한 줄(qty_expected 12 · qty_found n · reported_by 내 id) · 다시 누르면 취소(삭제)
[ ] Hold (later) → confirm → 「SO-25003-1 Held (returned to waiting list)」 · 목록 맨 위 「⏸ Resume your held batch」 · wms_task_holds 한 줄(worker 내 id · resumed_at null) · Resume → 다시 픽 화면(수량 보존) · wms_task_holds.resumed_at 채워짐(wms_resume_hold · 서버 시계)
[ ] ← List(작업 안 했으면 클레임 해제 · 했으면 My In Progress 에 남는다) · 다른 탭에서 같은 배치를 Resume 하면 원래 탭은 다음 쓰기에서 「now open on another device」 프리즈(Reload 로 되찾기)
[ ] 12 / 12 → 「Pick complete」 → confirm → 「SO-25003-1 Pick complete」 · 목록으로 · wms_pick_tasks 47 completed · completed_by 내 id · wms_pick_line_bins 에 planned=false 행(C070303 · 12 · picked_by) · so.html 의 SO-25003 은 **여전히 Working** — 이 과제가 ⑤-4c packer 의 시험 재료
    또는 부족인 채 「Complete as incomplete」 → 마찰 모달(wms-confirm-modal · Keep picking / End · n short) → wms_worker_mistakes 에 short_pick 한 줄(선언한 줄은 제외 · 규칙 41)
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_pick_lines 200(이 함수는 테스트 DB 에만 있다)
```

⚠️ [2026-09-26 밤] 아직 없는 것 — packer(⑤-4c · wms_pick_lines 의 팩 갈래 p_pack_task_id 는 이미 있다) · 되돌리기 · Health · Stats(⑤-5) · 웨이브 실측(오더 둘 이상 · Split & Waves 의 Group) · 사진(판정 33) · Take over 가지(stalePool · 운영도 비어 있던 호환 가지) ·
   되돌린 오더의 과제 정리(⑤-5 wms_rollback 이 archive + void) — 그 전에는 「no longer Working」 배너가 유일한 신호.

⭐ [2026-09-29 · Claude Code tf-2a · 판정 83] **pk v1.1 — 트랜스퍼 갈래** — 판매 조회 줄(sb.from("so") · so_line · so(...) 임베드)은 그대로 · 트랜스퍼 갈래를 옆에 더했다(patch ~/asung/prompts/tf-2a-*.patch · − 줄은 보고에 이유).
```
[ ] 빌드 표시 「2026-09-29 · pk v1.1」 · 판매 배치 시작 → 스캔 → 완료 · 인쇄가 어제와 같다(판매 한 바퀴 먼저)
[ ] Waiting Batches 에 TRF-00001-1 — 도착 창고 이름 · N lines · 출발 창고 태그 · 꼬리표 「Transfer」 · 오더 스캔 칸에 TRF-00001 Enter 로 걸린다
[ ] Start → 제목 TRF-00001-1 · 「Toronto · Transfer to <도착 창고>」 · 줄 · 칸 · 바코드 · 가용은 판매와 같다(wms_pick_lines) · 리로드(?batch=) 복원
[ ] 🖨 Print → Ship To 「Transfer to <도착 창고>」 · Customer <도착 창고> · Terms · Order Date · Price Tier 없음 · Batch i of N
[ ] (하나는 일부러 모자라게) 「⚠ Not enough stock」 선언 → wms_reports 에 transfer_id 채워지고 order_id null · 다시 누르면 취소 · Complete as incomplete → wms_worker_mistakes 에 transfer_id
[ ] transfers.html 에서 Recall from warehouse(at_wms 일 때만 된다) 한 트랜스퍼의 과제는 대기 풀에서 숨고 · 진행 중이면 빨간 배너 「TRF-00001 is Released to WMS — … no longer Working」
```

---

## 7-o. `wms-packer.html` — Packing (2026-09-26 밤 신설 · Claude Code ⑤-4c · 1판 「2026-09-26 · pa v1」 → pa v1.1(adj-rec-a) → Claude Code tf-2a **pa v1.2** 「2026-09-29 · pa v1.2」 = 판정 83 트랜스퍼 갈래(아래 tf-2a 절) · 운영 `asung-wms/packer.html` 의 복사본을 IMS 표 · 창구 위에 옮겼다 · 마이그레이션 없음)

뒷단(⑤-2a2 · ⑤-4b · 정본 `asung-wms/docs/design/so-module.md` §24 · 판정 17 · 18 · 20 · 21 · 25 · 33): 읽기 창구 **`wms_pick_lines`** — 시작은 `(p_task_ids [픽 과제])` · 재개는 팩 갈래 `(null, p_pack_task_id)`(pack_line_id · expected_base · verified_base · pack_verification_method + 픽 assigned(required) · 제품 · 바코드 · 칸 · 가용) ·
표 `wms_pick_tasks`(완료 픽 풀 · `so!inner(...)` + `so.status = picking`) · `wms_pack_tasks`(시작 insert · 클레임 · 세션 · held · 완료 확인) · `wms_pack_task_lines`(시작 insert · 스캔 저장 verified_by uuid) · `wms_pick_task_lines`(부족 배지) · `wms_reports`(barcode_mismatch · **stock_short** — 픽커 선언은 「declared by 이름」) · `wms_order_pack_progress`(all_packed 읽기만) · `so`(상태 배너 · 재인쇄) · `ref_warehouse` · `ims_staff`(id,name) ·
쓰기 RPC `wms_complete_pack(p_task_id · p_lines · p_mistakes(short_after_pack · over_pick · pack_scan_mistake) · p_short_refresh · p_short_resolve · p_recovered · p_session_id)` · `wms_hold_pack` · `wms_resume_hold('pack')` — 첫 줄 ims_require_write(packing) · ims_can_warehouse · CAS.

⭐ 진입점은 `ims-config.js` · `ims-auth.js` 뿐(0-a 검사 다섯째) — 운영 WMS 는 그대로 돈다 · 이 화면은 테스트 프로젝트의 과제만 본다.
⭐ 권한 = packing 열쇠(WMS 방 · **worker 기본**) · 모드 'wms' · 탭 「IMS · WMS | Picking · Packing · Split & Waves」(worker 는 Picking · Packing 둘).
⭐ 소유권 비교는 전부 **me.id** · 세션 = `imsAuth.sessionId()` · me.name 은 presence 열쇠 · 「Printed · by」 · 방금 선언한 칩 표시용만.
⭐ 옛 화면과 다른 것: 완료 픽 풀은 `so.status = picking`(Working)인 오더만(운영의 not in closed · voided 자리) · Cin7 보류 · void 안내 대신 **「SO-x is <상태> — this batch is no longer Working」 배너**(판정 21) ·
   **운영의 `ready_to_close` 쓰기(checkOrderReady)가 없다** — 완료 창구가 돌려주는 `ready`(뷰 all_packed)로 「All batches for this order are packed! — ready to be finalized」 안내만 · **SO 는 여전히 picking**(판정 18 · packed 는 Finalize · ⑤-5) ·
   「Not enough stock」 = wms_reports stock_short(열린 것 = resolved_at null · 완료 창구가 refresh/resolve) · 사진 없음(판정 33 · HAS_IMAGES false) · 존 · 칸 · 바코드 · 가용은 창구가 준다 · 계획 칸이 둘이면 「C070303 ×6, C070304 ×6」.
⚠️ 팩을 마치면 wms_pack_tasks 가 completed · 그 오더의 배치가 전부 팩 됐으면 `wms_order_pack_progress.all_packed` true — **Finalize 는 fulfillment 화면(⑤-5) · 되돌리기도 ⑤-5**. 그 전에는 화면에서 못 되돌린다.
⚠️ 모집단(2026-09-26 밤 테스트 DB · Claude Code 실측): 완료 픽 **1**(SO-25003-1 · 과제 47 · CON00156 12/12 · 실제 칸 C070303) · 팩 과제 0 · SO-25003 picking.

```
[ ] 로그인 뒤 헤더 「이름 · 역할」 · 「2026-09-26 · pa v1」 · ☰ Menu 에 Packing(Picking 뒤 · Split & Waves 앞) · 탭 줄 「IMS · WMS | Picking · Packing · Split & Waves」
[ ] 「Pick a completed pick batch and verify by full re-scan..」 · Pack Queue 에 SO-25003-1 — JOJOJO - Joel Chang · Toronto · Start verify(부족 배지 없음 — 12/12) · 오더 스캔 칸에 SO-25003 Enter → 그 카드만
[ ] Start verify → wms_pack_tasks 한 줄(in_progress · assigned_to 내 id · pick_task_id 47) · wms_pack_task_lines 한 줄(expected_base 12 · verified 0) · List 뷰(기본): 「C070303 · Avail 45」 · 0 / 12 · − + · SKU 검색 칸 · 진행 막대 0%
[ ] Single 뷰: 존 C · C070303 · CON00156 · Barcode 075724001565 · 0 / 12 · Enter quantity · ⚑ Barcode changed · ⚠ Not enough stock (사진 칸 · Image differs 없음 = 판정 33) · 상태 배너 없음(SO-25003 은 Working)
[ ] 바코드 075724001565 를 타이핑 + Enter → 「✓ CON00156 +1 (1/12)」 · LAST SCAN 칩 · 12 번째에 「· COMPLETE」 + 0.9초 뒤 자동 이동(줄이 하나라 그대로) · 13 번째 → 「⚠ already 12 met — extra scans ignored」 + over-scan 노란 띠 + List 의 「Clear over」
[ ] 리로드(?pack=<id> 복원) → 수량 그대로(wms_pack_task_lines.verified_base · verified_by 내 id) · 🖨 Print → 픽리스트 창(바코드 SO-25003-1 · Batch 1 of 1)
[ ] (선택) 수량 12 아래에서 「⚠ Not enough stock」 → confirm → wms_reports stock_short(qty_expected 12 · reported_by 내 id · source packer) · 칩 「Stock short — declared by <이름>」 · 다시 누르면 취소
[ ] (선택) Hold (later) → 「SO-25003-1 held」 · 목록 「⏸ Resume your held batch」 · wms_task_holds(pack · 내 id) · Resume verify → 수량 보존 · resumed_at 채워짐
[ ] 12 / 12 → Complete pack → confirm(over-scan 이 있으면 줄마다 「Picker brought extra / I scanned twice」 모달 먼저) → 「SO-25003-1 Complete pack」 · **alert 「✅ SO-25003 — All batches for this order are packed! … ready to be finalized」**(ready = 뷰 all_packed) · 목록 비면 「No batches waiting to pack..」
[ ] so.html 의 SO-25003 은 **여전히 Working(picking)** · wms_pack_tasks completed · completed_by 내 id · 「I scanned twice」를 골랐으면 wms_worker_mistakes 에 pack_scan_mistake(resolved) 한 줄 · 「Picker brought extra」면 over_pick(responsible = 픽커 id)
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_pick_lines · rpc/wms_complete_pack 200
```

⚠️ [2026-09-26 밤] 아직 없는 것 — fulfillment(Finalize · 팔렛 · 박스 · ⑤-5) · 되돌리기 · Health · Stats(⑤-5) · 사진(판정 33) · Take over 가지(stalePacks · 운영도 비어 있던 호환 가지) · 웨이브 멤버 팩 실측(웨이브 0).

⭐ [2026-09-28 · Claude Code adj-rec-a · 0c28d44] **pa v1.1** — 판정 57 · 팩 회복에 칸을 남긴다(so-module §25) · 창구 `wms_complete_pack`(asung-wms 20260928164832 · p_recovered [{sku, bin, qty}])
```
[ ] 빌드 표시 「2026-09-28 · pa v1.1」
[ ] 픽보다 많이 스캔(Pack fill) → 「beyond picker's N … OK」 뒤 **칸 prompt** — 기본 = 그 줄의 픽 계획 칸 · 스캔하거나 타이핑해 바꾼다 · 빈 값이면 다시 묻는다
[ ] Done → 확인 문구 「(in packing, 1 lines' shortfall recovered — SKU +1 from <bin>)」 · 완료 토스트 「Recovered 1 (from <bin>)」
[ ] 완료 뒤 WMS Admin Trace 의 그 줄에 실제 칸 = 픽 칸 + 회복 칸 · 신고(stock_short)가 채워졌으면 저절로 닫힘 · short_pick → resolved_pack_recovery
[ ] 오피스 Finalize 가 막히지 않고(픽 0 · 전량 회복도) 백오더(…b) 없음 · 원장 sale_out 이 회복 칸에서 빠진다
[ ] ⚠️ 옛 화면(캐시 · pa v1)으로 완료하면 「Reload the packing screen (Ctrl+F5) — this version cannot record where recovered stock came from — nothing was saved」 — 아무것도 안 바뀐다(fail-closed)
[ ] 다른 창고 칸 · 모르는 칸 → 「bin … is not an active bin at this warehouse」 거부
```

⭐ [2026-09-29 · Claude Code tf-2a · 판정 83] **pa v1.2 — 트랜스퍼 갈래** — 판매 조회 줄(sb.from("so") · so_line · so(...) 임베드)은 그대로 · 트랜스퍼 갈래를 옆에 더했다(patch ~/asung/prompts/tf-2a-*.patch · − 줄은 보고에 이유).
```
[ ] 빌드 표시 「2026-09-29 · pa v1.2」 · 판매 팩 시작 → 스캔 → Complete pack 이 어제와 같다(판매 한 바퀴 먼저)
[ ] Pack Queue 에 TRF-00001-1 — 도착 창고 이름 · 출발 창고 태그 · 꼬리표 「Transfer」 · Start verify → wms_pack_tasks 한 줄(transfer_id 채움 · order_id null) · wms_pack_task_lines 의 transfer_line_id(order_line_id null)
[ ] 팩 화면 「Toronto · Transfer to <도착 창고>」 · 리로드(?pack=) 복원 · 🖨 Print = 픽 화면과 같은 트랜스퍼 인쇄
[ ] (선택) 「⚠ Not enough stock」 · 「⚑ Barcode changed」 → wms_reports transfer_id · Complete pack → 「All batches … packed! — ready to be finalized」(뷰 order_id = 문서 id)
[ ] Pack fill(픽보다 많이) 회복 칸 prompt 는 판매와 같다(창구 p_recovered 가 문서를 가른다 · 20260928164832 → tr-1b2 재발행)
```

---

## 7-p. `wms-fulfillment.html` — Fulfillment (2026-09-27 신설 · Claude Code ⑤-5a · 1판 「2026-09-27 · fu v1」 → Claude Code tf-2a **fu v1.1** 「2026-09-29 · fu v1.1」 = 판정 83 트랜스퍼 갈래(아래 tf-2a 절) · 운영 `asung-wms/fulfillment.html` 의 복사본을 IMS 표 · 창구 위에 옮겼다 · 마이그레이션 없음 · 판정 34 「세번에 나누는 A」의 첫 차수)

뒷단(⑤-2b · 정본 `asung-wms/docs/design/so-module.md` §24-h 판정 16 · 18 · 19 · 21 · 24-k): 오더 풀 = `wms_pack_tasks`(completed) + `so!inner(status)` eq picking · 관문 = 뷰 `wms_order_pack_progress`(all_packed) · 오더 머리 = `so`(so_number · status · location_id · location_name) + `customer!so_customer_id_fkey(name)` ·
풀 줄(sku · base_sku · 이름 · 바코드 낱개 factor 1 + 세트 factor pack · 팩 수량 verified_base) = 읽기 창구 **`wms_pick_lines(null, p_pack_task_id)`** 팩 갈래 — 팩 과제마다 한 번(N 왕복 · 시간은 콘솔 `[fulfillment] wms_pick_lines ×N · ms`) ·
팔렛 · 박스 · 담긴 것 = `wms_pallets` · `wms_pallet_items` 에 직접(운영 그대로 · auth_all · 판정 6 · created_by uuid · 아이템 insert 에 pack_task_id) · 선택 밖 오더의 담긴 것 표시 = `so_line`(id · sku · product_name) ·
쓰기 RPC **`wms_finalize(p_so_ids uuid[])`** 한 번 — 첫 줄 ims_require_write(fulfillment) · ims_can_warehouse · picking 만 · 뷰 all_packed · 팔렛 담긴 수량 ≤ 팩 수량 · 타입 packing_list|direct 는 창구가 판정 · `wms_order_finalize` 한 줄 + so packed(packed_at/by) · 반환 finalized[] · count · warnings[](units_without_dims:SO:n) · shorts.

⭐ 진입점은 `ims-config.js` · `ims-auth.js` 뿐(0-a 검사 다섯째) — 운영 WMS 는 그대로 돈다 · 이 화면은 테스트 프로젝트의 오더만 본다 · `wms-packing.js`(라벨 · 소계 줄)는 운영에서 바이트 그대로.
⭐ 권한 = fulfillment 열쇠(WMS 방 · **worker 기본** · 운영 requireManager:false 와 같다) · 모드 'wms' · 탭 「IMS · WMS | Picking · Packing · Fulfillment · Split & Waves」(worker 는 셋).
⭐ 소유권 비교 없음 — me.name 은 presence 열쇠(`me.name|fulfillment`) · 표시용만 · created_by 는 me.id · 다른 사람 이름을 보이는 자리가 없다(nameOf 는 공통 조각으로만 있다).
⭐ **새로 그린 것(판정 19)**: 유닛(팔렛 · 독립 박스 · 중첩 박스)마다 치수 줄 — L × W × H 숫자 셋 + 단위 in|cm · 무게 + 단위 lb|kg(기본 in · lb) → `wms_pallets` 의 dim_length · dim_width · dim_height · dim_unit · weight · weight_unit 에 직접 · 트리거 `wms_pallet_dims` 가 채운 length_in · width_in · height_in · weight_lb 를 다시 읽어 「47.24 × 39.37 × 59.06 in · 551.16 lb」 로 보인다 · 칸 하나를 떠날 때마다 저장(행을 다시 그리지 않아 Tab 이 이어진다) · 비면 「no dimensions yet …」 노란 글자 · 0 이하 · 글자는 화면이 거부(CHECK 와 같은 규칙) · 메모 칸(Height note · Weight note)은 그대로.
⭐ 옛 화면과 다른 것: 옛 오더 표 · 줄 표 · 스냅샷 표(자기 바코드 · 형제 세트 바코드) 없음 — 전부 창구가 준다 · Cin7 보류 · void 재확인 벨트 · 컬럼 없음 폴백 없음 → 대신 **「SO-x is <상태> — no longer Working. Finalize will be refused」 빨간 배너**(so.status ≠ picking · 판정 21) · Finalize 의 두 길(packing_list · direct)은 단추 하나 — 팔렛에 담긴 것이 있으면 packing_list · 없으면 direct(창구 판정 · 원본 규칙과 같다) · 「미배치 있어도 진행」 confirm 은 그대로 · 창구 warnings(치수 없음) · shorts(부족 → 오피스 pick_short)는 alert 로 · 창고 = me.access.warehouses(null = 전부) · 인쇄의 Warehouse 는 ref_warehouse 이름 · 사진 없음(판정 33) · 글자 표(판정 17) · 오더 id · 줄 id 는 uuid(숫자 변환 0).
⚠️ Finalize 뒤 SO 는 **packed(Finalized)** · `wms_order_finalize` 한 줄 · 오피스 so_finalize(sales)가 인계(`wms_so_handoff` picks · units)를 받아 출고 + 인보이스 — WMS 는 재고 · 인보이스를 건드리지 않는다(판정 16). 되돌리기(Undo Finalize · wms_rollback)는 ⑤-5b admin.
⚠️ 모집단(2026-09-27 테스트 DB · Claude Code 실측 · begin read only): 완료 팩 **1**(SO-25003-1 · 팩 과제 23 · CON00156 12 · verified 12) · all_packed t · 팔렛 0 · 아이템 0 · `wms_pick_lines(null, 23)` 1줄(바코드 075724001565 factor 1) · 첫 호출 4.87초(콜드) · 둘째 0.12초.

```
[ ] 로그인 뒤 헤더 「이름 · 역할」 · 「2026-09-27 · fu v1」 · ☰ Menu 에 Fulfillment(Packing 뒤 · Split & Waves 앞) · 탭 줄 「IMS · WMS | Picking · Packing · Fulfillment · Split & Waves」 · worker 계정이면 Picking · Packing · Fulfillment 셋
[ ] 「Select orders ▾」 → 「Orders to ship together」 에 JOJOJO - Joel Chang 아래 SO-25003 · TOR 태그 · 「Working」 · 체크 → Start working selected orders → 머리 「SO-25003 · Customer JOJOJO - Joel Chang」 · 콘솔 「[fulfillment] wms_pick_lines ×1 · nnn ms」 · Unassigned products 에 SO-25003 › SO-25003-1 › CON00156 CREME OF NATURE … 12 · 빨간 배너 없음
    또는 오더 스캔 칸에 SO-25003 Enter → 같은 결과 · SO-25004 처럼 없는 번호 → 「No order ready to ship for …」 · Working 이 아닌 오더 번호 → 「… is Confirmed — only Working orders can be finalized here」
[ ] + Pallet → 🟩 P1 카드(wms_pallets 한 줄 · created_by 내 ims_staff.id · order_id SO-25003 uuid) · 치수 줄 「L × W × H in · Weight lb · no dimensions yet — …」 · Height/Weight note 칸 · + Nest box · 🖨 Pallet list · Delete
[ ] 치수: L 120 · W 100 · H 150 · 단위 cm · Weight 250 · kg → 칸을 떠날 때마다 저장 → 회색 줄 「47.24 × 39.37 × 59.06 in · 551.16 lb」(트리거가 계산 · 판정 19 실측과 같은 값) · wms_pallets 행에 dim_* 여섯 + *_in · weight_lb 넷 · 0 이나 음수 → 「Dimensions and weight must be positive numbers」 · 다시 열어도 값 그대로
[ ] 카드를 눌러 스캔 대상(보라 테두리 · 「Scanning into: 🟩 P1」) → 바코드 075724001565 타이핑 + Enter → 「✓ P1 ← CON00156 ×1」 초록 플래시 · 풀 12 → 11 · 카드에 CON00156 1 · wms_pallet_items 한 줄(order_line_id uuid · pack_task_id 23 · qty_base 1) · Move all 모드 → 한 스캔에 나머지 11 · ↩ Undo last scan → 되돌아옴(저장은 큐 · .select() 1행)
[ ] 드래그 · 탭으로 옮기기 · 분할(move qty 모달) · + Nest box(📦 B1 on P1 · 치수 줄 있음) · 박스 → 팔렛 중첩 · ✕ 로 풀로 되돌리기 · Delete 유닛 — 운영과 같은 동작 · 저장마다 「no row was changed」 류 실패는 빨갛게
[ ] 🖨 Pallet list · Consolidated list per store 🖨 List → 인쇄 미리보기: PACKING LIST · Order SO-25003 · Customer JOJOJO - Joel Chang · Warehouse Asung Trading Inc. · 표 SKU CON00156 · Barcode 075724001565 · Product · Qty · 팔렛 메모 줄(H · W)
[ ] ✓ Finalize order(s) → confirm(미배치가 남았으면 「⚠ Still has unplaced items (will finalize anyway)」) → 토스트 「1 order(s) finalized」 · 치수를 안 넣은 유닛이 있으면 alert 「SO-25003: n unit(s) without dimensions — …」 · 보드에서 사라짐 「No verified orders.」
    → so.html 에서 SO-25003 이 **Finalized(packed)** · packed_at/by 채워짐 · wms_order_finalize 한 줄(fulfillment_type packing_list · finalized_by 내 id · units · units_without_dims) · 팔렛 · 아이템은 그대로(오피스 인계 wms_so_handoff units 에 in · lb 로) · 팔렛에 하나도 담지 않고 Finalize 하면 fulfillment_type direct
[ ] 거둬들인 오더 재현 — Working 오더는 오피스가 거둘 수 없어(so_wms_recall 은 at_wms 만) 이 화면에서 배너를 보려면 ⑤-5b 되돌리기(Undo Split → Released) 뒤 워크스페이스를 다시 여는 때 · 그 전에는 「Finalize blocked: Order … is at_wms — only an order in warehouse work (picking) can be finalized — nothing was saved」 빨간 토스트가 유일한 신호
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_pick_lines · rpc/wms_finalize 200(이 함수들은 테스트 DB 에만 있다)
```

⚠️ [2026-09-27] 아직 없는 것 — admin(Status · Rollback · Finalized = ⑤-5b · Discrepancy · Reports · Stats · Health · Trace = ⑤-5c) · Undo Finalize · 사진(판정 33) · wms_pick_lines 의 팩 갈래를 여러 과제로 한 번에(⬜15 · 함께 보내는 오더가 많아 N 왕복이 걸리면) · 오피스 so.html 의 Finalized 대기 목록 · 시각 줄(오피스 판).

⭐ [2026-09-29 · Claude Code tf-2a · 판정 83] **fu v1.1 — 트랜스퍼 갈래** — 판매 조회 줄(sb.from("so") · so_line · so(...) 임베드)은 그대로 · 트랜스퍼 갈래를 옆에 더했다(patch ~/asung/prompts/tf-2a-*.patch · − 줄은 보고에 이유).
```
[ ] 빌드 표시 「2026-09-29 · fu v1.1」 · 판매 오더 Finalize(packed) · 팔렛 · 라벨 · 팩킹리스트가 어제와 같다(판매 한 바퀴 먼저)
[ ] 「Select orders ▾」 에 도착 창고 이름 아래 TRF-00001 · TOR 태그 · 「Working」 · 꼬리표 「Transfer」 · 오더 스캔 칸 TRF-00001 Enter 도 같다(팩 미완이면 「N/M batches packed」)
[ ] 작업대 머리 「TRF-00001 · Customer <도착 창고>」 + 칩 「TRF-00001 · Transfer to <도착 창고>」 · 판매와 함께 고르면 「sale + transfer mixed」 경고(막지 않는다 · ⬜ 판정 거리)
[ ] + Pallet → wms_pallets 에 transfer_id(order_id null) · 스캔 → wms_pallet_items 에 transfer_id · transfer_line_id(order_* null) · 옮기기 · 분할 · ✕ · Delete 는 그대로
[ ] 🖨 Pallet list · Store list — Customer 자리에 도착 창고 이름 · Warehouse 출발 창고(라벨 이름은 「Customer」 그대로 — ⬜ 「Ship to warehouse」 로 바꿀지 판정 거리)
[ ] ✓ Finalize → 토스트 「TRF-00001 left for <도착 창고> — in transit」 · 모자란 줄이 있으면 alert 「Short — closed on the transfer (sent what was picked)」(판정 74) · transfers.html 에 in transit · Sent · short
```

---

## 7-q. `wms-admin.html` — WMS Admin · 아홉 탭 (2026-09-27 신설 · Claude Code ⑤-5b 1판 「wa v1」 세 탭 · 대화 Claude v1.1(renderFulfillStats 복구) · ⑤-5c1 v1.2(manager_resolved 한 줄) · ⑤-5c2 v1.3 = Discrepancy · Reports · Stats · Health · Trace 를 운영 구간에서 다시 옮김 · 대화 Claude **v1.4** 「2026-09-27 · wa v1.4」 = ⑤-5c2 Stats 고침(줄 가운데 주석이 `v.pick++; const m` 을 삼킨 것 · 822408d) · 운영 `asung-wms/admin.html` 의 복사본 · 마이그레이션 없음 · Receiving 탭만 입고가 IMS 로 올 때 → ⑤-6b **v1.5** 「2026-09-27 · wa v1.5」 = Receiving 탭 · Stats 입고 구간 · Health 15 행 — 아래 ⑤-6b 절 → 대화 Claude v1.6 · **v1.7**(판정 42 · 42 A — 창고 Confirm 단추는 admin + wms_receiving_confirm 을 직접 켠 사람 · d4ab33e · b4ab1ab) → Claude Code ⑤-6c2 **v1.8** 「2026-09-27 · wa v1.8」 = 「Off-PO items waiting for a decision」(딥링크 · 판정 44) · 「Rejected — still on a shelf」 · Stats off-PO 결정 어휘 — 아래 ⑤-6c2 절)

뒷단(⑤-2b · 정본 `asung-wms/docs/design/so-module.md` §24-h 판정 18 · 21 · 22 · 24-k 판정 26 · 24-o): 
Status = `so`(at_wms · picking) + `customer!so_customer_id_fkey(name)` + `so_line`(주문 lines · units 합) · 과제 count-head 넷 · packed count-head · 뷰 `wms_order_pack_progress`(Packing · Ready to finalize 유도 · 판정 18) · 배치 활동 = `wms_pick_tasks` · `wms_pack_tasks` + 줄 합(읽기 그대로 · 사람 칸 nameOf) · 자리 비운 과제 풀기 = 표 직접 update(status pending · assigned_to · heartbeat_at · **session_id** null · CAS in_progress · 판정 6) · presence 「wms-presence」 채널(열쇠 admin|이름 · 표시).
Rollback = 목록 `so`(at_wms · picking 전량 + packed 최근 200) + `wms_order_finalize(finalized_by,finalized_at)` + `wms_waves`(미완 · `wms_pick_tasks(id,order_id,so(so_number))`) + 과제 · 팩 · 팔렛 아이템 · 픽 줄(sbAll) · 
쓰기 RPC 셋 — **`wms_rollback(p_so_id, p_action)`**(finalize · fulfillment · pack · pick · split) · **`wms_rollback_batch(p_task_id, p_kind)`**(pack · pick) · **`wms_unwave(p_wave_id)`** — 첫 줄 ims_require_write(wms_manage) · manager 이상 · ims_can_warehouse · 아카이브 → 무효화 → 삭제 · 상태 전이(packed→picking · picking→at_wms) · 로그 한 트랜잭션 · 반환 archived · voided · reopened · back_to_at_wms 를 토스트/alert 로 · 매니저 안내 셋 = `wms_worker_mistakes` 읽기(창구 전에) · 로그 = `wms_rollback_log` 최근 30(사람 칸 nameOf).
Finalized = `so`(packed = 오피스 마무리 대기 풀 · sbAll) + `wms_order_finalize(fulfillment_type · finalized_by/at · units · units_without_dims)` + `wms_order_review(reviewed · reviewed_by/at · cleared_by/at)` + `so_line` + `wms_pick_tasks(count)` + `wms_pack_tasks(wms_pack_task_lines(verified_base))` · 검토함 켜기·끄기 = **`wms_review_set(p_so_id, p_reviewed)`**(판정 22 · 26) · 재출력(Print · PDF · CSV) = `wms_pallet_items` · `wms_pallets` · `so`(다른 오더 이름표) · `so_line`(sku · 이름 · product_id) · `product_barcode`(is_active · is_primary 우선).

⭐ 진입점은 `ims-config.js` · `ims-auth.js` 뿐(0-a 검사 다섯째) — 운영 WMS 는 그대로 돈다 · 이 화면은 테스트 프로젝트만 본다 · `wms-packing.js`(라벨 · 소계 줄) 공유.
⭐ 권한 = wms_manage 열쇠(카탈로그 min_role manager · 판정 25 · manager 는 staff.html 에서 켜 준 사람만 · admin · supervisor 는 전부 · 운영 requireManager + perm admin 과 같다) · 모드 'wms' · 탭 「IMS · WMS | Picking · Packing · Fulfillment · Split & Waves · WMS Admin」 · 화면 안 탭 셋 Status · Rollback · Finalized.
⭐ 소유권 비교 없음(이 화면은 남의 과제를 풀고 되돌리는 매니저 화면 · CAS 는 status 로) · me.name 은 presence 열쇠 하나 · 사람 이름은 전부 nameOf(ims_staff id,name 한 번).
⭐ **판정 35 — Void 없음**: ⊘ Void 단추 · 번호 검색 · doVoid 가 없다 · 그 자리에 안내 「Cancelling an order that is already in the warehouse? … ↩ Undo Pack → ↩ Undo Split (Released to WMS) → the office does Recall from WMS and cancels …」 · 한 번에 되돌리기는 컷오버 뒤 거리(창구를 순서대로 부르는 바깥 창구 하나 + 단추 하나 · 표 무변).
⭐ 옛 화면과 다른 것: 재고 새로고침 단추 · Cin7 보류/void 카드 · EF hold_recheck · needs_review 없음 · 상태 카드 다섯 = Released to WMS · Working · Packing(뷰 packs_done>0) · Ready to finalize(all_packed) · Finalized(packed) · 되돌리기의 벨트(Finalize 뒤 거부 · 팔렛에 담긴 배치 · 팩 있는 배치)는 창구 안 — 화면의 응급 차단(closed 재확인 · packBlocked · 「Cin7 still 3.Finalized」)은 사라졌다 · 실패는 창구 문장(「… — nothing was saved」) 그대로 빨간 토스트 · Finalized 탭의 모수는 운영 closed 누적이 아니라 packed(마무리되면 fulfilled 로 빠진다) · 카드 · 「N of M not yet reviewed」 는 그 모수에서 화면 셈 · 팔렛 폴백 페이지 없음(타입은 늘 기록됨) · 재출력 유닛 지도에 치수(in · lb) 병기 · 인쇄 머리는 글자 「ASUNG」(로고 그림 없음) · 오더 id 는 uuid(숫자 변환 0) · 과제 · 팔렛 · 웨이브 id 는 bigint.
⚠️ 모집단(2026-09-27 테스트 DB · Claude Code 실측 · begin read only): SO-25003 **packed**(packed_at 20:55 · packed_by Caleb) · wms_order_finalize 한 줄(packing_list · units 1 · units_without_dims 0) · 팔렛 P1(120×100×150 cm · 250 kg → 47.24 × 39.37 × 59.06 in · 551.16 lb) · 아이템 1(qty 12 · pack_task_id 23) · 픽 과제 47 completed · 팩 과제 23 completed · 픽 칸 2(계획 1 · 실제 1) · rollback_log 0 · archive 0 · review 0 · mistakes 0 · waves 0 · 시퀀스 so 25004 · 인보이스 60001 · 크레딧 1000 그대로.

```
[ ] 로그인 뒤 헤더 「이름 · 역할」 · 「2026-09-27 · wa v1.5」 · ☰ Menu 에 WMS Admin(Split & Waves 뒤 · 맨 끝) · 탭 줄 「IMS · WMS | Picking · Packing · Fulfillment · Split & Waves · WMS Admin」 · 화면 안 탭 아홉 = Status · Discrepancy · Reports · Stats · Rollback · Health · Receiving · Finalized · Trace(원본 순서) · worker 계정은 메뉴에 없고 주소로 열면 「You don't have access to this screen.」 뒤 로그아웃
[ ] Status: 카드 Released to WMS 0 · Working 0 · Packing 0 · Ready to finalize 0 · Finalized 1 · 배치 카드 넷 0 · Live now(열린 WMS 화면이 없으면 「No one is working …」) · Batch activity 「No orders in progress.」 · In-Progress Orders 「No orders in progress.」(SO-25003 은 packed 라 활성이 아니다)
[ ] Finalized: 카드 Finalized 1 · With packing list 1 · Direct pack 0 · Packing-list rate 100% · 목록에 SO-25003 · JOJOJO - Joel Chang · Lines 1 · Units 12 · Toronto · Finalized by <이름> · When(20:55) · 🖨 Print · ⬇ PDF · ⬇ CSV · 「1 of 1 not yet reviewed」 · 창고 세그 All · Toronto · Edmonton(Edmonton 으로 바꾸면 「No finalized orders in this period.」) · 기간 세그 This week
[ ] 🖨 Print → 새 창 PACKING LIST · SO-25003 · Customer · Warehouse Asung Trading Inc. · 유닛 지도 「🟩 P1 ✔ 12 units · 47.24 × 39.37 × 59.06 in · 551.16 lb」 · 표 CON00156 · Barcode 075724001565 · Product · Qty 12 · Total qty 12 · ⬇ PDF(글자 「ASUNG TRADING INC」 머리) · ⬇ CSV(유닛 지도에 Dimensions 열)
[ ] 검토함 ✓ 켜기 → 행이 흐려짐 · wms_order_review 한 줄(reviewed t · reviewed_by 내 id · reviewed_at) · 체크박스 title 「Reviewed by <이름> · 시각」 · Hide reviewed 로 숨김 · 끄기 → reviewed f · cleared_by/at 채워짐 · reviewed_by/at 은 **남는다**(판정 26 · 끈 기록) · title 「Not reviewed — cleared by …」
[ ] Rollback: 안내 상자(취소 길 · 판정 35) · Active waves 없음 · 「Show finalized (1)」 → SO-25003 · Finalized · Worker <이름> · ↩ Undo Finalize · Void 단추 없음 · Recent rollbacks 「No rollbacks yet.」
[ ] ↩ Undo Finalize → confirm(「back to Working … pallet/box assignments are deleted (a copy is archived first) …」) → alert 「SO-25003 rollback done (finalize) · 3 row(s) archived. … back to Working — it appears on the Fulfillment board again」
    → so.html 에서 SO-25003 이 **Working(picking)** · packed_at/by 비워짐 · wms_order_finalize 0 · wms_pallets 0 · wms_pallet_items 0 · wms_rollback_archive 3(pallet_items 1 · pallets 1 · order_finalize 1 · row_data 통째) · wms_rollback_log 한 줄(finalize · finalized → pack_complete · performed_by 내 id · original_worker = Finalize 한 사람) · **남는 것**: 픽 과제 47 · 팩 과제 23 · 픽 줄 · 팩 줄 · 픽 칸 2 · Recent rollbacks 에 한 줄(Undo Finalize · <이름> · <이름>)
    → Status 카드 Ready to finalize 1 · In-Progress Orders 에 SO-25003 Working + 「✓ ready to finalize」 · Finalized 탭 비움 · wms-fulfillment 에서 다시 팔렛 → Finalize 가능
[ ] (선택) Show finalized 뒤 SO-25003 의 「▸ 2 batches」 는 없다(배치 하나) · Undo Finalize 전 Rollback 목록에 SO-25003 이 Finalized 로만 보인다(팩 · 픽 배치 단추 없음 — 오더 단위 Undo Finalize 먼저)
[ ] (선택) Undo Finalize 뒤 ↩ Undo Pack(SO-25003 · Pack complete) → 팩 과제 23 삭제 · archive +2 · so 는 Working 그대로 → ↩ Reset Pick → 픽 줄 0 · 실제 칸 행 삭제(계획 행은 남음) → ↩ Undo Split → so **Released to WMS(at_wms)** · 과제 0 · so.html 에서 Recall 가능(판정 21 의 길) — 각 단계의 alert 에 archived 수
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_rollback · rpc/wms_review_set 200(이 함수들은 테스트 DB 에만 있다)
```

⭐ **v1.3 다섯 탭(⑤-5c2 · 판정 36 · 37 · 다섯 묶음)** — 뒷단: Discrepancy = `wms_worker_mistakes`(작업자 실수 다섯 · 열린 것 = resolved_at null · manager_resolved false · voided_at null · sbAll) · 「✓ Resolved」 = 직접 update(manager_resolved true · resolved_by = 내 id · resolved_at) · 카테고리 하나(Stock short 는 Reports · Receiving 은 입고가 올 때) ·
   Reports = `wms_reports`(kind 다섯 · **stock_short** = 「Not enough stock」 · Detail 칸에 expected → found) · 「Mark resolved」 직접 update(resolved_by = 내 id) · voided 칸 없음 · 재고 조정 연결은 판정 20 ⬜⭐ 자리(주석 한 줄) ·
   Stats = 원본 셈 그대로(완료 픽·팩 + 줄 합 · 보류 공제 · sbAll) · `wms_worker_mistakes`(responsible · reason) · `wms_reports`(reported_by · kind — Quality 표에 「Not enough stock」 열) · `wms_task_holds` · 사람 = nameOf · 입고 구간 없음(한 줄 「Receiving and putaway statistics will appear here when receiving moves to the IMS.」) ·
   Health = rpc `wms_health_check()` 한 번(20260927214447 · 13 행 · 옛 반환 칸 sort · check_key · category · title · hint · fail_count · sample) · 스냅샷 · 기록 표 · cron 없음 · 배지도 부팅 때 라이브 한 번 · 권한 없음은 창구 문장(P0001) 그대로 ·
   Trace = `so`(+ 손님 · `wms_order_finalize` · `so_line` 합) · 손님 검색 = `customer!…!inner` ilike(최근 30 · 총수) · 과제 체인 임베드(픽 줄의 `wms_pick_line_bins` — 실제 칸 우선) · `so_line`(sku · 이름) · `wms_worker_mistakes` + `wms_reports`(stock_short) 한 목록 · 시각 = 토론토 · 창고 이름에 Edmonton 이면 EDM 줄 병기.
⭐ 옛 화면과 다른 것(v1.3): 「Cin7 Fixed」 → 「✓ Resolved」 · Discrepancy 의 「Stock short (inventory)」 · 「Receiving」 카테고리 없음 · Health 의 「Last auto snapshot」 줄 → 「Checked just now」 · Trace 머리의 Imported → Released to WMS · Finalized by 이름 · 되돌려진 오더는 과제 체인이 비어 보인다(원본도 같다 · 안내 문구에 「see Recent rollbacks」) · Recent rollbacks 의 단계 칸은 글자 표(Finalized · On pallets · Pack complete · Pick complete · Pick reset · Split · Released to WMS · Wave) · 화면 글자에 ⑤ · 차수 번호 · Cin7 없음.
⚠️ **시험 재료 만드는 길**(테스트 DB · 2026-09-27 저녁 실물 = SO-25003 at_wms · 과제 0 · 실수 0 · 리포트 0 → 다섯 탭이 처음엔 대부분 빈 화면): ① so.html 에서 SO-25003 이 Released to WMS 인지 확인(아니면 Release to WMS) → ② Split & Waves 에서 Create batches → ③ Picking 에서 Start · 바코드 075724001565 를 **11번만** 스캔 · 「⚠ Not enough stock」 선언(Reports 의 stock_short) · Complete as incomplete → 마찰 모달 End(wms_worker_mistakes short_pick) → ④ Packing 에서 Start verify · 11 스캔 · Complete pack → ⑤ Fulfillment 에서 팔렛 · 치수 · Finalize → 다섯 탭: Discrepancy 에 short_pick 1(Responsible 픽커) · Reports 에 Not enough stock 1(expected 12 → found 11 · 팩 완료가 resolve 했으면 Resolved 쪽) · Stats 에 픽 1 · 팩 1 · 실수 1 · 리포트 1 · Health 13 행 전부 0(또는 걸린 것) · Trace SO-25003 에 배치 한 줄(Picked by · Pick time · Packed by · Lines verified 1 · Units 11 · Issues 1).

```
[ ] Discrepancy: 기간 세그(This week 기본) · 요약 카드(Worker mistakes n (m open) · Total) + 추세 막대 · 필터 All · Worker mistakes 둘 · 「Open Discrepancies (0)」 「No open discrepancies. 👍」 · Recently resolved 「No activity in this period.」 · 재료 뒤: short_pick 행(Type 「pick short」 · Ordered 12 · Actual 11 · Responsible = 픽커 이름 · 경과 색) · 「✓ Resolved」 → confirm → 흐린 행이 Recently resolved 로 · wms_worker_mistakes.manager_resolved t · resolved_by 내 id · 배지 수 −1
[ ] Reports: 기간 세그 · 요약(종류 다섯 · 추세) · 필터 All · Wrong location · Barcode changed · Image differs · Box barcode · Not enough stock · Open/Resolved 표 · 재료 뒤: stock_short 행(Type 「Not enough stock」 · Detail 「expected 12 → found 11」 · Reported by 픽커 · (picker)) · 「Mark resolved」 → Resolved (recent) 로 · resolved_by 내 id
[ ] Stats: 기간 세그 · Throughput by worker(재료 뒤: 픽커 한 줄 「Pick 1 (avg n min · n minus holds) · held 0 min · Pack 1 …」 · 줄 「Pick 1 line · 11 units (base)」 · 막대 둘 · 펼침 배치 목록) · Quality reports by worker(Not enough stock 열 1) · Mistakes by worker(short_pick 1 · 평가 글자 없음) · 아래 한 줄 「Receiving and putaway statistics will appear here …」 · 입고 표 없음
[ ] Health: 「Running checks…」 → 「All clear — every invariant holds」(또는 「n critical · n warnings to review」 · ⚠️ ⑤-5c3 적용 전에는 「Short pick without a mistake row — 1 row」 가 떠 있었다 — 검사 버그 · SO-25003 의 「Not enough stock」 신고를 못 봤다 · 20260927223051 적용 뒤 0) · 「Checked just now — every visit runs the checks live」 · 카드 13(마지막 Last release to WMS 는 회색 ·「n m/h/d ago」) · ↻ Re-run · 탭 배지 = critical 수(0 이면 숨김) · wms_manage 없는 manager 계정이면 「Health check failed: You cannot view WMS health — this needs the wms_manage screen — ask an admin」 · 배지 「?」
[ ] Trace: SO-25003 Enter → 머리(번호 · 손님 · Toronto · 상태 글자 · 「Released to WMS <시각> · not finalized yet(또는 Finalized <시각> by <이름>) · 1 lines · 12 units ordered」 · 「All times are Toronto local … (the database stores UTC)」) · 배치 표(Batch · Picked by · Pick time → · Packed by · Pack time · Lines verified · Units verified · Issues) · 배치 하나면 자동 펼침(SKU · Product · Bin C070303 · Assigned 12 · Picked 11 (−1) 빨강 · Verified) · 아래 ⚠ 줄(pick short · declared/responsible 이름) · 과제 0 인 오더면 「No pick batches — … (or its batches were rolled back — see Recent rollbacks on the Rollback tab) …」 · 손님 검색 「JOJOJO」 → 최근 30 표(Order · Customer · Warehouse · Status · Finalized) · 행 클릭 → 트레이스
[ ] Rollback 탭 Recent rollbacks 의 Stage 칸이 글자로(Finalized → Pack complete · Pack complete → Pick complete · Pick complete → Pick reset · Split → Released to WMS) · 설명 글에 차수 번호 없음
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_health_check 200(부팅 때 배지 1 + 탭 열 때 1)
```

⚠️ [2026-09-27 v1.3] 아직 없는 것 — Receiving 탭 · Stats 입고 구간(입고가 IMS 로 올 때 · po_receipt_work) · 배치 단위 · 웨이브 되돌리기 실측 · 한 번에 되돌리기(컷오버 뒤) · Trace 에 되돌리기 로그 한 줄(⬜ 안) · stock_short → 재고 조정 연결(판정 20 ⬜⭐ · 재고 사건 차수).  → ✅ [2026-09-27 밤] Receiving 탭 · Stats 입고 = v1.5(아래)

⭐ **v1.5 Receiving 탭 · Stats 입고(⑤-6b · 2026-09-27 · Claude Code · 마이그레이션 `20260928014844_wms_5_6b_recv_delete_health_receipt.sql`)** — 뒷단:
   Receiving = `po_receipt`(draft 전량 sbAll + 최근 60 · `po!po_receipt_po_id_fkey(po_number · supplier!po_supplier_id_fkey(name))` · `po_receipt_work`(qty · bin · placed · counted_by · putaway_by) · `wms_task_holds`(열린 보류) · `wms_receipt_complete`(completed_by/at) 임베드) ·
   승인 대기 = `po_receipt_diff` kind off_po 열린 것(+ receipt · product 임베드 · **읽기만** — 한 줄 「Approve and reject are not available yet — the item stays waiting and cannot be put away」) · 배지 = 그 수 ·
   「Awaiting putaway」 = 칸 있고 putaway_done false 인 줄(draft 만) · 「Put away →」 = `wms-receiver.html?receipt=<uuid>` · 「Completed — awaiting office confirmation」 = 창고 Complete 된 draft + **Reopen**(rpc `wms_recv_reopen` · wms_manage) + Confirm 단추(화면 값 wms_receiving_confirm 이 있을 때만 · rpc `wms_recv_confirm` · 지금 0 명) ·
   history 최근 60 · 총수 캡션 · Review = rpc `po_receipt_detail` + `wms_recv_state`(칸별 묶음 · counted/placed 사람 · off-PO 대기 · 안 센 라인 수) · **Delete** = rpc **`wms_recv_delete(p_receipt_id)`**(draft 만 · manager 이상 · 창고 · 지우기 전에 po_receipt · work · diff · holds · complete 행을 `wms_rollback_archive`(action receipt_delete) 에 · `wms_rollback_log` 한 줄 · 입력 확인 = RCV 번호 타이핑).
   Stats 입고 = `po_receipt`(created_at 기간 · confirmed_at) + `po_receipt_work`(counted_by/at · putaway_by/at 두 축 · lines = distinct po_line_id · units = Σ qty_ea) + `wms_receipt_complete.completed_at`(받는 시간 = 시작 → Complete) + `wms_task_holds.receipt_id`(− holds) + `po_receipt_diff`(over · short · off_po · 열림) · Throughput by worker 의 「Receive lines」 병합 되살림(prodRecv · 열쇠 = counted_by 이름 · 펼침 = PO · RCV).
   Health = rpc 그대로 · **15 행**(hold_leak 에 입고 가지 · receipt_completed_not_confirmed 130 · stale_receipt_draft 140 — 화면 코드 무변).
⭐ 옛 화면과 다른 것(v1.5): 「Apply to Cin7」 절 → 「Completed — awaiting office confirmation」 · applied/외부 처리 배지 · Mark externally applied · Back to completed · dry-run/commit · 트랜스퍼 배너 · Source TR 없음 · 승인 · 거절 단추 없음(다음 차수) · 상태 글자 = In progress · Held · Completed — awaiting office confirmation · Confirmed by the office · Cancelled · 오피스 화면은 「Purchase Receipts」(판정 40) ·
   Stats 「Transfer receipts」 · 「Applied bins failed」 · 「Applied outside WMS」 · 「Transfer lines moved」 없음 · 「Avg complete → apply」 → 「Avg complete → office confirm」 · Workers 열 둘(Counted by · Put away by — Place all 재스탬프 각주 사라짐 · 두 축이라) · 「Receiving discrepancies … never recorded before 2026-07-28」 각주 없음.
⚠️ 모집단(2026-09-27 밤 테스트 DB · Claude Code 실측 · begin read only): RCV-00027(draft · PO-02026 · 12 · 놓음 1 · **창고 Complete** · 미확정) · RCV-00028(draft · PO-02007 · 13 줄 156 · 전부 놓음 · 닫힌 보류 1 · Complete 아님) · confirmed RCV-00005 · 00006 · 00026 · off_po 열린 행 0 · 시퀀스 RCV 28.

```
[ ] Receiving 탭(Health 뒤 · Finalized 앞) · 배지 없음(off-PO 열린 행 0) · 「Off-PO items waiting for a decision」 = 「No off-PO items waiting for a decision.」(v1.8 — 회색 「Approve and reject are not available yet …」 줄은 없어졌다) · 「Rejected — still on a shelf」 = 「Nothing rejected is left on a shelf.」
[ ] Awaiting putaway = 「Nothing awaiting putaway — …」(RCV-00027 · 00028 전부 놓음) · (선택) wms-receiver 에서 RCV-00028 한 줄의 Placed 를 풀면 여기 한 줄 「⚠ 1 row / n units awaiting putaway」 + 「Put away →」 → wms-receiver.html?receipt=<uuid> 로 그 입고가 열린다
[ ] Completed — awaiting office confirmation = RCV-00027 한 줄(PO-02026 · 공급처 · Toronto · Completed <이름> · 시각 · Review · Reopen · Confirm 단추 없음) · 아래 「1 receipt(s) still receiving/held」(RCV-00028)
[ ] Review(RCV-00027) → 모달 「RCV-00027 · PO-02026 · Completed — awaiting office confirmation」 · started by · completed by · 📍 <칸> 1 row · 12 / line 12 of 12 · ✓ placed · counted <이름> · placed <이름> · 「Reopen for the warehouse」 · Close
[ ] ⭐ Reopen(RCV-00027) → confirm → 「RCV-00027 reopened」 · wms_receipt_complete completed f · reopened_by 내 id · 목록에서 Completed 절이 비고 「2 receipt(s) still receiving/held」 · wms-receiver.html 에서 RCV-00027 이 다시 수정 가능(배너 없음) → 거기서 다시 Complete → 여기 Completed 절에 다시 선다
[ ] Receiving history = RCV-00028 · 00027(draft · rows · u) · 00026 · 00006 · 00005(Confirmed by the office <이름> · 날짜 · Delete 단추 없음) · 총수 캡션 없음(5 ≤ 60) · Workers 열(counted_by · putaway_by 이름 · +n)
[ ] ⭐ Delete 시험 — wms-receiver 에서 PO-02002(또는 PO-02001b)를 Start 해 새 초안(RCV-00029 · 번호 하나 소비 · 정상)을 만든 뒤 여기 history 의 Delete → prompt 「Delete receipt RCV-00029? Nothing has been counted on this receipt. …」 → RCV-00029 타이핑 → 「RCV-00029 deleted (1 row(s) archived)」 · po_receipt 에서 사라짐 · wms_rollback_archive 한 줄(action receipt_delete · order_number RCV-00029 · batch_label PO 번호 · src_table po_receipt) · wms_rollback_log 한 줄(receipt_delete · draft → deleted) · 틀린 번호 타이핑 → 「Receipt number mismatch — cancelled」 · confirmed 행에는 Delete 가 안 보인다
[ ] (선택) off-PO 대기 줄 — wms-receiver 에서 RCV-00028 에 PO 에 없는 제품을 스캔 → 여기 배지 1 · 표 한 줄(RCV-00028 · PO-02007 · SKU · Qty 1 · Bin 「no bin yet」 · Put away by — · Waiting <나이>) · 「Decide in Purchase Receipts →」 = `receiving.html?receipt=<uuid>&diff=<uuid>`(v1.8 · 같은 창 · 줄 아무 데나 눌러도 간다) — 6c3 전에는 그 화면이 diff 를 아직 못 짚는다(입고는 연다)
[ ] Stats: 기간 This week → 「Receiving」 카드 다섯(Receipts started 2 · Units counted 168 · Confirmed by the office 0 · Completed, not yet confirmed 1 · Still receiving 1) · 표 한 줄 PO(Receipts 2 · Lines 14 · Units 168 · Avg receive(RCV-00027 만) · − holds · Avg complete → office confirm — · Counted by <이름> (14) · Put away by <이름> (14)) · Receiving by warehouse Asung Trading Inc. 2 · 14 · 168 · Putaway done 100% · Backlog 0 · 0 · Receiving differences 전부 0(기간 안 차이 없음) · Throughput by worker 의 내 이름 줄에 「Receive 14 lines · 168 units (base) / 2 receipts · putaway 100%」 + Receive lines 막대 + 펼침 「PO-02007 · RCV-00028 · 13 · 156」 「PO-02026 · RCV-00027 · 1 · 12」
[ ] Health: 카드 15(Receipt completed in the warehouse but not confirmed for 24h · Receipt draft with nothing counted for 24h 가 long_hold 뒤 · Last release 앞) · 지금은 전부 ✓ OK(RCV-00027 Complete 가 24h 안) · 내일 이 시각 뒤 RCV-00027 을 확정 안 했으면 「1 row」 warn 이 뜬다
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_recv_reopen · rpc/wms_recv_delete · rpc/po_receipt_detail · rpc/wms_health_check 200(이 함수들은 테스트 DB 에만 있다)
```

⚠️ [2026-09-27 v1.5 · v1.8 갱신] 아직 없는 것 — off-PO 결정 UI(**6c3 · receiving.html · 대화 Claude** — 창구 po_receipt_diff_settle_off_po 는 있다) · Confirm 단추 실측(wms_receiving_confirm 을 켠 사람이 없다) · Trace 에 입고 · 되돌리기 로그 · 한 번에 되돌리기(컷오버 뒤).

⭐ [2026-09-28 · Claude Code adj-b · 0c96926] **wa v1.9** — 판정 20 연결 · Reports 탭
```
[ ] 빌드 표시 「2026-09-28 · wa v1.9」
[ ] Reports 의 **열린 「Not enough stock」 줄**에만 「Mark resolved」 옆 「Adjust stock」 — 다른 종류 · 닫힌 줄엔 없다
[ ] 단추는 ims_can_adjust() 가 true 인 사람에게만(admin · 열쇠를 켠 supervisor · manager) · 열쇠 없는 supervisor · manager · worker 에게는 안 보인다(Mark resolved 만)
[ ] 누르면 같은 창에서 stock-adjustments.html?report=<id> — 같은 신고의 초안이 있으면 그것이 열린다
[ ] Mark resolved 는 그대로 돈다(조정 없이 닫기)
```

---

## 7-r. `wms-receiver.html` — Receiving (2026-09-27 밤 신설 · Claude Code ⑤-6a · 1판 「2026-09-27 · rc v1」 → 대화 Claude **rc v1.1** = 판정 41(+ · − 스테퍼로 수량이 차도 다음 줄로 안 넘어간다 — 계속 누르면 다른 제품을 세던 사고 · 스캔 · Enter quantity 는 그대로 넘어간다) · 운영 `asung-wms/receiver.html` 의 복사본을 IMS 표 · 창구 위에 옮겼다 · 마이그레이션 없음 · 판정 38 「세 번 나누는 A」의 첫 차수 → 대화 Claude rc v1.2 · **rc v1.3**(판정 42 · 42 A — Confirm into stock 단추 표시 규칙 · d4ab33e · b4ab1ab) → Claude Code ⑤-6c2 **rc v1.4** 「2026-09-27 · rc v1.4」 = off-PO 를 바로 놓는다(판정 43) — 아래 ⑤-6c2 절)

뒷단(⑤-3a `20260926213035` · ⑤-3b `20260926232330` · 정본 `asung-wms/docs/design/so-module.md` §24-l · m · n · 판정 5 · 25 · 27 · 28 · 29 · 30 · 33):
시작 = **`wms_recv_start(p_po_id)`**(PO 당 열린 초안 하나 · 있으면 그것(existing · held) · 없으면 새 RCV 번호 — ⚠️ 24-m 「안 돌린 가지」가 여기서 처음 돈다) · 줄 · 작업 줄 · 헤더 = rpc `po_receipt_detail`(lines[] = PO 라인 전부 · work[] = 빈별 작업 줄 · diffs[] off_po) · 상태 = rpc `wms_recv_state`(completed · held) ·
수량 = **`wms_recv_scan(p_receipt_id, p_po_line_id, p_delta_ea, p_count_method)`**(델타 · 같은 라인 잠금 아래 합쳐진다 — 스캔 · 스테퍼 ±) · **`wms_recv_count(… p_total_ea, p_seen_total …)`**(Enter quantity · 화면이 본 총량 CAS — 어긋나면 창구가 거부 · 화면은 Keep theirs / Use mine / Recount) ·
놓기 = **`wms_recv_putaway(p_work_id, p_bin_id, p_done)`**(작업 줄 id · 같은 칸 줄과 병합) · Place all = `wms_recv_place_all(p_receipt_id, p_bin_id, p_done)` · 보류 = `wms_recv_hold` · 재개(열 때 자동) = `wms_recv_resume` · 끝 = **`wms_recv_complete`**(판정 28 · Partial 없음) · 확정 스위치 = `wms_recv_confirm`(판정 27 B · 화면 값 wms_receiving_confirm 이 있는 사람에게만 단추 · 지금 0 명) ·
PO 에 없는 물건 = **`wms_recv_off_po(p_receipt_id, p_product_id, p_qty_ea)`**(차이 큐 한 행 · 다시 스캔 = 더함 · 승인 · 투입은 ⑤-6c) ·
읽기 = `po`(confirmed + supplier) · `po_receipt`(draft + po · work · holds · complete 임베드) · `product` · `product_barcode`(낱개 factor 1 + 그 낱개를 parent 로 둔 세트 ×pack_factor — wms_pick_lines 와 같은 뜻) · `ref_bin`(창고 · 활성 · 모달은 300 씩 서버 검색 · 스캔은 정확 일치) · `wms_zone_sequence`(warehouse_id|zone) · rpc `ims_last_bin`(판정 29 — **미리 보여만** · 자동 배정 쓰기 없음) · `ref_warehouse` · `ims_staff`(id,name) · 쓰기 직접 = `wms_reports`(barcode_mismatch · box_barcode · receipt_id · po_number · reported_by = ims_staff.id · source receiver).

⭐ 진입점은 `ims-config.js` · `ims-auth.js` 뿐(0-a 검사 다섯째 grep 0) — 운영 WMS 는 그대로 돈다 · 이 화면은 테스트 프로젝트의 발주만 본다.
⭐ 권한 = wms_receiving 열쇠(WMS 방 · min_role 없음 · **사람마다 켠다** — 판정 39 · 20260928010908 이 worker 의 자동 가지를 뺐다 · Caleb 이 staff.html 에서 worker 7 에게 PICKING · PACKING · FULFILLMENT · WMS_RECEIVING write 를 켰다 · R8 의 「저절로」 는 그 마이그레이션 전 실측) · 모드 'wms' · 탭 「IMS · WMS | Picking · Packing · Fulfillment · Receiving · Split & Waves · WMS Admin」.
⭐ 소유권 비교 없음(리시빙은 원래 소유자가 없다 — 나눠 받기가 기능) · me.name 은 presence 열쇠 · payload 표시용만 · 「Started by」 = created_by nameOf · 창고 = me.access.warehouses(null 이면 전부).
⭐ 옛 화면과 다른 것: 목록 = 「Resume Receiving」(이 창고의 draft 입고 · RCV 번호 병기 · Held / Completed 태그) + 「Ready to receive」(confirmed PO · ↻ POs) — Cin7 목록 · Applied 배지 · ↻ Transfers 없음 · expected = 이 문서에서 받을 남은 수량(ordered − received_before · 판정 5 — 인보이스 기준이 아니다) · 「NOT INVOICED」 갈래 없음 ·
   Partial 단추 없음(판정 28 · 「오늘은 여기까지」 = Hold) · 풋어웨이 진입에 자동 배정 없음(판정 29) — 칸 없는 줄은 **「suggested」 그룹**(Last bin 이름 · 「last kept here」)으로 보이고 Placed / Place all 을 누르는 순간 그 칸으로 놓인다 · Last bin 없는 줄 = 「Bin needed」 → Assign bin(스캔 · 서버 검색 300) · 모르는 칸 이름은 거부(「… is not a bin at Toronto — ask the office to add it」) ·
   풋어웨이 행 = **작업 줄**(한 라인이 여러 칸에 나뉠 수 있다 · 같은 칸으로 다시 놓으면 창구가 합친다) · Complete 뒤 = 회색 배너 「Completed by … — ask a manager to reopen …」 + 읽기 전용(판정 30 · 목록 카드 「View」) · 확정은 오피스 receiving.html(판정 27 B) ·
   PO 에 없는 물건(rc v1.4 · 판정 43) = 풋어웨이에서 **작업 줄과 같은 그룹**을 탄다(suggested · 칸 · Bin needed · Placed · Change · Place all — 창구만 wms_recv_off_po_putaway · 한 제품 한 칸) · 줄 칩 「OFF-PO · put it away — the manager decides later」 · 그 줄은 스캔으로만 더한다(− · Enter quantity 거부 문장) · 모르는 바코드 = 「Unknown barcode — ask the office to register the product」(약식 등록은 ⑤-6 밖) ·
   사진 · 「⚑ Image differs」 없음(판정 33 · HAS_IMAGES false) · 인쇄 머리 글자 「ASUNG」 · id 는 uuid(숫자 변환 0) · 창고 이름에 Edmonton 이 들면 edmonton(존 · 시각).
⚠️ 모집단(2026-09-27 밤 테스트 DB · Claude Code 실측 · begin read only): draft 입고 **0** · confirmed PO 4 = PO-02001b(1줄 · 100) · PO-02002(4 · 1,015) · **PO-02007(13 · 156 · 세트 자식 13)** · **PO-02026(1 · 12)** · 전부 Toronto · 시퀀스 RCV 26(⚠️ 첫 Start 가 27 을 당긴다 — 정상 사용) · PO 2027 · SO 25004 · 인보이스 60001 · 크레딧 1000.

```
[ ] 로그인 뒤 헤더 「이름 · 역할」 · 「2026-09-27 · rc v1.1」 · ☰ Menu 에 Receiving(Fulfillment 뒤 · Split & Waves 앞) · 탭 줄 「IMS · WMS | Picking · Packing · Fulfillment · Receiving · Split & Waves · WMS Admin」 · worker 계정도 들어온다(R8) · 초록 점(연결)
[ ] 목록: 「Scan a PO barcode or load the confirmed POs …」 · Resume Receiving 비어 있음 · ↻ POs → Ready to receive 에 PO-02001b · PO-02002 · PO-02007 · PO-02026(공급처 · Confirmed · 날짜 · Toronto) · PO 스캔 칸에 PO-02026 Enter → 바로 시작
[ ] ⭐ PO-02026 Start → 토스트 없음(새 초안) · po_receipt 한 줄 RCV-00027(draft · created_by 내 id · warehouse Toronto) · 제목 「PO-02026 · RCV-00027」 · Single 뷰 줄 하나 0 / 12 · Barcode 줄(낱개 · ×factor 세트) · Last bin 칩(원장에 자리가 있으면) · ⚑ Barcode changed · ⚑ Box barcode (사진 칸 · Image differs 없음)
[ ] ⭐ 창고 기기(태블릿 · 스캐너)에서 소리 — 스캔 성공(짧은 삑) · 줄 완료(올라가는 소리) · 세트 스캔(세 음) · 실패(사이렌)가 들린다(Caleb 은 PC 에서 못 들어 봤다 · 2026-09-27) · − · + 로 수량이 차도 다음 줄로 안 넘어간다(판정 41)
[ ] 바코드 스캔(타이핑 + Enter) → 「✓ <SKU> +1 (1/12)」 · po_receipt_work 한 줄(qty_ea 1 · bin null · counted_by 내 id · count_method scanned) · 12 번째에 「· DONE」 + 완료 소리 · 13 번째 → confirm 「expected quantity already met …」 → 「⚠ OVER … 13/12」 · − 로 12 로 돌림(스테퍼 = 델타 · count_method manual)
[ ] Enter quantity → 10 → 10 / 12 · 다른 탭(또는 오피스 receiving.html)에서 같은 줄을 11 로 바꾼 뒤 Enter quantity 12 → 「Quantity conflict — Someone else set this to 11 while you were entering 12」 · Keep theirs → 11 · Use mine → 12 · Recount → 다시 묻기
[ ] Putaway → → 자동 배정 없음: Last bin 이 있으면 「<bin> · suggested」 그룹에 「last kept here」 줄 · Placed → 그 칸에 놓임(work.bin_id · putaway_done t · putaway_by 내 id) · Last bin 없으면 「Bin needed」 → Assign bin → 칸 스캔(정확 일치) 또는 목록(300 · 타이핑 필터 · 존 머리) → 줄이 그 칸 그룹으로 · Placed · Change → 다른 칸 → placed 해제 · 모르는 이름 → 「"X" is not a bin at Toronto — ask the office to add it」
[ ] Complete → confirm(요약: Short/Over/not placed 줄 수 · 「The office confirms it into stock; anything not received stays on the order.」) → 「PO-02026 completed」 · wms_receipt_complete(completed t · completed_by 내 id) · 목록 카드 「Completed — awaiting office confirmation」 · 「View」 → 회색 배너 「Completed by <이름> · <시각> — ask a manager to reopen …」 · Hold · Complete 비활성 · 스캔 → 토스트 「This receipt is completed — ask a manager to reopen it」 · Placed 단추 비활성
[ ] 오피스 receiving.html 에서 RCV-00027 을 열면 Counted 12 · 빈이 보인다 · Confirm 하면 확정(경고 wms_not_completed 없음 = Complete 뒤) → WMS 목록에서 사라짐(draft 아님)
[ ] ⭐ PO-02007(13줄) Start → RCV-00028 · List 뷰 · Sort 「Zone / Last bin」 → 존 머리 · 칩 바 · Bay 칩 · 세트 바코드 스캔 → 「+<factor>」 okbox 소리 · 몇 줄 받고 Hold (later) → 「PO-02007 held」 · wms_task_holds(receipt · worker 내 id) · 목록 「Held」 · Resume → 수량 보존 · resumed_at 채워짐 · 헤더 「🟢 also here」 는 다른 기기가 같은 입고를 열었을 때
[ ] Putaway → 여러 줄 같은 suggested 칸 → 「Place all (n)」 → 줄마다 그 칸으로 놓임 · 이미 칸 있는 그룹의 Place all → wms_recv_place_all 한 번 · 재클릭 → confirm 「Clear "placed" …」 → 전체 해제 · 🖨 Print → 「PO RECEIVING · PO-02007 · RCV-00028」 · Last bin 열 · 바코드 CODE128
[ ] PO 에 없는 제품 바코드 스캔 → confirm 「<SKU> — not on this PO. Add as OFF-PO? Put it away as usual — the office accepts or rejects it later.」 → 「✓ OFF-PO <SKU> +1 — put it away, the manager decides later」 · po_receipt_diff 한 줄(kind off_po · po_line_id null · product_id · received_qty 1 · note 「off-PO (WMS receiving) — approval pending」 ← 창구 20260926232330 의 글자 · 화면엔 안 보인다) · 같은 것 다시 스캔 → received_qty 2(행 하나) · 줄 칩 「OFF-PO · put it away — the manager decides later」 · − 또는 Enter quantity → 「Off-PO quantity can only be added by scanning — ask a manager to reject the item …」 · Putaway 는 아래 ⑤-6c2 절(rc v1.4 — 막지 않는다) · Complete 요약에 「Off-PO waiting for a decision: 1 (<SKU>) — the office decides in Purchase Receipts」
[ ] 모르는 바코드(마스터에 없음) → 빨간 「✕ Unknown barcode」 + 토스트 「Unknown barcode — ask the office to register the product」 · 아무 표도 안 바뀐다
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_recv_start · po_receipt_detail · wms_recv_state · wms_recv_scan · wms_recv_putaway · wms_recv_complete 200(이 함수들은 테스트 DB 에만 있다)
```

⭐ ⑤-6c2 rc v1.4 — off-PO 흐름(판정 43 · 창구 20260928025627 — `wms_recv_off_po_putaway(p_diff_id, p_bin_id, p_done)` :73 · `wms_recv_off_po_removed(p_diff_id)` :106 · 읽기 = `po_receipt_detail` diffs[] 의 product_id · bin_id · bin · placed_by(_name) · placed_at · resolution · resolved_at · unit_price · removed_by(_name) · removed_at :1096):
   off-PO 줄 = 풋어웨이의 **가짜 작업 줄 하나**(id `d:<diff_id>` · 수량 = received_qty · 칸 = diff.bin · 놓았다 = placed_at) — Last bin 이 있으면 suggested 그룹 · 없으면 Bin needed · Placed / Change / Place all 전부 같은 단추(창구만 다르다 · 한 제품 한 칸 · 나눠 놓기 없음) ·
   결정 뒤 = accepted_* → 칩 「Accepted — in stock」 · 그 줄의 Placed · Change 잠김(오피스가 정한 물건은 창고가 못 옮긴다 · 창구도 거부) · rejected → 빨간 그룹 「Rejected — take it off the shelf」 · 「take it off <bin> and set it aside for return」 · **Removed** 단추(confirm → wms_recv_off_po_removed → 줄이 사라진다 · Health 160 이 닫힌다) · 거절인데 칸이 없으면 「never put on a shelf」 칩만 ·
   결정된 off-PO 줄은 스캔으로 더할 수 없다(같은 바코드 = 새 off_po 행 · 창구 wms_recv_off_po) · Complete 요약 = 「Off-PO waiting for a decision: n (SKU…)」 · 「Rejected off-PO still on a shelf: SKU @ bin」(둘 다 막지 않는다 · 정보) · 6c2 만으로 「결정」은 못 낸다(6c3 receiving.html · 대화 Claude)
```
[ ] ⭐ Caleb 시험 순서(6c3 뒤 전부 돈다 · **[6c2] 표시 = 6c2 만으로 된다**) —
    [6c2] PO-02002 Start → RCV-00029(번호 하나 소비 · 정상) → 라인 둘 스캔 →
    [6c2] ABE10612 스캔 6번(또는 1번 + 5번) → confirm 「not on this PO. Add as OFF-PO? Put it away as usual …」 → 줄 칩 「OFF-PO · put it away — the manager decides later」 · po_receipt_diff off_po received_qty 6 →
    [6c2] Putaway → off-PO 줄이 suggested(Last bin 있으면) 또는 Bin needed 에 「OFF-PO」 칩 + 「not on the PO — put it away, the manager decides later」 · Placed → po_receipt_diff.bin_id · placed_by 내 id · placed_at(작업 줄은 안 생긴다) · Change → 다른 칸 → bin_id 덮어씀 · placed 해제 → Placed 다시 →
    [6c2] (ABE12006 스캔 3 → Placed) — 둘째 off-PO →
    [6c2] Complete → confirm 요약 「Off-PO waiting for a decision: 2 (ABE10612, ABE12006) — the office decides in Purchase Receipts」 · 「PO-02002 completed」 →
    [6c2] WMS Admin Receiving 탭 → 배지 2 · 「Off-PO items waiting for a decision」 두 줄(RCV-00029 · PO-02002 · SKU · Qty · Bin <칸> · Put away by <이름> · Waiting <나이>) · 줄 누름 → `receiving.html?receipt=<uuid>&diff=<uuid>` 같은 창(6c3 전엔 입고만 열린다) · Health 「Off-PO waiting for a decision for 24h」 ✓(24h 안) →
    [6c3] Purchase Receipts 에서 ABE10612 → Accept · billed 3.10 → inv_ledger po_in(line_ref `<diff>:offpo` · received_on) · inv_layer manual 3.10 × fx · ABE12006 → Reject →
    [6c3 뒤 · 화면은 6c2] 창고 화면 RCV-00029(Reopen 뒤 또는 읽기 전용) → ABE10612 칩 「Accepted — in stock」 · 잠김 · ABE12006 빨간 그룹 「Rejected — take it off <칸> and set it aside for return」 → Removed → confirm → 「ABE12006 removed from <칸>」 · po_receipt_diff.removed_by/at →
    [6c3 뒤] WMS Admin 「waiting for a decision」 비어짐 · 「Rejected — still on a shelf」 비어짐(Removed 전엔 한 줄) · Stats Off-PO accepted 1 · rejected 1 · Health 150 · 160 ✓
[ ] 콘솔(F12) 빨간 오류 없음 · Network 에 gftpcnkxbdjzzfvzwcfl(운영) 요청 0 · rpc/wms_recv_off_po · wms_recv_off_po_putaway · wms_recv_off_po_removed 200(테스트 DB 에만 있다)
```

⚠️ [2026-09-27 밤 · ⑤-6c2 갱신] 아직 없는 것 — off-PO **결정**(받는다 · 거절 = 6c3 receiving.html · 대화 Claude) · 약식 등록 · 트랜스퍼 입고(운영 WMS 로만 · ⬜13) · 보관용 칸 단추(§20 판정 3 후속) · 사진(판정 33) · 확정 단추 실측(wms_receiving_confirm 을 켠 사람이 없다) · Reopen 실측(wms_recv_reopen 은 ⑤-6b 화면에서).

---

## 7-s. `stock-adjustments.html` — Stock Adjustments (2026-09-28 신설 · 대화 Claude · 「adj v1」 → v1.1(0 인 칸 흐리게 · Last here · 칸 목록 처음부터) → **v1.2**(판정 56 원가 0 경고 · 신고에 뽑은 칸 없으면 Last bin 줄))

뒷단: asung-wms `20260928142722`(창구 · 표) · `20260928151948`(속도 · 판정 54) · 정본 so-module §25(판정 47 ~ 59).
읽기 `inv_adjust_list` · `inv_adjust_detail` · `inv_adjust_preview` · `inv_adjust_from_report` · `ims_can_adjust` · `ims_can_adjust_read` · 쓰기 `inv_adjust_create` · `inv_adjust_line_set` · `inv_adjust_line_remove` · `inv_adjust_delete` · `inv_adjust_confirm`.
⭐ 조정은 되돌릴 수 없다(판정 53 · 틀리면 새 문서) — **확정은 시험 순서의 맨 마지막.** 원장 · 원가 레이어가 그 순간 움직인다.
⭐ 권한 = admin(역할) + 열쇠 stock_adjust 를 직접 켠 supervisor · manager(판정 49) · worker 는 켜도 안 된다(판정 50) · 열쇠 없는 supervisor 는 목록 · 상세를 읽기만.

```
[ ] 빌드 표시 「2026-09-28 · adj v1.2」 · ☰ Menu 에 Stock Adjustments(Manager List 뒤 · 탭 아님)
[ ] 새 문서 → 창고 고르기 → ADJ-000NN(지운 초안 번호는 빈다 · 판정 55)
[ ] 줄 넣기: SKU · 칸 · set(N 개로) / delta(± N) · 사유 found · lost · damaged · count · other(other 는 메모 필수 · 판정 52) · 단가(선택)
[ ] 칸 목록 — 0 인 칸은 흐리게 · 「Last here」(ims_last_bin) · 목록은 처음부터 보인다
[ ] 줄에 장부 · 뽑혔지만 안 나간 수량(P) · 선반 기대량(장부 − P) · delta · 결과 · 원가 갈래가 보인다
[ ] 결과가 0 아래로 가는 줄 → 미리 보기에 거부 · 확정 막힘(음수 금지)
[ ] ⭐ CAS — 줄을 적은 뒤 다른 곳에서 같은 칸이 움직이면 확정이 「ledger changed (you saw …)」 로 거부 · Re-read(줄 다시 저장) 뒤 새 값으로
[ ] ⭐ 판정 56 — 원가 0 으로 들어갈 줄(단가 없고 남은 레이어 0)이 있으면 확정 창에 빨간 상자(줄 이름) + 「I know these go in at cost 0」 을 체크해야 확정 · 줄 창에 설명 글
[ ] ?report=<id>(WMS Admin 「Adjust stock」) — 「Adjust from a "Not enough stock" report」 창 · 뽑은 칸(planned=false) · SKU · 목표 set 0 이 채워짐 · 뽑은 칸이 없으면 Last bin 으로 set 0 줄 · 그것도 없으면 SKU 채운 줄 창 · 같은 신고의 초안이 있으면 그것이 열린다
[ ] 확정(맨 마지막) → confirmed · 원장 adjust_existing/adjust_new(source ims) · 신고에서 왔으면 그 신고가 닫힌다 · Mark resolved 없이
[ ] 확정 뒤 삭제 · 줄 고치기 거부 · 초안 삭제는 된다
[ ] 콘솔 빨간 오류 없음 · Network 에 운영 주소 요청 0
```

---

## 7-t. `wms-mover.html` — Bin Moves (2026-09-28 신설 · 대화 Claude · 「mv v1」 · 창고 스캔 · 운영 원본 없는 새 WMS 화면)

뒷단: asung-wms `20260928182712`(창구 · 표 · 1429943) · 정본 so-module §26(판정 60 ~ 63 · 묶음 열).
읽기 `inv_move_open_plans` · `inv_move_list` · 쓰기 `inv_move_now`(create + 줄 + 확정을 한 트랜잭션에 — 초안이 남지 않는다).
⭐ 옮기기는 되돌릴 수 없다 — 틀리면 반대 방향 새 옮기기(메모에 원래 번호 · 판정 53 모양). 원장은 행 둘(출발 − · 도착 +) · 원가 레이어는 안 움직인다.
⭐ 권한 = 열쇠 stock_move(Bin moves)를 켠 사람 · worker 도 켤 수 있다 · admin · supervisor 는 역할로(판정 63).

```
[ ] 빌드 표시 「2026-09-28 · mv v1」 · 헤더 IMS 공통(☰ Menu 가 이름 바로 옆 · 🗺 Map · Sign Out) · WMS 탭 줄에 Bin Moves(Receiving 뒤)
[ ] ⭐ 시험 순서(so-module §26-d ①): C070303 → CON00156(장부 4 · 기다리는 과제 125 의 계획 1) → 1 → C070304 → Move = MV-00001
[ ] 판정 62 알림 둘 — 옮기기 전 「N planned for picks that have not started will follow to the new bin」 · 옮긴 뒤 최근 목록에 「N pick plan(s) moved」
[ ] 뽑는 중인 과제가 그 칸에서 기다리면 「N must stay — a picker is working on it now: <batch>」 · 남는 것이 없으면 「Nothing can move from this bin right now.」
[ ] 넘게 옮기면 창구 거부 문장 그대로 — 「only 18 can move (ledger 24 − picked not shipped 0 − waiting for pickers 6: SO-79402-1 waits 6) — you asked 24」 모양
[ ] 같은 칸 · 다른 창고 칸 · 비활성 칸 · 세트 SKU(낱개 EA · 팩 바코드는 화면이 환산) 거부
[ ] DB: transfer_out −q 출발 seq 2 · transfer_in +q 도착 seq 1 · raw.kind bin_move · 기다리는 과제 계획이 도착 칸으로
[ ] 열쇠 없는 사람 — 작업 칸이 숨고 읽기 전용 안내만(스캔 칸에 포커스가 안 간다)
[ ] 기기 저장 없음 — localStorage · sessionStorage 0(규칙 5)
[ ] 콘솔 빨간 오류 없음 · Network 에 운영 주소 요청 0
```

---

## 7-u. `stock-moves.html` — Bin Moves (office) (2026-09-28 신설 · 대화 Claude · 「sm v1」 · stock-adjustments 모양)

뒷단: 7-t 와 같다(`20260928182712`). 읽기 `inv_move_list` · `inv_move_detail` · `inv_move_preview` · 쓰기 `inv_move_create` · `inv_move_line_set` · `inv_move_line_remove` · `inv_move_delete` · `inv_move_confirm`.
⭐ 확정은 시험 순서의 맨 마지막 — 원장 · 기다리는 픽 계획이 그 순간 움직인다. 초안 삭제는 되고(번호는 빈다 · 판정 55) 확정 뒤 삭제는 안 된다.

```
[ ] 빌드 표시 「2026-09-28 · sm v1」 · ☰ Menu 에 Bin Moves (office)(Stock Adjustments 뒤 · 탭 아님)
[ ] ⭐ 시험 순서(so-module §26-d ②): New move → C070304 → C070303 · 1 · 줄에 「SO-25003b-1 (waiting): 1 follows」
[ ] 여러 줄 · 같은 SKU · 출발 · 도착 다시 적으면 그 줄이 고쳐진다 · 줄 지우기
[ ] 확정 전 상자 — 거부가 있으면 「Cannot confirm yet」 + 창구 문장 · 따라갈 계획이 있으면 「When confirmed, N EA planned for picks that have not started will follow to the new bins.」
[ ] ⭐ CAS — 줄을 적은 뒤 같은 출발 칸이 움직이면 확정이 「ledger changed (you saw …)」 로 거부 · 줄 다시 저장 뒤 새 값으로
[ ] 확정(맨 마지막) = MV-00002 · 「Pick plans moved with this stock: SO-25003b-1 · CON00156 1 · C070304 → C070303」
[ ] DB: 네 줄(−1 C070303 · +1 C070304 · −1 C070304 · +1 C070303) · 잔고 C070303 4 · C070304 0 · 과제 125 계획 C070303
[ ] 열쇠 없는 사람 — 초안에 「Read-only — moving stock needs the Bin moves key.」 · 버튼 없음
[ ] 기기 저장 없음 — localStorage · sessionStorage 0
[ ] 콘솔 빨간 오류 없음 · Network 에 운영 주소 요청 0
```

---

## 7-v. `transfers.html` — Transfers (2026-09-29 신설 · 대화 Claude · 「tf v1」 · stock-moves 모양 · ⑥-1)

뒷단: so-module §27(tr-1a ~ tr-4b · 715f900 ~ d5c93cc). 읽기 `inv_transfer_list` · `inv_transfer_detail` · `po_charge_detail` · `so_available_many` · `po_receipt` · `po_receipt_diff` · `inv_transfer_settle`(표 직접) ·
쓰기 `inv_transfer_create` · `line_set` · `line_remove` · `delete` · `confirm` · `unconfirm` · `cancel` · `tf_release` · `tf_wms_recall` · `tf_settle` · `tf_over_decide` · `tf_charge_create` · `update` · `alloc_add` · `alloc_update` · `alloc_delete` · `confirm` · `delete`.
⭐ 되돌릴 수 없는 것(운송 중 정리 lost · 더 온 몫 결정 · 원가에 얹힌 운임)은 시험 순서의 맨 마지막 · 창고 화면(⑥-2 · ⑥-3)이 선 뒤의 끝에서 끝 시험에서.
⚠️ 창고 화면 다섯 · 입고 화면이 트랜스퍼를 보이게 되는 것은 ⑥-2 · ⑥-3 — 그 전에는 이 화면의 Release 까지만 시험된다.

```
[ ] 빌드 표시 「2026-09-29 · tf v1」 · ☰ Menu 에 Transfers(Bin Moves (office) 뒤 · 탭 아님)
[ ] New transfer — 출발 · 도착 같으면 「From and to are the same warehouse — use Bin Moves …」 · 다르면 TRF-00001 초안 · 상세로 넘어간다
[ ] Add line — 제품 검색(낱개 · 세트 둘 다 · 세트는 「pack × N」) · 출발 창고 「book · held · available」 줄 · 가용보다 많으면 빨간 「more than available」
[ ] 같은 제품 두 줄 거부 문장 · Edit · ✕ · 초안 삭제(번호는 빈다 · 판정 55)
[ ] 가용보다 많은 줄 → 상세 빨간 상자 「Not enough available at …」 · Confirm 단추 흐림
[ ] Confirm → confirmed(초록) · 「The stock is held at the from warehouse …」 · 같은 SKU 판매 가용이 그만큼 줄었는지(so.html 줄 넣기의 가용)
[ ] Back to draft → draft · 가용 돌아옴 · 다시 Confirm
[ ] Release to WMS → at warehouse · Recall from warehouse → confirmed · 다시 Release
[ ] Cancel transfer(초안 · 확정일 때만 단추) — 이유를 받는다 · cancelled(빨강) · 메모에 이유가 붙는다
[ ] Add freight charge(초안 · 취소에는 단추 없음) — Check → 「This transfer has not arrived yet …」 경고 · Save as draft → 청구서 창이 열린다
[ ] 청구서 창 — Edit(머리) · 배분 금액 Save · Add a transfer(번호) · ✕ · 배분 합 ≠ 총액이면 Confirm 거부 문장 · Delete(확정된 적 없는 것만)
[ ] 도착 전 청구서 Confirm → 「Confirmed. It is not on the stock cost yet …」 · Reopen 은 원가에 안 얹혔으니 된다
[ ] 운임 칸 · 요약 숫자 — Freight (CAD) · On stock cost (CAD)(도착 전 0 · 노란 강조)
[ ] 열쇠 없는 사람 — 「Read-only — changing transfers needs the Transfers key.」 · 단추 없음 · 조정 열쇠 없는 사람에게 Settle in transit · Decide 단추 없음
[ ] 기기 저장 없음 — localStorage · sessionStorage 0 · 콘솔 빨간 오류 없음 · Network 에 운영 주소 요청 0
⬜ ⑥-2 · ⑥-3 뒤 끝에서 끝: 픽 · 팩 · Finalize = 출발(Sent · short) → 에드먼튼 입고 Complete(Received · 차이) → Settle in transit(lost · returned) → Decide(sent more · found 원가 0 체크) → 운임 도착 순간 얹힘(판정 78)
```

---

## 7-w. ⑥-2a 끝에서 끝 — 토론토에서 떠나기 (2026-09-29 · Claude Code tf-2a · 판정 83 · wm v1.2 · pk v1.1 · pa v1.2 · fu v1.1)

창고 화면 넷이 트랜스퍼를 판매 오더처럼 보인다 — 판매 조회는 그대로 · 트랜스퍼 갈래만 옆에(patch ~/asung/prompts/tf-2a-*.patch). 도착(⑥-3 wms-receiver)은 다음 차수 — 이 절은 출발까지.

```
[ ] 판매 한 바퀴 먼저 — 새 판매 오더 하나로 Split & Waves → Picking → Packing → Fulfillment Finalize(packed) · 화면 글자 · 인쇄가 어제와 같다
[ ] transfers.html 에서 TRF 확정 → Release to WMS → Split & Waves 대기 목록에 TRF · 손님 자리에 도착 창고 · 꼬리표 Transfer · 배송지 · 가격 칸 없음
[ ] 배치 → 픽 리스트 인쇄 = 도착 창고 이름 · 주소 없음 → Picking(하나는 일부러 모자라게) → Packing → Fulfillment
[ ] Finalize → 토스트 「… left for … — in transit」 · transfers.html 에 in transit · Sent · short · 운송 중 수량
[ ] 판매와 트랜스퍼 섞기 · 트랜스퍼 둘(도착 같음 / 다름)의 경고 글자
[ ] 콘솔 빨간 오류 없음 · Network 에 운영 주소 0
```

---

## 8. 로그인 · 계정

```
[ ] 비활성 계정으로 로그인하면 「This account is inactive.」로 막힌다
    ⚠️ ims-auth.js 가 is_active 를 보는 자리다. WMS 는 active 라 이름이 다르다 —
       안 고쳤으면 비활성 계정이 그냥 통과한다 (2026-09-15 에 고친 곳)
[ ] ims_staff 에 행이 없는 Auth 계정으로 로그인하면 「not registered」로 막힌다
[ ] Forgot your password? → 메일이 오고, 링크가 ims.asung.ca 로 돌아온다
    ⚠️ localhost:3000 으로 가면 URL Configuration 이 기본값이다(2026-09-15 실사고)
    ⚠️ 옛 링크는 한 번 쓰면 소모된다 — 새 메일을 받아야 한다
[ ] Change Password 로 비밀번호를 바꿀 수 있다
```

---

## 9. ⬜ 아직 확인 못 한 것

```
⬜ 매니저 화면 — 매니저 계정이 아직 없다. 추가한 뒤 3·7 의 매니저 항목을 본다
⬜ staff.html — [2026-09-15] 공통 파일(ims-ui.css · ims-ui.js)로 옮겼다. 7절 항목은 코드로 되짚었다
   (자기 행 role·is_active 잠김 · imsSaved 로 0행이면 Not saved · 삭제 버튼 없음 · 전량 읽기 caps-ok)
   — ⚠️ 눈으로는 아직 안 봤다. 옮긴 뒤 7절을 처음부터 훑을 것(특히 Save 가 UPDATED 를 바꾸는지)
✅ 불리언 색 — [2026-09-15 오후] suppliers/products/supplier-products 도 is_default · is_primary 를
   yn(v, false) 로 회색으로 바꿨다(공통 파일로 옮기며). 색은 is_active 에만 — 여섯 화면 전부
⬜ supplier-products.html 의 제품 검색은 받은 페이지(200줄) 안에서만 걸린다
   — 조인된 칸이라 서버에서 못 거른다. 공급처 하나에 200줄이 넘으면 뒤쪽은 안 걸린다
⬜ .or() 검색어에 쉼표·괄호가 들어가면 PostgREST 400 — [2026-09-16] po · products · families · settings 네 화면이 같은 모양이다.
   ⚠️ 실물이 있다 — 공급처 이름에 쉼표(Ampro Industries, Inc.). ⇒ ims-ui.js 에 검색어 정리 헬퍼를 두고 넷이 함께 쓴다(공통 파일 · 별도 차수 · §0-a 대로 전 화면 확인)
⬜ [2026-09-16 저녁 · invoices.html 검토에서 미룬 것 · Caleb 결정]
   · 확정된 인보이스의 머리(Printed total · Due date)를 뒷단(PostgREST)이 안 막는다 — 화면은 draft 만 입력칸을 그려 UI 로는 막힌다. ⬜ 「confirmed 머리 잠금」은 뒷단 다음 차수
   · po.html · invoices.html 의 로컬 `main{display:flex…}` 가 ims-ui.css `main` 을 덮는다 — `main.stack` 이 이미 있다. 두 화면을 함께 `<main class="stack">` 으로(따로 한 차수)
   · invoices.html 이 .pick · .prow 를 쓰지만 로컬 CSS 정의가 없다(인라인 스타일 · hover 색만 빠진다) — 사소
   · 검색 .or 쉼표·괄호 문제가 invoices.html 로 다섯째 화면 — 위 헬퍼 차수에 포함
   · Supplier 드롭다운을 발주처(is_purchasable)로 좁히지 않는다 — 비용처 문서가 이 화면에 올 수 있다
   · 크레딧 상세의 Qty diff(인보이스 수량 − 입고)는 크레딧 줄에서 뜻이 없다 — 비우는 것이 맞다 · 사소
⬜ [2026-09-19] **화면이 이제 원장을 읽는다.** `receiving.html` 의 Last bin 이 `ims_last_bin` 을 통해
   `ims_inv_balance`(원장 잔고)를 본다. ⚠️ 원장 쪽을 고치면 **화면을 안 고쳐도 답이 바뀐다** —
   화면만 훑어서는 안 되고 정본 `ledger-design.md` 쪽 변경도 함께 봐야 한다
⬜ [2026-09-19] 재고를 보는 화면이 **아직 없다.** 원장 잔고(자리별 수량 · 음수 · 장부 밖 물량)를
   눈으로 볼 곳이 없어, 지금은 psql 로만 확인한다
⬜ [2026-09-19] 초과 입고의 칩·알림을 **실물로 못 봤다** — 확정된 발주가 다 닫혀서 시험할 초과가 없었다.
   다음에 초과가 실제로 나면 「n to settle」 칩과 알림 두 줄을 확인할 것
⬜ [2026-09-18] 세 화면(charges · payments · receiving)의 절을 **오늘에야** 적었다 —
   charges·payments 는 09-17 에 섰는데 하루 늦었고, §0-a 의 화면 수는 두 번 연속 낡아 있었다.
   ⇒ 화면을 더하는 **그 커밋에** 이 문서도 함께 고친다
⬜ [2026-09-18] `charges.html` 이 저장에 실패해도 입력칸을 되돌리지 않는다 — 칸 다섯 중
   `data-prev` 를 가진 것이 둘뿐이라 되돌리려다 칸을 비울 수 있다. 사소
⬜ [2026-09-18] `receiving.html` 의 Received 표와 작업 줄이 **같은 숫자여야 한다** —
   다르면 뒷단이 경고(`receipt_lines_differ_from_work`)를 낸다. 실제로 본 적은 없다
⬜ po.html 의 갈라진 문서 이동(gotoPo · ?po=)이 목록을 두 번 읽는다 — 뷰 po_list 에 split_from_id 가 없어 번호로 찾는다.
   ⇒ 뷰에 split_from_id 를 더하면 한 번으로 끝난다(뒷단 asung-wms 변경 · 별도 차수). 행이 셋이라 지금은 체감 없다
```
