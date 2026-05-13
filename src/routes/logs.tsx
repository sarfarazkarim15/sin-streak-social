import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { LogDegeneracyModal } from "@/components/LogDegeneracyModal";
import { VICES } from "@/lib/vices";
import { FRIEND_LOGS, GLOBAL_LOGS, type LogEntry } from "@/lib/mockData";
import { useAppState, formatRelative } from "@/lib/appState";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/logs")({
  head: () => ({ meta: [{ title: "Devilmaxxx — Logs" }] }),
  component: LogsPage,
});

const TABS = [
  { key: "you", label: "You" },
  { key: "friends", label: "Friends" },
  { key: "global", label: "Global" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function LogsPage() {
  const { userLogs, deleteLog } = useAppState();
  const [tab, setTab] = useState<TabKey>("you");
  const [modalOpen, setModalOpen] = useState(false);

  const hasUserLogs = userLogs.length > 0;

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-2">
        <p className="font-display text-[20px] tracking-[0.32em] text-white/85">LOGS</p>
        <h1 className="font-display text-[40px] leading-none tracking-[0.04em] uppercase mt-2">
          Confession Roll
        </h1>
        <p className="font-sans text-[13px] text-white/45 mt-2">
          Every sin, time-stamped and unrepented.
        </p>
      </header>

      {/* Tabs */}
      <div className="px-5 mt-4">
        <div
          className="grid grid-cols-3 rounded-2xl p-1"
          style={{ background: "rgba(255,255,255,0.04)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="rounded-xl py-2 font-display text-[13px] tracking-[0.22em] uppercase transition"
                style={{
                  background: active ? "linear-gradient(180deg, #FF5A1F, #B0270B)" : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                  boxShadow: active ? "0 0 14px -4px var(--ember)" : undefined,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* You tab */}
      {tab === "you" && (
        <section className="px-5 mt-5">
          {!hasUserLogs ? (
            <div
              className="rounded-3xl p-7 text-center mt-4"
              style={{
                background: "linear-gradient(180deg, rgba(255,69,0,0.06), rgba(139,0,0,0.04))",
                boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.2)",
              }}
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-[34px] mb-3"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.35), rgba(139,0,0,0.2))",
                  boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35)",
                }}>
                😇
              </div>
              <h3 className="font-display text-[22px] tracking-[0.08em] uppercase">
                Nothing logged.
              </h3>
              <p className="font-display text-[14px] tracking-[0.15em] uppercase text-ember mt-1">
                Suspicious.
              </p>
              <p className="text-[13px] text-white/55 mt-3 max-w-xs mx-auto">
                Your confessional is empty. Tap below to add your first sin — it'll show up here.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-display text-[15px] tracking-[0.22em] uppercase text-white"
                style={{
                  background: "linear-gradient(180deg, #FF5A1F, #B0270B)",
                  boxShadow: "0 0 18px -4px var(--ember)",
                }}
              >
                <Plus size={16} strokeWidth={3} /> Log a degeneracy
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[12px] text-white/45 tracking-widest uppercase">
                  {userLogs.length} {userLogs.length === 1 ? "sin" : "sins"} logged
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[11px] tracking-[0.22em] uppercase text-white"
                  style={{
                    background: "linear-gradient(180deg, #FF5A1F, #B0270B)",
                    boxShadow: "0 0 12px -2px var(--ember)",
                  }}
                >
                  <Plus size={12} strokeWidth={3} /> Add
                </button>
              </div>

              <ul className="space-y-3">
                {userLogs.map((log) => {
                  const v = VICES[log.vice];
                  return (
                    <li
                      key={log.id}
                      className="rounded-2xl p-4 flex items-start gap-3"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,69,0,0.07), rgba(255,69,0,0.02))",
                        boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.3)",
                      }}
                    >
                      <div
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-2xl"
                        style={{ background: `${v.color}22`, boxShadow: `inset 0 0 0 1px ${v.color}55` }}
                      >
                        {v.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p
                            className="font-display text-[16px] tracking-[0.1em] uppercase truncate"
                            style={{ color: v.color }}
                          >
                            {v.name}
                          </p>
                          <p className="font-mono text-[12px] text-white/40 shrink-0">
                            {formatRelative(log.loggedAt)}
                          </p>
                        </div>
                        {log.note && (
                          <p className="mt-1 text-[13px] italic text-white/60 leading-snug">
                            "{log.note}"
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Delete this log?")) deleteLog(log.id);
                        }}
                        className="grid h-8 w-8 place-items-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/5 shrink-0"
                        aria-label="Delete log"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      )}

      {/* Friends and Global tabs use mock data so user can see what social feels like */}
      {(tab === "friends" || tab === "global") && (
        <section className="px-5 mt-5">
          <FeedList logs={tab === "friends" ? FRIEND_LOGS : GLOBAL_LOGS} />
        </section>
      )}

      <LogDegeneracyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </MobileShell>
  );
}

function FeedList({ logs }: { logs: LogEntry[] }) {
  if (logs.length === 0) {
    return <p className="text-center italic text-white/40 mt-10">"Nothing logged. Suspicious."</p>;
  }
  return (
    <ul className="space-y-3">
      {logs.map((log) => {
        const v = VICES[log.vice];
        return (
          <li
            key={log.id}
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <Link
              to="/u/$handle"
              params={{ handle: log.handle }}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[18px] transition-transform active:scale-95"
              style={{ background: log.avatarBg, color: "#FFD9C9" }}
            >
              {log.initial}
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <Link
                  to="/u/$handle"
                  params={{ handle: log.handle }}
                  className="font-display text-[16px] tracking-[0.08em] uppercase truncate hover:text-ember"
                >
                  {log.who}
                </Link>
                <p className="font-mono text-[13px] text-white/40 shrink-0">{log.when}</p>
              </div>
              <p className="font-mono text-[12px] text-white/35 mt-0.5">@{log.handle}</p>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1"
                style={{ background: `${v.color}22`, boxShadow: `inset 0 0 0 1px ${v.color}55` }}
              >
                <span className="text-base leading-none">{v.emoji}</span>
                <span className="font-display text-[12px] tracking-[0.18em] uppercase" style={{ color: v.color }}>
                  {v.name}
                </span>
              </div>

              {log.note && (
                <p className="mt-2 text-[13px] italic text-white/60 leading-snug">
                  "{log.note}"
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
