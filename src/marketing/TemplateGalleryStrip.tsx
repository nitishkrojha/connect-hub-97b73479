import { Card } from "@/components/ui/card";
import { Check, FileText } from "lucide-react";

const TEMPLATES = [
  { tag: "OTP", title: "Login OTP", body: "Your OTP is {{1}}. Valid for 10 mins. Do not share.", category: "Authentication", color: "bg-blue-500/10 text-blue-600" },
  { tag: "Order", title: "Order confirmed", body: "Hi {{1}}, your order #{{2}} is confirmed. Track here.", category: "Utility", color: "bg-emerald-500/10 text-emerald-600" },
  { tag: "COD", title: "COD verification", body: "Confirm your COD order #{{1}} by replying YES.", category: "Utility", color: "bg-amber-500/10 text-amber-600" },
  { tag: "Shipping", title: "Out for delivery", body: "Your parcel is out for delivery today between 10am–6pm.", category: "Utility", color: "bg-purple-500/10 text-purple-600" },
  { tag: "Cart", title: "Cart reminder", body: "Items in your cart are waiting! Get 10% off — code SAVE10.", category: "Marketing", color: "bg-pink-500/10 text-pink-600" },
  { tag: "Feedback", title: "Rate your experience", body: "How was your last order? Tap a star to rate us.", category: "Marketing", color: "bg-channel-whatsapp/10 text-channel-whatsapp" },
];

const TemplateGalleryStrip = () => (
  <section className="py-24 bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 animate-fade-in">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-semibold">
            Template library
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Pre-approved templates, ready to send
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4 text-primary" />
          <span>
            <span className="font-bold text-foreground">200+</span> templates across WhatsApp, SMS, RCS & Email
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" aria-hidden />

        <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-thin">
          {TEMPLATES.map((t) => (
            <Card
              key={t.title}
              className="snap-start shrink-0 w-72 p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              {/* WhatsApp-style header */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${t.color}`}>
                  {t.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success">
                  <Check className="w-3 h-3" /> Approved
                </span>
              </div>
              <div className="text-sm font-semibold text-foreground mb-2">{t.title}</div>
              <div className="rounded-lg bg-channel-whatsapp/5 border border-channel-whatsapp/15 p-3 text-xs text-foreground leading-relaxed min-h-[72px]">
                {t.body}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{t.category}</span>
                <span className="text-primary font-semibold">Use template →</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TemplateGalleryStrip;
