export type ShopItemState = "owned" | "locked" | undefined;

export type ShopItem = {
  id: string;
  name: string;
  blurb: string;
  preview: string;
  price: number;
  state?: ShopItemState;
  hot?: boolean;
  category: "skin" | "flair" | "bg" | "viceIcon" | "nameFx";
};

// All prices set to 0 as requested
export const SKINS: ShopItem[] = [
  { id: "default", name: "Classic Devil",  blurb: "The OG. Crimson, snarling, pitchforked.",      preview: "😈", price: 0, category: "skin" },
  { id: "ice",     name: "Ice Devil",      blurb: "Cold-blooded. Frost horns, blue glow.",        preview: "🧊", price: 0, hot: true, category: "skin" },
  { id: "clown",   name: "Clown Devil",    blurb: "Honk if you've sinned today.",                 preview: "🤡", price: 0, category: "skin" },
  { id: "ceo",     name: "CEO Devil",      blurb: "Tie, briefcase, soul-acquisition cap.",        preview: "💼", price: 0, category: "skin" },
  { id: "vamp",    name: "Vampyr Devil",   blurb: "Drinks blood. And espresso martinis.",         preview: "🦇", price: 0, category: "skin" },
  { id: "gold",    name: "Gold Devil",     blurb: "Pure greed. Glows like a treasure room.",      preview: "🏆", price: 0, category: "skin" },
];

export const FLAIR: ShopItem[] = [
  { id: "fire-border", name: "Inferno Border", blurb: "Animated flame ring around your avatar.", preview: "🔥", price: 0, category: "flair" },
  { id: "halo",        name: "Fallen Halo",    blurb: "Crooked, smoking. Top-10 only.",          preview: "😇", price: 0, category: "flair" },
  { id: "crown",       name: "Sinner's Crown", blurb: "Awarded vibe. Worn by champions.",        preview: "👑", price: 0, category: "flair" },
  { id: "horns",       name: "Demon Horns",    blurb: "Floating horns above your devil.",        preview: "🐂", price: 0, category: "flair" },
];

export const BACKDROPS: ShopItem[] = [
  { id: "bg-ember",   name: "Ember Backdrop",   blurb: "Drifting embers behind your handle.",       preview: "✨", price: 0, category: "bg" },
  { id: "bg-smoke",   name: "Smoke Screen",     blurb: "Mysterious haze. Pretentious.",             preview: "💨", price: 0, category: "bg" },
  { id: "bg-stars",   name: "Cursed Stars",     blurb: "Dark sky, glittering bad decisions.",       preview: "🌌", price: 0, category: "bg" },
];

export const NAME_FX: ShopItem[] = [
  { id: "ember-text", name: "Ember Handle",      blurb: "Your @ glows ember orange.",         preview: "Aa", price: 0, category: "nameFx" },
  { id: "shimmer",    name: "Brimstone Shimmer", blurb: "Animated red→gold gradient.",        preview: "Aa", price: 0, hot: true, category: "nameFx" },
  { id: "glitch",     name: "Glitch FX",         blurb: "Subtle name corruption. On brand.",  preview: "A̷a̴", price: 0, category: "nameFx" },
];

export const ALL_ITEMS: ShopItem[] = [
  ...SKINS, ...FLAIR, ...BACKDROPS, ...NAME_FX,
];

export function getItem(id: string | null | undefined): ShopItem | undefined {
  if (!id) return undefined;
  return ALL_ITEMS.find((it) => it.id === id);
}
