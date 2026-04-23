import { useEffect, useState } from "react";

interface Props {
  words: string[];
  className?: string;
}

/**
 * Seezo-style inline animated word: types in, holds, types out, swaps to next.
 * Uses a gradient italic serif accent.
 */
const InlineWordSwap = ({ words, className = "" }: Props) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(words[0]);
      return;
    }
    const current = words[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text === current) {
        timeout = setTimeout(() => setPhase("holding"), 50);
      } else {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 1800);
    } else {
      if (text === "") {
        setIdx((idx + 1) % words.length);
        setPhase("typing");
      } else {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, idx, words]);

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span
        className="font-serif italic bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent"
        style={{ backgroundSize: "200% auto" }}
      >
        {text}
      </span>
      <span className="inline-block w-[2px] h-[0.85em] bg-primary align-middle ml-0.5 animate-blink" />
    </span>
  );
};

export default InlineWordSwap;
