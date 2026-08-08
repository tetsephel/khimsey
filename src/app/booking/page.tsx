"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";
import { DAYS, TIMES } from "@/data/phrases";

export default function BookingPage() {
  const router = useRouter();
  const { tutor, level, day, time, setDay, setTime } = useBookingFlow();

  // No tutor selected — send back to the tutor grid rather than
  // rendering a broken summary.
  useEffect(() => {
    if (!tutor) router.replace("/teachers");
  }, [tutor, router]);

  if (!tutor) return null;

  const canConfirm = Boolean(day && time);

  function confirmBooking() {
    router.push("/lesson");
  }

  return (
    <section className="screen" id="s-booking">
      <div className="wrap flow-head">
        <span className="eyebrow">Step 4 of 5</span>
        <h2>Book your lesson with {tutor.name.split(" ")[0]}</h2>
        <p>
          Times shown in your time zone. Your evening is their morning — the
          ocean between you is exactly 9½ hours wide.
        </p>
      </div>
      <div className="wrap flow-body">
        <div className="book-grid">
          <div>
            <div className="slot-block">
              <h3>Pick a day</h3>
              <div className="chips">
                {DAYS.map((d) => (
                  <button
                    key={d.label}
                    className={`chip${day?.label === d.label ? " sel" : ""}`}
                    onClick={() => setDay(d)}
                  >
                    {d.label}
                    <small>{d.sub}</small>
                  </button>
                ))}
              </div>
              <h3>Pick a time</h3>
              <div className="chips">
                {TIMES.map((t) => (
                  <button
                    key={t.label}
                    className={`chip${time?.label === t.label ? " sel" : ""}`}
                    onClick={() => setTime(t)}
                  >
                    {t.label}
                    <small>{t.sub}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <aside className="summary">
            <h3>Lesson summary</h3>
            <div className="line">
              <span>Tutor</span>
              <span>{tutor.name}</span>
            </div>
            <div className="line">
              <span>Language</span>
              <span>Tibetan · {tutor.dialect}</span>
            </div>
            <div className="line">
              <span>Level</span>
              <span>{level ?? "—"}</span>
            </div>
            <div className="line">
              <span>When</span>
              <span>
                {day && time ? `${day.label} ${day.sub} · ${time.label}` : "Choose a slot"}
              </span>
            </div>
            <div className="line">
              <span>Length</span>
              <span>60 minutes</span>
            </div>
            <button
              className="btn btn-oxblood"
              disabled={!canConfirm}
              onClick={confirmBooking}
            >
              {canConfirm ? "Confirm booking →" : "Choose a day & time"}
            </button>
            <p className="fine">
              Demo — bookings are simulated. The lesson call is real.
            </p>
          </aside>
        </div>
        <div className="backlink">
          <button
            className="btn btn-quiet"
            onClick={() => router.push("/teachers")}
          >
            ← Back
          </button>
        </div>
      </div>
    </section>
  );
}
