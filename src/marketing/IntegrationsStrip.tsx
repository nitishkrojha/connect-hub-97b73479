import { Card } from "@/components/ui/card";
import {
  ShoppingBag, Briefcase, Building2, Users, CreditCard, Package,
  Sheet, Zap, Workflow, DollarSign, Headphones, Store,
} from "lucide-react";

const INTEGRATIONS = [
  { name: "Shopify", icon: ShoppingBag, color: "text-emerald-600" },
  { name: "WooCommerce", icon: Store, color: "text-purple-600" },
  { name: "Zoho", icon: Briefcase, color: "text-red-500" },
  { name: "Salesforce", icon: Building2, color: "text-sky-500" },
  { name: "HubSpot", icon: Users, color: "text-orange-500" },
  { name: "Razorpay", icon: CreditCard, color: "text-blue-600" },
  { name: "Shiprocket", icon: Package, color: "text-violet-600" },
  { name: "Google Sheets", icon: Sheet, color: "text-green-600" },
  { name: "Zapier", icon: Zap, color: "text-amber-500" },
  { name: "Make", icon: Workflow, color: "text-indigo-500" },
  { name: "Stripe", icon: DollarSign, color: "text-purple-500" },
  { name: "Freshdesk", icon: Headphones, color: "text-emerald-500" },
];

const IntegrationsStrip = () => (
  <section className="py-24 bg-muted/30 border-y border-border">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-12 animate-fade-in">
        <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">
          Integrations
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Connects with the tools you already use
        </h2>
        <p className="text-muted-foreground mt-4">
          Plug Samparq into your CRM, store, payment gateway and helpdesk in minutes.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {INTEGRATIONS.map((it) => (
          <Card
            key={it.name}
            className="group p-4 text-center hover:shadow-card-hover hover:-translate-y-0.5 hover:border-primary/30 transition-all bg-card cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2 transition-colors group-hover:bg-card">
              <it.icon
                className={`w-5 h-5 text-muted-foreground transition-colors group-hover:${it.color}`}
              />
            </div>
            <p className="text-xs font-semibold text-foreground">{it.name}</p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <span className="text-sm text-muted-foreground">
          And <span className="font-bold text-foreground">50+</span> more via REST API & webhooks ·{" "}
          <span className="text-primary font-semibold cursor-pointer hover:underline">
            View all integrations →
          </span>
        </span>
      </div>
    </div>
  </section>
);

export default IntegrationsStrip;
