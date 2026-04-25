
# Plan — Analytics split, dashboard simplification, admin parity, marketing refresh

## 1. Workspace Analytics — split into 3 dedicated pages

Today `/project/reports` (ProjectReportsPage, 721 lines) renders Campaigns + Inbox + Voice analytics in a single page. Replace with 3 focused pages + an Analytics index, and move **Number Lookup** under Analytics.

**New routes** (in `src/App.tsx`):
- `/project/analytics` → AnalyticsHubPage (cards linking to the 4 below)
- `/project/analytics/campaigns` → CampaignAnalyticsPage *(extracted from ProjectReportsPage)*
- `/project/analytics/inbox` → InboxAnalyticsPage *(extracted)*
- `/project/analytics/voice` → VoiceAnalyticsPage *(reuse simplified IVRSAnalyticsPage content)*
- `/project/analytics/number-lookup` → NumberHistoryPage *(moved from Settings)*

Delete the old `/project/reports` route (or 301-redirect to `/project/analytics`).

**Sidebar** (`src/layouts/ProjectLayout.tsx`) — Analytics group becomes:
```
Analytics
 ├─ Overview            → /project/analytics
 ├─ Campaign Analytics  → /project/analytics/campaigns
 ├─ Inbox Analytics     → /project/analytics/inbox
 ├─ Voice Analytics     → /project/analytics/voice
 └─ Number Lookup       → /project/analytics/number-lookup
```
Remove "Number Lookup" from Settings group.

**Standardized layout** for all three module-analytics pages (per earlier approval — separate pages, standardized layout):
1. Page header (title + date-range picker + export)
2. 4-KPI strip (consistent card component)
3. Primary trend chart (full width, AreaChart)
4. 2-col: secondary breakdown chart + top-N table
5. Detail table with status pills

Extract a shared `<AnalyticsShell>` and `<KpiCard>` in `src/components/analytics/` so the 3 pages stay visually identical.

## 2. Simplify the 3 module dashboards

Each module currently mixes operations + analytics. Make dashboards **operational summaries only** (analytics lives in the Analytics tree).

**Campaigns dashboard** (`CampaignsPage.tsx`, 685 lines → ~250):
- KPI strip: Active, Scheduled, Sent today, Delivery rate
- "Quick actions" row: New Broadcast, Upload Contacts, Browse Templates
- Recent campaigns table (10 rows) with status pills
- Remove embedded charts (link "View analytics →" to `/project/analytics/campaigns`)

**Inbox dashboard** (`InboxPage.tsx`):
- Keep the conversation UI, but add a compact 4-KPI header strip: Open, Pending reply, Avg first response, Resolved today
- Remove inline analytics widgets

**Voice dashboard** (`VoiceDashboardPage.tsx`, already simplified — keep, just align KPI card component with shared `<KpiCard>`).

All three use the same `<KpiCard>` and `<QuickActionTile>` for visual consistency.

## 3. Admin = Project parity

Admin currently has its own `AdminDashboard` and `AdminReportsPage`. Make admin views "By Workspace" mirrors of the new project views.

- `AdminDashboard` → reuse the same KPI + quick-actions layout, but aggregate across workspaces with a workspace switcher / "All workspaces" filter
- `AdminReportsPage` → split into the same 4 analytics pages (`/admin/analytics/{campaigns,inbox,voice,number-lookup}`) with an extra **Workspace** column / filter dropdown
- Admin sidebar Analytics group mirrors project sidebar
- Shared components live in `src/components/analytics/` so admin and project render identically

## 4. Marketing website refresh

### Global
- **Remove all italic styling.** Audit `src/marketing/*` and `src/index.css`; strip `italic`, `font-serif italic`, and the gradient italic accent in `InlineWordSwap` → replace with a non-italic gradient text-swap.
- Tighten color palette: keep the light + brand-blue gradient (login left-panel theme) but add **richer section variation** so it doesn't read as boring/light:
  - Hero: brand gradient (primary→info) with subtle mesh
  - Alt sections: white / `bg-muted/30` / soft tinted (`bg-primary/5`) — alternating
  - One mid-page **dark band** (deep navy `bg-sidebar`) for the "Why Samparq" stats section to add contrast
- Typography: Inter everywhere, weights 500/600/700; remove serif. Headings `tracking-tight`.
- Increase visual density with: product screenshot mocks, channel logo grid, animated counters, customer-logo marquee, "How it works" 3-step strip with icons.

### HomePage — new section order (drop FAQ, Pricing, Feedback)
Inspired by zecodigital's WhatsApp-first structure but kept multi-channel and market-standard:

1. **Hero** — headline + subhead + dual CTA (Start free trial / Book demo) + ChannelBubbles animation on the right (already built)
2. **Trust ribbon** — "Powered by official WhatsApp Business API · DLT-ready · ISO 27001-aligned" (no Meta-Partner claim)
3. **Everything you need to scale conversations** — 6-tile feature grid (Bulk Broadcast, Shared Inbox, AI Chatbot, IVR Studio, Click-to-Call, Voice Broadcast) — replaces zeco's "Marketing Scale" block
4. **One platform, every channel** — channel grid (WhatsApp, SMS, Email, RCS, Voice, Instagram, Facebook, Telegram, Webchat) with short value line each
5. **How it works** — 3 steps: Connect channels → Build campaigns/agents → Measure & iterate
6. **Product preview band** (dark) — animated mock of Inbox + Voice dashboards with stat counters
7. **Industries we serve** — BFSI, E-commerce, Healthcare, EdTech, Logistics, D2C (icon grid)
8. **Final CTA band** — "Start your 7-day free trial" + secondary "Talk to sales"

**Removed from HomePage**: FAQ accordion, Pricing cards, Customer feedback/testimonials block. (FAQ stays available on the Pricing page only; testimonials can move to a future Customers page.)

### Files
- Edit: `src/marketing/HomePage.tsx` (rewrite section composition), `src/marketing/InlineWordSwap.tsx` (remove italic + serif), `src/marketing/MarketingLayout.tsx` (header/footer polish, no italics), `src/index.css` (drop italic utility usage)
- Keep: `ChannelBubbles`, `LogoMarquee`, `CountUp`, `MeshGradient`, `HeroStage`, `TypewriterHeading` (audit each for `italic`/`font-serif` and remove)
- Audit labels across marketing pages — replace any remaining "Project" with "Workspace", "Bulk Call" with "Voice Broadcast", "Conversations" group label stays as "Inbox" in product copy.

## 5. New / changed files summary

**Created**
- `src/components/analytics/AnalyticsShell.tsx`
- `src/components/analytics/KpiCard.tsx`
- `src/components/analytics/QuickActionTile.tsx`
- `src/pages/project/analytics/AnalyticsHubPage.tsx`
- `src/pages/project/analytics/CampaignAnalyticsPage.tsx`
- `src/pages/project/analytics/InboxAnalyticsPage.tsx`
- `src/pages/project/analytics/VoiceAnalyticsPage.tsx`
- `src/pages/admin/analytics/*` (4 mirror pages)
- `src/marketing/sections/FeatureGrid.tsx`, `ChannelGrid.tsx`, `HowItWorks.tsx`, `IndustryGrid.tsx`, `ProductPreviewBand.tsx`, `FinalCTA.tsx`

**Edited**
- `src/App.tsx` — new routes, drop `/project/reports`, drop `/project/number-history` from settings
- `src/layouts/ProjectLayout.tsx` + `src/layouts/AdminLayout.tsx` — Analytics group restructure, move Number Lookup
- `src/pages/project/CampaignsPage.tsx`, `InboxPage.tsx`, `VoiceDashboardPage.tsx` — simplify, link to analytics
- `src/pages/admin/AdminDashboard.tsx`, `AdminReportsPage.tsx` — mirror project layout with workspace filter
- `src/marketing/HomePage.tsx`, `InlineWordSwap.tsx`, `MarketingLayout.tsx`, `index.css`

**Removed**
- `src/pages/project/ProjectReportsPage.tsx` (split into 3)
- FAQ / Pricing-cards / Feedback sections from HomePage (components remain available for other pages)

## Out of scope
- No backend wiring; all data stays mocked
- Pricing/Solutions/Docs/Contact page bodies untouched (only header/footer + italic removal)
- No auth or entitlement changes
