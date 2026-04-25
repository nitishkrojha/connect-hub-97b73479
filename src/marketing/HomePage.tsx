import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, CheckCircle2, Shield, Code2, Globe2, Zap, Inbox,
  ShoppingBag, Landmark, Stethoscope, GraduationCap, Truck, Plane, Home as HomeIcon, Sparkle,
  MessageCircle, Mail, Phone, Radio, PhoneCall, Bot, Send, Instagram, Facebook,
} from "lucide-react";
import InlineWordSwap from "./InlineWordSwap";
import LogoMarquee from "./LogoMarquee";
import CountUp from "./CountUp";
import HeroChannelOrbit from "./HeroChannelOrbit";
import MessageOutPreview from "./MessageOutPreview";
import InboxStreamPreview from "./InboxStreamPreview";
import CallIVRSPreview from "./CallIVRSPreview";

const swapWords = ["WhatsApp", "SMS", "Email", "RCS", "voice", "social"];

const channels = [
  { name: "WhatsApp", icon: MessageCircle, tone: "bg-channel-whatsapp/10 text-channel-whatsapp" },
  { name: "SMS", icon: MessageCircle, tone: "bg-channel-sms/10 text-channel-sms" },
  { name: "RCS", icon: Radio, tone: "bg-channel-rcs/10 text-channel-rcs" },
  { name: "Email", icon: Mail, tone: "bg-channel-email/10 text-channel-email" },
  { name: "Instagram", icon: Instagram, tone: "bg-pink-500/10 text-pink-500" },
  { name: "Facebook", icon: Facebook, tone: "bg-blue-500/10 text-blue-500" },
  { name: "Telegram", icon: Send, tone: "bg-sky-500/10 text-sky-500" },
  { name: "Web Chat", icon: MessageCircle, tone: "bg-primary/10 text-primary" },
  { name: "IVRS", icon: Phone, tone: "bg-channel-ivrs/10 text-channel-ivrs" },
  { name: "Voice OBD", icon: Radio, tone: "bg-purple-500/10 text-purple-500" },
  { name: "Click-to-call", icon: PhoneCall, tone: "bg-emerald-500/10 text-emerald-500" },
  { name: "Chatbot", icon: Bot, tone: "bg-amber-500/10 text-amber-500" },
];

const steps = [
  { n: "01", t: "Connect channels", d: "Link WhatsApp, SMS, Email, social and voice via guided setup." },
  { n: "02", t: "Build campaigns & agents", d: "Templates, segments, automations and AI agents — no code required." },
  { n: "03", t: "Measure & iterate", d: "Live dashboards for delivery, replies, calls and CSAT." },
];

const useCases = [
  { icon: ShoppingBag, name: "E-commerce" },
  { icon: Landmark, name: "BFSI" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: GraduationCap, name: "Education" },
  { icon: Truck, name: "Logistics" },
  { icon: Plane, name: "Travel" },
  { icon: HomeIcon, name: "Real Estate" },
  { icon: Sparkle, name: "D2C" },
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

      {/* FEATURES — actual product snippets */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">What you get</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Everything you need to scale conversations
            </h2>
            <p className="text-muted-foreground mt-5">
              Real product, not screenshots — see the inbox, broadcast and IVR in action.
            </p>
          </div>

          {/* Snippet 1 — Broadcast (text left, preview right) */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                <Send className="w-3 h-3" /> Bulk Broadcast
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Launch multi-channel campaigns in minutes
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Compose once, deliver across SMS, WhatsApp, Email and RCS. Approved templates, smart scheduling and live delivery tracking — built in.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Approved DLT & WhatsApp templates", "Audience segments + scheduling", "Live DLR + retry on failure"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-6">
              <MessageOutPreview />
            </div>
          </div>

          {/* Snippet 2 — Inbox (preview left, text right) */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
            <div className="lg:order-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-success bg-success/10 px-2.5 py-1 rounded-full">
                <Inbox className="w-3 h-3" /> Unified Inbox
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Every channel in one organised inbox
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                WhatsApp, Email, Instagram, SMS, web chat and IVRS — assign to agents, convert to tickets, and never lose context across replies.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Smart routing & assignment rules", "Convert any chat into a ticket", "AI co-pilot for faster replies"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-1 lg:pr-6 flex justify-center lg:justify-start">
              <InboxStreamPreview />
            </div>
          </div>

          {/* Snippet 3 — Voice / IVR */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-channel-ivrs bg-channel-ivrs/10 px-2.5 py-1 rounded-full">
                <PhoneCall className="w-3 h-3" /> IVRS & Voice
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Smart call flows, sticky agents, full recordings
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Build IVR menus visually, route by working hours, and run outbound voice broadcasts with DTMF capture and retries.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Visual IVR builder, no code", "Sticky-agent + working-hours rules", "Outbound OBD with DTMF surveys"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-6 max-w-sm mx-auto lg:mx-0 w-full">
              <CallIVRSPreview />
            </div>
          </div>
        </div>
      </section>

      {/* CHANNEL GRID */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">One platform, every channel</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Meet customers where they are
            </h2>
            <p className="text-muted-foreground mt-5">
              Bring messaging, social and voice into a single, organised inbox — no more tab switching.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {channels.map((c) => (
              <Card key={c.name} className="p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-center bg-card">
                <div className={`w-12 h-12 rounded-xl ${c.tone} flex items-center justify-center mx-auto mb-2`}>
                  <c.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-background">
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
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
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

      {/* INDUSTRIES */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">Industries we serve</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Trusted across every sector
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {useCases.map((u) => (
              <Card key={u.name} className="p-5 text-center hover:shadow-card-hover hover:border-primary/40 transition-all">
                <u.icon className="w-7 h-7 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">{u.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRIAL CTA — same card style as PricingPage */}
      <section className="pb-24 bg-background">
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
