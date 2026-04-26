## 1. Login Page — Use the colorful floating bubbles from marketing hero

**File:** `src/pages/LoginPage.tsx`

- Replace the current `<ChannelBubbles />` widget on the left brand panel with `<HeroChannelOrbit />` (the same vibrant, multi-color floating bubbles used on the marketing homepage hero — WhatsApp, SMS, Email, IVRS, AI Agent, Instagram, Facebook, Telegram, RCS bubbles orbiting a glowing Samparq logo).
- Keep the existing left-panel copy ("One bridge. Every conversation.") above the bubbles, with a touch more vertical breathing room so the orbit halo isn't clipped.
- The bubble component already supports `prefers-reduced-motion`, so no a11y regression.

## 2. Project Dashboard — Add Inbox Analytics tab + rename Voice tab

**File:** `src/pages/project/ProjectDashboard.tsx`

Currently the Dashboard has two tabs: **Message Dashboard** and **Call Dashboard**.

Update the tab strip to three tabs in this order:
1. **Message Dashboard** (unchanged — existing Broadcast/Templates view)
2. **Inbox Dashboard** *(new)* — render `<InboxAnalyticsPage />` (already shows Conversations, Resolved, Avg first response, CSAT KPIs + conversation trend + by-channel + top agents). This satisfies the requested "conversation, resolved, in progress, avg first response" KPIs. We will also add an **In Progress** KPI tile (e.g., 631) to the Inbox Analytics KPI strip so all four asked-for metrics appear.
3. **Call Dashboard** (unchanged — keeps current `IVRSAnalyticsPage` content)

Tab icons: `BarChart3` for Message, `Inbox` for Inbox, `Phone` for Call.

## 3. Rename "Campaign Analytics" → "Broadcast Analytics" everywhere

Routes/URLs stay the same to avoid breaking links. Only labels & page titles change.

**Files:**
- `src/layouts/ProjectLayout.tsx` — sidebar Analytics group: change label `"Campaign Analytics"` → `"Broadcast Analytics"`.
- `src/pages/project/analytics/AnalyticsHubPage.tsx` — tile `title: "Campaign Analytics"` → `"Broadcast Analytics"`, and update its description to use "broadcast" wording.
- `src/pages/project/analytics/CampaignAnalyticsPage.tsx` — `<AnalyticsShell title="Campaign Analytics" …>` → `title="Broadcast Analytics"`, update subtitle accordingly.
- The Dashboard's existing "Message Dashboard" tab (which shows broadcast stats) — leave the tab name as-is per your instruction; the rename specifically applies to the Analytics section. (If you also want the dashboard tab renamed to "Broadcast Dashboard", say the word and I'll include that too.)

## 4. Voice Analytics — Use Voice Dashboard analysis under Analytics

Currently `VoiceAnalyticsPage` shows: KPIs (Total/Inbound/Outbound/Missed) → Call volume area chart → IVRS menu funnel → Recent calls.

`VoiceDashboardPage` (richer, used in the Call Dashboard tab) shows: 6-KPI strip (Total, Inbound, Outbound, Missed, **Avg duration**, **Answer rate**) → Hourly call volume bars → Top agents → Recent calls.

**File:** `src/pages/project/analytics/VoiceAnalyticsPage.tsx`

- Replace its body to render the same content as `VoiceDashboardPage` (KPIs, hourly bars, top agents, recent calls table) wrapped inside `<AnalyticsShell title="Voice Analytics" subtitle="Real-time view across every voice channel.">` so the date-range + export controls stay consistent with other Analytics pages.
- Label stays **"Voice Analytics"** in the sidebar (`ProjectLayout.tsx`) and in `AnalyticsHubPage.tsx` tile — same wording used in the Dashboard's Call Dashboard tab area for consistency.
- This means the Analytics → Voice page and the Dashboard → Call Dashboard tab now show the *same* analysis (single source of truth).

## 5. Admin parity (light touch)

`src/pages/admin/analytics/AdminCampaignAnalyticsPage.tsx` re-uses `CampaignAnalyticsPage`, so it will automatically pick up the "Broadcast Analytics" rename. Same for the voice admin wrapper. No code changes needed in admin wrappers.

---

### Files touched
1. `src/pages/LoginPage.tsx` — swap bubble component
2. `src/pages/project/ProjectDashboard.tsx` — add Inbox tab
3. `src/pages/project/analytics/InboxAnalyticsPage.tsx` — add "In Progress" KPI tile
4. `src/layouts/ProjectLayout.tsx` — rename sidebar label
5. `src/pages/project/analytics/AnalyticsHubPage.tsx` — rename tile
6. `src/pages/project/analytics/CampaignAnalyticsPage.tsx` — rename page title
7. `src/pages/project/analytics/VoiceAnalyticsPage.tsx` — replace content with Voice Dashboard analysis

### Out of scope
- No route URL changes (backwards compatible).
- No data-model or backend changes.
- Marketing site untouched.

Approve to build.