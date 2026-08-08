import { Tutor } from "@/types/tutor";

function solidColor(t: Tutor) {
  const match = t.color.match(/#[0-9a-fA-F]{6}/);
  return match ? match[0] : "#7c2230";
}

export function PersonAvatar({
  tutor,
  wave = false,
}: {
  tutor: Tutor;
  wave?: boolean;
}) {
  const torso = solidColor(tutor);
  const skin = "#eab98f";

  return (
    <svg className="person" viewBox="0 0 200 190" aria-hidden="true">
      <path
        d="M40 190 C 40 148 70 130 100 130 C 130 130 160 148 160 190 Z"
        fill={torso}
      />
      <path
        d="M76 138 C 90 152 110 152 124 138 L 119 158 C 108 167 92 167 81 158 Z"
        fill="#f3ecdd"
        opacity=".92"
      />
      <g className="p-head">
        <circle cx="62" cy="92" r="9" fill={skin} />
        <circle cx="138" cy="92" r="9" fill={skin} />
        <circle cx="100" cy="88" r="40" fill={skin} />
        <path
          d="M60 84 C 60 50 140 50 140 84 C 140 68 126 58 100 58 C 74 58 60 68 60 84 Z"
          fill="#241f1a"
        />
        <path
          d="M78 77 q7 -5 14 0"
          stroke="#241f1a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M108 77 q7 -5 14 0"
          stroke="#241f1a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <circle className="p-eye" cx="85" cy="88" r="4.5" fill="#241f1a" />
        <circle className="p-eye" cx="115" cy="88" r="4.5" fill="#241f1a" />
        <circle cx="77" cy="101" r="5" fill="rgba(200,68,45,.22)" />
        <circle cx="123" cy="101" r="5" fill="rgba(200,68,45,.22)" />
        <ellipse className="p-mouth" cx="100" cy="111" rx="9" ry="6" fill="#5e1a25" />
      </g>
      {wave && (
        <g className="p-wave">
          <rect x="154" y="122" width="14" height="48" rx="7" fill={torso} />
          <circle cx="161" cy="117" r="10" fill={skin} />
        </g>
      )}
    </svg>
  );
}
