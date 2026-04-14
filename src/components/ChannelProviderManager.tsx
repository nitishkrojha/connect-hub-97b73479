import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, Star, StarOff, CheckCircle2, XCircle, AlertTriangle, Save, ArrowUp, ArrowDown } from "lucide-react";

export interface ChannelProvider {
  id: string;
  name: string;
  provider: string;
  status: "active" | "inactive" | "degraded";
  isDefault: boolean;
  priority: number;
  autoFallback: boolean;
  credentials: Record<string, string>;
}

export interface ProviderField {
  key: string;
  label: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
}

interface Props {
  channel: string;
  channelLabel: string;
  providers: ChannelProvider[];
  onProvidersChange: (providers: ChannelProvider[]) => void;
  fields: ProviderField[];
  maxProviders?: number;
}

const statusConfig = {
  active: { icon: CheckCircle2, label: "Active", className: "text-success" },
  inactive: { icon: XCircle, label: "Inactive", className: "text-muted-foreground" },
  degraded: { icon: AlertTriangle, label: "Degraded", className: "text-warning" },
};

const ChannelProviderManager = ({ channel, channelLabel, providers, onProvidersChange, fields, maxProviders = 3 }: Props) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProvider, setEditingProvider] = useState<ChannelProvider | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formName, setFormName] = useState("");
  const [formProvider, setFormProvider] = useState("");
  const [formAutoFallback, setFormAutoFallback] = useState(true);

  const resetForm = () => {
    setFormData({});
    setFormName("");
    setFormProvider("");
    setFormAutoFallback(true);
    setEditingProvider(null);
  };

  const openAdd = () => {
    resetForm();
    setShowAddDialog(true);
  };

  const openEdit = (p: ChannelProvider) => {
    setEditingProvider(p);
    setFormName(p.name);
    setFormProvider(p.provider);
    setFormAutoFallback(p.autoFallback);
    setFormData(p.credentials);
    setShowAddDialog(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formProvider.trim()) {
      toast.error("Please fill in name and provider");
      return;
    }

    if (editingProvider) {
      onProvidersChange(providers.map(p =>
        p.id === editingProvider.id
          ? { ...p, name: formName, provider: formProvider, autoFallback: formAutoFallback, credentials: formData }
          : p
      ));
      toast.success(`${formName} updated`);
    } else {
      if (providers.length >= maxProviders) {
        toast.error(`Maximum ${maxProviders} providers allowed`);
        return;
      }
      const newProvider: ChannelProvider = {
        id: `prov-${Date.now()}`,
        name: formName,
        provider: formProvider,
        status: "active",
        isDefault: providers.length === 0,
        priority: providers.length + 1,
        autoFallback: formAutoFallback,
        credentials: formData,
      };
      onProvidersChange([...providers, newProvider]);
      toast.success(`${formName} added`);
    }
    setShowAddDialog(false);
    resetForm();
  };

  const setDefault = (id: string) => {
    onProvidersChange(providers.map(p => ({ ...p, isDefault: p.id === id })));
    toast.success("Default provider updated");
  };

  const toggleStatus = (id: string) => {
    onProvidersChange(providers.map(p =>
      p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
    ));
  };

  const removeProvider = (id: string) => {
    const remaining = providers.filter(p => p.id !== id);
    if (remaining.length > 0 && !remaining.some(p => p.isDefault)) {
      remaining[0].isDefault = true;
    }
    onProvidersChange(remaining.map((p, i) => ({ ...p, priority: i + 1 })));
    toast.success("Provider removed");
  };

  const movePriority = (id: string, direction: "up" | "down") => {
    const sorted = [...providers].sort((a, b) => a.priority - b.priority);
    const idx = sorted.findIndex(p => p.id === id);
    if (direction === "up" && idx > 0) {
      [sorted[idx], sorted[idx - 1]] = [sorted[idx - 1], sorted[idx]];
    } else if (direction === "down" && idx < sorted.length - 1) {
      [sorted[idx], sorted[idx + 1]] = [sorted[idx + 1], sorted[idx]];
    }
    onProvidersChange(sorted.map((p, i) => ({ ...p, priority: i + 1 })));
  };

  const sorted = [...providers].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{channelLabel} Providers</p>
          <p className="text-xs text-muted-foreground">
            {providers.length}/{maxProviders} configured · Auto-fallback routes to next priority if default fails
          </p>
        </div>
        <Button size="sm" onClick={openAdd} disabled={providers.length >= maxProviders}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Provider
        </Button>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
          <p className="text-sm">No providers configured</p>
          <p className="text-xs mt-1">Add at least one provider to enable {channelLabel}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((p, idx) => {
            const StatusIcon = statusConfig[p.status].icon;
            return (
              <Card key={p.id} className={`shadow-sm transition-all ${p.isDefault ? "border-primary/50 bg-primary/[0.02]" : ""}`}>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {/* Priority arrows */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => movePriority(p.id, "up")}
                        disabled={idx === 0}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => movePriority(p.id, "down")}
                        disabled={idx === sorted.length - 1}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Priority number */}
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                      {p.priority}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                        {p.isDefault && <Badge className="bg-primary/10 text-primary text-[10px] border-primary/20">Default</Badge>}
                        {p.autoFallback && <Badge variant="outline" className="text-[10px]">Auto-fallback</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{p.provider}</span>
                        <span className="text-muted-foreground">·</span>
                        <div className="flex items-center gap-1">
                          <StatusIcon className={`w-3 h-3 ${statusConfig[p.status].className}`} />
                          <span className={`text-[11px] ${statusConfig[p.status].className}`}>{statusConfig[p.status].label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setDefault(p.id)}
                        title={p.isDefault ? "Current default" : "Set as default"}
                      >
                        {p.isDefault ? <Star className="w-4 h-4 text-primary fill-primary" /> : <StarOff className="w-4 h-4 text-muted-foreground" />}
                      </Button>
                      <Switch
                        checked={p.status === "active"}
                        onCheckedChange={() => toggleStatus(p.id)}
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                        <Save className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeProvider(p.id)}>
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={v => { if (!v) resetForm(); setShowAddDialog(v); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingProvider ? "Edit Provider" : `Add ${channelLabel} Provider`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-foreground">Display Name</Label>
                <Input placeholder="e.g. NIC Gateway" className="mt-1" value={formName} onChange={e => setFormName(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-foreground">Provider</Label>
                <Input placeholder="e.g. Twilio, CDAC, NIC" className="mt-1" value={formProvider} onChange={e => setFormProvider(e.target.value)} />
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-3">
              <p className="text-xs font-medium text-foreground">Credentials</p>
              {fields.map(f => (
                <div key={f.key}>
                  <Label className="text-xs text-foreground">{f.label}</Label>
                  <Input
                    type={f.type || "text"}
                    placeholder={f.placeholder || `Enter ${f.label}`}
                    className="mt-1"
                    value={formData[f.key] || ""}
                    onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Switch checked={formAutoFallback} onCheckedChange={setFormAutoFallback} />
              <Label className="text-xs text-foreground">Enable auto-fallback (use this provider if higher priority is down)</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setShowAddDialog(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" /> {editingProvider ? "Update" : "Add Provider"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChannelProviderManager;
