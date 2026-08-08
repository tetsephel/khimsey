import { Tutor } from "@/types/tutor";

export function TutorCard({
  tutor,
  onOpenIntro,
  onBook,
}: {
  tutor: Tutor;
  onOpenIntro: () => void;
  onBook: () => void;
}) {
  return (
    <div className="tutor">
      <div className="top">
        <div className="avatar" style={{ background: tutor.color }}>
          {tutor.initial}
        </div>
        <div className="who">
          <h3>
            {tutor.name} <span className="tibname">{tutor.tib}</span>
          </h3>
          <div className="loc">{tutor.loc}</div>
        </div>
      </div>
      <div className="meta">
        <span className="tag dialect">{tutor.dialect}</span>
        <span className="tag plain">{tutor.speaks}</span>
      </div>
      <p className="bio">{tutor.bio}</p>
      <button className="video-chip" onClick={onOpenIntro}>
        ▶ 30-sec intro, in their voice
      </button>
      <div className="row">
        <div className="stars">
          <b>★ {tutor.rating}</b> · {tutor.lessons} lessons
        </div>
        <span className="tag plain">60-min conversation</span>
      </div>
      <button
        className="btn btn-oxblood"
        style={{ justifyContent: "center" }}
        onClick={onBook}
      >
        Book {tutor.name.split(" ")[0]}
      </button>
    </div>
  );
}
