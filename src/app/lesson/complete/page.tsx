"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";
import { PHRASEBOOK } from "@/data/phrases";

function PayoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tutor, reset } = useBookingFlow();

  const tutorName =
    searchParams.get("tutor")?.split(" ")[0] ??
    tutor?.name.split(" ")[0] ??
    "your tutor";
  const time = searchParams.get("time") ?? "00:00";

  // Stable per-tutor key so the recap + rating persist between visits.
  const storeKey = `khimzey:${(tutor?.name ?? tutorName).replace(/\s+/g, "-").toLowerCase()}`;

  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [ratingDone, setRatingDone] = useState(false);
  const [priority, setPriority] = useState(false);

  // Load any previously saved recap/rating for this tutor.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.notes) setNotes(d.notes);
        if (d.rating) {
          setRating(d.rating);
          setReview(d.review ?? "");
          setRatingDone(true);
        }
        if (d.priority) setPriority(true);
      }
    } catch {
      /* ignore */
    }
  }, [storeKey]);

  function persist(patch: Record<string, unknown>) {
    try {
      const raw = localStorage.getItem(storeKey);
      const prev = raw ? JSON.parse(raw) : {};
      localStorage.setItem(storeKey, JSON.stringify({ ...prev, ...patch }));
    } catch {
      /* ignore */
    }
  }

  function saveNotes() {
    persist({ notes });
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 2200);
  }

  function submitRating() {
    if (rating === 0) return;
    persist({ rating, review });
    setRatingDone(true);
  }

  function togglePriority() {
    const next = !priority;
    setPriority(next);
    persist({ priority: next });
  }

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

        {/* ---- Lesson recap (shared) ---- */}
        <div className="recap-card">
          <div className="recap-head">
            <h3>Lesson recap</h3>
            <span className="shared-tag">Shared with {tutorName}</span>
          </div>
          <p className="recap-sub">
            A record of what you covered today — visible to both you and your
            tutor, so the next lesson picks up where this one ended.
          </p>

          <div className="covered">
            <span className="covered-label">Phrases covered</span>
            <ul>
              {PHRASEBOOK.map((p) => (
                <li key={p.t}>
                  <span className="tib-line">{p.t}</span>
                  <span className="rom-line">{p.r}</span>
                  <span className="eng-line">{p.e}</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="notes-label" htmlFor="recap-notes">
            Notes for next time
          </label>
          <textarea
            id="recap-notes"
            className="recap-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Work on Kham pronunciation, review family words, bring questions about honorifics…"
            rows={3}
          />
          <div className="recap-actions">
            <button className="btn btn-ghost" onClick={saveNotes}>
              {savedNotes ? "Saved ✓" : "Save recap"}
            </button>
          </div>
        </div>

        {/* ---- Rate your tutor ---- */}
        <div className="rate-card">
          {!ratingDone ? (
            <>
              <h3>How was your lesson with {tutorName}?</h3>
              <p className="rate-sub">
                Your rating helps other heritage learners find the right tutor.
              </p>
              <div
                className="stars"
                role="radiogroup"
                aria-label={`Rate ${tutorName}`}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`star${(hover || rating) >= n ? " on" : ""}`}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    aria-checked={rating === n}
                    role="radio"
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="review-box"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={`A few words about your lesson with ${tutorName} (optional)`}
                rows={2}
              />
              <button
                className="btn btn-oxblood"
                onClick={submitRating}
                disabled={rating === 0}
              >
                Submit rating
              </button>
            </>
          ) : (
            <div className="rate-done">
              <h3>Thank you — rating saved.</h3>
              <div className="stars static">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`star${rating >= n ? " on" : ""}`}>
                    ★
                  </span>
                ))}
              </div>
              {review && <p className="rate-quote">“{review}”</p>}
              <button
                className="btn btn-quiet"
                onClick={() => setRatingDone(false)}
              >
                Edit rating
              </button>
            </div>
          )}
        </div>

        {/* ---- Priority rebooking ---- */}
        <div className={`priority-card${priority ? " active" : ""}`}>
          <div className="priority-text">
            <h3>Make {tutorName} your priority tutor</h3>
            <p>
              Hold your weekly slot with {tutorName} before it opens to other
              learners — same time each week, first refusal always yours.
            </p>
          </div>
          <button
            className={`toggle${priority ? " on" : ""}`}
            onClick={togglePriority}
            role="switch"
            aria-checked={priority}
            aria-label="Priority rebooking"
          >
            <span className="knob" />
          </button>
        </div>
        {priority && (
          <p className="priority-note">
            ✓ Your weekly slot with {tutorName} is reserved. We&apos;ll remind
            you before each lesson.
          </p>
        )}

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
