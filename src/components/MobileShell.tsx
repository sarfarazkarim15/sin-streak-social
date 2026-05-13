import { BottomNav } from "@/components/BottomNav";
import { EmberField } from "@/components/EmberField";

export function MobileShell({ children, shake = false }: { children: React.ReactNode; shake?: boolean }) {
  return (
    <div className={`min-h-screen bg-app relative ${shake ? "screen-shake" : ""}`}>
      <EmberField count={18} className="z-0" />
      <div className="relative z-10 mx-auto max-w-md pb-28">{children}</div>
      <BottomNav />
    </div>
  );
}
