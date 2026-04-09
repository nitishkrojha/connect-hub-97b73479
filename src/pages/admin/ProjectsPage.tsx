import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreHorizontal, Building2 } from "lucide-react";

const projects = [
  { id: 1, name: "Project Alpha", code: "ALPHA", contact: "Ravi Kumar", dept: "Marketing", channels: ["SMS", "WhatsApp", "Email"], quota: 25000, used: 17300, status: "Active" },
  { id: 2, name: "FinServe", code: "FINSV", contact: "Priya S.", dept: "Finance", channels: ["SMS", "Email"], quota: 30000, used: 24100, status: "Active" },
  { id: 3, name: "HealthLink", code: "HLNK", contact: "Dr. Mehta", dept: "Healthcare", channels: ["SMS", "WhatsApp", "Email", "RCS"], quota: 20000, used: 19800, status: "Active" },
  { id: 4, name: "EduConnect", code: "EDUC", contact: "Anita R.", dept: "Education", channels: ["Email", "WhatsApp"], quota: 15000, used: 16200, status: "Active" },
  { id: 5, name: "RetailPro", code: "RTLP", contact: "Vikram J.", dept: "Retail", channels: ["SMS", "RCS"], quota: 10000, used: 3500, status: "Active" },
  { id: 6, name: "Legacy App", code: "LGCY", contact: "Suresh P.", dept: "IT", channels: ["SMS"], quota: 5000, used: 0, status: "Inactive" },
];

const channelColor: Record<string, string> = {
  SMS: "bg-channel-sms/10 text-channel-sms",
  WhatsApp: "bg-channel-whatsapp/10 text-channel-whatsapp",
  Email: "bg-channel-email/10 text-channel-email",
  RCS: "bg-channel-rcs/10 text-channel-rcs",
};

const ProjectsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage onboarded projects</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <Card key={p.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="pt-5 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                      <Badge variant={p.status === "Active" ? "default" : "secondary"} className="text-xs">
                        {p.status}
                      </Badge>
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

                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
