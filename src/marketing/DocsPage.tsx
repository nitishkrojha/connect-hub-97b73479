import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  BookOpen, Code, Key, Send, Inbox, ArrowRight, Megaphone, PhoneCall,
  MessageSquare, Mail, Phone, Sparkles, Radio, Bot, Copy, Check,
  ShieldCheck, Zap, GitBranch, FileText, Instagram, Facebook, Mic,
} from "lucide-react";

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

type Endpoint = {
  id: string;
  label: string;
  icon: typeof MessageSquare;
  color: string;
  endpoint: string;
  desc: string;
  body: string;
};

/* ---------------- CAMPAIGNS (Outbound Send Message) ---------------- */
const campaignEndpoints: Endpoint[] = [
  {
    id: "sms", label: "SMS", icon: MessageSquare, color: "text-channel-sms",
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
    id: "whatsapp", label: "WhatsApp", icon: Phone, color: "text-channel-whatsapp",
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
    id: "email", label: "Email", icon: Mail, color: "text-channel-email",
    endpoint: "POST /v1/send/email",
    desc: "SMTP + API delivery, dynamic templates, attachments, tracking pixels.",
    body: `{
  "from": "noreply@yourbrand.com",
  "to": ["customer@example.com"],
  "subject": "Your invoice #4821",
  "template_id": "tpl_invoice_v3",
  "vars": { "name": "Aman", "amount": "₹1,299" }
}`,
  },
  {
    id: "rcs", label: "RCS", icon: Sparkles, color: "text-channel-rcs",
    endpoint: "POST /v1/send/rcs",
    desc: "Rich Communication Services — carousels, suggested replies, verified sender.",
    body: `{
  "to": "+919876543210",
  "agent_id": "samparq_brand",
  "rich_card": {
    "title": "Order shipped 🚚",
    "description": "AWB4821 · Expected by 24 Apr",
    "suggestions": [
      { "reply": { "text": "Track order", "postback": "TRACK_4821" }}
    ]
  }
}`,
  },
];

/* ---------------- CONVERSATION (Inbound webhooks) ---------------- */
const conversationEndpoints: Endpoint[] = [
  {
    id: "wa-in", label: "WhatsApp", icon: Phone, color: "text-channel-whatsapp",
    endpoint: "Webhook · /webhooks/whatsapp",
    desc: "Inbound WA messages, button clicks, list selections, status callbacks.",
    body: `{
  "event": "message.received",
  "channel": "whatsapp",
  "from": "+919876543210",
  "message": { "type": "text", "text": "Where is my order?" },
  "contact": { "name": "Aman", "wa_id": "919876543210" },
  "timestamp": 1730000000
}`,
  },
  {
    id: "email-in", label: "Email", icon: Mail, color: "text-channel-email",
    endpoint: "Webhook · /webhooks/email",
    desc: "Inbound email parsing — threading, attachments, auto-ticketing.",
    body: `{
  "event": "email.received",
  "from": "customer@example.com",
  "to": "support@yourbrand.com",
  "subject": "Refund request #4821",
  "thread_id": "th_9k2"
}`,
  },
  {
    id: "ig-in", label: "Instagram", icon: Instagram, color: "text-pink-500",
    endpoint: "Webhook · /webhooks/instagram",
    desc: "Instagram DMs, story replies, comment mentions — single event schema.",
    body: `{
  "event": "message.received",
  "channel": "instagram",
  "from": { "id": "ig_8821", "username": "aman.k" },
  "message": { "type": "text", "text": "Is this still in stock?" }
}`,
  },
  {
    id: "fb-in", label: "Messenger", icon: Facebook, color: "text-blue-500",
    endpoint: "Webhook · /webhooks/messenger",
    desc: "Facebook Messenger inbound, quick replies, postbacks.",
    body: `{
  "event": "message.received",
  "channel": "messenger",
  "from": { "id": "psid_88x", "name": "Aman" },
  "message": { "type": "text", "text": "Need help with order" }
}`,
  },
  {
    id: "bot-in", label: "Web Chat / Bot", icon: Bot, color: "text-amber-500",
    endpoint: "Webhook · /webhooks/chatbot",
    desc: "Web/app chatbot turns, intent + entity payloads, handover events.",
    body: `{
  "event": "bot.handover",
  "session_id": "sess_71x",
  "intent": "refund.status",
  "confidence": 0.42,
  "transcript": [
    { "role": "user", "text": "Where is my refund?" }
  ]
}`,
  },
];

/* ---------------- VOICE (IVRS, OBD, Click-to-call) ---------------- */
const voiceEndpoints: Endpoint[] = [
  {
    id: "obd", label: "Voice Broadcast (OBD)", icon: Radio, color: "text-purple-500",
    endpoint: "POST /v1/voice/obd",
    desc: "Outbound dial campaigns with audio + DTMF capture and retries.",
    body: `{
  "campaign_name": "feedback_apr",
  "caller_id": "+918000001234",
  "audio_url": "https://cdn.samparq.io/feedback.mp3",
  "recipients": ["+919876543210", "+919998887776"],
  "dtmf": { "capture": true, "max_digits": 1 }
}`,
  },
  {
    id: "c2c", label: "Click-to-call", icon: Mic, color: "text-emerald-500",
    endpoint: "POST /v1/voice/c2c",
    desc: "Bridge agent ↔ customer on demand from your app or CRM.",
    body: `{
  "agent_number": "+918000004444",
  "customer_number": "+919876543210",
  "caller_id": "+918000001234",
  "record": true
}`,
  },
  {
    id: "ivrs-in", label: "IVRS Webhook", icon: PhoneCall, color: "text-channel-ivrs",
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
];

const EndpointCard = ({ ep, badge }: { ep: Endpoint; badge: string }) => (
  <Card className="p-5">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0">
        <ep.icon className={`w-5 h-5 ${ep.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-foreground">{ep.label}</h3>
          <Badge variant="secondary" className="text-[10px]">{badge}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{ep.desc}</p>
      </div>
    </div>
    <div className="text-[11px] font-mono text-muted-foreground mb-2">{ep.endpoint}</div>
    <CodeBlock code={ep.body} />
  </Card>
);

const guides = [
  { icon: Key, title: "Authentication", desc: "Bearer tokens, project-scoped API keys, IP allow-list, key rotation." },
  { icon: ShieldCheck, title: "Webhook Security", desc: "HMAC SHA-256 signing, replay protection, retry & backoff policy." },
  { icon: GitBranch, title: "Status Callbacks", desc: "Sent · Delivered · Read · Failed — unified DLR schema across channels." },
  { icon: Zap, title: "Bulk & Scheduled", desc: "Send up to 100k messages per request, schedule in any timezone." },
  { icon: Code, title: "SDKs", desc: "Official Node, Python, Go, PHP, Java with type-safe clients." },
  { icon: FileText, title: "Recipes", desc: "OTP login, abandoned-cart WA, support inbox, IVRS routing." },
];

const sections = [
  {
    id: "campaigns",
    icon: Megaphone,
    tone: "bg-primary/10",
    fg: "text-primary",
    eyebrow: "Outbound",
    title: "Campaigns API",
    desc: "Send transactional & promotional messages across SMS, WhatsApp, Email and RCS — one auth, one DLR schema.",
    endpoints: campaignEndpoints,
    badge: "Send",
  },
  {
    id: "conversation",
    icon: Inbox,
    tone: "bg-success/10",
    fg: "text-success",
    eyebrow: "Inbound",
    title: "Conversation API",
    desc: "Webhook events for every reply across WhatsApp, Email, Instagram, Messenger and chatbots — unified payloads.",
    endpoints: conversationEndpoints,
    badge: "Webhook",
  },
  {
    id: "voice",
    icon: PhoneCall,
    tone: "bg-channel-ivrs/10",
    fg: "text-channel-ivrs",
    eyebrow: "Voice",
    title: "Voice & IVR API",
    desc: "Outbound dial broadcasts, click-to-call bridges and inbound IVR webhooks — recordings and DTMF included.",
    endpoints: voiceEndpoints,
    badge: "Voice",
  },
];

const DocsPage = () => (
  <div className="bg-background">
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-info/10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          <BookOpen className="w-3.5 h-3.5" /> Developer Docs
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-5 tracking-tight">
          Build with Samparq APIs
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
          Three clean API surfaces — <strong className="text-foreground">Campaigns</strong>,{" "}
          <strong className="text-foreground">Conversation</strong> and{" "}
          <strong className="text-foreground">Voice</strong>. Same auth, same DLR schema, every channel.
        </p>

        {/* Quick nav */}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors"
            >
              <s.icon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
              {s.title}
            </a>
          ))}
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {/* Auth quick start */}
      <Card className="p-6 bg-sidebar text-sidebar-foreground border-0">
        <div className="flex items-center gap-2 mb-3 text-xs">
          <Key className="w-3.5 h-3.5" /> Authentication · Bearer token (same for all 3 APIs)
        </div>
        <CodeBlock
          code={`# Every request uses your project API key
curl https://api.samparq.io/v1/ping \\
  -H "Authorization: Bearer sk_live_xxxxxxxxxxxxxxxx"`}
        />
      </Card>

      {/* Three sections, separated */}
      {sections.map((sec, i) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`scroll-mt-24 pt-16 ${i !== sections.length - 1 ? "pb-16 border-b border-border" : "pt-16"}`}
        >
          <div className="flex items-start gap-4 mb-8">
            <div className={`w-14 h-14 rounded-2xl ${sec.tone} flex items-center justify-center flex-shrink-0`}>
              <sec.icon className={`w-7 h-7 ${sec.fg}`} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                {sec.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{sec.title}</h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{sec.desc}</p>
            </div>
          </div>

          <Tabs defaultValue={sec.endpoints[0].id} className="w-full">
            <TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-muted/50 p-1">
              {sec.endpoints.map((ep) => (
                <TabsTrigger key={ep.id} value={ep.id} className="gap-1.5 text-xs">
                  <ep.icon className={`w-3.5 h-3.5 ${ep.color}`} />
                  {ep.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {sec.endpoints.map((ep) => (
              <TabsContent key={ep.id} value={ep.id} className="mt-5">
                <EndpointCard ep={ep} badge={sec.badge} />
              </TabsContent>
            ))}
          </Tabs>
        </section>
      ))}

      {/* Guides */}
      <section className="pt-16">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Platform guides</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Auth, webhooks, callbacks, SDKs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g) => (
            <Card key={g.title} className="p-5 hover:shadow-card-hover transition-all hover:-translate-y-0.5 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <g.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{g.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{g.desc}</p>
              <div className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                Read guide <ArrowRight className="w-3 h-3" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link to="/login">
          <Button size="lg" className="rounded-full px-7 font-semibold">
            <BookOpen className="w-4 h-4 mr-1.5" /> Get an API key
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default DocsPage;
