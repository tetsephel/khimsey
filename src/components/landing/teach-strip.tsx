import Link from "next/link";

export function TeachStrip() {
  return (
    <div className="section wrap">
      <div className="teach-divider" />
      <div className="teach-strip">
        <div className="teach-strip-text">
          <span className="c-tib">དགེ་རྒན་</span>
          <h3>Fluent in Tibetan? Teach on Khimzey.</h3>
          <p>
            Every lesson you give keeps the language alive — and pays you for
            your time, from wherever you are in India, Nepal, or Bhutan.
          </p>
        </div>
        <Link href="/teach" className="btn btn-marigold">
          Apply to teach →
        </Link>
      </div>
    </div>
  );
}
