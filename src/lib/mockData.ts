import type { ViceKey } from "./vices";

export const ME = {
  name: "Sir Jest",
  handle: "sirjester",
  initial: "S",
  avatarBg: "#3A1F1F",
  joined: "Mar 2025",
  level: 6,
  levelName: "Hellraiser I",
  nextLevelName: "Hellraiser II",
  xp: 680,
  xpMax: 1000,
  flameTokens: 1247,
};

export type ViceTile = {
  vice: ViceKey;
  count: number;
  tier: string;
  progress: number; // 0..1 toward next tier
};

export const MY_VICES: ViceTile[] = [
  { vice: "drinking",   count: 47, tier: "Barfly III",    progress: 0.62 },
  { vice: "gambling",   count: 31, tier: "Spare Change",  progress: 0.41 },
  { vice: "smoking",    count: 12, tier: "Social Smoker", progress: 0.28 },
  { vice: "pigmaxxing", count: 8,  tier: "Leg Day? Nah",  progress: 0.18 },
  { vice: "lying",      count: 24, tier: "Fibber II",     progress: 0.55 },
  { vice: "jester",     count: 19, tier: "Class Clown",   progress: 0.47 },
  { vice: "bully",      count: 11, tier: "Mean Streak",   progress: 0.30 },
  { vice: "lazy",       count: 15, tier: "Couch Surfer",  progress: 0.40 },
];

export type LogEntry = {
  id: string;
  who: string;            // display name
  handle: string;
  avatarBg: string;
  initial: string;
  vice: ViceKey;
  when: string;
  note?: string;
  isYou?: boolean;
};

export const MY_LOGS: LogEntry[] = [
  { id: "m1", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "drinking", when: "22m ago", note: "negroni #3. tuesday research.", isYou: true },
  { id: "m2", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "gambling", when: "2h ago", note: "parlay hit. rent secured for 3 days.", isYou: true },
  { id: "m3", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "smoking", when: "Today, 11:08 AM", isYou: true },
  { id: "m4", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "lying", when: "Today, 9:14 AM", note: "told boss the wifi was out.", isYou: true },
  { id: "m5", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "pigmaxxing", when: "Yesterday", note: "skipped leg day. again.", isYou: true },
  { id: "m6", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "jester", when: "Yesterday", note: "did a bit at the funeral.", isYou: true },
  { id: "m7", who: "Sir Jest", handle: "sirjester", initial: "S", avatarBg: "#3A1F1F",
    vice: "drinking", when: "Mon", note: "wine with cereal. fortified breakfast.", isYou: true },
];

export const FRIEND_LOGS: LogEntry[] = [
  { id: "f1", who: "Mona Vice", handle: "monavice", initial: "M", avatarBg: "#2B1B2E",
    vice: "gambling", when: "8m ago", note: "blackjack. dealer also crying." },
  { id: "f2", who: "Tobias Lit", handle: "toby", initial: "T", avatarBg: "#2A1E15",
    vice: "drinking", when: "31m ago", note: "negroni number four. peer review." },
  { id: "f3", who: "Cleo Smokes", handle: "cleo", initial: "C", avatarBg: "#241B33",
    vice: "smoking", when: "1h ago" },
  { id: "f4", who: "Lara Lies", handle: "laralies", initial: "L", avatarBg: "#2D2818",
    vice: "lying", when: "1h ago", note: "told her i was 5'11." },
  { id: "f5", who: "Big Hank", handle: "hank", initial: "H", avatarBg: "#2D1B12",
    vice: "gluttony", when: "2h ago", note: "ordered the family meal. for me." },
  { id: "f6", who: "Ezra Goon", handle: "ezzy", initial: "E", avatarBg: "#3B1F2A",
    vice: "gooning", when: "3h ago", note: "lost the day. not the war." },
];

export const GLOBAL_LOGS: LogEntry[] = [
  { id: "g1", who: "Pig Pete", handle: "pete", initial: "P", avatarBg: "#3A1A1A",
    vice: "pigmaxxing", when: "2m ago", note: "took the elevator down 1 floor." },
  { id: "g2", who: "Saint Nope", handle: "snope", initial: "N", avatarBg: "#1F2A3A",
    vice: "cheating", when: "14m ago", note: "wordle on hard mode (used google)." },
  { id: "g3", who: "Anon", handle: "anon42", initial: "?", avatarBg: "#222",
    vice: "stealing", when: "27m ago", note: "extra napkins. for the cause." },
  { id: "g4", who: "Velvet", handle: "velvet", initial: "V", avatarBg: "#2A1B2E",
    vice: "jealousy", when: "44m ago", note: "saw her ex's new gf. logged immediately." },
  { id: "g5", who: "Goon Squad", handle: "gs99", initial: "G", avatarBg: "#3B1F2A",
    vice: "gooning", when: "1h ago", note: "PB. no further comment." },
  { id: "g6", who: "Rex Glutton", handle: "rex", initial: "R", avatarBg: "#2D1B12",
    vice: "gluttony", when: "2h ago", note: "second dinner. defcon 1." },
  { id: "g7", who: "Mean Mira", handle: "mira", initial: "M", avatarBg: "#2D2828",
    vice: "bully", when: "3h ago", note: "made a 6'1 grown man cry. light work." },
  { id: "g8", who: "Couch Carl", handle: "carl", initial: "C", avatarBg: "#1E2A30",
    vice: "lazy", when: "4h ago", note: "ordered uber eats from the kitchen." },
];
