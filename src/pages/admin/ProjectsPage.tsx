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
  status: string;
  email?: string;
  mobile?: string;
  description?: string;
}

const initialProjects: Project[] = [
  { id: 1, name: "My Bharat", code: "MYBRT", contact: "Ravi Kumar", dept: "Youth Affairs", channels: ["SMS", "WhatsApp", "Email"], quota: 25000, used: 17300, status: "Active" },
  { id: 2, name: "Kisan Sarathi", code: "KSRTH", contact: "Priya S.", dept: "Agriculture", channels: ["SMS", "Email"], quota: 30000, used: 24100, status: "Active" },
  { id: 3, name: "Manas", code: "MANAS", contact: "Dr. Mehta", dept: "Healthcare", channels: ["SMS", "WhatsApp", "Email", "RCS"], quota: 20000, used: 19800, status: "Active" },
  { id: 4, name: "E Saras", code: "ESARS", contact: "Anita R.", dept: "Rural Development", channels: ["Email", "WhatsApp"], quota: 15000, used: 16200, status: "Active" },
  { id: 5, name: "India Handmade", code: "IHDMD", contact: "Vikram J.", dept: "Handicrafts", channels: ["SMS", "RCS"], quota: 10000, used: 3500, status: "Active" },
];

const channelColor: Record<string, string> = {
  SMS: "bg-channel-sms/10 text-channel-sms",
  WhatsApp: "bg-channel-whatsapp/10 text-channel-whatsapp",
  Email: "bg-channel-email/10 text-channel-email",
  RCS: "bg-channel-rcs/10 text-channel-rcs",
};

const channelOptions = [
  { id: "SMS", icon: Phone, color: "text-channel-sms", bg: "bg-channel-sms/10" },
  { id: "WhatsApp", icon: MessageSquare, color: "text-channel-whatsapp", bg: "bg-channel-whatsapp/10" },
  { id: "Email", icon: Mail, color: "text-channel-email", bg: "bg-channel-email/10" },
  { id: "RCS", icon: Sparkles, color: "text-channel-rcs", bg: "bg-channel-rcs/10" },
];

const departments = ["Marketing", "Finance", "Healthcare", "Education", "Retail", "IT", "Operations", "HR", "Sales", "Customer Support"];

const steps = [
  { label: "Project Details", icon: Building2 },
  { label: "Channels", icon: MessageSquare },
  { label: "Quota & Credentials", icon: Gauge },
  { label: "Review", icon: Eye },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [viewProject, setViewProject] = useState<Project | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "", code: "", contact: "", email: "", mobile: "", dept: "", description: "",
    channels: [] as string[],
    monthlyQuota: "10000",
    smsQuota: "", whatsappQuota: "", emailQuota: "", rcsQuota: "",
    loginEmail: "", loginPassword: "",
    status: "Active" as string,
  });

  const resetForm = () => {
    setForm({
      name: "", code: "", contact: "", email: "", mobile: "", dept: "", description: "",
      channels: [], monthlyQuota: "10000",
      smsQuota: "", whatsappQuota: "", emailQuota: "", rcsQuota: "",
      loginEmail: "", loginPassword: "", status: "Active",
    });
    setStep(0);
  };

  const toggleChannel = (ch: string) => {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(ch) ? prev.channels.filter((c) => c !== ch) : [...prev.channels, ch],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.name && form.code && form.contact && form.email && form.dept;
    if (step === 1) return form.channels.length > 0;
    if (step === 2) return Number(form.monthlyQuota) > 0 && form.loginEmail && form.loginPassword;
    return true;
  };

  const handleSubmit = () => {
    const newProject: Project = {
      id: projects.length + 1,
      name: form.name,
      code: form.code.toUpperCase(),
      contact: form.contact,
      dept: form.dept,
      channels: form.channels,
      quota: Number(form.monthlyQuota),
      used: 0,
      status: form.status,
      email: form.email,
      mobile: form.mobile,
      description: form.description,
    };
    setProjects([newProject, ...projects]);
    setDialogOpen(false);
    resetForm();
    toast.success("Project onboarded successfully!", { description: `${newProject.name} (${newProject.code}) is now active.` });
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Badge variant="secondary">{filtered.length} projects</Badge>
      </div>

      <div className="grid gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer" onClick={() => setViewProject(p)}>
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
                <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="w-4 h-4" />
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
                <div><p className="text-muted-foreground text-xs">Contact Person</p><p className="font-medium text-foreground">{viewProject.contact}</p></div>
                <div><p className="text-muted-foreground text-xs">Status</p><Badge variant={viewProject.status === "Active" ? "default" : "secondary"}>{viewProject.status}</Badge></div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1.5">Enabled Channels</p>
                <div className="flex gap-2">{viewProject.channels.map((ch) => <span key={ch} className={`text-xs px-2 py-0.5 rounded-full font-medium ${channelColor[ch]}`}>{ch}</span>)}</div>
              </div>
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
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all w-full",
                  i === step ? "bg-primary/10 text-primary" : i < step ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                    i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-success text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  )}>
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline truncate">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={cn("w-4 h-0.5 flex-shrink-0 mx-1", i < step ? "bg-success" : "bg-border")} />}
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
                  <Label className="text-foreground">Contact Person <span className="text-destructive">*</span></Label>
                  <Input placeholder="Full name" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Contact Email <span className="text-destructive">*</span></Label>
                  <Input type="email" placeholder="email@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Mobile Number</Label>
                  <Input placeholder="+91 XXXXX XXXXX" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Department <span className="text-destructive">*</span></Label>
                  <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>{departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Description</Label>
                <Textarea placeholder="Brief project description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-foreground">Status</Label>
                <div className="flex items-center gap-2">
                  <Switch checked={form.status === "Active"} onCheckedChange={(v) => setForm({ ...form, status: v ? "Active" : "Inactive" })} />
                  <span className="text-sm text-muted-foreground">{form.status}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Channel Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select the communication channels this project is allowed to use.</p>
              <div className="grid grid-cols-2 gap-4">
                {channelOptions.map((ch) => {
                  const selected = form.channels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                        selected ? `${ch.bg} border-current ${ch.color}` : "border-border bg-card hover:bg-muted/50"
                      )}
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selected ? ch.bg : "bg-muted")}>
                        <ch.icon className={cn("w-6 h-6", selected ? ch.color : "text-muted-foreground")} />
                      </div>
                      <div className="flex-1">
                        <p className={cn("font-semibold", selected ? "text-foreground" : "text-muted-foreground")}>{ch.id}</p>
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
          )}

          {/* Step 2: Quota & Credentials */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Gauge className="w-4 h-4 text-muted-foreground" /> Quota Settings</h3>
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
              <hr className="border-border" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> Project Login Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-foreground">Login Email <span className="text-destructive">*</span></Label>
                    <Input type="email" placeholder="project@dicnotifier.io" value={form.loginEmail} onChange={(e) => setForm({ ...form, loginEmail: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-foreground">Password <span className="text-destructive">*</span></Label>
                    <Input type="password" placeholder="Minimum 8 characters" value={form.loginPassword} onChange={(e) => setForm({ ...form, loginPassword: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
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
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Contact</p><p className="text-foreground font-medium">{form.contact}</p></div>
                    <div><p className="text-muted-foreground text-xs">Email</p><p className="text-foreground font-medium">{form.email}</p></div>
                    <div><p className="text-muted-foreground text-xs">Mobile</p><p className="text-foreground font-medium">{form.mobile || "—"}</p></div>
                    <div><p className="text-muted-foreground text-xs">Monthly Quota</p><p className="text-foreground font-medium">{Number(form.monthlyQuota).toLocaleString()}</p></div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1.5">Channels</p>
                    <div className="flex gap-2">{form.channels.map((ch) => <span key={ch} className={`text-xs px-2 py-0.5 rounded-full font-medium ${channelColor[ch]}`}>{ch}</span>)}</div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Login Credentials</p>
                    <p className="text-sm text-foreground">{form.loginEmail}</p>
                  </div>
                  {form.description && (
                    <div><p className="text-muted-foreground text-xs mb-1">Description</p><p className="text-sm text-foreground">{form.description}</p></div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="flex-row justify-between gap-2 pt-2">
            <Button variant="outline" onClick={() => step === 0 ? setDialogOpen(false) : setStep(step - 1)}>
              {step === 0 ? "Cancel" : <><ArrowLeft className="w-4 h-4 mr-1" /> Back</>}
            </Button>
            {step < 3 ? (
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
