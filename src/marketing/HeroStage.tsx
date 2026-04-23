import { useEffect, useState } from "react";
import { MessageCircle, Mail, Phone, Instagram, Facebook, Send, Bot, Inbox, PhoneCall } from "lucide-react";

const channelChips = [
  { name: "WhatsApp", icon: MessageCircle, color: "channel-whatsapp", x: "5%", y: "10%", delay: "0s" },
  { name: "SMS", icon: MessageCircle, color: "channel-sms", x: "85%", y: "8%", delay: "0.6s" },
  { name: "Email", icon: Mail, color: "channel-email", x: "92%", y: "44%", delay: "1.1s" },
  { name: "RCS", icon: MessageCircle, color: "channel-rcs", x: "0%", y: "48%", delay: "1.6s" },
  { name: "Instagram", icon: Instagram, color: "channel-sms", x: "8%", y: "82%", delay: "2.1s" },
  { name: "Facebook", icon: Facebook, color: "channel-email", x: "82%", y: "82%", delay: "2.6s" },
  { name: "Telegram", icon: Send, color: "channel-rcs", x: "50%", y: "-2%", delay: "3.1s" },
  { name: "Bot", icon: Bot, color: "channel-ivrs", x: "48%", y: "100%", delay: "3.6s" },
];

const seedStream = [
  { ch: "WhatsApp", color: "channel-whatsapp", from: "Riya M.", text: "Got the order, thanks!" },
  { ch: "Instagram", color: "channel-sms", from: "@nikhil", text: "Is this still in stock?" },
  { ch: "Email", color: "channel-email", from: "support@acme", text: "Invoice #4421 query" },
  { ch: "Voice", color: "channel-ivrs", from: "+91 98•••432", text: "IVR · Pressed 2 — Sales" },
  { ch: "Telegram", color: "channel-rcs", from: "Aman", text: "Can I reschedule delivery?" },
  { ch: "WhatsApp", color: "channel-whatsapp", from: "Sara K.", text: "Need to update address" },
  { ch: "Facebook", color: "channel-email", from: "Priya", text: "Loved the new launch 🎉" },
];

const HeroStage = () => {
  const [stream, setStream] = useState(seedStream.slice(0, 4));
  const [callOn, setCallOn] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % seedStream.length;
      setStream((prev) => [seedStream[i], ...prev].slice(0, 4));
    }, 2200);
    const callId = setInterval(() => setCallOn((v) => !v), 4000);
    return () => {
      clearInterval(id);
      clearInterval(callId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      {/* Connector lines */}
      <svg className="absolute inset-0 w-full h-full -z-0 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        {channelChips.map((c, i) => {
          const x = parseFloat(c.x);
          const y = parseFloat(c.y);
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="hsl(var(--primary))"
              strokeWidth="0.2"
              strokeDasharray="1 1.5"
              className="animate-pulse"
            />
          );
        })}
      </svg>

      {/* Floating channel chips */}
      {channelChips.map((c) => (
        <div
          key={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{ left: c.x, top: c.y, animationDelay: c.delay }}
        >
          <div className="relative">
            <span className={`absolute inset-0 rounded-full bg-[hsl(var(--${c.color}))]/30 animate-pulse-ring`} />
            <div className={`relative w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-card-hover`}>
              <c.icon className={`w-5 h-5 text-[hsl(var(--${c.color}))]`} />
            </div>
          </div>
        </div>
      ))}

      {/* Center inbox card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] glass-card rounded-2xl p-4 shadow-card-hover">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <Inbox className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Unified Inbox</div>
            <div className="text-[10px] text-muted-foreground">Live · all channels</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-success font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> live
          </span>
        </div>
        <div className="space-y-2">
          {stream.map((m, i) => (
            <div
              key={`${m.from}-${i}`}
              className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border/50 animate-fade-in"
            >
              <span className={`w-2 h-2 rounded-full bg-[hsl(var(--${m.color}))] shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-foreground truncate">{m.from}</div>
                <div className="text-[10px] text-muted-foreground truncate">{m.text}</div>
              </div>
              <span className="text-[9px] text-muted-foreground">{m.ch}</span>
            </div>
          ))}
        </div>
      </div>

      {/* IVRS call card */}
      <div
        className={`absolute right-0 bottom-4 glass-card rounded-xl p-3 w-48 shadow-card-hover transition-all duration-500 ${
          callOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-success/30 animate-pulse-ring" />
            <div className="relative w-8 h-8 rounded-full bg-success/15 flex items-center justify-center">
              <PhoneCall className="w-4 h-4 text-success" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-semibold text-foreground">Incoming call</div>
            <div className="text-[10px] text-muted-foreground">Routed to IVRS · Sales</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStage;
