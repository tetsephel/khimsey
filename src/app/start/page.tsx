"use client";

import { useRouter } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";

export default function StartPage() {
  const router = useRouter();
  const { setLanguage } = useBookingFlow();

  function pickLanguage(lang: string) {
    setLanguage(lang);
    router.push("/level");
  }

  return (
    <section className="screen" id="s-language">
      <div className="wrap flow-head">
        <span className="eyebrow">Step 1 of 5</span>
        <h2>Which language lives in your family?</h2>
        <p>
          Tibetan is live today — that&apos;s where we&apos;re homed in.
          Nepali and Hindi open next, same format.
        </p>
      </div>
      <div className="wrap flow-body">
        <div className="choice-grid">
          <button className="choice" onClick={() => pickLanguage("Tibetan")}>
            <span className="live">Live now</span>
            <span className="c-tib">བོད་སྐད་</span>
            <h3>Tibetan</h3>
            <p>
              Ü-Tsang, Amdo &amp; Kham dialect tutors. Colloquial,
              conversation-first — built to keep the language spoken.
            </p>
          </button>
          <button className="choice" disabled>
            <span className="soon">Opening soon</span>
            <span className="c-dev">नेपाली</span>
            <h3>Nepali</h3>
            <p>
              Live conversation with fluent speakers, for families keeping
              Nepali alive abroad.
            </p>
          </button>
          <button className="choice" disabled>
            <span className="soon">Opening soon</span>
            <span className="c-dev">हिन्दी</span>
            <h3>Hindi</h3>
            <p>
              Everyday conversational Hindi with fluent speakers — same
              live-lesson format.
            </p>
          </button>
        </div>
        <div className="backlink">
          <button className="btn btn-quiet" onClick={() => router.push("/")}>
            ← Back to home
          </button>
        </div>
      </div>
    </section>
  );
}
