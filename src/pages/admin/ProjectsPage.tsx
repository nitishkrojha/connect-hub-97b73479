import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Plus, Search, MoreHorizontal, Building2, ArrowRight, ArrowLeft,
  Check, Phone, MessageSquare, Mail, Sparkles, User, Gauge, Eye,
  Upload, FileText, Shield, Power, PowerOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  name: string;
  code: string;
  contact: string;
  dept: string;
  channels: string[];
  quota: number;
  used: number;
  status: "Active" | "Inactive";
  email?: string;
  mobile?: string;
  description?: string;
  headName?: string;
  headEmail?: string;
  headMobile?: string;
  headDesignation?: string;
  approvalNote?: string;
  approvalFileName?: string;
  smsApproved?: boolean;
}

const initialProjects: Project[] = [
  { id: 1, name: "My Bharat", code: "MYBRT", contact: "Ravi Kumar", dept: "Youth Affairs", channels: ["SMS", "WhatsApp", "Email"], quota: 25000, used: 17300, status: "Active", headName: "Ravi Kumar", headEmail: "ravi@mybharat.gov.in", headMobile: "+91 98765 43210", headDesignation: "Project Director", smsApproved: true },
  { id: 2, name: "Kisan Sarathi", code: "KSRTH", contact: "Priya S.", dept: "Agriculture", channels: ["SMS", "Email"], quota: 30000, used: 24100, status: "Active", headName: "Priya Sharma", headEmail: "priya@kisansarathi.gov.in", headMobile: "+91 87654 32109", headDesignation: "Program Manager", smsApproved: true },
  { id: 3, name: "Manas", code: "MANAS", contact: "Dr. Mehta", dept: "Healthcare", channels: ["SMS", "WhatsApp", "Email", "RCS"], quota: 20000, used: 19800, status: "Active", headName: "Dr. Arun Mehta", headEmail: "mehta@manas.gov.in", headMobile: "+91 76543 21098", headDesignation: "Chief Medical Officer", smsApproved: true },
  { id: 4, name: "E Saras", code: "ESARS", contact: "Anita R.", dept: "Rural Development", channels: ["Email", "WhatsApp"], quota: 15000, used: 16200, status: "Active", headName: "Anita Rao", headEmail: "anita@esaras.gov.in", headMobile: "+91 65432 10987", headDesignation: "District Coordinator", smsApproved: false },
  { id: 5, name: "India Handmade", code: "IHDMD", contact: "Vikram J.", dept: "Handicrafts", channels: ["SMS", "RCS"], quota: 10000, used: 3500, status: "Inactive", headName: "Vikram Joshi", headEmail: "vikram@indiahandmade.gov.in", headMobile: "+91 54321 09876", headDesignation: "Head of Operations", smsApproved: true },
];

const channelColor: Record<string, string> = {
  SMS: "bg-channel-sms/10 text-channel-sms",
  WhatsApp: "bg-channel-whatsapp/10 text-channel-whatsapp",
  Email: "bg-channel-email/10 text-channel-email",
  RCS: "bg-channel-rcs/10 text-channel-rcs",
};

const channelOptions = [
  { id: "SMS", icon: Phone, color: "text-channel-sms", bg: "bg-channel-sms/10", needsApproval: true },
  { id: "WhatsApp", icon: MessageSquare, color: "text-channel-whatsapp", bg: "bg-channel-whatsapp/10", needsApproval: false },
  { id: "Email", icon: Mail, color: "text-channel-email", bg: "bg-channel-email/10", needsApproval: false },
  { id: "RCS", icon: Sparkles, color: "text-channel-rcs", bg: "bg-channel-rcs/10", needsApproval: false },
];

const departments = ["Youth Affairs", "Agriculture", "Healthcare", "Education", "Rural Development", "Handicrafts", "IT", "Finance", "Marketing", "Operations"];

const steps = [
  { label: "Project Details", icon: Building2 },
  { label: "Project Head", icon: User },
  { label: "Approval & Channels", icon: Shield },
  { label: "Quota Settings", icon: Gauge },
  { label: "Review", icon: Eye },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  const [form, setForm] = useState({
    name: "", code: "", dept: "", description: "",
    // Project Head
    headName: "", headEmail: "", headMobile: "", headDesignation: "",
    // Approval
    approvalFile: null as File | null,
    approvalFileName: "",
    smsApproved: false,
    // Channels
    channels: [] as string[],
    // Quota
    monthlyQuota: "10000",
    smsQuota: "", whatsappQuota: "", emailQuota: "", rcsQuota: "",
    status: "Active" as "Active" | "Inactive",
  });

  const resetForm = () => {
    setForm({
      name: "", code: "", dept: "", description: "",
      headName: "", headEmail: "", headMobile: "", headDesignation: "",
      approvalFile: null, approvalFileName: "", smsApproved: false,
      channels: [], monthlyQuota: "10000",
      smsQuota: "", whatsappQuota: "", emailQuota: "", rcsQuota: "",
      status: "Active",
    });
    setStep(0);
  };

  const toggleChannel = (ch: string) => {
    if (ch === "SMS" && !form.smsApproved) {
      toast.error("SMS requires an approved Approval Note. Please upload in Step 3.");
      return;
    }
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(ch) ? prev.channels.filter((c) => c !== ch) : [...prev.channels, ch],
    }));
  };

  const handleApprovalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm(prev => ({ ...prev, approvalFile: file, approvalFileName: file.name }));
    toast.success(`Uploaded: ${file.name}`);
  };

  const canNext = () => {
    if (step === 0) return form.name && form.code && form.dept;
    if (step === 1) return form.headName && form.headEmail && form.headDesignation;
    if (step === 2) return form.channels.length > 0;
    if (step === 3) return Number(form.monthlyQuota) > 0;
    return true;
  };

  const handleSubmit = () => {
    const generatedPassword = `DIC${form.code}${Math.random().toString(36).slice(-6)}!`;
    const newProject: Project = {
      id: projects.length + 1,
      name: form.name,
      code: form.code.toUpperCase(),
      contact: form.headName,
      dept: form.dept,
      channels: form.channels,
      quota: Number(form.monthlyQuota),
      used: 0,
      status: form.status,
      email: form.headEmail,
      mobile: form.headMobile,
      description: form.description,
      headName: form.headName,
      headEmail: form.headEmail,
      headMobile: form.headMobile,
      headDesignation: form.headDesignation,
      approvalFileName: form.approvalFileName,
      smsApproved: form.smsApproved,
    };
    setProjects([newProject, ...projects]);
    setDialogOpen(false);
    resetForm();
    toast.success("Project onboarded successfully!", {
      description: `Welcome email with login credentials sent to ${newProject.headEmail}`,
    });
  };

  const toggleProjectStatus = (projectId: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newStatus = p.status === "Active" ? "Inactive" : "Active";
        toast.success(`${p.name} is now ${newStatus}`);
        return { ...p, status: newStatus as "Active" | "Inactive" };
      }
      return p;
    }));
  };

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage onboarded projects</p>
        </div>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {(["All", "Active", "Inactive"] as const).map(s => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)}>
              {s}
            </Button>
          ))}
        </div>
        <Badge variant="secondary">{filtered.length} projects</Badge>
      </div>

      <div className="grid gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className={cn("shadow-card hover:shadow-card-hover transition-shadow cursor-pointer", p.status === "Inactive" && "opacity-60")} onClick={() => setViewProject(p)}>
            <CardContent className="pt-5 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                      <Badge variant={p.status === "Active" ? "default" : "secondary"} className="text-xs">{p.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.code} · {p.dept} · {p.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {p.channels.map((ch) => (
                    <span key={ch} className={`text-xs px-2 py-0.5 rounded-full font-medium ${channelColor[ch]}`}>{ch}</span>
                  ))}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-foreground">{p.used.toLocaleString()} / {p.quota.toLocaleString()}</p>
                  <div className="w-24 bg-muted rounded-full h-1.5 mt-1">
                    <div className="bg-primary rounded-full h-1.5" style={{ width: `${Math.min((p.used / p.quota) * 100, 100)}%` }} />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={(e) => { e.stopPropagation(); toggleProjectStatus(p.id); }}
                  title={p.status === "Active" ? "Deactivate" : "Activate"}
                >
                  {p.status === "Active" ? <PowerOff className="w-4 h-4 text-destructive" /> : <Power className="w-4 h-4 text-success" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* === View Project Detail Dialog === */}
      <Dialog open={!!viewProject} onOpenChange={() => setViewProject(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> {viewProject?.name}
            </DialogTitle>
          </DialogHeader>
          {viewProject && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground text-xs">Project Code</p><p className="font-medium text-foreground">{viewProject.code}</p></div>
                <div><p className="text-muted-foreground text-xs">Department</p><p className="font-medium text-foreground">{viewProject.dept}</p></div>
                <div><p className="text-muted-foreground text-xs">Status</p><Badge variant={viewProject.status === "Active" ? "default" : "secondary"}>{viewProject.status}</Badge></div>
                <div><p className="text-muted-foreground text-xs">SMS Approved</p><Badge variant={viewProject.smsApproved ? "default" : "secondary"}>{viewProject.smsApproved ? "Yes" : "No"}</Badge></div>
              </div>
              <hr className="border-border" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Head</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground text-xs">Name</p><p className="font-medium text-foreground">{viewProject.headName || viewProject.contact}</p></div>
                  <div><p className="text-muted-foreground text-xs">Designation</p><p className="font-medium text-foreground">{viewProject.headDesignation || "—"}</p></div>
                  <div><p className="text-muted-foreground text-xs">Email</p><p className="font-medium text-foreground">{viewProject.headEmail || viewProject.email || "—"}</p></div>
                  <div><p className="text-muted-foreground text-xs">Mobile</p><p className="font-medium text-foreground">{viewProject.headMobile || viewProject.mobile || "—"}</p></div>
                </div>
              </div>
              <hr className="border-border" />
              <div>
                <p className="text-muted-foreground text-xs mb-1.5">Enabled Channels</p>
                <div className="flex gap-2">{viewProject.channels.map((ch) => <span key={ch} className={`text-xs px-2 py-0.5 rounded-full font-medium ${channelColor[ch]}`}>{ch}</span>)}</div>
              </div>
              {viewProject.approvalFileName && (
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Approval Note</p>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{viewProject.approvalFileName}</span>
                  </div>
                </div>
              )}
              <div>
                <p className="text-muted-foreground text-xs mb-1">Quota Usage</p>
                <p className="text-sm font-medium text-foreground">{viewProject.used.toLocaleString()} / {viewProject.quota.toLocaleString()} messages</p>
                <div className="w-full bg-muted rounded-full h-2 mt-1.5">
                  <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${Math.min((viewProject.used / viewProject.quota) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* === Add Project Wizard Dialog === */}
      <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Onboard New Project</DialogTitle>
            <DialogDescription>Complete all steps to add a new project to the platform</DialogDescription>
          </DialogHeader>

          {/* Step indicator */}
          <div className="flex items-center gap-1 mb-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium transition-all w-full",
                  i === step ? "bg-primary/10 text-primary" : i < step ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                    i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-success text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  )}>
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="hidden lg:inline truncate text-[11px]">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={cn("w-3 h-0.5 flex-shrink-0 mx-0.5", i < step ? "bg-success" : "bg-border")} />}
              </div>
            ))}
          </div>

          {/* Step 0: Project Details */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-foreground">Project Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., HealthLink" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Project Code <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., HLNK" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} maxLength={6} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Department <span className="text-destructive">*</span></Label>
                  <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>{departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Status</Label>
                  <div className="flex items-center gap-2 h-10">
                    <Switch checked={form.status === "Active"} onCheckedChange={(v) => setForm({ ...form, status: v ? "Active" : "Inactive" })} />
                    <span className="text-sm text-muted-foreground">{form.status}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Description</Label>
                <Textarea placeholder="Brief project description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
            </div>
          )}

          {/* Step 1: Project Head */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-info/5 border border-info/20 text-sm text-foreground">
                <p className="font-medium mb-1">📧 Auto-generated Login Credentials</p>
                <p className="text-muted-foreground text-xs">A welcome onboarding email with auto-generated password will be sent to the Project Head's email. No need to set a password manually.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-foreground">Full Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., Dr. Rajesh Sharma" value={form.headName} onChange={(e) => setForm({ ...form, headName: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Designation <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g., Project Director" value={form.headDesignation} onChange={(e) => setForm({ ...form, headDesignation: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Email (Login ID) <span className="text-destructive">*</span></Label>
                  <Input type="email" placeholder="head@project.gov.in" value={form.headEmail} onChange={(e) => setForm({ ...form, headEmail: e.target.value })} />
                  <p className="text-xs text-muted-foreground">This will be used as the project login email</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Mobile Number</Label>
                  <Input placeholder="+91 XXXXX XXXXX" value={form.headMobile} onChange={(e) => setForm({ ...form, headMobile: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Approval & Channels */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Approval Note Upload */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-muted-foreground" /> Service Approval Note</h3>
                <p className="text-xs text-muted-foreground mb-3">Upload the PDF/document of service approval from the authority. SMS service will only be enabled if approved.</p>
                <div className="border-2 border-dashed border-border rounded-lg p-5 text-center hover:border-primary/40 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload Approval Note (PDF, DOC, JPG)</p>
                  <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleApprovalUpload} className="hidden" id="approval-upload" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("approval-upload")?.click()}>Choose File</Button>
                  {form.approvalFileName && (
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm text-foreground">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{form.approvalFileName}</span>
                      <Check className="w-4 h-4 text-success" />
                    </div>
                  )}
                </div>
                {form.approvalFileName && (
                  <div className="flex items-center gap-3 mt-3 p-3 rounded-lg bg-muted/50">
                    <Switch checked={form.smsApproved} onCheckedChange={(v) => {
                      setForm(prev => ({
                        ...prev,
                        smsApproved: v,
                        channels: v ? prev.channels : prev.channels.filter(c => c !== "SMS"),
                      }));
                    }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">SMS Service Approved</p>
                      <p className="text-xs text-muted-foreground">Enable SMS based on the uploaded approval note</p>
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-border" />

              {/* Channel Selection */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Select Communication Channels</h3>
                <div className="grid grid-cols-2 gap-4">
                  {channelOptions.map((ch) => {
                    const selected = form.channels.includes(ch.id);
                    const smsLocked = ch.id === "SMS" && !form.smsApproved;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => toggleChannel(ch.id)}
                        disabled={smsLocked}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                          smsLocked ? "border-border bg-muted/30 opacity-50 cursor-not-allowed" :
                          selected ? `${ch.bg} border-current ${ch.color}` : "border-border bg-card hover:bg-muted/50"
                        )}
                      >
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selected ? ch.bg : "bg-muted")}>
                          <ch.icon className={cn("w-6 h-6", selected ? ch.color : "text-muted-foreground")} />
                        </div>
                        <div className="flex-1">
                          <p className={cn("font-semibold", selected ? "text-foreground" : "text-muted-foreground")}>
                            {ch.id}
                            {smsLocked && <span className="text-xs font-normal ml-1">(Needs Approval)</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ch.id === "SMS" && "Text messages & OTP"}
                            {ch.id === "WhatsApp" && "Template messages"}
                            {ch.id === "Email" && "HTML emails & attachments"}
                            {ch.id === "RCS" && "Rich media messages"}
                          </p>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          selected ? "border-primary bg-primary" : "border-border"
                        )}>
                          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Quota */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Gauge className="w-4 h-4 text-muted-foreground" /> Quota Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-foreground">Monthly Message Quota <span className="text-destructive">*</span></Label>
                  <Input type="number" placeholder="e.g., 50000" value={form.monthlyQuota} onChange={(e) => setForm({ ...form, monthlyQuota: e.target.value })} />
                </div>
                {form.channels.map((ch) => (
                  <div key={ch} className="space-y-1.5">
                    <Label className="text-foreground">{ch} Limit <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input
                      type="number"
                      placeholder="No limit"
                      value={(form as any)[`${ch.toLowerCase()}Quota`] || ""}
                      onChange={(e) => setForm({ ...form, [`${ch.toLowerCase()}Quota`]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground">{form.name}</h3>
                      <p className="text-xs text-muted-foreground">{form.code} · {form.dept}</p>
                    </div>
                    <Badge variant={form.status === "Active" ? "default" : "secondary"} className="ml-auto">{form.status}</Badge>
                  </div>
                  <hr className="border-border" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Head</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><p className="text-muted-foreground text-xs">Name</p><p className="text-foreground font-medium">{form.headName}</p></div>
                      <div><p className="text-muted-foreground text-xs">Designation</p><p className="text-foreground font-medium">{form.headDesignation}</p></div>
                      <div><p className="text-muted-foreground text-xs">Email (Login)</p><p className="text-foreground font-medium">{form.headEmail}</p></div>
                      <div><p className="text-muted-foreground text-xs">Mobile</p><p className="text-foreground font-medium">{form.headMobile || "—"}</p></div>
                    </div>
                  </div>
                  <hr className="border-border" />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Monthly Quota</p><p className="text-foreground font-medium">{Number(form.monthlyQuota).toLocaleString()}</p></div>
                    <div><p className="text-muted-foreground text-xs">SMS Approved</p><Badge variant={form.smsApproved ? "default" : "secondary"}>{form.smsApproved ? "Yes" : "No"}</Badge></div>
                  </div>
                  {form.approvalFileName && (
                    <div><p className="text-muted-foreground text-xs mb-1">Approval Note</p><p className="text-sm text-foreground flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {form.approvalFileName}</p></div>
                  )}
                  <div>
                    <p className="text-muted-foreground text-xs mb-1.5">Channels</p>
                    <div className="flex gap-2">{form.channels.map((ch) => <span key={ch} className={`text-xs px-2 py-0.5 rounded-full font-medium ${channelColor[ch]}`}>{ch}</span>)}</div>
                  </div>
                  {form.description && (
                    <div><p className="text-muted-foreground text-xs mb-1">Description</p><p className="text-sm text-foreground">{form.description}</p></div>
                  )}
                  <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                    <p className="text-xs text-muted-foreground">📧 A welcome email with login credentials will be sent to <span className="font-medium text-foreground">{form.headEmail}</span></p>
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
                <Check className="w-4 h-4 mr-1" /> Onboard Project
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
