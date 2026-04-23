

## Goal
Revamp the Samparq marketing **HomePage** with a modern, aesthetic, alive hero and accurate positioning: Samparq is the **bridge / adapter** connecting businesses to customers across messaging channels, social media conversations, and IVRS — all unified in a single inbox. **No "Meta Business Partner" claim. Avoid the literal words "inbound" and "outbound."**

---

## Positioning Rules (locked)
- ✅ Bridge / adapter for customer communication
- ✅ Messaging channels + social media conversations + IVRS
- ✅ Single inbox for all channels
- ❌ NOT Meta Business Partner (remove from trust ribbon and everywhere)
- ❌ Do NOT use the words "inbound" or "outbound" in user-facing copy
- ❌ No conversion/outcome guarantees

Replacement vocabulary to use instead of inbound/outbound:
- "Send messages" / "deliver messages" / "reach customers"
- "Receive replies" / "customer conversations" / "two-way messaging"
- "Engage" / "respond" / "connect"

---

## Detailed Outline

### 1. Trust Ribbon (revised — no Meta partner)
Slim top strip with:
- "Connecting businesses across 10+ channels"
- "Single inbox · Messaging · Social · IVRS"
- "ISO 27001 ready · DLT compliant · 99.9% uptime"
Auto-marquee on mobile, static centered on desktop.

### 2. Hero Section — **Modern, Alive, Aesthetic**

**Visual direction:**
- Animated mesh-gradient background (slow drift) + subtle grid overlay + floating glow orbs
- Glassmorphism cards layered over the gradient
- Micro-particles / floating channel icons drifting across the hero
- Soft entrance animations (fade-in + scale-in, staggered)

**Left column — text:**
- Eyebrow chip (animated dot): "The Bridge for Modern Customer Communication"
- **Animated H1** — large, bold, gradient sweep:
  - Static line 1: **"Connect every channel."**
  - Animated typewriter line 2 cycling:
    1. "Deliver messages across SMS, WhatsApp, Email, RCS."
    2. "Engage on Instagram, Facebook, Telegram & web chat."
    3. "Answer every call with intelligent IVRS."
    4. "Manage all conversations in one inbox."
- Tagline: **"Samparq is the bridge that links your business to customers — across messaging, social, and voice — through a single, unified inbox."**
- Sub-paragraph: "One adapter for every channel. One inbox for every conversation. One platform for every customer interaction."
- Dual CTA: **Start free trial** + **Book a demo**
- Micro-row: "No credit card · 10-min setup · Cancel anytime"

**Right column — alive composite:**
- Central glass-card "Unified Inbox" with live message stream (new items sliding in every ~2s with channel-colored badges: WhatsApp, Insta, Email, Voice)
- Floating satellite chips around it (animated orbit/float): WhatsApp, SMS, Email, RCS, Instagram, Facebook, Telegram, Web Chat, IVRS, Chatbot — each pulsing & connected to the inbox by faint animated lines
- A small "Incoming call → IVRS routing" card animating in/out
- All wrapped in a soft glow + parallax tilt on mouse move

### 3. "What Samparq Bridges" — 3 connector cards
Each card = a connection metaphor (channel → inbox → team):
1. **Messaging Bridge** — SMS · WhatsApp · Email · RCS
2. **Social Bridge** — Instagram · Facebook · Telegram · Web Chat
3. **Voice Bridge** — IVRS · Call routing · Voice broadcast · Click-to-call

Each card: gradient border, animated connector line on hover, channel mini-icons.

### 4. Three Pillars Section (rewritten — no inbound/outbound words)

**Pillar A — Reach Your Customers (Send & Broadcast)**
- Send messages across SMS, WhatsApp, Email, RCS
- Campaigns, templates, scheduling, bulk upload, API push
- Delivery receipts, link tracking, A/B variants
- Visual: animated campaign progress card

**Pillar B — Talk With Your Customers (Unified Inbox)**
- Receive and respond across WhatsApp, Email, Instagram, Facebook, Telegram, web chat
- Agent routing, tickets, SLA, tags, notes, canned replies
- AI assist, multilingual, chatbot deflection
- Visual: live inbox stream with new-message ping

**Pillar C — Voice & IVRS (Call Connect)**
- IVRS menus, call routing, agent transfer, voicemail, working-hours rules
- Voice broadcast, OBD, click-to-call, IVR surveys, missed-call solutions
- Call recording, virtual numbers, sticky agent
- Real-time call analytics: volume, peak hours, geo, agent performance
- Visual: phone ringing → IVR tree expanding → analytics chart

### 5. All Channels Grid (animated tiles)
Tabbed: **Messaging | Social | Voice | Email**
12+ channel tiles with hover lift, gradient borders, subtle float loop.

### 6. Single Inbox Showcase (new big section)
Full-width mockup of the unified inbox: left rail of channels, middle conversation list (mixed channels), right reply panel. Animated "new conversation" pings across channels. Caption: "Every channel. One screen. Zero context-switching."

### 7. "Built For Modern Teams" — 9-card grid (refined)
Shared Inbox · Tickets & SLA · AI Chatbot · Agent Routing · Campaign Manager · Automation · Multilingual (30+) · Reports & Analytics · Enterprise Security (RBAC, audit logs)

### 8. How It Works — 4 steps with animated connector line
1. Connect channels & numbers
2. Invite your team & set routing
3. Launch campaigns or open the inbox
4. Track everything in real-time

### 9. Use Cases by Industry (horizontal scroll)
E-commerce · BFSI · Healthcare · Education · Logistics · Travel · Real Estate · D2C
Each card: 1-line scenario + top channels used.

### 10. Live Stats Band (count-up on scroll)
- 10B+ messages routed
- 99.9% delivery rate
- 180+ countries reached
- 50M+ calls handled
- 30+ languages supported
- 2,400+ businesses connected

### 11. Developer-First Strip
curl snippet sending a message + side note: REST APIs, Webhooks, SDKs, Sandbox, 99.9% uptime → link to Developer Docs.

### 12. Security & Compliance Band
ISO 27001 ready · SOC2 ready · GDPR · DLT (India) · RBAC · Audit logs · E2E encryption · Data residency

### 13. Testimonials + Logo Marquee
Auto-scrolling client logo strip + 3 rotating testimonial cards.

### 14. Pricing Teaser
3 mini cards (Starter / Growth / Enterprise) → link to full Pricing page.

### 15. FAQ (6–8, accordion)
Trial, channels supported, IVRS setup, pricing model, onboarding time, data security, India DLT, support SLA.

### 16. Final CTA
Big gradient panel with animated glow: "One bridge. Every conversation." + Trial + Talk to Sales.

### 17. Footer (light enrichment)
4 columns + compliance badges (no Meta partner badge).

---

## Visual / Design System Upgrade
- Softer, modern aesthetic: more whitespace, larger type scale, generous radii
- Gradient text on hero H1 (primary → info → success)
- Glassmorphism on hero cards: `bg-background/60 backdrop-blur border border-border/50`
- Mesh-gradient background using existing `--primary`, `--info`, `--success` HSL tokens (no hardcoded colors)
- New keyframes added to `tailwind.config.ts`: `float`, `float-slow`, `orbit`, `blink`, `gradient-shift`, `marquee`, `grow`, `count-up`
- All animations respect `prefers-reduced-motion`
- 100% semantic tokens — no raw color classes

---

## Animation System
- **Hero typewriter**: custom React component, 4 phrases, blinking caret, reduced-motion fallback shows phrase 1 statically
- **Floating channel chips**: CSS `@keyframes float` with random per-chip delays
- **Mesh gradient drift**: slow `gradient-shift` animation on background
- **Connector lines**: SVG paths with `stroke-dasharray` animation
- **On-scroll reveals**: existing `animate-fade-in` + staggered delays
- **Stats count-up**: IntersectionObserver-driven counter
- **Inbox stream**: items prepend every ~2s with `animate-fade-in`
- **Marquee**: pure CSS keyframe loop for trust ribbon + logos

---

## Files to create
- `src/marketing/TypewriterHeading.tsx` — rotating animated headline
- `src/marketing/HeroStage.tsx` — alive hero composite (inbox + floating channel chips + connector lines)
- `src/marketing/CallIVRSPreview.tsx` — IVRS animated visual for Pillar C
- `src/marketing/UnifiedInboxShowcase.tsx` — section 6 mockup
- `src/marketing/LogoMarquee.tsx` — scrolling logos
- `src/marketing/CountUp.tsx` — viewport-triggered counter
- `src/marketing/FAQAccordion.tsx` — homepage FAQ block
- `src/marketing/MeshGradient.tsx` — animated mesh background

## Files to edit
- `src/marketing/HomePage.tsx` — full rebuild around the outline
- `tailwind.config.ts` — add `float`, `float-slow`, `orbit`, `blink`, `gradient-shift`, `marquee`, `grow` keyframes/animations
- `src/index.css` — utility classes for gradient-text, glass-card, mesh-bg

## Files removed/avoided
- Any "Meta Business Partner" mention is stripped from the trust ribbon and entire homepage
- Words "inbound" / "outbound" replaced with reach/send/engage/respond vocabulary throughout

## Out of scope (this round)
- No backend wiring, no new routes, no auth changes
- Pricing/Solutions/Docs/Contact pages untouched
- MarketingLayout header unchanged; footer only minor label tweaks (no Meta badge)

