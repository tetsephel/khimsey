const STEPS = [
  {
    tib: "བོད་སྐད་",
    title: "Choose your language & level",
    body: "Tibetan today; Nepali and Hindi open next. Heritage speakers get their own track: “I understand, but I can't speak.”",
  },
  {
    tib: "སྐད་ཆ་",
    title: "Book a fluent tutor",
    body: "Teachers and native speakers in Tibetan communities across India and Nepal. Pick a dialect — Ü-Tsang, Amdo, or Kham — and a time that fits both sides of the planet.",
  },
  {
    tib: "ཐུགས་རྗེ་ཆེ།",
    title: "Talk, live on video",
    body: "Thirty to sixty minutes of real conversation with a phrasebook at your side. Stumble, laugh, repeat — that's how a language comes back.",
  },
];

export function HowItWorks() {
  return (
    <div className="section wrap" id="how">
      <span className="eyebrow">How Khimzey works</span>
      <h2>Three steps. One conversation.</h2>
      <p className="lead">
        No grammar drills, no flashcard streaks. Just a fluent speaker on a
        live video call, meeting you at your level — including the level
        nobody else builds for.
      </p>
      <div className="pecha-row">
        {STEPS.map((s) => (
          <div className="pecha" key={s.title}>
            <div className="p-tib">{s.tib}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
