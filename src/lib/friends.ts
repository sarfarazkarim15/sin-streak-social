import type { ViceKey } from "./vices";

export type ViceStat = {
  vice: ViceKey;
  count: number;
  tier: string;
  streak: number;
};

export type FriendActivity = {
  vice: ViceKey;
  when: string;
  note?: string;
};

export type FriendAward = {
  name: string;
  emoji: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
};

export type FriendProfile = {
  handle: string;        // url-safe, lowercase, unique
  name: string;          // display name
  initial: string;
  avatarBg: string;
  joined: string;
  bio: string;
  level: number;
  xpPct: number;         // 0..1
  totalLogs: number;
  longestStreak: number;
  primaryVice: ViceKey;
  vices: ViceStat[];
  awards: FriendAward[];
  activity: FriendActivity[];
  // friendship context
  isFriend: boolean;     // appears in friends/weekly
};

export const FRIENDS: FriendProfile[] = [
  {
    handle: "monavice",
    name: "Mona Vice",
    initial: "M",
    avatarBg: "#2B1B2E",
    joined: "Jan 2025",
    bio: "the house always wins. i am the house.",
    level: 7,
    xpPct: 0.71,
    totalLogs: 892,
    longestStreak: 156,
    primaryVice: "gambling",
    vices: [
      { vice: "gambling",  count: 312, tier: "Whale",        streak: 89 },
      { vice: "drinking",  count: 188, tier: "Barfly II",    streak: 41 },
      { vice: "lying",     count: 121, tier: "Fibber II",    streak: 12 },
      { vice: "cheating",  count: 88,  tier: "Card Counter", streak: 6 },
    ],
    awards: [
      { name: "House Always Wins", emoji: "🎰", tier: "Gold" },
      { name: "Bad Beat Survivor", emoji: "🃏", tier: "Silver" },
      { name: "Iron Liver",         emoji: "🍷", tier: "Bronze" },
    ],
    activity: [
      { vice: "gambling", when: "8m ago",  note: "blackjack. dealer also crying." },
      { vice: "gambling", when: "2h ago",  note: "parlay #4 of the day." },
      { vice: "drinking", when: "5h ago",  note: "celebration shot. parlay died." },
      { vice: "lying",    when: "Yesterday", note: "told dad i was 'investing'." },
    ],
    isFriend: true,
  },
  {
    handle: "toby",
    name: "Tobias Lit",
    initial: "T",
    avatarBg: "#2A1E15",
    joined: "Feb 2025",
    bio: "wine is just spicy grape juice with consequences.",
    level: 6,
    xpPct: 0.44,
    totalLogs: 1144,
    longestStreak: 248,
    primaryVice: "drinking",
    vices: [
      { vice: "drinking", count: 612, tier: "Marlboro Maraschino", streak: 156 },
      { vice: "lying",    count: 211, tier: "Smooth Talker",       streak: 23 },
      { vice: "gluttony", count: 178, tier: "Charcuterie Demon",   streak: 8 },
      { vice: "lazy",     count: 143, tier: "Couch Surfer",        streak: 19 },
    ],
    awards: [
      { name: "Iron Liver",     emoji: "🍷", tier: "Platinum" },
      { name: "Sommelier Sin",   emoji: "🍇", tier: "Gold" },
      { name: "Peer Review",     emoji: "📋", tier: "Silver" },
    ],
    activity: [
      { vice: "drinking", when: "31m ago", note: "negroni number four. peer review." },
      { vice: "drinking", when: "2h ago",  note: "happy hour ended at noon for me." },
      { vice: "gluttony", when: "4h ago",  note: "cheese plate as a meal. again." },
    ],
    isFriend: true,
  },
  {
    handle: "laralies",
    name: "Lara Lies",
    initial: "L",
    avatarBg: "#2D2818",
    joined: "Aug 2024",
    bio: "i was telling the truth. (this is a lie.)",
    level: 8,
    xpPct: 0.88,
    totalLogs: 2103,
    longestStreak: 412,
    primaryVice: "lying",
    vices: [
      { vice: "lying",    count: 988, tier: "Pathological",  streak: 301 },
      { vice: "cheating", count: 410, tier: "Wordle Cheat",  streak: 72 },
      { vice: "jealousy", count: 233, tier: "Side Eye II",   streak: 14 },
    ],
    awards: [
      { name: "Pathological Liar",   emoji: "🤥", tier: "Platinum" },
      { name: "Caught In 4K Survivor", emoji: "📸", tier: "Gold" },
      { name: "365 Club",              emoji: "🔥", tier: "Gold" },
    ],
    activity: [
      { vice: "lying", when: "1h ago",  note: "told her i was 5'11." },
      { vice: "lying", when: "3h ago",  note: "said the cat ate my homework." },
      { vice: "cheating", when: "Yesterday", note: "spelling bee. with bluetooth." },
    ],
    isFriend: true,
  },
  {
    handle: "mira",
    name: "Mean Mira",
    initial: "M",
    avatarBg: "#2D2828",
    joined: "Apr 2025",
    bio: "if you can't say something nice, say it louder.",
    level: 5,
    xpPct: 0.31,
    totalLogs: 480,
    longestStreak: 62,
    primaryVice: "bully",
    vices: [
      { vice: "bully",    count: 210, tier: "Mean Streak",   streak: 62 },
      { vice: "jealousy", count: 112, tier: "Side Eye",       streak: 18 },
      { vice: "lying",    count: 88,  tier: "Fibber I",       streak: 4 },
    ],
    awards: [
      { name: "Roast Master", emoji: "🔥", tier: "Gold" },
      { name: "Receipts Holder", emoji: "🧾", tier: "Silver" },
    ],
    activity: [
      { vice: "bully", when: "3h ago",  note: "made a 6'1 grown man cry. light work." },
      { vice: "bully", when: "Yesterday", note: "called gary's haircut 'transitional.'" },
      { vice: "jealousy", when: "Yesterday", note: "her promo. why not me." },
    ],
    isFriend: true,
  },
  {
    handle: "sirjester",
    name: "Sir Jest",
    initial: "S",
    avatarBg: "#3A1F1F",
    joined: "Mar 2025",
    bio: "i did a bit at the funeral. nobody clapped.",
    level: 6,
    xpPct: 0.68,
    totalLogs: 720,
    longestStreak: 77,
    primaryVice: "jester",
    vices: [
      { vice: "jester",   count: 285, tier: "Class Clown",    streak: 47 },
      { vice: "drinking", count: 152, tier: "Barfly II",      streak: 22 },
      { vice: "lying",    count: 110, tier: "Smooth Talker",  streak: 9 },
    ],
    awards: [
      { name: "Bit Committer", emoji: "🃏", tier: "Gold" },
      { name: "Saturday Night Live", emoji: "🎤", tier: "Silver" },
    ],
    activity: [
      { vice: "jester", when: "just now", note: "bit committed. cannot stop." },
      { vice: "jester", when: "2h ago", note: "made the barista call me 'your honor.'" },
      { vice: "drinking", when: "Yesterday", note: "ordered a 'devil's water.' got tap." },
    ],
    isFriend: true,
  },
  {
    handle: "cleo",
    name: "Cleo Smokes",
    initial: "C",
    avatarBg: "#241B33",
    joined: "Nov 2024",
    bio: "lungs are for cowards.",
    level: 7,
    xpPct: 0.55,
    totalLogs: 1801,
    longestStreak: 301,
    primaryVice: "smoking",
    vices: [
      { vice: "smoking",  count: 1102, tier: "Surgeon General's Nightmare", streak: 248 },
      { vice: "drinking", count: 322,  tier: "Barfly II",     streak: 48 },
      { vice: "lazy",     count: 188,  tier: "Couch Surfer",  streak: 11 },
    ],
    awards: [
      { name: "Surgeon General's Nightmare", emoji: "🫁", tier: "Platinum" },
      { name: "365 Club",                     emoji: "🔥", tier: "Gold" },
      { name: "Iron Lung (Inverse)",          emoji: "💨", tier: "Gold" },
    ],
    activity: [
      { vice: "smoking", when: "1h ago" },
      { vice: "smoking", when: "3h ago", note: "menthol break. 8th of the day." },
      { vice: "drinking", when: "Yesterday" },
    ],
    isFriend: true,
  },
  {
    handle: "carl",
    name: "Couch Carl",
    initial: "C",
    avatarBg: "#1E2A30",
    joined: "Sep 2024",
    bio: "i exercise my right to remain seated.",
    level: 4,
    xpPct: 0.62,
    totalLogs: 622,
    longestStreak: 188,
    primaryVice: "lazy",
    vices: [
      { vice: "lazy",       count: 480, tier: "Sloth Maximus",  streak: 188 },
      { vice: "pigmaxxing", count: 92,  tier: "Leg Day? Nah",   streak: 33 },
      { vice: "gluttony",   count: 50,  tier: "Snack Tactician",streak: 7 },
    ],
    awards: [
      { name: "Couch Locked",    emoji: "🛋️", tier: "Gold" },
      { name: "Doordash Diamond", emoji: "🥡", tier: "Silver" },
    ],
    activity: [
      { vice: "lazy", when: "4h ago",  note: "ordered uber eats from the kitchen." },
      { vice: "lazy", when: "Yesterday", note: "called in sick to bed." },
      { vice: "pigmaxxing", when: "Mon", note: "elevator. one floor. up." },
    ],
    isFriend: true,
  },
  {
    handle: "hank",
    name: "Big Hank",
    initial: "H",
    avatarBg: "#2D1B12",
    joined: "Dec 2024",
    bio: "the family meal. for me.",
    level: 3,
    xpPct: 0.22,
    totalLogs: 411,
    longestStreak: 89,
    primaryVice: "gluttony",
    vices: [
      { vice: "gluttony", count: 280, tier: "Buffet Boss",  streak: 77 },
      { vice: "lazy",     count: 88,  tier: "Couch Surfer", streak: 14 },
    ],
    awards: [
      { name: "Buffet Boss", emoji: "🍖", tier: "Gold" },
      { name: "Free Refill Royalty", emoji: "🥤", tier: "Silver" },
    ],
    activity: [
      { vice: "gluttony", when: "2h ago",  note: "ordered the family meal. for me." },
      { vice: "gluttony", when: "Yesterday", note: "second dinner. defcon 1." },
    ],
    isFriend: true,
  },
  {
    handle: "ezzy",
    name: "Ezra Goon",
    initial: "E",
    avatarBg: "#3B1F2A",
    joined: "May 2025",
    bio: "lost the day. not the war.",
    level: 2,
    xpPct: 0.15,
    totalLogs: 188,
    longestStreak: 23,
    primaryVice: "gooning",
    vices: [
      { vice: "gooning", count: 142, tier: "Marathoner", streak: 23 },
      { vice: "lazy",    count: 32,  tier: "Couch Surfer", streak: 5 },
    ],
    awards: [
      { name: "PB Achievement", emoji: "🏆", tier: "Bronze" },
    ],
    activity: [
      { vice: "gooning", when: "3h ago", note: "PB. no further comment." },
      { vice: "lazy",    when: "Yesterday" },
    ],
    isFriend: true,
  },
  {
    handle: "pete",
    name: "Pig Pete",
    initial: "P",
    avatarBg: "#3A1A1A",
    joined: "Feb 2025",
    bio: "i pay for the gym. that counts.",
    level: 1,
    xpPct: 0.08,
    totalLogs: 92,
    longestStreak: 12,
    primaryVice: "pigmaxxing",
    vices: [
      { vice: "pigmaxxing", count: 71, tier: "Leg Day? Nah", streak: 12 },
      { vice: "lazy",       count: 21, tier: "Couch Surfer", streak: 4 },
    ],
    awards: [
      { name: "Gym Membership Hoarder", emoji: "🐷", tier: "Bronze" },
    ],
    activity: [
      { vice: "pigmaxxing", when: "2m ago", note: "took the elevator down 1 floor." },
      { vice: "pigmaxxing", when: "Yesterday", note: "leg day? in this economy?" },
    ],
    isFriend: true,
  },
  // Global-only (not in your friends list, but reachable via global leaderboards)
  {
    handle: "snope",
    name: "Saint Nope",
    initial: "N",
    avatarBg: "#1F2A3A",
    joined: "Jul 2025",
    bio: "wordle on hard mode (used google).",
    level: 4,
    xpPct: 0.4,
    totalLogs: 312,
    longestStreak: 41,
    primaryVice: "cheating",
    vices: [
      { vice: "cheating", count: 198, tier: "Wordle Cheat", streak: 41 },
      { vice: "lying",    count: 88,  tier: "Fibber I",     streak: 9 },
    ],
    awards: [
      { name: "Wordle Whisperer", emoji: "📱", tier: "Silver" },
    ],
    activity: [
      { vice: "cheating", when: "14m ago", note: "wordle on hard mode (used google)." },
    ],
    isFriend: false,
  },
  {
    handle: "anon42",
    name: "Anon",
    initial: "?",
    avatarBg: "#222222",
    joined: "Oct 2024",
    bio: "no comment.",
    level: 3,
    xpPct: 0.5,
    totalLogs: 248,
    longestStreak: 33,
    primaryVice: "stealing",
    vices: [
      { vice: "stealing", count: 148, tier: "Five Finger Discount", streak: 33 },
    ],
    awards: [
      { name: "Sticky Fingers", emoji: "🎭", tier: "Silver" },
    ],
    activity: [
      { vice: "stealing", when: "27m ago", note: "extra napkins. for the cause." },
    ],
    isFriend: false,
  },
  {
    handle: "velvet",
    name: "Velvet",
    initial: "V",
    avatarBg: "#2A1B2E",
    joined: "Jun 2025",
    bio: "watching your ex's gf so you don't have to.",
    level: 3,
    xpPct: 0.33,
    totalLogs: 280,
    longestStreak: 28,
    primaryVice: "jealousy",
    vices: [
      { vice: "jealousy", count: 180, tier: "Side Eye II", streak: 28 },
    ],
    awards: [
      { name: "Receipt Keeper", emoji: "🧾", tier: "Bronze" },
    ],
    activity: [
      { vice: "jealousy", when: "44m ago", note: "saw her ex's new gf. logged immediately." },
    ],
    isFriend: false,
  },
  {
    handle: "gs99",
    name: "Goon Squad",
    initial: "G",
    avatarBg: "#3B1F2A",
    joined: "Mar 2025",
    bio: "PB. no further comment.",
    level: 4,
    xpPct: 0.6,
    totalLogs: 401,
    longestStreak: 55,
    primaryVice: "gooning",
    vices: [
      { vice: "gooning", count: 280, tier: "Marathoner",   streak: 55 },
      { vice: "lazy",    count: 88,  tier: "Couch Surfer", streak: 12 },
    ],
    awards: [
      { name: "Marathoner",       emoji: "🏆", tier: "Silver" },
      { name: "PB Speedrunner",   emoji: "⚡", tier: "Bronze" },
    ],
    activity: [
      { vice: "gooning", when: "1h ago", note: "PB. no further comment." },
      { vice: "lazy",    when: "Yesterday" },
    ],
    isFriend: false,
  },
  {
    handle: "rex",
    name: "Rex Glutton",
    initial: "R",
    avatarBg: "#2D1B12",
    joined: "Sep 2024",
    bio: "defcon 1. second dinner.",
    level: 5,
    xpPct: 0.48,
    totalLogs: 520,
    longestStreak: 71,
    primaryVice: "gluttony",
    vices: [
      { vice: "gluttony",   count: 360, tier: "Buffet Boss",   streak: 71 },
      { vice: "lazy",       count: 102, tier: "Couch Surfer",  streak: 9 },
      { vice: "pigmaxxing", count: 58,  tier: "Leg Day? Nah",  streak: 6 },
    ],
    awards: [
      { name: "Second Dinner Society", emoji: "🍗", tier: "Gold" },
      { name: "All-You-Can-Eat MVP",   emoji: "🍖", tier: "Silver" },
    ],
    activity: [
      { vice: "gluttony", when: "2h ago", note: "second dinner. defcon 1." },
      { vice: "lazy", when: "Yesterday" },
    ],
    isFriend: false,
  },
];

export function getFriend(handle: string): FriendProfile | undefined {
  return FRIENDS.find((f) => f.handle.toLowerCase() === handle.toLowerCase());
}
