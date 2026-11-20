# 11. 달력과 분석(Calendar · Analytics)

<!-- sections written in docs-1117 · periods, Customers tab, risk, one customer added in docs-1117b · Calendar = dashboard.html (the first IMS screen) · Analytics = analytics.html -->
<!-- out of this chapter: the invoices, payments and bills themselves -> chapters 1 and 2 · My tasks tab -> chapter 6 · theme -> chapter 0 -->

이 장은 IMS 모드를 쓰는 모든 사람을 위한 것입니다. **Calendar**(달력)는 IMS 의 첫 화면입니다. **Analytics**(분석)는 `analytics` 권한이 있는 사람만 엽니다.

화면의 글자(단추 · 칸 · 상태)는 화면 그대로 영어로 적고, 뜻을 한국어로 붙였습니다.

- [달력](#cal-start)
- [Month · Week · Day](#cal-views)
- [색과 칩의 뜻](#cal-colors)
- [Day 보기](#cal-day)
- [Task(할 일)](#cal-tasks)
- [Analytics](#an-start)
- [기간 목록](#an-periods)
- [매출 개요](#an-overview)
- [Customers 탭(손님)](#an-customers)
- [끊길 위험(Customers at risk)](#an-risk)
- [손님 한 곳](#an-customer)
- [「순매출」의 뜻](#an-net-sales)
- [About these numbers(이 숫자에 대해)](#an-gaps)
- [CSV · 인쇄 · PDF](#an-export)

<a id="cal-start"></a>
## 달력
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**무엇인가**
**Calendar** 는 날마다 무엇이 기한이고 무엇이 결제됐는지 보여 줍니다.
- 기한이 된 손님 인보이스와 손님에게서 받은 결제(`sales` 권한)
- 기한이 된 공급처 청구서 · 비용 청구서와 공급처에 한 지급(`purchasing` 권한)
- Task — 사람이 날짜에 적어 둔 할 일(모두)

**누가**
IMS 모드에 로그인하는 모든 사람. 돈 쪽은 내 권한이 여는 만큼만 보입니다. `sales` 도 `purchasing` 도 없으면 Task 만 보입니다.

**어떻게**
1. 로그인하면 IMS 가 **Calendar** 로 열립니다. 다른 화면에서는 Asung 로고를 누릅니다.
2. **‹** · **›** 로 옮기고, **Today** 로 오늘에 돌아옵니다.
3. **All branches** 에서 브랜치 하나를 고릅니다. 손님 쪽만 거릅니다 — 공급처 청구서에는 브랜치가 없습니다.

**알아 둘 것**
- 달력 위 **Overdue — customers** · **Overdue — suppliers** 는 기한이 지난 것을 전부 보여 줍니다 — 보고 있지 않은 달의 것도. 금액을 누르면 목록이 나옵니다.
- "n unpaid without a due date" 는 기한 날짜가 없어 날에 놓일 수 없는 미지급 공급처 청구서의 수입니다.
- 통화가 다른 금액은 따로 보입니다 — 더하지 않습니다.
- 공급처 쪽은 IMS 에 넣은 청구서 · 비용 청구서만 보입니다. 2026 년 10 월 30 일 전 청구서는 QuickBooks 에 있습니다.

<!-- SCREENSHOT: cal-start-1 · 기한 지남 줄 · 범례 · 칩 몇 개가 있는 달 보기 -->

<a id="cal-views"></a>
## Month · Week · Day
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**무엇인가**
달력에는 보기가 셋 있습니다. **Calendar** 옆 상자에서 고릅니다.

| 보기 | 보이는 것 |
|---|---|
| **Month** | 한 달 전체(일요일 ~ 토요일). 달력은 늘 이 보기로 열립니다 |
| **Week** | 7 일을 크게 · 줄임 없이 |
| **Day** | 하루를 목록으로 — 그날의 모든 것을 다 펼침([Day 보기](#cal-day)) |

**어떻게**
- 날짜 숫자나 날 칸의 빈 곳을 누르면 그날이 **Day** 로 열립니다.
- **‹** · **›** 는 보기에 따라 한 달 · 한 주 · 하루씩 옮깁니다.
- **Today** 는 지금 보기 그대로 오늘로 갑니다.

**알아 둘 것**
- 웹 주소가 보기와 날짜를 기억합니다. 즐겨찾기에 넣거나 동료에게 보낼 수 있습니다.

<a id="cal-colors"></a>
## 색과 칩의 뜻
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**색**
오른쪽 위 범례:

| 색 | 뜻 |
|---|---|
| **Paid** | 다 받음 · 다 냄 |
| **Part paid** | 일부만 |
| **Not paid** | 아직 하나도 — 빨간 테두리 |
| **Overdue** | 기한이 지났는데 다 안 됨 — 빨간 테두리 + 붉은 바탕 |

**손님 칩**
날마다 · 통화마다 칩 하나. 굵은 글씨: 아직 열린 인보이스 수와 남은 금액. 흐린 글씨: "+n paid" — 그날 기한인데 이미 받은 인보이스. "n overdue" 는 기한이 지난 것의 수입니다.
기한이 지난 인보이스는 원래 기한 날짜에 그대로 있습니다 — 오늘로 옮겨 오지 않습니다.

**공급처 칩**
청구서 · 비용 청구서마다 칩 하나와 금액 — 일부를 냈으면 "left …"(남은 금액). 누르면 그 청구서 · 비용 청구서가 열립니다.

**결제 칩**
- **Received** — 그날 손님에게서 받은 결제. "post-dated" 는 날짜를 앞으로 적은 결제입니다.
- **Refunded** — 그날 손님에게 돌려준 환불.
- **Paid out** — 그날 공급처에 낸 지급.

**알아 둘 것**
- 이월 인보이스(IMS 전부터 남아 있던 것)도 들어 있고, 목록에 **Carried over** 로 표시됩니다.
- 손님 크레딧은 따로 칩으로 나오지 않습니다.
- 손님 결제는 그 결제를 받은 브랜치로 셉니다.

<a id="cal-day"></a>
## Day 보기
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**무엇인가**
**Day** 보기는 하루의 모든 것을 이 순서로 목록에 펼칩니다. 내 권한이 여는 부분만 보입니다.

| 부분 | 무엇이 나오나 |
|---|---|
| **Sales this day**(그날 매출) | 순매출 · 오더 수 · 평균 오더 · 지난해 같은 날 — `analytics` 권한만. **GP %** 는 `cost` 권한도 있을 때만. **With freight etc., before tax** 는 운임 등을 더한 세전 합계. **Analytics** 를 누르면 분석 화면이 열립니다 |
| **Tasks** | 그날의 Task. **+ Task** 로 그날 Task 를 더합니다 |
| **Customer invoices due** | 그날 기한인 손님 인보이스 — **Invoice** · **Bill to** · **Branch** · **Total** · 남은 금액 |
| **Payments received** | 그날 받은 손님 결제(**Method**) |
| **Refunds** | 그날의 환불(있을 때만) |
| **Supplier bills and charges due** | 그날 기한인 청구서 · 비용 청구서 — **Kind** · **Number** · **Due** · **Amount** · **Left** · **State** |
| **Supplier payments** | 그날의 공급처 지급(**Paid against** · **Discount**) |

**어떻게**
줄을 누르면 그 인보이스 · 청구서 · 비용 청구서가 원래 화면에서 열립니다.

**알아 둘 것**
- 줄이 아주 많은 날은 앞 500 줄만 보이고 "Showing the first … of …" 라고 나옵니다.
- 「Sales this day」의 순매출은 **Analytics** 와 같은 뜻입니다([「순매출」의 뜻](#an-net-sales)).

<!-- SCREENSHOT: cal-day-1 · Sales this day · Tasks · Customer invoices due 가 있는 Day 보기 -->

<a id="cal-tasks"></a>
## Task(할 일)
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**무엇인가**
Task 는 날짜에 적어 한 사람에게 맡기는 할 일입니다 — 예: "Customer A 가 화요일에 돈 준다고 함" · "목요일 Customer B 배달".

**누가**
- 누구나 Task 를 만들고 누구에게나 맡길 수 있습니다.
- 내가 만든 것과 나에게 맡겨진 것이 보입니다. 매니저 이상은 모두의 것이 보입니다.
- 만든 사람 · 맡은 사람 · 매니저 이상이 고치고 끝낼(완료) 수 있습니다.
- 지우기는 만든 사람과 매니저 이상만.

**어떻게 — 만들기**
1. 위의 **+ Task** 나 날짜 옆 작은 **+** 를 누릅니다(그 날짜가 채워집니다).
2. 채웁니다:
   - **Title** — 할 일
   - **Date** — 그리고 **All day**(종일), 아니면 체크를 풀고 시각
   - **Assigned to** — 맡을 사람 한 명
   - **Category** — 예: Payment promise · Call · Delivery · Other
   - **Linked to** — 무엇에 대한 일인지 하나: 손님 · 공급처 · 판매 오더 · 발주 · 손님 인보이스 · 공급처 인보이스. 종류를 고르고 · 적어서 찾고 · 맞는 것을 누릅니다
   - **Notes** — 메모
3. **Save** 를 누릅니다.

**어떻게 — 끝내기 · 다시 열기 · 지우기**
1. 달력의 Task 를 누릅니다.
2. **Mark done** 으로 끝냅니다. 끝낸 Task 는 줄이 그어집니다. **Reopen** 은 다시 엽니다.
3. **Delete** 는 확인한 뒤 지웁니다.

**메일**
다른 사람에게 Task 를 맡기면 IMS 가 그 사람에게 Task 링크가 든 메일을 한 통 보냅니다. **Save** 뒤 알림에 "emailed …" 가 나옵니다.
받는 주소가 회사 주소가 아니면 메일에는 링크만 있습니다 — 제목 · 메모 · 날짜는 IMS 안에만 있습니다.

**알아 둘 것**
- 날짜가 지난 열린 Task 는 빨갛게 보입니다.
- 남에게서 받은 Task 를 다른 사람에게 넘기면 **Save** 뒤 내 달력에서 빠집니다(내가 만들었거나 매니저 이상이면 그대로) — 알림이 알려 줍니다.
- 매니저 이상은 위에서 **Everyone's tasks**(모두) · **My tasks**(내 것)를 고릅니다.
- 내 열린 Task 는 [Action Centre](06-action-centre.md#action-my-tasks) 의 **My tasks** 탭에도 있습니다.
- 매니저 이상은 **Edit list**(**Task categories**)로 분류 목록을 고칩니다. 쓰고 있는 분류는 지울 수 없습니다 — 대신 끕니다.
- Task 는 반복되지 않습니다. 다음 날짜에는 새로 만듭니다.

<!-- SCREENSHOT: cal-tasks-1 · Assigned to · Category · Linked to 가 있는 New task 상자 -->

<a id="an-start"></a>
## Analytics
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 ; ims-auth.js · BUILD nav v24 -->
<!-- who: manager, admin, accounting -->

**무엇인가**
**Analytics** 는 회사 전체 매출을 보여 줍니다: 달마다 · 날마다 · 연도 비교 · 브랜치 · 브랜드 · 손님. 탭은 둘 — **Sales overview**(매출 개요) · **Customers**(손님)입니다. 2022 년부터의 판매 이력을 모두 읽습니다.

**누가**
`analytics` 권한이 있는 사람. 한 사람씩 켭니다 — admin · supervisor 도 켜야 합니다. **GP %** 와 원가는 `cost` 권한도 있는 사람에게만 보입니다.
권한이 없으면 "Analytics is not switched on for you" 가 나옵니다.

**어떻게**
1. IMS 모드 메뉴에서 **Analytics** 를 누릅니다(**Action Centre** 다음).
2. 탭을 누릅니다: **Sales overview** 또는 **Customers**.
3. 고릅니다:
   - **Period**(기간) — [기간 목록](#an-periods) 참고. 화면을 열면 **This month** 가 골라져 있습니다.
   - **Branch** — **All branches** 또는 브랜치 하나
   - **Brand** — 브랜드 이름을 정확히 적거나 **All brands** 로 둠
4. **Show** 를 누릅니다.

**알아 둘 것**
- 브랜치 고르기는 누구에게나 모든 브랜치입니다 — 내가 일하는 브랜치 제한을 따르지 않습니다.
- 화면은 결과를 5 분 동안 기억합니다. 탭을 오가거나 손님을 열었다 돌아와도 다시 읽지 않고, 오른쪽 위에 "cached · n min ago — Show to refresh"(n 분 전 결과)가 나옵니다. 새 숫자는 **Show** 를 누릅니다.

<a id="an-periods"></a>
## 기간 목록
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**보이는 것**

| Period | 시작 ~ 끝 | 비교하는 것 |
|---|---|---|
| **This week**(이번 주) | 일요일 ~ 오늘 | 지난주 일요일 ~ 같은 요일 · 지난해 같은 주 |
| **Last week**(지난주) | 지난주 일요일 ~ 토요일 | 그 전 주 · 지난해 같은 주 |
| **This month**(이번 달) | 1 일 ~ 오늘 | 지난달 1 일 ~ 같은 날 · 지난해 같은 날들 |
| **Last month**(지난달) | 지난달 전체 | 그 전 달 전체 · 지난해 같은 달 |
| **This fiscal year (from Sep 1)**(이번 회계연도) | 9 월 1 일 ~ 오늘 | 한 해 전 같은 날들 |
| **Last fiscal year**(지난 회계연도) | 9 월 1 일 ~ 8 월 31 일 | 한 해 전 같은 날들 |
| **Last 12 months**(지난 12 달) | 열한 달 전 그 달 1 일 ~ 오늘 | — |
| **This year**(올해) | 1 월 1 일 ~ 오늘 | 지난해 같은 날들 |
| **Last year**(지난해) | 지난해 1 월 1 일 ~ 12 월 31 일 | 한 해 전 같은 날들 |
| **All history (2022 –)**(전체 이력) | 이력 처음 ~ 오늘 | — |
| **Custom months…**(달 고르기) | 시작 달 ~ 끝 달 | — |

**알아 둘 것**
- 주는 일요일에 시작합니다. 「지난해 같은 주」 는 364 일 전의 주라 그것도 일요일에 시작합니다.
- 「오늘」 은 토론토 날짜입니다.
- 회계연도는 9 월 1 일에 시작합니다. **This year** · **Last year** 는 달력 해입니다.
- 주 · 달 기간은 날짜 그대로 셉니다. 더 긴 기간은 달 단위로 세고, 이번 달은 오늘까지입니다.
- 비교 줄은 기간 카드의 숫자마다 그 밑에 붙습니다 — 주 · 달은 두 줄, 해는 한 줄. 비교가 없는 기간은 없습니다.

<a id="an-overview"></a>
## 매출 개요
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**보이는 것**

| 부분 | 무엇을 보여 주나 |
|---|---|
| 기간 카드 | 고른 기간의 **Net sales** · **Orders** · **Average order**(와 **GP %**). 숫자마다 그 밑에 비교 줄([기간 목록](#an-periods)) |
| 나눔 줄 | **Product sales** − **Credits (returns)** = **Net sales** + **Freight, service, surcharge, order discounts** = **Total before tax** |
| 연 누계 | 1 월 1 일부터 오늘까지의 순매출 · 오더 · 평균 오더 — 지난해 같은 날까지와 비교 |
| **Net sales by day** | 기간이 석 달쯤 이하일 때: 날마다 막대 + 지난해 같은 날짜의 선. 주말 막대는 흐림 |
| **Net sales by month** | 달마다 막대. 막대 색의 짙기와 범례는 그 달이 이력의 어느 시기에서 왔는지 — **2022 – Oct 2025** · **Nov 2025 – Oct 2026** · **IMS (Nov 2026 –)**. 이번 달은 흐림 |
| **Year against year** | 해마다 선 하나와 달별 표. 이번 달은 오늘까지 잘라 그 밑에 지난해 같은 날까지. "·" 는 자료 없음 |
| **By branch** | 브랜치마다 순매출 · 비율 · 오더 · 평균 오더 |
| **Top brands** | 큰 브랜드 20 개 + 나머지 브랜드 합 |
| **About these numbers** | 자료의 빈 곳과 시기마다의 출처([About these numbers](#an-gaps)) |

**어떻게**
- 막대에 마우스를 올리면 숫자가 나옵니다: 제품 판매 · 크레딧 · 순매출 · 운임 등 · 오더(와 GP). 화면 끝에서도 상자가 화면 안에 머뭅니다.

**알아 둘 것**
- **By branch** 의 **Not recorded** 는 옛 이력에서 브랜치가 없는 판매 — 대부분 크레딧입니다. Toronto 에 더하지 않습니다. 그 줄의 GP % 는 뜻이 약합니다.
- 브랜드를 고르면 **Orders** 는 그 브랜드가 든 오더 수입니다.
- 주 · 달 기간이면 **By branch** · **Top brands** 도 그 기간의 날짜 그대로 셉니다.

<!-- SCREENSHOT: an-overview-1 · 기간 카드 · 나눔 줄 · Net sales by month 가 있는 매출 개요 -->

<a id="an-customers"></a>
## Customers 탭(손님)
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**보이는 것**

| 부분 | 무엇을 보여 주나 |
|---|---|
| 카드 넷 | **Customers who bought**(산 손님) · **New customers**(처음 산 손님) · **Returning customers**(다시 산 손님) · **Lost customers**(비교 기간엔 샀는데 이번엔 안 산 손님) — 모두 비교 기간과 비교 |
| **Customers by net sales** | 본사 한 줄에 매장을 더한 순위. 칸: **Net sales** · **Before**(비교 기간) · **Change** · **Orders** · **Avg order** · (**GP %**) · **Last order**. **New** = 처음 오더가 이 기간에 있는 손님. 위 100 곳 + **All other customers**(나머지 합) |
| **Customers at risk** | 늘 사던 손님인데 뜸해진 곳([끊길 위험](#an-risk)) |
| **About these numbers** | 이 기간의 메모 — 매출 개요와 같은 꼴 |

**어떻게**
1. **Customers** 탭을 누르고 기간 · 브랜치 · 브랜드를 골라 **Show** 를 누릅니다.
2. 본사 옆 ▸ 를 누르면 매장마다 줄이 펼쳐집니다. ▾ 로 접습니다.
3. 손님 이름을 누르면 그 손님 화면이 열립니다([손님 한 곳](#an-customer)).
4. 카드의 **CSV** 로 내려받습니다. 손님 CSV 는 본사 밑에 매장마다 한 줄이 있습니다.

**알아 둘 것**
- 비교 기간은 매출 개요와 같습니다: 주 · 달이면 첫째 비교(지난주 · 지난달), 회계연도 · 달력 해면 지난해 같은 날까지. **Last 12 months** · **All history** · **Custom months…** 는 비교가 없어 **Lost customers** 에 "needs a comparison period"(비교 기간이 필요) 가 나옵니다.
- 브랜치 · 브랜드 고르기는 순위와 산 · 다시 산 · 끊긴 손님 수에 걸립니다. **New customers** 는 무엇을 골랐든 회사 전체에서 그 손님의 첫 제품 오더로 셉니다.
- 처음 산 손님 수는 높게 나올 수 있습니다: 2025 년 11 월 전 오더 상당수가 손님에 이어져 있지 않아, 처음 이어진 오더가 첫 오더처럼 보일 수 있습니다.
- 손님이 없는 옛 이력 줄은 회색 **(no customer)** 한 줄입니다. 손님 수에는 세지 않습니다.

<!-- SCREENSHOT: an-customers-1 · Customers 탭: 카드 넷 · 본사 하나를 펼친(▾) Customers by net sales · Customers at risk -->

<a id="an-risk"></a>
## 끊길 위험(Customers at risk)
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**무엇인가**
늘 꾸준히 사던 본사 중 요즘 뜸해진 곳을 오늘 기준으로 센 목록입니다. **Customers** 탭의 마지막 카드입니다.

**규칙**
셋이 모두 맞으면 끊길 위험입니다:
1. 지난 12 달에 **서로 다른 날 3 일 이상** 샀다.
2. 마지막 오더 뒤 지난 날이 평소 간격의 **2 배**보다 길다.
3. 마지막 오더 뒤 **30 일 이상** 지났다.

**평소 간격**은 지난 12 달 오더 날 사이 간격의 가운데 값(중앙값 — 간격의 반은 이보다 짧고 반은 깁니다)입니다. 목록은 지난 12 달 순매출이 큰 순서입니다.

**보이는 것**
**Last order**(마지막 오더) · **Days since**(지난 날) · **Usual gap**(평소 간격) · **Order days (12 mo)**(12 달 오더 날 수) · **Net sales (12 mo)**(12 달 순매출) · (**GP %**). ▸ 로 매장마다 마지막 오더 · 12 달 매출을 봅니다.

**알아 둘 것**
- 목록은 회사 전체입니다. 브랜치 · 브랜드 고르기와 기간이 바꾸지 않습니다.
- 목록은 밤마다 셉니다. 카드 제목에 센 시각이 "counted … (Toronto, nightly)"(토론토 시각 · 밤마다)로 나옵니다. 손님 화면의 **At risk?** 카드에도 같은 시각이 나옵니다.
- 하루에 오더가 여럿이어도 오더 날은 하루입니다.
- 화면은 500 곳까지 보여 주고, CSV 에도 같은 줄이 있습니다.

<a id="an-customer"></a>
## 손님 한 곳
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**어떻게**
1. **Customers** 탭에서 손님 이름을 누릅니다 — **Customers by net sales** · **Customers at risk** 의 이름이나 ▸ 아래 매장.
2. 같은 탭에서 그 손님 화면이 열립니다. **← All customers** 로 돌아갑니다.
3. **Open customer card** 는 **Customers** 화면의 그 손님을 새 탭으로 엽니다.

**보이는 것**

| 부분 | 무엇을 보여 주나 |
|---|---|
| 맨 위 줄 | 이름 · "head office · n stores"(본사 · 매장 수) 또는 "store of …"(… 의 매장) · 위험 목록에 있으면 **At risk** |
| 첫 카드 줄 | 기간의 **Net sales** · **Orders** · **Average order**(와 **GP %**) — 매출 개요와 같은 비교 줄 |
| 둘째 카드 줄 | **First order**(회사 전체 · 브랜치 무관) · **Last order**(n 일 전) · **Usual gap between order days**(중앙값 · 지난 12 달) · **At risk?** |
| 그래프 | **All history** — 손님의 첫 달부터 달마다 순매출. **Selected period** — 고른 기간: 석 달쯤 이하면 날마다 막대 + 지난해 같은 날짜 선, 더 길면 달마다 막대 |
| **Brands they buy** | 그 기간 손님의 브랜드: 순매출 · 비율 · 수량(와 GP %) |
| **Stores** | 본사일 때: 모든 매장(안 산 매장도) — 순매출 · 비교 · 오더 · (GP %) · 마지막 오더(한 번도 안 샀으면 "never") |

**알아 둘 것**
- 본사 화면은 모든 매장을 더합니다. 매장 화면은 그 매장만 — 평소 간격과 **At risk?** 도 그 매장으로 셉니다.
- 브랜치 고르기는 카드 · 그래프 · 브랜드 · 매장에 걸리고, 첫 · 마지막 오더 · 평소 간격 · **At risk?** 에는 안 걸립니다. 이 화면에는 브랜드 고르기가 없습니다.
- **CSV** 는 그래프 · 브랜드 · 매장 카드에 있습니다.

<!-- SCREENSHOT: an-customer-1 · 손님 한 곳: At risk 가 붙은 맨 위 줄 · 카드 두 줄 · All history 그래프 -->

<a id="an-net-sales"></a>
## 「순매출」의 뜻
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**Net sales**(순매출) = 제품 줄 · 줄 할인 뒤 · 세전 · CAD — 에서 제품 크레딧을 뺀 것.

**순매출에서 빠지는 것**
- 세금 — 이 화면 어디에도 없습니다.
- 운임 · 서비스 · 할증 · 오더 할인 줄. **Freight, service, surcharge, order discounts** 로 따로 보이고 **Total before tax** 에 들어갑니다.
- 이월 인보이스(IMS 를 시작할 때 들여온 잔액) — 판매가 아닙니다.
- 콤보의 구성품 — 콤보 줄 하나로 한 번만 셉니다.
- CAD 가 아닌 인보이스 · 크레딧(**About these numbers** 에 나옵니다).

**날짜**
- 판매는 인보이스 날짜에 셉니다.
- 크레딧은 크레딧 날짜에 셉니다 — 되돌린 판매의 날짜가 아닙니다.

**오더와 GP**
- **Orders** = 제품 줄이 하나라도 있는 오더. 크레딧만 있는 문서는 오더가 아닙니다.
- **Average order** = 순매출 ÷ 오더 수.
- **GP %** 는 원가를 아는 판매만으로 셉니다. 원가는 2022 년부터 모든 이력에 있고, 원가가 없는 판매 줄이 조금 있습니다 — [About these numbers](#an-gaps).

**Product not recorded (old system)**(옛 시스템 — 제품 기록 없음)
옛 시스템의 판매 보고서에는 제품 없이 남은 판매 줄이 있습니다. 2022 년 ~ 2025 년 10 월, 모두 약 525 만 — 브랜드 표에 **Product not recorded (old system)** 한 줄로 보입니다. 매출과 원가는 정확하고, 어떤 제품 · 브랜드였는지는 모릅니다.

**알아 둘 것**
- Claude 커넥터의 판매 집계도 같은 뜻이라 둘의 순매출이 같습니다.
- 옛 이력에는 운임 줄이 없어서, 그 달들은 **Total before tax** 가 순매출과 같습니다.

<a id="an-gaps"></a>
## About these numbers(이 숫자에 대해)
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**무엇인가**
마지막 카드는 고른 기간의 자료에서 빠졌거나 다른 것을 적고, 시기마다 출처 표(**Period** · **From** · **To** · **What an order is** · **Cost**)를 보여 줍니다.

| 코드 | 뜻 |
|---|---|
| `summary_empty` | 옛 이력 요약이 비었다 — IMS 인보이스 전의 것이 모두 빠짐. admin 이 Analytics 요약을 다시 만들어야 한다 |
| `summary_behind` | 밤마다 만드는 매출 요약이 늦다 — 그 뒤 날은 그때그때 읽어 숫자는 맞지만 화면이 느리다. admin 이 밤 Analytics 작업을 확인해야 한다 |
| `brand_moved` | 제품 브랜드를 바꿔 IMS 전 브랜드 합계 일부가 옛 브랜드에 남아 있다. 매출 합계는 맞고 브랜드별 나눔만 낡았다. admin 이 Analytics 요약을 다시 만들어야 한다 |
| `no_data` | 이 날짜 전에는 판매 자료가 없다 |
| `cost_missing` | 원가가 하나도 없는 달 — 그 달의 GP 는 빈칸(`cost` 권한만) |
| `cost_partial` | 판매 일부에 원가가 없는 달 — GP 는 원가 있는 부분만(`cost` 권한만) |
| `old_sku` | SKU 가 IMS 제품이 아닌 이력 줄 — 줄에 적힌 브랜드로 센다 |
| `unrecorded` | 제품 없이 남은 옛 시스템 줄 — **Product not recorded (old system)** 로 보인다([「순매출」의 뜻](#an-net-sales)) |
| `no_location` | 브랜치가 없는 문서 — **Not recorded** 로 보인다 |
| `usd_orders` | USD 로 청구된 손님의 이력 오더 — 바꾸지 않고 그대로 더함 |
| `non_cad` | 다른 통화의 IMS 줄 — 매출에서 뺌 |

**알아 둘 것**
- 날마다 그래프도 그 아래에 자기 메모를 같은 꼴로 적습니다.
- **Customers** 탭에 「두 달력 해에 걸쳐 인보이스된 오더」 알림이 나올 수 있습니다. 범위가 해 전체를 덮으면 그런 오더는 해마다 한 번씩 세어 오더 수가 조금 많을 수 있습니다. 매출 금액은 그대로입니다.
- 오른쪽 위 시각("History summary built …")은 옛 이력 요약을 마지막으로 다시 만든 때입니다.

<a id="an-export"></a>
## CSV · 인쇄 · PDF
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**어떻게**
- 카드의 **CSV** 는 그 카드의 표를 내려받습니다 — 화면과 같은 숫자. 원가 칸은 `cost` 권한이 있을 때만 들어 있습니다.
- **Print / PDF** 는 화면 전체를 인쇄합니다. PDF 로 만들려면 프린터에서 "PDF 로 저장"을 고릅니다.

**알아 둘 것**
- 인쇄는 다크 화면에서도 늘 흰 바탕입니다.

<!-- rulings: 1325, 1337, 1303, 1305, 1306, 1307, 1308, 1311, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1274, 1275, 1277, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1299, 1300, 1301, 1302, 714 -->
