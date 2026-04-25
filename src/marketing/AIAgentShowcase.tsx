import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Bot, Sparkles, Upload, Settings2, Rocket, MessageCircle, Phone, Globe } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Train",
    desc: "Upload your knowledge base, FAQs or product catalog.",
    chips: ["help-center.pdf", "products.csv", "faq.md"],
  },
  {
    icon: Settings2,
    title: "Configure",
    desc: "Pick tone, language and handoff rules — no code.",
    chips: ["Friendly", "English + हिन्दी", "Handoff @ low confidence"],
  },
  {
    icon: Rocket,
    title: "Deploy",
    desc: "Go live across channels in one click.",
    chips: ["WhatsApp", "Web Chat", "Voice IVR"],
  },
] as const;

const channelIcons = [
  { icon: MessageCircle, color: "text-channel-whatsapp" },
  { icon: Globe, color: "text-primary" },
  { icon: Phone, color: "text-channel-ivrs" },
];

const AIAgentShowcase = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 3000);
    return () => clearInterval(id);
  }, []);
  const Active = STEPS[step];

  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" /> AI Agents
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
            Build a smart agent in three steps
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
            Train on your content, configure tone and language, and deploy across WhatsApp,
            web chat and voice — without writing a single line of code.
          </p>
          <ul className="mt-6 space-y-2">
            {[
              "24/7 multilingual replies",
              "Smart handoff to human agents",
              "Works on chat & voice channels",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <Card className="p-6 bg-card shadow-card-hover">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Samparq AI Studio</div>
              <div className="text-[11px] text-muted-foreground">Step {step + 1} of 3</div>
            </div>
          </div>

          {/* Step nav */}
          <div className="flex items-center gap-2 mb-5">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex-1">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
                <div
                  className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider ${
                    i === step ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </div>
              </div>
            ))}
          </div>

          {/* Active panel */}
          <div key={step} className="rounded-lg border border-border bg-muted/30 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <Active.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">{Active.title}</div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{Active.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {Active.chips.map((c) => (
                <span
                  key={c}
                  className="text-[11px] font-medium px-2 py-1 rounded-md bg-card border border-border text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Live channels lighting up at deploy */}
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
              Live on
            </span>
            <div className="flex gap-2">
              {channelIcons.map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    step === 2
                      ? "bg-success/10 ring-2 ring-success/30"
                      : "bg-muted opacity-50"
                  }`}
                >
                  <c.icon className={`w-3.5 h-3.5 ${step === 2 ? c.color : "text-muted-foreground"}`} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AIAgentShowcase;
