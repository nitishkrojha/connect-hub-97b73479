import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ClickToCallPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const placeCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) { toast.error("Both numbers are required"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Call initiated from ${from} to ${to}`);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Click-to-Call</h1>
        <p className="text-muted-foreground mt-1">Connect any agent to any customer with one click. Calls are metered per minute.</p>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Place a call</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={placeCall} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground mb-1.5 block">Agent number</Label>
                <Input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="+91 98765 11111" />
              </div>
              <div>
                <Label className="text-foreground mb-1.5 block">Customer number</Label>
                <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="+91 98765 22222" />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
              {loading ? "Connecting…" : "Place call"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Recent click-to-call activity</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">No recent calls. Calls placed here will appear in Call Logs.</CardContent>
      </Card>
    </div>
  );
};

export default ClickToCallPage;
