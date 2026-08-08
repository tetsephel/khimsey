"use client";

import { useEffect, useState } from "react";
import { HERO_PHRASES } from "@/data/phrases";

export function PhraseTicker() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % HERO_PHRASES.length);
        setFading(false);
      }, 400);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const phrase = HERO_PHRASES[idx];

  return (
    <div
      className={`phrase-card${fading ? " fading" : ""}`}
      aria-live="polite"
    >
      <span className="pc-label">Say it with us</span>
      <div className="phrase-tib">{phrase.t}</div>
      <div className="phrase-rom">{phrase.r}</div>
      <div className="phrase-en">{phrase.e}</div>
      <div className="phrase-dots">
        {HERO_PHRASES.map((_, i) => (
          <i key={i} className={i === idx ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}
