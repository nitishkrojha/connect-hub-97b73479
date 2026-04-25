import { Plan, PLAN_LABELS } from "@/config/planEntitlements";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Rocket } from "lucide-react";

const ICONS: Record<Plan, typeof Sparkles> = {
  starter: Zap,
  growth: Rocket,
  enterprise: Sparkles,
};

const STYLES: Record<Plan, string> = {
  starter: "bg-muted text-muted-foreground",
  growth: "bg-primary/10 text-primary",
  enterprise: "bg-gradient-to-r from-primary/15 to-info/15 text-primary",
};

export const PlanBadge = ({ plan, className }: { plan: Plan; className?: string }) => {
  const Icon = ICONS[plan];
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold", STYLES[plan], className)}>
      <Icon className="w-3 h-3" />
      {PLAN_LABELS[plan]}
    </span>
  );
};
