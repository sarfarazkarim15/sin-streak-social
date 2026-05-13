import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { FlameBar } from "@/components/FlameBar";
import { LevelBadge, levelTitle } from "@/components/LevelBadge";
import { Devil } from "@/components/Devil";
import { VICES, type ViceKey } from "@/lib/vices";
import { useAppState } from "@/lib/appState";
import { SKINS, getItem } from "@/lib/shopItems";
import { Settings, Store, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Devilmaxxx — Profile" }] }),
  component: ProfilePage,
});

const AWARDS = [
  { name: "Surgeon General's Nightmare", emoji: "🫁", tier: "Gold" },
  { name: "House Always Wins (You)",     emoji: "🎰", tier: "Silver" },
  { name: "Pathological Liar",            emoji: "🤥", tier: "Platinum" },
  { name: "Iron Liver",                   emoji: "🍷", tier: "Bronze" },
  { name: "365 Club",                     emoji: "🔥", tier: "Gold" },
  { name: "Confession Booth",             emoji: "⛪", tier: "Silver" },
];

const ACTIVITY: { vice: ViceKey; when: string; note?: string }[] = [
  { vice: "gambling",  when: "22m ago", note: "slot pulled. soul too." },
  { vice: "lying",     when: "Today, 9:14 AM", note: "told boss the wifi was out." },
  { vice: "drinking",  when: "Yesterday", note: "tuesday espresso martini. unprovoked." },
  { vice: "gluttony",  when: "Yesterday" },
  { vice: "bully",     when: "Mon", note: "roasted gary in standup again." },
  { vice: "lazy",      when: "Sun" },
];

function ProfilePage() {
  const { equipped, ownedItems, reset } = useAppState();
  const level = 7;
  const xp = 0.62;
  const skinName = SKINS.find((s) => s.id === equipped.skin)?.name ?? "Classic Devil";
  const nameFx = equipped.nameFx;
  const nameClass =
    nameFx === "ember-text" ? "name-ember" :
    nameFx === "shimmer" ? "name-shimmer" :
    nameFx === "glitch" ? "name-glitch" : "";

  // Pick a backdrop wrapper class based on equipped bg
  const bgClass =
    equipped.bg === "bg-smoke" ? "bg-smoke-fx" :
    equipped.bg === "bg-stars" ? "bg-stars-fx" :
    equipped.bg === "bg-ember" ? "bg-ember-fx" : "";

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-2 flex items-center justify-between">
        <p className="font-display text-[20px] tracking-[0.32em] text-white/85">PROFILE</p>
        <button className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/5">
          <Settings size={16} className="text-white/80" />
        </button>
      </header>

      {/* Devil + name */}
      <section className={`px-5 pt-4 ${bgClass}`}>
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <Devil intensity={0.85} size={120} skin={equipped.skin} flair={equipped.flair} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className={`font-display text-[34px] leading-none tracking-[0.04em] uppercase ${nameClass}`}>
              Yours Truly
            </h1>
            <p className="font-mono text-[14px] text-white/50 mt-1">@yourstruly · joined Mar 2025</p>
            <p className="font-display text-[12px] tracking-[0.2em] uppercase text-ember mt-2">
              {skinName}
            </p>
            <div className="mt-2"><LevelBadge level={level} /></div>
          </div>
        </div>
      </section>

      <section className="px-5 mt-4">
        <FlameBar
          progress={xp}
          label={`${levelTitle(level)} → ${levelTitle(level + 1)}`}
          value={`${Math.round(xp * 100)} / 100 XP`}
          segmented
        />
      </section>

      {/* Equipped slots summary */}
      <section className="mt-6 px-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-[18px] tracking-[0.18em] uppercase">Equipped</h3>
          <Link to="/shop" className="text-xs font-display tracking-widest uppercase text-ember inline-flex items-center gap-1">
            <Store size={12} /> Customize
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["skin", "flair", "bg", "nameFx"] as const).map((slot) => {
            const itemId = equipped[slot];
            const item = getItem(itemId ?? undefined);
            const label = ({ skin: "Skin", flair: "Flair", bg: "Backdrop", nameFx: "Name FX" } as const)[slot];
            return (
              <div
                key={slot}
                className="card-surface rounded-2xl px-3 py-3 flex items-center gap-2"
              >
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xl"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.3), rgba(139,0,0,0.15))",
                    boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.3)",
                  }}
                >
                  {item?.preview ?? "—"}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[10px] tracking-widest uppercase text-white/45">{label}</p>
                  <p className="text-[13px] truncate">{item?.name ?? "None"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-white/40">
          You own {ownedItems.length} {ownedItems.length === 1 ? "item" : "items"}.{" "}
          <Link to="/shop" className="text-ember underline">Browse shop</Link>
        </p>
      </section>

      <section className="mt-6 px-5">
        <div className="card-surface grid grid-cols-3 rounded-2xl divide-x divide-white/5">
          {[
            { k: "Total Logs", v: "1,284" },
            { k: "Longest Streak", v: "412" },
            { k: "Active Vices", v: "7" },
          ].map((s) => (
            <div key={s.k} className="px-3 py-4 text-center">
              <div className="font-mono text-[28px] leading-none text-white">{s.v}</div>
              <div className="font-display text-[11px] tracking-[0.22em] uppercase text-white/45 mt-2">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="px-5 mb-3">
          <h3 className="font-display text-[24px] tracking-[0.18em] uppercase">Awards Shelf</h3>
          <p className="text-xs italic text-white/45">Earned through diligent malpractice.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pl-5 pr-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {AWARDS.map((a) => (
            <div key={a.name} className="card-surface min-w-[150px] rounded-2xl p-4 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full text-3xl"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.4), rgba(139,0,0,0.2))",
                         boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 16px -6px var(--ember)" }}>
                {a.emoji}
              </div>
              <p className="mt-3 font-display text-[14px] tracking-[0.08em] uppercase leading-tight">{a.name}</p>
              <p className="font-mono text-[14px] text-ember mt-1 tracking-widest">{a.tier}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 px-5">
        <h3 className="font-display text-[24px] tracking-[0.18em] uppercase mb-3">Recent Activity</h3>
        <ul className="space-y-2">
          {ACTIVITY.map((a, i) => {
            const v = VICES[a.vice];
            return (
              <li key={i} className="card-surface rounded-2xl p-4 flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl"
                  style={{ background: `${v.color}22`, boxShadow: `inset 0 0 0 1px ${v.color}55` }}>
                  {v.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-display text-[16px] tracking-[0.1em] uppercase">{v.name}</p>
                    <p className="font-mono text-[14px] text-white/40 shrink-0">{a.when}</p>
                  </div>
                  {a.note && <p className="text-[13px] italic text-white/55 mt-0.5">"{a.note}"</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Dev/reset */}
      <section className="mt-8 px-5">
        <button
          onClick={() => {
            if (confirm("Reset all coins, purchases, and XP? This clears your local data.")) {
              reset();
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 font-display text-[12px] tracking-[0.22em] uppercase text-white/50"
          style={{ background: "rgba(255,255,255,0.04)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
        >
          <RotateCcw size={14} /> Reset local data
        </button>
      </section>
    </MobileShell>
  );
}
