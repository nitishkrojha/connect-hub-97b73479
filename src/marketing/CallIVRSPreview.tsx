import { useEffect, useState } from "react";
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Radio, ChevronRight, Mic, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const SCENES = ["inbound", "click", "bulk", "agent"] as const;
type Scene = (typeof SCENES)[number];

const SceneInbound = () => (
  <div className="animate-fade-in">
    <div className="flex items-center gap-2 mb-3">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-success/30 animate-pulse-ring" aria-hidden />
        <div className="relative w-9 h-9 rounded-full bg-success/15 flex items-center justify-center">
          <PhoneIncoming className="w-4 h-4 text-success" />
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">Incoming · +91 98•••432</div>
        <div className="text-[11px] text-muted-foreground">IVR menu · 0:04</div>
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
            active
              ? "bg-primary/10 text-primary border border-primary/30"
              : "bg-muted/40 text-foreground border border-border/40"
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
  </div>
);

const SceneClickToCall = () => (
  <div className="animate-fade-in">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center">
        <PhoneCall className="w-4 h-4 text-emerald-500" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">Click-to-Call</div>
        <div className="text-[11px] text-muted-foreground">Web widget → live agent</div>
      </div>
    </div>

    <div className="rounded-lg border border-border/60 bg-muted/30 p-3 mb-3">
      <div className="text-[11px] text-muted-foreground mb-1.5">samparq.app/contact</div>
      <button
        type="button"
        aria-label="Demo call button"
        className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-md bg-emerald-500 text-white"
      >
        <Phone className="w-3.5 h-3.5" /> Call us now
      </button>
    </div>

    <div className="space-y-1.5">
      <div className="flex items-center gap-2 p-2 rounded-md bg-muted/40 text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-foreground">Ringing agent…</span>
        <span className="ml-auto text-muted-foreground">0:02</span>
      </div>
      <div className="flex items-center gap-2 p-2 rounded-md bg-success/10 border border-success/30 text-xs text-success">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="font-medium">Connected to Priya · Sales</span>
      </div>
    </div>
  </div>
);

const SceneBulkOBD = () => {
  const [pct, setPct] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p >= 92 ? 24 : p + 4)), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-purple-500/15 flex items-center justify-center">
          <Radio className="w-4 h-4 text-purple-500" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">Bulk Voice Broadcast</div>
          <div className="text-[11px] text-muted-foreground">Outbound campaign · live</div>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-muted/30 p-3 mb-3">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="text-muted-foreground">Dialed</span>
          <span className="font-semibold text-foreground tabular-nums">
            {Math.round(50000 * (pct / 100)).toLocaleString()} / 50,000
          </span>
        </div>
        <div className="h-2 rounded-full bg-background overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-primary transition-all duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="rounded-md bg-success/10 border border-success/20 p-2 text-center">
          <div className="text-sm font-bold text-success tabular-nums">92%</div>
          <div className="text-[10px] text-muted-foreground">Connected</div>
        </div>
        <div className="rounded-md bg-primary/10 border border-primary/20 p-2 text-center">
          <div className="text-sm font-bold text-primary tabular-nums">68%</div>
          <div className="text-[10px] text-muted-foreground">DTMF reply</div>
        </div>
        <div className="rounded-md bg-muted/40 border border-border/40 p-2 text-center">
          <div className="text-sm font-bold text-foreground tabular-nums">0:18</div>
          <div className="text-[10px] text-muted-foreground">Avg call</div>
        </div>
      </div>
    </div>
  );
};

const SceneAgentCall = () => (
  <div className="animate-fade-in">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
        <PhoneOutgoing className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">Agent · Outbound</div>
        <div className="text-[11px] text-muted-foreground">Calling +91 98•••320 · 0:42</div>
      </div>
      <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-success">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> LIVE
      </span>
    </div>

    <div className="flex items-end gap-0.5 h-8 mb-3 px-1">
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-primary to-info"
          style={{
            height: `${30 + Math.abs(Math.sin(i * 0.7)) * 70}%`,
            animation: `pulse 1.${(i % 9) + 1}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>

    <div className="space-y-1.5">
      <div className="flex gap-2 text-xs">
        <span className="text-[10px] font-semibold text-muted-foreground mt-0.5">YOU</span>
        <span className="flex-1 text-foreground bg-muted/40 rounded-md px-2 py-1">
          Hi Rahul, calling about your order…
        </span>
      </div>
      <div className="flex gap-2 text-xs">
        <span className="text-[10px] font-semibold text-primary mt-0.5">CUST</span>
        <span className="flex-1 text-foreground bg-primary/5 rounded-md px-2 py-1">
          Yes, I was expecting your call.
        </span>
      </div>
    </div>

    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-[11px]">
      <span className="text-muted-foreground inline-flex items-center gap-1">
        <Mic className="w-3 h-3" /> Recording
      </span>
      <span className="text-success font-medium">Auto-logged ✓</span>
    </div>
  </div>
);

const LABELS: Record<Scene, string> = {
  inbound: "Inbound IVR",
  click: "Click-to-Call",
  bulk: "Bulk Broadcast",
  agent: "Agent Call",
};

const CallIVRSPreview = () => {
  const [idx, setIdx] = useState(0);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SCENES.length), 4000);
    return () => clearInterval(id);
  }, [reduced]);

  const scene = SCENES[idx];

  return (
    <Card className="p-5 glass-card">
      <div key={scene} className="min-h-[260px]">
        {scene === "inbound" && <SceneInbound />}
        {scene === "click" && <SceneClickToCall />}
        {scene === "bulk" && <SceneBulkOBD />}
        {scene === "agent" && <SceneAgentCall />}
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          {LABELS[scene]}
        </span>
        <div className="flex gap-1.5" role="tablist" aria-label="Voice scenes">
          {SCENES.map((s, i) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={LABELS[s]}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CallIVRSPreview;
