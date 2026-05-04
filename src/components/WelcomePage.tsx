import { useState } from "react";
import { type Role } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface Props {
  onSelectRole: (role: Role) => void;
}

export default function WelcomePage({ onSelectRole }: Props) {
  const [adminTaps, setAdminTaps] = useState(0);
  const [showAdminHint, setShowAdminHint] = useState(false);

  const handleLogoBadgeTap = () => {
    const next = adminTaps + 1;
    setAdminTaps(next);
    if (next >= 3) {
      setShowAdminHint(true);
    }
    setTimeout(() => {
      setAdminTaps(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-12 animate-fade-in">
      {/* Top spacer */}
      <div />

      {/* Logo & Brand */}
      <div className="flex flex-col items-center gap-6 animate-slide-up">
        <button
          onClick={handleLogoBadgeTap}
          className="relative focus:outline-none"
          aria-label="Логотип"
        >
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-amber shadow-[0_0_40px_rgba(245,158,11,0.3)]">
            <img
              src="https://cdn.poehali.dev/projects/72c36fd6-8d63-4892-8b91-ca64dd3a7019/files/44c2c1ce-66d6-425d-9672-5c05c34792eb.jpg"
              alt="Манул"
              className="w-full h-full object-cover"
            />
          </div>
          {adminTaps >= 1 && adminTaps < 3 && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {[...Array(adminTaps)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber opacity-60" />
              ))}
            </div>
          )}
        </button>

        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-1">
            МАНУЛ
          </h1>
          <div className="flex items-center gap-2 justify-center">
            <div className="h-px w-8 bg-amber" />
            <p className="text-sm font-medium tracking-[0.18em] text-amber uppercase">
              Такси Забайкалья
            </p>
            <div className="h-px w-8 bg-amber" />
          </div>
        </div>

        {/* E2E badge */}
        <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border border-border">
          <Icon name="Lock" size={13} className="text-teal" />
          <span className="text-xs text-muted-foreground tracking-wide">End-to-end шифрование</span>
        </div>
      </div>

      {/* Role selection */}
      <div className="w-full max-w-xs space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <p className="text-center text-base text-muted-foreground font-medium mb-2">Выберите роль</p>

        <button
          onClick={() => onSelectRole("passenger")}
          className="w-full bg-amber hover:bg-amber/90 text-background font-bold text-lg py-5 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_24px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3"
        >
          <Icon name="User" size={22} />
          Пассажир
        </button>

        <button
          onClick={() => onSelectRole("driver")}
          className="w-full bg-secondary hover:bg-secondary/80 border border-border text-foreground font-bold text-lg py-5 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
        >
          <Icon name="Car" size={22} />
          Водитель
        </button>

        {/* Hidden admin entry */}
        <div className="text-center pt-2">
          {showAdminHint ? (
            <button
              onClick={() => onSelectRole("admin")}
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground underline underline-offset-4 transition-colors animate-fade-in"
            >
              Администратор
            </button>
          ) : (
            <span className="text-xs text-muted-foreground/20 select-none">· · ·</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground/40 tracking-wide">
        © 2026 Манул · Забайкальский край
      </p>
    </div>
  );
}
