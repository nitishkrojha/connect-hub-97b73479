import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Instagram, Phone, Send, Inbox, Search, Paperclip, Smile } from "lucide-react";

const channels = [
  { icon: Inbox, label: "All", count: 124, active: true },
  { icon: MessageCircle, label: "WhatsApp", count: 48, color: "channel-whatsapp" },
  { icon: Instagram, label: "Instagram", count: 22, color: "channel-sms" },
  { icon: Mail, label: "Email", count: 31, color: "channel-email" },
  { icon: Phone, label: "Voice/IVRS", count: 14, color: "channel-ivrs" },
  { icon: Send, label: "Telegram", count: 9, color: "channel-rcs" },
];

const conversations = [
  { name: "Riya Mehta", ch: "WhatsApp", color: "channel-whatsapp", msg: "Got the order, thanks!", time: "now", unread: 2 },
  { name: "@nikhil_d", ch: "Instagram", color: "channel-sms", msg: "Is this still in stock?", time: "1m", unread: 1 },
  { name: "support@acme.in", ch: "Email", color: "channel-email", msg: "Invoice #4421 query", time: "4m" },
  { name: "+91 98•••432", ch: "Voice", color: "channel-ivrs", msg: "IVR · Pressed 2 — Sales", time: "6m", unread: 1 },
  { name: "Aman P.", ch: "Telegram", color: "channel-rcs", msg: "Reschedule delivery?", time: "12m" },
  { name: "Sara K.", ch: "WhatsApp", color: "channel-whatsapp", msg: "Update my address", time: "18m" },
];

const UnifiedInboxShowcase = () => (
  <Card className="overflow-hidden border-border/60 shadow-card-hover">
    <div className="grid grid-cols-12 min-h-[460px]">
      {/* Channels rail */}
      <div className="col-span-3 lg:col-span-2 border-r border-border bg-muted/30 p-3 space-y-1">
        {channels.map((c) => (
          <div
            key={c.label}
            className={`flex items-center gap-2 p-2 rounded-md text-xs cursor-pointer transition-colors ${
              c.active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
            }`}
          >
            <c.icon className={`w-4 h-4 ${c.color ? `text-[hsl(var(--${c.color}))]` : ""}`} />
            <span className="flex-1 truncate hidden sm:inline">{c.label}</span>
            <span className="text-[10px] font-medium opacity-70">{c.count}</span>
          </div>
        ))}
      </div>

      {/* Conversation list */}
      <div className="col-span-4 lg:col-span-4 border-r border-border">
        <div className="p-3 border-b border-border flex items-center gap-2 bg-background">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search conversations…</span>
        </div>
        <div className="divide-y divide-border max-h-[420px] overflow-hidden">
          {conversations.map((c, i) => (
            <div
              key={c.name}
              className={`p-3 hover:bg-muted/40 cursor-pointer animate-fade-in ${i === 0 ? "bg-primary/5" : ""}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full bg-[hsl(var(--${c.color}))]`} />
                <div className="text-xs font-semibold text-foreground flex-1 truncate">{c.name}</div>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                <span className="opacity-60">{c.ch} ·</span>
                <span className="truncate">{c.msg}</span>
              </div>
              {c.unread && (
                <span className="inline-block mt-1 text-[9px] bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 font-bold">
                  {c.unread} new
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reply pane */}
      <div className="col-span-5 lg:col-span-6 flex flex-col">
        <div className="p-3 border-b border-border flex items-center gap-2 bg-background">
          <div className="w-8 h-8 rounded-full bg-channel-whatsapp/15 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-channel-whatsapp" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold text-foreground">Riya Mehta</div>
            <div className="text-[10px] text-muted-foreground">WhatsApp · +91 98•••110</div>
          </div>
          <span className="ml-auto text-[10px] bg-success/15 text-success px-2 py-0.5 rounded-full font-medium">
            assigned · Aarti
          </span>
        </div>
        <div className="flex-1 p-4 space-y-2 bg-muted/20">
          <div className="max-w-[75%] text-xs p-2.5 rounded-lg bg-background border border-border">
            Hi, my order #5821 — when will it arrive?
          </div>
          <div className="max-w-[75%] text-xs p-2.5 rounded-lg bg-primary text-primary-foreground ml-auto">
            Hi Riya! Out for delivery today, ETA 4–6 PM ✨
          </div>
          <div className="max-w-[75%] text-xs p-2.5 rounded-lg bg-background border border-border">
            Got the order, thanks!
          </div>
        </div>
        <div className="p-3 border-t border-border bg-background flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-muted-foreground" />
          <Smile className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1 text-xs text-muted-foreground bg-muted/40 rounded-md px-3 py-2">
            Type a reply…
          </div>
          <span className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium">
            Send
          </span>
        </div>
      </div>
    </div>
  </Card>
);

export default UnifiedInboxShowcase;
