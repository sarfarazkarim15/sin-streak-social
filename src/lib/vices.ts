export type ViceKey =
  | "smoking" | "drinking" | "gooning" | "jester" | "stealing"
  | "gambling" | "lying" | "cheating" | "gluttony" | "jealousy" | "pigmaxxing"
  | "bully" | "lazy";

export const VICES: Record<ViceKey, { name: string; emoji: string; color: string }> = {
  smoking:    { name: "Smoking",       emoji: "🚬", color: "#9B59B6" },
  drinking:   { name: "Drinking",      emoji: "🍺", color: "#F39C12" },
  gooning:    { name: "Gooning",       emoji: "😵", color: "#FF69B4" },
  jester:     { name: "Jestermaxxing", emoji: "🤡", color: "#8B008B" },
  stealing:   { name: "Stealing",      emoji: "🎭", color: "#17A589" },
  gambling:   { name: "Gambling",      emoji: "🎰", color: "#27AE60" },
  lying:      { name: "Lying",         emoji: "😑", color: "#F1C40F" },
  cheating:   { name: "Cheating",      emoji: "💔", color: "#E74C3C" },
  gluttony:   { name: "Gluttony",      emoji: "🍔", color: "#E67E22" },
  jealousy:   { name: "Jealousy",      emoji: "😤", color: "#2ECC71" },
  pigmaxxing: { name: "Pigmaxxing",    emoji: "🐷", color: "#C0392B" },
  bully:      { name: "Bullying",      emoji: "😈", color: "#7F8C8D" },
  lazy:       { name: "Lazy",          emoji: "🦥", color: "#5D6D7E" },
};
