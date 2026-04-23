import { Phone, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const CallIVRSPreview = () => (
  <Card className="p-5 glass-card">
    <div className="flex items-center gap-2 mb-3">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-success/30 animate-pulse-ring" />
        <div className="relative w-9 h-9 rounded-full bg-success/15 flex items-center justify-center">
          <Phone className="w-4 h-4 text-success" />
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">+91 98•••432</div>
        <div className="text-[11px] text-muted-foreground">Incoming · 0:04</div>
      </div>
    </div>

    <div className="space-y-1.5">
      {[
        ["1", "Sales", true],
        ["2", "Support", false],
        ["3", "Billing", false],
        ["0", "Talk to agent", false],
      ].map(([k, label, active]) => (
        <div
          key={k as string}
          className={`flex items-center gap-2 p-2 rounded-md text-xs ${
            active ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted/40 text-foreground border border-border/40"
          }`}
        >
          <span className="w-5 h-5 rounded bg-background flex items-center justify-center text-[10px] font-bold">
            {k}
          </span>
          <span className="flex-1">{label}</span>
          {active && <ChevronRight className="w-3.5 h-3.5" />}
        </div>
      ))}
    </div>

    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
      <span className="text-muted-foreground">Routing to agent</span>
      <span className="text-success font-medium">connected ✓</span>
    </div>
  </Card>
);

export default CallIVRSPreview;
