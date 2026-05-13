import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { VICES, type ViceKey } from "@/lib/vices";

export const Route = createFileRoute("/boards")({
  head: () => ({ meta: [{ title: "Devilmaxxx — High Scores" }] }),
  component: BoardsPage,
});

type Row = {
  rank: number;
  name: string;
  handle: string;
  vice: ViceKey;
  level: number;
  streak: number;
  score: number;
};

const WEEKLY: Row[] = [
  { rank: 1, name: "MONA VICE",   handle: "monavice", vice: "gambling", level: 7, streak: 89,  score: 18_440 },
  { rank: 2, name: "TOBIAS LIT",  handle: "toby",     vice: "drinking", level: 6, streak: 156, score: 16_220 },
  { rank: 3, name: "LARA LIES",   handle: "laralies", vice: "lying",    level: 8, streak: 301, score: 14_990 },
  { rank: 4, name: "MEAN MIRA",   handle: "mira",     vice: "bully",    level: 5, streak: 62,  score: 13_810 },
  { rank: 5, name: "SIR JEST",    handle: "sirjester",vice: "jester",   level: 6, streak: 47,  score: 12_750 },
  { rank: 6, name: "CLEO SMOKES", handle: "cleo",     vice: "smoking",  level: 7, streak: 248, score: 11_410 },
  { rank: 7, name: "COUCH CARL",  handle: "carl",     vice: "lazy",     level: 4, streak: 188, score: 10_050 },
  { rank: 8, name: "BIG HANK",    handle: "hank",     vice: "gluttony", level: 3, streak: 77,  score: 9_220 },
  { rank: 9, name: "EZRA GOON",   handle: "ezzy",     vice: "gooning",  level: 2, streak: 23,  score: 6_400 },
  { rank: 10, name: "PIG PETE",   handle: "pete",     vice: "pigmaxxing", level: 1, streak: 12, score: 4_120 },
];

const ALLTIME: Row[] = [
  { rank: 1, name: "LARA LIES",   handle: "laralies", vice: "lying",    level: 9, streak: 412, score: 998_700 },
  { rank: 2, name: "CLEO SMOKES", handle: "cleo",     vice: "smoking",  level: 8, streak: 301, score: 812_400 },
  { rank: 3, name: "TOBIAS LIT",  handle: "toby",     vice: "drinking", level: 7, streak: 248, score: 644_900 },
  { rank: 4, name: "MONA VICE",   handle: "monavice", vice: "gambling", level: 7, streak: 156, score: 521_300 },
  { rank: 5, name: "BIG HANK",    handle: "hank",     vice: "gluttony", level: 6, streak: 89,  score: 412_050 },
  { rank: 6, name: "SIR JEST",    handle: "sirjester",vice: "jester",   level: 6, streak: 77,  score: 388_900 },
  { rank: 7, name: "EZRA GOON",   handle: "ezzy",     vice: "gooning",  level: 4, streak: 23,  score: 192_400 },
  { rank: 8, name: "PIG PETE",    handle: "pete",     vice: "pigmaxxing", level: 3, streak: 12, score: 91_200 },
];

function rankColor(r: number) {
  if (r === 1) return "#FFD27A";
  if (r === 2) return "#E0E0E0";
  if (r === 3) return "#CD7F32";
  return "rgba(255,255,255,0.5)";
}

// Returns ms until next Monday 00:00 local
function msToNextMonday(): number {
  const now = new Date();
  const day = now.getDay(); // 0 Sun .. 6 Sat
  const daysUntil = (8 - day) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  next.setHours(0, 0, 0, 0);
  return next.getTime() - now.getTime();
}

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { d, h, m, s: sec };
}

function Countdown() {
  const [ms, setMs] = useState(msToNextMonday());
  useEffect(() => {
    const id = setInterval(() => setMs(msToNextMonday()), 1000);
    return () => clearInterval(id);
  }, []);
  const { d, h, m, s } = fmt(ms);
  const cells = [
    { v: d, l: "DAYS" },
    { v: h, l: "HRS" },
    { v: m, l: "MIN" },
    { v: s, l: "SEC" },
  ];
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "linear-gradient(180deg, rgba(139,0,0,0.35), rgba(255,69,0,0.12))",
        boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35), 0 0 24px -10px var(--ember)",
      }}
    >
      <p className="font-display text-[12px] tracking-[0.3em] uppercase text-ember text-center">
        Weekly reset in
      </p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {cells.map((c) => (
          <div
            key={c.l}
            className="rounded-xl py-2 text-center"
            style={{ background: "rgba(0,0,0,0.45)", boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.25)" }}
          >
            <div
              className="font-mono text-[26px] leading-none text-white"
              style={{ textShadow: "0 0 10px var(--ember)" }}
            >
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="font-display text-[10px] tracking-[0.2em] uppercase text-white/55 mt-1">
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderTable({ rows, title, subtitle }: { rows: Row[]; title: string; subtitle: string }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h3 className="font-display text-[20px] tracking-[0.18em] uppercase">{title}</h3>
        <span className="font-mono text-[12px] tracking-widest text-white/40 uppercase">{subtitle}</span>
      </div>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(20,8,8,0.95), rgba(10,4,4,0.95))",
          boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.2)",
        }}
      >
        <ul className="divide-y divide-white/5">
          {rows.map((r) => {
            const v = VICES[r.vice];
            const isYou = r.handle === "sirjester";
            const rowInner = (
              <>
                <span
                  className="font-mono text-[20px] leading-none text-center"
                  style={{
                    color: isYou ? "#FFD27A" : rankColor(r.rank),
                    textShadow: r.rank <= 3 ? `0 0 10px ${rankColor(r.rank)}` : undefined,
                  }}
                >
                  {String(r.rank).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{v.emoji}</span>
                    <span
                      className="font-display text-[15px] tracking-[0.08em] uppercase truncate"
                      style={{ color: isYou ? "#FF8A5C" : "white" }}
                    >
                      {r.name}
                    </span>
                    {isYou && <span className="font-mono text-[10px] text-ember tracking-widest">‹YOU›</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-white/40 mt-0.5">
                    <span className="font-display tracking-widest uppercase" style={{ color: v.color }}>
                      {v.name}
                    </span>
                    <span className="font-mono">· LV{r.level} · {r.streak}d</span>
                  </div>
                </div>
                <span
                  className="font-mono text-[18px] text-right tracking-wider"
                  style={{ color: isYou ? "#FF8A5C" : "var(--ember)" }}
                >
                  {r.score.toLocaleString()}
                </span>
              </>
            );

            const rowStyle = {
              background: isYou
                ? "linear-gradient(90deg, rgba(255,69,0,0.18), rgba(139,0,0,0.18))"
                : undefined,
              boxShadow: isYou ? "inset 0 0 0 1.5px rgba(255,69,0,0.6)" : undefined,
            } as const;

            return (
              <li key={r.handle}>
                {isYou ? (
                  <Link
                    to="/profile"
                    className="grid grid-cols-[36px_1fr_90px] gap-2 items-center px-3 py-3 transition active:bg-white/5"
                    style={rowStyle}
                  >
                    {rowInner}
                  </Link>
                ) : (
                  <Link
                    to="/u/$handle"
                    params={{ handle: r.handle }}
                    className="grid grid-cols-[36px_1fr_90px] gap-2 items-center px-3 py-3 transition hover:bg-white/[0.03] active:bg-white/5"
                    style={rowStyle}
                  >
                    {rowInner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function BoardsPage() {
  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-3 text-center">
        <p className="font-display text-[14px] tracking-[0.4em] text-ember">★ ARCADE OF SIN ★</p>
        <h1 className="font-display text-[40px] leading-none tracking-[0.06em] uppercase mt-2">
          High Scores
        </h1>
      </header>

      <section className="px-5">
        <Countdown />
      </section>

      <section className="px-5 mt-6 space-y-6">
        <LeaderTable rows={WEEKLY} title="This Week" subtitle="resets monday" />
        <LeaderTable rows={ALLTIME} title="All Time" subtitle="hall of shame" />
      </section>

      <p className="mt-6 px-5 text-center text-[13px] italic text-white/35">
        "Climb the ladder. Lose the moral high ground."
      </p>
    </MobileShell>
  );
}
