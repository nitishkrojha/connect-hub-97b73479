import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Search, FileText, Edit2, Copy, Upload, Shield, Hash, Tag, Trash2 } from "lucide-react";

// ---- DLT Header Types ----
interface DLTHeader {
  id: number;
  senderId: string;
  channel: string;
  entityId: string;
  type: "Promotional" | "Transactional" | "Service Implicit" | "Service Explicit";
  status: "Active" | "Pending" | "Rejected";
  dltRegistrationId?: string;
  document?: string;
}

const initialHeaders: DLTHeader[] = [
  { id: 1, senderId: "DICNTFY", channel: "SMS", entityId: "1201159XXXXXX", type: "Transactional", status: "Active", dltRegistrationId: "DLT-HDR-00001" },
  { id: 2, senderId: "MYBHRT", channel: "SMS", entityId: "1201159XXXXXX", type: "Service Implicit", status: "Active", dltRegistrationId: "DLT-HDR-00002" },
  { id: 3, senderId: "KSRTHI", channel: "SMS", entityId: "1201159XXXXXX", type: "Service Explicit", status: "Pending" },
  { id: 4, senderId: "My Bharat Official", channel: "WhatsApp", entityId: "N/A", type: "Service Implicit", status: "Active", dltRegistrationId: "WA-HDR-00001" },
  { id: 5, senderId: "noreply@mybharat.gov.in", channel: "Email", entityId: "N/A", type: "Transactional", status: "Active" },
];

// ---- Template Types ----
interface Template {
  id: number;
  name: string;
  channel: string;
  status: string;
  body: string;
  templateId?: string;
  contentType: "Transactional" | "Promotional" | "Service Implicit" | "Service Explicit";
  dltTemplateId?: string;
  linkedHeaderId?: number;
}

const initialTemplates: Template[] = [
  { id: 1, name: "OTP Verification", channel: "SMS", status: "Approved", body: "Your OTP is {{otp}}. Valid for 5 minutes.", templateId: "TPL-SMS-00001", contentType: "Transactional", dltTemplateId: "1207162XXXXXX001", linkedHeaderId: 1 },
  { id: 2, name: "Welcome Message", channel: "WhatsApp", status: "Approved", body: "Hello {{name}}! Welcome to My Bharat.", templateId: "TPL-WA-00002", contentType: "Service Implicit", linkedHeaderId: 4 },
  { id: 3, name: "Welcome Email", channel: "Email", status: "Approved", body: "Dear {{name}},\n\nWelcome to My Bharat!", templateId: "TPL-EML-00003", contentType: "Transactional", linkedHeaderId: 5 },
  { id: 4, name: "Invoice Draft", channel: "Email", status: "Pending", body: "Dear {{name}},\n\nInvoice #{{invoice_id}} for {{amount}}", contentType: "Transactional" },
  { id: 5, name: "Quiz Reminder", channel: "SMS", status: "Approved", body: "Hi {{name}}, quiz starts on {{date}}. Don't miss it!", templateId: "TPL-SMS-00005", contentType: "Service Explicit", dltTemplateId: "1207162XXXXXX005", linkedHeaderId: 2 },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Rejected: "bg-destructive/10 text-destructive",
  Active: "bg-success/10 text-success",
};

const contentTypes = ["Transactional", "Promotional", "Service Implicit", "Service Explicit"];
const channels = ["SMS", "WhatsApp", "Email", "RCS"];

const ProjectTemplatesPage = () => {
  const [tab, setTab] = useState("headers");
  const [searchQuery, setSearchQuery] = useState("");

  // ---- Header State ----
  const [headers, setHeaders] = useState<DLTHeader[]>(initialHeaders);
  const [headerDialog, setHeaderDialog] = useState(false);
  const [editHeaderDialog, setEditHeaderDialog] = useState(false);
  const [editingHeader, setEditingHeader] = useState<DLTHeader | null>(null);
  const [newHeader, setNewHeader] = useState({ senderId: "", channel: "SMS", entityId: "", type: "Transactional" as DLTHeader["type"], dltRegistrationId: "", document: "" });

  // ---- Template State ----
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [templateDialog, setTemplateDialog] = useState(false);
  const [editTemplateDialog, setEditTemplateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({ name: "", channel: "SMS", body: "", contentType: "Transactional" as Template["contentType"], dltTemplateId: "", linkedHeaderId: 0 });
  const [editName, setEditName] = useState("");
  const [editChannel, setEditChannel] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editContentType, setEditContentType] = useState<Template["contentType"]>("Transactional");
  const [editDltTemplateId, setEditDltTemplateId] = useState("");
  const [editLinkedHeaderId, setEditLinkedHeaderId] = useState(0);

  // ---- Header Handlers ----
  const handleCreateHeader = () => {
    if (!newHeader.senderId || !newHeader.channel) { toast.error("Sender ID and Channel are required"); return; }
    const h: DLTHeader = {
      id: Date.now(),
      senderId: newHeader.senderId,
      channel: newHeader.channel,
      entityId: newHeader.entityId,
      type: newHeader.type,
      status: newHeader.dltRegistrationId ? "Active" : "Pending",
      dltRegistrationId: newHeader.dltRegistrationId || undefined,
      document: newHeader.document || undefined,
    };
    setHeaders([...headers, h]);
    setNewHeader({ senderId: "", channel: "SMS", entityId: "", type: "Transactional", dltRegistrationId: "", document: "" });
    setHeaderDialog(false);
    toast.success(h.dltRegistrationId ? "Header added with existing DLT registration" : "Header submitted for DLT registration");
  };

  const openEditHeader = (h: DLTHeader) => {
    setEditingHeader(h);
    setEditHeaderDialog(true);
  };

  const handleEditHeader = () => {
    if (!editingHeader) return;
    setHeaders(headers.map(h => h.id === editingHeader.id ? { ...editingHeader } : h));
    setEditHeaderDialog(false);
    toast.success("Header updated");
  };

  const deleteHeader = (id: number) => {
    setHeaders(headers.filter(h => h.id !== id));
    toast.success("Header removed");
  };

  // ---- Template Handlers ----
  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.channel || !newTemplate.body) { toast.error("Please fill all required fields"); return; }
    const t: Template = {
      id: Date.now(),
      name: newTemplate.name,
      channel: newTemplate.channel,
      status: "Pending",
      body: newTemplate.body,
      contentType: newTemplate.contentType,
      dltTemplateId: newTemplate.dltTemplateId || undefined,
      linkedHeaderId: newTemplate.linkedHeaderId || undefined,
    };
    setTemplates([...templates, t]);
    setNewTemplate({ name: "", channel: "SMS", body: "", contentType: "Transactional", dltTemplateId: "", linkedHeaderId: 0 });
    setTemplateDialog(false);
    toast.success("Template submitted for approval");
  };

  const openEditTemplate = (t: Template) => {
    setEditingTemplate(t);
    setEditName(t.name);
    setEditChannel(t.channel);
    setEditBody(t.body);
    setEditContentType(t.contentType);
    setEditDltTemplateId(t.dltTemplateId || "");
    setEditLinkedHeaderId(t.linkedHeaderId || 0);
    setEditTemplateDialog(true);
  };

  const handleEditTemplate = () => {
    if (!editingTemplate) return;
    setTemplates(templates.map(t => t.id === editingTemplate.id
      ? { ...t, name: editName, channel: editChannel, body: editBody, contentType: editContentType, dltTemplateId: editDltTemplateId || undefined, linkedHeaderId: editLinkedHeaderId || undefined, status: t.status === "Approved" ? "Pending" : t.status }
      : t
    ));
    setEditTemplateDialog(false);
    toast.success("Template updated & resubmitted for approval");
  };

  const filteredHeaders = headers.filter(h =>
    h.senderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.templateId?.toLowerCase().includes(searchQuery.toLowerCase()) || false
  );

  const headersForChannel = (ch: string) => headers.filter(h => h.channel === ch && h.status === "Active");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground mt-1">Manage DLT headers (Sender IDs) and message templates</p>
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
            <div className="relative max-w-sm flex-1">
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
                    {["Sender ID", "Channel", "Entity ID", "Type", "DLT Reg. ID", "Status", "Actions"].map(h => (
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
                        <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[h.status]}`}>{h.status}</span></td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openEditHeader(h)}><Edit2 className="w-3 h-3 mr-1" />Edit</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => deleteHeader(h.id)}><Trash2 className="w-3 h-3" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredHeaders.length === 0 && (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No headers found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TEMPLATES TAB ===== */}
        <TabsContent value="templates" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button onClick={() => setTemplateDialog(true)}><Plus className="w-4 h-4 mr-2" />New Template</Button>
          </div>

          <div className="grid gap-4">
            {filteredTemplates.map(t => (
              <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex items-start gap-2 flex-1">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{t.name}</h3>
                          <Badge variant="secondary" className="text-xs">{t.channel}</Badge>
                          <Badge variant="outline" className="text-xs">{t.contentType}</Badge>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[t.status]}`}>{t.status}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          {t.templateId && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{t.templateId}</span>
                              <button onClick={() => { navigator.clipboard.writeText(t.templateId!); toast.success("Template ID copied"); }} className="text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
                            </div>
                          )}
                          {t.dltTemplateId && (
                            <span className="text-xs text-muted-foreground">DLT: <code className="bg-muted px-1 rounded">{t.dltTemplateId}</code></span>
                          )}
                          {t.linkedHeaderId && (
                            <span className="text-xs text-muted-foreground">Header: <strong className="text-foreground">{headers.find(h => h.id === t.linkedHeaderId)?.senderId || "—"}</strong></span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t.body}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => openEditTemplate(t)}>
                      <Edit2 className="w-3.5 h-3.5 mr-1" />Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* ===== ADD HEADER DIALOG ===== */}
      <Dialog open={headerDialog} onOpenChange={setHeaderDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add DLT Header / Sender ID</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-3 rounded-lg bg-info/5 border border-info/20 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 inline mr-1 text-info" />
              If you already have a DLT-registered header, enter the registration ID below. Otherwise, submit for new registration.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label className="text-foreground text-sm">Sender ID / Header <span className="text-destructive">*</span></Label><Input placeholder="e.g., MYBHRT" className="mt-1.5" value={newHeader.senderId} onChange={e => setNewHeader(p => ({ ...p, senderId: e.target.value }))} /></div>
              <div>
                <Label className="text-foreground text-sm">Channel <span className="text-destructive">*</span></Label>
                <Select value={newHeader.channel} onValueChange={v => setNewHeader(p => ({ ...p, channel: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-foreground text-sm">DLT Entity ID</Label><Input placeholder="e.g., 1201159XXXXXX" className="mt-1.5" value={newHeader.entityId} onChange={e => setNewHeader(p => ({ ...p, entityId: e.target.value }))} /></div>
              <div>
                <Label className="text-foreground text-sm">Content Type</Label>
                <Select value={newHeader.type} onValueChange={(v: DLTHeader["type"]) => setNewHeader(p => ({ ...p, type: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div><Label className="text-foreground text-sm">Existing DLT Registration ID (if already registered)</Label><Input placeholder="Leave blank for new registration" className="mt-1.5" value={newHeader.dltRegistrationId} onChange={e => setNewHeader(p => ({ ...p, dltRegistrationId: e.target.value }))} /></div>
            <div>
              <Label className="text-foreground text-sm">Upload DLT Approval Document (optional)</Label>
              <div className="mt-1.5 flex items-center gap-2">
                <Input type="file" accept=".pdf,.jpg,.png" className="flex-1" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Upload DLT approval certificate or registration document (PDF, JPG, PNG)</p>
            </div>
            <Button className="w-full" onClick={handleCreateHeader}>
              {newHeader.dltRegistrationId ? "Add Registered Header" : "Submit for DLT Registration"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT HEADER DIALOG ===== */}
      <Dialog open={editHeaderDialog} onOpenChange={setEditHeaderDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Header</DialogTitle></DialogHeader>
          {editingHeader && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-foreground text-sm">Sender ID</Label><Input className="mt-1.5" value={editingHeader.senderId} onChange={e => setEditingHeader({ ...editingHeader, senderId: e.target.value })} /></div>
                <div>
                  <Label className="text-foreground text-sm">Channel</Label>
                  <Select value={editingHeader.channel} onValueChange={v => setEditingHeader({ ...editingHeader, channel: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label className="text-foreground text-sm">Entity ID</Label><Input className="mt-1.5" value={editingHeader.entityId} onChange={e => setEditingHeader({ ...editingHeader, entityId: e.target.value })} /></div>
                <div>
                  <Label className="text-foreground text-sm">Type</Label>
                  <Select value={editingHeader.type} onValueChange={(v: DLTHeader["type"]) => setEditingHeader({ ...editingHeader, type: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label className="text-foreground text-sm">DLT Registration ID</Label><Input className="mt-1.5" value={editingHeader.dltRegistrationId || ""} onChange={e => setEditingHeader({ ...editingHeader, dltRegistrationId: e.target.value })} /></div>
              <Button className="w-full" onClick={handleEditHeader}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== ADD TEMPLATE DIALOG ===== */}
      <Dialog open={templateDialog} onOpenChange={setTemplateDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div><Label className="text-foreground text-sm">Template Name <span className="text-destructive">*</span></Label><Input placeholder="e.g., OTP Verification" className="mt-1.5" value={newTemplate.name} onChange={e => setNewTemplate(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground text-sm">Channel <span className="text-destructive">*</span></Label>
                <Select value={newTemplate.channel} onValueChange={v => setNewTemplate(p => ({ ...p, channel: v, linkedHeaderId: 0 }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground text-sm">Content Type</Label>
                <Select value={newTemplate.contentType} onValueChange={(v: Template["contentType"]) => setNewTemplate(p => ({ ...p, contentType: v }))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-foreground text-sm">Linked Header / Sender ID</Label>
              <Select value={String(newTemplate.linkedHeaderId || "")} onValueChange={v => setNewTemplate(p => ({ ...p, linkedHeaderId: Number(v) }))}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select header" /></SelectTrigger>
                <SelectContent>
                  {headersForChannel(newTemplate.channel).map(h => <SelectItem key={h.id} value={String(h.id)}>{h.senderId} ({h.type})</SelectItem>)}
                  {headersForChannel(newTemplate.channel).length === 0 && <SelectItem value="0" disabled>No active headers for {newTemplate.channel}</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-foreground text-sm">DLT Template ID (if already registered)</Label><Input placeholder="e.g., 1207162XXXXXX001" className="mt-1.5" value={newTemplate.dltTemplateId} onChange={e => setNewTemplate(p => ({ ...p, dltTemplateId: e.target.value }))} /></div>
            <div>
              <Label className="text-foreground text-sm">Message Body <span className="text-destructive">*</span></Label>
              <textarea className="mt-1.5 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Use {{variable}} for placeholders" value={newTemplate.body} onChange={e => setNewTemplate(p => ({ ...p, body: e.target.value }))} />
            </div>
            <Button className="w-full" onClick={handleCreateTemplate}>Submit for Approval</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT TEMPLATE DIALOG ===== */}
      <Dialog open={editTemplateDialog} onOpenChange={setEditTemplateDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Template</DialogTitle></DialogHeader>
          {editingTemplate && (
            <div className="space-y-4 pt-2">
              {editingTemplate.templateId && (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <span className="text-xs text-muted-foreground">Template ID:</span>
                  <span className="text-xs font-mono text-primary">{editingTemplate.templateId}</span>
                </div>
              )}
              <div><Label className="text-foreground text-sm">Name</Label><Input className="mt-1.5" value={editName} onChange={e => setEditName(e.target.value)} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground text-sm">Channel</Label>
                  <Select value={editChannel} onValueChange={setEditChannel}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground text-sm">Content Type</Label>
                  <Select value={editContentType} onValueChange={(v: Template["contentType"]) => setEditContentType(v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-foreground text-sm">Linked Header</Label>
                <Select value={String(editLinkedHeaderId || "")} onValueChange={v => setEditLinkedHeaderId(Number(v))}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select header" /></SelectTrigger>
                  <SelectContent>
                    {headersForChannel(editChannel).map(h => <SelectItem key={h.id} value={String(h.id)}>{h.senderId} ({h.type})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label className="text-foreground text-sm">DLT Template ID</Label><Input className="mt-1.5" value={editDltTemplateId} onChange={e => setEditDltTemplateId(e.target.value)} /></div>
              <div>
                <Label className="text-foreground text-sm">Body</Label>
                <textarea className="mt-1.5 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editBody} onChange={e => setEditBody(e.target.value)} />
              </div>
              <p className="text-xs text-muted-foreground">Note: Editing an approved template will resubmit it for approval.</p>
              <Button className="w-full" onClick={handleEditTemplate}>Save & Resubmit</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectTemplatesPage;
