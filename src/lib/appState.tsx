import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ViceKey } from "./vices";

export type EquippedSlots = {
  skin: string;
  flair: string | null;
  bg: string | null;
  nameFx: string | null;
};

export type UserLog = {
  id: string;
  vice: ViceKey;
  loggedAt: number; // unix ms
  note?: string;
};

export type AppState = {
  coins: number;
  ownedItems: string[];
  equipped: EquippedSlots;
  xp: number;
  userLogs: UserLog[];
};

type AppContextType = AppState & {
  buy: (itemId: string, price: number) => void;
  equip: (slot: keyof EquippedSlots, itemId: string | null) => void;
  unequip: (slot: keyof EquippedSlots) => void;
  isOwned: (itemId: string) => boolean;
  isEquipped: (itemId: string) => boolean;
  addCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  logVice: (vice: ViceKey, note?: string) => UserLog;
  deleteLog: (id: string) => void;
  reset: () => void;
};

const STORAGE_KEY = "devilmaxxx_state_v2";

const DEFAULT_STATE: AppState = {
  coins: 1247,
  ownedItems: ["default"],
  equipped: {
    skin: "default",
    flair: null,
    bg: null,
    nameFx: null,
  },
  xp: 680,
  userLogs: [],
};

const AppContext = createContext<AppContextType | null>(null);

function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      equipped: { ...DEFAULT_STATE.equipped, ...(parsed.equipped || {}) },
      userLogs: Array.isArray(parsed.userLogs) ? parsed.userLogs : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function makeId() {
  // simple unique id; doesn't need to be cryptographic
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const buy = (itemId: string, price: number) => {
    setState((s) => {
      if (s.ownedItems.includes(itemId)) return s;
      if (s.coins < price) return s;
      return {
        ...s,
        coins: s.coins - price,
        ownedItems: [...s.ownedItems, itemId],
      };
    });
  };

  const equip = (slot: keyof EquippedSlots, itemId: string | null) => {
    setState((s) => {
      if (itemId !== null && !s.ownedItems.includes(itemId)) return s;
      return { ...s, equipped: { ...s.equipped, [slot]: itemId } };
    });
  };

  const unequip = (slot: keyof EquippedSlots) => {
    setState((s) => {
      if (slot === "skin") return s;
      return { ...s, equipped: { ...s.equipped, [slot]: null } };
    });
  };

  const isOwned = (itemId: string) => state.ownedItems.includes(itemId);
  const isEquipped = (itemId: string) => Object.values(state.equipped).includes(itemId);

  const addCoins = (amount: number) => setState((s) => ({ ...s, coins: s.coins + amount }));
  const addXp = (amount: number) => setState((s) => ({ ...s, xp: s.xp + amount }));

  const logVice = (vice: ViceKey, note?: string): UserLog => {
    const entry: UserLog = {
      id: makeId(),
      vice,
      loggedAt: Date.now(),
      note: note?.trim() || undefined,
    };
    setState((s) => ({
      ...s,
      userLogs: [entry, ...s.userLogs],
      xp: s.xp + 25,
      coins: s.coins + 15,
    }));
    return entry;
  };

  const deleteLog = (id: string) => {
    setState((s) => ({ ...s, userLogs: s.userLogs.filter((l) => l.id !== id) }));
  };

  const reset = () => {
    setState(DEFAULT_STATE);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        buy,
        equip,
        unequip,
        isOwned,
        isEquipped,
        addCoins,
        addXp,
        logVice,
        deleteLog,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

// Helper: format a unix timestamp as "Xm ago" / "Xh ago" / "Yesterday" / "MMM D"
export function formatRelative(ms: number): string {
  const now = Date.now();
  const diff = Math.max(0, now - ms);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  const d = new Date(ms);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
