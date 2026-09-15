# IMS 화면 점검 목록

`ims.asung.ca` 의 화면이 제대로 도는지 눈으로 확인하는 목록.
⚠️ **화면을 고친 뒤에는 이 목록을 처음부터 한 번 훑는다.** 특히 공통 파일(`ims-ui.css` ·
`ims-ui.js` · `ims-auth.js`)을 건드렸으면 **전 화면**을 본다 — 한 곳을 고치면 여섯이 움직인다.

⚠️ **화면을 새로 만들면 이 문서에 항목을 더한다.** 안 더하면 낡은 목록이 되고,
낡은 목록은 「통과했다」는 거짓 안심만 준다.

📌 숫자는 2026-09-15 실측(화면 · Caleb)이다. 적재가 다시 돌면 달라진다 —
그때는 숫자를 고치고 **언제 왜 달라졌는지**를 한 줄 남긴다.

---

## 0. 공통 — 모든 화면

```
[ ] 로그인하지 않은 상태로 열면 로그인 화면이 뜬다
[ ] 로그인하면 오른쪽 위에 이름·역할이 뜬다 (예: Caleb · admin)
[ ] ☰ Menu 를 누르면 일곱이 보인다
    Settings · Suppliers · Products · Families · Supplier Products · Staff · Home
[ ] 지금 보고 있는 화면은 메뉴에서 눌리지 않는다(현재 표시)
[ ] Sign Out 이 되고, 다시 열면 로그인 화면이다
[ ] 화면 글자가 전부 영문이다
[ ] ☰ Menu 가 이름·역할 바로 옆에 있다 (다른 버튼보다 앞)
```

⚠️ 콘솔(F12)에 빨간 오류가 없어야 한다. 화면이 떠도 오류가 나면 일부만 도는 것일 수 있다.

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

## 3. `suppliers.html` — 공급처

```
[ ] 기본 상태(Active only 켜짐)에서 1–100 / 226
[ ] Active only 를 풀면 / 257 · inactive 칩이 빨강
[ ] Purchasable 을 켜면 / 217
[ ] Hide discontinued 까지 켜면 ⭐ / 138   ← 실제 매입처
[ ] discontinued 칩이 황갈색 (inactive 의 빨강과 다르다)
[ ] 한 곳을 누르면 오른쪽에 상세가 뜬다
[ ] Cygnus Beauty Supply 를 열면 Products linked 236 · of which default 122
[ ] 연락처가 둘 이상인 곳이 있다 (예: Ashton Adams LTD 2)
[ ] Discounts 는 전부 None. (supplier_discount 0행 — 채우면 달라진다)
[ ] 필터를 바꿔 고른 공급처가 목록에서 빠지면 오른쪽도 비워진다
```

⚠️ **매니저로 로그인하면** 토글 셋이 아예 안 보이고 138곳만 나온다.
（admin 계정만 있으면 건너뛴다 — 매니저를 추가한 뒤 확인한다）

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
[ ] ⭐ 필터를 바꿔 고른 제품이 목록에서 빠지면 오른쪽도 비워진다
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
⬜ 불리언 색 — settings.html 만 고쳤다. suppliers/products/supplier-products 의
   is_default · is_primary 는 아직 false 를 빨갛게 칠한다
⬜ supplier-products.html 의 제품 검색은 받은 페이지(200줄) 안에서만 걸린다
   — 조인된 칸이라 서버에서 못 거른다. 공급처 하나에 200줄이 넘으면 뒤쪽은 안 걸린다
```
