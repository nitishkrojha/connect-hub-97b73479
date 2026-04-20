import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Instagram, Bot, Inbox, Ticket, CheckCheck } from "lucide-react";

type Item = {
  id: number;
  channel: "WhatsApp" | "Email" | "Instagram" | "SMS" | "Chatbot" | "IVRS";
  name: string;
  msg: string;
  delay: number;
  status?: "new" | "open" | "ticket";
};

const seed: Item[] = [
  { id: 0, channel: "Email", name: "Anita K.", msg: "Refund status?", delay: 0, status: "open" },
  { id: 1, channel: "WhatsApp", name: "Rahul S.", msg: "Order not received yet…", delay: 0, status: "open" },
];

const stream: Item[] = [
  { id: 2, channel: "Instagram", name: "Priya M.", msg: "Is the blue variant in stock?", delay: 1200, status: "new" },
  { id: 3, channel: "Chatbot", name: "Visitor #8821", msg: "Need help with checkout", delay: 2800, status: "new" },
  { id: 4, channel: "SMS", name: "Karan V.", msg: "Reply STOP to unsubscribe", delay: 4400, status: "new" },
  { id: 5, channel: "IVRS", name: "+91 98xxxx12", msg: "Voicemail · 0:42", delay: 6000, status: "new" },
];

const channelMap = {
  WhatsApp: { icon: MessageCircle, color: "channel-whatsapp" },
  Email: { icon: Mail, color: "channel-email" },
  Instagram: { icon: Instagram, color: "channel-sms" },
  SMS: { icon: MessageCircle, color: "channel-sms" },
  Chatbot: { icon: Bot, color: "channel-rcs" },
  IVRS: { icon: Phone, color: "channel-ivrs" },
} as const;

/**
 * Animated unified-inbox panel: messages from many channels stream in over time.
 */
const InboxStreamPreview = () => {
  const [tick, setTick] = useState(0);
  const [items, setItems] = useState<Item[]>(seed);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 8500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setItems(seed);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    stream.forEach((s) => {
      timeouts.push(setTimeout(() => setItems((p) => [s, ...p].slice(0, 6)), s.delay));
    });
    // promote first new -> ticket near the end
    timeouts.push(
      setTimeout(
        () => setItems((p) => p.map((i) => (i.id === 2 ? { ...i, status: "ticket" } : i))),
        7400
      )
    );
    return () => timeouts.forEach(clearTimeout);
  }, [tick]);

  return (
    <Card className="p-4 shadow-card-hover bg-card border-border w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-success/10 flex items-center justify-center">
            <Inbox className="w-4 h-4 text-success" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Unified Inbox</div>
            <div className="text-[11px] text-muted-foreground">All channels · Live</div>
          </div>
        </div>
        <span className="text-[10px] font-medium text-info bg-info/10 px-2 py-0.5 rounded-full">
          {items.length} active
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((c, idx) => {
          const meta = channelMap[c.channel];
          const Icon = meta.icon;
          return (
            <div
              key={`${c.id}-${idx}`}
              className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
                c.status === "new" ? "border-primary/40 bg-primary/5 animate-fade-in" : "border-border bg-background"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[hsl(var(--${meta.color}))]/15`}
              >
                <Icon className={`w-3.5 h-3.5 text-[hsl(var(--${meta.color}))]`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-foreground truncate">{c.name}</span>
                  <span className="text-[9px] text-muted-foreground">· {c.channel}</span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{c.msg}</div>
              </div>
              {c.status === "new" && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">NEW</span>
              )}
              {c.status === "open" && <CheckCheck className="w-3.5 h-3.5 text-info" />}
              {c.status === "ticket" && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-warning/15 text-warning font-semibold flex items-center gap-0.5">
                  <Ticket className="w-2.5 h-2.5" /> TKT
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default InboxStreamPreview;
