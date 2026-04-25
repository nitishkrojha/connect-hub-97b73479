import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePlan } from "@/hooks/usePlan";
import { FeatureKey, PLAN_LABELS } from "@/config/planEntitlements";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, Sparkles } from "lucide-react";

interface PlanGateProps {
  feature: FeatureKey;
  title?: string;
  description?: string;
  children: ReactNode;
}

export const PlanGate = ({ feature, title, description, children }: PlanGateProps) => {
  const { can, requiredPlanFor } = usePlan();
  if (can(feature)) return <>{children}</>;
  const required = requiredPlanFor(feature);
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Card className="max-w-lg w-full p-8 text-center shadow-card border-primary/20">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/15 to-info/15 flex items-center justify-center mb-4">
          <Lock className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          {title ?? `Available on ${PLAN_LABELS[required]}`}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {description ?? `Upgrade your workspace to the ${PLAN_LABELS[required]} plan to unlock this feature.`}
        </p>
        <div className="flex gap-2 justify-center mt-6">
          <Button asChild>
            <Link to="/project/billing/upgrade">
              <Sparkles className="w-4 h-4" /> Upgrade to {PLAN_LABELS[required]} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/pricing">Compare plans</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};
