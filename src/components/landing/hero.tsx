import Link from "next/link";
import { HeroGarland } from "./hero-garland";
import { PhraseTicker } from "./phrase-ticker";

export function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <nav className="nav">
          <Link className="logo" href="/">
            <span className="mark">Khimzey</span>
            <span className="mark-tib">བོད་སྐད་</span>
          </Link>
          <div className="links">
            <Link
              className="btn btn-quiet"
              style={{ color: "rgba(243,236,221,.7)" }}
              href="/profile"
            >
              My profile
            </Link>
            <Link
              className="btn btn-marigold"
              style={{ padding: "11px 22px", fontSize: 14 }}
              href="/start"
            >
              Find a tutor
            </Link>
          </div>
        </nav>

        <HeroGarland />

        <div className="glyph" aria-hidden="true">
          སྐད་
        </div>

        <div className="hero-inner">
          <div>
            <span className="eyebrow on-dark">
              Keeping Tibetan spoken · Nepali &amp; Hindi next
            </span>
            <h1>
              A language survives <em>out loud.</em>
            </h1>
            <p className="sub">
              Book live conversation lessons with fluent Tibetan speakers in
              Dharamshala, Kathmandu, and Bylakuppe. Every lesson passes the
              language on — one voice to another.
            </p>
            <div className="cta-row">
              <Link className="btn btn-marigold" href="/start">
                Start speaking →
              </Link>
              <a
                className="btn btn-quiet"
                style={{ color: "rgba(243,236,221,.7)" }}
                href="#how"
              >
                How it works
              </a>
            </div>
            <p className="flag-note">
              Prayer flags carry printed words on the wind. Khimzey carries
              spoken ones — across an ocean, one lesson at a time.
            </p>
          </div>

          <PhraseTicker />
        </div>
      </div>
      <svg
        className="ridge"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 L0 78 L140 44 L260 70 L400 22 L540 66 L690 10 L840 58 L980 30 L1130 68 L1280 40 L1440 74 L1440 120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
