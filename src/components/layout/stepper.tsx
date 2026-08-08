"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEP_OF: Record<string, number> = {
  "/start": 1,
  "/level": 2,
  "/teachers": 3,
  "/booking": 4,
  "/lesson/complete": 5,
};

const FLAGS = [
  { i: 1, x: 88, y: 16, fill: "#3b6fb5", tx: 111, ty: 40, text: "ཀ", textColor: "rgba(255,255,255,.85)" },
  { i: 2, x: 308, y: 19, fill: "#f3f1e9", tx: 331, ty: 43, text: "ཁ", textColor: "rgba(21,18,30,.7)", stroke: "#d8cbb2" },
  { i: 3, x: 528, y: 15, fill: "#c8442d", tx: 551, ty: 39, text: "ག", textColor: "rgba(255,255,255,.85)" },
  { i: 4, x: 748, y: 19, fill: "#3e7c4f", tx: 771, ty: 43, text: "ང", textColor: "rgba(255,255,255,.85)" },
  { i: 5, x: 968, y: 16, fill: "#e9c337", tx: 991, ty: 40, text: "ཅ", textColor: "rgba(21,18,30,.7)" },
];

const LABELS = [
  { l: 1, text: "Language" },
  { l: 2, text: "Level" },
  { l: 3, text: "Tutor" },
  { l: 4, text: "Book" },
  { l: 5, text: "Lesson" },
];

export function Stepper() {
  const pathname = usePathname();
  const step = STEP_OF[pathname];

  if (!step) return null;

  return (
    <div className="stepper">
      <div className="topbar">
        <Link className="logo" href="/">
          <span className="mark">Khimzey</span>
          <span className="mark-tib">བོད་སྐད་</span>
        </Link>
        <Link href="/" className="home-btn">
          ⌂ Home
        </Link>
      </div>
      <div className="garland" aria-hidden="true">
        <svg viewBox="0 0 1100 64" preserveAspectRatio="none">
          <path
            d="M0 14 Q 275 30 550 18 T 1100 14"
            fill="none"
            stroke="#8a7a5c"
            strokeWidth="1.5"
          />
          {FLAGS.map((f) => (
            <g
              key={f.i}
              className={`flag sf${f.i > step ? " dim" : ""}`}
            >
              <rect
                x={f.x}
                y={f.y}
                width="46"
                height="34"
                rx="2"
                fill={f.fill}
                stroke={f.stroke}
              />
              <text
                x={f.tx}
                y={f.ty}
                textAnchor="middle"
                fontSize="15"
                fill={f.textColor}
                fontFamily="Noto Serif Tibetan, Kailasa, serif"
              >
                {f.text}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="labels">
        {LABELS.map((l) => (
          <span key={l.l} className={l.l <= step ? "done" : ""}>
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}
