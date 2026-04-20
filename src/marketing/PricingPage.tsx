import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "₹0",
    period: "/mo",
    desc: "Try Samparq with up to 5,000 messages.",
    cta: "Start free",
    features: ["5,000 messages / month", "SMS + Email channels", "Unified inbox (1 agent)", "Community support"],
  },
  {
    name: "Growth",
    price: "₹4,999",
    period: "/mo",
    desc: "For growing teams with multi-channel needs.",
    cta: "Start trial",
    popular: true,
    features: ["100,000 messages / month", "All channels (SMS, WA, Email, RCS)", "IVRS voice flows", "Up to 10 agents", "Reports & dashboards", "Email support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Volume pricing, SLAs, and dedicated infra.",
    cta: "Contact sales",
    features: ["Unlimited messages", "All channels + Social media", "Dedicated IVRS lines", "Unlimited agents", "Custom integrations & SSO", "24×7 priority support"],
  },
];

const PricingPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs uppercase tracking-wide font-semibold text-primary">Pricing</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2">Simple, predictable pricing</h1>
      <p className="text-muted-foreground mt-4">Pay for what you send. No hidden fees, no per-seat surprises.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-5 mt-12">
      {tiers.map((t) => (
        <Card
          key={t.name}
          className={`p-6 relative ${t.popular ? "border-primary shadow-card-hover ring-2 ring-primary/20" : ""}`}
        >
          {t.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wide bg-gradient-to-r from-primary to-info text-primary-foreground px-3 py-1 rounded-full">
              Most popular
            </span>
          )}
          <h3 className="font-bold text-lg text-foreground">{t.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-foreground">{t.price}</span>
            <span className="text-sm text-muted-foreground">{t.period}</span>
          </div>
          <Link to={t.name === "Enterprise" ? "/contact" : "/login"} className="block mt-5">
            <Button className={`w-full ${t.popular ? "bg-gradient-to-r from-primary to-info" : ""}`} variant={t.popular ? "default" : "outline"}>
              {t.cta}
            </Button>
          </Link>
          <ul className="mt-6 space-y-2.5">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>

    <div className="mt-12 text-center text-sm text-muted-foreground">
      All prices exclude applicable taxes. Volume discounts available beyond 1M messages.
    </div>
  </div>
);

export default PricingPage;
