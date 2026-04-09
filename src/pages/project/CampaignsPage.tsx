import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Plus, Search, ArrowRight, ArrowLeft, Check, Phone, MessageSquare,
  Mail, Sparkles, Users, Upload, Database, Trash2, Calendar,
  Eye, Send, FileText, Megaphone, BarChart3, Clock, Filter,
  MapPin, UserCheck, FolderTree, Activity, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---- data ----
const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "In Progress": "bg-info/10 text-info",
  Scheduled: "bg-warning/10 text-warning",
  Failed: "bg-destructive/10 text-destructive",
  Draft: "bg-muted text-muted-foreground",
  Cancelled: "bg-muted text-muted-foreground",
  "Partially Failed": "bg-warning/10 text-warning",
};

interface Campaign {
  id: number;
  name: string;
  channel: string;
  status: string;
  recipients: number;
  delivered: number;
  failed: number;
  date: string;
  message?: string;
  recipientSource?: string;
}

const initialCampaigns: Campaign[] = [
  { id: 1, name: "Welcome Onboarding", channel: "Email", status: "Completed", recipients: 2400, delivered: 2352, failed: 48, date: "Jun 8, 2025", recipientSource: "Bulk DB" },
  { id: 2, name: "OTP Verification Batch", channel: "SMS", status: "In Progress", recipients: 1200, delivered: 890, failed: 24, date: "Jun 9, 2025", recipientSource: "CSV Upload" },
  { id: 3, name: "Order Updates", channel: "WhatsApp", status: "Completed", recipients: 3400, delivered: 3318, failed: 82, date: "Jun 7, 2025", recipientSource: "Bulk DB" },
  { id: 4, name: "Summer Promo", channel: "RCS", status: "Scheduled", recipients: 5000, delivered: 0, failed: 0, date: "Jun 15, 2025", recipientSource: "Bulk DB" },
  { id: 5, name: "Account Alerts", channel: "SMS", status: "Failed", recipients: 800, delivered: 0, failed: 800, date: "Jun 6, 2025", recipientSource: "Manual" },
  { id: 6, name: "Newsletter June", channel: "Email", status: "Draft", recipients: 0, delivered: 0, failed: 0, date: "—", recipientSource: "Bulk DB" },
];

const channelConfig = [
  { id: "SMS", icon: Phone, color: "text-channel-sms", bg: "bg-channel-sms/10", activeBg: "bg-channel-sms/5 border-channel-sms" },
  { id: "WhatsApp", icon: MessageSquare, color: "text-channel-whatsapp", bg: "bg-channel-whatsapp/10", activeBg: "bg-channel-whatsapp/5 border-channel-whatsapp" },
  { id: "Email", icon: Mail, color: "text-channel-email", bg: "bg-channel-email/10", activeBg: "bg-channel-email/5 border-channel-email" },
  { id: "RCS", icon: Sparkles, color: "text-channel-rcs", bg: "bg-channel-rcs/10", activeBg: "bg-channel-rcs/5 border-channel-rcs" },
];

const templates: Record<string, { id: string; name: string; body: string }[]> = {
  SMS: [
    { id: "s1", name: "OTP Verification", body: "Your OTP is {{otp}}. Valid for 5 minutes." },
    { id: "s2", name: "Order Update", body: "Hi {{name}}, your order #{{order_id}} has been {{status}}." },
  ],
  WhatsApp: [
    { id: "w1", name: "Welcome Message", body: "Hello {{name}}! Welcome to {{project_name}}." },
    { id: "w2", name: "Appointment Reminder", body: "Hi {{name}}, your appointment is on {{date}}." },
  ],
  Email: [
    { id: "e1", name: "Welcome Email", body: "Dear {{name}},\n\nWelcome to {{project_name}}!\n\nBest regards" },
    { id: "e2", name: "Invoice", body: "Dear {{name}},\n\nPlease find invoice #{{invoice_id}} for {{amount}}." },
  ],
  RCS: [
    { id: "r1", name: "Promo Card", body: "{{name}}, check out our latest offer: {{offer_details}}" },
  ],
};

const dbSegments = [
  { id: "db1", name: "All Active Users", count: 12400 },
  { id: "db2", name: "Premium Members", count: 3200 },
  { id: "db3", name: "New Signups (Last 7 Days)", count: 890 },
  { id: "db4", name: "Inactive Users (30+ Days)", count: 5600 },
];

const states = ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra", "Bihar"];
const districts = ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"];
const urbanRural = ["Urban", "Rural"];
const blocks = ["Block A", "Block B", "Block C", "Block D"];
const gramPanchayats = ["GP Ramnagar", "GP Shivpur", "GP Lakshmipur"];
const villages = ["Village 1", "Village 2", "Village 3"];
const userTypes = ["Student", "Teacher", "Admin", "Volunteer", "Mentor"];
const categories = ["Education", "Health", "Agriculture", "Finance"];
const subCategories: Record<string, string[]> = {
  Education: ["Primary", "Secondary", "Higher"],
  Health: ["General", "Maternal", "Child"],
  Agriculture: ["Crop", "Dairy", "Fishery"],
  Finance: ["Banking", "Insurance", "Microfinance"],
};
const activityTypes = ["Quiz", "Events", "ELP", "Essay"];
const activityStatuses = ["Attendee", "Successfully Completed"];

const wizardSteps = [
  { label: "Campaign Info", icon: Megaphone },
  { label: "Channel", icon: MessageSquare },
  { label: "Recipients", icon: Users },
  { label: "Compose", icon: FileText },
  { label: "Review & Send", icon: Send },
];

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailCampaign, setDetailCampaign] = useState<Campaign | null>(null);
  const [step, setStep] = useState(0);

  // Wizard form
  const [form, setForm] = useState({
    name: "",
    description: "",
    channel: "",
    recipientMode: "database" as "database" | "manual" | "csv",
    // DB filters
    segment: "",
    filterState: "", filterDistrict: "", filterUrbanRural: "", filterBlock: "", filterGP: "", filterVillage: "",
    filterUserType: "", filterCategory: "", filterSubCategory: "", filterActivity: "", filterActivityStatus: "",
    fetchedCount: null as number | null,
    // Manual
    numbers: [""],
    // CSV
    csvFile: null as File | null,
    csvPreview: null as { headers: string[]; rows: string[][]; valid: number; invalid: number; duplicates: number } | null,
    // Message
    template: "",
    subject: "",
    messageBody: "",
    scheduleEnabled: false,
    scheduleDate: "",
  });

  const resetForm = () => {
    setForm({
      name: "", description: "", channel: "",
      recipientMode: "database",
      segment: "", filterState: "", filterDistrict: "", filterUrbanRural: "", filterBlock: "", filterGP: "", filterVillage: "",
      filterUserType: "", filterCategory: "", filterSubCategory: "", filterActivity: "", filterActivityStatus: "",
      fetchedCount: null,
      numbers: [""], csvFile: null, csvPreview: null,
      template: "", subject: "", messageBody: "",
      scheduleEnabled: false, scheduleDate: "",
    });
    setStep(0);
  };

  const canNext = () => {
    if (step === 0) return form.name.trim().length > 0;
    if (step === 1) return !!form.channel;
    if (step === 2) {
      if (form.recipientMode === "database") return form.fetchedCount !== null && form.fetchedCount > 0;
      if (form.recipientMode === "manual") return form.numbers.some((n) => n.trim());
      if (form.recipientMode === "csv") return form.csvPreview !== null;
    }
    if (step === 3) return form.messageBody.trim().length > 0;
    return true;
  };

  const recipientCount = form.recipientMode === "manual"
    ? form.numbers.filter((n) => n.trim()).length
    : form.recipientMode === "csv"
    ? form.csvPreview?.valid ?? 0
    : form.fetchedCount ?? 0;

  const handleFetchRecipients = () => {
    const base = form.segment ? (dbSegments.find((s) => s.id === form.segment)?.count ?? 0) : 12400;
    let count = base;
    if (form.filterState) count = Math.floor(count * 0.4);
    if (form.filterDistrict) count = Math.floor(count * 0.3);
    if (form.filterUrbanRural) count = Math.floor(count * 0.6);
    if (form.filterBlock) count = Math.floor(count * 0.5);
    if (form.filterUserType) count = Math.floor(count * 0.35);
    if (form.filterCategory) count = Math.floor(count * 0.45);
    if (form.filterActivity) count = Math.floor(count * 0.25);
    const final = Math.max(count, 12);
    setForm({ ...form, fetchedCount: final });
    toast.success(`${final.toLocaleString()} recipients matched`);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1, 6).map((l) => l.split(",").map((c) => c.trim()));
      const total = lines.length - 1;
      setForm({
        ...form,
        csvFile: file,
        csvPreview: { headers, rows, valid: Math.floor(total * 0.92), invalid: Math.floor(total * 0.05), duplicates: Math.floor(total * 0.03) },
      });
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name: form.name,
      channel: form.channel,
      status: form.scheduleEnabled ? "Scheduled" : "In Progress",
      recipients: recipientCount,
      delivered: 0,
      failed: 0,
      date: form.scheduleEnabled && form.scheduleDate ? form.scheduleDate : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      message: form.messageBody,
      recipientSource: form.recipientMode === "database" ? "Bulk DB" : form.recipientMode === "csv" ? "CSV Upload" : "Manual",
    };
    setCampaigns([newCampaign, ...campaigns]);
    setDialogOpen(false);
    resetForm();
    toast.success(form.scheduleEnabled ? "Campaign scheduled!" : "Campaign launched!", {
      description: `${recipientCount.toLocaleString()} recipients via ${form.channel}`,
    });
  };

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === "In Progress").length,
    completed: campaigns.filter((c) => c.status === "Completed").length,
    scheduled: campaigns.filter((c) => c.status === "Scheduled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Create, manage & track communication campaigns</p>
        </div>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" /> New Campaign</Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, icon: Megaphone, color: "text-primary" },
          { label: "Active", value: stats.active, icon: Send, color: "text-info" },
          { label: "Completed", value: stats.completed, icon: Check, color: "text-success" },
          { label: "Scheduled", value: stats.scheduled, icon: Clock, color: "text-warning" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="pt-4 pb-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className={cn("w-5 h-5", s.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search campaigns..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(statusStyle).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Campaign", "Channel", "Source", "Status", "Recipients", "Delivered", "Failed", "Date"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground p-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setDetailCampaign(c)}>
                    <td className="p-4 text-sm font-medium text-foreground">{c.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{c.channel}</td>
                    <td className="p-4 text-sm text-muted-foreground">{c.recipientSource || "—"}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="p-4 text-sm text-foreground">{c.recipients.toLocaleString()}</td>
                    <td className="p-4 text-sm text-success">{c.delivered.toLocaleString()}</td>
                    <td className="p-4 text-sm text-destructive">{c.failed}</td>
                    <td className="p-4 text-sm text-muted-foreground">{c.date}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No campaigns found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* === Campaign Detail Dialog === */}
      <Dialog open={!!detailCampaign} onOpenChange={() => setDetailCampaign(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5 text-primary" /> {detailCampaign?.name}</DialogTitle>
          </DialogHeader>
          {detailCampaign && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground text-xs">Channel</p><p className="font-medium text-foreground">{detailCampaign.channel}</p></div>
                <div><p className="text-muted-foreground text-xs">Source</p><p className="font-medium text-foreground">{detailCampaign.recipientSource || "—"}</p></div>
                <div><p className="text-muted-foreground text-xs">Status</p><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[detailCampaign.status]}`}>{detailCampaign.status}</span></div>
                <div><p className="text-muted-foreground text-xs">Date</p><p className="font-medium text-foreground">{detailCampaign.date}</p></div>
              </div>
              <hr className="border-border" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-lg font-bold text-foreground">{detailCampaign.recipients.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Recipients</p>
                </div>
                <div className="p-3 rounded-lg bg-success/5">
                  <p className="text-lg font-bold text-success">{detailCampaign.delivered.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/5">
                  <p className="text-lg font-bold text-destructive">{detailCampaign.failed}</p>
                  <p className="text-xs text-muted-foreground">Failed</p>
                </div>
              </div>
              {detailCampaign.recipients > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Delivery Rate</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success rounded-full h-2" style={{ width: `${(detailCampaign.delivered / detailCampaign.recipients * 100)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{(detailCampaign.delivered / detailCampaign.recipients * 100).toFixed(1)}%</p>
                </div>
              )}
              {detailCampaign.status === "Failed" && (
                <Button variant="outline" className="w-full"><Send className="w-4 h-4 mr-2" /> Retry Campaign</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* === Create Campaign Wizard === */}
      <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>A campaign groups recipients, channel, and message into a trackable send activity.</DialogDescription>
          </DialogHeader>

          {/* Step indicator */}
          <div className="flex items-center gap-1 mb-2">
            {wizardSteps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={cn(
                  "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all w-full",
                  i === step ? "bg-primary/10 text-primary" : i < step ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0",
                    i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-success text-primary-foreground" : "bg-muted-foreground/20"
                  )}>
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline truncate">{s.label}</span>
                </div>
                {i < wizardSteps.length - 1 && <div className={cn("w-3 h-0.5 flex-shrink-0 mx-0.5", i < step ? "bg-success" : "bg-border")} />}
              </div>
            ))}
          </div>

          {/* Step 0: Campaign Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-foreground">Campaign Name <span className="text-destructive">*</span></Label>
                <Input placeholder="e.g., Welcome Onboarding June" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Description</Label>
                <Textarea placeholder="Brief description of this campaign..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
            </div>
          )}

          {/* Step 1: Channel */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select the communication channel for this campaign.</p>
              <div className="grid grid-cols-2 gap-4">
                {channelConfig.map((ch) => {
                  const selected = form.channel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setForm({ ...form, channel: ch.id, template: "", messageBody: "" })}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                        selected ? `${ch.bg} border-current ${ch.color}` : "border-border bg-card hover:bg-muted/50"
                      )}
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selected ? ch.bg : "bg-muted")}>
                        <ch.icon className={cn("w-6 h-6", selected ? ch.color : "text-muted-foreground")} />
                      </div>
                      <span className={cn("font-semibold", selected ? "text-foreground" : "text-muted-foreground")}>{ch.id}</span>
                      <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto", selected ? "border-primary bg-primary" : "border-border")}>
                        {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Recipients */}
          {step === 2 && (
            <div className="space-y-4">
              <Tabs value={form.recipientMode} onValueChange={(v: any) => setForm({ ...form, recipientMode: v, fetchedCount: null, csvPreview: null })}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="database"><Database className="w-3.5 h-3.5 mr-1.5" /> Bulk DB</TabsTrigger>
                  <TabsTrigger value="manual"><Phone className="w-3.5 h-3.5 mr-1.5" /> Manual</TabsTrigger>
                  <TabsTrigger value="csv"><Upload className="w-3.5 h-3.5 mr-1.5" /> CSV Upload</TabsTrigger>
                </TabsList>

                {/* Bulk DB */}
                <TabsContent value="database" className="space-y-4">
                  <div>
                    <Label className="text-foreground text-sm mb-1.5 block">Audience Segment</Label>
                    <Select value={form.segment} onValueChange={(v) => setForm({ ...form, segment: v })}>
                      <SelectTrigger><SelectValue placeholder="Choose segment" /></SelectTrigger>
                      <SelectContent>{dbSegments.map((s) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.count.toLocaleString()})</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <hr className="border-border" />
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" /> Advanced Filters</p>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { label: "State", val: form.filterState, set: (v: string) => setForm({ ...form, filterState: v }), opts: states },
                        { label: "District", val: form.filterDistrict, set: (v: string) => setForm({ ...form, filterDistrict: v }), opts: districts },
                        { label: "Urban/Rural", val: form.filterUrbanRural, set: (v: string) => setForm({ ...form, filterUrbanRural: v }), opts: urbanRural },
                        { label: "Block", val: form.filterBlock, set: (v: string) => setForm({ ...form, filterBlock: v }), opts: blocks },
                        { label: "Gram Panchayat", val: form.filterGP, set: (v: string) => setForm({ ...form, filterGP: v }), opts: gramPanchayats },
                        { label: "Village", val: form.filterVillage, set: (v: string) => setForm({ ...form, filterVillage: v }), opts: villages },
                      ].map((f) => (
                        <Select key={f.label} value={f.val} onValueChange={f.set}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={f.label} /></SelectTrigger>
                          <SelectContent>{f.opts.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><UserCheck className="w-3 h-3" /> User Type</p>
                    <Select value={form.filterUserType} onValueChange={(v) => setForm({ ...form, filterUserType: v })}>
                      <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Select user type" /></SelectTrigger>
                      <SelectContent>{userTypes.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><FolderTree className="w-3 h-3" /> Category</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={form.filterCategory} onValueChange={(v) => setForm({ ...form, filterCategory: v, filterSubCategory: "" })}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={form.filterSubCategory} onValueChange={(v) => setForm({ ...form, filterSubCategory: v })} disabled={!form.filterCategory}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Sub-category" /></SelectTrigger>
                        <SelectContent>{(subCategories[form.filterCategory] || []).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Activity className="w-3 h-3" /> Activity</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={form.filterActivity} onValueChange={(v) => setForm({ ...form, filterActivity: v })}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Activity type" /></SelectTrigger>
                        <SelectContent>{activityTypes.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={form.filterActivityStatus} onValueChange={(v) => setForm({ ...form, filterActivityStatus: v })} disabled={!form.filterActivity}>
                        <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>{activityStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={handleFetchRecipients}>
                    <Users className="w-4 h-4 mr-2" /> Fetch Recipients
                  </Button>
                  {form.fetchedCount !== null && (
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20 flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-foreground">{form.fetchedCount.toLocaleString()} recipients matched</span>
                    </div>
                  )}
                </TabsContent>

                {/* Manual */}
                <TabsContent value="manual" className="space-y-3">
                  {form.numbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        placeholder={form.channel === "Email" ? "email@example.com" : "+91 XXXXX XXXXX"}
                        value={num}
                        onChange={(e) => {
                          const nums = [...form.numbers];
                          nums[i] = e.target.value;
                          setForm({ ...form, numbers: nums });
                        }}
                      />
                      {form.numbers.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => setForm({ ...form, numbers: form.numbers.filter((_, idx) => idx !== i) })}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setForm({ ...form, numbers: [...form.numbers, ""] })}>
                    <Plus className="w-3 h-3 mr-1" /> Add More
                  </Button>
                </TabsContent>

                {/* CSV */}
                <TabsContent value="csv" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload a CSV file with recipient data</p>
                    <Input type="file" accept=".csv" onChange={handleCsvUpload} className="max-w-xs mx-auto" />
                  </div>
                  {form.csvPreview && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Badge variant="default">{form.csvPreview.valid} valid</Badge>
                        <Badge variant="destructive">{form.csvPreview.invalid} invalid</Badge>
                        <Badge variant="secondary">{form.csvPreview.duplicates} duplicates</Badge>
                      </div>
                      <div className="overflow-x-auto border border-border rounded-lg">
                        <table className="w-full text-xs">
                          <thead><tr className="border-b border-border bg-muted/50">
                            {form.csvPreview.headers.map((h) => <th key={h} className="p-2 text-left text-muted-foreground font-medium">{h}</th>)}
                          </tr></thead>
                          <tbody>
                            {form.csvPreview.rows.map((row, i) => (
                              <tr key={i} className="border-b border-border/50">{row.map((c, j) => <td key={j} className="p-2 text-foreground">{c}</td>)}</tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Step 3: Compose */}
          {step === 3 && (
            <div className="space-y-4">
              {form.channel === "Email" && (
                <div className="space-y-1.5">
                  <Label className="text-foreground">Subject</Label>
                  <Input placeholder="Email subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-foreground">Template</Label>
                <Select value={form.template} onValueChange={(v) => {
                  const t = (templates[form.channel] || []).find((t) => t.id === v);
                  setForm({ ...form, template: v, messageBody: t?.body || form.messageBody });
                }}>
                  <SelectTrigger><SelectValue placeholder="Select a template (optional)" /></SelectTrigger>
                  <SelectContent>{(templates[form.channel] || []).map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Message Body <span className="text-destructive">*</span></Label>
                <Textarea
                  placeholder="Type your message here..."
                  value={form.messageBody}
                  onChange={(e) => setForm({ ...form, messageBody: e.target.value })}
                  rows={6}
                  className="font-mono text-sm"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{form.messageBody.length} chars</span>
                  {form.channel === "SMS" && <span>{Math.max(1, Math.ceil(form.messageBody.length / 160))} SMS part(s)</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch checked={form.scheduleEnabled} onCheckedChange={(v) => setForm({ ...form, scheduleEnabled: v })} />
                  <Label className="text-foreground text-sm">Schedule for later</Label>
                </div>
                {form.scheduleEnabled && (
                  <Input type="datetime-local" className="max-w-xs" value={form.scheduleDate} onChange={(e) => setForm({ ...form, scheduleDate: e.target.value })} />
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Megaphone className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">{form.name}</h3>
                      <p className="text-xs text-muted-foreground">{form.description || "No description"}</p>
                    </div>
                  </div>
                  <hr className="border-border" />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Channel</p><p className="font-medium text-foreground">{form.channel}</p></div>
                    <div><p className="text-muted-foreground text-xs">Recipient Source</p><p className="font-medium text-foreground">{form.recipientMode === "database" ? "Bulk DB" : form.recipientMode === "csv" ? "CSV Upload" : "Manual Entry"}</p></div>
                    <div><p className="text-muted-foreground text-xs">Recipients</p><p className="font-medium text-foreground">{recipientCount.toLocaleString()}</p></div>
                    <div><p className="text-muted-foreground text-xs">Delivery</p><p className="font-medium text-foreground">{form.scheduleEnabled ? `Scheduled: ${form.scheduleDate}` : "Send Immediately"}</p></div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Message Preview</p>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm text-foreground font-mono whitespace-pre-wrap">{form.messageBody}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="flex-row justify-between gap-2 pt-2">
            <Button variant="outline" onClick={() => step === 0 ? setDialogOpen(false) : setStep(step - 1)}>
              {step === 0 ? "Cancel" : <><ArrowLeft className="w-4 h-4 mr-1" /> Back</>}
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-1" /> {form.scheduleEnabled ? "Schedule Campaign" : "Launch Campaign"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
