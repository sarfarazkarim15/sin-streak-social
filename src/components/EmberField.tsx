import { useMemo } from "react";

type Props = { count?: number; className?: string };

// Ember particles drifting up. Pure CSS keyframes, randomized inline.
export function EmberField({ count = 22, className = "" }: Props) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 1 + Math.random() * 3;
        const dur = 6 + Math.random() * 9;
        const delay = -Math.random() * dur;
        const drift = (Math.random() - 0.5) * 60;
        const hue = Math.random() < 0.4 ? "#FFD27A" : "#FF4500";
        return { i, left, size, dur, delay, drift, hue };
      }),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {embers.map((e) => (
        <span
          key={e.i}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: e.hue,
            boxShadow: `0 0 ${4 + e.size * 2}px ${e.hue}`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
            // @ts-expect-error custom prop
            "--drift": `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
