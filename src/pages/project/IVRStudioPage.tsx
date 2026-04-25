import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Phone, Voicemail, Users, Clock } from "lucide-react";

const NODE_ICONS = { greeting: Phone, menu: GitBranch, agent: Users, voicemail: Voicemail, schedule: Clock };

const IVRStudioPage = () => (
  <div className="space-y-6">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">IVR Studio</h1>
        <p className="text-muted-foreground mt-1">Design intelligent call flows with menus, routing, voicemail, and schedules.</p>
      </div>
      <Button><Plus className="w-4 h-4" /> New flow</Button>
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-base">Active flows</CardTitle></CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: "Main support line", num: "+91 80 4000 1000", nodes: 8 },
            { name: "Sales hotline", num: "+91 80 4000 2000", nodes: 5 },
            { name: "After-hours voicemail", num: "+91 80 4000 3000", nodes: 3 },
          ].map((f) => (
            <div key={f.name} className="p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><GitBranch className="w-4 h-4 text-primary" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.num}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{f.nodes} nodes · Active</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-base">Available node types</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(NODE_ICONS).map(([k, Icon]) => (
            <div key={k} className="text-center p-3 rounded-lg border border-border">
              <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs font-medium text-foreground capitalize">{k}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default IVRStudioPage;
