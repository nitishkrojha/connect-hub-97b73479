import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Copy, Key, ChevronDown, ChevronRight, AlertTriangle, Search, ExternalLink,
  CheckCircle, Send, Inbox, Webhook, ShieldCheck, Zap, Code, FileText,
  MessageSquare, Mail, Phone, Sparkles, Radio, Bot,
} from "lucide-react";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative group">
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={() => copyToClipboard(code)}
    >
      <Copy className="w-3.5 h-3.5" />
    </Button>
    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto text-foreground leading-relaxed font-mono">
      {code}
    </pre>
  </div>
);

interface ApiEntry {
  method: "POST" | "GET" | "PUT" | "DELETE";
  path: string;
  name: string;
  description: string;
  tag: string;
  requestBody?: string;
  responseBody?: string;
  queryParams?: { name: string; type: string; required: boolean; description: string }[];
  notes?: string;
}

const methodColors: Record<string, string> = {
  POST: "bg-channel-whatsapp/10 text-channel-whatsapp border-channel-whatsapp/30",
  GET: "bg-primary/10 text-primary border-primary/30",
  PUT: "bg-warning/10 text-warning border-warning/30",
  DELETE: "bg-destructive/10 text-destructive border-destructive/30",
};

const baseUrl = "https://api.samparq.io/v1";

/* ---------------- SEND (Outbound) endpoints ---------------- */
const sendEndpoints: ApiEntry[] = [
  {
    method: "POST", path: "/send/sms", name: "Send SMS", tag: "SMS",
    description: "Send transactional / promotional / OTP SMS. DLT-compliant in India.",
    requestBody: JSON.stringify({
      to: "+919876543210",
      sender_id: "SAMPRQ",
      template_id: "1107161234567890",
      message: "Your OTP is 482910. Valid for 5 mins.",
      type: "transactional",
      callback_url: "https://yourapp.com/webhook/dlr",
    }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_sms_a1b2", status: "queued", credits_used: 1 }, null, 2),
  },
  {
    method: "POST", path: "/send/whatsapp", name: "Send WhatsApp", tag: "WhatsApp",
    description: "Official WhatsApp Business API — templates, media, buttons, lists, carousels.",
    requestBody: JSON.stringify({
      to: "+919876543210",
      type: "template",
      template: {
        name: "order_shipped",
        language: "en",
        components: [
          { type: "body", parameters: [
            { type: "text", text: "Aman" },
            { type: "text", text: "AWB4821" },
          ]},
          { type: "button", sub_type: "url", index: 0, parameters: [{ type: "text", text: "track/4821" }] },
        ],
      },
    }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_wa_x9y8", status: "queued", wa_id: "919876543210" }, null, 2),
  },
  {
    method: "POST", path: "/send/email", name: "Send Email", tag: "Email",
    description: "SMTP + API delivery. Dynamic templates, attachments, open/click tracking.",
    requestBody: JSON.stringify({
      from: "noreply@yourbrand.com",
      to: ["customer@example.com"],
      cc: [], bcc: [],
      subject: "Your invoice #4821",
      template_id: "tpl_invoice_v3",
      vars: { name: "Aman", amount: "₹1,299" },
      attachments: [{ filename: "invoice.pdf", url: "https://cdn.yourbrand.com/inv/4821.pdf" }],
      track: { opens: true, clicks: true },
    }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_em_p4q5", status: "queued" }, null, 2),
  },
  {
    method: "POST", path: "/send/rcs", name: "Send RCS", tag: "RCS",
    description: "Rich Communication Services — verified sender, rich cards, suggested replies & actions.",
    requestBody: JSON.stringify({
      to: "+919876543210",
      agent_id: "samparq_brand",
      rich_card: {
        title: "Order shipped 🚚",
        description: "AWB4821 · Expected by 24 Apr",
        image_url: "https://cdn.samparq.io/ship.png",
        suggestions: [
          { reply: { text: "Track order", postback: "TRACK_4821" } },
          { action: { text: "Call support", dial: "+918000000000" } },
        ],
      },
    }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_rcs_k1l2", status: "queued" }, null, 2),
  },
  {
    method: "POST", path: "/send/bulk", name: "Bulk Send", tag: "Bulk & Schedule",
    description: "Send up to 100,000 messages in one request across any channel. Optional scheduling.",
    requestBody: JSON.stringify({
      channel: "sms",
      template_id: "tpl_campaign_apr",
      recipients: [
        { to: "+919876543210", variables: { name: "Ravi" } },
        { to: "+919876543211", variables: { name: "Priya" } },
      ],
      campaign_name: "Apr Promo",
      schedule_at: "2026-04-25T09:00:00+05:30",
      callback_url: "https://yourapp.com/webhook/dlr",
    }, null, 2),
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_apr_001", total_recipients: 2, status: "scheduled" }, null, 2),
  },
  {
    method: "POST", path: "/send/api-fetch", name: "API Fetch Send", tag: "Bulk & Schedule",
    description: "Fetch recipients dynamically from your API endpoint and dispatch — no upload needed.",
    requestBody: JSON.stringify({
      channel: "whatsapp",
      template_id: "tpl_reminder",
      api_fetch: {
        url: "https://yourapp.com/api/recipients/today",
        method: "GET",
        headers: { Authorization: "Bearer YOUR_TOKEN" },
        mobile_field: "phone",
        variable_map: { name: "full_name", appt: "appointment_time" },
      },
    }, null, 2),
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_fetch_77", fetched: 1240, status: "processing" }, null, 2),
    notes: "Replaces the legacy DB Fetch — pulls recipients from your REST endpoint at send-time.",
  },
];

/* ---------------- INBOUND / Conversation endpoints ---------------- */
const inboundEndpoints: ApiEntry[] = [
  {
    method: "POST", path: "/webhooks/whatsapp", name: "WhatsApp Inbound Webhook", tag: "WhatsApp",
    description: "Inbound WhatsApp messages, button clicks, list selections, status callbacks.",
    requestBody: JSON.stringify({
      event: "message.received",
      channel: "whatsapp",
      from: "+919876543210",
      to: "+918000000000",
      message: { type: "text", text: "Where is my order?" },
      contact: { name: "Aman", wa_id: "919876543210" },
      timestamp: 1730000000,
    }, null, 2),
    notes: "Configure your webhook URL in Project → Configuration → Webhooks.",
  },
  {
    method: "POST", path: "/webhooks/email", name: "Email Inbound Webhook", tag: "Email",
    description: "Inbound email parsing — threading, attachments, auto-ticketing.",
    requestBody: JSON.stringify({
      event: "email.received",
      from: "customer@example.com",
      to: "support@yourbrand.com",
      subject: "Refund request #4821",
      text: "Hi team, please process refund...",
      thread_id: "th_9k2",
      attachments: [{ filename: "receipt.pdf", url: "https://cdn.samparq.io/att/r.pdf" }],
    }, null, 2),
  },
  {
    method: "POST", path: "/webhooks/social", name: "Social Inbound Webhook", tag: "Social",
    description: "Instagram DMs, Facebook Messenger, X mentions — single unified event schema.",
    requestBody: JSON.stringify({
      event: "message.received",
      channel: "instagram",
      from: { id: "ig_8821", username: "aman.k" },
      message: { type: "text", text: "Is this still in stock?" },
      page_id: "yourbrand_ig",
    }, null, 2),
  },
  {
    method: "POST", path: "/webhooks/voice", name: "IVRS / Voice Webhook", tag: "IVRS",
    description: "Inbound calls, DTMF input, recording URLs, agent transfer events.",
    requestBody: JSON.stringify({
      event: "call.completed",
      from: "+919876543210",
      to: "+918000001234",
      duration: 142,
      dtmf_path: ["1", "3"],
      recording_url: "https://cdn.samparq.io/rec/abc.mp3",
      transferred_to_agent: "agent_22",
    }, null, 2),
  },
  {
    method: "POST", path: "/webhooks/chatbot", name: "Chatbot Webhook", tag: "Chatbot",
    description: "Web/app chatbot turns, intent + entity payloads, agent handover events.",
    requestBody: JSON.stringify({
      event: "bot.handover",
      session_id: "sess_71x",
      user: { id: "u_882", email: "aman@x.com" },
      intent: "refund.status",
      confidence: 0.42,
      transcript: [
        { role: "user", text: "Where is my refund?" },
        { role: "bot", text: "Let me connect you to an agent." },
      ],
    }, null, 2),
  },
  {
    method: "GET", path: "/conversations", name: "List Conversations", tag: "Inbox",
    description: "Fetch unified inbox conversations across all inbound channels.",
    queryParams: [
      { name: "channel", type: "string", required: false, description: "whatsapp | email | instagram | voice | chatbot" },
      { name: "status", type: "string", required: false, description: "open | pending | resolved" },
      { name: "assigned_to", type: "string", required: false, description: "Agent ID" },
      { name: "limit", type: "number", required: false, description: "Default 50, max 200" },
    ],
    responseBody: JSON.stringify({
      success: true,
      conversations: [
        { id: "conv_a1", channel: "whatsapp", from: "+919876543210", last_message: "Where is my order?", status: "open", unread: 2, updated_at: "2026-04-22T10:30:00Z" },
      ],
      total: 1,
    }, null, 2),
  },
  {
    method: "POST", path: "/conversations/:id/reply", name: "Reply to Conversation", tag: "Inbox",
    description: "Send an agent reply into an open inbound conversation thread.",
    requestBody: JSON.stringify({ text: "Your order AWB4821 is out for delivery today.", agent_id: "agent_22" }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_reply_88" }, null, 2),
  },
];

/* ---------------- Platform endpoints (status, reports, templates) ---------------- */
const platformEndpoints: ApiEntry[] = [
  {
    method: "GET", path: "/message/:message_id", name: "Get Message Status", tag: "Status & DLR",
    description: "Retrieve unified delivery status of a sent message across any channel.",
    responseBody: JSON.stringify({ success: true, message_id: "msg_sms_a1b2", channel: "sms", status: "delivered", delivered_at: "2026-04-22T10:30:12Z", credits_used: 1 }, null, 2),
  },
  {
    method: "POST", path: "/webhooks/dlr", name: "Delivery Status Webhook", tag: "Status & DLR",
    description: "Unified DLR payload sent to your callback_url when status changes.",
    requestBody: JSON.stringify({ event: "message.delivered", message_id: "msg_sms_a1b2", channel: "sms", to: "+919876543210", status: "delivered", timestamp: "2026-04-22T10:30:12Z" }, null, 2),
    notes: "Events: message.queued, message.sent, message.delivered, message.failed, message.read",
  },
  {
    method: "GET", path: "/reports/campaign/:campaign_id", name: "Campaign Report", tag: "Reports",
    description: "Detailed delivery report for a campaign with timeline and failure breakdown.",
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_apr_001", summary: { total: 5000, delivered: 4850, failed: 100, delivery_rate: "97.0%" } }, null, 2),
  },
  {
    method: "GET", path: "/stats/quota", name: "Quota Usage", tag: "Reports",
    description: "Check current plan quota and per-channel usage.",
    responseBody: JSON.stringify({ success: true, plan: "growth", quotas: { sms: { daily_limit: 10000, daily_used: 3500 }, whatsapp: { daily_limit: 5000, daily_used: 1200 } } }, null, 2),
  },
  {
    method: "GET", path: "/templates", name: "List Templates", tag: "Templates",
    description: "List approved templates across SMS / WhatsApp / Email / RCS.",
    responseBody: JSON.stringify({ success: true, templates: [{ id: "tpl_otp_verify", channel: "sms", status: "approved", dlt_template_id: "1107161234567890" }] }, null, 2),
  },
  {
    method: "POST", path: "/templates", name: "Create Template", tag: "Templates",
    description: "Submit a new template for approval (SMS DLT / WhatsApp / RCS).",
    requestBody: JSON.stringify({ name: "Event Reminder", channel: "sms", body: "Hi {{name}}, reminder for {{event}} on {{date}}.", variables: ["name", "event", "date"], dlt_template_id: "1107161234567999" }, null, 2),
    responseBody: JSON.stringify({ success: true, id: "tpl_event_remind", status: "pending_approval" }, null, 2),
  },
];

const ApiEndpointItem = ({ api }: { api: ApiEntry }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
      >
        <Badge className={`${methodColors[api.method]} font-mono text-xs min-w-[52px] justify-center`}>{api.method}</Badge>
        <code className="text-sm font-mono text-foreground flex-1">{api.path}</code>
        <span className="text-sm text-muted-foreground hidden sm:block">{api.name}</span>
        {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>
      {expanded && (
        <div className="border-t border-border p-4 space-y-4 bg-card">
          <p className="text-sm text-muted-foreground">{api.description}</p>

          {api.queryParams && api.queryParams.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Query Parameters</p>
              <div className="overflow-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-3 py-2 text-left text-foreground">Parameter</th>
                      <th className="px-3 py-2 text-left text-foreground">Type</th>
                      <th className="px-3 py-2 text-left text-foreground">Required</th>
                      <th className="px-3 py-2 text-left text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {api.queryParams.map(p => (
                      <tr key={p.name} className="border-t border-border">
                        <td className="px-3 py-2 font-mono text-foreground">{p.name}</td>
                        <td className="px-3 py-2 text-muted-foreground">{p.type}</td>
                        <td className="px-3 py-2">{p.required ? <Badge variant="destructive" className="text-[10px] h-5">Required</Badge> : <span className="text-muted-foreground">Optional</span>}</td>
                        <td className="px-3 py-2 text-muted-foreground">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {api.requestBody && (
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Request Body</p>
              <CodeBlock code={api.requestBody} />
            </div>
          )}

          {api.responseBody && (
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Response</p>
              <CodeBlock code={api.responseBody} />
            </div>
          )}

          {api.notes && (
            <div className="p-3 rounded-lg bg-info/5 border border-info/20 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-primary" /> {api.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const tagIcons: Record<string, typeof MessageSquare> = {
  SMS: MessageSquare, WhatsApp: Phone, Email: Mail, RCS: Sparkles,
  Social: Radio, IVRS: Phone, Chatbot: Bot, Inbox: Inbox,
  "Bulk & Schedule": Zap, "Status & DLR": CheckCircle, Reports: FileText, Templates: FileText,
};

const GroupedList = ({ endpoints }: { endpoints: ApiEntry[] }) => {
  const grouped: Record<string, ApiEntry[]> = {};
  endpoints.forEach(e => {
    if (!grouped[e.tag]) grouped[e.tag] = [];
    grouped[e.tag].push(e);
  });
  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([tag, list]) => {
        const Icon = tagIcons[tag] ?? ExternalLink;
        return (
          <div key={tag} className="space-y-3">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              {tag}
              <Badge variant="secondary" className="text-xs">{list.length}</Badge>
            </h3>
            <div className="space-y-2">
              {list.map((api, idx) => <ApiEndpointItem key={`${api.method}-${api.path}-${idx}`} api={api} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const featureGuides = [
  { icon: Key, title: "Authentication", desc: "Bearer tokens, project-scoped API keys, IP allow-list, key rotation." },
  { icon: ShieldCheck, title: "Webhook Security", desc: "HMAC SHA-256 signing, replay protection, retry & exponential backoff." },
  { icon: Webhook, title: "Status Callbacks", desc: "Unified DLR schema — sent · delivered · read · failed across all channels." },
  { icon: Zap, title: "Bulk & API Fetch", desc: "Up to 100k messages per request. Pull recipients live from your REST API." },
  { icon: Code, title: "Official SDKs", desc: "Type-safe Node, Python, Go, PHP, Java clients with retry built-in." },
  { icon: FileText, title: "Recipes", desc: "OTP login, abandoned-cart WA, support inbox handoff, IVRS smart routing." },
];

const DeveloperDocsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterFn = (api: ApiEntry) =>
    !searchTerm ||
    api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.description.toLowerCase().includes(searchTerm.toLowerCase());

  const sendFiltered = sendEndpoints.filter(filterFn);
  const inboundFiltered = inboundEndpoints.filter(filterFn);
  const platformFiltered = platformEndpoints.filter(filterFn);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Developers</h1>
        <p className="text-muted-foreground mt-1">
          Two clean API surfaces — <strong className="text-foreground">Send Message</strong> for outbound and{" "}
          <strong className="text-foreground">Conversation API</strong> for inbound. Same auth, same DLR schema, all channels.
        </p>
      </div>

      {/* Auth quick start */}
      <Card className="shadow-card border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-foreground">Authentication</h3>
              <p className="text-sm text-muted-foreground">All requests use a Bearer token tied to your project. Get it from <strong className="text-foreground">Configuration → General</strong>.</p>
              <CodeBlock code={`Authorization: Bearer YOUR_PROJECT_API_KEY\nContent-Type: application/json\nX-Project-Code: YOUR_PROJECT_CODE`} />
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="text-xs">Base URL</Badge>
                <code className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded">{baseUrl}</code>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(baseUrl)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search APIs by name, path, or description..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs: Send / Conversation / Platform */}
      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3 h-auto">
          <TabsTrigger value="send" className="gap-2 py-2">
            <Send className="w-4 h-4" /> <span className="hidden sm:inline">Send Message API</span><span className="sm:hidden">Send</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{sendFiltered.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inbound" className="gap-2 py-2">
            <Inbox className="w-4 h-4" /> <span className="hidden sm:inline">Conversation API</span><span className="sm:hidden">Inbox</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{inboundFiltered.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="platform" className="gap-2 py-2">
            <Webhook className="w-4 h-4" /> <span className="hidden sm:inline">Status, Reports & Templates</span><span className="sm:hidden">Platform</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{platformFiltered.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="mt-6 space-y-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Send className="w-4 h-4 text-primary" /> Outbound — Send Message API</h2>
              <p className="text-sm text-muted-foreground mt-1">Push messages over <strong>SMS, WhatsApp, Email, RCS</strong>. Single endpoint family with channel-specific payloads. Bulk + API Fetch supported.</p>
            </CardContent>
          </Card>
          {sendFiltered.length > 0 ? <GroupedList endpoints={sendFiltered} /> : <EmptyState />}
        </TabsContent>

        <TabsContent value="inbound" className="mt-6 space-y-4">
          <Card className="border-l-4 border-l-success">
            <CardContent className="pt-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Inbox className="w-4 h-4 text-success" /> Inbound — Conversation API / Message In</h2>
              <p className="text-sm text-muted-foreground mt-1">Receive inbound on <strong>WhatsApp, Email, Social (IG / FB / X), IVRS / Voice and Chatbot</strong>. Every event lands in the unified inbox.</p>
            </CardContent>
          </Card>
          {inboundFiltered.length > 0 ? <GroupedList endpoints={inboundFiltered} /> : <EmptyState />}
        </TabsContent>

        <TabsContent value="platform" className="mt-6 space-y-4">
          <Card className="border-l-4 border-l-info">
            <CardContent className="pt-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Webhook className="w-4 h-4 text-info" /> Platform APIs</h2>
              <p className="text-sm text-muted-foreground mt-1">Status & DLR webhooks, reports, quota, and template management — shared across send and inbound.</p>
            </CardContent>
          </Card>
          {platformFiltered.length > 0 ? <GroupedList endpoints={platformFiltered} /> : <EmptyState />}
        </TabsContent>
      </Tabs>

      {/* Feature guides */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Platform guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureGuides.map(g => (
            <Card key={g.title} className="shadow-card hover:shadow-card-hover transition-all">
              <CardContent className="pt-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <g.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{g.title}</h3>
                <p className="text-xs text-muted-foreground mt-1.5">{g.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status & error tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">HTTP Status Codes</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr><th className="px-3 py-2 text-left text-foreground">Code</th><th className="px-3 py-2 text-left text-foreground">Description</th></tr>
                </thead>
                <tbody>
                  {[
                    ["200", "Request processed successfully"],
                    ["202", "Bulk request accepted for processing"],
                    ["400", "Invalid request body or missing fields"],
                    ["401", "Invalid or missing API key"],
                    ["403", "Insufficient permissions"],
                    ["404", "Resource not found"],
                    ["429", "Rate limit exceeded"],
                    ["500", "Internal server error"],
                  ].map(([code, desc]) => (
                    <tr key={code} className="border-t border-border">
                      <td className="px-3 py-2 font-mono text-foreground font-medium">{code}</td>
                      <td className="px-3 py-2 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Delivery Error Codes</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr><th className="px-3 py-2 text-left text-foreground">Code</th><th className="px-3 py-2 text-left text-foreground">Description</th></tr>
                </thead>
                <tbody>
                  {[
                    ["INVALID_NUMBER", "Phone number is invalid or not in service"],
                    ["DND_REGISTERED", "Number on Do Not Disturb registry"],
                    ["TEMPLATE_MISMATCH", "Message doesn't match approved DLT template"],
                    ["QUOTA_EXCEEDED", "Daily or overall quota limit reached"],
                    ["CHANNEL_DISABLED", "Channel not enabled for project"],
                    ["PROVIDER_ERROR", "Third-party provider error"],
                    ["RATE_LIMITED", "Sending rate too high"],
                    ["EXPIRED", "Message expired before delivery"],
                  ].map(([code, desc]) => (
                    <tr key={code} className="border-t border-border">
                      <td className="px-3 py-2 font-mono text-foreground font-medium">{code}</td>
                      <td className="px-3 py-2 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Rate Limits</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-auto rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead className="bg-muted">
                <tr><th className="px-4 py-2 text-left text-foreground">Endpoint</th><th className="px-4 py-2 text-left text-foreground">Limit</th><th className="px-4 py-2 text-left text-foreground">Window</th></tr>
              </thead>
              <tbody>
                {[
                  ["/send/sms · /send/whatsapp · /send/email · /send/rcs", "60 requests", "per minute"],
                  ["/send/bulk · /send/api-fetch", "10 requests", "per minute"],
                  ["/conversations · /conversations/:id/reply", "120 requests", "per minute"],
                  ["/reports/*", "30 requests", "per minute"],
                  ["/templates", "60 requests", "per minute"],
                ].map(([ep, limit, window]) => (
                  <tr key={ep} className="border-t border-border">
                    <td className="px-4 py-2 font-mono text-foreground">{ep}</td>
                    <td className="px-4 py-2 text-muted-foreground">{limit}</td>
                    <td className="px-4 py-2 text-muted-foreground">{window}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 text-xs text-muted-foreground">
            <AlertTriangle className="w-4 h-4 inline mr-1 text-warning" />
            Rate limit headers (<code className="bg-muted px-1 rounded">X-RateLimit-Remaining</code>, <code className="bg-muted px-1 rounded">X-RateLimit-Reset</code>) are included in every response.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-12 text-muted-foreground">
    <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
    <p>No APIs match your search.</p>
  </div>
);

export default DeveloperDocsPage;
