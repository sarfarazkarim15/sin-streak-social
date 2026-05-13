type Props = {
  progress: number; // 0..1
  color?: string;
  height?: number;
  label?: string;
  value?: string;
  glow?: boolean;
  segmented?: boolean;
};

export function FlameBar({
  progress,
  color = "var(--ember)",
  height = 14,
  label,
  value,
  glow = true,
  segmented = false,
}: Props) {
  const pct = Math.min(Math.max(progress, 0), 1) * 100;
  return (
    <div className="w-full">
      {(label || value) && (
        <div className="mb-1.5 flex items-baseline justify-between">
          {label && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/55 font-display font-bold">
              {label}
            </span>
          )}
          {value && (
            <span className="font-mono text-[12px] tracking-wider text-white/80">{value}</span>
          )}
        </div>
      )}
      <div
        className="relative w-full overflow-hidden rounded-full"
        style={{
          height,
          background: "rgba(255,255,255,0.05)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="relative h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color} 0%, var(--glow) 70%, #FFD27A 100%)`,
            boxShadow: glow ? `0 0 14px ${color}, 0 0 4px var(--glow)` : undefined,
          }}
        >
          <div className="absolute inset-0 rounded-full opacity-50 mix-blend-overlay flame-flicker" />
        </div>
        {segmented && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 9.5%, rgba(0,0,0,0.55) 9.5% 10%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
