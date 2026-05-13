import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { FlameBar } from "@/components/FlameBar";
import { LevelBadge, levelTitle } from "@/components/LevelBadge";
import { VICES } from "@/lib/vices";
import { getFriend } from "@/lib/friends";
import { ArrowLeft, UserPlus, UserCheck, Flame } from "lucide-react";

export const Route = createFileRoute("/u/$handle")({
  head: ({ params }) => ({
    meta: [{ title: `Devilmaxxx — @${params.handle}` }],
  }),
  component: UserProfilePage,
  notFoundComponent: () => (
    <MobileShell>
      <div className="px-5 pt-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-3xl mb-3"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.35), rgba(139,0,0,0.2))",
            boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35)",
          }}>
          👻
        </div>
        <h2 className="font-display text-[24px] tracking-[0.08em] uppercase">User not found</h2>
        <p className="text-[13px] text-white/55 mt-2">
          They might have been so sinful they vanished.
        </p>
        <Link
          to="/boards"
          className="inline-flex items-center gap-2 mt-5 rounded-2xl px-5 py-3 font-display text-[13px] tracking-[0.22em] uppercase text-white"
          style={{
            background: "linear-gradient(180deg, #FF5A1F, #B0270B)",
            boxShadow: "0 0 18px -4px var(--ember)",
          }}
        >
          <ArrowLeft size={14} /> Back to boards
        </Link>
      </div>
    </MobileShell>
  ),
  loader: ({ params }) => {
    const friend = getFriend(params.handle);
    if (!friend) throw notFound();
    return friend;
  },
});

function UserProfilePage() {
  const friend = Route.useLoaderData();
  const primary = VICES[friend.primaryVice];

  return (
    <MobileShell>
      {/* Header with back button */}
      <header className="px-5 pt-12 pb-2 flex items-center gap-3">
        <Link
          to="/boards"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10"
          aria-label="Back"
        >
          <ArrowLeft size={16} className="text-white/80" />
        </Link>
        <p className="font-display text-[14px] tracking-[0.32em] text-white/55">PROFILE</p>
      </header>

      {/* Hero card */}
      <section className="px-5 mt-2">
        <div
          className="rounded-3xl p-5"
          style={{
            background: `linear-gradient(180deg, ${primary.color}26, rgba(15,6,6,0.95))`,
            boxShadow: `inset 0 0 0 1px ${primary.color}55, 0 0 32px -10px ${primary.color}`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full font-display text-[36px]"
              style={{
                background: friend.avatarBg,
                color: "#FFD9C9",
                boxShadow: `0 0 24px -4px ${primary.color}, inset 0 0 0 2px ${primary.color}88`,
              }}
            >
              {friend.initial}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[28px] leading-none tracking-[0.04em] uppercase">
                {friend.name}
              </h1>
              <p className="font-mono text-[13px] text-white/55 mt-1">
                @{friend.handle} · joined {friend.joined}
              </p>
              <div className="mt-2">
                <LevelBadge level={friend.level} color={primary.color} />
              </div>
            </div>
          </div>

          {friend.bio && (
            <p className="mt-4 text-[14px] italic text-white/65 leading-snug">
              "{friend.bio}"
            </p>
          )}

          <div className="mt-4">
            <FlameBar
              progress={friend.xpPct}
              color={primary.color}
              label={`${levelTitle(friend.level)} → ${levelTitle(friend.level + 1)}`}
              value={`${Math.round(friend.xpPct * 100)} / 100 XP`}
              segmented
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              disabled
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl py-2.5 font-display text-[12px] tracking-[0.22em] uppercase"
              style={{
                background: friend.isFriend ? "rgba(46,204,113,0.15)" : "rgba(255,255,255,0.06)",
                color: friend.isFriend ? "#2ECC71" : "white",
                boxShadow: friend.isFriend
                  ? "inset 0 0 0 1px rgba(46,204,113,0.4)"
                  : "inset 0 0 0 1px rgba(255,255,255,0.12)",
              }}
            >
              {friend.isFriend ? <UserCheck size={13} /> : <UserPlus size={13} />}
              {friend.isFriend ? "Friends" : "Add friend"}
            </button>
            <button
              disabled
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl py-2.5 font-display text-[12px] tracking-[0.22em] uppercase text-white"
              style={{
                background: "rgba(255,69,0,0.12)",
                boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.4)",
                color: "var(--ember)",
              }}
            >
              <Flame size={13} /> Nudge
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-5 px-5">
        <div className="card-surface grid grid-cols-3 rounded-2xl divide-x divide-white/5">
          {[
            { k: "Total Logs", v: friend.totalLogs.toLocaleString() },
            { k: "Longest Streak", v: friend.longestStreak.toString() },
            { k: "Active Vices", v: friend.vices.length.toString() },
          ].map((s) => (
            <div key={s.k} className="px-3 py-4 text-center">
              <div className="font-mono text-[24px] leading-none text-white">{s.v}</div>
              <div className="font-display text-[10px] tracking-[0.22em] uppercase text-white/45 mt-2">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vices */}
      <section className="mt-7 px-5">
        <h3 className="font-display text-[22px] tracking-[0.18em] uppercase mb-3">Their Vices</h3>
        <div className="grid grid-cols-2 gap-3">
          {friend.vices.map((stat) => {
            const v = VICES[stat.vice];
            return (
              <div
                key={stat.vice}
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
                  <span className="font-mono text-[22px] leading-none" style={{ color: v.color }}>
                    {stat.count}
                  </span>
                </div>
                <p className="mt-2 font-sans text-[13px] text-white/85">{v.name}</p>
                <p className="mt-1 font-mono text-[11px] text-white/45">
                  {stat.streak}d streak
                </p>
                <p className="mt-1 font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: v.color }}>
                  {stat.tier}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Awards */}
      {friend.awards.length > 0 && (
        <section className="mt-7">
          <div className="px-5 mb-3">
            <h3 className="font-display text-[22px] tracking-[0.18em] uppercase">Awards</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pl-5 pr-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {friend.awards.map((a) => (
              <div key={a.name} className="card-surface min-w-[140px] rounded-2xl p-4 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full text-2xl"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.4), rgba(139,0,0,0.2))",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 16px -6px var(--ember)"
                  }}>
                  {a.emoji}
                </div>
                <p className="mt-3 font-display text-[13px] tracking-[0.08em] uppercase leading-tight">
                  {a.name}
                </p>
                <p className="font-mono text-[12px] text-ember mt-1 tracking-widest">{a.tier}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent activity */}
      {friend.activity.length > 0 && (
        <section className="mt-7 px-5">
          <h3 className="font-display text-[22px] tracking-[0.18em] uppercase mb-3">Recent Activity</h3>
          <ul className="space-y-2">
            {friend.activity.map((a, i) => {
              const v = VICES[a.vice];
              return (
                <li key={i} className="card-surface rounded-2xl p-3 flex items-start gap-3">
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
                    style={{ background: `${v.color}22`, boxShadow: `inset 0 0 0 1px ${v.color}55` }}
                  >
                    {v.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p
                        className="font-display text-[14px] tracking-[0.1em] uppercase"
                        style={{ color: v.color }}
                      >
                        {v.name}
                      </p>
                      <p className="font-mono text-[12px] text-white/40 shrink-0">{a.when}</p>
                    </div>
                    {a.note && (
                      <p className="text-[12px] italic text-white/60 mt-0.5 leading-snug">
                        "{a.note}"
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <p className="mt-8 px-5 text-center text-[12px] italic text-white/35">
        "Every saint has a past. Every sinner has a profile."
      </p>
    </MobileShell>
  );
}
