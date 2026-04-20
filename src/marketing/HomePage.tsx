import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Send, Inbox, Phone, BarChart3, Shield, Zap, Globe,
  MessageCircle, Mail, Instagram, Facebook, Bot, CheckCircle2,
  Megaphone, Users, Sparkles, Workflow, Headphones, Ticket, Languages,
} from "lucide-react";
import PhoneChatPreview from "./PhoneChatPreview";
import InboxStreamPreview from "./InboxStreamPreview";

const channels = [
  { name: "WhatsApp", icon: MessageCircle, color: "channel-whatsapp" },
  { name: "SMS", icon: MessageCircle, color: "channel-sms" },
  { name: "Email", icon: Mail, color: "channel-email" },
  { name: "RCS", icon: MessageCircle, color: "channel-rcs" },
  { name: "IVRS Voice", icon: Phone, color: "channel-ivrs" },
  { name: "Instagram", icon: Instagram, color: "channel-sms" },
  { name: "Facebook", icon: Facebook, color: "channel-email" },
  { name: "Chatbot", icon: Bot, color: "channel-whatsapp" },
  { name: "Telegram", icon: Send, color: "channel-email" },
  { name: "Web Chat", icon: MessageCircle, color: "channel-rcs" },
];

const supportFeatures = [
  { icon: Inbox, title: "Shared Inbox", desc: "Give your entire team one unified inbox across every channel." },
  { icon: Ticket, title: "Tickets & SLA", desc: "Convert any conversation into a tracked ticket with SLA timers." },
  { icon: Bot, title: "AI Chatbot", desc: "Build no-code bots for FAQs, lead capture, and 24×7 deflection." },
  { icon: Users, title: "Agent Routing", desc: "Auto-assign by skill, language, channel, or round-robin queues." },
  { icon: Megaphone, title: "Bulk Broadcast", desc: "Push targeted campaigns with high response rates, instantly." },
  { icon: Workflow, title: "Automation", desc: "Trigger replies, tags, and follow-ups based on customer actions." },
  { icon: Languages, title: "Multilingual", desc: "Reply in 30+ languages with built-in translation assistance." },
  { icon: BarChart3, title: "Reports & SLA", desc: "Volume, response time, agent leaderboards, channel breakdowns." },
  { icon: Shield, title: "Enterprise Security", desc: "RBAC, audit logs, and project-level data isolation." },
];

const HomePage = () => {
  return (
    <div>
      {/* TRUST RIBBON */}
      <div className="bg-gradient-to-r from-success/15 via-info/10 to-primary/15 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <Sparkles className="w-3.5 h-3.5 text-success" />
            Powered by Official WhatsApp Business API
          </span>
          <span className="hidden sm:inline text-muted-foreground">·</span>
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <Shield className="w-3.5 h-3.5 text-info" />
            Meta Business Partner
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute -top-10 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-info/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-60 left-0 w-72 h-72 bg-success/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            New · Unified Inbox + IVRS analytics
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight max-w-4xl mx-auto animate-fade-in">
            Win Conversations.{" "}
            <span className="bg-gradient-to-r from-primary via-info to-success bg-clip-text text-transparent">
              Win Customers.
            </span>{" "}
            With Samparq.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "80ms" }}>
            Broadcast. Automate. Reply. Convert. Across WhatsApp, SMS, Email, RCS, Voice, and Social — all from one inbox.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-primary to-info shadow-card-hover">
                Start 7-day free trial <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Book a demo</Button>
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap justify-center items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> Setup in minutes</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> SOC2 ready</span>
          </div>
        </div>

        {/* ANIMATED STAGE — phone + inbox */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center justify-items-center">
            {/* Left card: outbound campaign */}
            <Card className="hidden lg:block p-5 shadow-card-hover w-full max-w-sm animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Campaign · Order Update</div>
                  <div className="text-[11px] text-muted-foreground">12,400 recipients</div>
                </div>
              </div>
              <div className="rounded-lg bg-muted/40 border border-border p-3 text-sm text-foreground">
                Hi {"{name}"} 👋 Your order #{"{order_id}"} is confirmed and out for delivery today.
              </div>
              <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-success animate-[grow_3s_ease-in-out_infinite]" style={{ width: "92%" }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Sending…</span>
                <span className="text-success font-medium">11,408 delivered</span>
              </div>
            </Card>

            {/* Phone */}
            <div className="relative animate-fade-in" style={{ animationDelay: "100ms" }}>
              <PhoneChatPreview />
            </div>

            {/* Right: inbox stream */}
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <InboxStreamPreview />
            </div>
          </div>
        </div>
      </section>

      {/* MULTIPLE CHANNELS */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Connect everything</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
              Multiple channels. <span className="text-primary">One conversation hub.</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
              Reach customers wherever they are — and reply from one screen.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {channels.map((c) => (
              <Card key={c.name} className="p-3 flex flex-col items-center gap-1.5 hover:shadow-card-hover transition-all hover:-translate-y-0.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-[hsl(var(--${c.color}))]/10`}>
                  <c.icon className={`w-4 h-4 text-[hsl(var(--${c.color}))]`} />
                </div>
                <span className="text-[10px] font-medium text-foreground text-center leading-tight">{c.name}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 mb-3">
            <Headphones className="w-3.5 h-3.5" />
            For modern support teams
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything your support team needs
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From the first inbound message to the resolved ticket — Samparq covers the full workflow.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportFeatures.map((f, i) => (
            <Card
              key={f.title}
              className="p-5 hover:shadow-card-hover transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
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
      <section className="bg-gradient-to-b from-background to-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Live in 3 steps</h2>
            <p className="text-muted-foreground mt-3">No engineering needed. Connect, configure, converse.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "01", t: "Connect channels", d: "Link WhatsApp, SMS, Email, Social, IVRS — guided setup." },
              { n: "02", t: "Invite your team", d: "Add agents, assign roles, set routing rules." },
              { n: "03", t: "Start conversing", d: "Broadcast, reply, automate — all from the unified console." },
            ].map((s) => (
              <Card key={s.n} className="p-6 relative overflow-hidden hover:shadow-card-hover transition-all">
                <div className="absolute -top-4 -right-2 text-7xl font-extrabold text-primary/10 select-none">{s.n}</div>
                <h3 className="font-bold text-lg text-foreground relative">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 relative">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-primary via-info to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-primary-foreground">
          {[
            ["10B+", "Messages routed"],
            ["98.4%", "Delivery rate"],
            ["180+", "Countries reached"],
            ["2,400+", "Brands powered"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold">{v}</div>
              <div className="text-sm opacity-90 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Globe className="w-10 h-10 mx-auto text-primary mb-4" />
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ready to win every conversation?</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Spin up a project in minutes. Connect channels. Start broadcasting and supporting from one Samparq workspace.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link to="/login"><Button size="lg" className="bg-gradient-to-r from-primary to-info">Start free trial</Button></Link>
          <Link to="/contact"><Button size="lg" variant="outline">Talk to sales</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
