"use client";

import { useRouter } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";

export default function LevelPage() {
  const router = useRouter();
  const { setLevel } = useBookingFlow();

  function pickLevel(level: string) {
    setLevel(level);
    router.push("/teachers");
  }

  return (
    <section className="screen" id="s-level">
      <div className="wrap flow-head">
        <span className="eyebrow">Step 2 of 5</span>
        <h2>Where is your Tibetan right now?</h2>
        <p>
          Be honest — every tutor here has heard it all, in every accent the
          diaspora produces.
        </p>
      </div>
      <div className="wrap flow-body">
        <div className="choice-grid">
          <button
            className="choice"
            onClick={() => pickLevel("Starting from zero")}
          >
            <span className="c-tib">ཀ་</span>
            <h3>Starting from zero</h3>
            <p>
              New to the language entirely. We begin with greetings, sounds,
              and the words for family.
            </p>
          </button>
          <button
            className="choice heritage"
            onClick={() => pickLevel("Heritage speaker")}
          >
            <span className="c-tib">ཨ་མ་</span>
            <h3>I understand, but I can&apos;t speak</h3>
            <p>
              You follow every word your ama says — and answer in English.
              This track exists for you: listening is already there, we build
              the speaking.
            </p>
            <span className="hint">Most of us are here</span>
          </button>
          <button
            className="choice"
            onClick={() => pickLevel("Conversational")}
          >
            <span className="c-tib">སྐད་ཆ་</span>
            <h3>Conversational, want polish</h3>
            <p>
              You can hold your own but want fluency, vocabulary, and a
              dialect tune-up.
            </p>
          </button>
        </div>
        <div className="backlink">
          <button
            className="btn btn-quiet"
            onClick={() => router.push("/start")}
          >
            ← Back
          </button>
        </div>
      </div>
    </section>
  );
}
