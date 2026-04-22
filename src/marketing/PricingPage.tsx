import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Rocket, Building2, Gift, MessageSquare, Mail, Phone, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- Platform (SaaS) plans ---------------- */
const plans = [
  {
    name: "Free Trial",
    icon: Gift,
    price: "₹0",
    period: "for 14 days",
    tagline: "Explore the full platform — no card required.",
    cta: "Start free trial",
    href: "/login",
    badge: "14-day trial",
    features: [
      "All channels enabled (SMS, WhatsApp, Email, RCS)",
      "Unified Inbox with 2 agent seats",
      "1,000 free messages (any channel)",
      "Conversation API + webhooks",
      "Basic reports & DLR dashboard",
      "Community support",
    ],
    notIncluded: ["IVRS / Voice flows", "SLA & priority routing", "SSO / role management"],
  },
  {
    name: "Starter",
    icon: Sparkles,
    price: "₹1,999",
    period: "/ month",
    tagline: "For small teams launching their first campaigns.",
    cta: "Choose Starter",
    href: "/login",
    features: [
      "5 agent seats",
      "10,000 platform messages included*",
      "SMS · WhatsApp · Email channels",
      "Unified Inbox + auto-ticketing",
      "Templates & approval workflows",
      "Email support (24h response)",
    ],
    notIncluded: ["IVRS / Voice flows", "AI Bots & Co-pilot", "SSO / SAML"],
  },
  {
    name: "Growth",
    icon: Rocket,
    price: "₹6,999",
    period: "/ month",
    tagline: "Most loved by growing CX & marketing teams.",
    cta: "Choose Growth",
    href: "/login",
    popular: true,
    features: [
      "20 agent seats",
      "75,000 platform messages included*",
      "All channels: SMS, WhatsApp, Email, RCS, Social",
      "IVRS voice flows (1 number)",
      "AI Bots, Co-pilot & smart routing",
      "Advanced reports + agent performance",
      "API rate: 1,000 req/min",
      "Priority email + chat support",
    ],
    notIncluded: ["Dedicated success manager", "On-prem / VPC deploy"],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "annual contract",
    tagline: "For high-volume brands with compliance & SLAs.",
    cta: "Talk to sales",
    href: "/contact",
    features: [
      "Unlimited agent seats",
      "Custom message volumes & per-unit pricing",
      "All channels + dedicated IVRS lines",
      "SSO (SAML / OIDC), SCIM, audit logs",
      "Custom data retention & DPA",
      "VPC / on-prem deployment option",
      "99.95% uptime SLA",
      "Dedicated CSM + 24×7 priority support",
    ],
    notIncluded: [],
  },
];

/* ---------------- Per-message rates (after included quota) ---------------- */
const rates = [
  { icon: MessageSquare, channel: "SMS (Transactional, India)", rate: "₹0.18 / msg" },
  { icon: MessageSquare, channel: "SMS (Promotional, India)", rate: "₹0.20 / msg" },
  { icon: Phone, channel: "WhatsApp Utility conversation", rate: "₹0.115 / conv" },
  { icon: Phone, channel: "WhatsApp Marketing conversation", rate: "₹0.78 / conv" },
  { icon: Mail, channel: "Email (delivered)", rate: "₹0.04 / email" },
  { icon: Sparkles, channel: "RCS Basic message", rate: "₹0.25 / msg" },
  { icon: Phone, channel: "IVRS — Inbound minute", rate: "₹0.45 / min" },
  { icon: Phone, channel: "IVRS — Outbound minute", rate: "₹0.65 / min" },
];

const PricingPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    {/* Header */}
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs uppercase tracking-wide font-semibold text-primary">SaaS Pricing</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2">
        Platform charges, simplified.
      </h1>
      <p className="text-muted-foreground mt-4">
        A flat monthly platform fee for the SaaS — agents, inbox, automations, AI, reports.
        Channel usage is billed at transparent per-message rates on top of your included quota.
      </p>
      <div className="mt-5 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-success/10 text-success font-medium">
        <Gift className="w-3.5 h-3.5" /> 14-day free trial · No credit card required
      </div>
    </div>

    {/* Plan cards */}
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
      {plans.map((p) => (
        <Card
          key={p.name}
          className={`p-6 relative flex flex-col ${
            p.popular ? "border-primary shadow-card-hover ring-2 ring-primary/20" : ""
          }`}
        >
          {p.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wide bg-gradient-to-r from-primary to-info text-primary-foreground px-3 py-1 rounded-full">
              Most popular
            </span>
          )}
          {p.badge && !p.popular && (
            <Badge variant="secondary" className="absolute top-4 right-4 text-[10px]">
              {p.badge}
            </Badge>
          )}

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <p.icon className="w-4.5 h-4.5 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-foreground">{p.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-2 min-h-[32px]">{p.tagline}</p>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-foreground">{p.price}</span>
            <span className="text-xs text-muted-foreground">{p.period}</span>
          </div>

          <Link to={p.href} className="block mt-4">
            <Button
              className={`w-full ${p.popular ? "bg-gradient-to-r from-primary to-info" : ""}`}
              variant={p.popular ? "default" : "outline"}
            >
              {p.cta}
            </Button>
          </Link>

          <ul className="mt-5 space-y-2 text-sm flex-1">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-foreground">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
            {p.notIncluded.map((f) => (
              <li key={f} className="flex items-start gap-2 text-muted-foreground line-through opacity-70">
                <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center">—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>

    <p className="text-center text-xs text-muted-foreground mt-4">
      *Included messages are pooled across channels at standard rates. Overage billed per the table below.
    </p>

    {/* Channel rate card */}
    <div className="mt-16">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Transparent per-message rates</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Pay-as-you-go on top of your plan. No hidden carrier markups, billed monthly in arrears.
        </p>
      </div>

      <Card className="mt-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left font-semibold text-foreground px-5 py-3">Channel</th>
              <th className="text-right font-semibold text-foreground px-5 py-3">Rate (India)</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r, i) => (
              <tr key={r.channel} className={i % 2 ? "bg-muted/20" : ""}>
                <td className="px-5 py-3 flex items-center gap-2.5 text-foreground">
                  <r.icon className="w-4 h-4 text-primary" />
                  {r.channel}
                </td>
                <td className="px-5 py-3 text-right font-mono text-foreground">{r.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-center text-xs text-muted-foreground mt-3">
        International rates available on request. WhatsApp conversation rates set by Meta and passed through at cost + small platform fee.
      </p>
    </div>

    {/* Trial CTA banner */}
    <Card className="mt-16 p-8 bg-gradient-to-br from-primary/10 via-info/5 to-transparent border-primary/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wide">
            <Inbox className="w-4 h-4" /> Try the full platform
          </div>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            Start your 14-day free trial today.
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5">
            All channels, full inbox, AI assist, 1,000 free messages. Cancel anytime.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/login"><Button size="lg" className="bg-gradient-to-r from-primary to-info">Start free trial</Button></Link>
          <Link to="/contact"><Button size="lg" variant="outline">Talk to sales</Button></Link>
        </div>
      </div>
    </Card>

    <div className="mt-10 text-center text-xs text-muted-foreground">
      All prices in INR, exclusive of GST. Volume discounts apply beyond 1M messages / month.
    </div>
  </div>
);

export default PricingPage;
