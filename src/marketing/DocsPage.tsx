import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  BookOpen, Code, Webhook, Key, Send, Inbox, ArrowRight,
  MessageSquare, Mail, Phone, Sparkles, Radio, Bot, Copy, Check,
  ShieldCheck, Zap, GitBranch, FileText,
} from "lucide-react";

/* ---------------- Send (Outbound) endpoints ---------------- */
const sendChannels = [
  {
    id: "sms",
    label: "SMS",
    icon: MessageSquare,
    endpoint: "POST /v1/send/sms",
    desc: "Transactional & promotional SMS, OTP, DLT-compliant in India.",
    body: `{
  "to": "+919876543210",
  "sender_id": "SAMPRQ",
  "template_id": "1107xxxxxxxx",
  "message": "Your OTP is 482910. Valid for 5 mins.",
  "type": "transactional"
}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: Phone,
    endpoint: "POST /v1/send/whatsapp",
    desc: "Official WhatsApp Business API — templates, media, buttons, lists.",
    body: `{
  "to": "+919876543210",
  "type": "template",
  "template": {
    "name": "order_shipped",
    "language": "en",
    "components": [
      { "type": "body", "parameters": [
        { "type": "text", "text": "Aman" },
        { "type": "text", "text": "AWB4821" }
      ]}
    ]
  }
}`,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    endpoint: "POST /v1/send/email",
    desc: "SMTP + API delivery, dynamic templates, attachments, tracking pixels.",
    body: `{
  "from": "noreply@yourbrand.com",
  "to": ["customer@example.com"],
  "subject": "Your invoice #4821",
  "template_id": "tpl_invoice_v3",
  "vars": { "name": "Aman", "amount": "₹1,299" },
  "attachments": [{ "filename": "invoice.pdf", "url": "https://..." }]
}`,
  },
  {
    id: "rcs",
    label: "RCS",
    icon: Sparkles,
    endpoint: "POST /v1/send/rcs",
    desc: "Rich Communication Services — carousels, suggested replies, verified sender.",
    body: `{
  "to": "+919876543210",
  "agent_id": "samparq_brand",
  "rich_card": {
    "title": "Order shipped 🚚",
    "description": "AWB4821 · Expected by 24 Apr",
    "image_url": "https://cdn.samparq.io/ship.png",
    "suggestions": [
      { "reply": { "text": "Track order", "postback": "TRACK_4821" }},
      { "action": { "text": "Call support", "dial": "+918000000000" }}
    ]
  }
}`,
  },
];

/* ---------------- Conversation / Inbound endpoints ---------------- */
const inboundChannels = [
  {
    id: "wa-in",
    label: "WhatsApp",
    icon: Phone,
    endpoint: "Webhook · /webhooks/whatsapp",
    desc: "Inbound WA messages, button clicks, list selections, status callbacks.",
    body: `{
  "event": "message.received",
  "channel": "whatsapp",
  "from": "+919876543210",
  "to": "+918000000000",
  "message": { "type": "text", "text": "Where is my order?" },
  "contact": { "name": "Aman", "wa_id": "919876543210" },
  "timestamp": 1730000000
}`,
  },
  {
    id: "email-in",
    label: "Email",
    icon: Mail,
    endpoint: "Webhook · /webhooks/email",
    desc: "Inbound email parsing — threading, attachments, auto-ticketing.",
    body: `{
  "event": "email.received",
  "from": "customer@example.com",
  "to": "support@yourbrand.com",
  "subject": "Refund request #4821",
  "text": "Hi team, please process refund...",
  "thread_id": "th_9k2",
  "attachments": [{ "filename": "receipt.pdf", "url": "https://..." }]
}`,
  },
  {
    id: "social-in",
    label: "Social",
    icon: Radio,
    endpoint: "Webhook · /webhooks/social",
    desc: "Instagram DMs, Facebook Messenger, X mentions — single event schema.",
    body: `{
  "event": "message.received",
  "channel": "instagram",
  "from": { "id": "ig_8821", "username": "aman.k" },
  "message": { "type": "text", "text": "Is this still in stock?" },
  "page_id": "yourbrand_ig"
}`,
  },
  {
    id: "ivrs-in",
    label: "IVRS / Voice",
    icon: Phone,
    endpoint: "Webhook · /webhooks/voice",
    desc: "Inbound calls, DTMF input, recording URLs, agent transfer events.",
    body: `{
  "event": "call.completed",
  "from": "+919876543210",
  "to": "+918000001234",
  "duration": 142,
  "dtmf_path": ["1", "3"],
  "recording_url": "https://cdn.samparq.io/rec/abc.mp3",
  "transferred_to_agent": "agent_22"
}`,
  },
  {
    id: "chatbot-in",
    label: "Chatbot",
    icon: Bot,
    endpoint: "Webhook · /webhooks/chatbot",
    desc: "Web/app chatbot turns, intent + entity payloads, handover events.",
    body: `{
  "event": "bot.handover",
  "session_id": "sess_71x",
  "user": { "id": "u_882", "email": "aman@x.com" },
  "intent": "refund.status",
  "confidence": 0.42,
  "transcript": [
    { "role": "user", "text": "Where is my refund?" },
    { "role": "bot", "text": "Let me connect you to an agent." }
  ]
}`,
  },
];

/* ---------------- Reusable code block ---------------- */
const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative group">
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 z-10 flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-sidebar-accent/40 text-sidebar-foreground hover:bg-sidebar-accent/60 transition opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="text-[12px] sm:text-xs font-mono overflow-x-auto leading-relaxed p-4 rounded-lg bg-sidebar text-sidebar-foreground">
        {code}
      </pre>
    </div>
  );
};

/* ---------------- Channel card list ---------------- */
type Channel = {
  id: string; label: string; icon: typeof MessageSquare;
  endpoint: string; desc: string; body: string;
};

const ChannelGroup = ({ channels, mode }: { channels: Channel[]; mode: "send" | "inbound" }) => (
  <div className="grid lg:grid-cols-2 gap-5">
    {channels.map((c) => (
      <Card key={c.id} className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <c.icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">{c.label}</h3>
              <Badge variant="secondary" className="text-[10px]">{mode === "send" ? "Outbound" : "Inbound"}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
          </div>
        </div>
        <div className="text-[11px] font-mono text-muted-foreground mb-2 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${mode === "send" ? "bg-primary" : "bg-success"}`} />
          {c.endpoint}
        </div>
        <CodeBlock code={c.body} />
      </Card>
    ))}
  </div>
);

const guides = [
  { icon: Key, title: "Authentication", desc: "Bearer tokens, project-scoped API keys, IP allow-list, key rotation." },
  { icon: ShieldCheck, title: "Webhook Security", desc: "HMAC SHA-256 signing, replay protection, retry & backoff policy." },
  { icon: GitBranch, title: "Status Callbacks", desc: "Sent · Delivered · Read · Failed — unified DLR schema across channels." },
  { icon: Zap, title: "Bulk & Scheduled", desc: "Send up to 100k messages per request, schedule in any timezone." },
  { icon: Code, title: "SDKs", desc: "Official Node, Python, Go, PHP, Java with type-safe clients." },
  { icon: FileText, title: "Recipes", desc: "OTP login, abandoned-cart WA, support inbox, IVRS routing." },
];

const DocsPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs uppercase tracking-wide font-semibold text-primary">Developer Docs</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2">Build with Samparq APIs</h1>
      <p className="text-muted-foreground mt-4">
        Two clean API surfaces — <strong className="text-foreground">Send Message</strong> for outbound,{" "}
        <strong className="text-foreground">Conversation API</strong> for inbound. Same auth, same DLR schema, all channels.
      </p>
    </div>

    {/* Auth quick start */}
    <Card className="mt-10 p-6 bg-sidebar text-sidebar-foreground border-0">
      <div className="flex items-center gap-2 mb-3 text-xs">
        <Key className="w-3.5 h-3.5" /> Authentication · Bearer token
      </div>
      <CodeBlock
        code={`# Every request uses your project API key
curl https://api.samparq.io/v1/ping \\
  -H "Authorization: Bearer sk_live_xxxxxxxxxxxxxxxx"`}
      />
    </Card>

    {/* Tabs: Send vs Conversation */}
    <Tabs defaultValue="send" className="mt-12">
      <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 mb-6">
        <TabsTrigger value="send" className="gap-2">
          <Send className="w-4 h-4" /> Send Message API
        </TabsTrigger>
        <TabsTrigger value="inbound" className="gap-2">
          <Inbox className="w-4 h-4" /> Conversation API
        </TabsTrigger>
      </TabsList>

      <TabsContent value="send">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-foreground">Outbound — Send Message API</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Push messages on SMS, WhatsApp, Email and RCS. Single endpoint family, channel-specific payloads.
          </p>
        </div>
        <ChannelGroup channels={sendChannels} mode="send" />
      </TabsContent>

      <TabsContent value="inbound">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-foreground">Inbound — Conversation API / Message In</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Subscribe to webhooks for WhatsApp, Email, Social, IVRS / Voice and Chatbot. Every event lands in the unified inbox.
          </p>
        </div>
        <ChannelGroup channels={inboundChannels} mode="inbound" />
      </TabsContent>
    </Tabs>

    {/* Guides grid */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-foreground text-center">Platform guides</h2>
      <p className="text-muted-foreground text-center mt-2 text-sm">Auth, webhooks, callbacks, SDKs and ready-made recipes.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {guides.map((s) => (
          <Card key={s.title} className="p-5 hover:shadow-card-hover transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{s.desc}</p>
            <div className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
              Read guide <ArrowRight className="w-3 h-3" />
            </div>
          </Card>
        ))}
      </div>
    </div>

    <div className="text-center mt-12">
      <Link to="/login">
        <Button size="lg" className="bg-gradient-to-r from-primary to-info">
          <BookOpen className="w-4 h-4" /> Get an API key
        </Button>
      </Link>
    </div>
  </div>
);

export default DocsPage;
