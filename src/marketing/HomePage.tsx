import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Send, Inbox, Phone, BarChart3, Shield, Sparkles, CheckCircle2,
  MessageCircle, Mail, Instagram, Facebook, Bot, Megaphone, Users, Workflow,
  Headphones, Ticket, Languages, Globe, Lock, Code2, Zap, Radio, PhoneCall,
  ShoppingBag, Landmark, Stethoscope, GraduationCap, Truck, Plane, Home as HomeIcon, Sparkle,
} from "lucide-react";
import TypewriterHeading from "./TypewriterHeading";
import HeroStage from "./HeroStage";
import MeshGradient from "./MeshGradient";
import UnifiedInboxShowcase from "./UnifiedInboxShowcase";
import LogoMarquee from "./LogoMarquee";
import CountUp from "./CountUp";
import FAQAccordion from "./FAQAccordion";
import CallIVRSPreview from "./CallIVRSPreview";

const heroPhrases = [
  "Deliver messages across SMS, WhatsApp, Email, RCS.",
  "Engage on Instagram, Facebook, Telegram & web chat.",
  "Answer every call with intelligent IVRS.",
  "Manage all conversations in one inbox.",
];

const bridges = [
  {
    title: "Messaging Bridge", desc: "Reach customers on the channels they prefer.",
    icons: [MessageCircle, Mail, Radio], items: ["SMS", "WhatsApp", "Email", "RCS"],
    bar: "from-primary to-primary/40", chip: "bg-primary/10", text: "text-primary",
  },
  {
    title: "Social Bridge", desc: "Turn DMs and comments into real conversations.",
    icons: [Instagram, Facebook, Send], items: ["Instagram", "Facebook", "Telegram", "Web chat"],
    bar: "from-info to-info/40", chip: "bg-info/10", text: "text-info",
  },
  {
    title: "Voice Bridge", desc: "Connect every call with smart IVRS routing.",
    icons: [Phone, PhoneCall, Bot], items: ["IVRS menus", "Call routing", "Voice broadcast", "Click-to-call"],
    bar: "from-success to-success/40", chip: "bg-success/10", text: "text-success",
  },
];

const channelTabs = {
  Messaging: [
    { name: "WhatsApp", icon: MessageCircle, color: "channel-whatsapp" },
    { name: "SMS", icon: MessageCircle, color: "channel-sms" },
    { name: "RCS", icon: MessageCircle, color: "channel-rcs" },
    { name: "Email", icon: Mail, color: "channel-email" },
  ],
  Social: [
    { name: "Instagram", icon: Instagram, color: "channel-sms" },
    { name: "Facebook", icon: Facebook, color: "channel-email" },
    { name: "Telegram", icon: Send, color: "channel-rcs" },
    { name: "Web Chat", icon: MessageCircle, color: "channel-whatsapp" },
  ],
  Voice: [
    { name: "IVRS", icon: Phone, color: "channel-ivrs" },
    { name: "Voice OBD", icon: Radio, color: "channel-ivrs" },
    { name: "Click-to-call", icon: PhoneCall, color: "channel-whatsapp" },
    { name: "Missed call", icon: Phone, color: "channel-rcs" },
  ],
};

const teamFeatures = [
  { icon: Inbox, title: "Shared Inbox", desc: "Every channel in one screen for the whole team." },
  { icon: Ticket, title: "Tickets & SLA", desc: "Convert any chat into a tracked ticket with SLA timers." },
  { icon: Bot, title: "AI Chatbot", desc: "No-code bots for FAQs, lead capture, 24×7 deflection." },
  { icon: Users, title: "Agent Routing", desc: "Auto-assign by skill, language, channel, or queue." },
  { icon: Megaphone, title: "Campaign Manager", desc: "Bulk messaging with templates, scheduling, and variants." },
  { icon: Workflow, title: "Automation", desc: "Trigger replies, tags, and follow-ups on customer actions." },
  { icon: Languages, title: "Multilingual (30+)", desc: "Reply in 30+ languages with translation assistance." },
  { icon: BarChart3, title: "Reports & Analytics", desc: "Volume, response time, agent leaderboards, channel mix." },
  { icon: Shield, title: "Enterprise Security", desc: "RBAC, audit logs, project-level data isolation." },
];

const steps = [
  { n: "01", t: "Connect channels & numbers", d: "Link WhatsApp, SMS, Email, social, and voice via guided setup." },
  { n: "02", t: "Invite your team & set routing", d: "Add agents, assign roles, configure queues and SLAs." },
  { n: "03", t: "Launch campaigns or open the inbox", d: "Send messages or respond to conversations from one console." },
  { n: "04", t: "Track everything in real-time", d: "Live dashboards for delivery, replies, calls, and agents." },
];

const useCases = [
  { icon: ShoppingBag, name: "E-commerce", desc: "Order updates, abandoned cart, returns" },
  { icon: Landmark, name: "BFSI", desc: "OTPs, KYC nudges, EMI reminders" },
  { icon: Stethoscope, name: "Healthcare", desc: "Appointment, reports, refill reminders" },
  { icon: GraduationCap, name: "Education", desc: "Admissions, fee, attendance alerts" },
  { icon: Truck, name: "Logistics", desc: "Shipment tracking, delivery confirmations" },
  { icon: Plane, name: "Travel", desc: "Bookings, itineraries, support" },
  { icon: HomeIcon, name: "Real Estate", desc: "Lead nurture, site-visit scheduling" },
  { icon: Sparkle, name: "D2C", desc: "Launches, loyalty, win-back campaigns" },
];

const stats = [
  { val: 10, suffix: "B+", label: "Messages routed" },
  { val: 99.9, suffix: "%", label: "Delivery rate", decimals: 1 },
  { val: 180, suffix: "+", label: "Countries reached" },
  { val: 50, suffix: "M+", label: "Calls handled" },
  { val: 30, suffix: "+", label: "Languages" },
  { val: 2400, suffix: "+", label: "Businesses connected" },
];

const HomePage = () => {
  return (
    <div>
      {/* TRUST RIBBON */}
      <div className="bg-gradient-to-r from-primary/10 via-info/10 to-success/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Connecting businesses across 10+ channels
          </span>
          <span className="hidden sm:inline text-muted-foreground">·</span>
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <Inbox className="w-3.5 h-3.5 text-info" />
            Single inbox · Messaging · Social · IVRS
          </span>
          <span className="hidden md:inline text-muted-foreground">·</span>
          <span className="hidden md:flex items-center gap-1.5 text-foreground font-medium">
            <Shield className="w-3.5 h-3.5 text-success" />
            ISO 27001 ready · DLT compliant · 99.9% uptime
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <MeshGradient />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full glass-card text-primary border border-primary/20 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              The Bridge for Modern Customer Communication
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.05] tracking-tight animate-fade-in">
              Connect every channel.
              <br />
              <TypewriterHeading phrases={heroPhrases} className="block mt-3 text-3xl sm:text-4xl lg:text-5xl min-h-[1.2em]" />
            </h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-xl animate-fade-in" style={{ animationDelay: "120ms" }}>
              Samparq is the bridge that links your business to customers — across messaging, social, and voice — through a single, unified inbox.
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: "180ms" }}>
              One adapter for every channel. One inbox for every conversation. One platform for every customer interaction.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "240ms" }}>
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] hover:bg-right transition-all shadow-card-hover">
                  Start free trial <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="glass-card">Book a demo</Button>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> 10-min setup</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> Cancel anytime</span>
            </div>
          </div>

          {/* Right alive composite */}
          <div className="relative animate-fade-in" style={{ animationDelay: "300ms" }}>
            <HeroStage />
          </div>
        </div>
      </section>

      {/* WHAT SAMPARQ BRIDGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">What Samparq bridges</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">
            One platform. <span className="gradient-text">Three powerful bridges.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {bridges.map((b, i) => (
            <Card
              key={b.title}
              className="relative p-6 overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-in group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${b.bar}`} />
              <div className="flex gap-2 mb-4">
                {b.icons.map((Icon, j) => (
                  <div key={j} className={`w-10 h-10 rounded-lg ${b.chip} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${b.text}`} />
                  </div>
                ))}
              </div>
              <h3 className="font-bold text-lg text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{b.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {b.items.map((it) => (
                  <span key={it} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-foreground border border-border">
                    {it}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Pillar A */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
                <Megaphone className="w-3.5 h-3.5" /> Reach your customers
              </div>
              <h2 className="text-3xl font-bold text-foreground">Send & broadcast at scale</h2>
              <p className="text-muted-foreground mt-3">
                Deliver messages across SMS, WhatsApp, Email, and RCS — with templates, scheduling, bulk upload, and a clean API.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                {["Templates, scheduling & bulk upload", "REST API + webhooks for system integration", "Delivery receipts, link tracking, A/B variants"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
            <Card className="p-5 glass-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Campaign · Order Update</div>
                  <div className="text-[11px] text-muted-foreground">12,400 recipients · WhatsApp</div>
                </div>
              </div>
              <div className="rounded-lg bg-muted/40 border border-border p-3 text-sm text-foreground">
                Hi {"{name}"} 👋 Your order #{"{order_id}"} is confirmed and out for delivery today.
              </div>
              <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-success animate-grow rounded-full" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Delivering…</span>
                <span className="text-success font-medium">11,408 delivered</span>
              </div>
            </Card>
          </div>

          {/* Pillar B */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Card className="p-5 glass-card lg:order-1 order-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-md bg-info/10 flex items-center justify-center">
                  <Inbox className="w-4 h-4 text-info" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Live conversations</div>
                  <div className="text-[11px] text-muted-foreground">Across all channels</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { ch: "WhatsApp", color: "channel-whatsapp", from: "Riya", text: "Got the order, thanks!" },
                  { ch: "Instagram", color: "channel-sms", from: "@nikhil", text: "Is this still in stock?" },
                  { ch: "Email", color: "channel-email", from: "support@acme", text: "Invoice #4421 query" },
                ].map((m) => (
                  <div key={m.from} className="flex items-center gap-2 p-2 rounded-md bg-muted/40 border border-border/50">
                    <span className={`w-2 h-2 rounded-full bg-[hsl(var(--${m.color}))]`} />
                    <span className="text-xs font-medium text-foreground">{m.from}</span>
                    <span className="text-xs text-muted-foreground truncate">{m.text}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">{m.ch}</span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="lg:order-2 order-1">
              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-info/10 text-info border border-info/20 mb-3">
                <Inbox className="w-3.5 h-3.5" /> Talk with your customers
              </div>
              <h2 className="text-3xl font-bold text-foreground">One inbox for every conversation</h2>
              <p className="text-muted-foreground mt-3">
                Receive and respond across WhatsApp, Email, Instagram, Facebook, Telegram, and web chat — without switching tabs.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                {["Agent routing, tickets, SLA, tags & notes", "Canned replies, AI assist, multilingual", "Chatbot deflection for routine queries"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pillar C */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 mb-3">
                <PhoneCall className="w-3.5 h-3.5" /> Voice & IVRS
              </div>
              <h2 className="text-3xl font-bold text-foreground">Connect every call, intelligently</h2>
              <p className="text-muted-foreground mt-3">
                IVRS menus, call routing, agent transfer, working-hours rules, voice broadcast, click-to-call, missed-call solutions and surveys.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                {["Call recording, virtual numbers, sticky agent", "Voice broadcast & OBD with retries", "Real-time call analytics — volume, peak hours, geo"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
            <CallIVRSPreview />
          </div>
        </div>
      </section>

      {/* ALL CHANNELS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">All your channels, one workspace</h2>
          <p className="text-muted-foreground mt-2">From messaging and social to voice — Samparq adapts to every conversation.</p>
        </div>
        <div className="space-y-8">
          {Object.entries(channelTabs).map(([group, items]) => (
            <div key={group}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">{group}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {items.map((c, i) => (
                  <Card
                    key={c.name}
                    className="p-4 flex items-center gap-3 hover:shadow-card-hover transition-all hover:-translate-y-1 animate-float"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(var(--${c.color}))]/10`}>
                      <c.icon className={`w-5 h-5 text-[hsl(var(--${c.color}))]`} />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UNIFIED INBOX SHOWCASE */}
      <section className="bg-gradient-to-b from-background to-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Every channel. <span className="gradient-text">One screen.</span> Zero context-switching.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              The unified inbox brings WhatsApp, social DMs, email, and voice into a single, organized workspace your team will love.
            </p>
          </div>
          <UnifiedInboxShowcase />
        </div>
      </section>

      {/* TEAM FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 mb-3">
            <Headphones className="w-3.5 h-3.5" />
            Built for modern teams
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Everything your team needs</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamFeatures.map((f, i) => (
            <Card
              key={f.title}
              className="p-5 hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Live in 4 simple steps</h2>
            <p className="text-muted-foreground mt-3">No engineering needed. Connect, configure, converse.</p>
          </div>
          <div className="relative grid md:grid-cols-4 gap-5">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary via-info to-success opacity-40" />
            {steps.map((s, i) => (
              <Card
                key={s.n}
                className="p-6 relative overflow-hidden hover:shadow-card-hover transition-all animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute -top-3 -right-2 text-7xl font-extrabold text-primary/10 select-none">{s.n}</div>
                <h3 className="font-bold text-foreground relative">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 relative">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Built for every industry</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useCases.map((u, i) => (
            <Card
              key={u.name}
              className="p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 flex items-center justify-center mb-3">
                <u.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-semibold text-foreground">{u.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{u.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_auto] animate-gradient-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 lg:grid-cols-6 gap-6 text-primary-foreground">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold">
                <CountUp end={s.val} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="text-xs opacity-90 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
            <Code2 className="w-3.5 h-3.5" /> Developer-first
          </div>
          <h2 className="text-3xl font-bold text-foreground">Ship messaging features in minutes</h2>
          <p className="text-muted-foreground mt-3">
            Clean REST APIs, signed webhooks, SDKs, and a sandbox environment — backed by 99.9% uptime.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["REST API", "Webhooks", "SDKs", "Sandbox", "99.9% uptime"].map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground border border-border">{t}</span>
            ))}
          </div>
          <Link to="/docs" className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-primary hover:underline">
            Read developer docs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Card className="p-0 overflow-hidden glass-card">
          <div className="bg-sidebar text-sidebar-foreground px-4 py-2 flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="ml-2 opacity-70">send-message.sh</span>
          </div>
          <pre className="p-5 text-xs text-foreground overflow-x-auto leading-relaxed">
{`curl -X POST https://api.samparq.io/v1/messages \\
  -H "Authorization: Bearer $SAMPARQ_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channel": "whatsapp",
    "to": "+919812345678",
    "template": "order_update",
    "variables": { "name": "Riya", "order_id": "5821" }
  }'`}
          </pre>
        </Card>
      </section>

      {/* SECURITY */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
              <Lock className="w-3.5 h-3.5" /> Security & Compliance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-3">Enterprise-grade by default</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["ISO 27001 ready", "SOC2 ready", "GDPR", "DLT (India)", "RBAC", "Audit logs", "E2E encryption", "Data residency"].map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full glass-card text-foreground font-medium">
                <Shield className="w-3 h-3 inline mr-1 text-success" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS + LOGOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Trusted by growing teams</div>
        </div>
        <LogoMarquee />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            { q: "We replaced 4 tools with Samparq. Our agents finally have one screen.", a: "Head of CX, D2C Brand" },
            { q: "IVRS setup that used to take a week is now live in an hour.", a: "Ops Lead, Logistics" },
            { q: "The unified inbox cut our average response time by 62%.", a: "Support Manager, Fintech" },
          ].map((t) => (
            <Card key={t.a} className="p-6 hover:shadow-card-hover transition-all">
              <Sparkles className="w-5 h-5 text-primary mb-3" />
              <p className="text-foreground italic">"{t.q}"</p>
              <div className="text-xs text-muted-foreground mt-3">— {t.a}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Simple, transparent pricing</h2>
            <p className="text-muted-foreground mt-2">Start free. Scale when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: "Starter", p: "Free", d: "For small teams getting started", cta: "Start free" },
              { t: "Growth", p: "₹4,999/mo", d: "For growing support & marketing teams", cta: "Try Growth", featured: true },
              { t: "Enterprise", p: "Custom", d: "Advanced security, SLAs, and onboarding", cta: "Talk to sales" },
            ].map((p) => (
              <Card key={p.t} className={`p-6 hover:shadow-card-hover transition-all ${p.featured ? "ring-2 ring-primary" : ""}`}>
                {p.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Most popular</span>
                )}
                <h3 className="text-xl font-bold text-foreground mt-1">{p.t}</h3>
                <div className="text-3xl font-extrabold text-foreground mt-2">{p.p}</div>
                <p className="text-sm text-muted-foreground mt-2">{p.d}</p>
                <Link to="/pricing">
                  <Button className="w-full mt-5" variant={p.featured ? "default" : "outline"}>{p.cta}</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">Frequently asked questions</h2>
        </div>
        <FAQAccordion />
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl p-12 text-center bg-gradient-to-br from-primary via-info to-success bg-[length:200%_auto] animate-gradient-shift">
          <Globe className="w-12 h-12 mx-auto text-primary-foreground mb-4 opacity-90" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground">
            One bridge. Every conversation.
          </h2>
          <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto">
            Spin up a Samparq workspace in minutes. Connect channels, open the inbox, start conversing.
          </p>
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="font-semibold">
                Start free trial <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
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
