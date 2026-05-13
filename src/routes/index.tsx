import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { FlameBar } from "@/components/FlameBar";
import { Devil } from "@/components/Devil";
import { LogDegeneracyModal } from "@/components/LogDegeneracyModal";
import { VICES, type ViceKey } from "@/lib/vices";
import { ME } from "@/lib/mockData";
import { useAppState, formatRelative } from "@/lib/appState";
import { Plus, Settings, Flame, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devilmaxxx — You" },
      { name: "description", content: "Track your vices. Share your sins." },
    ],
  }),
  component: YouPage,
});

type ViceTile = { vice: ViceKey; count: number; tier: string; progress: number };

const DEFAULT_TIERS: Record<ViceKey, string[]> = {
  drinking:   ["Sip Curious", "Barfly I", "Barfly II", "Barfly III", "Marlboro Maraschino"],
  smoking:    ["Curious", "Social Smoker", "Pack Rat", "Pack a Day", "Surgeon General's Nightmare"],
  gambling:   ["Spare Change", "Card Counter", "Degenerate", "Whale", "Casino's Problem"],
  lying:      ["Fibber I", "Fibber II", "Smooth Talker", "Storyteller", "Pathological"],
  cheating:   ["Wordle Cheat", "Card Counter", "Side Piece", "Two-Timer", "Cardinal Sin"],
  gluttony:   ["Snack Tactician", "Buffet Boss", "Charcuterie Demon", "Family Meal", "Buffet Royalty"],
  jealousy:   ["Side Eye", "Side Eye II", "Receipt Keeper", "Envy Engine", "Green Maximum"],
  pigmaxxing: ["Leg Day? Nah", "Skip Day", "Membership Hoarder", "Couch Athlete", "Pure Pigmaxx"],
  gooning:    ["Curious", "Marathoner", "PB Setter", "Lost Day", "No Comment"],
  jester:     ["Bit Curious", "Class Clown", "Open Mic", "SNL Reject", "Funeral Bit"],
  stealing:   ["Sticky Fingers", "Napkin Bandit", "Five Finger Discount", "Cat Burglar", "Robin Hood"],
  bully:      ["Mean Tweet", "Mean Streak", "Roast Master", "Receipts Holder", "Big Dog Energy"],
  lazy:       ["Snoozer", "Couch Surfer", "Sloth Maximus", "Doordash Diamond", "Couch Locked"],
};

function tierFor(count: number, vice: ViceKey): { tier: string; progress: number } {
  const tiers = DEFAULT_TIERS[vice];
  const idx = Math.min(Math.floor(count / 10), tiers.length - 1);
  const within = count % 10;
  return { tier: tiers[idx], progress: within / 10 };
}

function YouPage() {
  const { xp, equipped, coins, userLogs } = useAppState();
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [floatNum, setFloatNum] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogged = () => {
    setShake(true);
    setGlow(true);
    setFloatNum(25);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setGlow(false), 700);
    setTimeout(() => setFloatNum(null), 1200);
  };

  // Build dynamic vice tiles from real userLogs
  const myVices: ViceTile[] = useMemo(() => {
    const counts: Partial<Record<ViceKey, number>> = {};
    for (const log of userLogs) {
      counts[log.vice] = (counts[log.vice] ?? 0) + 1;
    }
    const tiles: ViceTile[] = (Object.entries(counts) as [ViceKey, number][])
      .map(([vice, count]) => {
        const { tier, progress } = tierFor(count, vice);
        return { vice, count, tier, progress };
      })
      .sort((a, b) => b.count - a.count);
    return tiles;
  }, [userLogs]);

  const displayXp = Math.min(xp, ME.xpMax);
  const xpPct = displayXp / ME.xpMax;
  const intensity = Math.min(1, xpPct + 0.3);
  const hasLogged = userLogs.length > 0;

  return (
    <MobileShell shake={shake}>
      {/* Header */}
      <header className="px-5 pt-12 pb-2 flex items-center justify-between">
        <p className="font-display text-[20px] tracking-[0.32em] text-white/85">DEVILMAXXX</p>
        <div className="flex items-center gap-2">
          <Link
            to="/shop"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-transform active:scale-95"
            style={{ background: "rgba(255,69,0,0.12)", boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35)" }}
          >
            <Flame size={14} className="text-ember" />
            <span className="font-mono text-[16px] text-ember leading-none">{coins}</span>
          </Link>
          <button className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/5">
            <Settings size={16} className="text-white/80" />
          </button>
        </div>
      </header>

      {/* Devil */}
      <section className="relative -mt-2">
        <Devil intensity={intensity} size={210} skin={equipped.skin} flair={equipped.flair} />
        {floatNum !== null && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-12 pointer-events-none pop-in font-display text-[32px] tracking-wider"
            style={{ color: "#FFD700", textShadow: "0 0 12px #FF4500, 0 0 24px #FF4500" }}
          >
            +{floatNum} XP
          </div>
        )}
      </section>

      {/* Level card */}
      <section className="px-5 -mt-4">
        <div
          className={`rounded-3xl p-5 ${glow ? "log-glow" : ""}`}
          style={{
            background: "linear-gradient(180deg, #1A0808, #0F0606)",
            boxShadow: "0 0 40px -10px rgba(255,69,0,0.4), inset 0 0 0 1px rgba(255,69,0,0.25)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-[34px] leading-none tracking-[0.04em] uppercase text-white">
                {ME.levelName}
              </h2>
              <p className="font-sans text-[13px] text-white/55 mt-1.5">
                Level {ME.level} degenerate
              </p>
            </div>
            <span
              className="font-display text-[14px] tracking-[0.18em] uppercase rounded-full px-3 py-1.5 leading-none"
              style={{
                background: "linear-gradient(180deg, #FF5A1F, #B0270B)",
                color: "white",
                boxShadow: "0 0 14px -2px var(--ember)",
              }}
            >
              LVL {ME.level}
            </span>
          </div>

          <div className="mt-4">
            <FlameBar progress={xpPct} segmented />
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-[14px] text-white/55">
                {displayXp} / {ME.xpMax} XP
              </span>
              <span className="font-display text-[12px] tracking-[0.2em] uppercase text-ember">
                {ME.nextLevelName} at {ME.xpMax}
              </span>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-ember btn-pulse mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display text-[20px] tracking-[0.22em] uppercase text-white"
          >
            <Plus size={18} strokeWidth={3} />
            Log a degeneracy
          </button>
        </div>
      </section>

      {/* Your vices grid — only if user has logged something */}
      {hasLogged && (
        <section className="mt-7 px-5">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="font-display text-[24px] tracking-[0.18em] uppercase">Your Vices</h3>
            <Link to="/logs" className="text-xs font-display tracking-widest uppercase text-ember">See all</Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {myVices.slice(0, 4).map((tile) => {
              const v = VICES[tile.vice];
              return (
                <div
                  key={tile.vice}
                  className="rounded-2xl p-4"
                  style={{
                    background: "linear-gradient(180deg, #14090A, #0E0606)",
                    boxShadow: `inset 0 0 0 1px ${v.color}33`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-xl text-xl"
                      style={{ background: `${v.color}22`, boxShadow: `inset 0 0 0 1px ${v.color}55` }}
                    >
                      {v.emoji}
                    </div>
                    <span className="font-mono text-[26px] leading-none" style={{ color: v.color }}>
                      {tile.count}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-[14px] text-white/85">{v.name}</p>
                  <div className="mt-2">
                    <FlameBar progress={tile.progress} color={v.color} height={6} glow={false} />
                  </div>
                  <p className="mt-2 font-display text-[11px] tracking-[0.2em] uppercase" style={{ color: v.color }}>
                    {tile.tier}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent activity — only if user has logged something */}
      {hasLogged ? (
        <section className="mt-7 px-5">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="font-display text-[24px] tracking-[0.18em] uppercase">Recent Sins</h3>
            <Link
              to="/logs"
              className="text-xs font-display tracking-widest uppercase text-ember inline-flex items-center gap-1"
            >
              All logs <ChevronRight size={12} />
            </Link>
          </div>
          <ul className="space-y-2">
            {userLogs.slice(0, 5).map((log) => {
              const v = VICES[log.vice];
              return (
                <li key={log.id} className="card-surface rounded-2xl p-3 flex items-start gap-3">
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                    style={{ background: `${v.color}22`, boxShadow: `inset 0 0 0 1px ${v.color}55` }}
                  >
                    {v.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p
                        className="font-display text-[15px] tracking-[0.1em] uppercase"
                        style={{ color: v.color }}
                      >
                        {v.name}
                      </p>
                      <p className="font-mono text-[13px] text-white/40 shrink-0">
                        {formatRelative(log.loggedAt)}
                      </p>
                    </div>
                    {log.note && (
                      <p className="text-[13px] italic text-white/60 mt-0.5 leading-snug">
                        "{log.note}"
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-center text-[13px] italic text-white/35">
            "Saint behavior is just unlogged sin."
          </p>
        </section>
      ) : (
        <section className="mt-7 px-5">
          <div
            className="rounded-3xl p-6 text-center"
            style={{
              background: "linear-gradient(180deg, rgba(255,69,0,0.06), rgba(139,0,0,0.04))",
              boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.2)",
            }}
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full text-3xl mb-3"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.35), rgba(139,0,0,0.2))",
                boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35)",
              }}>
              😈
            </div>
            <h3 className="font-display text-[20px] tracking-[0.08em] uppercase">
              Suspiciously clean
            </h3>
            <p className="text-[13px] text-white/55 mt-2 max-w-xs mx-auto">
              You haven't logged anything yet. Tap the button above to make your first confession.
            </p>
          </div>
        </section>
      )}

      <LogDegeneracyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogged={handleLogged}
      />
    </MobileShell>
  );
}
