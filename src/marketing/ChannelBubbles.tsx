import { MessageSquare, Mail, Phone, Instagram, Facebook, Send, Bot, PhoneCall, Sparkles, Radio } from "lucide-react";
import { useEffect, useState } from "react";

const bubbles = [
  { icon: MessageSquare, label: "WhatsApp", x: "12%", y: "18%", delay: 0, size: 56 },
  { icon: Mail, label: "Email", x: "72%", y: "10%", delay: 1.2, size: 52 },
  { icon: Phone, label: "SMS", x: "82%", y: "44%", delay: 0.6, size: 60 },
  { icon: Instagram, label: "Instagram", x: "8%", y: "52%", delay: 2.0, size: 48 },
  { icon: Facebook, label: "Facebook", x: "62%", y: "70%", delay: 1.6, size: 50 },
  { icon: Send, label: "Telegram", x: "20%", y: "82%", delay: 0.9, size: 46 },
  { icon: PhoneCall, label: "IVRS", x: "44%", y: "28%", delay: 2.4, size: 54 },
  { icon: Bot, label: "AI Agent", x: "44%", y: "78%", delay: 1.4, size: 52 },
  { icon: Radio, label: "RCS", x: "84%", y: "78%", delay: 0.3, size: 44 },
];

const features = [
  "Unified Inbox",
  "Voice Broadcast",
  "AI Agents 24×7",
  "IVR Studio",
  "WhatsApp · SMS · Email · RCS",
  "Real-time Analytics",
];

const ChannelBubbles = () => {
  const [feat, setFeat] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFeat((f) => (f + 1) % features.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* center logo with pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="absolute inset-0 rounded-full bg-primary-foreground/20 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-primary-foreground/10 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
        <div className="relative w-24 h-24 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center shadow-2xl">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>

      {/* connector dotted ring */}
      <div className="absolute inset-8 rounded-full border border-dashed border-primary-foreground/20" />
      <div className="absolute inset-16 rounded-full border border-dashed border-primary-foreground/15" />

      {/* floating channel bubbles */}
      {bubbles.map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-bubble-float"
            style={{ left: b.x, top: b.y, animationDelay: `${b.delay}s` }}
          >
            <div className="relative group">
              <span className="absolute inset-0 rounded-2xl bg-primary-foreground/30 animate-pulse-ring" style={{ animationDelay: `${b.delay + 0.4}s` }} />
              <div
                className="relative rounded-2xl bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center shadow-lg hover:bg-primary-foreground/25 transition-colors"
                style={{ width: b.size, height: b.size }}
              >
                <Icon className="text-primary-foreground" style={{ width: b.size * 0.42, height: b.size * 0.42 }} />
              </div>
              <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-5 text-[10px] font-medium text-primary-foreground/80 whitespace-nowrap">
                {b.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* feature ticker */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-primary-foreground transition-all duration-500" key={feat}>
            {features[feat]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChannelBubbles;
