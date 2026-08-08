"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";
import { TUTORS } from "@/data/tutors";
import { Tutor } from "@/types/tutor";
import { TutorCard } from "@/components/flow/tutor-card";
import { TutorIntroModal } from "@/components/flow/tutor-intro-modal";

export default function TeachersPage() {
  const router = useRouter();
  const { level, setTutor } = useBookingFlow();
  const [introTutor, setIntroTutor] = useState<Tutor | null>(null);

  const levelLabel =
    level === "Heritage speaker"
      ? "“I understand but can't speak” track"
      : (level ?? "your level").toLowerCase();

  function pickTutor(tutor: Tutor) {
    setTutor(tutor);
    router.push("/booking");
  }

  return (
    <section className="screen" id="s-tutors">
      <div className="wrap flow-head">
        <span className="eyebrow">Step 3 of 5</span>
        <h2>
          Your tutors, <span>{levelLabel}</span>
        </h2>
        <p>
          Fluent speakers and former teachers in Tibetan communities across
          India and Nepal. Every profile opens with a 30-second self-intro —
          in their own voice.
        </p>
      </div>
      <div className="wrap flow-body">
        <div className="tutor-grid">
          {TUTORS.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onOpenIntro={() => setIntroTutor(tutor)}
              onBook={() => pickTutor(tutor)}
            />
          ))}
        </div>
        <div className="backlink">
          <button
            className="btn btn-quiet"
            onClick={() => router.push("/level")}
          >
            ← Back
          </button>
        </div>
      </div>

      <TutorIntroModal tutor={introTutor} onClose={() => setIntroTutor(null)} />
    </section>
  );
}
