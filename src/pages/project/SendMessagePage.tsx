import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Send, Upload, Phone, MessageSquare, Mail, Sparkles,
  FileText, X, Check, AlertCircle, Users, Plus, Trash2,
  Filter, Server, FolderOpen, Image, Video, Paperclip,
  Link, ExternalLink, Reply, MapPin, FileDown,
  Smile, CheckCheck, Clock, Wifi, Battery, Signal,
  Bold, Italic, List,
} from "lucide-react";
import { defaultApis, type ApiEndpoint, type ApiFilter } from "./ProjectConfigPage";
import { useAuth } from "@/contexts/AuthContext";

const templates: Record<string, { id: string; name: string; body: string; variables: string[] }[]> = {
  sms: [
    { id: "s1", name: "OTP Verification", body: "Your OTP is {{otp}}. Valid for 5 minutes. Do not share.", variables: ["otp"] },
    { id: "s2", name: "Order Update", body: "Hi {{name}}, your order #{{order_id}} has been {{status}}.", variables: ["name", "order_id", "status"] },
  ],
  whatsapp: [
    { id: "w1", name: "Welcome Message", body: "Hello {{name}}! Welcome to {{project_name}}. We're glad to have you.", variables: ["name", "project_name"] },
    { id: "w2", name: "Appointment Reminder", body: "Hi {{name}}, your appointment is on {{date}} at {{time}}.", variables: ["name", "date", "time"] },
  ],
  email: [
    { id: "e1", name: "Welcome Email", body: "Dear {{name}},\n\nWelcome to {{project_name}}!\n\nBest regards,\nTeam", variables: ["name", "project_name"] },
    { id: "e2", name: "Invoice", body: "Dear {{name}},\n\nPlease find your invoice #{{invoice_id}} for {{amount}}.\n\nThank you.", variables: ["name", "invoice_id", "amount"] },
  ],
  rcs: [
    { id: "r1", name: "Promo Card", body: "{{name}}, check out our latest offer: {{offer_details}}", variables: ["name", "offer_details"] },
  ],
};

const allChannelConfig = [
  { id: "sms", label: "SMS", icon: Phone, colorClass: "border-channel-sms text-channel-sms", activeBg: "bg-channel-sms/5 border-channel-sms", iconBg: "bg-channel-sms/10" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, colorClass: "border-channel-whatsapp text-channel-whatsapp", activeBg: "bg-channel-whatsapp/5 border-channel-whatsapp", iconBg: "bg-channel-whatsapp/10" },
  { id: "email", label: "Email", icon: Mail, colorClass: "border-channel-email text-channel-email", activeBg: "bg-channel-email/5 border-channel-email", iconBg: "bg-channel-email/10" },
  { id: "rcs", label: "RCS", icon: Sparkles, colorClass: "border-channel-rcs text-channel-rcs", activeBg: "bg-channel-rcs/5 border-channel-rcs", iconBg: "bg-channel-rcs/10" },
];

const allVariables = ["name", "otp", "project_name", "date", "amount", "link"];

const existingCsvUploads = [
  { id: "csv-1", name: "users_batch_1.csv", uploadDate: "Jun 8, 2025", totalRecords: 2400, validRecords: 2310 },
  { id: "csv-2", name: "promo_list.csv", uploadDate: "Jun 5, 2025", totalRecords: 5200, validRecords: 4980 },
  { id: "csv-3", name: "otp_numbers.csv", uploadDate: "Jun 3, 2025", totalRecords: 890, validRecords: 878 },
];

/* ──────────────────────── Preview Components ──────────────────────── */

const SmsPreview = ({ body, senderId }: { body: string; senderId: string }) => (
  <div className="w-full max-w-[300px] mx-auto">
    {/* Phone frame */}
    <div className="rounded-[2rem] border-[3px] border-foreground/20 bg-foreground/5 p-1 shadow-lg">
      {/* Notch */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3 text-muted-foreground" />
          <Wifi className="w-3 h-3 text-muted-foreground" />
          <Battery className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
      {/* Header */}
      <div className="bg-muted/60 rounded-t-2xl px-4 py-3 flex items-center gap-3 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-channel-sms/20 flex items-center justify-center">
          <Phone className="w-4 h-4 text-channel-sms" />
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">{senderId || "SENDER"}</p>
          <p className="text-[10px] text-muted-foreground">SMS</p>
        </div>
      </div>
      {/* Messages area */}
      <div className="bg-background rounded-b-2xl min-h-[260px] p-4 flex flex-col justify-end">
        {body.trim() ? (
          <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[95%] shadow-sm">
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
            <p className="text-[9px] text-muted-foreground text-right mt-1.5">Now</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Phone className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-[10px] text-muted-foreground">Start composing to see preview</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const WhatsAppPreview = ({
  body, senderId, mediaFile, actionButtons,
}: {
  body: string; senderId: string; mediaFile: File | null;
  actionButtons: { label: string; type: string; value: string }[];
}) => (
  <div className="w-full max-w-[300px] mx-auto">
    <div className="rounded-[2rem] border-[3px] border-foreground/20 bg-foreground/5 p-1 shadow-lg">
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3 text-muted-foreground" />
          <Wifi className="w-3 h-3 text-muted-foreground" />
          <Battery className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
      {/* WhatsApp Header */}
      <div className="bg-[hsl(142,70%,35%)] rounded-t-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-background" />
        </div>
        <div>
          <p className="text-xs font-semibold text-background">{senderId || "Business"}</p>
          <p className="text-[10px] text-background/70">online</p>
        </div>
      </div>
      {/* Chat area with wallpaper */}
      <div className="bg-[hsl(30,15%,92%)] dark:bg-[hsl(220,15%,15%)] rounded-b-2xl min-h-[260px] p-3 flex flex-col justify-end" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        {body.trim() ? (
          <div className="space-y-1">
            <div className="bg-background rounded-xl rounded-tl-sm px-3 py-2 max-w-[95%] shadow-sm">
              {mediaFile && (
                <div className="mb-2 rounded-lg bg-muted/50 h-28 flex items-center justify-center">
                  <Image className="w-6 h-6 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground ml-1">{mediaFile.name}</span>
                </div>
              )}
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[9px] text-muted-foreground">Now</span>
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
            </div>
            {actionButtons.filter(b => b.label.trim()).map((btn, i) => (
              <div key={i} className="bg-background rounded-lg px-3 py-2 text-center shadow-sm border border-border/50">
                <span className="text-[11px] text-primary font-medium flex items-center justify-center gap-1">
                  {btn.type === "url" ? <ExternalLink className="w-3 h-3" /> : btn.type === "call" ? <Phone className="w-3 h-3" /> : <Reply className="w-3 h-3" />}
                  {btn.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-[10px] text-muted-foreground">Start composing to see preview</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const EmailPreview = ({
  body, subject, senderId, mediaFile,
  actionButtons,
}: {
  body: string; subject: string; senderId: string; mediaFile: File | null;
  actionButtons: { label: string; type: string; value: string }[];
}) => (
  <div className="w-full max-w-[320px] mx-auto">
    <div className="rounded-xl border border-border bg-background shadow-lg overflow-hidden">
      {/* Email client header */}
      <div className="bg-muted/50 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-destructive/60" />
          <div className="w-2 h-2 rounded-full bg-warning/60" />
          <div className="w-2 h-2 rounded-full bg-success/60" />
          <span className="text-[10px] text-muted-foreground ml-2">Inbox</span>
        </div>
        <p className="text-sm font-semibold text-foreground truncate">{subject || "No Subject"}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full bg-channel-email/20 flex items-center justify-center">
            <Mail className="w-2.5 h-2.5 text-channel-email" />
          </div>
          <span className="text-[10px] text-muted-foreground">{senderId || "noreply@example.com"}</span>
          <span className="text-[10px] text-muted-foreground ml-auto">Now</span>
        </div>
      </div>
      {/* Email body */}
      <div className="p-4 min-h-[200px]">
        {body.trim() ? (
          <div>
            {mediaFile && (
              <div className="mb-3 rounded-lg bg-muted/30 border border-border p-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-foreground">{mediaFile.name}</span>
                <FileDown className="w-3 h-3 ml-auto text-muted-foreground" />
              </div>
            )}
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
            {actionButtons.filter(b => b.label.trim()).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {actionButtons.filter(b => b.label.trim()).map((btn, i) => (
                  <div key={i} className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-[11px] font-medium">
                    {btn.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Mail className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-[10px] text-muted-foreground">Start composing to see preview</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const RcsPreview = ({
  body, senderId, mediaFile,
  actionButtons,
}: {
  body: string; senderId: string; mediaFile: File | null;
  actionButtons: { label: string; type: string; value: string }[];
}) => (
  <div className="w-full max-w-[300px] mx-auto">
    <div className="rounded-[2rem] border-[3px] border-foreground/20 bg-foreground/5 p-1 shadow-lg">
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3 text-muted-foreground" />
          <Wifi className="w-3 h-3 text-muted-foreground" />
          <Battery className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
      {/* RCS header */}
      <div className="bg-channel-rcs rounded-t-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-background" />
        </div>
        <div>
          <p className="text-xs font-semibold text-background">{senderId || "Business"}</p>
          <p className="text-[10px] text-background/70">Verified Business</p>
        </div>
      </div>
      {/* Chat */}
      <div className="bg-background rounded-b-2xl min-h-[260px] p-3 flex flex-col justify-end">
        {body.trim() ? (
          <div className="space-y-1.5">
            {/* Rich card */}
            <div className="rounded-xl border border-border overflow-hidden shadow-sm max-w-[95%]">
              {mediaFile && (
                <div className="bg-muted/30 h-28 flex items-center justify-center">
                  <Image className="w-6 h-6 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground ml-1">{mediaFile.name}</span>
                </div>
              )}
              <div className="px-3 py-2.5">
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
                <p className="text-[9px] text-muted-foreground text-right mt-1.5">Now</p>
              </div>
              {actionButtons.filter(b => b.label.trim()).length > 0 && (
                <div className="border-t border-border divide-y divide-border">
                  {actionButtons.filter(b => b.label.trim()).map((btn, i) => (
                    <div key={i} className="px-3 py-2 text-center">
                      <span className="text-[11px] text-primary font-medium flex items-center justify-center gap-1">
                        {btn.type === "url" ? <ExternalLink className="w-3 h-3" /> : btn.type === "call" ? <Phone className="w-3 h-3" /> : btn.type === "location" ? <MapPin className="w-3 h-3" /> : <Reply className="w-3 h-3" />}
                        {btn.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-[10px] text-muted-foreground">Start composing to see preview</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ──────────────────────── Main Component ──────────────────────── */

const SendMessagePage = () => {
  const { user } = useAuth();
  const enabledChannels = user?.enabledChannels || ["SMS", "WhatsApp", "Email", "RCS"];

  const channelConfig = allChannelConfig.filter(ch =>
    enabledChannels.map(c => c.toLowerCase()).includes(ch.id)
  );

  const [channel, setChannel] = useState(channelConfig[0]?.id || "sms");
  const [sendMode, setSendMode] = useState("database");
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [subject, setSubject] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvSource, setCsvSource] = useState<"new" | "existing">("new");
  const [selectedExistingCsv, setSelectedExistingCsv] = useState("");
  const [csvPreview, setCsvPreview] = useState<{ headers: string[]; rows: string[][]; valid: number; invalid: number; duplicates: number } | null>(null);
  const [sending, setSending] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState("DICNTFY");
  const senderIds = ["DICNTFY", "MYBHRT"];
  const [fetchedCount, setFetchedCount] = useState<number | null>(null);
  const [selectedApiId, setSelectedApiId] = useState(defaultApis[0]?.id || "");
  const [apiFilterValues, setApiFilterValues] = useState<Record<string, string>>({});

  // Media & Action Buttons (for WhatsApp, Email, RCS)
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [actionButtons, setActionButtons] = useState<{ label: string; type: string; value: string }[]>([]);

  const activeApi = defaultApis.find(a => a.id === selectedApiId && a.status === "Active");

  const dynamicFilters = useMemo(() => {
    if (!activeApi) return [];
    return activeApi.filters.map(f => ({
      ...f,
      options: f.example ? f.example.split(",").map(s => s.trim()).filter(Boolean) : [],
    }));
  }, [activeApi]);

  const currentTemplates = templates[channel] || [];
  const supportsMedia = ["whatsapp", "email", "rcs"].includes(channel);
  const supportsActions = ["whatsapp", "email", "rcs"].includes(channel);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = currentTemplates.find((t) => t.id === templateId);
    if (tmpl) setMessageBody(tmpl.body);
  };

  const handleChannelChange = (newChannel: string) => {
    setChannel(newChannel);
    setSelectedTemplate("");
    setMessageBody("");
    setSubject("");
    setMediaFile(null);
    setActionButtons([]);
  };

  const insertVariable = (v: string) => setMessageBody((prev) => prev + `{{${v}}}`);
  const addNumber = () => setNumbers([...numbers, ""]);
  const removeNumber = (i: number) => setNumbers(numbers.filter((_, idx) => idx !== i));
  const updateNumber = (i: number, val: string) => {
    const updated = [...numbers];
    updated[i] = val;
    setNumbers(updated);
  };

  const addActionButton = () => {
    if (actionButtons.length >= 3) return;
    setActionButtons([...actionButtons, { label: "", type: "url", value: "" }]);
  };
  const removeActionButton = (i: number) => setActionButtons(actionButtons.filter((_, idx) => idx !== i));
  const updateActionButton = (i: number, field: string, val: string) => {
    const updated = [...actionButtons];
    updated[i] = { ...updated[i], [field]: val };
    setActionButtons(updated);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMediaFile(file);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1, 6).map((l) => l.split(",").map((c) => c.trim()));
      const total = lines.length - 1;
      setCsvPreview({ headers, rows, valid: Math.floor(total * 0.92), invalid: Math.floor(total * 0.05), duplicates: Math.floor(total * 0.03) });
    };
    reader.readAsText(file);
  };

  const handleSelectExistingCsv = (csvId: string) => {
    setSelectedExistingCsv(csvId);
    const csv = existingCsvUploads.find(c => c.id === csvId);
    if (csv) {
      setCsvPreview({
        headers: ["mobile", "name", "email"],
        rows: [["9876543210", "Ravi Kumar", "ravi@test.com"], ["9876543211", "Priya Sharma", "priya@test.com"]],
        valid: csv.validRecords,
        invalid: csv.totalRecords - csv.validRecords,
        duplicates: Math.floor((csv.totalRecords - csv.validRecords) * 0.3),
      });
      toast.success(`Loaded ${csv.validRecords.toLocaleString()} valid records from ${csv.name}`);
    }
  };

  const handleFetchRecipients = () => {
    let count = 12400;
    const activeFilters = Object.values(apiFilterValues).filter(Boolean).length;
    count = Math.max(Math.floor(12400 * Math.pow(0.45, activeFilters)), 15);
    setFetchedCount(Math.max(count, 12));
    toast.success(`${Math.max(count, 12).toLocaleString()} recipients fetched`);
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent successfully!", { description: `Messages queued for delivery via ${channel.toUpperCase()}` });
    }, 1500);
  };

  const recipientCount = sendMode === "manual"
    ? numbers.filter((n) => n.trim()).length
    : sendMode === "csv"
    ? csvPreview?.valid ?? 0
    : fetchedCount ?? 0;

  const smsParts = Math.max(1, Math.ceil(messageBody.length / 160));

  const actionButtonTypes = channel === "email"
    ? [{ value: "url", label: "Link" }]
    : channel === "rcs"
    ? [{ value: "url", label: "Open URL" }, { value: "call", label: "Call" }, { value: "reply", label: "Reply" }, { value: "location", label: "Location" }]
    : [{ value: "url", label: "Visit Website" }, { value: "call", label: "Call" }, { value: "reply", label: "Quick Reply" }];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send Message</h1>
        <p className="text-muted-foreground mt-1">Compose and preview across all channels</p>
      </div>

      {/* Channel Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {channelConfig.map((ch) => {
          const isActive = channel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => handleChannelChange(ch.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                isActive ? ch.activeBg : "border-border bg-card hover:border-border/80"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? ch.iconBg : "bg-muted"}`}>
                <ch.icon className={`w-4 h-4 ${isActive ? ch.colorClass.split(" ")[1] : "text-muted-foreground"}`} />
              </div>
              <span className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3-Column Layout: Recipients | Compose | Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* ── Column 1: Recipients ── */}
        <div className="xl:col-span-3">
          <Card className="shadow-card h-full">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <Tabs value={sendMode} onValueChange={(v) => { setSendMode(v); setFetchedCount(null); setCsvPreview(null); setCsvFile(null); setSelectedExistingCsv(""); }}>
                <TabsList className="grid w-full grid-cols-3 mb-4 h-8">
                  <TabsTrigger value="database" className="text-xs">DB Fetch</TabsTrigger>
                  <TabsTrigger value="manual" className="text-xs">Manual</TabsTrigger>
                  <TabsTrigger value="csv" className="text-xs">CSV</TabsTrigger>
                </TabsList>

                <TabsContent value="database" className="space-y-3">
                  {defaultApis.filter(a => a.status === "Active").length > 1 && (
                    <div>
                      <Label className="text-foreground text-xs mb-1 block">API Source</Label>
                      <Select value={selectedApiId} onValueChange={v => { setSelectedApiId(v); setApiFilterValues({}); setFetchedCount(null); }}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Select API" /></SelectTrigger>
                        <SelectContent>{defaultApis.filter(a => a.status === "Active").map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                  {!activeApi ? (
                    <div className="text-center py-4 text-muted-foreground">
                      <Server className="w-6 h-6 mx-auto mb-1 opacity-40" />
                      <p className="text-xs">No API configured</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {dynamicFilters.length > 0 && dynamicFilters.map(f => (
                        <div key={f.key}>
                          <Label className="text-foreground text-[11px] mb-0.5 block">{f.label}</Label>
                          {f.options.length > 0 ? (
                            <Select value={apiFilterValues[f.key] || ""} onValueChange={v => setApiFilterValues(p => ({ ...p, [f.key]: v === "__all__" ? "" : v }))}>
                              <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={`All`} /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="__all__">All</SelectItem>
                                {f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input placeholder={f.example || `Enter ${f.label}`} value={apiFilterValues[f.key] || ""} onChange={e => setApiFilterValues(p => ({ ...p, [f.key]: e.target.value }))} className="h-8 text-xs" />
                          )}
                        </div>
                      ))}
                      {Object.values(apiFilterValues).some(Boolean) && (
                        <Button variant="ghost" size="sm" className="text-[10px] h-6 px-2" onClick={() => setApiFilterValues({})}>
                          <X className="w-3 h-3 mr-0.5" /> Clear
                        </Button>
                      )}
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full h-8 text-xs" onClick={handleFetchRecipients} disabled={!activeApi}>
                    <Users className="w-3 h-3 mr-1" /> Fetch Recipients
                  </Button>
                  {fetchedCount !== null && (
                    <div className="p-2 rounded-lg bg-success/5 border border-success/20 flex items-center gap-2">
                      <Check className="w-3 h-3 text-success" />
                      <span className="text-xs font-medium text-foreground">{fetchedCount.toLocaleString()} matched</span>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="manual" className="space-y-2">
                  {numbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Input placeholder={channel === "email" ? "email@example.com" : "+91 XXXXX"} value={num} onChange={(e) => updateNumber(i, e.target.value)} className="h-8 text-xs" />
                      {numbers.length > 1 && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeNumber(i)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addNumber} className="w-full h-7 text-xs"><Plus className="w-3 h-3 mr-1" /> Add</Button>
                </TabsContent>

                <TabsContent value="csv" className="space-y-3">
                  <div className="flex gap-1.5">
                    <Button variant={csvSource === "new" ? "default" : "outline"} size="sm" className="flex-1 h-7 text-xs" onClick={() => { setCsvSource("new"); setCsvPreview(null); setSelectedExistingCsv(""); }}>
                      <Upload className="w-3 h-3 mr-1" /> New
                    </Button>
                    <Button variant={csvSource === "existing" ? "default" : "outline"} size="sm" className="flex-1 h-7 text-xs" onClick={() => { setCsvSource("existing"); setCsvPreview(null); setCsvFile(null); }}>
                      <FolderOpen className="w-3 h-3 mr-1" /> Existing
                    </Button>
                  </div>
                  {csvSource === "new" ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors">
                      <Upload className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-[10px] text-muted-foreground mb-2">Upload CSV</p>
                      <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" id="csv-upload" />
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => document.getElementById("csv-upload")?.click()}>Choose File</Button>
                      {csvFile && <p className="text-[10px] text-foreground mt-1">{csvFile.name}</p>}
                    </div>
                  ) : (
                    <ScrollArea className="max-h-[180px]">
                      <div className="space-y-1.5">
                        {existingCsvUploads.map(csv => (
                          <button
                            key={csv.id}
                            onClick={() => handleSelectExistingCsv(csv.id)}
                            className={`w-full p-2 rounded-lg border text-left transition-all text-xs ${selectedExistingCsv === csv.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-foreground">{csv.name}</span>
                              <Badge variant="secondary" className="text-[10px] h-5">{csv.validRecords.toLocaleString()}</Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                  {csvPreview && (
                    <div className="flex gap-2 text-[10px]">
                      <Badge variant="default" className="bg-success/10 text-success border-success/20 h-5">{csvPreview.valid} Valid</Badge>
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 h-5">{csvPreview.invalid} Invalid</Badge>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* ── Column 2: Compose ── */}
        <div className="xl:col-span-5 space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {/* Sender ID */}
              {(channel === "sms" || channel === "whatsapp") && (
                <div>
                  <Label className="text-foreground text-xs">Sender ID / Header</Label>
                  <Select value={selectedSenderId} onValueChange={setSelectedSenderId}>
                    <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {senderIds.map(sid => <SelectItem key={sid} value={sid}>{sid}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Template */}
              <div>
                <Label className="text-foreground text-xs">Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="mt-1 h-9"><SelectValue placeholder="Choose template or write custom" /></SelectTrigger>
                  <SelectContent>
                    {currentTemplates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject (email) */}
              {channel === "email" && (
                <div>
                  <Label className="text-foreground text-xs">Subject</Label>
                  <Input placeholder="Email subject" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 h-9" />
                </div>
              )}

              {/* Message Body */}
              <div>
                <Label className="text-foreground text-xs">Message Body</Label>
                <Textarea
                  placeholder="Type your message..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="mt-1 min-h-[120px]"
                />
                {channel === "sms" && (
                  <p className="text-[10px] text-muted-foreground mt-1">{messageBody.length} chars · {smsParts} SMS part{smsParts > 1 ? "s" : ""}</p>
                )}
              </div>

              {/* Variables */}
              <div>
                <Label className="text-foreground text-[10px] mb-1 block">Insert Variable</Label>
                <div className="flex flex-wrap gap-1">
                  {allVariables.map((v) => (
                    <Button key={v} variant="outline" size="sm" className="text-[10px] h-6 px-2" onClick={() => insertVariable(v)}>{`{{${v}}}`}</Button>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              {supportsMedia && (
                <div className="pt-2 border-t border-border">
                  <Label className="text-foreground text-xs mb-2 block">Multimedia Attachment</Label>
                  {mediaFile ? (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border">
                      <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-foreground flex-1 truncate">{mediaFile.name}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setMediaFile(null)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="file" accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleMediaUpload} className="hidden" id="media-upload" />
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => document.getElementById("media-upload")?.click()}>
                        <Image className="w-3 h-3 mr-1" /> Image
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => document.getElementById("media-upload")?.click()}>
                        <Video className="w-3 h-3 mr-1" /> Video
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => document.getElementById("media-upload")?.click()}>
                        <Paperclip className="w-3 h-3 mr-1" /> File
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {supportsActions && (
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-foreground text-xs">Action Buttons</Label>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2" onClick={addActionButton} disabled={actionButtons.length >= 3}>
                      <Plus className="w-3 h-3 mr-0.5" /> Add Button
                    </Button>
                  </div>
                  {actionButtons.map((btn, i) => (
                    <div key={i} className="flex gap-1.5 mb-2 items-start">
                      <Select value={btn.type} onValueChange={v => updateActionButton(i, "type", v)}>
                        <SelectTrigger className="h-8 text-xs w-28 shrink-0"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {actionButtonTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input placeholder="Button Label" value={btn.label} onChange={e => updateActionButton(i, "label", e.target.value)} className="h-8 text-xs" />
                      <Input placeholder={btn.type === "call" ? "+91..." : btn.type === "url" ? "https://..." : "Reply text"} value={btn.value} onChange={e => updateActionButton(i, "value", e.target.value)} className="h-8 text-xs" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeActionButton(i)}>
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  {actionButtons.length === 0 && (
                    <p className="text-[10px] text-muted-foreground">Add up to 3 interactive buttons</p>
                  )}
                </div>
              )}

              {/* Schedule */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                <Label className="text-foreground text-xs">Schedule for later</Label>
              </div>
              {scheduleEnabled && (
                <div className="grid grid-cols-2 gap-2">
                  <div><Label className="text-foreground text-[10px]">Date</Label><Input type="date" className="mt-0.5 h-8 text-xs" /></div>
                  <div><Label className="text-foreground text-[10px]">Time</Label><Input type="time" className="mt-0.5 h-8 text-xs" /></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary & Send */}
          <Card className="shadow-card">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-foreground">Message Summary</p>
                  <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                    <span>Channel: <strong className="text-foreground">{channel.toUpperCase()}</strong></span>
                    <span>·</span>
                    <span>Recipients: <strong className="text-foreground">{recipientCount.toLocaleString()}</strong></span>
                    <span>·</span>
                    <span>Mode: <strong className="text-foreground">{sendMode === "database" ? "DB Fetch" : sendMode === "csv" ? "CSV" : "Manual"}</strong></span>
                    {mediaFile && <><span>·</span><span>📎 Attachment</span></>}
                    {actionButtons.filter(b => b.label).length > 0 && <><span>·</span><span>🔘 {actionButtons.filter(b => b.label).length} Button(s)</span></>}
                  </div>
                </div>
                <Button onClick={handleSend} disabled={sending || !messageBody.trim() || recipientCount === 0} className="min-w-[120px]">
                  {sending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin">⏳</span> Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send</span>
                  )}
                </Button>
              </div>
              {recipientCount === 0 && messageBody.trim() && (
                <div className="flex items-center gap-2 text-[10px] text-warning mt-2">
                  <AlertCircle className="w-3 h-3" />
                  <span>No recipients selected.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Column 3: Live Preview ── */}
        <div className="xl:col-span-4">
          <Card className="shadow-card h-full">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Live Preview
                <Badge variant="secondary" className="text-[10px] h-5 ml-auto">{channel.toUpperCase()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex items-center justify-center">
              {channel === "sms" && (
                <SmsPreview body={messageBody} senderId={selectedSenderId} />
              )}
              {channel === "whatsapp" && (
                <WhatsAppPreview body={messageBody} senderId={selectedSenderId} mediaFile={mediaFile} actionButtons={actionButtons} />
              )}
              {channel === "email" && (
                <EmailPreview body={messageBody} subject={subject} senderId={selectedSenderId} mediaFile={mediaFile} actionButtons={actionButtons} />
              )}
              {channel === "rcs" && (
                <RcsPreview body={messageBody} senderId={selectedSenderId} mediaFile={mediaFile} actionButtons={actionButtons} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
