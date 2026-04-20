import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Send, CheckCheck, Sparkles } from "lucide-react";

const fullText = "Hi Priya 👋 Your order #4821 is confirmed. Track it here: samparq.io/t/4821";

/**
 * Animated mock: shows composing → sending → delivered across SMS / WhatsApp / Email.
 */
const MessageOutPreview = () => {
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState<"typing" | "sending" | "delivered">("typing");
  const [tick, setTick] = useState(0);

  // Loop every ~7s
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setTyped("");
    setStage("typing");
    let i = 0;
    const typer = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typer);
        setTimeout(() => setStage("sending"), 500);
        setTimeout(() => setStage("delivered"), 1800);
      }
    }, 35);
    return () => clearInterval(typer);
  }, [tick]);

  return (
    <Card className="p-5 shadow-card-hover bg-card border-border overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Send className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Send Message</div>
            <div className="text-xs text-muted-foreground">Outbound · Multi-channel</div>
          </div>
        </div>
        <span className="text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Live
        </span>
      </div>

      <div className="flex gap-1.5 mb-3">
        {[
          { icon: MessageCircle, label: "SMS", color: "channel-sms" },
          { icon: MessageCircle, label: "WhatsApp", color: "channel-whatsapp", active: true },
          { icon: Mail, label: "Email", color: "channel-email" },
          { icon: Phone, label: "RCS", color: "channel-rcs" },
        ].map((ch) => (
          <span
            key={ch.label}
            className={`text-[10px] px-2 py-1 rounded-md font-medium border ${
              ch.active
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground"
            }`}
          >
            {ch.label}
          </span>
        ))}
      </div>

      <div className="rounded-lg bg-muted/40 border border-border p-3 min-h-[88px] text-sm text-foreground">
        {typed}
        {stage === "typing" && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">To: 12,400 recipients</span>
        {stage === "typing" && <span className="text-muted-foreground">Composing…</span>}
        {stage === "sending" && (
          <span className="text-info flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-info animate-ping" /> Sending…
          </span>
        )}
        {stage === "delivered" && (
          <span className="text-success font-medium flex items-center gap-1 animate-fade-in">
            <CheckCheck className="w-3.5 h-3.5" /> Delivered to 12,388
          </span>
        )}
      </div>

      {/* Mini delivery bar */}
      <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-success transition-all duration-1000"
          style={{ width: stage === "typing" ? "10%" : stage === "sending" ? "60%" : "99%" }}
        />
      </div>
    </Card>
  );
};

export default MessageOutPreview;
