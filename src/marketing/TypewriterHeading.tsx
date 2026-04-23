import { useEffect, useState } from "react";

interface Props {
  phrases: string[];
  className?: string;
}

const TypewriterHeading = ({ phrases, className = "" }: Props) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[idx];
    const speed = deleting ? 28 : 55;
    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1800);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIdx((idx + 1) % phrases.length);
        return;
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, phrases]);

  return (
    <span className={className}>
      <span className="gradient-text">{text}</span>
      <span className="inline-block w-[3px] h-[1em] bg-primary align-middle ml-1 animate-blink" />
    </span>
  );
};

export default TypewriterHeading;
