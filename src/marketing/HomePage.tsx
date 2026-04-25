import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Send, Inbox, Phone, BarChart3, Shield, CheckCircle2,
  MessageCircle, Mail, Instagram, Facebook, Bot, Megaphone, Users, Workflow,
  Ticket, Languages, Code2, Radio, PhoneCall, Zap, Globe2,
  ShoppingBag, Landmark, Stethoscope, GraduationCap, Truck, Plane, Home as HomeIcon, Sparkle,
} from "lucide-react";
import InlineWordSwap from "./InlineWordSwap";
import LogoMarquee from "./LogoMarquee";
import CountUp from "./CountUp";

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

const features = [
  { icon: Megaphone, title: "Bulk Broadcast", desc: "Run targeted SMS, WhatsApp, Email and RCS campaigns with templates and scheduling." },
  { icon: Inbox, title: "Shared Inbox", desc: "Every channel in one screen — assign, reply, resolve, and never lose context." },
  { icon: Bot, title: "AI Chatbot", desc: "No-code bots for FAQs, lead capture, and 24×7 deflection across channels." },
  { icon: PhoneCall, title: "IVRS & Routing", desc: "Smart menus, working-hours rules, sticky agent and call recording." },
  { icon: Radio, title: "Voice Broadcast", desc: "OBD with retries and DTMF capture — perfect for alerts and surveys." },
  { icon: Workflow, title: "Automation", desc: "Trigger replies, tags, follow-ups and webhooks on customer actions." },
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
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-info/10" />
        <div className="absolute top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] rounded-full bg-info/15 blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary animate-fade-in">
            <Zap className="w-3.5 h-3.5" /> Unified customer communication platform
          </div>

          <h1 className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight animate-fade-in">
            One platform for every{" "}
            <InlineWordSwap words={swapWords} className="min-w-[1ch]" />
            <br className="hidden sm:block" />
            <span className="block mt-3">customer conversation.</span>
          </h1>

          <p
            className="mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "120ms" }}
          >
            Samparq is the bridge between your business and your customers — broadcast, reply, and answer calls
            from a single workspace across every channel they use.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link to="/onboarding">
              <Button size="lg" className="rounded-full px-7 font-semibold shadow-card-hover">
                Start 7-day free trial <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-7 font-semibold">
                Book a demo
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "260ms" }}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> 10-min setup</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Cancel anytime</span>
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

      {/* FEATURES */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">What you get</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Everything you need to scale conversations
            </h2>
            <p className="text-muted-foreground mt-5">
              Built for marketing, support and operations teams that talk to customers every day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <Card
                key={f.title}
                className="p-6 hover:shadow-card-hover hover:border-primary/40 transition-all animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
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

      {/* PRODUCT BAND — DARK CONTRAST */}
      <section className="py-24 bg-sidebar text-sidebar-foreground relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-info/30 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">Built for scale</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Numbers our customers run on
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary">
                  <CountUp end={s.val} decimals={s.decimals ?? 0} />{s.suffix}
                </div>
                <p className="text-sm text-sidebar-foreground/70 mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-16">
            {[
              { icon: Shield, t: "Enterprise-grade security", d: "RBAC, audit logs, encryption in transit." },
              { icon: Globe2, t: "Global delivery", d: "180+ countries, regional routing." },
              { icon: Code2, t: "Developer-first APIs", d: "Clean REST + webhooks, full docs." },
            ].map((f) => (
              <div key={f.t} className="p-5 rounded-xl border border-sidebar-border bg-sidebar-accent/30">
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold">{f.t}</p>
                <p className="text-sm text-sidebar-foreground/70 mt-1">{f.d}</p>
              </div>
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

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-info text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Start your 7-day free trial
          </h2>
          <p className="mt-5 text-base sm:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Self-serve signup. Live in minutes. Talk to sales when you're ready to scale.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/onboarding">
              <Button size="lg" variant="secondary" className="rounded-full px-7 font-semibold">
                Start free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-7 font-semibold border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                Talk to sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
