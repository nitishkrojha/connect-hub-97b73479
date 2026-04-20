import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Send, Inbox, Phone, BarChart3, Shield, Zap, Globe,
  MessageCircle, Mail, Instagram, Facebook, Bot, CheckCircle2,
} from "lucide-react";
import MessageOutPreview from "./MessageOutPreview";
import MessageInPreview from "./MessageInPreview";

const channels = [
  { name: "SMS", icon: MessageCircle, color: "channel-sms" },
  { name: "WhatsApp", icon: MessageCircle, color: "channel-whatsapp" },
  { name: "Email", icon: Mail, color: "channel-email" },
  { name: "RCS", icon: MessageCircle, color: "channel-rcs" },
  { name: "IVRS", icon: Phone, color: "channel-ivrs" },
  { name: "Instagram", icon: Instagram, color: "channel-sms" },
  { name: "Facebook", icon: Facebook, color: "channel-email" },
  { name: "Chatbot", icon: Bot, color: "channel-whatsapp" },
];

const features = [
  { icon: Send, title: "Message Out", desc: "Campaigns, OTP, transactional — across SMS, WhatsApp, Email, RCS." },
  { icon: Inbox, title: "Message In", desc: "Unified inbox for replies & inbound across every connected channel." },
  { icon: Phone, title: "IVRS Voice", desc: "Smart call flows, geo & peak-hour analytics, recording management." },
  { icon: BarChart3, title: "Reports", desc: "Real-time dashboards for delivery, response time, agent performance." },
  { icon: Shield, title: "Enterprise security", desc: "RBAC, audit logs, RLS-backed data isolation per project." },
  { icon: Zap, title: "Developer APIs", desc: "REST endpoints to push recipients, trigger sends, fetch reports." },
];

const HomePage = () => {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-info/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Now with unified inbox & IVRS analytics
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              One platform for every <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">conversation</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Samparq unifies outbound messaging, inbound support, and voice IVRS across SMS, WhatsApp, Email, RCS, and social — in one operations console.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-primary to-info shadow-card-hover">
                  Start free <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline">View docs</Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> 14-day trial</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> SOC2 ready</span>
            </div>
          </div>

          <div className="grid gap-4 animate-fade-in" style={{ animationDelay: "120ms" }}>
            <MessageOutPreview />
            <MessageInPreview />
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Connect every channel</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">8 channels. 1 console.</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {channels.map((c) => (
            <Card key={c.name} className="p-4 flex flex-col items-center gap-2 hover:shadow-card-hover transition-all hover:-translate-y-0.5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(var(--${c.color}))]/10`}>
                <c.icon className={`w-5 h-5 text-[hsl(var(--${c.color}))]`} />
              </div>
              <span className="text-xs font-medium text-foreground">{c.name}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Everything your comms team needs</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">From the first OTP to the last support ticket — Samparq covers the full lifecycle.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title} className="p-6 hover:shadow-card-hover transition-all hover:-translate-y-1">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/10 to-info/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-primary to-info">
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
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ready to unify your communications?</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Spin up a project in minutes. Connect channels. Start sending and receiving — all from one Samparq workspace.</p>
        <div className="mt-7 flex justify-center gap-3">
          <Link to="/login"><Button size="lg" className="bg-gradient-to-r from-primary to-info">Get started free</Button></Link>
          <Link to="/contact"><Button size="lg" variant="outline">Talk to sales</Button></Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
