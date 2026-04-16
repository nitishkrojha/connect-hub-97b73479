import { useState, useMemo, useEffect } from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Send, Upload, Phone, MessageSquare, Mail, Sparkles,
  FileText, X, Check, AlertCircle, Users, Plus, Trash2,
  Server, FolderOpen, Image, Video, Paperclip,
  ExternalLink, Reply, MapPin, FileDown,
  CheckCheck, Wifi, Battery, Signal,
} from "lucide-react";
import { defaultApis } from "./ProjectConfigPage";
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
  ivrs: [
    { id: "iv1", name: "Survey Call", body: "Hello {{name}}, this is an automated call from {{project_name}}. Press 1 for Account Info, Press 2 for Complaints.", variables: ["name", "project_name"] },
  ],
};

const allChannelConfig = [
  { id: "sms", label: "SMS", icon: Phone, color: "hsl(var(--channel-sms, 221 83% 53%))" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, color: "hsl(142, 70%, 40%)" },
  { id: "email", label: "Email", icon: Mail, color: "hsl(var(--channel-email, 0 72% 51%))" },
  { id: "rcs", label: "RCS", icon: Sparkles, color: "hsl(var(--channel-rcs, 280 67% 55%))" },
  { id: "ivrs", label: "IVRS", icon: Phone, color: "hsl(var(--channel-ivrs, 173 58% 39%))" },
];

const allVariables = ["name", "otp", "project_name", "date", "amount", "link"];

const existingCsvUploads = [
  { id: "csv-1", name: "users_batch_1.csv", uploadDate: "Jun 8, 2025", totalRecords: 2400, validRecords: 2310 },
  { id: "csv-2", name: "promo_list.csv", uploadDate: "Jun 5, 2025", totalRecords: 5200, validRecords: 4980 },
  { id: "csv-3", name: "otp_numbers.csv", uploadDate: "Jun 3, 2025", totalRecords: 890, validRecords: 878 },
];

/* ─── Media Preview Helper ─── */
const MediaPreview = ({ file, className = "h-24" }: { file: File; className?: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  if (isImage && url) return <img src={url} alt={file.name} className={`w-full ${className} object-cover rounded-lg`} />;
  if (isVideo && url) return <video src={url} className={`w-full ${className} object-cover rounded-lg`} controls muted />;
  return <div className={`w-full ${className} bg-muted/50 flex items-center justify-center rounded-lg`}><Paperclip className="w-4 h-4 text-muted-foreground" /><span className="text-[10px] text-muted-foreground ml-1">{file.name}</span></div>;
};

/* ─── Preview Components ─── */

const PhoneFrame = ({ children, headerBg, headerContent }: { children: React.ReactNode; headerBg?: string; headerContent: React.ReactNode }) => (
  <div className="w-full max-w-[280px] mx-auto">
    <div className="rounded-[2rem] border-[3px] border-foreground/20 bg-foreground/5 p-1 shadow-xl">
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3 text-muted-foreground" />
          <Wifi className="w-3 h-3 text-muted-foreground" />
          <Battery className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
      <div className={`rounded-t-2xl px-4 py-3 flex items-center gap-3 ${headerBg || "bg-muted/60 border-b border-border"}`}>
        {headerContent}
      </div>
      <div className="bg-background rounded-b-2xl min-h-[280px] p-3 flex flex-col justify-end">
        {children}
      </div>
    </div>
  </div>
);

const SmsPreview = ({ body, senderId }: { body: string; senderId: string }) => (
  <PhoneFrame headerContent={
    <>
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Phone className="w-4 h-4 text-primary" /></div>
      <div><p className="text-xs font-semibold text-foreground">{senderId || "SENDER"}</p><p className="text-[10px] text-muted-foreground">SMS</p></div>
    </>
  }>
    {body.trim() ? (
      <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[95%] shadow-sm">
        <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
        <p className="text-[9px] text-muted-foreground text-right mt-1.5">Now</p>
      </div>
    ) : (
      <div className="text-center py-8"><Phone className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" /><p className="text-[10px] text-muted-foreground">Start composing to see preview</p></div>
    )}
  </PhoneFrame>
);

const WhatsAppPreview = ({ body, senderId, mediaFile, actionButtons }: { body: string; senderId: string; mediaFile: File | null; actionButtons: { label: string; type: string; value: string }[] }) => (
  <PhoneFrame
    headerBg="bg-[hsl(142,70%,35%)]"
    headerContent={
      <>
        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-background" /></div>
        <div><p className="text-xs font-semibold text-background">{senderId || "Business"}</p><p className="text-[10px] text-background/70">online</p></div>
      </>
    }
  >
    {body.trim() ? (
      <div className="space-y-1">
        <div className="bg-background rounded-xl rounded-tl-sm px-3 py-2 max-w-[95%] shadow-sm border border-border/50">
          {mediaFile && <div className="mb-2 overflow-hidden rounded-lg"><MediaPreview file={mediaFile} className="h-32" /></div>}
          <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
          <div className="flex items-center justify-end gap-1 mt-1"><span className="text-[9px] text-muted-foreground">Now</span><CheckCheck className="w-3 h-3 text-blue-500" /></div>
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
      <div className="text-center py-8"><MessageSquare className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" /><p className="text-[10px] text-muted-foreground">Start composing to see preview</p></div>
    )}
  </PhoneFrame>
);

const EmailPreview = ({ body, subject, senderId, mediaFile, actionButtons }: { body: string; subject: string; senderId: string; mediaFile: File | null; actionButtons: { label: string; type: string; value: string }[] }) => (
  <div className="w-full max-w-[300px] mx-auto">
    <div className="rounded-xl border border-border bg-background shadow-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-destructive/60" /><div className="w-2 h-2 rounded-full bg-warning/60" /><div className="w-2 h-2 rounded-full bg-success/60" />
          <span className="text-[10px] text-muted-foreground ml-2">Inbox</span>
        </div>
        <p className="text-sm font-semibold text-foreground truncate">{subject || "No Subject"}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center"><Mail className="w-2.5 h-2.5 text-primary" /></div>
          <span className="text-[10px] text-muted-foreground">{senderId || "noreply@example.com"}</span>
          <span className="text-[10px] text-muted-foreground ml-auto">Now</span>
        </div>
      </div>
      <div className="p-4 min-h-[200px]">
        {body.trim() ? (
          <div>
            {mediaFile && <div className="mb-3 overflow-hidden rounded-lg"><MediaPreview file={mediaFile} className="h-36" /></div>}
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">{body}</p>
            {actionButtons.filter(b => b.label.trim()).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {actionButtons.filter(b => b.label.trim()).map((btn, i) => (
                  <div key={i} className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-[11px] font-medium">{btn.label}</div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8"><Mail className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" /><p className="text-[10px] text-muted-foreground">Start composing to see preview</p></div>
        )}
      </div>
    </div>
  </div>
);

const RcsPreview = ({ body, senderId, mediaFile, actionButtons }: { body: string; senderId: string; mediaFile: File | null; actionButtons: { label: string; type: string; value: string }[] }) => (
  <PhoneFrame
    headerBg="bg-[hsl(280,67%,55%)]"
    headerContent={
      <>
        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center"><Sparkles className="w-4 h-4 text-background" /></div>
        <div><p className="text-xs font-semibold text-background">{senderId || "Business"}</p><p className="text-[10px] text-background/70">Verified</p></div>
      </>
    }
  >
    {body.trim() ? (
      <div className="rounded-xl border border-border overflow-hidden shadow-sm max-w-[95%]">
        {mediaFile && <div className="overflow-hidden"><MediaPreview file={mediaFile} className="h-32" /></div>}
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
    ) : (
      <div className="text-center py-8"><Sparkles className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" /><p className="text-[10px] text-muted-foreground">Start composing to see preview</p></div>
    )}
  </PhoneFrame>
);

/* ─── Recipient Dialog ─── */

const RecipientDialog = ({
  open, onOpenChange, channel, onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  channel: string;
  onConfirm: (data: { mode: string; count: number; label: string; details: string }) => void;
}) => {
  const [sendMode, setSendMode] = useState("database");
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvSource, setCsvSource] = useState<"new" | "existing">("new");
  const [selectedExistingCsv, setSelectedExistingCsv] = useState("");
  const [csvPreview, setCsvPreview] = useState<{ valid: number; invalid: number } | null>(null);
  const [fetchedCount, setFetchedCount] = useState<number | null>(null);
  const [selectedApiId, setSelectedApiId] = useState(defaultApis[0]?.id || "");
  const [apiFilterValues, setApiFilterValues] = useState<Record<string, string>>({});

  const activeApi = defaultApis.find(a => a.id === selectedApiId && a.status === "Active");

  const dynamicFilters = useMemo(() => {
    if (!activeApi) return [];
    return activeApi.filters.map(f => ({
      ...f,
      options: f.example ? f.example.split(",").map(s => s.trim()).filter(Boolean) : [],
    }));
  }, [activeApi]);

  const handleFetch = () => {
    let count = 12400;
    const activeFilters = Object.values(apiFilterValues).filter(Boolean).length;
    count = Math.max(Math.floor(12400 * Math.pow(0.45, activeFilters)), 15);
    setFetchedCount(Math.max(count, 12));
    toast.success(`${Math.max(count, 12).toLocaleString()} recipients fetched`);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      const total = lines.length - 1;
      setCsvPreview({ valid: Math.floor(total * 0.92), invalid: Math.floor(total * 0.08) });
    };
    reader.readAsText(file);
  };

  const handleSelectExistingCsv = (csvId: string) => {
    setSelectedExistingCsv(csvId);
    const csv = existingCsvUploads.find(c => c.id === csvId);
    if (csv) {
      setCsvPreview({ valid: csv.validRecords, invalid: csv.totalRecords - csv.validRecords });
    }
  };

  const getRecipientCount = () => {
    if (sendMode === "manual") return numbers.filter(n => n.trim()).length;
    if (sendMode === "csv") return csvPreview?.valid ?? 0;
    return fetchedCount ?? 0;
  };

  const getDetails = () => {
    if (sendMode === "database") {
      const appliedFilters = Object.entries(apiFilterValues).filter(([, v]) => v);
      if (appliedFilters.length > 0) return `API: ${activeApi?.name || "—"} · Filters: ${appliedFilters.map(([k, v]) => `${k}=${v}`).join(", ")}`;
      return `API: ${activeApi?.name || "—"} · No filters`;
    }
    if (sendMode === "csv") {
      if (csvSource === "existing" && selectedExistingCsv) {
        const csv = existingCsvUploads.find(c => c.id === selectedExistingCsv);
        return `CSV: ${csv?.name || "—"}`;
      }
      return `CSV: ${csvFile?.name || "—"}`;
    }
    return `Manual: ${numbers.filter(n => n.trim()).join(", ")}`;
  };

  const handleConfirm = () => {
    const count = getRecipientCount();
    if (count === 0) { toast.error("No recipients selected"); return; }
    onConfirm({
      mode: sendMode === "database" ? "DB Fetch" : sendMode === "csv" ? "CSV Upload" : "Manual Entry",
      count,
      label: sendMode === "database" ? (activeApi?.name || "API") : sendMode === "csv" ? (csvSource === "existing" ? existingCsvUploads.find(c => c.id === selectedExistingCsv)?.name || "CSV" : csvFile?.name || "CSV") : "Manual",
      details: getDetails(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Select Recipients
          </DialogTitle>
        </DialogHeader>

        <Tabs value={sendMode} onValueChange={(v) => { setSendMode(v); setFetchedCount(null); setCsvPreview(null); setCsvFile(null); setSelectedExistingCsv(""); }}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="database"><Server className="w-3.5 h-3.5 mr-1.5" />DB Fetch</TabsTrigger>
            <TabsTrigger value="manual"><Phone className="w-3.5 h-3.5 mr-1.5" />Manual</TabsTrigger>
            <TabsTrigger value="csv"><Upload className="w-3.5 h-3.5 mr-1.5" />CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="space-y-4">
            {defaultApis.filter(a => a.status === "Active").length > 1 && (
              <div>
                <Label className="text-xs text-foreground">API Source</Label>
                <Select value={selectedApiId} onValueChange={v => { setSelectedApiId(v); setApiFilterValues({}); setFetchedCount(null); }}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select API" /></SelectTrigger>
                  <SelectContent>{defaultApis.filter(a => a.status === "Active").map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            {!activeApi ? (
              <div className="text-center py-6 text-muted-foreground">
                <Server className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No active API configured</p>
                <p className="text-xs mt-1">Go to Configuration → API Endpoints to add one</p>
              </div>
            ) : (
              <>
                {dynamicFilters.length > 0 && (
                  <div className="space-y-3 p-3 rounded-lg border border-border bg-muted/30">
                    <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                      Filters
                    </p>
                    {dynamicFilters.map(f => (
                      <div key={f.key}>
                        <Label className="text-xs text-foreground mb-1 block">{f.label}</Label>
                        {f.options.length > 0 ? (
                          <Select value={apiFilterValues[f.key] || ""} onValueChange={v => setApiFilterValues(p => ({ ...p, [f.key]: v === "__all__" ? "" : v }))}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__all__">All</SelectItem>
                              {f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input placeholder={f.example || `Enter ${f.label}`} value={apiFilterValues[f.key] || ""} onChange={e => setApiFilterValues(p => ({ ...p, [f.key]: e.target.value }))} />
                        )}
                      </div>
                    ))}
                    {Object.values(apiFilterValues).some(Boolean) && (
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => setApiFilterValues({})}>
                        <X className="w-3 h-3 mr-1" /> Clear Filters
                      </Button>
                    )}
                  </div>
                )}
                <Button className="w-full" onClick={handleFetch} disabled={!activeApi}>
                  <Users className="w-4 h-4 mr-2" /> Fetch Recipients
                </Button>
                {fetchedCount !== null && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30 flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-foreground">{fetchedCount.toLocaleString()} recipients matched</span>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-3">
            <p className="text-xs text-muted-foreground">Enter {channel === "email" ? "email addresses" : "phone numbers"} manually</p>
            {numbers.map((num, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder={channel === "email" ? "email@example.com" : "+91 XXXXX XXXXX"} value={num} onChange={(e) => { const u = [...numbers]; u[i] = e.target.value; setNumbers(u); }} />
                {numbers.length > 1 && <Button variant="ghost" size="icon" onClick={() => setNumbers(numbers.filter((_, idx) => idx !== i))}><Trash2 className="w-4 h-4 text-destructive" /></Button>}
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => setNumbers([...numbers, ""])}><Plus className="w-4 h-4 mr-1" /> Add More</Button>
          </TabsContent>

          <TabsContent value="csv" className="space-y-3">
            <div className="flex gap-2">
              <Button variant={csvSource === "new" ? "default" : "outline"} className="flex-1" onClick={() => { setCsvSource("new"); setCsvPreview(null); setSelectedExistingCsv(""); }}>
                <Upload className="w-4 h-4 mr-1" /> Upload New
              </Button>
              <Button variant={csvSource === "existing" ? "default" : "outline"} className="flex-1" onClick={() => { setCsvSource("existing"); setCsvPreview(null); setCsvFile(null); }}>
                <FolderOpen className="w-4 h-4 mr-1" /> From Existing
              </Button>
            </div>
            {csvSource === "new" ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">Drop a CSV file or click to upload</p>
                <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" id="csv-dialog-upload" />
                <Button variant="outline" onClick={() => document.getElementById("csv-dialog-upload")?.click()}>Choose File</Button>
                {csvFile && <p className="text-sm text-foreground mt-2 font-medium">{csvFile.name}</p>}
              </div>
            ) : (
              <ScrollArea className="max-h-[200px]">
                <div className="space-y-2">
                  {existingCsvUploads.map(csv => (
                    <button
                      key={csv.id}
                      onClick={() => handleSelectExistingCsv(csv.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${selectedExistingCsv === csv.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{csv.name}</p>
                          <p className="text-xs text-muted-foreground">{csv.uploadDate}</p>
                        </div>
                        <Badge variant="secondary">{csv.validRecords.toLocaleString()} records</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
            {csvPreview && (
              <div className="flex gap-3">
                <Badge variant="default" className="bg-success/10 text-success border-success/20">{csvPreview.valid} Valid</Badge>
                <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">{csvPreview.invalid} Invalid</Badge>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Confirm bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
          <p className="text-sm text-muted-foreground">
            Selected: <strong className="text-foreground">{getRecipientCount().toLocaleString()}</strong> recipients
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleConfirm} disabled={getRecipientCount() === 0}>
              <Check className="w-4 h-4 mr-1" /> Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ─── Main Component ─── */

const SendMessagePage = () => {
  const { user } = useAuth();
  const enabledChannels = user?.enabledChannels || ["SMS", "WhatsApp", "Email", "RCS", "IVRS"];
  const channelConfig = allChannelConfig.filter(ch => enabledChannels.map(c => c.toLowerCase()).includes(ch.id));

  const [channel, setChannel] = useState(channelConfig[0]?.id || "sms");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState("DICNTFY");
  const senderIds = ["DICNTFY", "MYBHRT"];
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [actionButtons, setActionButtons] = useState<{ label: string; type: string; value: string }[]>([]);
  const [recipientDialogOpen, setRecipientDialogOpen] = useState(false);
  const [recipientData, setRecipientData] = useState<{ mode: string; count: number; label: string; details: string } | null>(null);
  const [selectedProvider, setSelectedProvider] = useState("default");

  // Simulated providers per channel
  const channelProviders: Record<string, { id: string; name: string; status: string }[]> = {
    sms: [
      { id: "default", name: "NIC Gateway (Default)", status: "active" },
      { id: "sms-cdac", name: "CDAC mGov", status: "active" },
    ],
    whatsapp: [
      { id: "default", name: "Meta Cloud API (Default)", status: "active" },
    ],
    email: [
      { id: "default", name: "Amazon SES (Default)", status: "active" },
    ],
    rcs: [
      { id: "default", name: "Google RBM (Default)", status: "degraded" },
    ],
    ivrs: [
      { id: "default", name: "Ozonetel CloudAgent (Default)", status: "active" },
    ],
  };

  const currentTemplates = templates[channel] || [];
  const supportsMedia = ["whatsapp", "email", "rcs"].includes(channel);
  const supportsActions = ["whatsapp", "email", "rcs"].includes(channel);
  const smsParts = Math.max(1, Math.ceil(messageBody.length / 160));
  const recipientCount = recipientData?.count ?? 0;

  const currentProviders = channelProviders[channel] || [];

  const handleChannelChange = (newChannel: string) => {
    setChannel(newChannel);
    setSelectedTemplate("");
    setMessageBody("");
    setSubject("");
    setMediaFile(null);
    setActionButtons([]);
    setSelectedProvider("default");
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = currentTemplates.find(t => t.id === templateId);
    if (tmpl) setMessageBody(tmpl.body);
  };

  const insertVariable = (v: string) => setMessageBody(prev => prev + `{{${v}}}`);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMediaFile(file);
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

  const actionButtonTypes = channel === "email"
    ? [{ value: "url", label: "Link" }]
    : channel === "rcs"
    ? [{ value: "url", label: "Open URL" }, { value: "call", label: "Call" }, { value: "reply", label: "Reply" }, { value: "location", label: "Location" }]
    : [{ value: "url", label: "Visit Website" }, { value: "call", label: "Call" }, { value: "reply", label: "Quick Reply" }];

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent successfully!", { description: `Messages queued for delivery via ${channel.toUpperCase()}` });
    }, 1500);
  };

  const activeChannelMeta = allChannelConfig.find(c => c.id === channel);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send Message</h1>
        <p className="text-sm text-muted-foreground mt-1">Select channel, add recipients, compose & preview</p>
      </div>

      {/* Step 1: Channel Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {channelConfig.map(ch => {
          const isActive = channel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => handleChannelChange(ch.id)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? "bg-primary/10" : "bg-muted"}`}>
                <ch.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div>
                <span className={`text-sm font-semibold block ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{ch.label}</span>
                {isActive && <span className="text-[10px] text-primary">Selected</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step 2: Recipients Bar */}
      <Card className="shadow-card">
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              {recipientData ? (
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{recipientData.count.toLocaleString()} Recipients</p>
                    <Badge variant="secondary" className="text-[10px]">{recipientData.mode}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{recipientData.details}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">No recipients selected</p>
                  <p className="text-xs text-muted-foreground">Click to add recipients via API, CSV, or manual entry</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {recipientData && (
                <Button variant="ghost" size="sm" onClick={() => setRecipientData(null)}>
                  <X className="w-4 h-4 mr-1" /> Clear
                </Button>
              )}
              <Button variant="outline" onClick={() => setRecipientDialogOpen(true)}>
                <Users className="w-4 h-4 mr-1" /> {recipientData ? "Change" : "Select Recipients"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Compose (Left) + Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Compose Form */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Compose {activeChannelMeta?.label} Message
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              {/* Sender ID */}
              <div>
                <Label className="text-foreground text-xs">Sender ID / Header</Label>
                <Select value={selectedSenderId} onValueChange={setSelectedSenderId}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{senderIds.map(sid => <SelectItem key={sid} value={sid}>{sid}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              {/* Provider Selection */}
              {currentProviders.length > 1 && (
                <div>
                  <Label className="text-foreground text-xs">Send via Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProviders.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          <span className="flex items-center gap-2">
                            {p.name}
                            {p.status === "degraded" && <span className="text-[10px] text-warning">⚠ Degraded</span>}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground mt-1">Auto-fallback is enabled if the selected provider fails</p>
                </div>
              )}

              <div>
                <Label className="text-foreground text-xs">Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choose template or write custom" /></SelectTrigger>
                  <SelectContent>{currentTemplates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              {/* Subject (email) */}
              {channel === "email" && (
                <div>
                  <Label className="text-foreground text-xs">Subject Line</Label>
                  <Input placeholder="Enter email subject" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1" />
                </div>
              )}

              {/* Message Body */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-foreground text-xs">Message Body</Label>
                  {channel === "sms" && (
                    <span className="text-[10px] text-muted-foreground">{messageBody.length} chars · {smsParts} part{smsParts > 1 ? "s" : ""}</span>
                  )}
                </div>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageBody}
                  onChange={e => setMessageBody(e.target.value)}
                  className="min-h-[140px]"
                />
              </div>

              {/* Variables */}
              <div>
                <Label className="text-foreground text-[11px] mb-1.5 block text-muted-foreground">Insert Variable</Label>
                <div className="flex flex-wrap gap-1.5">
                  {allVariables.map(v => (
                    <Button key={v} variant="outline" size="sm" className="text-xs h-7 px-2.5 font-mono" onClick={() => insertVariable(v)}>{`{{${v}}}`}</Button>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              {supportsMedia && (
                <div className="pt-3 border-t border-border">
                  <Label className="text-foreground text-xs mb-2 block">Multimedia Attachment</Label>
                  {mediaFile ? (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 border border-border">
                      <Paperclip className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground flex-1 truncate">{mediaFile.name}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setMediaFile(null)}><X className="w-3.5 h-3.5" /></Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="file" accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleMediaUpload} className="hidden" id="media-upload" />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById("media-upload")?.click()}><Image className="w-3.5 h-3.5 mr-1" /> Image</Button>
                      <Button variant="outline" size="sm" onClick={() => document.getElementById("media-upload")?.click()}><Video className="w-3.5 h-3.5 mr-1" /> Video</Button>
                      <Button variant="outline" size="sm" onClick={() => document.getElementById("media-upload")?.click()}><Paperclip className="w-3.5 h-3.5 mr-1" /> File</Button>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {supportsActions && (
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-foreground text-xs">Action Buttons</Label>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={addActionButton} disabled={actionButtons.length >= 3}>
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                  {actionButtons.map((btn, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-start">
                      <Select value={btn.type} onValueChange={v => updateActionButton(i, "type", v)}>
                        <SelectTrigger className="w-32 shrink-0"><SelectValue /></SelectTrigger>
                        <SelectContent>{actionButtonTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                      </Select>
                      <Input placeholder="Label" value={btn.label} onChange={e => updateActionButton(i, "label", e.target.value)} />
                      <Input placeholder={btn.type === "call" ? "+91..." : btn.type === "url" ? "https://..." : "Reply text"} value={btn.value} onChange={e => updateActionButton(i, "value", e.target.value)} />
                      <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeActionButton(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  ))}
                  {actionButtons.length === 0 && <p className="text-xs text-muted-foreground">Add up to 3 interactive buttons</p>}
                </div>
              )}

              {/* Schedule */}
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                <Label className="text-foreground text-xs">Schedule for later</Label>
              </div>
              {scheduleEnabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-foreground text-xs">Date</Label><Input type="date" className="mt-1" /></div>
                  <div><Label className="text-foreground text-xs">Time</Label><Input type="time" className="mt-1" /></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Send Button */}
          <Card className="shadow-card">
            <CardContent className="py-4 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Ready to Send</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                    <span>Channel: <strong className="text-foreground">{channel.toUpperCase()}</strong></span>
                    <span>·</span>
                    <span>Recipients: <strong className="text-foreground">{recipientCount.toLocaleString()}</strong></span>
                    {mediaFile && <><span>·</span><span>📎 Attachment</span></>}
                    {actionButtons.filter(b => b.label).length > 0 && <><span>·</span><span>🔘 {actionButtons.filter(b => b.label).length} Button(s)</span></>}
                    {currentProviders.length > 1 && <><span>·</span><span>Via: <strong className="text-foreground">{currentProviders.find(p => p.id === selectedProvider)?.name || "Default"}</strong></span></>}
                  </div>
                </div>
                <Button size="lg" onClick={handleSend} disabled={sending || !messageBody.trim() || recipientCount === 0} className="min-w-[140px]">
                  {sending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin">⏳</span> Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                  )}
                </Button>
              </div>
              {recipientCount === 0 && messageBody.trim() && (
                <div className="flex items-center gap-2 text-xs text-destructive mt-3">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>No recipients selected. Click "Select Recipients" above.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-5">
          <Card className="shadow-card h-full">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Live Preview
                <Badge variant="secondary" className="ml-auto">{activeChannelMeta?.label}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 flex items-center justify-center">
              {channel === "sms" && <SmsPreview body={messageBody} senderId={selectedSenderId} />}
              {channel === "whatsapp" && <WhatsAppPreview body={messageBody} senderId={selectedSenderId} mediaFile={mediaFile} actionButtons={actionButtons} />}
              {channel === "email" && <EmailPreview body={messageBody} subject={subject} senderId={selectedSenderId} mediaFile={mediaFile} actionButtons={actionButtons} />}
              {channel === "rcs" && <RcsPreview body={messageBody} senderId={selectedSenderId} mediaFile={mediaFile} actionButtons={actionButtons} />}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recipient Dialog */}
      <RecipientDialog
        open={recipientDialogOpen}
        onOpenChange={setRecipientDialogOpen}
        channel={channel}
        onConfirm={setRecipientData}
      />
    </div>
  );
};

export default SendMessagePage;
