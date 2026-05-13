import { Link, useLocation } from "@tanstack/react-router";
import { ScrollText, Trophy, User, Flame, Store } from "lucide-react";

const tabs = [
  { to: "/", label: "You", icon: Flame },
  { to: "/logs", label: "Logs", icon: ScrollText },
  { to: "/boards", label: "Boards", icon: Trophy },
  { to: "/shop", label: "Shop", icon: Store },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-white/5 bg-[#0D0A0A]/90 backdrop-blur-xl">
      <ul className="grid grid-cols-5 px-2 pb-5 pt-2">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium tracking-wide"
                style={{ color: active ? "var(--ember)" : "rgba(255,255,255,0.5)" }}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                <span className="uppercase tracking-[0.18em] font-display">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
