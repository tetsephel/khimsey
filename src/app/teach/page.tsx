"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Suggestions offered via a datalist — tutors can also type their own.
const DIALECT_SUGGESTIONS = [
  "Ü-Tsang (Lhasa)",
  "Amdo",
  "Kham",
  "Dzongkha (Bhutan)",
  "Sherpa",
  "Ladakhi",
  "Spiti",
  "Balti",
  "Dolpo",
  "Nubri",
];

const LEVELS = ["Native speaker", "Fluent", "Conversational", "Basic"];

type DialectSkill = { name: string; level: string };

type Form = {
  name: string;
  email: string;
  location: string;
  dialects: DialectSkill[];
  languages: string;
  bio: string;
  intro: string;
};

const EMPTY: Form = {
  name: "",
  email: "",
  location: "",
  dialects: [{ name: "", level: "Native speaker" }],
  languages: "",
  bio: "",
  intro: "",
};

export default function TeachPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addDialect() {
    setForm((f) => ({
      ...f,
      dialects: [...f.dialects, { name: "", level: "Native speaker" }],
    }));
  }

  function updateDialect(i: number, key: keyof DialectSkill, value: string) {
    setForm((f) => {
      const next = f.dialects.slice();
      next[i] = { ...next[i], [key]: value };
      return { ...f, dialects: next };
    });
  }

  function removeDialect(i: number) {
    setForm((f) => ({
      ...f,
      dialects: f.dialects.filter((_, idx) => idx !== i),
    }));
  }

  function submit() {
    if (!form.name.trim() || !form.email.trim() || !form.location.trim()) {
      setError("Please add your name, email, and location.");
      return;
    }
    const filledDialects = form.dialects.filter((d) => d.name.trim());
    if (filledDialects.length === 0) {
      setError("Please list at least one dialect you teach.");
      return;
    }
    if (!form.bio.trim()) {
      setError("A short bio helps learners choose you — please add one.");
      return;
    }
    setError("");
    try {
      const raw = localStorage.getItem("khimzey:applications");
      const prev = raw ? JSON.parse(raw) : [];
      prev.push({
        ...form,
        dialects: filledDialects,
        at: new Date().toISOString(),
      });
      localStorage.setItem("khimzey:applications", JSON.stringify(prev));
    } catch {
      /* ignore */
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="screen" id="s-teach">
        <div className="wrap teach-done">
          <div className="tick">✓</div>
          <h2>Thank you, {form.name.split(" ")[0]}.</h2>
          <p>
            Your application to teach on Khimzey is in. We review every
            applicant personally — expect to hear from us at{" "}
            <b>{form.email}</b> within a few days. Learners across the diaspora
            are waiting for a voice like yours.
          </p>
          <div className="teach-done-actions">
            <button className="btn btn-oxblood" onClick={() => router.push("/")}>
              Back to home
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setForm(EMPTY);
                setSubmitted(false);
              }}
            >
              Submit another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="screen" id="s-teach">
      <div className="wrap flow-head">
        <span className="eyebrow">Teach on Khimzey</span>
        <h2>Keep the language alive — and get paid to do it.</h2>
        <p>
          Khimzey connects fluent Tibetan speakers in India, Nepal, and Bhutan
          with heritage learners across the diaspora who are trying to speak
          their family&apos;s language again. You don&apos;t need a teaching
          degree or a lesson plan — just fluency, patience, and a willingness to
          have a conversation.
        </p>
      </div>

      <div className="wrap teach-body">
        <div className="teach-why">
          <div className="why-item">
            <span className="c-tib">སྐད་</span>
            <h4>Preserve the language</h4>
            <p>
              A language lives only while it&apos;s spoken. Every hour you teach
              carries Tibetan one conversation further.
            </p>
          </div>
          <div className="why-item">
            <span className="c-tib">སྒོར་</span>
            <h4>Get paid for your time</h4>
            <p>
              Set your own hours and teach from home. You&apos;re paid for your
              time, going directly to you — not a middleman.
            </p>
          </div>
          <div className="why-item">
            <span className="c-tib">ཁྱིམ་</span>
            <h4>Teach from anywhere</h4>
            <p>
              Dharamshala, Kathmandu, Bylakuppe, Thimphu — wherever you are, a
              learner an ocean away is ready to listen.
            </p>
          </div>
        </div>

        <div className="teach-form">
          <h3>Your application</h3>

          <label className="fld">
            <span>Full name *</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Tenzin Dorjee"
            />
          </label>

          <label className="fld">
            <span>Email *</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="fld">
            <span>Where are you based? *</span>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="McLeod Ganj, Dharamshala · India"
            />
          </label>

          <div className="fld">
            <span>Which dialects do you teach, and how comfortable are you? *</span>
            <p className="fld-hint">
              List every dialect you can teach — set your comfort level for each.
            </p>
            <div className="dialect-rows">
              {form.dialects.map((row, i) => (
                <div className="dialect-row" key={i}>
                  <input
                    type="text"
                    list="dialect-options"
                    value={row.name}
                    onChange={(e) => updateDialect(i, "name", e.target.value)}
                    placeholder="e.g. Kham"
                  />
                  <select
                    value={row.level}
                    onChange={(e) => updateDialect(i, "level", e.target.value)}
                    aria-label="Comfort level"
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  {form.dialects.length > 1 && (
                    <button
                      type="button"
                      className="row-remove"
                      onClick={() => removeDialect(i)}
                      aria-label="Remove this dialect"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <datalist id="dialect-options">
              {DIALECT_SUGGESTIONS.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
            <button type="button" className="add-dialect" onClick={addDialect}>
              + Add another dialect
            </button>
          </div>

          <label className="fld">
            <span>Languages you speak</span>
            <input
              type="text"
              value={form.languages}
              onChange={(e) => update("languages", e.target.value)}
              placeholder="Tibetan · English · Hindi"
            />
          </label>

          <label className="fld">
            <span>Tell learners about yourself *</span>
            <textarea
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={4}
              placeholder="Former TCV teacher, 11 years in the classroom. Gentle with heritage speakers — I'll wait out your silence and hand you the word you're reaching for."
            />
          </label>

          <label className="fld">
            <span>Link to a 30-second intro (optional)</span>
            <input
              type="text"
              value={form.intro}
              onChange={(e) => update("intro", e.target.value)}
              placeholder="A short voice or video clip — YouTube, Drive, anywhere"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="teach-actions">
            <button className="btn btn-oxblood" onClick={submit}>
              Submit application
            </button>
            <button className="btn btn-quiet" onClick={() => router.push("/")}>
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
