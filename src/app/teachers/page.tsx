"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingFlow } from "@/context/booking-flow-context";
import { TUTORS } from "@/data/tutors";
import { Tutor } from "@/types/tutor";
import { TutorCard } from "@/components/flow/tutor-card";
import { TutorIntroModal } from "@/components/flow/tutor-intro-modal";

// Group the specific dialect strings ("Ü-Tsang (Lhasa)", "Ü-Tsang · colloquial")
// into a single filterable family so learners can pick by broad dialect.
function dialectFamily(dialect: string): string {
  if (dialect.includes("Ü-Tsang")) return "Ü-Tsang";
  if (dialect.includes("Kham")) return "Kham";
  if (dialect.includes("Amdo")) return "Amdo";
  return dialect;
}

// Country is the last segment of the location string, after the "·".
function tutorCountry(loc: string): string {
  const parts = loc.split("·");
  return parts[parts.length - 1].trim();
}

export default function TeachersPage() {
  const router = useRouter();
  const { level, setTutor } = useBookingFlow();
  const [introTutor, setIntroTutor] = useState<Tutor | null>(null);

  const [query, setQuery] = useState("");
  const [dialect, setDialect] = useState("All");
  const [country, setCountry] = useState("All");

  // Build filter options straight from the data so new tutors show up automatically.
  const dialects = useMemo(
    () => ["All", ...Array.from(new Set(TUTORS.map((t) => dialectFamily(t.dialect))))],
    []
  );
  const countries = useMemo(
    () => ["All", ...Array.from(new Set(TUTORS.map((t) => tutorCountry(t.loc))))],
    []
  );

  const visibleTutors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TUTORS.filter((t) => {
      if (dialect !== "All" && dialectFamily(t.dialect) !== dialect) return false;
      if (country !== "All" && tutorCountry(t.loc) !== country) return false;
      if (!q) return true;
      const haystack = `${t.name} ${t.dialect} ${t.loc} ${t.speaks} ${t.bio}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, dialect, country]);

  const levelLabel =
    level === "Heritage speaker"
      ? "“I understand but can't speak” track"
      : (level ?? "your level").toLowerCase();

  function pickTutor(tutor: Tutor) {
    setTutor(tutor);
    router.push("/booking");
  }

  function resetFilters() {
    setQuery("");
    setDialect("All");
    setCountry("All");
  }

  const filtersActive = query !== "" || dialect !== "All" || country !== "All";

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
        <div className="tutor-filters">
          <input
            className="tutor-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, dialect, city, or language…"
            aria-label="Search tutors"
          />

          <div className="filter-row">
            <span className="filter-label">Dialect</span>
            <div className="chips">
              {dialects.map((d) => (
                <button
                  key={d}
                  className={`chip${dialect === d ? " sel" : ""}`}
                  onClick={() => setDialect(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Location</span>
            <div className="chips">
              {countries.map((c) => (
                <button
                  key={c}
                  className={`chip${country === c ? " sel" : ""}`}
                  onClick={() => setCountry(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-meta">
            <span>
              Showing {visibleTutors.length} of {TUTORS.length} tutors
            </span>
            {filtersActive && (
              <button className="btn btn-quiet" onClick={resetFilters}>
                Clear filters
              </button>
            )}
          </div>
        </div>

        {visibleTutors.length > 0 ? (
          <div className="tutor-grid">
            {visibleTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onOpenIntro={() => setIntroTutor(tutor)}
                onBook={() => pickTutor(tutor)}
              />
            ))}
          </div>
        ) : (
          <div className="tutor-empty">
            <p>No tutors match those filters yet.</p>
            <button className="btn btn-ghost" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}

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
