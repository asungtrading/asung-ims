# IMS 화면 점검 목록

`ims.asung.ca` 의 화면이 제대로 도는지 눈으로 확인하는 목록.
⚠️ **화면을 고친 뒤에는 이 목록을 처음부터 한 번 훑는다.** 특히 공통 파일(`ims-ui.css` ·
`ims-ui.js` · `ims-auth.js`)을 건드렸으면 **전 화면**을 본다 — 한 곳을 고치면 여섯이 움직인다.

⚠️ **화면을 새로 만들면 이 문서에 항목을 더한다.** 안 더하면 낡은 목록이 되고,
낡은 목록은 「통과했다」는 거짓 안심만 준다.

📌 숫자는 2026-09-15 실측(화면·SQL · Caleb)이다. 적재가 다시 돌면 달라진다 —
그때는 숫자를 고치고 **언제 왜 달라졌는지**를 한 줄 남긴다.

---

## 0. 공통 — 모든 화면

```
[ ] 로그인하지 않은 상태로 열면 로그인 화면이 뜬다
[ ] 로그인하면 오른쪽 위에 이름·역할이 뜬다 (예: Caleb · admin)
[ ] ☰ Menu 를 누르면 여덟이 보인다 (2026-09-16 Purchase Orders 추가)
    Settings · Suppliers · Products · Families · Supplier Products · Purchase Orders · Staff · Home
[ ] 지금 보고 있는 화면은 메뉴에서 눌리지 않는다(현재 표시)
[ ] Sign Out 이 되고, 다시 열면 로그인 화면이다
[ ] 화면 글자가 전부 영문이다
[ ] ☰ Menu 가 이름·역할 바로 옆에 있다 (다른 버튼보다 앞)
```

⚠️ 콘솔(F12)에 빨간 오류가 없어야 한다. 화면이 떠도 오류가 나면 일부만 도는 것일 수 있다.

### 0-a. 공통 파일(`ims-ui.css` · `ims-ui.js` · `ims-auth.js`)을 고쳤을 때

한 곳을 고치면 여섯이 움직인다(⚠️ `index.html` 은 공통을 안 부른다 — 셋만 부른다).
```
[ ] 여섯 화면을 각각 열어 0절이 전부 통과한다 (특히 「글자만 나온다」 = CSS 링크 · 「아예 안 뜬다」 = ims-ui.js 순서)
[ ] 그 다음 2~7절을 처음부터 훑는다 — 숫자까지
[ ] 함수를 더하기만 했으면 그 함수를 쓰는 화면만 본다 (예: imsTs → staff.html)
[ ] 공통에 새 이름(.클래스 · 함수)을 더했으면 여섯 html 에서 같은 이름을 grep 한다 — .note 가 겹쳤던 실사고(2026-09-15)
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

## 7-a. `po.html` — 발주 (⑤ 읽기 · 2026-09-16 신설)

뒷단: 뷰 `po_list`(목록) · RPC `po_detail`(상세) — asung-wms `20260916163806` · `20260916164539`. ⭐ 계산(할인 체인 · 미지급 · 차이)은 RPC 값을 그리기만 한다.
⚠️ 아래 숫자는 **검증 데이터**(2026-09-16 · Caleb 이 SQL 로 넣은 PO-02001a · PO-02001b · PO-02002)다. 발주를 만들면 늘고, 컷오버 때 지운다.
   모집단은 항목마다 괄호에 적었다 — Status 드롭다운이 무엇인지에 따라 수가 다르다.

```
[ ] 열면 Status 가 Open(draft+confirmed)이고 1–2 / 2 — PO-02002 · PO-02001b (내림차순 · 검증 데이터 기준)
[ ] Status 를 All 로 → / 3 · Closed 로 → / 1 (PO-02001a) · Draft · Cancelled 로 → No purchase orders match.
[ ] 목록의 PO-02001a 행: 태그 closed(회색) + split(회색 — 단종 색이 아니다) · 금액 2,010.54
[ ] 목록의 PO-02001b 행: 「received 0 / 100」 줄이 보인다 (confirmed 만 보인다) · PO-02002 는 「received 0 / 1,000」
[ ] 검색칸에 PO-02001 을 치면(All 상태) a·b 둘이 나온다 · Ampro 를 치면 공급처 이름으로도 걸린다
[ ] PO-02001a 를 열면
    칩: closed 가 초록 · 「split into 1」 · 아래에 「PO-02001b →」 링크
    Subtotal 2,446.80 · Discount −436.26 · Net 2,010.54 · Charges added 597.49 · Received 920 / 920 (경고색 아님)
    Lines 3 — Remaining 전부 0(회색) · AMP00405 Received 600
    Discounts 2 — 「× factor 0.8217 = 2,010.54」 (0.821700 처럼 뒷자리 0 이 붙지 않는다)
    Receipts 4 — AMP00405 가 A010101 400 + A010102 200 두 줄
    Invoices 1 — AMP-778812 · Printed 2,197.54 · Computed 2,197.54 · Diff 0.00(회색) · Payable 2,010.54 · Paid 2,010.54 · Unpaid 0.00 · Lines 3/4
    Charges 1 — CBSA 10039192310530 · duty · Allocated here 597.49 · Charge total 2,547.37 · Unpaid 0.00 · 설명 줄이 번호 아래에
    Payments 2 — invoice AMP-778812 2,010.54 USD (Discount —) · charge 10039192310530 2,496.42 CAD · Discount 50.95 · Applied 2,547.37
    Created by · Confirmed by 옆 시각이 토론토다 (⚠️ UTC 로 보이면 틀린 것)
[ ] 「PO-02001b →」 를 누르면 검색칸이 PO-02001 · Status 가 All 로 바뀌고 b 가 파란 표시로 열린다 · 상세는 비지 않는다
    b 의 칩: confirmed(회색) · 「split from PO-02001a」 · Received 0 / 100 이 경고색 · Lines 1 Remaining 100 · Discounts 2 · Receipts·Invoices·Charges·Payments 전부 None.
[ ] b 에서 「← PO-02001a」 를 누르면 a 로 돌아온다
[ ] PO-02002 를 열면 Discounts None · Received 0 / 1,000 경고색 · Charges 1 (1,949.88 / 2,547.37)
[ ] po.html?po=PO-02001b 로 들어오면 검색칸 PO-02001 · All · b 가 열린다 · po.html?po=PO-99999 는 「PO-99999 not found.」
[ ] 검색어나 Status 를 바꾸면 오른쪽이 비워진다 · ← → 로 페이지를 넘기면 그대로다 (§10-j 3-d)
[ ] 없는 발주(지워진 id)를 열면 「That purchase order is gone.」 — RPC 가 null 을 돌려준다
```

⚠️ **매니저로 로그인해도** Status 드롭다운이 보인다 — 발주 목록은 감출 것이 아니다(마스터의 「admin 만 토글」과 다른 경우 · 코드 주석).
（매니저 계정이 아직 없다 — 추가한 뒤 확인한다）

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
⬜ po.html 의 갈라진 문서 이동(gotoPo · ?po=)이 목록을 두 번 읽는다 — 뷰 po_list 에 split_from_id 가 없어 번호로 찾는다.
   ⇒ 뷰에 split_from_id 를 더하면 한 번으로 끝난다(뒷단 asung-wms 변경 · 별도 차수). 행이 셋이라 지금은 체감 없다
```
