import { useEffect, useState } from "react";
import {
  MessageCircle, Mail, Phone, Instagram, Facebook, Send, Bot,
  PhoneCall, Radio, Sparkles,
} from "lucide-react";

/**
 * Hero-side animated bubbles with REAL brand-channel colors (not monochrome).
 * Used on the homepage hero right column.
 */
const bubbles = [
  { icon: MessageCircle, label: "WhatsApp", x: "10%", y: "16%", delay: 0,   size: 60, bg: "bg-channel-whatsapp/15", ring: "ring-channel-whatsapp/30", fg: "text-channel-whatsapp" },
  { icon: Mail,          label: "Email",    x: "76%", y: "8%",  delay: 1.2, size: 54, bg: "bg-channel-email/15",    ring: "ring-channel-email/30",    fg: "text-channel-email" },
  { icon: MessageCircle, label: "SMS",      x: "84%", y: "44%", delay: 0.6, size: 58, bg: "bg-channel-sms/15",      ring: "ring-channel-sms/30",      fg: "text-channel-sms" },
  { icon: Instagram,     label: "Instagram",x: "6%",  y: "52%", delay: 2.0, size: 52, bg: "bg-pink-500/15",         ring: "ring-pink-500/30",         fg: "text-pink-500" },
  { icon: Facebook,      label: "Facebook", x: "62%", y: "72%", delay: 1.6, size: 52, bg: "bg-blue-500/15",         ring: "ring-blue-500/30",         fg: "text-blue-500" },
  { icon: Send,          label: "Telegram", x: "18%", y: "82%", delay: 0.9, size: 50, bg: "bg-sky-500/15",          ring: "ring-sky-500/30",          fg: "text-sky-500" },
  { icon: PhoneCall,     label: "IVRS",     x: "44%", y: "26%", delay: 2.4, size: 56, bg: "bg-channel-ivrs/15",     ring: "ring-channel-ivrs/30",     fg: "text-channel-ivrs" },
  { icon: Bot,           label: "AI Agent", x: "44%", y: "78%", delay: 1.4, size: 54, bg: "bg-amber-500/15",        ring: "ring-amber-500/30",        fg: "text-amber-500" },
  { icon: Radio,         label: "RCS",      x: "84%", y: "78%", delay: 0.3, size: 48, bg: "bg-channel-rcs/15",      ring: "ring-channel-rcs/30",      fg: "text-channel-rcs" },
];

const phrases = [
  "Unified Inbox",
  "Voice Broadcast",
  "AI Agents 24×7",
  "IVR Studio",
  "Real-time Analytics",
  "WhatsApp · SMS · Email · RCS",
];

const HeroChannelOrbit = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* soft halo */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/10 via-info/10 to-transparent blur-2xl" />

      {/* dotted orbit rings */}
      <div className="absolute inset-6 rounded-full border border-dashed border-primary/20" />
      <div className="absolute inset-16 rounded-full border border-dashed border-primary/15" />

      {/* center logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-info/15 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-card-hover">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>

      {/* floating channel bubbles with brand colors */}
      {bubbles.map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-bubble-float"
            style={{ left: b.x, top: b.y, animationDelay: `${b.delay}s` }}
          >
            <div className="relative group">
              <span className={`absolute inset-0 rounded-2xl ${b.bg} animate-pulse-ring`} style={{ animationDelay: `${b.delay + 0.4}s` }} />
              <div
                className={`relative rounded-2xl ${b.bg} backdrop-blur-md ring-1 ${b.ring} bg-card/80 flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow`}
                style={{ width: b.size, height: b.size }}
              >
                <Icon className={`${b.fg}`} style={{ width: b.size * 0.44, height: b.size * 0.44 }} />
              </div>
              <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-5 text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                {b.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* feature ticker */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-card">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span key={idx} className="text-xs font-semibold text-foreground animate-fade-in">
            {phrases[idx]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroChannelOrbit;
