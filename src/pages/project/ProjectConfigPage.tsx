import { useState } from "react";
import ivrsWebhookHero from "@/assets/ivrs-webhook-hero.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Server, Plus, Trash2, Copy, ExternalLink, Key, Code, Info, Check, Phone, PlayCircle, PauseCircle, CheckCircle2, XCircle, AlertCircle, Sparkles, ArrowRight, Webhook } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ChannelProviderManager, { type ChannelProvider, type ProviderField } from "@/components/ChannelProviderManager";

const smsProviderFields: ProviderField[] = [
  { key: "apiEndpoint", label: "API Endpoint", placeholder: "https://sms-provider.com/api/send" },
  { key: "apiKey", label: "API Key", type: "password", placeholder: "Your SMS API Key" },
  { key: "senderId", label: "Default Sender ID", placeholder: "DICNTFY" },
  { key: "dltEntityId", label: "DLT Entity ID", placeholder: "1101456780000012345" },
];

const whatsappProviderFields: ProviderField[] = [
  { key: "apiUrl", label: "WhatsApp Business API URL", placeholder: "https://graph.facebook.com/v17.0/..." },
  { key: "accessToken", label: "Access Token", type: "password", placeholder: "Your WhatsApp API Token" },
  { key: "phoneNumberId", label: "Phone Number ID", placeholder: "102938475610293" },
  { key: "businessAccountId", label: "Business Account ID", type: "password" },
];

const emailProviderFields: ProviderField[] = [
  { key: "smtpHost", label: "SMTP Host", placeholder: "smtp.provider.com" },
  { key: "smtpPort", label: "SMTP Port", placeholder: "587" },
  { key: "username", label: "Username", type: "password" },
  { key: "password", label: "Password", type: "password" },
  { key: "fromAddress", label: "From Address", placeholder: "noreply@example.com" },
];

const rcsProviderFields: ProviderField[] = [
  { key: "apiEndpoint", label: "RCS API Endpoint", placeholder: "https://rcs-provider.com/api" },
  { key: "apiKey", label: "API Key", type: "password" },
  { key: "agentId", label: "Agent ID", placeholder: "agent-prod" },
  { key: "brandName", label: "Brand Name", placeholder: "My Brand" },
];


const defaultSmsProviders: ChannelProvider[] = [
  { id: "sms-nic", name: "NIC Gateway", provider: "NIC", status: "active", isDefault: true, priority: 1, autoFallback: true, credentials: { apiEndpoint: "https://smsgw.nic.in/api/send", apiKey: "••••••", senderId: "DICNTFY", dltEntityId: "1101456780000012345" } },
  { id: "sms-cdac", name: "CDAC mGov", provider: "CDAC", status: "active", isDefault: false, priority: 2, autoFallback: true, credentials: { apiEndpoint: "https://mgov.gov.in/sms/api", apiKey: "••••••", senderId: "MYBHRT", dltEntityId: "1101456780000012346" } },
];
const defaultWaProviders: ChannelProvider[] = [
  { id: "wa-meta", name: "Meta Cloud API", provider: "Meta", status: "active", isDefault: true, priority: 1, autoFallback: true, credentials: { apiUrl: "https://graph.facebook.com/v18.0/...", accessToken: "••••••", phoneNumberId: "102938475610293", businessAccountId: "BA••••1234" } },
];
const defaultEmailProviders: ChannelProvider[] = [
  { id: "email-ses", name: "Amazon SES", provider: "AWS SES", status: "active", isDefault: true, priority: 1, autoFallback: true, credentials: { smtpHost: "email-smtp.ap-south-1.amazonaws.com", smtpPort: "587", username: "AKIA••••Q3F", password: "••••••", fromAddress: "noreply@mybharat.gov.in" } },
];
const defaultRcsProviders: ChannelProvider[] = [];


export interface ApiFilter {
  key: string;
  label: string;
  type: string;
  example: string;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  authType: string;
  authKey: string;
  filters: ApiFilter[];
  responseField: string;
  status: "Active" | "Inactive";
}

const sampleApiFormat = {
  request: {
    url: "https://api.yourproject.gov.in/v1/users",
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_TOKEN",
      "Content-Type": "application/json",
    },
    body: {
      filters: {
        state: "Madhya Pradesh",
        district: "Bhopal",
        user_type: "Youth",
        activity: "Quiz",
        activity_status: "completed",
      },
      page: 1,
      limit: 1000,
    },
  },
  response: {
    success: true,
    total: 1245,
    data: [
      { mobile: "9876543210" },
      { mobile: "9876543211" },
      { mobile: "9876543212" },
    ],
    filters_available: {
      state: ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan"],
      district: ["Bhopal", "Indore", "Jabalpur"],
      block: ["Huzur", "Berasia", "Phanda"],
      user_type: ["Youth", "Organization"],
      activity: ["Quiz", "Events", "ELP", "Essay"],
      activity_status: ["attendee", "completed"],
    },
  },
};

// Export default APIs so SendMessagePage can import
export const defaultApis: ApiEndpoint[] = [
  {
    id: "api-1",
    name: "My Bharat User API",
    endpoint: "https://api.mybharat.gov.in/v1/users",
    method: "POST",
    authType: "Bearer Token",
    authKey: "eyJhbGciOiJIUzI1NiIs...",
    filters: [
      { key: "state", label: "State", type: "select", example: "Madhya Pradesh, Uttar Pradesh, Rajasthan" },
      { key: "district", label: "District", type: "select", example: "Bhopal, Indore, Jabalpur, Gwalior" },
      { key: "block", label: "Block", type: "select", example: "Huzur, Berasia, Phanda, Sehore" },
      { key: "gram_panchayat", label: "Gram Panchayat", type: "select", example: "Ratua Khurd, Bairagarh Chichli, Misrod" },
      { key: "village", label: "Village", type: "select", example: "Lambakheda, Neelbad, Kolar, Ratibad" },
      { key: "urban_rural", label: "Urban/Rural", type: "select", example: "Urban, Rural" },
      { key: "user_type", label: "User Type", type: "select", example: "Youth, Organization" },
      { key: "category", label: "Category", type: "select", example: "Education, Health, Agriculture" },
      { key: "activity", label: "Activity", type: "select", example: "Quiz, Events, ELP, Essay" },
      { key: "activity_status", label: "Activity Status", type: "select", example: "Attendee, Successfully Completed" },
    ],
    responseField: "mobile",
    status: "Active",
  },
];

/* ─── IVRS Webhook Endpoint Manager ─── */

const sampleWebhookPayload = `{
  "event": "call.completed",
  "call_id": "CL-9F3A2B81",
  "direction": "inbound",
  "from": "+919876543210",
  "to": "+911234567890",
  "status": "completed",
  "menu_path": ["1", "3"],
  "agent_transferred": true,

  "ivrs_start_time": "2025-06-12T10:42:11Z",
  "ivrs_end_time":   "2025-06-12T10:42:38Z",
  "queue_time":      12,
  "hold_time":       8,
  "agent_start_time":"2025-06-12T10:42:50Z",
  "agent_end_time":  "2025-06-12T10:44:48Z",
  "total_agent_duration": 118,

  "duration_seconds": 157,
  "recording_url": "https://ivrs-provider.com/rec/CL-9F3A2B81.mp3",
  "metadata": { "campaign_id": "CMP-2025-06-A", "language": "hi" }
}`;

const requiredKeys = [
  { key: "event", desc: "Event type — call.initiated, call.answered, ivr.input, call.completed, call.failed" },
  { key: "call_id", desc: "Unique identifier for the call from your IVRS provider" },
  { key: "direction", desc: "inbound | outbound" },
  { key: "from / to", desc: "Caller and recipient numbers in E.164 format" },
  { key: "status", desc: "completed | failed | no-answer | busy | dropped" },
  { key: "menu_path", desc: "Array of IVR key presses, e.g. [\"1\", \"3\"]" },
  { key: "ivrs_start_time", desc: "ISO timestamp — when the IVR flow started for this call" },
  { key: "ivrs_end_time", desc: "ISO timestamp — when the IVR flow ended (before queue/agent)" },
  { key: "queue_time", desc: "Seconds the caller waited in queue before agent pickup" },
  { key: "hold_time", desc: "Seconds the caller was put on hold during the call" },
  { key: "agent_start_time", desc: "ISO timestamp — when the agent answered the call" },
  { key: "agent_end_time", desc: "ISO timestamp — when the agent ended the call" },
  { key: "total_agent_duration", desc: "Total seconds spent on the agent leg (numeric)" },
  { key: "duration_seconds", desc: "Total call duration end-to-end (numeric)" },
];

const dailyWebhookStats = [
  { date: "Today", received: 1284, success: 1248, failed: 22, ignored: 14 },
  { date: "Yesterday", received: 1452, success: 1421, failed: 18, ignored: 13 },
  { date: "2 days ago", received: 1198, success: 1175, failed: 12, ignored: 11 },
  { date: "3 days ago", received: 1340, success: 1310, failed: 19, ignored: 11 },
  { date: "4 days ago", received: 980, success: 962, failed: 8, ignored: 10 },
  { date: "5 days ago", received: 1100, success: 1080, failed: 11, ignored: 9 },
  { date: "6 days ago", received: 1220, success: 1198, failed: 14, ignored: 8 },
];

const recentWebhookEvents = [
  { id: "WH-9123", event: "call.completed", status: 200, time: "12 sec ago", from: "+919876543210", result: "success" },
  { id: "WH-9122", event: "ivr.input", status: 200, time: "45 sec ago", from: "+919876543211", result: "success" },
  { id: "WH-9121", event: "call.answered", status: 200, time: "1 min ago", from: "+919876543212", result: "success" },
  { id: "WH-9120", event: "call.failed", status: 422, time: "3 min ago", from: "+919876543213", result: "failed" },
  { id: "WH-9119", event: "call.completed", status: 200, time: "5 min ago", from: "+919876543214", result: "success" },
  { id: "WH-9118", event: "unknown.event", status: 400, time: "8 min ago", from: "+919876543215", result: "ignored" },
];

const IVRSWebhookSection = () => {
  const [endpointStatus, setEndpointStatus] = useState<"running" | "paused">("running");
  const [secret] = useState("whsk_live_8f3a2b81c4d6e9f02a7b5c8d1e4f6a9b");
  const [showSecret, setShowSecret] = useState(false);
  const webhookUrl = "https://api.dicnotifier.io/v1/projects/mybharat/ivrs/webhook";

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  return (
    <div className="space-y-5 mt-4">
      <Card className="shadow-card">
        <CardContent className="pt-5 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${endpointStatus === "running" ? "bg-success/10" : "bg-warning/10"}`}>
                <Phone className={`w-5 h-5 ${endpointStatus === "running" ? "text-success" : "text-warning"}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">IVRS Webhook Endpoint</h3>
                  {endpointStatus === "running" ? (
                    <Badge className="bg-success/10 text-success hover:bg-success/10 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-success mr-1 animate-pulse" />Running
                    </Badge>
                  ) : (
                    <Badge className="bg-warning/10 text-warning hover:bg-warning/10 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning mr-1" />Paused
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Receives call events from your IVRS provider in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {endpointStatus === "running" ? (
                <Button variant="outline" size="sm" onClick={() => { setEndpointStatus("paused"); toast.success("Endpoint paused"); }}>
                  <PauseCircle className="w-4 h-4 mr-1.5" />Pause
                </Button>
              ) : (
                <Button size="sm" onClick={() => { setEndpointStatus("running"); toast.success("Endpoint resumed"); }}>
                  <PlayCircle className="w-4 h-4 mr-1.5" />Resume
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Endpoint Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-foreground text-sm">Webhook URL</Label>
            <div className="flex gap-2 mt-1.5">
              <Input value={webhookUrl} readOnly className="font-mono text-xs" />
              <Button variant="outline" size="icon" onClick={() => copy(webhookUrl, "URL")}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Configure this URL in your IVRS provider's webhook settings (POST, application/json)</p>
          </div>

          <div>
            <Label className="text-foreground text-sm">Signing Secret</Label>
            <div className="flex gap-2 mt-1.5">
              <Input value={showSecret ? secret : "••••••••••••••••••••••••••••••••"} readOnly type="text" className="font-mono text-xs" />
              <Button variant="outline" size="sm" onClick={() => setShowSecret(!showSecret)}>{showSecret ? "Hide" : "Show"}</Button>
              <Button variant="outline" size="icon" onClick={() => copy(secret, "Secret")}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Use this to sign requests via HMAC SHA-256 in the <code className="font-mono text-[11px] bg-muted px-1 rounded">X-DIC-Signature</code> header</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Verify HMAC Signature</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked /><Label className="text-foreground text-sm">Log all events</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch /><Label className="text-foreground text-sm">Notify on failure (email)</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Expected Payload Format</CardTitle>
            <Button variant="outline" size="sm" onClick={() => copy(sampleWebhookPayload, "Sample payload")}>
              <Copy className="w-4 h-4 mr-1.5" />Copy Sample
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Required Keys</p>
              <div className="space-y-2">
                {requiredKeys.map((k) => (
                  <div key={k.key} className="flex gap-2 text-xs">
                    <code className="font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded h-fit flex-shrink-0">{k.key}</code>
                    <span className="text-muted-foreground">{k.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Sample JSON Body</p>
              <pre className="bg-muted/50 border border-border rounded-lg p-3 text-[11px] font-mono text-foreground overflow-auto max-h-[280px]">
{sampleWebhookPayload}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Daily Webhook Activity (Last 7 days)</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Date</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 pr-4">Received</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 pr-4">Success</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 pr-4">Failed</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3 pr-4">Ignored</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {dailyWebhookStats.map((d) => {
                  const rate = ((d.success / d.received) * 100).toFixed(1);
                  return (
                    <tr key={d.date} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 pr-4 text-sm font-medium text-foreground">{d.date}</td>
                      <td className="py-2.5 pr-4 text-sm text-foreground text-right">{d.received.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-sm text-success text-right font-medium">{d.success.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-sm text-destructive text-right">{d.failed}</td>
                      <td className="py-2.5 pr-4 text-sm text-warning text-right">{d.ignored}</td>
                      <td className="py-2.5 text-right">
                        <Badge variant="secondary" className="text-xs">{rate}%</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Webhook Events</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Event ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Event</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">From</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">HTTP</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Result</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentWebhookEvents.map((e) => (
                  <tr key={e.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs text-primary">{e.id}</td>
                    <td className="py-2.5 pr-4 text-sm text-foreground">
                      <code className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">{e.event}</code>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-muted-foreground">{e.from}</td>
                    <td className="py-2.5 pr-4">
                      <Badge variant="outline" className={`text-[10px] ${e.status >= 200 && e.status < 300 ? "text-success border-success/30" : "text-destructive border-destructive/30"}`}>{e.status}</Badge>
                    </td>
                    <td className="py-2.5 pr-4">
                      {e.result === "success" && <span className="inline-flex items-center text-xs text-success"><CheckCircle2 className="w-3 h-3 mr-1" />Success</span>}
                      {e.result === "failed" && <span className="inline-flex items-center text-xs text-destructive"><XCircle className="w-3 h-3 mr-1" />Failed</span>}
                      {e.result === "ignored" && <span className="inline-flex items-center text-xs text-warning"><AlertCircle className="w-3 h-3 mr-1" />Ignored</span>}
                    </td>
                    <td className="py-2.5 text-xs text-muted-foreground text-right">{e.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => toast.success("Webhook settings saved")}><Save className="w-4 h-4 mr-2" />Save Settings</Button>
    </div>
  );
};

const ProjectConfigPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [configSource, setConfigSource] = useState<"notifier" | "own">("notifier");
  const [apis, setApis] = useState<ApiEndpoint[]>(defaultApis);
  const [showSample, setShowSample] = useState(false);
  const [smsProviders, setSmsProviders] = useState<ChannelProvider[]>(defaultSmsProviders);
  const [waProviders, setWaProviders] = useState<ChannelProvider[]>(defaultWaProviders);
  const [emailProviders, setEmailProviders] = useState<ChannelProvider[]>(defaultEmailProviders);
  const [rcsProviders, setRcsProviders] = useState<ChannelProvider[]>(defaultRcsProviders);
  
  const [editingApi, setEditingApi] = useState<ApiEndpoint | null>(null);
  const [showAddApi, setShowAddApi] = useState(false);
  const [newApi, setNewApi] = useState({
    name: "", endpoint: "", method: "POST", authType: "Bearer Token", authKey: "",
    filters: [{ key: "", label: "", type: "select", example: "" }],
    responseField: "mobile",
  });

  const addFilter = () => {
    setNewApi(prev => ({ ...prev, filters: [...prev.filters, { key: "", label: "", type: "select", example: "" }] }));
  };

  const removeFilter = (idx: number) => {
    setNewApi(prev => ({ ...prev, filters: prev.filters.filter((_, i) => i !== idx) }));
  };

  const updateFilter = (idx: number, field: string, value: string) => {
    setNewApi(prev => ({
      ...prev,
      filters: prev.filters.map((f, i) => i === idx ? { ...f, [field]: value } : f),
    }));
  };

  const handleAddApi = () => {
    if (!newApi.name || !newApi.endpoint) {
      toast.error("Please fill in API name and endpoint");
      return;
    }
    const api: ApiEndpoint = {
      id: `api-${Date.now()}`,
      ...newApi,
      filters: newApi.filters.filter(f => f.key && f.label),
      status: "Active",
    };
    setApis(prev => [...prev, api]);
    setShowAddApi(false);
    setNewApi({ name: "", endpoint: "", method: "POST", authType: "Bearer Token", authKey: "", filters: [{ key: "", label: "", type: "select", example: "" }], responseField: "mobile" });
    toast.success("API endpoint validated and added successfully");
  };

  const toggleApiStatus = (id: string) => {
    setApis(prev => prev.map(a => a.id === id ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" } : a));
  };

  const deleteApi = (id: string) => {
    setApis(prev => prev.filter(a => a.id !== id));
    toast.success("API endpoint removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuration</h1>
        <p className="text-muted-foreground mt-1">Project-level communication settings & API integration</p>
      </div>


      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="service">Service Config</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="rcs">RCS</TabsTrigger>
          <TabsTrigger value="ivrs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sparkles className="w-3 h-3 mr-1" />IVRS Webhook
          </TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">Project Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-foreground text-sm">Project Name</Label><Input defaultValue="My Bharat" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Project Code</Label><Input defaultValue="MYBRT" disabled className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Project Head</Label><Input defaultValue="Ravi Kumar" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Head Email</Label><Input defaultValue="ravi@mybharat.gov.in" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Head Mobile</Label><Input defaultValue="+91 98765 43210" className="mt-1.5" /></div>
                <div><Label className="text-foreground text-sm">Department</Label><Input defaultValue="Youth Affairs" className="mt-1.5" /></div>
              </div>
              <Button onClick={() => toast.success("Project details updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">Communication Service Source</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm text-muted-foreground">Choose whether to use DIC Notifier's communication infrastructure or your own provider configurations.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setConfigSource("notifier")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${configSource === "notifier" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Server className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">DIC Notifier Service</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Use the platform's built-in SMS, WhatsApp, Email, RCS & IVRS services. No configuration needed.</p>
                </button>
                <button
                  onClick={() => setConfigSource("own")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${configSource === "own" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Own Configuration</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Use your own provider APIs and credentials. Configure each channel independently.</p>
                </button>
              </div>
              {configSource === "own" && (
                <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 text-sm text-muted-foreground">
                  <Info className="w-4 h-4 inline mr-1 text-warning" />
                  When using your own configuration, please provide valid API keys in each channel tab. You can also set your own quota limits.
                </div>
              )}
              <Button onClick={() => toast.success("Service configuration updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">SMS Providers & Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {configSource === "own" ? (
                <ChannelProviderManager
                  channel="sms"
                  channelLabel="SMS"
                  providers={smsProviders}
                  onProvidersChange={setSmsProviders}
                  fields={smsProviderFields}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                  <Info className="w-4 h-4 inline mr-1 text-primary" />
                  Using DIC Notifier's built-in SMS gateway. Switch to "Own Configuration" in Service Config to manage your own providers.
                </div>
              )}
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Unicode</Label>
              </div>
              <Button onClick={() => toast.success("SMS settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">WhatsApp Providers & Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {configSource === "own" ? (
                <ChannelProviderManager
                  channel="whatsapp"
                  channelLabel="WhatsApp"
                  providers={waProviders}
                  onProvidersChange={setWaProviders}
                  fields={whatsappProviderFields}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                  <Info className="w-4 h-4 inline mr-1 text-primary" />
                  Using DIC Notifier's built-in WhatsApp service. Switch to "Own Configuration" in Service Config to manage your own providers.
                </div>
              )}
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Media Messages</Label>
              </div>
              <Button onClick={() => toast.success("WhatsApp settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">Email Providers & Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {configSource === "own" ? (
                <ChannelProviderManager
                  channel="email"
                  channelLabel="Email"
                  providers={emailProviders}
                  onProvidersChange={setEmailProviders}
                  fields={emailProviderFields}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                  <Info className="w-4 h-4 inline mr-1 text-primary" />
                  Using DIC Notifier's built-in Email service. Switch to "Own Configuration" in Service Config to manage your own providers.
                </div>
              )}
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable HTML Emails</Label>
              </div>
              <Button onClick={() => toast.success("Email settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rcs">
          <Card className="shadow-card mt-4">
            <CardHeader><CardTitle className="text-base">RCS Providers & Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {configSource === "own" ? (
                <ChannelProviderManager
                  channel="rcs"
                  channelLabel="RCS"
                  providers={rcsProviders}
                  onProvidersChange={setRcsProviders}
                  fields={rcsProviderFields}
                />
              ) : (
                <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                  <Info className="w-4 h-4 inline mr-1 text-primary" />
                  Using DIC Notifier's built-in RCS service. Switch to "Own Configuration" in Service Config to manage your own providers.
                </div>
              )}
              <div className="flex items-center gap-3">
                <Switch defaultChecked /><Label className="text-foreground text-sm">Enable Rich Cards</Label>
              </div>
              <Button onClick={() => toast.success("RCS settings updated")}><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ivrs">
          <IVRSWebhookSection />
        </TabsContent>

        {/* API Endpoints Tab */}
        <TabsContent value="api">
          <div className="space-y-4 mt-4">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recipient API Endpoints</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowSample(true)}>
                      <Code className="w-4 h-4 mr-1" /> Sample Format
                    </Button>
                    <Button size="sm" onClick={() => setShowAddApi(true)}>
                      <Plus className="w-4 h-4 mr-1" /> Add API
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your project's API endpoints to dynamically fetch recipient mobile numbers. The filters defined here will appear in the Send Message screen under "Bulk DB" tab.
                </p>

                {apis.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Server className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No API endpoints configured yet</p>
                    <p className="text-xs mt-1">Add an API to dynamically fetch recipients</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {apis.map((api) => (
                      <div key={api.id} className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-primary" />
                            <span className="font-medium text-foreground text-sm">{api.name}</span>
                            <Badge variant={api.status === "Active" ? "default" : "secondary"} className="text-xs">{api.status}</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleApiStatus(api.id)}>
                              {api.status === "Active" ? <span className="text-xs">⏸</span> : <span className="text-xs">▶</span>}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteApi(api.id)}>
                              <Trash2 className="w-3.5 h-3.5 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p><span className="font-medium">Endpoint:</span> <code className="bg-muted px-1 rounded">{api.method} {api.endpoint}</code></p>
                          <p><span className="font-medium">Auth:</span> {api.authType}</p>
                          <p><span className="font-medium">Response Field:</span> <code className="bg-muted px-1 rounded">{api.responseField}</code></p>
                          <p><span className="font-medium">Filters ({api.filters.length}):</span></p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {api.filters.map(f => (
                              <Badge key={f.key} variant="outline" className="text-xs font-normal">
                                {f.label} <span className="text-muted-foreground ml-1">({f.key})</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Feature Highlight: IVRS Webhook */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-card-hover">
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary text-[10px] gap-1 shadow">
            <Sparkles className="w-3 h-3" />NEW FEATURE
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-6 lg:p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
              <Webhook className="w-3.5 h-3.5" />IVRS Dashboard Connection
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Now get full analytics on your <span className="text-primary">running IVRS system</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Already running an IVRS with another provider? No need to migrate. Just add a webhook endpoint
              from DIC Notifier into your IVRS platform — we'll capture every inbound and outbound call event
              in real-time and turn it into rich Call Dashboard analytics, funnels, agent timing & SLA reports.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="rounded-lg border border-border bg-card/60 p-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <p className="text-[11px] font-medium text-foreground">Copy Webhook URL</p>
              </div>
              <div className="rounded-lg border border-border bg-card/60 p-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <p className="text-[11px] font-medium text-foreground">Paste in your IVRS</p>
              </div>
              <div className="rounded-lg border border-border bg-card/60 p-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <p className="text-[11px] font-medium text-foreground">Get Live Analytics</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={() => setActiveTab("ivrs")} className="gap-2">
                <Webhook className="w-4 h-4" />Configure IVRS Webhook
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("ivrs")}>
                View Payload Format
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-xl blur-2xl" />
            <img
              src={ivrsWebhookHero}
              alt="IVRS webhook connecting to DIC Notifier analytics dashboard"
              width={1024}
              height={640}
              loading="lazy"
              className="relative w-full h-auto rounded-xl border border-border shadow-card"
            />
          </div>
        </div>
      </div>

      {/* Sample API Format Dialog */}
      <Dialog open={showSample} onOpenChange={setShowSample}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sample API Format & Response</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">📤 Request Format</p>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto text-foreground">
                {JSON.stringify(sampleApiFormat.request, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">📥 Expected Response</p>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto text-foreground">
                {JSON.stringify(sampleApiFormat.response, null, 2)}
              </pre>
            </div>
            <div className="p-3 rounded-lg bg-info/5 border border-info/20 text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Important Notes:</p>
              <p>• Response must return a list of objects with a <code className="bg-muted px-1 rounded">mobile</code> field</p>
              <p>• Include <code className="bg-muted px-1 rounded">filters_available</code> in response to auto-populate filter options</p>
              <p>• API should support pagination via <code className="bg-muted px-1 rounded">page</code> and <code className="bg-muted px-1 rounded">limit</code></p>
              <p>• Authentication via Bearer Token or API Key in headers</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(sampleApiFormat, null, 2));
              toast.success("Sample format copied to clipboard");
            }}>
              <Copy className="w-4 h-4 mr-2" /> Copy Full Sample
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add API Dialog */}
      <Dialog open={showAddApi} onOpenChange={setShowAddApi}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add API Endpoint</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-foreground">API Name <span className="text-destructive">*</span></Label>
                <Input placeholder="e.g., User Fetch API" value={newApi.name} onChange={e => setNewApi(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-foreground">Endpoint URL <span className="text-destructive">*</span></Label>
                <Input placeholder="https://api.yourproject.gov.in/v1/users" value={newApi.endpoint} onChange={e => setNewApi(p => ({ ...p, endpoint: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Method</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newApi.method} onChange={e => setNewApi(p => ({ ...p, method: e.target.value }))}>
                  <option>GET</option>
                  <option>POST</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Auth Type</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newApi.authType} onChange={e => setNewApi(p => ({ ...p, authType: e.target.value }))}>
                  <option>Bearer Token</option>
                  <option>API Key</option>
                  <option>Basic Auth</option>
                  <option>No Auth</option>
                </select>
              </div>
              {newApi.authType !== "No Auth" && (
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-foreground">Authorization Key/Token</Label>
                  <Input type="password" placeholder="Paste your API key or token" value={newApi.authKey} onChange={e => setNewApi(p => ({ ...p, authKey: e.target.value }))} />
                </div>
              )}
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-foreground">Response Mobile Field</Label>
                <Input placeholder="mobile" value={newApi.responseField} onChange={e => setNewApi(p => ({ ...p, responseField: e.target.value }))} />
                <p className="text-xs text-muted-foreground">The JSON field name containing the mobile number in the response array</p>
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-foreground font-semibold">Filter Parameters</Label>
                <Button variant="outline" size="sm" onClick={addFilter}><Plus className="w-3.5 h-3.5 mr-1" /> Add Filter</Button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Define filter parameters with example values (comma-separated). These will appear as dynamic dropdowns in the Send Message screen.</p>
              <div className="space-y-3">
                {newApi.filters.map((f, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="key (e.g., state)" value={f.key} onChange={e => updateFilter(idx, "key", e.target.value)} className="flex-1" />
                      <Input placeholder="Label (e.g., State)" value={f.label} onChange={e => updateFilter(idx, "label", e.target.value)} className="flex-1" />
                      {newApi.filters.length > 1 && (
                        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0" onClick={() => removeFilter(idx)}>
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Example values (comma-separated): e.g., Madhya Pradesh, Uttar Pradesh, Rajasthan"
                      value={f.example}
                      onChange={e => updateFilter(idx, "example", e.target.value)}
                      className="text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={handleAddApi}>
              <Check className="w-4 h-4 mr-2" /> Validate & Add API
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectConfigPage;
