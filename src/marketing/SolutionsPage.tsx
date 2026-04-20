import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Megaphone, Headphones, Phone, Banknote, ShoppingBag, GraduationCap, Stethoscope, ArrowRight } from "lucide-react";

const useCases = [
  { icon: ShieldCheck, title: "OTP & Authentication", desc: "Sub-second OTP delivery via SMS, WhatsApp, and voice fallback. 99.9% reach.", tag: "Transactional" },
  { icon: Megaphone, title: "Marketing Campaigns", desc: "Segment, schedule, and blast across channels with template approvals built-in.", tag: "Promotional" },
  { icon: Headphones, title: "Customer Support", desc: "Unified inbox for replies, ticketing, agent assignment, and SLA tracking.", tag: "Support" },
  { icon: Phone, title: "IVRS & Voice", desc: "Build interactive voice flows with geo + peak-hour analytics dashboards.", tag: "Voice" },
];

const industries = [
  { icon: Banknote, name: "Banking & Fintech" },
  { icon: ShoppingBag, name: "E-commerce & Retail" },
  { icon: GraduationCap, name: "EdTech" },
  { icon: Stethoscope, name: "Healthcare" },
];

const SolutionsPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs uppercase tracking-wide font-semibold text-primary">Solutions</span>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2">Built for every messaging workflow</h1>
      <p className="text-muted-foreground mt-4">From transactional OTPs to multi-channel support — choose the workflow, Samparq handles the plumbing.</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-5 mt-12">
      {useCases.map((u) => (
        <Card key={u.title} className="p-6 hover:shadow-card-hover transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-info/15 flex items-center justify-center flex-shrink-0">
              <u.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{u.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{u.tag}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{u.desc}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="mt-20">
      <h2 className="text-2xl font-bold text-foreground text-center">Trusted across industries</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {industries.map((i) => (
          <Card key={i.name} className="p-6 flex flex-col items-center gap-3 text-center hover:shadow-card-hover transition-all">
            <i.icon className="w-8 h-8 text-primary" />
            <span className="font-medium text-foreground">{i.name}</span>
          </Card>
        ))}
      </div>
    </div>

    <div className="text-center mt-16">
      <Link to="/login"><Button size="lg" className="bg-gradient-to-r from-primary to-info">Start your project <ArrowRight className="ml-1.5 w-4 h-4" /></Button></Link>
    </div>
  </div>
);

export default SolutionsPage;
