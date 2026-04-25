# Final Plan — Approve to Build

## 1. Homepage — Product Depth Pack (4 new sections, subtle fade-ins)
- **AI Agent Showcase** — left copy + right 3-step auto-cycling card (Train → Configure → Deploy)
- **Template Gallery Strip** — horizontal row of 6 WhatsApp template cards with fade edges, "200+ templates" counter
- **Workflow Automation Preview** — left copy + right SVG node graph (Trigger → Send → Wait → Branch)
- **Integrations Strip** — 12 logos (Shopify, Zoho, Salesforce, HubSpot, Razorpay, Shiprocket, Sheets, Zapier, Make, Stripe, Freshdesk, WooCommerce), grayscale → color on hover

## 2. Voice/IVR Revamp (`CallIVRSPreview.tsx`)
4-scene auto-cycling preview (4s each) with dot indicators:
1. Inbound IVR menu tree
2. Click-to-Call (web button → connecting → connected)
3. Bulk Voice OBD progress bar
4. Outbound Agent call with live transcript

## 3. Cleanup
- Remove "Meet customers where they are" from HomePage
- Remove "Trusted across every sector" from HomePage
- Remove API Docs link from header nav + footer
- Remove `/docs` route from App.tsx
- Delete `src/marketing/DocsPage.tsx`

## 4. Final Homepage Order
1. Hero (channel orbit)
2. Trust ribbon
3. Everything you need (3 feature snippets)
4. **AI Agent Showcase** ← new
5. **Template Gallery Strip** ← new
6. **Workflow Automation Preview** ← new
7. How it works
8. **Integrations Strip** ← new
9. Stats band (light blue gradient)
10. Trial CTA card

## 5. GIGW / A11y
- aria-labels on icon-only buttons
- `prefers-reduced-motion` respected on all new animations
- WCAG AA contrast, visible focus rings, 14px+ body text

**Approve to build.**