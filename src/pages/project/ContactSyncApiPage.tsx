import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Webhook, RefreshCw, Code2 } from "lucide-react";

const ContactSyncApiPage = () => (
  <div className="space-y-6">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact Sync API</h1>
        <p className="text-muted-foreground mt-1">Pull contacts from your CRM or backend automatically before every campaign.</p>
      </div>
      <Button><Plus className="w-4 h-4" /> Add endpoint</Button>
    </div>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-base">Configured endpoints</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { name: "Premium customers", url: "https://api.acme.io/v1/premium-users", method: "GET", status: "Active", count: 4820 },
            { name: "Cart abandoners", url: "https://api.acme.io/v1/abandoned-carts", method: "GET", status: "Active", count: 1240 },
          ].map((e) => (
            <div key={e.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center"><Webhook className="w-4 h-4 text-info" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{e.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{e.method} {e.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">{e.count.toLocaleString()} contacts</span>
                <Button variant="ghost" size="sm"><RefreshCw className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-card">
      <CardHeader><CardTitle className="text-base flex items-center gap-2"><Code2 className="w-4 h-4" /> Expected response shape</CardTitle></CardHeader>
      <CardContent>
        <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-x-auto font-mono">{`{
  "contacts": [
    { "name": "Asha", "mobile": "+919876543210", "email": "asha@example.com", "vars": { "city": "Pune" } },
    ...
  ],
  "total": 4820
}`}</pre>
      </CardContent>
    </Card>
  </div>
);

export default ContactSyncApiPage;
