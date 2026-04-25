import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Megaphone, Inbox, PhoneCall, Send, MessageCircle, Mail, Radio, Phone,
  Instagram, Facebook, Bot, Users, Headphones, Mic, ArrowRight, CheckCircle2,
  Sparkles,
} from "lucide-react";
import MessageOutPreview from "./MessageOutPreview";
import InboxStreamPreview from "./InboxStreamPreview";
import CallIVRSPreview from "./CallIVRSPreview";

type SolutionId = "campaigns" | "conversation" | "voice";

type Solution = {
  id: SolutionId;
  number: string;
  eyebrow: string;
  title: string;
  desc: string;
  icon: typeof Megaphone;
  /** Section background tint — full width band */
  bandClass: string;
  /** Color tone for icons / accents */
  tone: string;
  toneFg: string;
  toneBorder: string;
  channels: { icon: typeof Send; label: string; color: string }[];
  features: string[];
  preview: "out" | "inbox" | "voice";
  cta: string;
};

const solutions: Solution[] = [
  {
    id: "campaigns",
    number: "01",
    eyebrow: "Outbound · Campaigns",
    title: "Bulk & transactional broadcasts",
    desc:
      "Reach millions across SMS, WhatsApp, Email and RCS from one composer — with approved templates, smart scheduling and live delivery tracking.",
    icon: Megaphone,
    bandClass: "bg-primary/5",
    tone: "bg-primary/10",
    toneFg: "text-primary",
    toneBorder: "border-primary/20",
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
    number: "02",
    eyebrow: "Inbound · Conversation",
    title: "Unified inbox for every reply",
    desc:
      "WhatsApp, Email, Instagram, Messenger, web chat and SMS — every customer reply lands in one inbox with assignment, SLAs and AI assist.",
    icon: Inbox,
    bandClass: "bg-success/5",
    tone: "bg-success/10",
    toneFg: "text-success",
    toneBorder: "border-success/20",
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
    number: "03",
    eyebrow: "Voice · IVR",
    title: "IVR studio, click-to-call & OBD",
    desc:
      "Build interactive voice flows visually, route calls by working hours, and run outbound voice broadcasts with DTMF capture and recordings.",
    icon: PhoneCall,
    bandClass: "bg-channel-ivrs/5",
    tone: "bg-channel-ivrs/10",
    toneFg: "text-channel-ivrs",
    toneBorder: "border-channel-ivrs/20",
    channels: [
      { icon: PhoneCall,  label: "IVRS",          color: "text-channel-ivrs" },
      { icon: Radio,      label: "Voice OBD",     color: "text-purple-500" },
      { icon: Mic,        label: "Click-to-call", color: "text-emerald-500" },
      { icon: Headphones, label: "Agent Desk",    color: "text-primary" },
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

const Preview = ({ kind }: { kind: "out" | "inbox" | "voice" }) => {
  if (kind === "out") return <MessageOutPreview />;
  if (kind === "inbox") return <InboxStreamPreview />;
  return <CallIVRSPreview />;
};

const SolutionsPage = () => (
  <div className="bg-background">
    {/* Hero */}
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-info/10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
        <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4" aria-hidden /> Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-5 tracking-tight leading-tight">
          Three solutions. One unified workspace.
        </h1>
        <p className="text-muted-foreground mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you broadcast, reply or call — Samparq covers the full conversation lifecycle on every channel.
        </p>

        {/* Quick nav — clearer chip cards */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl border bg-card hover:border-primary/40 hover:shadow-card-hover transition-all text-left ${s.toneBorder}`}
            >
              <div className={`w-10 h-10 rounded-lg ${s.tone} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.toneFg}`} aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.number}
                </div>
                <div className="text-base font-semibold text-foreground truncate">
                  {s.eyebrow.split("·")[0].trim()}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Three solution sections — each in its own full-width tinted band */}
    {solutions.map((s, i) => (
      <section
        key={s.id}
        id={s.id}
        className={`scroll-mt-24 py-20 sm:py-24 border-b border-border ${s.bandClass}`}
        aria-labelledby={`${s.id}-heading`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Solution header strip */}
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-14 h-14 rounded-2xl ${s.tone} ${s.toneBorder} border flex items-center justify-center shrink-0`}>
              <s.icon className={`w-7 h-7 ${s.toneFg}`} aria-hidden />
            </div>
            <div>
              <div className={`text-sm font-bold uppercase tracking-[0.18em] ${s.toneFg}`}>
                Solution {s.number} · {s.eyebrow}
              </div>
              <div className="text-base text-muted-foreground mt-0.5">
                One of three pillars in the Samparq workspace
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Copy */}
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h2
                id={`${s.id}-heading`}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight"
              >
                {s.title}
              </h2>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">{s.desc}</p>

              {/* Channel chips with brand colors */}
              <div className="mt-6 flex flex-wrap gap-2">
                {s.channels.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm font-medium"
                  >
                    <c.icon className={`w-4 h-4 ${c.color}`} aria-hidden />
                    <span className="text-foreground">{c.label}</span>
                  </div>
                ))}
              </div>

              <ul className="mt-7 grid sm:grid-cols-2 gap-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-base text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/onboarding">
                  <Button className="rounded-full px-6 font-semibold">
                    {s.cta} <ArrowRight className="ml-1.5 w-4 h-4" aria-hidden />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="rounded-full px-6 font-semibold">
                    Talk to sales
                  </Button>
                </Link>
              </div>
            </div>

            {/* Preview */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="relative">
                <div className={`absolute -inset-6 ${s.tone} blur-3xl -z-10 rounded-full`} aria-hidden />
                <div className="max-w-sm mx-auto">
                  <Preview kind={s.preview} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-info/5 to-transparent border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wide">
                <Users className="w-4 h-4" aria-hidden /> All three solutions, one workspace
              </div>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                Start your 14-day free trial
              </h3>
              <p className="text-base text-muted-foreground mt-1.5">
                Campaigns + Inbox + Voice — fully unlocked. No credit card needed.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/onboarding">
                <Button size="lg" className="rounded-full px-6 font-semibold">
                  Start free trial <ArrowRight className="ml-1.5 w-4 h-4" aria-hidden />
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
