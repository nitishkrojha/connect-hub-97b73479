import { useEffect, useState } from "react";
import { CheckCheck, MessageCircle, Mic, Image as ImageIcon, Smile, Plus } from "lucide-react";

type Bubble = {
  id: number;
  side: "in" | "out";
  text: string;
  time: string;
  delay: number; // ms after mount
  status?: "sent" | "delivered" | "read";
  typing?: boolean;
};

const script: Bubble[] = [
  { id: 1, side: "out", text: "Hi Priya 👋 Your order #4821 is confirmed!", time: "10:12", delay: 600, status: "read" },
  { id: 2, side: "in", text: "Thanks! When will it arrive?", time: "10:12", delay: 1800 },
  { id: 3, side: "out", text: "Out for delivery today between 4–6 PM 🚚", time: "10:13", delay: 3300, status: "delivered" },
  { id: 4, side: "in", text: "Perfect! Can I track it?", time: "10:13", delay: 4600 },
  { id: 5, side: "out", text: "Sure — track here: samparq.io/t/4821", time: "10:14", delay: 6000, status: "sent" },
];

const TOTAL_CYCLE_MS = 8500;

/**
 * Animated WhatsApp-style mobile phone showing inbound + outbound messages flowing in real time.
 * Loops every ~8.5s.
 */
const PhoneChatPreview = () => {
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), TOTAL_CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setVisible([]);
    setShowTyping(false);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    script.forEach((b) => {
      // typing indicator before inbound bubbles
      if (b.side === "in") {
        timeouts.push(setTimeout(() => setShowTyping(true), b.delay - 700));
        timeouts.push(
          setTimeout(() => {
            setShowTyping(false);
            setVisible((v) => [...v, b.id]);
          }, b.delay)
        );
      } else {
        timeouts.push(setTimeout(() => setVisible((v) => [...v, b.id]), b.delay));
      }
    });
    return () => timeouts.forEach(clearTimeout);
  }, [tick]);

  return (
    <div className="relative mx-auto" style={{ width: 290 }}>
      {/* Floating accent badges */}
      <div className="absolute -top-3 -left-10 z-20 hidden sm:flex items-center gap-1.5 bg-card border border-border shadow-card rounded-full px-3 py-1.5 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-[11px] font-medium text-foreground">Live message sent</span>
      </div>
      <div className="absolute top-32 -right-12 z-20 hidden sm:flex items-center gap-1.5 bg-card border border-border shadow-card rounded-full px-3 py-1.5 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <CheckCheck className="w-3.5 h-3.5 text-info" />
        <span className="text-[11px] font-medium text-foreground">Read · 0.4s</span>
      </div>

      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] bg-foreground p-2 shadow-card-hover" style={{ aspectRatio: "9/19" }}>
        <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-[#ECE5DD]">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-20 h-5 rounded-full bg-foreground" />

          {/* WhatsApp header */}
          <div className="bg-[#075E54] text-white px-3 pt-7 pb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">P</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold leading-tight truncate">Priya M.</div>
              <div className="text-[10px] text-white/70 leading-tight">online</div>
            </div>
            <MessageCircle className="w-4 h-4 text-white/80" />
          </div>

          {/* Chat body */}
          <div className="px-2.5 py-3 space-y-1.5 h-[calc(100%-104px)] overflow-hidden flex flex-col justify-end">
            {script.map((b) =>
              visible.includes(b.id) ? (
                <div
                  key={b.id}
                  className={`flex ${b.side === "out" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] px-2.5 py-1.5 rounded-lg text-[12px] leading-snug shadow-sm ${
                      b.side === "out"
                        ? "bg-[#DCF8C6] text-[#0b1f17] rounded-br-sm"
                        : "bg-white text-[#0b1f17] rounded-bl-sm"
                    }`}
                  >
                    <div>{b.text}</div>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span className="text-[9px] text-black/40">{b.time}</span>
                      {b.side === "out" && b.status && (
                        <CheckCheck
                          className={`w-3 h-3 ${b.status === "read" ? "text-[#34B7F1]" : "text-black/40"}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : null
            )}
            {showTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#ECE5DD] px-2 py-2 flex items-center gap-1.5">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2">
              <Smile className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground flex-1 truncate">Type a message…</span>
              <Plus className="w-3.5 h-3.5 text-muted-foreground" />
              <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneChatPreview;
