# IMS 화면 점검 목록

`ims.asung.ca` 의 화면이 제대로 도는지 눈으로 확인하는 목록.
⚠️ **화면을 고친 뒤에는 이 목록을 처음부터 한 번 훑는다.** 특히 공통 파일(`ims-ui.css` ·
`ims-ui.js` · `ims-auth.js`)을 건드렸으면 **전 화면**을 본다 — 한 곳을 고치면 여덟이(2026-09-16 저녁 기준 · §0-a) 움직인다.

⚠️ **화면을 새로 만들면 이 문서에 항목을 더한다.** 안 더하면 낡은 목록이 되고,
낡은 목록은 「통과했다」는 거짓 안심만 준다.

📌 숫자는 2026-09-15 실측(화면·SQL · Caleb)이다. 적재가 다시 돌면 달라진다 —
그때는 숫자를 고치고 **언제 왜 달라졌는지**를 한 줄 남긴다.

---

## 0. 공통 — 모든 화면

```
[ ] 로그인하지 않은 상태로 열면 로그인 화면이 뜬다
[ ] 로그인하면 오른쪽 위에 이름·역할이 뜬다 (예: Caleb · admin)
[ ] ☰ Menu 를 누르면 아홉이 보인다 (2026-09-16 오전 Purchase Orders · 2026-09-16 저녁 Invoices 추가)
    Settings · Suppliers · Products · Families · Supplier Products · Purchase Orders · Invoices · Staff · Home
[ ] 지금 보고 있는 화면은 메뉴에서 눌리지 않는다(현재 표시)
[ ] Sign Out 이 되고, 다시 열면 로그인 화면이다
[ ] 화면 글자가 전부 영문이다
[ ] ☰ Menu 가 이름·역할 바로 옆에 있다 (다른 버튼보다 앞)
```

⚠️ 콘솔(F12)에 빨간 오류가 없어야 한다. 화면이 떠도 오류가 나면 일부만 도는 것일 수 있다.

### 0-a. 공통 파일(`ims-ui.css` · `ims-ui.js` · `ims-auth.js`)을 고쳤을 때

한 곳을 고치면 **여덟**이 움직인다(⚠️ `index.html` 은 공통을 안 부른다 — 셋만 부른다).
📌 [정정 2026-09-16 저녁] 「여섯」은 2026-09-15 의 수다 — po.html(09-16 오전)로 일곱 · invoices.html(09-16 저녁)로 여덟이 됐는데 이 줄을 안 고쳤다.
   화면을 더하면 **이 수도 고친다.**
```
[ ] 여덟 화면을 각각 열어 0절이 전부 통과한다 (특히 「글자만 나온다」 = CSS 링크 · 「아예 안 뜬다」 = ims-ui.js 순서)
    settings · suppliers · products · families · supplier-products · po · invoices · staff
[ ] 그 다음 2~7-b 절을 처음부터 훑는다 — 숫자까지
[ ] 함수를 더하기만 했으면 그 함수를 쓰는 화면만 본다 (예: imsTs → staff.html)
[ ] 공통에 새 이름(.클래스 · 함수)을 더했으면 여덟 html 에서 같은 이름을 grep 한다 — .note 가 겹쳤던 실사고(2026-09-15)
[ ] 메뉴 항목(ims-auth.js items)을 더했으면 여덟 화면 전부에서 ☰ Menu 의 수와 순서를 본다 (2026-09-16 저녁 Invoices)
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
[ ] ☰ Menu 에 Invoices 가 Purchase Orders 바로 뒤에 있고, 이 화면에서는 눌리지 않는다
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
⬜ po.html 의 갈라진 문서 이동(gotoPo · ?po=)이 목록을 두 번 읽는다 — 뷰 po_list 에 split_from_id 가 없어 번호로 찾는다.
   ⇒ 뷰에 split_from_id 를 더하면 한 번으로 끝난다(뒷단 asung-wms 변경 · 별도 차수). 행이 셋이라 지금은 체감 없다
```
