# IMS 화면 점검 목록

`ims.asung.ca` 의 화면이 제대로 도는지 눈으로 확인하는 목록.
⚠️ **화면을 고친 뒤에는 이 목록을 처음부터 한 번 훑는다.** 특히 공통 파일(`ims-ui.css` ·
`ims-ui.js` · `ims-auth.js`)을 건드렸으면 **전 화면**을 본다 — 한 곳을 고치면 열일곱이(2026-09-25 밤 기준 · §0-a) 움직인다.

⚠️ **화면을 새로 만들면 이 문서에 항목을 더한다.** 안 더하면 낡은 목록이 되고,
낡은 목록은 「통과했다」는 거짓 안심만 준다.

📌 숫자는 2026-09-15 실측(화면·SQL · Caleb)이다. 적재가 다시 돌면 달라진다 —
그때는 숫자를 고치고 **언제 왜 달라졌는지**를 한 줄 남긴다.

---

## 0. 공통 — 모든 화면

```
[ ] 로그인하지 않은 상태로 열면 로그인 화면이 뜬다
[ ] 로그인하면 오른쪽 위에 이름·역할이 뜬다 (예: Caleb · admin)
[ ] ☰ Menu 를 누르면 열여덟이 보인다 (2026-09-17 Charges · Payments · 2026-09-18 Receiving · 2026-09-25 Sales Orders · Sales Invoices · Customer Payments · Credit Notes · Backorders · POS 추가 · 이름 둘 바뀜)
    Settings · Suppliers · Products · Families · Supplier Products ·
    Purchase Orders · Purchase Invoices · Charges · Supplier Payments · Receiving · Sales Orders · Sales Invoices · Customer Payments · Credit Notes · Backorders · POS · Staff · Home
    ⭐ [2026-09-25 밤] POS 는 ☰ Menu 에만 있다 — 탭 줄에는 안 선다(items 다섯째 false · 묶음 null) · 판매 탭은 그대로 다섯
    ⭐ [2026-09-25] 순서 = 마스터들 · 구매 묶음 · 판매 묶음 · Staff · Home · 이름은 보이는 글자만 바꿨다(파일은 invoices.html · payments.html 그대로)
[ ] 머리 아래 탭 줄 = [모드] | [묶음] | [지금 화면 묶음의 탭들] (2026-09-25 묶음 칸 신설 · ims-auth.js items 여섯째 칸)
    구매 화면에서 다섯 — Purchase Orders · Purchase Invoices · Charges · Supplier Payments · Receiving · 판매 화면에서 다섯 — Sales Orders · Sales Invoices · Customer Payments · Credit Notes · Backorders(2026-09-25 밤)
    ⭐ 탭은 자주 오가는 화면만이다(Caleb). 마스터·Staff·Home 은 ☰ Menu 에만 있다
    ⚠️ 탭·메뉴는 **권한으로 갈린다** — receiving 권한이 없으면 Receiving 이 아예 안 보이고, sales 권한이 없으면 Sales Orders 가 안 보인다(빈 탭이 아니다)
[ ] 묶음 칸(PURCHASING · SALES · 모드 칸과 같은 모양)은 **구매·판매 둘 다 보는 사람에게만**, 그리고 지금 화면이 묶음 안일 때만 뜬다
    · 구매·판매 둘 다: po.html 에서 「PURCHASING(눌림) · SALES | 구매 탭 다섯」 · so.html 에서 「PURCHASING · SALES(눌림) | Sales Orders(눌림) · Sales Invoices · Customer Payments · Credit Notes · Backorders」
    · 구매만 · 판매만: 묶음 칸 없이 탭만(지금까지와 같다) · Settings 등 묶음 밖 화면: 묶음 칸 없음
    · SALES 를 누르면 판매 묶음의 첫 보이는 **탭** 화면(so.html)으로 간다 · 모드 칸(IMS·WMS)은 WMS 화면이 서기 전까지 여전히 안 보인다
[ ] 지금 보고 있는 화면은 메뉴에서 눌리지 않는다(현재 표시)
[ ] Sign Out 이 되고, 다시 열면 로그인 화면이다
[ ] 화면 글자가 전부 영문이다
[ ] ☰ Menu 가 이름·역할 바로 옆에 있다 (다른 버튼보다 앞)
```

⚠️ 콘솔(F12)에 빨간 오류가 없어야 한다. 화면이 떠도 오류가 나면 일부만 도는 것일 수 있다.

### 0-a. 공통 파일(`ims-ui.css` · `ims-ui.js` · `ims-auth.js`)을 고쳤을 때

한 곳을 고치면 **열일곱**이 움직인다(⚠️ `index.html` 은 공통을 안 부른다 — 셋만 부른다).
📌 [정정 2026-09-16 저녁] 「여섯」은 2026-09-15 의 수다 — po.html(09-16 오전)로 일곱 · invoices.html(09-16 저녁)로 여덟이 됐는데 이 줄을 안 고쳤다.
📌 [정정 2026-09-18] 여덟도 낡았다 — charges·payments(09-17 오후)로 열 · receiving(09-18)으로 열하나다.
   ⚠️ 이 수가 두 번 연속 낡았다. 화면을 더하면서 **같은 커밋에** 이 줄을 고친다.
📌 [정정 2026-09-25] so.html(09-25 · 대화 Claude)로 열둘 · so-invoices.html(09-25 저녁)로 열셋 · so-payments.html(09-25 밤)로 열넷 · so-credits.html(09-25 밤)로 열다섯이다 — 넷 다 같은 커밋에 고쳤다.
📌 [정정 2026-09-25 밤] so-backorders.html(09-25 밤 · 대화 Claude)로 열여섯 · pos.html(09-25 밤 · 대화 Claude)로 **열일곱**이다 — 각각 같은 커밋에 고쳤다.
```
[ ] 열일곱 화면을 각각 열어 0절이 전부 통과한다 (특히 「글자만 나온다」 = CSS 링크 · 「아예 안 뜬다」 = ims-ui.js 순서)
    settings · suppliers · products · families · supplier-products · po · invoices · charges · payments · receiving · so · so-invoices · so-payments · so-credits · so-backorders · pos · staff
[ ] 그 다음 2~7-e 절을 처음부터 훑는다 — 숫자까지
[ ] 함수를 더하기만 했으면 그 함수를 쓰는 화면만 본다 (예: imsTs → staff.html)
[ ] 공통에 새 이름(.클래스 · 함수)을 더했으면 열일곱 html 에서 같은 이름을 grep 한다 — .note 가 겹쳤던 실사고(2026-09-15)
[ ] 메뉴 항목(ims-auth.js items)을 더했으면 열일곱 화면 전부에서 ☰ Menu 의 수·순서와 탭 줄을 본다
    ⚠️ 항목의 다섯째 값이 탭 노출이다 — true 면 탭에도, false 면 ☰ Menu 에만 선다
    ⚠️ 여섯째 값이 묶음이다('purchasing' · 'sales' · null) — 탭은 같은 묶음끼리만 한 줄에 선다 · null 이면 탭 줄에 묶음 칸이 안 뜬다(2026-09-25)
[ ] ⭐ PostgREST 로 바로 쓰는 자리를 건드렸으면 `imsSaved()` 의 계약을 본다 —
    둘째 인자 seenAt 을 주면 낡은 값 저장을 막고, **안 주면 예전과 똑같이 돈다**(2026-09-18).
    ⚠️ 지금 이 인자를 넘기는 화면은 **하나도 없다**(한 번 붙였다가 되돌렸다 · 정본 §13-f)
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

## 7-e. `receiving.html` — 입고 (2026-09-18 신설 · 대화 Claude)

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
```

---

## 7-f. `so.html` — 판매 오더 (2026-09-25 신설 · 대화 Claude · 「2026-09-25 · so v1」 → v1.1(경고 읽기 쉽게 · 인보이스 링크) → v1.2(다 받은 인보이스면 결제 단추 숨김 · Due at issue) → v1.3(줄 넣기 가용 재고 · 세트 숨김) → v1.4(Include sets 는 매니저만) → **2판** v2(보류·풀기 · 나누기 · 창고 바꾸기 · 백오더 진행 · 병합 · 줄의 Stock 칸 · 병합 초안의 견적 알림) → v2.1(not reserved) → v2.2(Hold 는 잡힌 줄이 있을 때만) → **v2.3**(잡힐 것 없으면 Proceed 막힘))

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
```

⚠️ [2026-09-25 밤] 아직 없는 것 — Release to WMS(단추 자리만) · 오피스 마무리(so_finalize) · 인쇄 · 「재고 없이 나갔다」 관리 · 손님 잔액 화면 (정본 §14~§21). 보류·나누기·창고 바꾸기·백오더 진행·병합은 2판(v2)으로 섰다 · 백오더 목록은 so-backorders.html(7-j) · POS 계산대는 pos.html(7-k).

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

⚠️ [2026-09-25] 아직 없는 것 — 인쇄(PDF) · 받아 둔 돈 손으로 붙이기(so_payment_attach) · 크레딧 붙이기 · 손님 결제 화면(Customer Payments) · 크레딧 노트 화면 · pg_trgm 검색 인덱스(정본 ⬜).

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

⚠️ [2026-09-25] 아직 없는 것 — 영수증·인보이스 인쇄 · 매니저의 「안 끝난 판매」 목록 화면 · 현금 서랍·거스름돈 기록(거스름돈은 기록하지 않는 것이 판정) · so.html 의 Finish on POS 단추(자리만 · 이 화면이 대신한다) (정본 6-f · §18).

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
