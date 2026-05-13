import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Devil } from "@/components/Devil";
import { useAppState, type EquippedSlots } from "@/lib/appState";
import { SKINS, FLAIR, BACKDROPS, NAME_FX, type ShopItem } from "@/lib/shopItems";
import { Flame, Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Devilmaxxx — Shop" }] }),
  component: ShopPage,
});

const CATEGORY_TO_SLOT: Record<ShopItem["category"], keyof EquippedSlots> = {
  skin: "skin",
  flair: "flair",
  bg: "bg",
  viceIcon: "flair", // viceIcon not implemented as a slot yet
  nameFx: "nameFx",
};

function ActionButton({ item }: { item: ShopItem }) {
  const { coins, buy, equip, unequip, isOwned, isEquipped } = useAppState();
  const owned = isOwned(item.id);
  const equipped = isEquipped(item.id);
  const slot = CATEGORY_TO_SLOT[item.category];

  if (!owned) {
    return (
      <button
        onClick={() => buy(item.id, item.price)}
        disabled={coins < item.price}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-[12px] tracking-widest uppercase transition-transform active:scale-95"
        style={{
          background: "linear-gradient(180deg, #FF5A1F, #B0270B)",
          color: "white",
          boxShadow: "0 0 12px -2px var(--ember)",
        }}
      >
        <Flame size={12} /> {item.price === 0 ? "Claim free" : `Buy ${item.price}`}
      </button>
    );
  }

  if (equipped) {
    // Allow unequipping everything except the default skin
    const canUnequip = !(item.category === "skin" && item.id === "default");
    return (
      <button
        onClick={() => canUnequip && unequip(slot)}
        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-display text-[12px] tracking-widest uppercase"
        style={{
          background: canUnequip ? "rgba(46, 204, 113, 0.15)" : "rgba(255,255,255,0.05)",
          color: canUnequip ? "#2ECC71" : "rgba(255,255,255,0.6)",
          boxShadow: canUnequip ? "inset 0 0 0 1px rgba(46,204,113,0.4)" : "inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <Check size={12} /> {canUnequip ? "Equipped" : "Active"}
      </button>
    );
  }

  return (
    <button
      onClick={() => equip(slot, item.id)}
      className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-display text-[12px] tracking-widest uppercase transition-transform active:scale-95"
      style={{
        background: "rgba(255,255,255,0.06)",
        color: "white",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
      }}
    >
      <Sparkles size={12} /> Equip
    </button>
  );
}

function ItemCard({ item }: { item: ShopItem }) {
  const { isOwned, isEquipped } = useAppState();
  const owned = isOwned(item.id);
  const equipped = isEquipped(item.id);

  return (
    <div
      className="relative rounded-2xl p-4"
      style={{
        background: "linear-gradient(180deg, #14090A, #0E0606)",
        boxShadow: equipped
          ? "inset 0 0 0 2px rgba(46,204,113,0.55), 0 0 24px -10px rgba(46,204,113,0.5)"
          : item.hot
          ? "inset 0 0 0 1px rgba(255,69,0,0.45), 0 0 24px -10px var(--ember)"
          : "inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {item.hot && !equipped && (
        <span
          className="absolute -top-2 left-3 font-display text-[10px] tracking-[0.22em] uppercase rounded-full px-2 py-0.5"
          style={{ background: "linear-gradient(180deg, #FF5A1F, #B0270B)", color: "white" }}
        >
          HOT
        </span>
      )}
      {equipped && (
        <span
          className="absolute -top-2 left-3 font-display text-[10px] tracking-[0.22em] uppercase rounded-full px-2 py-0.5"
          style={{ background: "rgba(46, 204, 113, 0.95)", color: "#062a13" }}
        >
          ACTIVE
        </span>
      )}
      <div className="flex items-start gap-3">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,69,0,0.35), rgba(139,0,0,0.2))",
            boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35)",
          }}
        >
          {item.preview}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[16px] tracking-[0.08em] uppercase leading-tight">{item.name}</p>
          <p className="text-[12px] text-white/55 mt-1 leading-snug">{item.blurb}</p>
          <div className="mt-2 flex items-center gap-2">
            <ActionButton item={item} />
            {owned && !equipped && (
              <span className="font-display text-[10px] tracking-widest uppercase text-white/40">Owned</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, sub, items }: { title: string; sub: string; items: ShopItem[] }) {
  return (
    <section className="px-5 mt-7">
      <div className="mb-3">
        <h3 className="font-display text-[22px] tracking-[0.16em] uppercase">{title}</h3>
        <p className="text-[12px] italic text-white/45 mt-0.5">{sub}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {items.map((it) => <ItemCard key={it.id} item={it} />)}
      </div>
    </section>
  );
}

function ShopPage() {
  const { coins, equipped } = useAppState();
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <MobileShell>
      <header className="px-5 pt-12 pb-2 flex items-start justify-between">
        <div>
          <p className="font-display text-[20px] tracking-[0.32em] text-white/85">SHOP</p>
          <h1 className="font-display text-[36px] leading-none tracking-[0.04em] uppercase mt-2">
            Spend Your Sin
          </h1>
        </div>
        <div
          className="flex items-center gap-2 rounded-full px-3 py-2"
          style={{ background: "rgba(255,69,0,0.12)", boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.4)" }}
        >
          <Flame size={16} className="text-ember" />
          <span className="font-mono text-[20px] text-ember leading-none">{coins}</span>
        </div>
      </header>

      {/* Preview / current look */}
      <section className="px-5 mt-3">
        <div
          className="rounded-2xl p-4"
          style={{
            background: "linear-gradient(180deg, rgba(255,69,0,0.08), rgba(139,0,0,0.04))",
            boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.25)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <Devil intensity={0.8} size={92} skin={equipped.skin} flair={equipped.flair} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[14px] tracking-[0.22em] uppercase text-white/55">
                Your devil
              </p>
              <p className="font-display text-[20px] tracking-[0.08em] uppercase mt-1 leading-tight">
                {SKINS.find((s) => s.id === equipped.skin)?.name ?? "Classic Devil"}
              </p>
              <p className="text-[11px] text-white/45 mt-1">
                Tap equip below to change appearance.
              </p>
              <button
                onClick={() => setPreviewOpen((o) => !o)}
                className="mt-2 font-display text-[11px] tracking-widest uppercase text-ember"
              >
                {previewOpen ? "Hide preview" : "Big preview"}
              </button>
            </div>
          </div>

          {previewOpen && (
            <div className="mt-4 grid place-items-center pop-in">
              <Devil intensity={0.9} size={200} skin={equipped.skin} flair={equipped.flair} />
            </div>
          )}
        </div>
      </section>

      <section className="px-5 mt-3">
        <div
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.03)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
        >
          <div
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{ background: "rgba(255,69,0,0.15)", boxShadow: "inset 0 0 0 1px rgba(255,69,0,0.35)" }}
          >
            <Flame size={18} className="text-ember" />
          </div>
          <div className="flex-1 text-[12px] text-white/65 leading-snug">
            Everything is free during beta. Claim it, equip it, see it on your devil.
          </div>
        </div>
      </section>

      <Section
        title="Devil Skins"
        sub="Battle pass energy. Visible on your profile and friend cards."
        items={SKINS}
      />
      <Section
        title="Profile Flair"
        sub="Borders, halos, crowns. High social value for low effort."
        items={FLAIR}
      />
      <Section
        title="Backdrops"
        sub="Atmosphere for your handle and profile cards."
        items={BACKDROPS}
      />
      <Section
        title="Username Effects"
        sub="Animated text and colored handles. Cheap thrills."
        items={NAME_FX}
      />

      <p className="mt-8 px-5 text-center text-[13px] italic text-white/35">
        "You can't take it with you. So skin the devil."
      </p>
    </MobileShell>
  );
}
