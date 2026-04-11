import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Search, FileText, CheckCircle2, Clock, XCircle, Edit2, Copy, Shield, Trash2 } from "lucide-react";

// ---- DLT Header Types ----
interface DLTHeader {
  id: number;
  senderId: string;
  channel: string;
  entityId: string;
  type: "Promotional" | "Transactional" | "Service Implicit" | "Service Explicit";
  status: "Active" | "Pending" | "Rejected";
  dltRegistrationId?: string;
  project?: string;
}

const initialHeaders: DLTHeader[] = [
  { id: 1, senderId: "DICNTFY", channel: "SMS", entityId: "1201159XXXXXX", type: "Transactional", status: "Active", dltRegistrationId: "DLT-HDR-00001", project: "Platform Default" },
  { id: 2, senderId: "MYBHRT", channel: "SMS", entityId: "1201159XXXXXX", type: "Service Implicit", status: "Active", dltRegistrationId: "DLT-HDR-00002", project: "My Bharat" },
  { id: 3, senderId: "KSRTHI", channel: "SMS", entityId: "1201159XXXXXX", type: "Service Explicit", status: "Pending", project: "Kisan Sarathi" },
  { id: 4, senderId: "My Bharat Official", channel: "WhatsApp", entityId: "N/A", type: "Service Implicit", status: "Active", dltRegistrationId: "WA-HDR-00001", project: "My Bharat" },
  { id: 5, senderId: "noreply@mybharat.gov.in", channel: "Email", entityId: "N/A", type: "Transactional", status: "Active", project: "My Bharat" },
  { id: 6, senderId: "ESARAS", channel: "SMS", entityId: "1201159XXXXXX", type: "Promotional", status: "Active", dltRegistrationId: "DLT-HDR-00006", project: "E Saras" },
];

// ---- Template Types ----
interface Template {
  id: number;
  name: string;
  channel: string;
  status: string;
  variables: string[];
  updatedAt: string;
  templateId?: string;
  contentType: string;
  dltTemplateId?: string;
  project?: string;
}

const initialTemplates: Template[] = [
  { id: 1, name: "OTP Verification", channel: "SMS", status: "Approved", variables: ["otp"], updatedAt: "Jun 5, 2025", templateId: "TPL-SMS-00001", contentType: "Transactional", dltTemplateId: "1207162XXXXXX001", project: "My Bharat" },
  { id: 2, name: "Welcome Message", channel: "WhatsApp", status: "Approved", variables: ["name", "project_name"], updatedAt: "Jun 3, 2025", templateId: "TPL-WA-00002", contentType: "Service Implicit", project: "My Bharat" },
  { id: 3, name: "Welcome Email", channel: "Email", status: "Approved", variables: ["name", "project_name"], updatedAt: "Jun 1, 2025", templateId: "TPL-EML-00003", contentType: "Transactional", project: "My Bharat" },
  { id: 4, name: "Invoice Template", channel: "Email", status: "Pending", variables: ["name", "invoice_id", "amount"], updatedAt: "Jun 8, 2025", contentType: "Transactional", project: "Kisan Sarathi" },
  { id: 5, name: "Promo Card", channel: "RCS", status: "Rejected", variables: ["name", "offer_details"], updatedAt: "Jun 7, 2025", contentType: "Promotional", project: "E Saras" },
  { id: 6, name: "Appointment Reminder", channel: "SMS", status: "Approved", variables: ["name", "date", "time"], updatedAt: "May 28, 2025", templateId: "TPL-SMS-00006", contentType: "Service Explicit", dltTemplateId: "1207162XXXXXX006", project: "Manas" },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Rejected: "bg-destructive/10 text-destructive",
  Active: "bg-success/10 text-success",
};

const contentTypes = ["Transactional", "Promotional", "Service Implicit", "Service Explicit"];
const channels = ["SMS", "WhatsApp", "Email", "RCS"];
const projects = ["My Bharat", "Kisan Sarathi", "Manas", "E Saras", "India Handmade"];

const AdminTemplatesPage = () => {
  const [tab, setTab] = useState("headers");
  const [searchQuery, setSearchQuery] = useState("");

  // Header state
  const [headers, setHeaders] = useState<DLTHeader[]>(initialHeaders);
  const [headerDialog, setHeaderDialog] = useState(false);
  const [editHeaderDialog, setEditHeaderDialog] = useState(false);
  const [editingHeader, setEditingHeader] = useState<DLTHeader | null>(null);
  const [newHeader, setNewHeader] = useState({ senderId: "", channel: "SMS", entityId: "", type: "Transactional" as DLTHeader["type"], dltRegistrationId: "", project: "" });

  // Template state
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [templateDialog, setTemplateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [editName, setEditName] = useState("");
  const [editChannel, setEditChannel] = useState("");
  const [editBody, setEditBody] = useState("");

  const generateTemplateId = (channel: string, id: number) => {
    const prefix = channel === "WhatsApp" ? "WA" : channel === "Email" ? "EML" : channel;
    return `TPL-${prefix}-${String(id).padStart(5, "0")}`;
  };

  // Header handlers
  const handleCreateHeader = () => {
    if (!newHeader.senderId || !newHeader.channel) { toast.error("Sender ID and Channel are required"); return; }
    const h: DLTHeader = {
      id: Date.now(), senderId: newHeader.senderId, channel: newHeader.channel, entityId: newHeader.entityId,
      type: newHeader.type, status: newHeader.dltRegistrationId ? "Active" : "Pending",
      dltRegistrationId: newHeader.dltRegistrationId || undefined, project: newHeader.project || "Platform Default",
    };
    setHeaders([...headers, h]);
    setNewHeader({ senderId: "", channel: "SMS", entityId: "", type: "Transactional", dltRegistrationId: "", project: "" });
    setHeaderDialog(false);
    toast.success("Header added");
  };

  const handleApproveHeader = (id: number) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, status: "Active" as const, dltRegistrationId: h.dltRegistrationId || `DLT-HDR-${String(h.id).padStart(5, "0")}` } : h));
    toast.success("Header approved");
  };

  const deleteHeader = (id: number) => {
    setHeaders(headers.filter(h => h.id !== id));
    toast.success("Header removed");
  };

  // Template handlers
  const handleApprove = (id: number) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, status: "Approved", templateId: generateTemplateId(t.channel, t.id) } : t));
    toast.success("Template approved & Template ID generated");
  };

  const handleReject = (id: number) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, status: "Rejected" } : t));
    toast.info("Template rejected");
  };

  const openEdit = (t: Template) => {
    setEditingTemplate(t);
    setEditName(t.name);
    setEditChannel(t.channel);
    setEditBody(t.variables.map(v => `{{${v}}}`).join(", "));
    setEditDialog(true);
  };

  const handleEdit = () => {
    if (!editingTemplate) return;
    const vars = editBody.match(/\{\{(\w+)\}\}/g)?.map(v => v.replace(/[{}]/g, "")) || [];
    setTemplates(templates.map(t => t.id === editingTemplate.id
      ? { ...t, name: editName, channel: editChannel, variables: vars, updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
      : t
    ));
    setEditDialog(false);
    toast.success("Template updated");
  };

  const filteredHeaders = headers.filter(h =>
    h.senderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (h.project || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.templateId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.project || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Headers & Templates</h1>
          <p className="text-muted-foreground mt-1">Manage DLT headers and message templates across all projects</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="headers">DLT Headers / Sender IDs</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
        </TabsList>

        {/* ===== HEADERS TAB ===== */}
        <TabsContent value="headers" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search headers..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button onClick={() => setHeaderDialog(true)}><Plus className="w-4 h-4 mr-2" />Add Header</Button>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Sender ID", "Channel", "Entity ID", "Type", "DLT Reg. ID", "Project", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-3 text-xs whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {filteredHeaders.map(h => (
                      <tr key={h.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-3 font-semibold text-foreground">{h.senderId}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-xs">{h.channel}</Badge></td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">{h.entityId}</td>
                        <td className="p-3"><Badge variant="outline" className="text-xs">{h.type}</Badge></td>
                        <td className="p-3">
                          {h.dltRegistrationId ? (
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{h.dltRegistrationId}</span>
                              <button onClick={() => { navigator.clipboard.writeText(h.dltRegistrationId!); toast.success("Copied"); }} className="text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                            </div>
                          ) : <span className="text-xs text-muted-foreground">—</span>}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">{h.project || "—"}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[h.status]}`}>{h.status}</span></td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {h.status === "Pending" && (
                              <Button size="sm" variant="ghost" className="text-success h-7 text-xs" onClick={() => handleApproveHeader(h.id)}>Approve</Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => deleteHeader(h.id)}><Trash2 className="w-3 h-3" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TEMPLATES TAB ===== */}
        <TabsContent value="templates" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search templates or Template ID..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button onClick={() => setTemplateDialog(true)}><Plus className="w-4 h-4 mr-2" />Create Template</Button>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    {["Template", "Template ID", "Channel", "Type", "DLT ID", "Project", "Variables", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left font-medium text-muted-foreground p-4 text-xs whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {filteredTemplates.map(t => (
                      <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{t.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {t.templateId ? (
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{t.templateId}</span>
                              <button onClick={() => { navigator.clipboard.writeText(t.templateId!); toast.success("Copied"); }} className="text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                            </div>
                          ) : <span className="text-xs text-muted-foreground">—</span>}
                        </td>
                        <td className="p-4"><Badge variant="secondary" className="text-xs">{t.channel}</Badge></td>
                        <td className="p-4"><Badge variant="outline" className="text-xs">{t.contentType}</Badge></td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">{t.dltTemplateId || "—"}</td>
                        <td className="p-4 text-xs text-muted-foreground">{t.project || "—"}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {t.variables.map(v => <Badge key={v} variant="secondary" className="text-xs font-mono">{`{{${v}}}`}</Badge>)}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>
                            {t.status === "Approved" && <CheckCircle2 className="w-3 h-3" />}
                            {t.status === "Pending" && <Clock className="w-3 h-3" />}
                            {t.status === "Rejected" && <XCircle className="w-3 h-3" />}
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            {t.status === "Pending" && (
                              <>
                                <Button size="sm" variant="ghost" className="text-success h-7 text-xs" onClick={() => handleApprove(t.id)}>Approve</Button>
                                <Button size="sm" variant="ghost" className="text-destructive h-7 text-xs" onClick={() => handleReject(t.id)}>Reject</Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => openEdit(t)}><Edit2 className="w-3 h-3 mr-1" />Edit</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Header Dialog */}
      <Dialog open={headerDialog} onOpenChange={setHeaderDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add DLT Header / Sender ID</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Sender ID <span className="text-destructive">*</span></Label><Input placeholder="e.g., MYBHRT" className="mt-1.5" value={newHeader.senderId} onChange={e => setNewHeader(p => ({ ...p, senderId: e.target.value }))} /></div>
              <div>
                <Label className="text-foreground text-sm">Channel</Label>
                <Select value={newHeader.channel} onValueChange={v => setNewHeader(p => ({ ...p, channel: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-foreground text-sm">DLT Entity ID</Label><Input placeholder="1201159XXXXXX" className="mt-1.5" value={newHeader.entityId} onChange={e => setNewHeader(p => ({ ...p, entityId: e.target.value }))} /></div>
              <div>
                <Label className="text-foreground text-sm">Content Type</Label>
                <Select value={newHeader.type} onValueChange={(v: DLTHeader["type"]) => setNewHeader(p => ({ ...p, type: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div><Label className="text-foreground text-sm">Assign to Project</Label>
              <Select value={newHeader.project} onValueChange={v => setNewHeader(p => ({ ...p, project: v }))}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select project" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Platform Default">Platform Default (All)</SelectItem>
                  {projects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-foreground text-sm">Existing DLT Registration ID</Label><Input placeholder="Leave blank for new registration" className="mt-1.5" value={newHeader.dltRegistrationId} onChange={e => setNewHeader(p => ({ ...p, dltRegistrationId: e.target.value }))} /></div>
            <div>
              <Label className="text-foreground text-sm">Upload DLT Document (optional)</Label>
              <Input type="file" accept=".pdf,.jpg,.png" className="mt-1.5" />
            </div>
            <Button className="w-full" onClick={handleCreateHeader}>Add Header</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Template Dialog */}
      <Dialog open={templateDialog} onOpenChange={setTemplateDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div><Label className="text-foreground">Template Name</Label><Input placeholder="e.g. Order Confirmation" className="mt-1.5" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Channel</Label>
                <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select channel" /></SelectTrigger>
                  <SelectContent>{channels.map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Content Type</Label>
                <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div><Label className="text-foreground">DLT Template ID (if registered)</Label><Input placeholder="e.g., 1207162XXXXXX001" className="mt-1.5" /></div>
            <div>
              <Label className="text-foreground">Message Body</Label>
              <textarea className="mt-1.5 flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Use {{variable}} for dynamic content" />
            </div>
            <div>
              <Label className="text-foreground">Assign to Projects</Label>
              <div className="mt-2 space-y-2">
                {projects.map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <Checkbox id={p} /><Label htmlFor={p} className="text-sm text-foreground font-normal">{p}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={() => { toast.success("Template created"); setTemplateDialog(false); }}>Create Template</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Template</DialogTitle></DialogHeader>
          {editingTemplate && (
            <div className="space-y-4 pt-2">
              {editingTemplate.templateId && (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <span className="text-xs text-muted-foreground">Template ID:</span>
                  <span className="text-xs font-mono text-primary">{editingTemplate.templateId}</span>
                </div>
              )}
              <div><Label className="text-foreground">Name</Label><Input className="mt-1.5" value={editName} onChange={e => setEditName(e.target.value)} /></div>
              <div>
                <Label className="text-foreground">Channel</Label>
                <Select value={editChannel} onValueChange={setEditChannel}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Message Body</Label>
                <textarea className="mt-1.5 flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editBody} onChange={e => setEditBody(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleEdit}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTemplatesPage;
