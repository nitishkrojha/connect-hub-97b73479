import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Key, ChevronDown, ChevronRight, AlertTriangle, Search, ExternalLink, CheckCircle } from "lucide-react";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => (
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

const baseUrl = "https://api.dicnotifier.io/v1";

const apiEndpoints: ApiEntry[] = [
  // Messaging
  {
    method: "POST", path: "/message/send", name: "Send Single Message", tag: "Messaging",
    description: "Send a message to a single recipient via SMS, WhatsApp, Email, or RCS channel.",
    requestBody: JSON.stringify({ channel: "sms", to: "+919876543210", template_id: "tpl_otp_verify", variables: { otp: "482901", name: "Ravi Kumar" }, sender_id: "DICNTFY", callback_url: "https://yourapp.com/webhook/delivery" }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_a1b2c3d4e5f6", channel: "sms", status: "queued", credits_used: 1, timestamp: "2026-04-11T10:30:00Z" }, null, 2),
  },
  {
    method: "POST", path: "/message/send-email", name: "Send Email", tag: "Messaging",
    description: "Send an email with subject, HTML body, and optional attachments.",
    requestBody: JSON.stringify({ to: "user@example.com", subject: "Welcome to My Bharat", body_html: "<h1>Welcome {{name}}</h1><p>Thank you for registering.</p>", variables: { name: "Ravi Kumar" }, from_name: "My Bharat Team", reply_to: "support@mybharat.gov.in", attachments: [{ filename: "welcome.pdf", content_base64: "JVBERi0xLjQ..." }] }, null, 2),
    responseBody: JSON.stringify({ success: true, message_id: "msg_e1f2g3h4", channel: "email", status: "queued", timestamp: "2026-04-11T10:30:00Z" }, null, 2),
  },
  {
    method: "POST", path: "/message/bulk", name: "Bulk Send", tag: "Messaging",
    description: "Send messages to multiple recipients at once. Supports up to 100,000 recipients per request.",
    requestBody: JSON.stringify({ channel: "sms", template_id: "tpl_campaign_update", recipients: [{ to: "+919876543210", variables: { name: "Ravi" } }, { to: "+919876543211", variables: { name: "Priya" } }], campaign_name: "Jan 2026 Update", sender_id: "DICNTFY", schedule_at: "2026-04-12T09:00:00Z", callback_url: "https://yourapp.com/webhook/bulk-delivery" }, null, 2),
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_x7y8z9w0", total_recipients: 2, status: "processing", estimated_completion: "2026-04-12T09:05:00Z" }, null, 2),
  },
  {
    method: "POST", path: "/message/bulk-csv", name: "Bulk Send via CSV", tag: "Messaging",
    description: "Upload a CSV file with recipient data for bulk messaging (multipart/form-data).",
    requestBody: `curl -X POST ${baseUrl}/message/bulk-csv \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@recipients.csv" \\
  -F "channel=sms" \\
  -F "template_id=tpl_campaign_update" \\
  -F "campaign_name=CSV Campaign" \\
  -F "mobile_column=phone" \\
  -F "name_column=full_name"`,
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_csv_001", total_recipients: 1500, status: "processing" }, null, 2),
    notes: "CSV must contain a column with mobile numbers. Specify the column name using mobile_column.",
  },
  // Status & Tracking
  {
    method: "GET", path: "/message/:message_id", name: "Get Message Status", tag: "Status & Tracking",
    description: "Retrieve the delivery status of a specific message by its ID.",
    responseBody: JSON.stringify({ success: true, message_id: "msg_a1b2c3d4e5f6", channel: "sms", to: "+919876543210", status: "delivered", delivered_at: "2026-04-11T10:30:12Z", credits_used: 1, error: null }, null, 2),
  },
  {
    method: "GET", path: "/campaign/:campaign_id", name: "Get Campaign Status", tag: "Status & Tracking",
    description: "Get real-time status and delivery progress of a bulk campaign.",
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_x7y8z9w0", campaign_name: "Jan 2026 Update", channel: "sms", status: "completed", total: 5000, delivered: 4850, failed: 100, pending: 50, created_at: "2026-04-11T10:00:00Z", completed_at: "2026-04-11T10:15:00Z" }, null, 2),
  },
  {
    method: "POST", path: "/webhook/delivery", name: "Delivery Webhook", tag: "Status & Tracking",
    description: "Webhook payload sent to your registered callback_url when message delivery status changes.",
    requestBody: JSON.stringify({ event: "message.delivered", message_id: "msg_a1b2c3d4e5f6", campaign_id: "cmp_x7y8z9w0", channel: "sms", to: "+919876543210", status: "delivered", timestamp: "2026-04-11T10:30:12Z", error_code: null }, null, 2),
    notes: "Events: message.queued, message.sent, message.delivered, message.failed, message.read",
  },
  // Reports
  {
    method: "GET", path: "/reports/campaign/:campaign_id", name: "Campaign Report", tag: "Reports",
    description: "Get detailed delivery report for a specific campaign including timeline and failure breakdown.",
    responseBody: JSON.stringify({ success: true, campaign_id: "cmp_x7y8z9w0", campaign_name: "Jan 2026 Update", summary: { total: 5000, delivered: 4850, failed: 100, pending: 50, delivery_rate: "97.0%", read_rate: "65.98%" }, timeline: [{ time: "10:00", sent: 1000, delivered: 980 }], failures: [{ to: "+919876543999", error: "INVALID_NUMBER" }] }, null, 2),
  },
  {
    method: "GET", path: "/reports/daily", name: "Daily Report", tag: "Reports",
    description: "Get aggregated daily delivery report across all channels.",
    queryParams: [
      { name: "date", type: "string", required: true, description: "Date in YYYY-MM-DD format" },
    ],
    responseBody: JSON.stringify({ success: true, date: "2026-04-11", channels: { sms: { sent: 15000, delivered: 14700, failed: 300 }, whatsapp: { sent: 8000, delivered: 7800, failed: 200 }, email: { sent: 5000, delivered: 4900, failed: 100 }, rcs: { sent: 1200, delivered: 1100, failed: 100 } }, total_credits_used: 26700 }, null, 2),
  },
  {
    method: "GET", path: "/reports/export", name: "Export Report", tag: "Reports",
    description: "Download campaign report as CSV or PDF file.",
    queryParams: [
      { name: "campaign_id", type: "string", required: true, description: "Campaign ID to export" },
      { name: "format", type: "string", required: true, description: "Export format: csv or pdf" },
      { name: "date_from", type: "string", required: false, description: "Start date (YYYY-MM-DD)" },
      { name: "date_to", type: "string", required: false, description: "End date (YYYY-MM-DD)" },
    ],
    responseBody: "Binary file download (CSV/PDF)",
  },
  // Statistics
  {
    method: "GET", path: "/stats/overview", name: "Statistics Overview", tag: "Statistics",
    description: "Get overall project statistics including total messages, delivery rates, and top campaigns.",
    responseBody: JSON.stringify({ success: true, period: "2026-04-01 to 2026-04-11", total_messages_sent: 125000, total_delivered: 122500, delivery_rate: "98.0%", channels: { sms: { sent: 60000, rate: "97.5%" }, whatsapp: { sent: 35000, rate: "98.8%" } }, top_campaigns: [{ id: "cmp_x7y8z9w0", name: "Jan Update", sent: 5000, rate: "97.0%" }] }, null, 2),
  },
  {
    method: "GET", path: "/stats/quota", name: "Quota Usage", tag: "Statistics",
    description: "Check current quota usage and remaining limits for each communication channel.",
    responseBody: JSON.stringify({ success: true, project_code: "MYBRT", quotas: { sms: { daily_limit: 10000, daily_used: 3500, daily_remaining: 6500, overall_limit: 100000, overall_used: 60000 }, whatsapp: { daily_limit: 5000, daily_used: 1200, daily_remaining: 3800 } } }, null, 2),
  },
  // Templates
  {
    method: "GET", path: "/templates", name: "List Templates", tag: "Templates",
    description: "List all approved message templates available for your project.",
    responseBody: JSON.stringify({ success: true, templates: [{ id: "tpl_otp_verify", name: "OTP Verification", channel: "sms", body: "Your OTP is {{otp}}. Valid for 5 minutes.", variables: ["otp"], status: "approved", dlt_template_id: "1107161234567890" }] }, null, 2),
  },
  {
    method: "GET", path: "/templates/:template_id", name: "Get Template", tag: "Templates",
    description: "Retrieve details of a specific message template by its ID.",
    responseBody: JSON.stringify({ success: true, id: "tpl_otp_verify", name: "OTP Verification", channel: "sms", body: "Your OTP is {{otp}}. Valid for 5 minutes.", variables: [{ name: "otp", type: "string", required: true, max_length: 6 }], status: "approved", dlt_template_id: "1107161234567890" }, null, 2),
  },
  {
    method: "POST", path: "/templates", name: "Create Template", tag: "Templates",
    description: "Submit a new message template for approval.",
    requestBody: JSON.stringify({ name: "Event Reminder", channel: "sms", body: "Hi {{name}}, reminder for {{event}} on {{date}}.", variables: ["name", "event", "date"], dlt_template_id: "1107161234567999" }, null, 2),
    responseBody: JSON.stringify({ success: true, id: "tpl_event_remind", status: "pending_approval", created_at: "2026-04-11T12:00:00Z" }, null, 2),
  },
];

const tags = [...new Set(apiEndpoints.map(e => e.tag))];

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
              <p className="text-xs font-semibold text-foreground mb-2">Request {api.method === "POST" ? "Body" : ""}</p>
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

const DeveloperDocsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredEndpoints = apiEndpoints.filter(api => {
    const matchTag = !activeTag || api.tag === activeTag;
    const matchSearch = !searchTerm ||
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTag && matchSearch;
  });

  const groupedEndpoints: Record<string, ApiEntry[]> = {};
  filteredEndpoints.forEach(e => {
    if (!groupedEndpoints[e.tag]) groupedEndpoints[e.tag] = [];
    groupedEndpoints[e.tag].push(e);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Developer Documentation</h1>
        <p className="text-muted-foreground mt-1">REST API reference for integrating DIC Notifier into your applications</p>
      </div>

      {/* Quick Start */}
      <Card className="shadow-card border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-foreground">Authentication</h3>
              <p className="text-sm text-muted-foreground">All API requests require authentication. Include your API key in every request header:</p>
              <CodeBlock code={`Authorization: Bearer YOUR_PROJECT_API_KEY\nContent-Type: application/json\nX-Project-Code: YOUR_PROJECT_CODE`} />
              <p className="text-xs text-muted-foreground">Get your API key from <strong className="text-foreground">Configuration → General</strong> in your project dashboard.</p>
              <div className="flex items-center gap-2 mt-2">
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

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search APIs by name, path, or description..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(null)}
          >
            All ({apiEndpoints.length})
          </Button>
          {tags.map(tag => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* API Endpoints grouped by tag */}
      {Object.entries(groupedEndpoints).map(([tag, endpoints]) => (
        <div key={tag} className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary" />
            {tag}
            <Badge variant="secondary" className="text-xs">{endpoints.length} endpoints</Badge>
          </h2>
          <div className="space-y-2">
            {endpoints.map((api, idx) => (
              <ApiEndpointItem key={`${api.method}-${api.path}-${idx}`} api={api} />
            ))}
          </div>
        </div>
      ))}

      {filteredEndpoints.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p>No APIs match your search.</p>
        </div>
      )}

      {/* Error Codes & Rate Limits */}
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
                  ["/message/send", "60 requests", "per minute"],
                  ["/message/bulk", "10 requests", "per minute"],
                  ["/reports/*", "30 requests", "per minute"],
                  ["/stats/*", "30 requests", "per minute"],
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

export default DeveloperDocsPage;
