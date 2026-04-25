import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Megaphone, Inbox, PhoneCall, Send, MessageCircle, Mail, Radio, Phone,
  Instagram, Facebook, Bot, Users, Headphones, Mic, ArrowRight, CheckCircle2,
  Banknote, ShoppingBag, GraduationCap, Stethoscope, Sparkles,
} from "lucide-react";
import MessageOutPreview from "./MessageOutPreview";
import InboxStreamPreview from "./InboxStreamPreview";
import CallIVRSPreview from "./CallIVRSPreview";

type SolutionId = "campaigns" | "conversation" | "voice";

const solutions: Array<{
  id: SolutionId;
  eyebrow: string;
  title: string;
  desc: string;
  icon: typeof Megaphone;
  tone: string;
  toneFg: string;
  channels: { icon: typeof Send; label: string; color: string }[];
  features: string[];
  preview: "out" | "inbox" | "voice";
  cta: string;
}> = [
  {
    id: "campaigns",
    eyebrow: "Outbound · Campaigns",
    title: "Bulk & transactional broadcasts",
    desc: "Reach millions across SMS, WhatsApp, Email and RCS from one composer — with approved templates, scheduling and live delivery tracking.",
    icon: Megaphone,
    tone: "bg-primary/10",
    toneFg: "text-primary",
    channels: [
      { icon: MessageCircle, label: "WhatsApp", color: "text-channel-whatsapp" },
      { icon: Phone,         label: "SMS",      color: "text-channel-sms" },
      { icon: Mail,          label: "Email",    color: "text-channel-email" },
      { icon: Radio,         label: "RCS",      color: "text-channel-rcs" },
    ],
    features: [
      "Approved DLT & WhatsApp templates",
      "Audience segments + smart scheduling",
      "Live DLR with retry & failover",
      "OTP API with sub-second SLAs",
    ],
    preview: "out",
    cta: "Send your first campaign",
  },
  {
    id: "conversation",
    eyebrow: "Inbound · Conversation",
    title: "Unified inbox for every reply",
    desc: "WhatsApp, Email, Instagram, Messenger, web chat and SMS — every customer reply lands in one inbox with assignment, SLAs and AI assist.",
    icon: Inbox,
    tone: "bg-success/10",
    toneFg: "text-success",
    channels: [
      { icon: MessageCircle, label: "WhatsApp",  color: "text-channel-whatsapp" },
      { icon: Mail,          label: "Email",     color: "text-channel-email" },
      { icon: Instagram,     label: "Instagram", color: "text-pink-500" },
      { icon: Facebook,      label: "Messenger", color: "text-blue-500" },
      { icon: Bot,           label: "Web Chat",  color: "text-amber-500" },
    ],
    features: [
      "Smart routing & agent assignment",
      "Convert any chat to a ticket",
      "AI co-pilot for faster replies",
      "SLA & CSAT tracking built in",
    ],
    preview: "inbox",
    cta: "Open the inbox demo",
  },
  {
    id: "voice",
    eyebrow: "Voice · IVR",
    title: "IVR studio, click-to-call & OBD",
    desc: "Build interactive voice flows visually, route calls by working hours, and run outbound voice broadcasts with DTMF capture and recordings.",
    icon: PhoneCall,
    tone: "bg-channel-ivrs/10",
    toneFg: "text-channel-ivrs",
    channels: [
      { icon: PhoneCall, label: "IVRS",          color: "text-channel-ivrs" },
      { icon: Radio,     label: "Voice OBD",     color: "text-purple-500" },
      { icon: Mic,       label: "Click-to-call", color: "text-emerald-500" },
      { icon: Headphones,label: "Agent Desk",    color: "text-primary" },
    ],
    features: [
      "Visual IVR builder, no code",
      "Sticky-agent + working-hours rules",
      "Outbound OBD with DTMF surveys",
      "Full call recordings + analytics",
    ],
    preview: "voice",
    cta: "Explore voice studio",
  },
];

const industries = [
  { icon: Banknote, name: "Banking & Fintech" },
  { icon: ShoppingBag, name: "E-commerce & Retail" },
  { icon: GraduationCap, name: "EdTech" },
  { icon: Stethoscope, name: "Healthcare" },
];

const Preview = ({ kind }: { kind: "out" | "inbox" | "voice" }) => {
  if (kind === "out") return <MessageOutPreview />;
  if (kind === "inbox") return <InboxStreamPreview />;
  return <CallIVRSPreview />;
};

const SolutionsPage = () => (
  <div className="bg-background">
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-info/10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-5 tracking-tight leading-tight">
          Three solutions. One unified workspace.
        </h1>
        <p className="text-muted-foreground mt-5 text-base sm:text-lg max-w-2xl mx-auto">
          Whether you broadcast, reply or call — Samparq covers the full conversation lifecycle on every channel.
        </p>

        {/* Quick nav */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors"
            >
              <s.icon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
              {s.title.split(" ").slice(0, 3).join(" ")}
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Three solution sections */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {solutions.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 ${
            i !== solutions.length - 1 ? "border-b border-border" : ""
          }`}
        >
          {/* Copy */}
          <div className={i % 2 === 1 ? "lg:order-2" : ""}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl ${s.tone} flex items-center justify-center`}>
                <s.icon className={`w-6 h-6 ${s.toneFg}`} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                  {s.eyebrow}
                </div>
                <Badge variant="secondary" className="text-[10px] mt-1">Solution {String(i + 1).padStart(2, "0")}</Badge>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {s.title}
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{s.desc}</p>

            {/* Channel chips with brand colors */}
            <div className="mt-5 flex flex-wrap gap-2">
              {s.channels.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border text-xs font-medium"
                >
                  <c.icon className={`w-3.5 h-3.5 ${c.color}`} />
                  <span className="text-foreground">{c.label}</span>
                </div>
              ))}
            </div>

            <ul className="mt-6 grid sm:grid-cols-2 gap-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/onboarding">
                <Button className="rounded-full px-5 font-semibold">
                  {s.cta} <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="rounded-full px-5 font-semibold">
                  View API docs
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview */}
          <div className={i % 2 === 1 ? "lg:order-1" : ""}>
            <div className="relative">
              <div className={`absolute -inset-6 ${s.tone} blur-3xl -z-10 rounded-full`} />
              <div className="max-w-sm mx-auto">
                <Preview kind={s.preview} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>

    {/* Industries */}
    <section className="bg-gradient-to-b from-primary/5 to-background border-t border-border py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Industries</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Trusted across sectors</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((i) => (
            <Card key={i.name} className="p-6 flex flex-col items-center gap-3 text-center hover:shadow-card-hover hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <i.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-semibold text-foreground">{i.name}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-info/5 to-transparent border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wide">
                <Users className="w-4 h-4" /> All three solutions, one workspace
              </div>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                Start your 14-day free trial
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Campaigns + Inbox + Voice — fully unlocked. No credit card needed.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/onboarding">
                <Button size="lg" className="rounded-full px-6 font-semibold">
                  Start free trial <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-6 font-semibold">
                  Talk to sales
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
);

export default SolutionsPage;
