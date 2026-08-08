"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";

function PayoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tutor, reset } = useBookingFlow();

  const tutorName =
    searchParams.get("tutor")?.split(" ")[0] ??
    tutor?.name.split(" ")[0] ??
    "your tutor";
  const time = searchParams.get("time") ?? "00:00";

  function bookNext() {
    router.push("/teachers");
  }

  function backHome() {
    reset();
    router.push("/");
  }

  return (
    <section className="screen" id="s-payout">
      <div className="wrap">
        <div className="payout-hero">
          <div className="tick">✓</div>
          <h2>You just spoke Tibetan. Out loud.</h2>
          <p>
            That&apos;s the whole project — a language survives one
            conversation at a time.
          </p>
        </div>

        <div className="lesson-stats">
          <div className="node">
            <b>{time}</b>
            <span>of live Tibetan conversation with {tutorName}</span>
          </div>
          <div className="node">
            <b>5</b>
            <span>phrases from today&apos;s phrasebook, said out loud on the call</span>
          </div>
          <div className="node hero-num">
            <b>+1</b>
            <span>more voice keeping the language alive — yours</span>
          </div>
        </div>

        <div className="payout-context">
          Tibetan survives exactly this way:{" "}
          <b>one conversation, then another.</b> Book the next lesson while
          today&apos;s words are still warm.
        </div>

        <div className="roadmap">
          <h3>Opening next on Khimzey</h3>
          <div className="langs">
            <span>
              <b className="dev">नेपाली</b>Nepali
            </span>
            <span>
              <b className="dev">हिन्दी</b>Hindi
            </span>
          </div>
        </div>

        <div className="payout-actions">
          <button className="btn btn-oxblood" onClick={bookNext}>
            Book your next lesson
          </button>
          <button className="btn btn-ghost" onClick={backHome}>
            Back to home
          </button>
        </div>
      </div>
    </section>
  );
}

export default function PayoutPage() {
  return (
    <Suspense fallback={null}>
      <PayoutContent />
    </Suspense>
  );
}
