
# Final Plan — Self-Serve Onboarding, Plan Gating & Market-Standard Labels

This consolidates three previously discussed efforts into one execution plan:
1. Self-serve **onboarding from the marketing site** with email confirmation
2. **Plan-based feature gating** (Starter / Growth / Enterprise) across the workspace
3. App-wide **UI label standardization** to match CPaaS / helpdesk industry vocabulary

---

## 1. Plan Tiers (final, market-standard names)

| ID | Label | Send (Outbound) | Inbox (Inbound) | Voice | Config | AI |
|---|---|---|---|---|---|---|
| `starter` | **Starter** | SMS · Email · RCS | Email · Web Chat · Webhooks | Voice Dashboard (event-webhook); Click-to-Call & Voice Broadcast metered | DIC Notifier — trial only | — |
| `growth` | **Growth** | All channels (SMS · WhatsApp · Email · RCS) + DIC self-config + Contact Sync API | All inbound integrations (WhatsApp · Email · IG · FB · Telegram · Web Chat · Webhooks) | Full IVR Studio + Click-to-Call + Voice Broadcast + inbound calls (metered, included) | DIC Notifier — full self-configuration | — |
| `enterprise` | **Enterprise** | Everything in Growth | Everything in Growth | Everything in Growth + advanced analytics | Everything in Growth + SSO/audit | **AI Agent** for Call, WhatsApp, Web Chat, Email |

**Universal rule:** Voice **Dashboard** (analytics view) is **free for everyone**. Click-to-Call, Voice Broadcast, and inbound call handling are **metered** (included in Growth/Enterprise; pay-as-you-go on Starter).

---

## 2. Final Label Map (applied app-wide)

### Plan tier names
- `Business` → **Growth**
- `Agentic` → **Enterprise**

### Sidebar groups (workspace)
| Old | New |
|---|---|
| Overview / project Dashboard | **Dashboard** |
| Send (group) | **Campaigns** (group) |
| Send Message | **Broadcast** (single send) |
| Campaigns | **Campaigns** |
| Campaign History / History | **Campaign History** |
| Headers & Templates | **Templates** |
| Upload Recipients | **Contacts** |
| API Fetch Recipients | **Contact Sync API** |
| (group) Conversations | **Inbox** (group) |
| Inbox | **All Conversations** |
| Voice & Call (group) | **Voice** (group) |
| Voice analytics | **Voice Dashboard** |
| Click-to-Call | **Click-to-Call** (kept) |
| Bulk Call | **Voice Broadcast** |
| IVRS Builder | **IVR Studio** |
| Call History & Recordings | **Call Logs** |
| AI Agent (group) | **AI Studio** (group) |
| Reports | **Analytics** |
| Configuration (group) | **Settings** (group) |
| Project Config | **Workspace** |
| DIC Notifier | **DLT & Sender IDs** (DIC Notifier kept as product name within) |
| Quota | **Usage** |
| Number History / Number Lookup | **Number Lookup** (kept) |
| Developer Docs | **Developers** |
| Profile | moved into **Account** menu (top-right) |

### Other term swaps (everywhere in copy, toasts, tables, dialogs)
- "Recipients" → **Contacts**
- "Quota" → **Usage**
- "Project" (user-facing) → **Workspace**
- "Project Head" → **Workspace Owner**
- "Onboard New Project" → **Onboard New Workspace**
- "Assign to Project(s)" → **Assign to Workspace(s)**
- "Project-wise" → **By Workspace**
- "Project Code" → **Workspace Code**
- "Add Project" → **Add Workspace**

### Preserved (DO NOT change — proper nouns / industry terms)
- "WhatsApp **Business** API" / "Business Account ID" / `senderId || "Business"` placeholders
- "Businesses connected" stat label on marketing
- Internal types (`interface Project`, `projectId`, `projectName` in code), route prefix `/project/...` (kept to avoid churn; visible labels say Workspace)
- "DIC Notifier" as the product name inside the DLT & Sender IDs page

---

## 3. Marketing — Self-Serve Onboarding

### A. PricingPage revamp (`src/marketing/PricingPage.tsx`)
- Three cards: **Starter · Growth · Enterprise** with the entitlement bullets above
- Each card CTA: **"Start with Starter / Growth / Enterprise"** → `/onboarding?plan=starter|growth|enterprise`
- Feature comparison matrix below the cards (Send / Inbox / Voice / Settings / AI)
- Concrete prices shown (with placeholder ₹ values + "Talk to sales" on Enterprise) — Monthly / Annual toggle (annual = "2 months free")

### B. New `/onboarding` (multi-step wizard)
4 steps with animated stepper, dark Seezo-aesthetic, glass-card forms, zod validation:

1. **Choose Plan** — pre-selected from `?plan=`; Monthly/Annual toggle
2. **Business Details** — Business name*, Type, Website, Country*/State/City, GSTIN, Expected monthly volume
3. **Workspace Owner Details** — Full name*, Work email* (login), Mobile*, Designation, Password* + Confirm*, T&C checkbox*
4. **Review & Confirm** — summary + **Create my workspace** CTA

On submit (Phase 1, mock):
- Persist to `localStorage` (`samparq_signups`) and seed user in `AuthContext` with chosen plan's entitlements
- Show success page; simulated "confirmation email" toast + dev "Mark as confirmed" button
- "Continue to login" → `/login?email=<email>&confirmed=1`

### C. New `/onboarding/success`
Animated checkmark, "You're in." headline, next-steps bullets.

### D. `MarketingLayout` header
Primary CTA changes to **"Start free"** → `/onboarding`. Final CTA on HomePage also routes to `/onboarding`.

### E. Email confirmation
- **Phase 1 (this round):** simulated, dev "Mark as confirmed" button
- **Phase 2 (separate):** real Lovable Cloud (Supabase Auth) signup + transactional welcome email. Clean swap point at `AuthContext.signup`.

---

## 4. Auth + Entitlement System

### `src/contexts/AuthContext.tsx` (edit)
- Add `Plan = "starter" | "growth" | "enterprise"`
- Add `User.plan`, `User.businessName`, `User.businessType`, `User.emailVerified`
- New `signup(payload)` method (Phase 1 = localStorage mock)
- Seed demo users to plans: `project@dicnotifier.io` → `growth`

### `src/config/planEntitlements.ts` (new)
Single source of truth — maps `Plan → { send, inbox, voice, settings, ai, navVisibility }`. Drives sidebar, route guards, and lock badges.

### `src/hooks/usePlan.ts` (new)
Returns `{ plan, planLabel, can(featureKey), entitlements }`.

---

## 5. Workspace Restructure & Plan Gating

### `src/layouts/ProjectLayout.tsx` (rewritten)
Grouped sidebar with collapsible sections (each item filtered/locked by plan):

- **Dashboard**
- **Campaigns** ▾ Broadcast · Campaigns · Campaign History · Templates · Contacts · Contact Sync API *(Growth+ — locked on Starter)*
- **Inbox** ▾ All Conversations · Channels
- **Voice** ▾ Voice Dashboard *(free)* · Click-to-Call *(metered)* · Voice Broadcast *(Growth+ included)* · IVR Studio *(Growth+; Starter shows event-webhook view)* · Call Logs
- **AI Studio** *(Enterprise only — locked teaser on others)* ▾ Agents · Conversations
- **Analytics**
- **Settings** ▾ Workspace · DLT & Sender IDs · Number Lookup · Usage · Developers
- **Account** (in user menu) — Profile, Sign out

Sidebar footer:
- **Plan badge** pill (Starter / Growth / Enterprise)
- **Upgrade →** link to `/project/billing/upgrade`

### New shared components
- `src/components/PlanGate.tsx` — wraps a route/section; unentitled → renders "Upgrade to unlock" card
- `src/components/FeatureLockBadge.tsx` — inline lock icon + tooltip
- `src/components/PlanBadge.tsx` — pill used in sidebar + profile

### New pages
- `src/pages/project/VoiceDashboardPage.tsx` (free analytics — mocked)
- `src/pages/project/ClickToCallPage.tsx` (metered)
- `src/pages/project/VoiceBroadcastPage.tsx` (Growth+, gated)
- `src/pages/project/IVRStudioPage.tsx` (Growth+; Starter shows event-webhook variant)
- `src/pages/project/CallLogsPage.tsx`
- `src/pages/project/ContactSyncApiPage.tsx` (Growth+, gated)
- `src/pages/project/AIAgentStudioPage.tsx` (Enterprise; teaser on others) — basic UI, mock conversations
- `src/pages/project/AIAgentConversationsPage.tsx` (Enterprise)
- `src/pages/project/UpgradePlanPage.tsx` (in-app plan switcher mirroring marketing pricing)

### Updated pages (label + plan-gating swaps)
- `ProjectDashboard.tsx` — plan-aware widget; quick links grouped Campaigns / Inbox / Voice; "Workspace" terminology
- `SendMessagePage.tsx` → renamed nav as **Broadcast**; channel selector hides/locks WhatsApp on Starter; "Recipients" → "Contacts"
- `UploadRecipientsPage.tsx` → page title **Contacts**; all "Recipients" → "Contacts"
- `InboxPage.tsx` — channel filter shows only entitled inbound channels; disabled ones rendered with lock icon
- `ProjectConfigPage.tsx` → **Workspace** + DLT & Sender IDs sections; DIC Notifier "Trial" banner on Starter
- `ProjectQuotaPage.tsx` → page title **Usage**; "Quota" → "Usage" everywhere
- `ProjectReportsPage.tsx` → page title **Analytics**
- `DeveloperDocsPage.tsx` → page title **Developers**
- `CampaignHistoryPage.tsx` → keep title; minor copy
- `IVRSAnalyticsPage.tsx` → folded into **Voice Dashboard** as a tab
- `ProfilePage.tsx` → moved out of sidebar into Account menu

### Admin label updates
- `AdminLayout.tsx` — "Developer Docs" → **Developers**, "Quotas" → **Usage**, "Projects" → **Workspaces**
- `pages/admin/ProjectsPage.tsx` → page title **Workspaces**, "Add Project" → **Add Workspace**, "Onboard New Project" → **Onboard New Workspace**, "Project Head" → **Workspace Owner**, "Project Code" → **Workspace Code**, success toast updated
- `pages/admin/AdminQuotaPage.tsx` → page title **Usage Management**, "Project Quota Usage" → **Workspace Usage**, "Edit Project Quota" → **Edit Workspace Limits**, "Select Project" → **Select Workspace**
- `pages/admin/AdminTemplatesPage.tsx` → "Project" column → **Workspace**, "Assign to Project(s)" → **Assign to Workspace(s)**
- `pages/admin/AdminChannelsPage.tsx` → "Channel Configuration" stays (industry standard term)

---

## 6. Routing & Guards

### `src/App.tsx` (edit)
- New public routes: `/onboarding`, `/onboarding/success`
- New project routes (under `ProtectedRoute role="project"`):
  - `voice/dashboard`, `voice/click-to-call`, `voice/broadcast`, `voice/ivr`, `voice/logs`
  - `campaigns/contacts-api`
  - `ai/agents`, `ai/conversations`
  - `billing/upgrade`
- Extend `ProtectedRoute` with optional `feature?: string` prop → uses `usePlan().can(feature)`; if false renders `<PlanGate>` instead of the page
- Existing routes kept; layout grouping changes only

### `src/pages/LoginPage.tsx`
- Pre-fill email from `?email=`
- Banner if `?confirmed=1`: "Email confirmed — please log in"
- Add link: **"New here? Create your workspace"** → `/onboarding`
- Keep small "Admin login" link

---

## 7. Files Touched (summary)

### Create
- `src/config/planEntitlements.ts`
- `src/hooks/usePlan.ts`
- `src/components/PlanGate.tsx`, `FeatureLockBadge.tsx`, `PlanBadge.tsx`
- `src/pages/OnboardingPage.tsx`, `OnboardingSuccessPage.tsx`
- `src/components/onboarding/Stepper.tsx`, `PlanStep.tsx`, `BusinessStep.tsx`, `OwnerStep.tsx`, `ReviewStep.tsx`
- `src/pages/project/VoiceDashboardPage.tsx`, `ClickToCallPage.tsx`, `VoiceBroadcastPage.tsx`, `IVRStudioPage.tsx`, `CallLogsPage.tsx`, `ContactSyncApiPage.tsx`, `AIAgentStudioPage.tsx`, `AIAgentConversationsPage.tsx`, `UpgradePlanPage.tsx`

### Edit
- `src/contexts/AuthContext.tsx`
- `src/App.tsx`
- `src/layouts/ProjectLayout.tsx`, `src/layouts/AdminLayout.tsx`
- `src/marketing/PricingPage.tsx`, `MarketingLayout.tsx`, `HomePage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/project/*` (label swaps + plan gating: ProjectDashboard, SendMessagePage, UploadRecipientsPage, InboxPage, ProjectConfigPage, ProjectQuotaPage, ProjectReportsPage, DeveloperDocsPage, CampaignHistoryPage, IVRSAnalyticsPage, ProfilePage, NumberHistoryPage)
- `src/pages/admin/*` (ProjectsPage, AdminQuotaPage, AdminTemplatesPage, AdminChannelsPage, AdminDashboard, AdminUsersPage, AdminAuditPage, AdminReportsPage)

---

## 8. Out of Scope (this round)

- Real backend (Supabase Auth, DB, real welcome email) — deferred to **Phase 2** once Lovable Cloud is enabled. Frontend wired with clean swap point at `AuthContext.signup`.
- Real billing / payments — placeholder "Start trial, add payment later"
- Channel verification flows — kept as existing placeholders
- Renaming code-level `interface Project`, `projectId`, `projectName`, or `/project/` route prefix — kept to avoid churn (only **visible** labels switch to Workspace)

---

## 9. Phase 2 (separate plan, post-approval of this one)
1. Enable Lovable Cloud
2. `profiles` + `workspaces` + `user_roles` + `subscriptions` tables with RLS
3. Replace mock `signup` with `supabase.auth.signUp` + workspace insert via Edge Function
4. Branded transactional welcome email via `send-transactional-email`
5. (Optional) Stripe-powered upgrades on `UpgradePlanPage`
