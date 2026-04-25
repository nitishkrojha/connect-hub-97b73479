import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  desc: string;
  to: string;
  tone?: string;
}

const QuickActionTile = ({ icon: Icon, title, desc, to, tone = "text-primary bg-primary/10" }: Props) => (
  <Link to={to} className="group">
    <Card className="p-4 hover:shadow-card-hover transition-all hover:border-primary/40 h-full">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tone}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </div>
    </Card>
  </Link>
);

export default QuickActionTile;
