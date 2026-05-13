type Props = {
  level: number;
  title?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
};

const TITLES = [
  "Initiate",        // 0
  "Sinner",          // 1
  "Trespasser",      // 2
  "Backslider",      // 3
  "Reprobate",       // 4
  "Degenerate",      // 5
  "Wretch",          // 6
  "Heathen",         // 7
  "Hellion",         // 8
  "Apostate",        // 9
  "Damned",          // 10+
];

export function levelTitle(level: number) {
  return TITLES[Math.min(level, TITLES.length - 1)];
}

export function LevelBadge({ level, title, size = "md", color = "var(--ember)" }: Props) {
  const t = title ?? levelTitle(level);
  const sizes = {
    sm: { wrap: "px-2 py-1 text-[10px]", num: "text-[14px] px-1.5" },
    md: { wrap: "px-2.5 py-1 text-[11px]", num: "text-[16px] px-2" },
    lg: { wrap: "px-3 py-1.5 text-[12px]", num: "text-[20px] px-2.5" },
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md font-display font-black uppercase tracking-[0.15em] ${sizes.wrap}`}
      style={{
        background: "rgba(0,0,0,0.45)",
        boxShadow: `inset 0 0 0 1px ${color}66, 0 0 12px -4px ${color}`,
        color: "white",
      }}
    >
      <span
        className={`font-mono font-bold leading-none rounded-sm ${sizes.num}`}
        style={{
          background: `linear-gradient(180deg, ${color}, #B0270B)`,
          color: "#0D0A0A",
          textShadow: "0 1px 0 rgba(255,255,255,0.4)",
          padding: "2px 6px",
        }}
      >
        LV{level}
      </span>
      <span style={{ color: "white" }}>{t}</span>
    </div>
  );
}
