import { useAuth } from "@/contexts/AuthContext";
import {
  PLAN_ENTITLEMENTS,
  PLAN_LABELS,
  FEATURE_REQUIRES,
  FeatureKey,
  Plan,
  planMeets,
} from "@/config/planEntitlements";

export const usePlan = () => {
  const { user } = useAuth();
  const plan: Plan = user?.plan ?? "growth";
  const entitlements = PLAN_ENTITLEMENTS[plan];

  const can = (feature: FeatureKey): boolean => {
    const required = FEATURE_REQUIRES[feature];
    return planMeets(plan, required);
  };

  const requiredPlanFor = (feature: FeatureKey): Plan => FEATURE_REQUIRES[feature];

  return {
    plan,
    planLabel: PLAN_LABELS[plan],
    entitlements,
    can,
    requiredPlanFor,
  };
};
