import { useState, useEffect } from "react";
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
  Filter, MapPin, UserCheck, FolderTree, Activity, Server,
} from "lucide-react";

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

const dbSegments = [
  { id: "db1", name: "All Active Users", count: 12400 },
  { id: "db2", name: "Premium Members", count: 3200 },
  { id: "db3", name: "New Signups (Last 7 Days)", count: 890 },
  { id: "db4", name: "Inactive Users (30+ Days)", count: 5600 },
];

// Simulated API-driven dynamic filters (from project's configured API)
interface ApiFilter {
  key: string;
  label: string;
  options: string[];
}

const simulatedApiFilters: ApiFilter[] = [
  { key: "state", label: "State", options: ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra", "Bihar"] },
  { key: "district", label: "District", options: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"] },
  { key: "urban_rural", label: "Urban/Rural", options: ["Urban", "Rural"] },
  { key: "block", label: "Block", options: ["Huzur", "Berasia", "Phanda", "Sehore", "Nasrullaganj"] },
  { key: "gram_panchayat", label: "Gram Panchayat", options: ["Ratua Khurd", "Bairagarh Chichli", "Khajuri Sadak", "Misrod", "Awadhpuri"] },
  { key: "village", label: "Village", options: ["Lambakheda", "Neelbad", "Kolar", "Ratibad", "Bagroda"] },
  { key: "user_type", label: "User Type", options: ["Youth", "Organization"] },
  { key: "category", label: "Category", options: ["Education", "Health", "Agriculture", "Finance", "Technology"] },
  { key: "activity", label: "Activity", options: ["Quiz", "Events", "ELP", "Essay"] },
  { key: "activity_status", label: "Activity Status", options: ["Attendee", "Successfully Completed"] },
];

// Static fallback filters (when no API is configured)
const staticFilters = {
  states: ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra", "Bihar", "Gujarat"],
  districts: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"],
  urbanRural: ["Urban", "Rural"],
  blocks: ["Huzur", "Berasia", "Phanda", "Sehore", "Nasrullaganj"],
  gramPanchayats: ["Ratua Khurd", "Bairagarh Chichli", "Khajuri Sadak", "Misrod", "Awadhpuri"],
  villages: ["Lambakheda", "Neelbad", "Kolar", "Ratibad", "Bagroda"],
  userTypes: ["Youth", "Organization"],
  categories: ["Education", "Health", "Agriculture", "Finance", "Technology"],
  subCategories: {
    Education: ["Primary", "Secondary", "Higher", "Vocational"],
    Health: ["General", "Maternal", "Child", "Mental"],
    Agriculture: ["Crop", "Dairy", "Fishery", "Horticulture"],
    Finance: ["Banking", "Insurance", "Microfinance", "Investment"],
    Technology: ["IT", "Mobile", "Digital Literacy", "Cybersecurity"],
  } as Record<string, string[]>,
  activityTypes: ["Quiz", "Events", "ELP", "Essay"],
  activityStatus: ["Attendee", "Successfully Completed"],
};

const SendMessagePage = () => {
  const [channel, setChannel] = useState("sms");
  const [sendMode, setSendMode] = useState("database");
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [subject, setSubject] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<{ headers: string[]; rows: string[][]; valid: number; invalid: number; duplicates: number } | null>(null);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [sending, setSending] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [fetchedCount, setFetchedCount] = useState<number | null>(null);
  const [dbSource, setDbSource] = useState<"static" | "api">("api");

  // Dynamic API filter values
  const [apiFilterValues, setApiFilterValues] = useState<Record<string, string>>({});

  // Static filter states
  const [filterState, setFilterState] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterUrbanRural, setFilterUrbanRural] = useState("");
  const [filterBlock, setFilterBlock] = useState("");
  const [filterGP, setFilterGP] = useState("");
  const [filterVillage, setFilterVillage] = useState("");
  const [filterUserType, setFilterUserType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");
  const [filterActivity, setFilterActivity] = useState("");
  const [filterActivityStatus, setFilterActivityStatus] = useState("");

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
    if (dbSource === "api") {
      const activeFilters = Object.values(apiFilterValues).filter(Boolean).length;
      count = Math.max(Math.floor(12400 * Math.pow(0.45, activeFilters)), 15);
    } else {
      if (filterState) count = Math.floor(count * 0.4);
      if (filterDistrict) count = Math.floor(count * 0.3);
      if (filterUrbanRural) count = Math.floor(count * 0.6);
      if (filterBlock) count = Math.floor(count * 0.5);
      if (filterUserType) count = Math.floor(count * 0.35);
      if (filterCategory) count = Math.floor(count * 0.45);
      if (filterActivity) count = Math.floor(count * 0.25);
    }
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
                  {/* Source Toggle */}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Button variant={dbSource === "api" ? "default" : "ghost"} size="sm" className="flex-1 h-8 text-xs" onClick={() => setDbSource("api")}>
                      <Server className="w-3.5 h-3.5 mr-1" /> API Filters
                    </Button>
                    <Button variant={dbSource === "static" ? "default" : "ghost"} size="sm" className="flex-1 h-8 text-xs" onClick={() => setDbSource("static")}>
                      <Database className="w-3.5 h-3.5 mr-1" /> Static Filters
                    </Button>
                  </div>

                  {dbSource === "api" ? (
                    /* Dynamic API Filters */
                    <div className="space-y-3">
                      <div className="p-2 rounded-lg bg-info/5 border border-info/20">
                        <p className="text-xs text-muted-foreground"><Server className="w-3 h-3 inline mr-1" />Filters loaded from your configured API endpoint. Manage in <span className="font-medium text-foreground">Configuration → API Endpoints</span>.</p>
                      </div>

                      {/* Location Filters */}
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                      <div className="grid grid-cols-2 gap-2">
                        {simulatedApiFilters.filter(f => ["state", "district", "urban_rural", "block", "gram_panchayat", "village"].includes(f.key)).map(f => (
                          <Select key={f.key} value={apiFilterValues[f.key] || ""} onValueChange={v => setApiFilterValues(p => ({ ...p, [f.key]: v }))}>
                            <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={f.label} /></SelectTrigger>
                            <SelectContent>{f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                        ))}
                      </div>

                      {/* User Filters */}
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><UserCheck className="w-3 h-3" /> User Filters</p>
                      <div className="grid grid-cols-2 gap-2">
                        {simulatedApiFilters.filter(f => ["user_type", "category"].includes(f.key)).map(f => (
                          <Select key={f.key} value={apiFilterValues[f.key] || ""} onValueChange={v => setApiFilterValues(p => ({ ...p, [f.key]: v }))}>
                            <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={f.label} /></SelectTrigger>
                            <SelectContent>{f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                        ))}
                      </div>

                      {/* Activity Filters */}
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Activity className="w-3 h-3" /> Activity</p>
                      <div className="grid grid-cols-2 gap-2">
                        {simulatedApiFilters.filter(f => ["activity", "activity_status"].includes(f.key)).map(f => (
                          <Select key={f.key} value={apiFilterValues[f.key] || ""} onValueChange={v => setApiFilterValues(p => ({ ...p, [f.key]: v }))}>
                            <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={f.label} /></SelectTrigger>
                            <SelectContent>{f.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                        ))}
                      </div>

                      {Object.values(apiFilterValues).some(Boolean) && (
                        <Button variant="ghost" size="sm" className="text-xs" onClick={() => setApiFilterValues({})}>Clear All Filters</Button>
                      )}
                    </div>
                  ) : (
                    /* Static Filters */
                    <div className="space-y-3">
                      <div>
                        <Label className="text-foreground text-sm mb-1.5 block">Select Audience Segment</Label>
                        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                          <SelectTrigger><SelectValue placeholder="Choose segment" /></SelectTrigger>
                          <SelectContent>
                            {dbSegments.map((s) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.count.toLocaleString()})</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <hr className="border-border" />
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" /> Or filter by criteria</p>

                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Select value={filterState} onValueChange={setFilterState}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="State" /></SelectTrigger>
                          <SelectContent>{staticFilters.states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="District" /></SelectTrigger>
                          <SelectContent>{staticFilters.districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterUrbanRural} onValueChange={setFilterUrbanRural}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Urban/Rural" /></SelectTrigger>
                          <SelectContent>{staticFilters.urbanRural.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterBlock} onValueChange={setFilterBlock}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Block" /></SelectTrigger>
                          <SelectContent>{staticFilters.blocks.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterGP} onValueChange={setFilterGP}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Gram Panchayat" /></SelectTrigger>
                          <SelectContent>{staticFilters.gramPanchayats.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterVillage} onValueChange={setFilterVillage}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Village" /></SelectTrigger>
                          <SelectContent>{staticFilters.villages.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><UserCheck className="w-3 h-3" /> User Type</p>
                      <Select value={filterUserType} onValueChange={setFilterUserType}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select user type" /></SelectTrigger>
                        <SelectContent>{staticFilters.userTypes.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                      </Select>

                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><FolderTree className="w-3 h-3" /> User Category</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v); setFilterSubCategory(""); }}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
                          <SelectContent>{staticFilters.categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterSubCategory} onValueChange={setFilterSubCategory} disabled={!filterCategory}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Sub-category" /></SelectTrigger>
                          <SelectContent>{(staticFilters.subCategories[filterCategory] || []).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Activity className="w-3 h-3" /> User Activity</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Select value={filterActivity} onValueChange={setFilterActivity}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Activity type" /></SelectTrigger>
                          <SelectContent>{staticFilters.activityTypes.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={filterActivityStatus} onValueChange={setFilterActivityStatus} disabled={!filterActivity}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                          <SelectContent>{staticFilters.activityStatus.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full" onClick={handleFetchRecipients}>
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
                        className="flex-1"
                      />
                      {numbers.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeNumber(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addNumber}><Plus className="w-3.5 h-3.5 mr-1" /> Add Recipient</Button>
                </TabsContent>

                {/* === CSV Tab === */}
                <TabsContent value="csv" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drop CSV file or click to browse</p>
                    <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" id="csv-upload" />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("csv-upload")?.click()}>Choose File</Button>
                    {csvFile && <p className="text-xs text-muted-foreground mt-2">{csvFile.name}</p>}
                  </div>
                  {csvPreview && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-success"><Check className="w-3.5 h-3.5" /> {csvPreview.valid} valid</span>
                        <span className="flex items-center gap-1 text-destructive"><X className="w-3.5 h-3.5" /> {csvPreview.invalid} invalid</span>
                        <span className="flex items-center gap-1 text-warning"><AlertCircle className="w-3.5 h-3.5" /> {csvPreview.duplicates} dup</span>
                      </div>
                      <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-xs">
                          <thead><tr className="bg-muted">{csvPreview.headers.map((h) => <th key={h} className="p-2 text-left font-medium text-muted-foreground">{h}</th>)}</tr></thead>
                          <tbody>{csvPreview.rows.map((row, i) => <tr key={i} className="border-t border-border">{row.map((c, j) => <td key={j} className="p-2 text-foreground">{c}</td>)}</tr>)}</tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column — Compose Message */}
        <div className="lg:col-span-3">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Compose Message
              </CardTitle>
              <p className="text-sm text-muted-foreground">Select a template or write a custom message</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="text-foreground text-sm mb-1.5 block">Template (Optional)</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger><SelectValue placeholder="Choose a template" /></SelectTrigger>
                  <SelectContent>
                    {currentTemplates.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {channel === "email" && (
                <div>
                  <Label className="text-foreground text-sm mb-1.5 block">Subject</Label>
                  <Input placeholder="Email subject line" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
              )}

              <div>
                <Label className="text-foreground text-sm mb-1.5 block">Message Body</Label>
                <Textarea
                  placeholder="Type your message here... Use {{variable}} for dynamic content"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  rows={channel === "email" ? 8 : 5}
                  className="resize-none"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-muted-foreground">{messageBody.length} characters</span>
                  {channel === "sms" && <span className="text-xs text-muted-foreground">{smsParts} SMS part(s)</span>}
                </div>
              </div>

              <div>
                <Label className="text-foreground text-sm mb-2 block">Insert Variable</Label>
                <div className="flex flex-wrap gap-2">
                  {allVariables.map((v) => (
                    <button
                      key={v}
                      onClick={() => insertVariable(v)}
                      className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-mono text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {`{{${v}}}`}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Schedule Send</p>
                  <p className="text-xs text-muted-foreground">Send at a specific date and time</p>
                </div>
                <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
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

              <hr className="border-border" />

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Campaign Summary</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Channel</span>
                  <span className="font-medium text-foreground">{channelConfig.find((c) => c.id === channel)?.label}</span>
                  <span className="text-muted-foreground">Recipients</span>
                  <span className="font-medium text-foreground">{recipientCount.toLocaleString()}</span>
                  <span className="text-muted-foreground">Mode</span>
                  <span className="font-medium text-foreground capitalize">{sendMode === "csv" ? "CSV Upload" : sendMode === "database" ? `Bulk DB (${dbSource === "api" ? "API" : "Static"})` : "Manual"}</span>
                  {selectedTemplate && (
                    <>
                      <span className="text-muted-foreground">Template</span>
                      <span className="font-medium text-foreground truncate">{currentTemplates.find((t) => t.id === selectedTemplate)?.name}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">Save Draft</Button>
                <Button
                  className="flex-1"
                  onClick={handleSend}
                  disabled={sending || !messageBody || recipientCount === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? "Sending..." : scheduleEnabled ? "Schedule" : "Send Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
