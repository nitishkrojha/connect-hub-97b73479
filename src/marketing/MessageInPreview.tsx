import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Inbox, MessageCircle, Mail, Instagram, CheckCheck, Ticket } from "lucide-react";

type Convo = {
  id: number;
  name: string;
  channel: "WhatsApp" | "Email" | "Instagram";
  preview: string;
  status: "new" | "open" | "ticket";
  unread?: boolean;
};

const seed: Convo[] = [
  { id: 1, name: "Rahul S.", channel: "WhatsApp", preview: "Order not received yet…", status: "open" },
  { id: 2, name: "Anita K.", channel: "Email", preview: "Refund status?", status: "ticket" },
];

const incoming: Convo = {
  id: 3,
  name: "Priya M.",
  channel: "Instagram",
  preview: "Is the blue variant in stock?",
  status: "new",
  unread: true,
};

const channelIcon = (c: Convo["channel"]) =>
  c === "WhatsApp" ? MessageCircle : c === "Email" ? Mail : Instagram;

const channelColor: Record<Convo["channel"], string> = {
  WhatsApp: "text-[hsl(var(--channel-whatsapp))] bg-[hsl(var(--channel-whatsapp))]/10",
  Email: "text-[hsl(var(--channel-email))] bg-[hsl(var(--channel-email))]/10",
  Instagram: "text-[hsl(var(--channel-sms))] bg-[hsl(var(--channel-sms))]/10",
};

const MessageInPreview = () => {
  const [list, setList] = useState<Convo[]>(seed);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setList(seed);
    const a = setTimeout(() => setList((l) => [{ ...incoming }, ...l]), 1200);
    const b = setTimeout(
      () => setList((l) => l.map((c) => (c.id === 3 ? { ...c, status: "open", unread: false } : c))),
      3600
    );
    const c = setTimeout(
      () => setList((l) => l.map((x) => (x.id === 3 ? { ...x, status: "ticket" } : x))),
      5200
    );
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [tick]);

  return (
    <Card className="p-5 shadow-card-hover bg-card border-border overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-success/10 flex items-center justify-center">
            <Inbox className="w-4 h-4 text-success" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Unified Inbox</div>
            <div className="text-xs text-muted-foreground">Inbound · All channels</div>
          </div>
        </div>
        <span className="text-[10px] font-medium text-info bg-info/10 px-2 py-0.5 rounded-full">
          {list.length} active
        </span>
      </div>

      <div className="space-y-2">
        {list.map((c, idx) => {
          const Icon = channelIcon(c.channel);
          return (
            <div
              key={c.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                c.unread
                  ? "border-primary/40 bg-primary/5 animate-fade-in"
                  : "border-border bg-background"
              }`}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${channelColor[c.channel]}`}>
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                  <Icon className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.preview}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {c.status === "new" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-medium">NEW</span>
                )}
                {c.status === "open" && (
                  <span className="text-[10px] text-info flex items-center gap-1"><CheckCheck className="w-3 h-3" /> Open</span>
                )}
                {c.status === "ticket" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-warning/15 text-warning font-medium flex items-center gap-1">
                    <Ticket className="w-3 h-3" /> Ticket
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
        <span>Avg response · 2m 14s</span>
        <span className="text-success font-medium">98% within SLA</span>
      </div>
    </Card>
  );
};

export default MessageInPreview;
