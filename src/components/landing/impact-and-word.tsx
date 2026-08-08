import { WORD_OF_DAY } from "@/data/phrases";

export function ImpactStrip() {
  return (
    <div className="section wrap" style={{ paddingTop: 0 }}>
      <div className="impact">
        <div className="side">
          <b>Understand</b>
          <span>
            Where most of the diaspora generation is — following every word
            at the dinner table, answering in English.
          </span>
        </div>
        <svg
          className="wind"
          width="90"
          height="40"
          viewBox="0 0 90 40"
          aria-hidden="true"
        >
          <path
            d="M4 20 C 26 4, 48 36, 70 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M62 10 L 74 17 L 63 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="side right">
          <b>Speak</b>
          <span>
            Where one live conversation a week takes you — and the only place
            a language actually lives.
          </span>
        </div>
        <div className="foot">
          A language doesn&apos;t die when it stops being written. It dies
          when it stops being spoken. <b>Khimzey keeps Tibetan spoken.</b>
        </div>
      </div>
    </div>
  );
}

export function WordOfDay() {
  return (
    <div className="section wrap" style={{ paddingTop: 0 }}>
      <span className="eyebrow">Word of the day</span>
      <div className="wotd">
        <div className="big">{WORD_OF_DAY.big}</div>
        <div>
          <h3>{WORD_OF_DAY.title}</h3>
          <div className="rom">{WORD_OF_DAY.rom}</div>
          <p>{WORD_OF_DAY.body}</p>
        </div>
      </div>
    </div>
  );
}
