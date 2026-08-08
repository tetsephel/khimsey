"use client";

import { useEffect, useState } from "react";
import { Tutor } from "@/types/tutor";
import { PersonAvatar } from "./person-avatar";

export function TutorIntroModal({
  tutor,
  onClose,
}: {
  tutor: Tutor | null;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
  }, [tutor]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!tutor) return null;

  return (
    <div
      className="modal open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`vframe${playing ? " playing" : ""}`}>
        <button className="vclose" onClick={onClose} aria-label="Close intro video">
          ×
        </button>
        <div className="vstage">
          <PersonAvatar tutor={tutor} wave />
        </div>
        {!playing && (
          <button className="playbtn" onClick={() => setPlaying(true)} aria-label="Play intro">
            <span>▶</span>
          </button>
        )}
        <div className="vbar">
          <div className="vname">
            {tutor.name} · {tutor.dialect}
          </div>
          <div className="vsub">
            <span className="tib">བཀྲ་ཤིས་བདེ་ལེགས།</span> tashi delek — I&apos;m{" "}
            {tutor.name.split(" ")[0]}. Let&apos;s talk.
          </div>
          <div className="progress">
            <i
              style={{
                width: playing ? "100%" : "0%",
                transition: playing ? "width 8s linear" : "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
