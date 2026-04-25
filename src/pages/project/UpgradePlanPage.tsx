import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Plan, PLAN_LABELS, PLAN_TAGLINES, PLAN_ENTITLEMENTS } from "@/config/planEntitlements";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Rocket, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ICONS = { starter: Zap, growth: Rocket, enterprise: Sparkles } as const;

const FEATURES: Record<Plan, string[]> = {
  starter: [
    "SMS, Email & RCS sending",
    "Email, Web Chat & Webhook inbox",
    "Voice Dashboard (free)",
    "Click-to-Call & Voice Broadcast (metered)",
    "DIC Notifier — trial only",
  ],
  growth: [
    "All channels: SMS, WhatsApp, Email, RCS",
    "Full unified inbox (WhatsApp, Email, Instagram, Facebook, Telegram, Web Chat)",
    "IVR Studio + Click-to-Call + Voice Broadcast (included)",
    "Inbound call handling",
    "Contact Sync API",
    "DIC Notifier — full self-configuration",
  ],
  enterprise: [
    "Everything in Growth",
    "AI Agents for Voice, WhatsApp, Web Chat, Email",
    "Advanced analytics & SLAs",
    "SSO, audit logs, dedicated support",
    "Custom data residency",
  ],
};

const UpgradePlanPage = () => {
  const { user } = useAuth();
  const [selecting, setSelecting] = useState<Plan | null>(null);
  const currentPlan = user?.plan ?? "starter";

  const choose = (p: Plan) => {
    setSelecting(p);
    setTimeout(() => {
      setSelecting(null);
      toast.success(`Plan change to ${PLAN_LABELS[p]} requested. Our team will reach out shortly.`);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upgrade your workspace</h1>
        <p className="text-muted-foreground mt-1">
          You're currently on <strong className="text-foreground">{PLAN_LABELS[currentPlan]}</strong>. Choose a plan that fits your team.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {(Object.keys(PLAN_LABELS) as Plan[]).map((p) => {
          const Icon = ICONS[p];
          const isCurrent = p === currentPlan;
          const isHighlight = p === "growth";
          return (
            <Card
              key={p}
              className={cn(
                "p-6 shadow-card relative transition-all",
                isHighlight && !isCurrent && "border-primary border-2 shadow-card-hover",
                isCurrent && "bg-muted/40"
              )}
            >
              {isHighlight && !isCurrent && (
                <span className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">MOST POPULAR</span>
              )}
              {isCurrent && (
                <span className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-full bg-success text-success-foreground text-[10px] font-semibold">CURRENT PLAN</span>
              )}
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{PLAN_LABELS[p]}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{PLAN_TAGLINES[p]}</p>

              <ul className="space-y-2 mb-6 text-sm">
                {FEATURES[p].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={isHighlight && !isCurrent ? "default" : "outline"}
                disabled={isCurrent || selecting === p}
                onClick={() => choose(p)}
              >
                {isCurrent ? "Current plan" : selecting === p ? "Requesting…" : <>Switch to {PLAN_LABELS[p]} <ArrowRight className="w-4 h-4" /></>}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePlanPage;
