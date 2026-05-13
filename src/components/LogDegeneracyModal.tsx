import { useEffect, useState } from "react";
import { VICES, type ViceKey } from "@/lib/vices";
import { useAppState } from "@/lib/appState";
import { X, Plus, Check } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onLogged?: (vice: ViceKey) => void;
};

const ALL_VICE_KEYS = Object.keys(VICES) as ViceKey[];

export function LogDegeneracyModal({ open, onClose, onLogged }: Props) {
  const { logVice } = useAppState();
  const [selected, setSelected] = useState<ViceKey | null>(null);
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"pick" | "confirm">("pick");

  // Reset when opening
  useEffect(() => {
    if (open) {
      setSelected(null);
      setNote("");
      setStep("pick");
    }
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!selected) return;
    logVice(selected, note);
    onLogged?.(selected);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pop-in"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl"
        style={{
          background: "linear-gradient(180deg, #1A0808, #0A0404)",
          boxShadow: "0 -8px 60px -10px rgba(255,69,0,0.5), inset 0 0 0 1px rgba(255,69,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile aesthetic) */}
        <div className="sm:hidden flex justify-center pt-3">
          <div className="h-1 w-12 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <header className="px-5 pt-4 pb-3 flex items-center justify-between">
          <div>
            <p className="font-display text-[12px] tracking-[0.32em] text-ember">CONFESS</p>
            <h2 className="font-display text-[28px] leading-none tracking-[0.04em] uppercase mt-1">
              {step === "pick" ? "Pick your sin" : "Make it official"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10"
            aria-label="Close"
          >
            <X size={16} className="text-white/80" />
          </button>
        </header>

        {/* Body */}
        {step === "pick" && (
          <div className="px-5 pb-5 overflow-y-auto">
            <p className="text-[12px] text-white/45 mb-3">
              Tap one. There is no wrong answer. There is only the answer.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {ALL_VICE_KEYS.map((key) => {
                const v = VICES[key];
                const isSelected = selected === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className="relative rounded-2xl py-3 px-2 flex flex-col items-center gap-1.5 transition-transform active:scale-95"
                    style={{
                      background: isSelected
                        ? `linear-gradient(180deg, ${v.color}33, ${v.color}11)`
                        : "rgba(255,255,255,0.03)",
                      boxShadow: isSelected
                        ? `inset 0 0 0 2px ${v.color}, 0 0 18px -6px ${v.color}`
                        : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    <span className="text-[26px] leading-none">{v.emoji}</span>
                    <span
                      className="font-display text-[10px] tracking-[0.12em] uppercase text-center leading-tight"
                      style={{ color: isSelected ? v.color : "rgba(255,255,255,0.7)" }}
                    >
                      {v.name}
                    </span>
                    {isSelected && (
                      <span
                        className="absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full"
                        style={{ background: v.color }}
                      >
                        <Check size={11} className="text-black" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              disabled={!selected}
              onClick={() => setStep("confirm")}
              className="mt-4 w-full rounded-2xl py-3.5 font-display text-[17px] tracking-[0.22em] uppercase transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: selected
                  ? "linear-gradient(180deg, #FF5A1F, #B0270B)"
                  : "rgba(255,255,255,0.05)",
                color: "white",
                boxShadow: selected ? "0 0 18px -4px var(--ember)" : "inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              Continue
            </button>
          </div>
        )}

        {step === "confirm" && selected && (
          <div className="px-5 pb-5 overflow-y-auto">
            <div
              className="rounded-2xl p-4 flex items-center gap-3 mb-4"
              style={{
                background: `linear-gradient(180deg, ${VICES[selected].color}22, ${VICES[selected].color}08)`,
                boxShadow: `inset 0 0 0 1px ${VICES[selected].color}66`,
              }}
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl text-3xl shrink-0"
                style={{
                  background: `${VICES[selected].color}22`,
                  boxShadow: `inset 0 0 0 1px ${VICES[selected].color}77`,
                }}
              >
                {VICES[selected].emoji}
              </div>
              <div className="min-w-0">
                <p className="font-display text-[20px] tracking-[0.08em] uppercase leading-tight">
                  {VICES[selected].name}
                </p>
                <p className="text-[12px] text-white/55 mt-0.5">
                  +25 XP · +15 coins
                </p>
              </div>
            </div>

            <label className="block">
              <span className="font-display text-[11px] tracking-[0.22em] uppercase text-white/55">
                Optional note
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 140))}
                placeholder="explain yourself. or don't."
                rows={3}
                className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 p-3 text-[14px] text-white/85 placeholder:text-white/30 focus:outline-none focus:border-ember/50"
              />
              <span className="text-[10px] text-white/30 block text-right mt-1 font-mono">
                {note.length}/140
              </span>
            </label>

            <div className="grid grid-cols-[1fr_2fr] gap-2 mt-4">
              <button
                onClick={() => setStep("pick")}
                className="rounded-2xl py-3.5 font-display text-[14px] tracking-[0.22em] uppercase text-white/70"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-2xl py-3.5 font-display text-[16px] tracking-[0.22em] uppercase text-white inline-flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(180deg, #FF5A1F, #B0270B)",
                  boxShadow: "0 0 18px -4px var(--ember)",
                }}
              >
                <Plus size={16} strokeWidth={3} /> Confess
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
