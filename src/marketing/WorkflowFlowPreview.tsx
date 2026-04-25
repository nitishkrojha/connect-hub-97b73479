import { Card } from "@/components/ui/card";
import { Workflow, Zap, Clock, GitBranch, MessageCircle, MessageSquare, Tag, CheckCircle2 } from "lucide-react";

const Node = ({
  icon: Icon,
  label,
  sub,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  tone?: "primary" | "success" | "info" | "warn" | "muted";
}) => {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 border-primary/30 text-primary",
    success: "bg-success/10 border-success/30 text-success",
    info: "bg-info/10 border-info/30 text-info",
    warn: "bg-amber-500/10 border-amber-500/30 text-amber-600",
    muted: "bg-muted border-border text-foreground",
  };
  return (
    <div className={`rounded-lg border px-3 py-2 ${tones[tone]} bg-card`}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
};

const Connector = ({ label }: { label?: string }) => (
  <div className="flex items-center justify-center py-1.5">
    <div className="relative h-5 w-px bg-border">
      {label && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  </div>
);

const WorkflowFlowPreview = () => (
  <section className="py-24 bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
      {/* Visual */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 via-card to-info/5 border-primary/15 order-2 lg:order-1 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Workflow className="w-4 h-4 text-primary" />
            </div>
            <div className="text-sm font-semibold text-foreground">Welcome flow</div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> RUNNING
          </span>
        </div>

        <div className="max-w-xs mx-auto">
          <Node icon={Zap} label="Trigger" sub="New lead added" tone="primary" />
          <Connector />
          <Node icon={MessageCircle} label="Send WhatsApp" sub="Welcome template" tone="info" />
          <Connector />
          <Node icon={Clock} label="Wait 1 hour" sub="Then check reply" tone="muted" />
          <Connector />
          <Node icon={GitBranch} label="Branch" sub="Did the lead reply?" tone="warn" />

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <Connector label="YES" />
              <Node icon={Tag} label="Tag Hot" sub="Notify sales" tone="success" />
            </div>
            <div>
              <Connector label="NO" />
              <Node icon={MessageSquare} label="Send SMS" sub="Fallback nudge" tone="muted" />
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Last run · 2 min ago</span>
          <span className="text-success font-semibold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 1,284 contacts processed
          </span>
        </div>
      </Card>

      {/* Copy */}
      <div className="order-1 lg:order-2 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          <Workflow className="w-3 h-3" /> Workflow Automation
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
          No-code workflows that run on autopilot
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
          Visually design end-to-end journeys — triggers, messages, waits, branches and
          handoffs. Connect WhatsApp, SMS, Email and voice in a single canvas.
        </p>
        <ul className="mt-6 space-y-2">
          {[
            "Drag-and-drop visual canvas",
            "Conditional branches & A/B paths",
            "Trigger from CRM, webhook or schedule",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WorkflowFlowPreview;
