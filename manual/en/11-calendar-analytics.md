# 11. Calendar and Analytics

<!-- sections written in docs-1117 · periods, Customers tab, risk, one customer added in docs-1117b · Calendar = dashboard.html (the first IMS screen) · Analytics = analytics.html -->
<!-- out of this chapter: the invoices, payments and bills themselves -> chapters 1 and 2 · My tasks tab -> chapter 6 · theme -> chapter 0 -->

This chapter is for everyone who uses IMS mode. The **Calendar** is the first IMS screen. **Analytics** is only for people with the `analytics` key.

- [The Calendar](#cal-start)
- [Month, Week and Day](#cal-views)
- [What the colours and chips mean](#cal-colors)
- [The Day view](#cal-day)
- [Tasks](#cal-tasks)
- [Analytics](#an-start)
- [The periods](#an-periods)
- [The sales overview](#an-overview)
- [The Customers tab](#an-customers)
- [Customers at risk](#an-risk)
- [One customer](#an-customer)
- [What "net sales" means](#an-net-sales)
- [About these numbers](#an-gaps)
- [CSV, Print and PDF](#an-export)

<a id="cal-start"></a>
## The Calendar
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**What it is**
The **Calendar** shows, day by day, what is due and what was paid:
- customer invoices that are due, and payments received from customers (with the `sales` key)
- supplier bills and charges that are due, and payments made to suppliers (with the `purchasing` key)
- tasks — things people wrote down for a date (everyone)

**Who**
Everyone who can sign in to IMS mode. You see the money parts your keys open. Without `sales` and `purchasing` you see tasks only.

**How**
1. Sign in. IMS opens on the **Calendar**. From another screen, press the Asung logo.
2. Use **‹** and **›** to move, and **Today** to come back to today.
3. **All branches** chooses one branch. It filters the customer side only — supplier bills have no branch.

**Good to know**
- Above the calendar, **Overdue — customers** and **Overdue — suppliers** show everything past its due date, also from months you are not looking at. Press an amount to list them.
- "n unpaid without a due date" counts supplier bills that have no due date, so they cannot sit on a day.
- Amounts in different currencies are shown separately — they are never added together.
- The supplier side shows bills and charges entered in IMS only. Bills from before October 30, 2026 are in QuickBooks.

<!-- SCREENSHOT: cal-start-1 · Calendar month view with overdue line, legend and a few chips -->

<a id="cal-views"></a>
## Month, Week and Day
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**What it is**
The calendar has three views. Choose one in the box next to **Calendar**.

| View | What you see |
|---|---|
| **Month** | The whole month, Sunday to Saturday. The calendar always opens in this view. |
| **Week** | Seven days, larger, nothing shortened |
| **Day** | One day as lists — everything on that day, in full (see [The Day view](#cal-day)) |

**How**
- Press a date number, or an empty spot in a day, to open that day in **Day**.
- **‹** and **›** move by a month, a week or a day, depending on the view.
- **Today** stays in the view you are in and moves to today.

**Good to know**
- The web address keeps the view and the date. You can bookmark it or send it to a colleague.

<a id="cal-colors"></a>
## What the colours and chips mean
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**Colours**
The legend at the top right:

| Colour | Meaning |
|---|---|
| **Paid** | Fully paid |
| **Part paid** | Some paid, some still owed |
| **Not paid** | Nothing paid yet — red border |
| **Overdue** | Past its due date and not fully paid — red border and red background |

**Customer chips**
One chip per day and currency. In bold: how many invoices are still open and how much is left. In grey: "+n paid" — invoices due that day that are already paid. "n overdue" counts the ones past due.
An overdue invoice stays on its own due date — it does not move to today.

**Supplier chips**
One chip per bill or charge, with its amount — and "left …" when part is paid. Press it to open the bill or charge.

**Payment chips**
- **Received** — customer payments received that day. "post-dated" marks a payment dated ahead.
- **Refunded** — refunds to customers that day.
- **Paid out** — payments made to suppliers that day.

**Good to know**
- Carried-over invoices (from before IMS) are included and marked **Carried over** in the lists.
- Customer credits are not shown as separate chips.
- A customer payment counts for the branch where it was taken.

<a id="cal-day"></a>
## The Day view
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**What it is**
The **Day** view lists everything on one day, in this order. You only see the parts your keys open.

| Part | What it lists |
|---|---|
| **Sales this day** | Net sales, orders, average order and the same day last year — only with the `analytics` key. **GP %** only with the `cost` key too. **With freight etc., before tax** adds freight and other lines. Press **Analytics** to open the full screen |
| **Tasks** | That day's tasks. **+ Task** adds one for that day |
| **Customer invoices due** | Each invoice due that day — **Invoice**, **Bill to**, **Branch**, **Total**, what is left |
| **Payments received** | Each customer payment that day (**Method**) |
| **Refunds** | Each refund that day (shown only when there is one) |
| **Supplier bills and charges due** | Each bill or charge due that day — **Kind**, **Number**, **Due**, **Amount**, **Left**, **State** |
| **Supplier payments** | Each supplier payment that day (**Paid against**, **Discount**) |

**How**
Press a row to open the invoice, bill or charge on its own screen.

**Good to know**
- A long day shows the first 500 rows and says "Showing the first … of …".
- "Sales this day" uses the same meaning of net sales as **Analytics** (see [What "net sales" means](#an-net-sales)).

<!-- SCREENSHOT: cal-day-1 · Day view with Sales this day, Tasks and Customer invoices due -->

<a id="cal-tasks"></a>
## Tasks
<!-- screen: dashboard.html · BUILD 2026-11-17 · db v5 -->
<!-- who: all -->

**What it is**
A task is a note on a date for one person — for example "Customer A promised to pay on Tuesday" or "Delivery to Customer B on Thursday".

**Who**
- Anyone can make a task and give it to anyone.
- You see the tasks you made and the tasks given to you. Managers and above see everyone's.
- The person who made it, the person it is given to, and managers can change it or mark it done.
- The person who made it and managers can delete it.

**How — make a task**
1. Press **+ Task** at the top, or the small **+** next to a date (it fills in that date).
2. Fill in:
   - **Title** — what needs doing
   - **Date** — and **All day**, or untick it and give a time
   - **Assigned to** — one person
   - **Category** — for example Payment promise, Call, Delivery, Other
   - **Linked to** — one thing it is about: a customer, supplier, sales order, purchase order, customer invoice or supplier invoice. Choose the kind, type to search, press the right one
   - **Notes**
3. Press **Save**.

**How — finish, reopen, delete**
1. Press the task on the calendar.
2. **Mark done** finishes it. A done task is crossed out. **Reopen** opens it again.
3. **Delete** removes it after you confirm.

**Email**
When you give a task to someone else, IMS sends them one email with a link to the task. The message says "emailed …" after **Save**.
If their email address is not a company address, the email has only the link — the title, notes and date stay in IMS.

**Good to know**
- An open task whose date has passed shows in red.
- If you pass a task that someone gave you on to another person, it leaves your calendar after **Save** (unless you made it, or you are a manager) — the message tells you.
- Managers can choose **Everyone's tasks** or **My tasks** at the top.
- Your open tasks are also on the **My tasks** tab of the [Action Centre](06-action-centre.md#action-my-tasks).
- Managers can change the category list with **Edit list** (**Task categories**). A category in use cannot be deleted — switch it off instead.
- Tasks do not repeat. Make a new one for the next date.

<!-- SCREENSHOT: cal-tasks-1 · New task box with Assigned to, Category and Linked to -->

<a id="an-start"></a>
## Analytics
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 ; ims-auth.js · BUILD nav v24 -->
<!-- who: manager, admin, accounting -->

**What it is**
**Analytics** shows company-wide sales: by month, by day, year against year, by branch, by brand and by customer. It has two tabs: **Sales overview** and **Customers**. It reads all sales history from 2022.

**Who**
People with the `analytics` key. The key is switched on person by person — admins and supervisors need it switched on too. **GP %** and cost show only to people who also have the `cost` key.
Without the key, the screen says "Analytics is not switched on for you".

**How**
1. In IMS mode, press **Analytics** on the menu (after **Action Centre**).
2. Press a tab: **Sales overview** or **Customers**.
3. Choose:
   - **Period** — see [The periods](#an-periods). **This month** is chosen when the screen opens.
   - **Branch** — **All branches** or one branch
   - **Brand** — type the brand's exact name, or leave **All brands**
4. Press **Show**.

**Good to know**
- The branch filter covers all branches for everyone — it does not follow the branches you work in.
- The screen keeps each result for 5 minutes. Moving between tabs, or opening a customer and coming back, does not load again. The top right then says "cached · n min ago — Show to refresh". Press **Show** to read fresh numbers.

<a id="an-periods"></a>
## The periods
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**What you see**

| Period | From – to | Compared with |
|---|---|---|
| **This week** | Sunday to today | Last week, Sunday to the same weekday · the same week last year |
| **Last week** | Sunday to Saturday of last week | The week before · the same week last year |
| **This month** | The 1st to today | Last month, the 1st to the same day · last year, the same days |
| **Last month** | All of last month | The month before, all of it · the same month last year |
| **This fiscal year (from Sep 1)** | September 1 to today | The same days one year earlier |
| **Last fiscal year** | September 1 to August 31 | The same days one year earlier |
| **Last 12 months** | The 1st of the month eleven months back, to today | — |
| **This year** | January 1 to today | The same days last year |
| **Last year** | January 1 to December 31 of last year | The same days one year earlier |
| **All history (2022 –)** | The start of the history to today | — |
| **Custom months…** | A from month to a to month | — |

**Good to know**
- A week starts on Sunday. "The same week last year" is the week 364 days earlier, so it starts on a Sunday too.
- "Today" is today's date in Toronto.
- The fiscal year starts on September 1. **This year** and **Last year** are calendar years.
- Week and month periods count exact dates. Longer periods count whole months; the current month runs to today.
- The comparison lines sit under each number on the period cards — two lines for weeks and months, one line for years. Periods with no comparison show none.

<a id="an-overview"></a>
## The sales overview
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**What you see**

| Part | What it shows |
|---|---|
| Period cards | **Net sales**, **Orders**, **Average order** (and **GP %**) for the period you chose. Under each number, its comparison lines (see [The periods](#an-periods)) |
| Breakdown line | **Product sales** − **Credits (returns)** = **Net sales** + **Freight, service, surcharge, order discounts** = **Total before tax** |
| Year to date | Net sales, orders and average order from January 1 to today, against last year to the same date |
| **Net sales by day** | Shown when the period is about three months or shorter: a bar per day and a line for the same date last year. Weekend bars are faded |
| **Net sales by month** | A bar per month. The bar shades and the legend show which part of the history the month comes from: **2022 – Oct 2025**, **Nov 2025 – Oct 2026** or **IMS (Nov 2026 –)**. The current month is faded |
| **Year against year** | A line per year and a table, month by month. This month is cut to today, with the same days last year under it. "·" means no data |
| **By branch** | Net sales, share, orders and average order per branch |
| **Top brands** | The 20 largest brands, then all other brands together |
| **About these numbers** | Gaps in the data and where each period comes from (see [About these numbers](#an-gaps)) |

**How**
- Point at a bar to see its numbers: product sales, credits, net, freight etc., orders (and GP). The box stays on the screen near the edges.

**Good to know**
- **Not recorded** in **By branch** is sales with no branch in the older history — mostly credits. It is not added to Toronto. Its GP % says little.
- With a brand chosen, **Orders** counts the orders that contain that brand.
- For a week or a month, **By branch** and **Top brands** count the exact dates of the period.

<!-- SCREENSHOT: an-overview-1 · Sales overview with period cards, breakdown line and Net sales by month -->

<a id="an-customers"></a>
## The Customers tab
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**What you see**

| Part | What it shows |
|---|---|
| Four cards | **Customers who bought** · **New customers** (first order ever) · **Returning customers** · **Lost customers** (bought in the comparison period, not in this one) — each against the comparison period |
| **Customers by net sales** | One line per head office, with its stores added in. Columns: **Net sales**, **Before**, **Change**, **Orders**, **Avg order**, (**GP %**), **Last order**. **New** marks a customer whose first order ever is in this period. The top 100, then **All other customers** |
| **Customers at risk** | Customers who usually buy regularly but have gone quiet (see [Customers at risk](#an-risk)) |
| **About these numbers** | Notes for this period, as on the sales overview |

**How**
1. Press the **Customers** tab. Choose the period, branch and brand, and press **Show**.
2. Press ▸ next to a head office to see each of its stores. Press ▾ to close.
3. Press a customer's name to open its page (see [One customer](#an-customer)).
4. Press **CSV** on a card to download it. The customer CSV has a row for each store under its head office.

**Good to know**
- The comparison period is the same as on the sales overview: the first comparison for a week or month (last week, last month), and last year to the same day for a fiscal or calendar year. **Last 12 months**, **All history** and **Custom months…** have none, so **Lost customers** says "needs a comparison period".
- The branch and brand choices apply to the ranking and to the bought, returning and lost counts. **New customers** counts the company's first product order, whatever branch or brand you choose.
- New-customer counts can read high: many orders from before November 2025 are not linked to a customer, so a customer's first linked order can look like a first order.
- Older history lines with no customer show in grey as **(no customer)**. They are not counted as customers.

<!-- SCREENSHOT: an-customers-1 · Customers tab: four cards, Customers by net sales with one head office opened (▾), Customers at risk -->

<a id="an-risk"></a>
## Customers at risk
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**What it is**
A list, worked out for today, of head offices that usually buy regularly but have gone quiet. It is the last card on the **Customers** tab.

**The rule**
A customer is at risk when all three are true:
1. They bought on at least **3 different days** in the last 12 months.
2. The days since their last order are more than **2 ×** their usual gap.
3. It has been at least **30 days** since their last order.

The **usual gap** is the middle value of the days between their order days in the last 12 months (half the gaps are shorter, half are longer). The list is sorted by net sales in the last 12 months, biggest first.

**What you see**
**Last order** · **Days since** · **Usual gap** · **Order days (12 mo)** · **Net sales (12 mo)** (· **GP %**). ▸ shows each store's last order and 12-month sales.

**Good to know**
- The list is for the whole company. The branch and brand choices, and the period, do not change it.
- The list is counted every night. The card title shows when: "counted … (Toronto, nightly)". The **At risk?** card on a customer's page shows the same time.
- Several orders on one day count as one order day.
- The screen shows up to 500 customers; the CSV has the same rows.

<a id="an-customer"></a>
## One customer
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**How**
1. On the **Customers** tab, press a customer's name — in **Customers by net sales**, in **Customers at risk**, or a store under ▸.
2. The customer's page opens in the same tab. Press **← All customers** to go back.
3. Press **Open customer card** to open the customer on the **Customers** screen in a new tab.

**What you see**

| Part | What it shows |
|---|---|
| Top line | The name · "head office · n stores" or "store of …" · **At risk** when the customer is on the risk list |
| First cards | **Net sales**, **Orders**, **Average order** (and **GP %**) for the period, with the same comparison lines as the sales overview |
| Second cards | **First order** (whole company · any branch) · **Last order** (n days ago) · **Usual gap between order days** (median · last 12 months) · **At risk?** |
| Chart | **All history** — net sales by month from the customer's first month. **Selected period** — the chosen period: up to about three months a bar per day with a line for the same date last year, longer periods a bar per month |
| **Brands they buy** | The customer's brands in the period: net sales, share, units (and GP %) |
| **Stores** | For a head office: every store, also stores that did not buy — net sales, before, orders, (GP %), last order ("never" if it never bought) |

**Good to know**
- A head office's page adds up all its stores. A store's page shows that store only — its usual gap and **At risk?** are counted for that store.
- The branch choice applies to the cards, the chart, the brands and the stores. It does not change the first and last order, the usual gap or **At risk?**. There is no brand choice on this page.
- **CSV** works on the chart, the brands and the stores.

<!-- SCREENSHOT: an-customer-1 · One customer: top line with At risk, two rows of cards, All history chart -->

<a id="an-net-sales"></a>
## What "net sales" means
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**Net sales** = product lines, after line discounts, before tax, in CAD — minus product credits.

**What is left out of net sales**
- Tax — nowhere on this screen.
- Freight, service, surcharge and order-discount lines. They show separately as **Freight, service, surcharge, order discounts**, and are in **Total before tax**.
- Carried-over invoices (balances brought in when IMS started) — they are not sales.
- The parts of a combo — the combo line counts once.
- Invoices and credits in a currency other than CAD (listed under **About these numbers**).

**Dates**
- A sale counts on its invoice date.
- A credit counts on the credit's date — not on the date of the sale it returns.

**Orders and GP**
- **Orders** = orders with at least one product line. A document with only a credit is not an order.
- **Average order** = net sales ÷ orders.
- **GP %** uses only the sales whose cost is known. Cost is known for all history from 2022; a few sales lines have no cost — see [About these numbers](#an-gaps).

**Product not recorded (old system)**
The old system's sales reports kept some sales lines without a product. They show as one brand line, **Product not recorded (old system)**, from 2022 to October 2025 — about 5.25 million in all. Their sales and cost are exact; the product and brand are not known.

**Good to know**
- The Claude connector's sales summary uses the same meaning, so the two give the same net sales.
- The older history has no freight lines, so for those months **Total before tax** equals net sales.

<a id="an-gaps"></a>
## About these numbers
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**What it is**
The last card lists what is missing or different in the data for the period you chose, and a table of where each period comes from (**Period**, **From**, **To**, **What an order is**, **Cost**).

| Code | Meaning |
|---|---|
| `summary_empty` | The history summary is empty — everything before IMS invoices is missing. An admin needs to rebuild the Analytics summary |
| `summary_behind` | The nightly sales summary is behind — the later days are read live, so the figures are correct but the page is slower. An admin needs to check the nightly Analytics job |
| `brand_moved` | A product's brand was changed, so some brand totals from before IMS are still under the earlier brand. Sales totals are correct; only the split by brand is out of date. An admin needs to rebuild the Analytics summary |
| `no_data` | No sales data before this date |
| `cost_missing` | Months with no cost at all — GP is blank for them (cost key only) |
| `cost_partial` | Months where part of the sales has no cost — GP covers only the costed part (cost key only) |
| `old_sku` | History lines whose SKU is not an IMS product — counted under the brand on the line |
| `unrecorded` | Old-system lines kept without a product — shown as **Product not recorded (old system)** (see [What "net sales" means](#an-net-sales)) |
| `no_location` | Documents with no branch — shown as **Not recorded** |
| `usd_orders` | History orders from customers billed in USD — added as they are, not converted |
| `non_cad` | IMS lines in another currency — left out of sales |

**Good to know**
- The day chart lists its own notes under the chart in the same way.
- On the **Customers** tab a note may say that some orders were invoiced across two calendar years. When the range covers whole years such an order is counted once in each year, so the order count may be slightly high. Sales amounts are not affected.
- The time at the top right ("History summary built …") is when the summary of the older history was last rebuilt.

<a id="an-export"></a>
## CSV, Print and PDF
<!-- screen: analytics.html · BUILD 2026-11-17 · an v7 -->
<!-- who: manager, admin, accounting -->

**How**
- **CSV** on a card downloads that card's table — the same numbers as on the screen. Cost columns are in it only if you have the `cost` key.
- **Print / PDF** prints the whole screen. To make a PDF, choose "Save as PDF" as the printer.

**Good to know**
- Printing is always on white, also in the dark theme.

<!-- rulings: 1325, 1337, 1303, 1305, 1306, 1307, 1308, 1311, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1274, 1275, 1277, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1299, 1300, 1301, 1302, 714 -->
