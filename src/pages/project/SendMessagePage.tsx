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
import { toast } from "sonner";
import {
  Send, Upload, Database, Phone, MessageSquare, Mail, Sparkles,
  FileText, X, Check, AlertCircle, Users, Plus, Trash2, Calendar,
  Filter, Server,
} from "lucide-react";
import { defaultApis, type ApiEndpoint, type ApiFilter } from "./ProjectConfigPage";

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

const channelConfig = [
  { id: "sms", label: "SMS", icon: Phone, colorClass: "border-channel-sms text-channel-sms", activeBg: "bg-channel-sms/5 border-channel-sms", iconBg: "bg-channel-sms/10" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, colorClass: "border-channel-whatsapp text-channel-whatsapp", activeBg: "bg-channel-whatsapp/5 border-channel-whatsapp", iconBg: "bg-channel-whatsapp/10" },
  { id: "email", label: "Email", icon: Mail, colorClass: "border-channel-email text-channel-email", activeBg: "bg-channel-email/5 border-channel-email", iconBg: "bg-channel-email/10" },
  { id: "rcs", label: "RCS", icon: Sparkles, colorClass: "border-channel-rcs text-channel-rcs", activeBg: "bg-channel-rcs/5 border-channel-rcs", iconBg: "bg-channel-rcs/10" },
];

const allVariables = ["name", "otp", "project_name", "date", "amount", "link"];

const SendMessagePage = () => {
  const [channel, setChannel] = useState("sms");
  const [sendMode, setSendMode] = useState("database");
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [subject, setSubject] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<{ headers: string[]; rows: string[][]; valid: number; invalid: number; duplicates: number } | null>(null);
  const [sending, setSending] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState("DICNTFY");
  const senderIds = ["DICNTFY", "MYBHRT"];
  const [fetchedCount, setFetchedCount] = useState<number | null>(null);
  const [selectedApiId, setSelectedApiId] = useState(defaultApis[0]?.id || "");

  // Dynamic API filter values
  const [apiFilterValues, setApiFilterValues] = useState<Record<string, string>>({});

  // Get the active API's filters dynamically
  const activeApi = defaultApis.find(a => a.id === selectedApiId && a.status === "Active");

  // Build dynamic filters with options parsed from the "example" field
  const dynamicFilters = useMemo(() => {
    if (!activeApi) return [];
    return activeApi.filters.map(f => ({
      ...f,
      options: f.example ? f.example.split(",").map(s => s.trim()).filter(Boolean) : [],
    }));
  }, [activeApi]);

  const currentTemplates = templates[channel] || [];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = currentTemplates.find((t) => t.id === templateId);
    if (tmpl) setMessageBody(tmpl.body);
  };

  const insertVariable = (v: string) => setMessageBody((prev) => prev + `{{${v}}}`);
  const addNumber = () => setNumbers([...numbers, ""]);
  const removeNumber = (i: number) => setNumbers(numbers.filter((_, idx) => idx !== i));
  const updateNumber = (i: number, val: string) => {
    const updated = [...numbers];
    updated[i] = val;
    setNumbers(updated);
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
      toast.success("Campaign submitted successfully!", { description: `Messages queued for delivery via ${channel.toUpperCase()}` });
    }, 1500);
  };

  const recipientCount = sendMode === "manual"
    ? numbers.filter((n) => n.trim()).length
    : sendMode === "csv"
    ? csvPreview?.valid ?? 0
    : fetchedCount ?? 0;

  const smsParts = Math.max(1, Math.ceil(messageBody.length / 160));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send Message</h1>
        <p className="text-muted-foreground mt-1">Compose and send via any channel</p>
      </div>

      {/* Channel Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {channelConfig.map((ch) => {
          const isActive = channel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => { setChannel(ch.id); setSelectedTemplate(""); setMessageBody(""); }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                isActive ? ch.activeBg : "border-border bg-card hover:border-border/80"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isActive ? ch.iconBg : "bg-muted"}`}>
                <ch.icon className={`w-5 h-5 ${isActive ? ch.colorClass.split(" ")[1] : "text-muted-foreground"}`} />
              </div>
              <span className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column — Recipients */}
        <div className="lg:col-span-2">
          <Card className="shadow-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={sendMode} onValueChange={(v) => { setSendMode(v); setFetchedCount(null); }}>
                <TabsList className="grid w-full grid-cols-3 mb-5">
                  <TabsTrigger value="database">Bulk DB</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                  <TabsTrigger value="csv">CSV Upload</TabsTrigger>
                </TabsList>

                {/* === Bulk DB Tab === */}
                <TabsContent value="database" className="space-y-4">
                  {/* API Selection (if multiple APIs configured) */}
                  {defaultApis.filter(a => a.status === "Active").length > 1 && (
                    <div>
                      <Label className="text-foreground text-xs mb-1.5 block">Select API Source</Label>
                      <Select value={selectedApiId} onValueChange={v => { setSelectedApiId(v); setApiFilterValues({}); setFetchedCount(null); }}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select API" /></SelectTrigger>
                        <SelectContent>{defaultApis.filter(a => a.status === "Active").map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}

                  {!activeApi ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Server className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">No API endpoints configured</p>
                      <p className="text-xs mt-1">Go to <span className="font-medium text-foreground">Configuration → API Endpoints</span> to add one.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-2 rounded-lg bg-info/5 border border-info/20">
                        <p className="text-xs text-muted-foreground"><Server className="w-3 h-3 inline mr-1" />Dynamic filters from <span className="font-medium text-foreground">{activeApi.name}</span>. All filters are optional — leave empty to fetch all data.</p>
                      </div>

                      {dynamicFilters.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No filters configured for this API. All recipients will be fetched.</p>
                      ) : (
                        <div className="space-y-2">
                          {dynamicFilters.map(f => (
                            <div key={f.key}>
                              <Label className="text-foreground text-xs mb-1 block">{f.label}</Label>
                              {f.options.length > 0 ? (
                                <Select
                                  value={apiFilterValues[f.key] || ""}
                                  onValueChange={v => setApiFilterValues(p => ({ ...p, [f.key]: v === "__all__" ? "" : v }))}
                                >
                                  <SelectTrigger className="h-9 text-xs">
                                    <SelectValue placeholder={`All ${f.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="__all__">All {f.label}</SelectItem>
                                    {f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  placeholder={`Enter ${f.label}`}
                                  value={apiFilterValues[f.key] || ""}
                                  onChange={e => setApiFilterValues(p => ({ ...p, [f.key]: e.target.value }))}
                                  className="h-9 text-xs"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {Object.values(apiFilterValues).some(Boolean) && (
                        <Button variant="ghost" size="sm" className="text-xs" onClick={() => setApiFilterValues({})}>
                          <X className="w-3 h-3 mr-1" /> Clear All Filters
                        </Button>
                      )}
                    </div>
                  )}

                  <Button variant="outline" className="w-full" onClick={handleFetchRecipients} disabled={!activeApi}>
                    <Users className="w-4 h-4 mr-2" /> Fetch Recipients
                  </Button>

                  {fetchedCount !== null && (
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20 flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-foreground">{fetchedCount.toLocaleString()} recipients matched</span>
                    </div>
                  )}
                </TabsContent>

                {/* === Manual Tab === */}
                <TabsContent value="manual" className="space-y-3">
                  {numbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        placeholder={channel === "email" ? "recipient@example.com" : "+91 XXXXX XXXXX"}
                        value={num}
                        onChange={(e) => updateNumber(i, e.target.value)}
                      />
                      {numbers.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeNumber(i)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addNumber} className="w-full">
                    <Plus className="w-4 h-4 mr-1" /> Add Recipient
                  </Button>
                </TabsContent>

                {/* === CSV Upload Tab === */}
                <TabsContent value="csv" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload CSV with recipient data</p>
                    <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" id="csv-upload" />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("csv-upload")?.click()}>
                      Choose File
                    </Button>
                    {csvFile && <p className="text-xs text-foreground mt-2">{csvFile.name}</p>}
                  </div>
                  {csvPreview && (
                    <div className="space-y-3">
                      <div className="flex gap-3 text-xs">
                        <Badge variant="default" className="bg-success/10 text-success border-success/20">{csvPreview.valid} Valid</Badge>
                        <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">{csvPreview.invalid} Invalid</Badge>
                        <Badge variant="secondary">{csvPreview.duplicates} Duplicates</Badge>
                      </div>
                      <div className="overflow-auto max-h-40 rounded-lg border border-border">
                        <table className="w-full text-xs">
                          <thead className="bg-muted">
                            <tr>{csvPreview.headers.map((h, i) => <th key={i} className="px-3 py-2 text-left text-foreground font-medium">{h}</th>)}</tr>
                          </thead>
                          <tbody>
                            {csvPreview.rows.map((row, i) => (
                              <tr key={i} className="border-t border-border">
                                {row.map((c, j) => <td key={j} className="px-3 py-1.5 text-muted-foreground">{c}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column — Message Compose */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sender ID Selection */}
              {(channel === "sms" || channel === "whatsapp") && (
                <div>
                  <Label className="text-foreground text-sm">Sender ID / Header</Label>
                  <Select value={selectedSenderId} onValueChange={setSelectedSenderId}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Sender ID" /></SelectTrigger>
                    <SelectContent>
                      {senderIds.map(sid => <SelectItem key={sid} value={sid}>{sid}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Template Selection */}
              <div>
                <Label className="text-foreground text-sm">Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose a template or write custom" /></SelectTrigger>
                  <SelectContent>
                    {currentTemplates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject (email only) */}
              {channel === "email" && (
                <div>
                  <Label className="text-foreground text-sm">Subject</Label>
                  <Input placeholder="Email subject" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1.5" />
                </div>
              )}

              {/* Message Body */}
              <div>
                <Label className="text-foreground text-sm">Message Body</Label>
                <Textarea
                  placeholder="Type your message..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="mt-1.5 min-h-[140px]"
                />
                {channel === "sms" && (
                  <p className="text-xs text-muted-foreground mt-1">{messageBody.length} chars · {smsParts} SMS part{smsParts > 1 ? "s" : ""}</p>
                )}
              </div>

              {/* Variables */}
              <div>
                <Label className="text-foreground text-xs mb-2 block">Insert Variable</Label>
                <div className="flex flex-wrap gap-1.5">
                  {allVariables.map((v) => (
                    <Button key={v} variant="outline" size="sm" className="text-xs h-7" onClick={() => insertVariable(v)}>
                      {`{{${v}}}`}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                <Label className="text-foreground text-sm">Schedule for later</Label>
              </div>
              {scheduleEnabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-foreground text-xs">Date</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-foreground text-xs">Time</Label>
                    <Input type="time" className="mt-1" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary & Send */}
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Campaign Summary</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>Channel: <strong className="text-foreground">{channel.toUpperCase()}</strong></span>
                    <span>·</span>
                    <span>Recipients: <strong className="text-foreground">{recipientCount.toLocaleString()}</strong></span>
                    <span>·</span>
                    <span>Mode: <strong className="text-foreground">{sendMode === "database" ? "Bulk DB" : sendMode === "csv" ? "CSV" : "Manual"}</strong></span>
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={sending || !messageBody.trim() || recipientCount === 0}
                  className="min-w-[140px]"
                >
                  {sending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin">⏳</span> Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Campaign</span>
                  )}
                </Button>
              </div>
              {recipientCount === 0 && messageBody.trim() && (
                <div className="flex items-center gap-2 text-xs text-warning">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>No recipients selected. Add recipients before sending.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
