import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Code, Webhook, Key, Send, Inbox, ArrowRight } from "lucide-react";

const sections = [
  { icon: Key, title: "Authentication", desc: "Bearer tokens, project-scoped API keys, rotation best practices." },
  { icon: Send, title: "Send Message API", desc: "POST /v1/messages — single, bulk, scheduled. Channel routing." },
  { icon: Inbox, title: "Inbox Webhooks", desc: "Subscribe to inbound events across WhatsApp, Email, Social." },
  { icon: Webhook, title: "Delivery Receipts", desc: "Real-time DLR callbacks for sent, delivered, read, failed." },
  { icon: Code, title: "SDKs", desc: "Official Node, Python, Go, and PHP libraries with type-safe clients." },
  { icon: BookOpen, title: "Guides", desc: "Step-by-step recipes: OTP flow, support inbox, IVRS routing." },
];

const DocsPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs uppercase tracking-wide font-semibold text-primary">Developer Docs</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2">Build with Samparq</h1>
      <p className="text-muted-foreground mt-4">Everything you need to integrate messaging, inbox, and voice into your stack.</p>
    </div>

    <Card className="mt-10 p-6 bg-sidebar text-sidebar-foreground border-0 overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-xs text-sidebar-muted">
        <span className="w-2 h-2 rounded-full bg-success" /> POST · /v1/messages
      </div>
      <pre className="text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
{`curl -X POST https://api.samparq.io/v1/messages \\
  -H "Authorization: Bearer sk_live_***" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channel": "whatsapp",
    "to": "+919999999999",
    "template": "order_shipped",
    "vars": { "order_id": "4821" }
  }'`}
      </pre>
    </Card>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
      {sections.map((s) => (
        <Card key={s.title} className="p-5 hover:shadow-card-hover transition-all hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">{s.title}</h3>
          <p className="text-sm text-muted-foreground mt-1.5">{s.desc}</p>
          <div className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
            Read guide <ArrowRight className="w-3 h-3" />
          </div>
        </Card>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link to="/login"><Button size="lg" className="bg-gradient-to-r from-primary to-info">Get an API key</Button></Link>
    </div>
  </div>
);

export default DocsPage;
