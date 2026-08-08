export function HeroGarland() {
  const flags = [
    { x: 40, y: 14, fill: "#3b6fb5" },
    { x: 150, y: 22, fill: "#f3f1e9" },
    { x: 260, y: 18, fill: "#c8442d" },
    { x: 370, y: 13, fill: "#3e7c4f" },
    { x: 480, y: 17, fill: "#e9c337" },
    { x: 590, y: 20, fill: "#3b6fb5" },
    { x: 700, y: 15, fill: "#f3f1e9" },
    { x: 810, y: 12, fill: "#c8442d" },
    { x: 920, y: 16, fill: "#3e7c4f" },
    { x: 1030, y: 14, fill: "#e9c337" },
  ];

  return (
    <div className="garland" aria-hidden="true" style={{ marginTop: 6 }}>
      <svg viewBox="0 0 1100 64" preserveAspectRatio="none">
        <path
          d="M0 10 Q 275 34 550 16 T 1100 12"
          fill="none"
          stroke="rgba(243,236,221,.35)"
          strokeWidth="1.5"
        />
        {flags.map((f, i) => (
          <g className="flag" key={i}>
            <rect x={f.x} y={f.y} width="42" height="30" rx="2" fill={f.fill} />
          </g>
        ))}
      </svg>
    </div>
  );
}
