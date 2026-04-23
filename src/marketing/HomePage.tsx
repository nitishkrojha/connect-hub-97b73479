import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Send, Inbox, Phone, BarChart3, Shield, CheckCircle2,
  MessageCircle, Mail, Instagram, Facebook, Bot, Megaphone, Users, Workflow,
  Ticket, Languages, Lock, Code2, Radio, PhoneCall,
  ShoppingBag, Landmark, Stethoscope, GraduationCap, Truck, Plane, Home as HomeIcon, Sparkle,
} from "lucide-react";
import InlineWordSwap from "./InlineWordSwap";
import LogoMarquee from "./LogoMarquee";
import CountUp from "./CountUp";
import FAQAccordion from "./FAQAccordion";

const swapWords = ["messaging", "social", "voice", "email", "WhatsApp", "IVRS"];

const bridges = [
  {
    title: "Messaging",
    desc: "Reach customers on the channels they use every day.",
    items: ["SMS", "WhatsApp", "Email", "RCS"],
    icon: MessageCircle,
  },
  {
    title: "Social",
    desc: "Turn DMs and comments into real conversations.",
    items: ["Instagram", "Facebook", "Telegram", "Web chat"],
    icon: Instagram,
  },
  {
    title: "Voice & IVRS",
    desc: "Connect every call with intelligent routing.",
    items: ["IVRS menus", "Call routing", "Voice broadcast", "Click-to-call"],
    icon: PhoneCall,
  },
];

const channels = [
  { name: "WhatsApp", icon: MessageCircle },
  { name: "SMS", icon: MessageCircle },
  { name: "RCS", icon: Radio },
  { name: "Email", icon: Mail },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "Telegram", icon: Send },
  { name: "Web Chat", icon: MessageCircle },
  { name: "IVRS", icon: Phone },
  { name: "Voice OBD", icon: Radio },
  { name: "Click-to-call", icon: PhoneCall },
  { name: "Chatbot", icon: Bot },
];

const teamFeatures = [
  { icon: Inbox, title: "Shared Inbox", desc: "Every channel in one screen for the whole team." },
  { icon: Ticket, title: "Tickets & SLA", desc: "Convert any chat into a tracked ticket with SLA timers." },
  { icon: Bot, title: "AI Chatbot", desc: "No-code bots for FAQs, lead capture, and 24×7 deflection." },
  { icon: Users, title: "Agent Routing", desc: "Auto-assign by skill, language, channel, or queue." },
  { icon: Megaphone, title: "Campaign Manager", desc: "Bulk messaging with templates, scheduling, variants." },
  { icon: Workflow, title: "Automation", desc: "Trigger replies, tags, and follow-ups on customer actions." },
  { icon: Languages, title: "Multilingual (30+)", desc: "Reply in 30+ languages with translation assistance." },
  { icon: BarChart3, title: "Reports & Analytics", desc: "Volume, response time, agent leaderboards, channel mix." },
  { icon: Shield, title: "Enterprise Security", desc: "RBAC, audit logs, project-level data isolation." },
];

const steps = [
  { n: "01", t: "Connect your channels", d: "Link WhatsApp, SMS, Email, social, and voice via guided setup." },
  { n: "02", t: "Invite your team", d: "Add agents, assign roles, configure queues and SLAs." },
  { n: "03", t: "Open the inbox", d: "Send campaigns or respond to conversations from one console." },
  { n: "04", t: "Track in real-time", d: "Live dashboards for delivery, replies, calls, and agents." },
];

const useCases = [
  { icon: ShoppingBag, name: "E-commerce", desc: "Order updates, abandoned cart, returns" },
  { icon: Landmark, name: "BFSI", desc: "OTPs, KYC nudges, EMI reminders" },
  { icon: Stethoscope, name: "Healthcare", desc: "Appointments, reports, refill reminders" },
  { icon: GraduationCap, name: "Education", desc: "Admissions, fees, attendance alerts" },
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
    <div className="dark bg-background text-foreground">
      {/* HERO — Seezo-inspired: dark, centered, serif accent, dot grid */}
      <section className="relative overflow-hidden">
        {/* Soft glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 text-center relative z-10">
          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur text-muted-foreground animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            The bridge for modern customer communication
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.05] tracking-tight animate-fade-in">
            One bridge for every{" "}
            <InlineWordSwap words={swapWords} className="min-w-[1ch]" />
            <br className="hidden sm:block" />
            <span className="block mt-3">conversation with your customers.</span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "120ms" }}
          >
            Samparq connects your business to customers across messaging, social media, and voice — and brings every conversation into a single, unified inbox.
          </p>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-wrap justify-center gap-3 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <Link to="/login">
              <Button size="lg" className="rounded-full px-6 font-medium">
                Start free trial <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-6 font-medium border-border bg-card/40 backdrop-blur">
                Book a walkthrough
              </Button>
            </Link>
          </div>

          {/* micro row */}
          <div
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground animate-fade-in"
            style={{ animationDelay: "260ms" }}
          >
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> 10-min setup</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Cancel anytime</span>
          </div>
        </div>

        {/* Animated dot field — Seezo signature */}
        <div className="relative h-[280px] sm:h-[360px] -mt-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full dot-field animate-float-slow" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
            Trusted by teams across India and beyond
          </div>
          <LogoMarquee />
        </div>
      </section>

      {/* WHAT WE BRIDGE — clean 3 cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">What Samparq does</div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-foreground tracking-tight">
            Three channels.{" "}
            <span className="font-serif italic text-primary">One platform.</span>
          </h2>
          <p className="text-muted-foreground mt-5">
            We're the adapter between your business and your customers — wherever they choose to reach you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bridges.map((b, i) => (
            <Card
              key={b.title}
              className="p-7 bg-card/40 border-border hover:border-primary/40 hover:bg-card/60 transition-all animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-lg border border-border bg-background/60 flex items-center justify-center mb-5">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
              <div className="mt-5 pt-5 border-t border-border flex flex-wrap gap-1.5">
                {b.items.map((it) => (
                  <span key={it} className="text-[11px] px-2 py-0.5 rounded-md bg-background/60 text-muted-foreground border border-border">
                    {it}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* THREE PILLARS — minimal split layout */}
      <section className="border-y border-border bg-card/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 space-y-24">
          {/* A */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Reach</div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                Send messages that{" "}
                <span className="font-serif italic text-primary">actually arrive.</span>
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                Deliver across SMS, WhatsApp, Email, and RCS — with templates, scheduling, bulk upload, and a clean API. Track every step from queued to delivered.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-foreground">
                {["Templates, scheduling & bulk upload", "REST API + webhooks", "Delivery receipts, link tracking, A/B variants"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
            <Card className="p-6 bg-card/40 border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-md border border-border bg-background/60 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Order Update Campaign</div>
                  <div className="text-[11px] text-muted-foreground">12,400 recipients · WhatsApp</div>
                </div>
              </div>
              <div className="rounded-lg bg-background/60 border border-border p-4 text-sm text-foreground font-mono">
                Hi {"{name}"} — your order #{"{order_id}"} is out for delivery today.
              </div>
              <div className="mt-4 h-1.5 w-full bg-background/60 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-grow rounded-full" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Delivering…</span>
                <span className="text-primary font-medium">11,408 delivered</span>
              </div>
            </Card>
          </div>

          {/* B */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-6 bg-card/40 border-border lg:order-1 order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-md border border-border bg-background/60 flex items-center justify-center">
                  <Inbox className="w-4 h-4 text-primary" />
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
                  { ch: "Voice", color: "channel-ivrs", from: "+91 98•••432", text: "IVR · pressed 2 — Sales" },
                ].map((m) => (
                  <div key={m.from} className="flex items-center gap-3 p-3 rounded-md bg-background/60 border border-border">
                    <span className={`w-1.5 h-1.5 rounded-full bg-[hsl(var(--${m.color}))]`} />
                    <span className="text-xs font-medium text-foreground">{m.from}</span>
                    <span className="text-xs text-muted-foreground truncate flex-1">{m.text}</span>
                    <span className="text-[10px] text-muted-foreground">{m.ch}</span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="lg:order-2 order-1">
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Respond</div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                One inbox for{" "}
                <span className="font-serif italic text-primary">every conversation.</span>
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                Receive and respond across WhatsApp, Email, Instagram, Facebook, Telegram, and web chat — without switching tabs or losing context.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-foreground">
                {["Agent routing, tickets, SLA, tags & notes", "Canned replies, AI assist, multilingual", "Chatbot deflection for routine queries"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* C */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Connect</div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                Answer every call,{" "}
                <span className="font-serif italic text-primary">intelligently.</span>
              </h2>
              <p className="text-muted-foreground mt-5 leading-relaxed">
                IVRS menus, call routing, agent transfer, working-hours rules, voice broadcast, click-to-call, and missed-call solutions — all configurable in minutes.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-foreground">
                {["Call recording, virtual numbers, sticky agent", "Voice broadcast & OBD with retries", "Real-time call analytics — volume, peak hours, geo"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{x}</li>
                ))}
              </ul>
            </div>
            <Card className="p-6 bg-card/40 border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
                  <div className="relative w-10 h-10 rounded-full border border-border bg-background/60 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Incoming call · +91 98•••432</div>
                  <div className="text-[11px] text-muted-foreground">Routed via IVRS</div>
                </div>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { k: "1", v: "Order status" },
                  { k: "2", v: "Sales", active: true },
                  { k: "3", v: "Support" },
                  { k: "0", v: "Talk to agent" },
                ].map((o) => (
                  <div
                    key={o.k}
                    className={`flex items-center gap-3 p-2.5 rounded-md border ${
                      o.active ? "border-primary/50 bg-primary/5 text-foreground" : "border-border bg-background/60 text-muted-foreground"
                    }`}
                  >
                    <span className="w-6 h-6 rounded border border-border flex items-center justify-center text-[11px]">{o.k}</span>
                    <span>{o.v}</span>
                    {o.active && <span className="ml-auto text-[10px] text-primary">→ agent</span>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CHANNEL GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Channels</div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Every channel your customers{" "}
            <span className="font-serif italic text-primary">already use.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {channels.map((c, i) => (
            <div
              key={c.name}
              className="group p-5 rounded-xl border border-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="w-9 h-9 rounded-md border border-border bg-background/60 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <c.icon className="w-4 h-4 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM FEATURES */}
      <section className="border-y border-border bg-card/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">For modern teams</div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Everything your team{" "}
              <span className="font-serif italic text-primary">actually needs.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamFeatures.map((f, i) => (
              <Card
                key={f.title}
                className="p-6 bg-card/40 border-border hover:border-primary/40 transition-all animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="w-10 h-10 rounded-md border border-border bg-background/60 flex items-center justify-center mb-4">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">How it works</div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Live in{" "}
            <span className="font-serif italic text-primary">four steps.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="p-6 rounded-xl border border-border bg-card/40 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-xs font-mono text-primary">{s.n}</div>
              <h3 className="font-semibold text-foreground mt-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-y border-border bg-card/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Industries</div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Built for{" "}
              <span className="font-serif italic text-primary">every industry.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {useCases.map((u, i) => (
              <div
                key={u.name}
                className="p-5 rounded-xl border border-border bg-card/40 hover:border-primary/40 transition-all animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <u.icon className="w-5 h-5 text-primary mb-3" />
                <div className="font-semibold text-foreground">{u.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — minimal */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                <CountUp end={s.val} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPER */}
      <section className="border-y border-border bg-card/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Developer-first</div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Ship messaging features in{" "}
              <span className="font-serif italic text-primary">minutes.</span>
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Clean REST APIs, signed webhooks, SDKs, and a sandbox environment — backed by 99.9% uptime.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["REST API", "Webhooks", "SDKs", "Sandbox", "99.9% uptime"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md border border-border bg-background/60 text-muted-foreground">{t}</span>
              ))}
            </div>
            <Link to="/docs" className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-primary hover:underline">
              <Code2 className="w-4 h-4" /> Read developer docs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Card className="p-0 overflow-hidden bg-card/60 border-border">
            <div className="px-4 py-2.5 flex items-center gap-2 text-xs border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
              <span className="ml-2 text-muted-foreground font-mono">send-message.sh</span>
            </div>
            <pre className="p-5 text-xs text-foreground overflow-x-auto leading-relaxed font-mono">
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
        </div>
      </section>

      {/* SECURITY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          <Lock className="w-3.5 h-3.5" /> Security & Compliance
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          Enterprise-grade{" "}
          <span className="font-serif italic text-primary">by default.</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {["ISO 27001 ready", "SOC2 ready", "GDPR", "DLT (India)", "RBAC", "Audit logs", "E2E encryption", "Data residency"].map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/40 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-card/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { q: "We replaced four tools with Samparq. Our agents finally have one screen.", a: "Head of CX, D2C Brand" },
              { q: "IVRS setup that used to take a week is now live in an hour.", a: "Ops Lead, Logistics" },
              { q: "The unified inbox cut our average response time by 62%.", a: "Support Manager, Fintech" },
            ].map((t) => (
              <Card key={t.a} className="p-7 bg-card/40 border-border">
                <p className="font-serif italic text-lg text-foreground leading-relaxed">"{t.q}"</p>
                <div className="text-xs text-muted-foreground mt-5 uppercase tracking-wider">— {t.a}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Pricing</div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Simple,{" "}
            <span className="font-serif italic text-primary">transparent pricing.</span>
          </h2>
          <p className="text-muted-foreground mt-4">Start free. Scale when you're ready.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Starter", p: "Free", d: "For small teams getting started", cta: "Start free" },
            { t: "Growth", p: "₹4,999/mo", d: "For growing support & marketing teams", cta: "Try Growth", featured: true },
            { t: "Enterprise", p: "Custom", d: "Advanced security, SLAs, and onboarding", cta: "Talk to sales" },
          ].map((p) => (
            <Card
              key={p.t}
              className={`p-7 bg-card/40 border-border transition-all ${p.featured ? "border-primary/60 bg-card/70" : "hover:border-primary/40"}`}
            >
              {p.featured && (
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Most popular</span>
              )}
              <h3 className="text-xl font-semibold text-foreground mt-1">{p.t}</h3>
              <div className="text-3xl font-semibold text-foreground mt-3 tracking-tight">{p.p}</div>
              <p className="text-sm text-muted-foreground mt-2">{p.d}</p>
              <Link to="/pricing">
                <Button className="w-full mt-6 rounded-full" variant={p.featured ? "default" : "outline"}>{p.cta}</Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Frequently asked{" "}
              <span className="font-serif italic text-primary">questions.</span>
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10" />
        <h2 className="text-4xl sm:text-6xl font-semibold text-foreground tracking-tight">
          One bridge.{" "}
          <span className="font-serif italic text-primary">Every conversation.</span>
        </h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          Spin up a Samparq workspace in minutes. Connect channels, open the inbox, start conversing.
        </p>
        <div className="mt-9 flex justify-center gap-3 flex-wrap">
          <Link to="/login">
            <Button size="lg" className="rounded-full px-6 font-medium">
              Start free trial <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="rounded-full px-6 font-medium border-border bg-card/40">
              Talk to sales
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
