"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useBookingFlow } from "@/context/booking-flow-context";
import { StudentProfile, EMPTY_PROFILE } from "@/types/profile";
import { loadProfile, saveProfile } from "@/lib/profile-storage";

const DIALECTS = ["Ü-Tsang", "Amdo", "Kham", "Not sure yet"];
const LEVELS = [
  "Starting from zero",
  "Heritage speaker",
  "Conversational",
];

export default function ProfilePage() {
  const { language, level } = useBookingFlow();
  const [profile, setProfile] = useState<StudentProfile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load whatever's stored locally, falling back to selections already
  // made earlier in the booking flow (language/level) if this is the
  // learner's first time on the profile page.
  useEffect(() => {
    const stored = loadProfile();
    setProfile({
      ...stored,
      level: stored.level || level || "",
    });
    setHydrated(true);
  }, [level]);

  function update<K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  }

  if (!hydrated) return null;

  const initial = profile.name ? profile.name[0].toUpperCase() : "ཨ";

  return (
    <section className="screen" id="s-profile">
      <div className="wrap flow-head">
        <span className="eyebrow">Your profile</span>
        <h2>Keep your details up to date</h2>
        <p>
          This is what your tutors see before a lesson — level, dialect goal,
          and anything you want them to know.
        </p>
      </div>

      <div className="wrap flow-body" style={{ maxWidth: 640 }}>
        <div className="profile-card">
          <div className="profile-head">
            <div className="profile-avatar">{initial}</div>
            <div>
              <h2>{profile.name || "Add your name"}</h2>
              <p>
                {language ?? "No language selected yet"}
                {profile.level ? ` · ${profile.level}` : ""}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Tenzin Lhamo"
              />
            </div>

            <div className="field">
              <label htmlFor="level">Current level</label>
              <select
                id="level"
                value={profile.level}
                onChange={(e) => update("level", e.target.value)}
              >
                <option value="">Select a level</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="dialect">Dialect goal</label>
              <select
                id="dialect"
                value={profile.dialectGoal}
                onChange={(e) => update("dialectGoal", e.target.value)}
              >
                <option value="">Select a dialect</option>
                {DIALECTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="hint-text">
                We&apos;ll prioritize tutors who teach this dialect.
              </div>
            </div>

            <div className="field">
              <label htmlFor="goals">Learning goals</label>
              <textarea
                id="goals"
                value={profile.goals}
                onChange={(e) => update("goals", e.target.value)}
                placeholder="e.g. I want to talk to my grandparents without switching to English."
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button className="btn btn-oxblood" type="submit">
                Save profile
              </button>
              <span className={`save-note${saved ? " show" : ""}`}>
                ✓ Saved
              </span>
            </div>
          </form>

          <div className="profile-stats">
            <div className="node">
              <b>0</b>
              <span>Lessons completed</span>
            </div>
            <div className="node">
              <b>0</b>
              <span>Minutes spoken</span>
            </div>
            <div className="node">
              <b>—</b>
              <span>Current streak</span>
            </div>
          </div>
        </div>

        <div className="backlink">
          <Link className="btn btn-quiet" href="/teachers">
            ← Find a tutor
          </Link>
        </div>
      </div>
    </section>
  );
}
