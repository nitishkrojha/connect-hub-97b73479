import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, CheckCircle2, Shield, Code2, Globe2, Zap, Inbox, PhoneCall, Send,
} from "lucide-react";
import InlineWordSwap from "./InlineWordSwap";
import LogoMarquee from "./LogoMarquee";
import CountUp from "./CountUp";
import HeroChannelOrbit from "./HeroChannelOrbit";
import MessageOutPreview from "./MessageOutPreview";
import InboxStreamPreview from "./InboxStreamPreview";
import CallIVRSPreview from "./CallIVRSPreview";
import AIAgentShowcase from "./AIAgentShowcase";
import TemplateGalleryStrip from "./TemplateGalleryStrip";
import WorkflowFlowPreview from "./WorkflowFlowPreview";


const swapWords = ["WhatsApp", "SMS", "Email", "RCS", "voice", "social"];

const steps = [
  { n: "01", t: "Connect channels", d: "Link WhatsApp, SMS, Email, social and voice via guided setup." },
  { n: "02", t: "Build campaigns & agents", d: "Templates, segments, automations and AI agents — no code required." },
  { n: "03", t: "Measure & iterate", d: "Live dashboards for delivery, replies, calls and CSAT." },
];

const stats = [
  { val: 10, suffix: "B+", label: "Messages routed" },
  { val: 99.9, suffix: "%", label: "Delivery rate", decimals: 1 },
  { val: 180, suffix: "+", label: "Countries reached" },
  { val: 50, suffix: "M+", label: "Calls handled" },
];

const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      {/* HERO — split: text left, animated channel orbit right */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-info/10" />
        <div className="absolute top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] rounded-full bg-info/15 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* LEFT — copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary animate-fade-in">
                <Zap className="w-3.5 h-3.5" /> Unified customer communication platform
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight animate-fade-in">
                One platform for every{" "}
                <InlineWordSwap words={swapWords} className="min-w-[1ch]" />
                <span className="block mt-2">customer conversation.</span>
              </h1>

              <p
                className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in"
                style={{ animationDelay: "120ms" }}
              >
                Samparq is the bridge between your business and your customers — broadcast, reply, and answer calls
                from a single workspace across every channel they use.
              </p>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <Link to="/onboarding">
                  <Button size="lg" className="rounded-full px-7 font-semibold shadow-card-hover">
                    Start 14-day free trial <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-7 font-semibold">
                    Book a demo
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-1 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "260ms" }}>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> No credit card</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> 10-min setup</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Cancel anytime</span>
              </div>
            </div>

            {/* RIGHT — colored channel orbit */}
            <div className="relative pb-16 lg:pb-0 animate-fade-in" style={{ animationDelay: "180ms" }}>
              <HeroChannelOrbit />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST RIBBON */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
            Powered by official WhatsApp Business API · DLT-ready · ISO 27001-aligned
          </div>
          <LogoMarquee />
        </div>
      </section>

      {/* FEATURES — clean snippet showcase, minimal text */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">What you get</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Everything you need to scale conversations
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Broadcast */}
            <Card className="p-5 hover:shadow-card-hover transition-all flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  <Send className="w-3 h-3" /> Broadcast
                </span>
                <span className="text-[10px] text-muted-foreground">Multi-channel</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4">Launch campaigns in minutes</h3>
              <div className="flex-1 flex items-end">
                <div className="w-full"><MessageOutPreview /></div>
              </div>
            </Card>

            {/* Inbox */}
            <Card className="p-5 hover:shadow-card-hover transition-all flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-success bg-success/10 px-2.5 py-1 rounded-full">
                  <Inbox className="w-3 h-3" /> Unified Inbox
                </span>
                <span className="text-[10px] text-muted-foreground">All channels</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4">One inbox for every reply</h3>
              <div className="flex-1 flex items-end">
                <div className="w-full"><InboxStreamPreview /></div>
              </div>
            </Card>

            {/* Voice */}
            <Card className="p-5 hover:shadow-card-hover transition-all flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-channel-ivrs bg-channel-ivrs/10 px-2.5 py-1 rounded-full">
                  <PhoneCall className="w-3 h-3" /> Voice & IVR
                </span>
                <span className="text-[10px] text-muted-foreground">Smart routing</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4">Visual call flows, no code</h3>
              <div className="flex-1 flex items-end">
                <div className="w-full"><CallIVRSPreview /></div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI AGENT SHOWCASE */}
      <AIAgentShowcase />

      {/* TEMPLATE GALLERY */}
      <TemplateGalleryStrip />

      {/* WORKFLOW AUTOMATION */}
      <WorkflowFlowPreview />

      {/* HOW IT WORKS */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">How it works</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Live in three simple steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <Card key={s.n} className="p-7 relative overflow-hidden hover:shadow-card-hover transition-all">
                <div className="text-5xl font-bold text-primary/15 absolute top-3 right-4">{s.n}</div>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-foreground">{s.t}</h3>
                  <p className="text-base text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND — light blue gradient (replaces old dark band) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/10 via-info/10 to-primary/5 border-y border-border">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl -z-0" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-info/15 blur-3xl -z-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">Built for scale</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Numbers our customers run on
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <Card key={s.label} className="text-center p-6 bg-card/80 backdrop-blur-sm border-primary/10 hover:shadow-card-hover transition-all">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  <CountUp end={s.val} decimals={s.decimals ?? 0} />{s.suffix}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-14">
            {[
              { icon: Shield, t: "Enterprise-grade security", d: "RBAC, audit logs, encryption in transit." },
              { icon: Globe2, t: "Global delivery", d: "180+ countries, regional routing." },
              { icon: Code2, t: "Developer-first APIs", d: "Clean REST + webhooks, full docs." },
            ].map((f) => (
              <Card key={f.t} className="p-5 bg-card/80 backdrop-blur-sm border-primary/10">
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold text-foreground">{f.t}</p>
                <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* TRIAL CTA — same card style as PricingPage */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-info/5 to-transparent border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wide">
                  <Inbox className="w-4 h-4" /> Try the full platform
                </div>
                <h3 className="text-2xl font-bold text-foreground mt-2">
                  Start your 14-day free trial today.
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5">
                  All channels, full inbox, AI assist, 1,000 free messages. Cancel anytime.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/onboarding">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-info">Start free trial</Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">Talk to sales</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
