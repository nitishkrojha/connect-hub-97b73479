
User wants an Inbox / Unified Conversations module — inbound messages from Email, WhatsApp, Chatbot, Social Media (FB/IG/X), and other channels. Project users (real users in project login) can: view, reply, close, create ticket. Plus channel connection setup, reports, and dashboard.

This is a sizable feature. Keep UI-only mock (matches current app pattern — IVRS/Outbound are all dummy data). 4 new pages + sidebar entry + dashboard tab + reports tab.

## Scope

### 1. New module: "Inbox" (Project sidebar)
Add nav item `Inbox` (Inbox icon) under Project Layout, between "Send Message" and "Headers & Templates".

### 2. Pages to create
| Route | Purpose |
|---|---|
| `/project/inbox` | Unified conversation list (left) + conversation thread (right) — WhatsApp/Intercom style |
| `/project/inbox/connections` | Connect channels: Email (IMAP/SMTP), WhatsApp, FB Messenger, Instagram DM, X/Twitter DM, Telegram, Web Chatbot, Custom Webhook |
| `/project/inbox/dashboard` | KPIs: open conversations, unassigned, avg response time, channel mix, today's volume, SLA breach |
| `/project/inbox/reports` | Trend charts: volume over time, by channel, by agent, resolution time, ticket conversion rate |

### 3. Inbox conversation screen (main page)
Three-pane layout:
- **Left rail**: filters (All / Mine / Unassigned / Open / Closed) + channel filter chips (Email, WhatsApp, FB, IG, Chatbot, etc.)
- **Middle**: conversation list — sender name, channel icon badge, last message preview, unread dot, time
- **Right**: thread view with:
  - Header: sender info + channel badge + status badge (Open/Pending/Closed)
  - Message bubbles (incoming left, outgoing right) with channel-aware styling
  - Action bar: **Reply** (textarea + send), **Assign**, **Close**, **Create Ticket**, **Add Note**
  - Side panel (collapsible): contact details, conversation metadata, linked ticket, tags

### 4. Channel connections page
Card grid for each channel with:
- Icon, name, status badge (Connected / Not Connected)
- Connect button → opens dialog with mock config fields (e.g., WhatsApp Business Number, FB Page ID, IMAP server, webhook URL)
- For connected channels: show webhook URL, last sync, message count today, Disconnect button
- "Add Custom Channel" tile for arbitrary webhook ingestion

### 5. Dashboard tab
KPI cards (8): Open, Unassigned, Closed Today, Avg First Response, Avg Resolution, SLA Breach %, Tickets Created, Active Agents
+ Channel mix donut, Today's hourly volume area chart, Recent conversations table

### 6. Reports page
Tabs: Volume / Response Time / Agent Performance / Channel Performance
Charts (Recharts — already used in IVRS): line/area for trends, bar for breakdowns, table for agent leaderboard
Date range picker (last 7/30/90 days)

### 7. Ticket creation
"Create Ticket" button on conversation → dialog with: subject, priority (Low/Med/High/Urgent), category, assignee, description (pre-filled with conversation snippet). Stored in component state, shown as "Linked Ticket" badge on the conversation afterward.

## Files to create
- `src/pages/project/InboxPage.tsx` — main conversation UI
- `src/pages/project/InboxConnectionsPage.tsx` — channel connections
- `src/pages/project/InboxDashboardPage.tsx` — KPIs + charts
- `src/pages/project/InboxReportsPage.tsx` — reports with tabs
- `src/data/inboxMockData.ts` — shared dummy conversations, channels, agents, tickets

## Files to edit
- `src/App.tsx` — register 4 new routes under `/project`
- `src/layouts/ProjectLayout.tsx` — add "Inbox" nav with Inbox icon (and optionally a sub-section divider)

## Implementation notes
- Pure UI mock; no backend wiring (matches Outbound/IVRS pattern in this app)
- Reuse existing shadcn components: Card, Tabs, Badge, Button, Input, Textarea, Dialog, ScrollArea, Avatar, Select, DropdownMenu
- Reuse Recharts (already installed) for dashboard/reports
- Channel icons: Lucide (Mail, MessageCircle, Facebook, Instagram, Twitter, Send for Telegram, Bot for chatbot, Webhook for custom)
- Conversation state managed locally with useState + dummy data; reply appends to thread
- Mobile responsive: collapse to single pane on small screens with back nav
- "Create Ticket" stores in local state; show badge on conversation card afterward

## Service boundary recap
- **Outbound Messaging** — App → User (Send, Campaigns, Templates, Recipients)
- **IVRS** — Voice analytics (Call Dashboards, Geo, Peak hours)
- **Inbox (NEW)** — User → App (text, all channels) with reply / close / ticket workflow
