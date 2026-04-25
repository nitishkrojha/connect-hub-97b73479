import { Lock } from "lucide-react";
import { Plan, PLAN_LABELS } from "@/config/planEntitlements";
import { cn } from "@/lib/utils";

export const FeatureLockBadge = ({ requiredPlan, className }: { requiredPlan: Plan; className?: string }) => (
  <span
    title={`Available on ${PLAN_LABELS[requiredPlan]} plan`}
    className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground", className)}
  >
    <Lock className="w-2.5 h-2.5" />
    {PLAN_LABELS[requiredPlan]}
  </span>
);
