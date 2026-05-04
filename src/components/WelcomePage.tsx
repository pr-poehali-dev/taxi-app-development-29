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
    if (next >= 3) setShowAdminHint(true);
    setTimeout(() => setAdminTaps(0), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-10 animate-fade-in">
      <div />

      {/* Logo & Brand */}
      <div className="flex flex-col items-center gap-5 animate-slide-up">
        <button
          onClick={handleLogoBadgeTap}
          className="relative focus:outline-none"
          aria-label="Логотип"
        >
          {/* Силуэт кота манула — SVG без фона */}
          <div className="w-28 h-28 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-amber/10 border border-amber/20" />
            <img
              src="https://cdn.poehali.dev/projects/72c36fd6-8d63-4892-8b91-ca64dd3a7019/files/25af3a81-aee2-4710-baea-f767986e948d.jpg"
              alt="Манул"
              className="w-24 h-24 object-contain mix-blend-lighten"
            />
          </div>
          {adminTaps >= 1 && adminTaps < 3 && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {[...Array(adminTaps)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber opacity-60" />
              ))}
            </div>
          )}
        </button>

        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1">МАНУЛ</h1>
          <div className="flex items-center gap-2 justify-center">
            <div className="h-px w-6 bg-amber" />
            <p className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Такси Забайкалья</p>
            <div className="h-px w-6 bg-amber" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full border border-border">
          <Icon name="Lock" size={11} className="text-teal" />
          <span className="text-xs text-muted-foreground">End-to-end шифрование</span>
        </div>
      </div>

      {/* Role selection */}
      <div className="w-full max-w-xs space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <p className="text-center text-sm text-muted-foreground font-medium mb-1">Выберите роль</p>

        <button
          onClick={() => onSelectRole("passenger")}
          className="w-full bg-amber hover:bg-amber/90 text-background font-bold text-base py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-[0_4px_20px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2.5"
        >
          <Icon name="User" size={18} />
          Пассажир
        </button>

        <button
          onClick={() => onSelectRole("driver")}
          className="w-full bg-secondary hover:bg-secondary/80 border border-border text-foreground font-bold text-base py-4 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5"
        >
          <Icon name="Car" size={18} />
          Водитель
        </button>

        <div className="text-center pt-1">
          {showAdminHint ? (
            <button
              onClick={() => onSelectRole("admin")}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 underline underline-offset-4 transition-colors animate-fade-in"
            >
              Администратор
            </button>
          ) : (
            <span className="text-xs text-muted-foreground/15 select-none">· · ·</span>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground/30 tracking-wide">© 2026 Манул · Забайкальский край</p>
    </div>
  );
}
