"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";
import { PHRASEBOOK } from "@/data/phrases";
import { PersonAvatar } from "@/components/flow/person-avatar";

const JITSI_ROOM = "KhimzeyLiveLessonDemo2026";

type Stage = "precall" | "fakecall" | "realcall";

export default function LessonPage() {
  const router = useRouter();
  const { tutor } = useBookingFlow();
  const [stage, setStage] = useState<Stage>("precall");
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!tutor) {
      router.replace("/teachers");
      return;
    }
  }, [tutor, router]);

  useEffect(() => {
    if (stage === "precall") return;
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stage]);

  if (!tutor) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  function endLesson() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    router.push(
      `/lesson/complete?tutor=${encodeURIComponent(tutor!.name)}&time=${mm}:${ss}`
    );
  }

  return (
    <section className="screen" id="s-lesson">
      <div className="room">
        <div className="wrap">
          <div className="bar">
            <a
              className="logo"
              href="/"
              title="Back to home"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              <span className="mark" style={{ fontSize: 20 }}>
                Khimzey
              </span>
              <span className="mark-tib" style={{ fontSize: 14 }}>
                བོད་སྐད་
              </span>
            </a>
            <div className="rec">
              <i />
              <span>
                Live lesson · {mm}:{ss} · with {tutor.name.split(" ")[0]}
              </span>
            </div>
          </div>

          <div className="room-grid">
            <div className="stage">
              {stage === "precall" && (
                <div className="precall">
                  <div className="pav" style={{ background: tutor.color }}>
                    {tutor.initial}
                  </div>
                  <h3>{tutor.name.split(" ")[0]} is ready</h3>
                  <p>
                    Press join to start your video lesson. Keep the
                    phrasebook beside you — the goal is to use every line out
                    loud.
                  </p>
                  <button
                    className="btn btn-marigold"
                    onClick={() => setStage("fakecall")}
                  >
                    Join video lesson
                  </button>
                  <div style={{ marginTop: 12 }}>
                    <button
                      className="btn btn-quiet"
                      style={{ color: "rgba(243,236,221,.55)" }}
                      onClick={() => setStage("realcall")}
                    >
                      Use the live Jitsi room instead
                    </button>
                  </div>
                  <p
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      color: "rgba(243,236,221,.45)",
                    }}
                  >
                    Room: {JITSI_ROOM} · live video needs HTTPS + camera/mic
                    access
                  </p>
                </div>
              )}

              {stage === "fakecall" && (
                <div className="fakecall">
                  <PersonAvatar tutor={tutor} wave />
                  <div className="nameplate">
                    <span className="sbars">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    {tutor.name} · speaking Tibetan
                  </div>
                </div>
              )}

              {stage === "realcall" && (
                <iframe
                  src={`https://meet.jit.si/${JITSI_ROOM}`}
                  allow="camera; microphone; fullscreen; display-capture"
                />
              )}

              {stage === "fakecall" && (
                <div className="selfview">You</div>
              )}
            </div>

            <aside className="phrasebook">
              <h3>Today&apos;s phrasebook</h3>
              <div className="pb-sub">
                Use each one at least once before the hour ends.
              </div>
              {PHRASEBOOK.map((p) => (
                <div className="pb-item" key={p.t}>
                  <div className="t">{p.t}</div>
                  <div className="r">{p.r}</div>
                  <div className="e">{p.e}</div>
                </div>
              ))}
            </aside>
          </div>

          <div className="controls">
            <button className="ctl" title="Microphone" aria-label="Toggle microphone">
              🎙
            </button>
            <button className="ctl" title="Camera" aria-label="Toggle camera">
              🎥
            </button>
            <button className="ctl end" onClick={endLesson}>
              End lesson
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
