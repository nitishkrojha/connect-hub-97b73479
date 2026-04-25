import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDir?: "up" | "down" | "neutral";
  sub?: string;
}

const KpiCard = ({ label, value, icon: Icon, trend, trendDir = "up", sub }: KpiCardProps) => {
  const TrendIcon = trendDir === "down" ? TrendingDown : TrendingUp;
  const trendColor =
    trendDir === "down" ? "text-destructive" : trendDir === "neutral" ? "text-muted-foreground" : "text-success";
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow animate-fade-in">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendIcon className={`w-3 h-3 ${trendColor}`} />
            <span className={`${trendColor} font-medium`}>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiCard;
