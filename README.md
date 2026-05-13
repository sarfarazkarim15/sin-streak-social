# Devilmaxxx

A satirical social vice-tracking app. Web first, mobile later.

## What's in this build

- **5 working tabs**: You, Logs, Boards, Shop, Profile
- **13 vices**: Smoking, Drinking, Gooning, Jestermaxxing, Stealing, Gambling, Lying, Cheating, Gluttony, Jealousy, Pigmaxxing, Bullying, Lazy
- **Pick-a-vice modal**: "Log a degeneracy" opens a popup, you choose 1 of 13 vices, add an optional note, hit Confess → +25 XP, +15 coins
- **Logs tab starts empty** — only populates as you actually log things
- **Tappable user profiles** — every leaderboard row links to a full profile page for that user
- **Functional shop**: all items free during beta, claim → equip → see your devil change
- **6 devil skins**: Classic, Ice, Clown, CEO, Vampyr, Gold
- **Profile flair**: Halo, Crown, Demon Horns, Inferno Border
- **Backdrops**: Ember, Smoke, Cursed Stars
- **Username effects**: Ember, Brimstone Shimmer, Glitch
- **Persistent state**: coins, owned items, equipped slots, and your logs save to localStorage

## Setup

```bash
npm install
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:3000`).

## Quick test flow

1. **You tab** — see your devil; "Suspiciously clean" empty state for vices and recent sins
2. **Tap "Log a degeneracy"** — modal opens with all 13 vices in a 3-column grid
3. **Pick one** (it highlights) → tap **Continue** → write an optional note → tap **Confess**
4. Modal closes, XP/coins go up, screen shakes, devil glows, +25 XP floats up
5. Your vices grid and Recent Sins section appear on the You tab
6. Go to **Logs** — your log is there with delete button
7. Go to **Boards** — tap any user's row (e.g. "Mona Vice") to view their full profile
8. Go to **Shop** — claim and equip a new devil skin, go back to You to see it
9. **Profile** — your own profile with equipped slots summary

## File map

```
src/
├── components/
│   ├── Devil.tsx              # SVG devil with skin variants + flair
│   ├── LogDegeneracyModal.tsx # Popup for picking a vice to log
│   ├── BottomNav.tsx          # 5-tab navigation
│   ├── FlameBar.tsx           # XP/progress bars
│   ├── LevelBadge.tsx
│   ├── MobileShell.tsx        # Page wrapper
│   └── EmberField.tsx
├── lib/
│   ├── appState.tsx           # Global context: coins, owned, equipped, XP, userLogs
│   ├── shopItems.ts           # All shop items
│   ├── vices.ts               # 13 vices
│   ├── friends.ts             # Mock friend/global user profiles
│   └── mockData.ts            # Friend logs, leaderboards
├── routes/
│   ├── __root.tsx             # Wraps app in AppStateProvider
│   ├── index.tsx              # You / Sharing tab
│   ├── logs.tsx               # Logs tab (You/Friends/Global)
│   ├── boards.tsx             # Leaderboards (rows are clickable)
│   ├── shop.tsx               # Shop tab
│   ├── profile.tsx            # Your profile
│   └── u.$handle.tsx          # Dynamic friend profile route at /u/<handle>
└── styles.css
```

## How user profiles work

- The friend data lives in `src/lib/friends.ts`
- Each friend has: handle, name, avatar, bio, level, XP, vice stats, awards, recent activity
- Leaderboard rows and feed entries on the Logs tab link to `/u/<handle>`
- The route `src/routes/u.$handle.tsx` looks up the friend by handle and renders their full profile
- If the handle isn't found, a 404 "user not found" page shows up

To add a new friend, just push another object onto the FRIENDS array in `friends.ts`.

## Resetting local data

On the Profile tab, scroll to the bottom and tap **Reset local data**. This clears coins, XP, owned items, equipped slots, and all your logs. Useful when testing the empty state.

## Going to production (next steps)

Right now everything saves to localStorage in your browser. To launch:

1. Connect Supabase
2. Replace the local state in `appState.tsx` with Supabase queries
3. Replace mock friend data in `friends.ts` and `mockData.ts` with real Supabase queries
4. The UI doesn't change — just swap the data layer

## Stack

- **Framework**: TanStack Start (React 19 + Vite + SSR)
- **Routing**: TanStack Router (file-based, supports dynamic params like `u.$handle`)
- **Styling**: Tailwind CSS v4
- **UI primitives**: shadcn/ui (Radix)
- **Icons**: lucide-react
- **State**: React Context + localStorage
- **Deploy target**: Cloudflare Workers
