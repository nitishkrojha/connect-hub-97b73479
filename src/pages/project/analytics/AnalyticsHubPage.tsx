import { Link } from "react-router-dom";
import AnalyticsShell from "@/components/analytics/AnalyticsShell";
import KpiCard from "@/components/analytics/KpiCard";
import { Card } from "@/components/ui/card";
import { ArrowRight, Megaphone, Inbox, Phone, Search, MessageSquare, CheckCircle2, BarChart3 } from "lucide-react";

const tiles = [
  { to: "/project/analytics/campaigns", icon: Megaphone, title: "Campaign Analytics", desc: "Outbound delivery, opens, clicks across SMS, WhatsApp, Email, RCS." },
  { to: "/project/analytics/inbox", icon: Inbox, title: "Inbox Analytics", desc: "Conversation volume, response time, agent performance, CSAT." },
  { to: "/project/analytics/voice", icon: Phone, title: "Voice Analytics", desc: "Call volume, IVRS funnels, answer rates, agent productivity." },
  { to: "/project/analytics/number-lookup", icon: Search, title: "Number Lookup", desc: "Validate, profile, and audit numbers used in your campaigns." },
];

const kpis = [
  { label: "Messages sent", value: "137.9K", icon: MessageSquare, trend: "+12.4% vs last week" },
  { label: "Conversations", value: "2,855", icon: Inbox, trend: "+8.1%" },
  { label: "Calls handled", value: "1,284", icon: Phone, trend: "+5.2%" },
  { label: "Overall delivery", value: "97.1%", icon: CheckCircle2, trend: "+0.3%" },
];

const AnalyticsHubPage = () => (
  <AnalyticsShell title="Analytics" subtitle="Unified performance across every channel.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiles.map((t) => (
        <Link key={t.to} to={t.to}>
          <Card className="p-6 hover:shadow-card-hover transition-all hover:border-primary/40 h-full group">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-foreground">{t.title}</p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  </AnalyticsShell>
);

export default AnalyticsHubPage;
