import { useState } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_PASSWORD = "manul2026";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onSuccess, onBack }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setPassword("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 animate-fade-in">
      <button
        onClick={onBack}
        className="absolute top-6 left-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Icon name="ChevronLeft" size={18} />
        Назад
      </button>

      <div className="w-full max-w-xs animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${error ? "bg-destructive/20 border border-destructive" : "bg-amber/10 border border-amber/30"}`}>
            <Icon name={error ? "ShieldAlert" : "Shield"} size={26} className={error ? "text-destructive" : "text-amber"} />
          </div>
          <h2 className="text-xl font-black">Администратор</h2>
          <p className="text-sm text-muted-foreground mt-1">Введите пароль доступа</p>
        </div>

        <div className={`border rounded-xl overflow-hidden mb-3 transition-all ${error ? "border-destructive" : "border-border focus-within:border-amber"}`}>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Icon name="Lock" size={15} className="text-muted-foreground flex-shrink-0" />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
              autoFocus
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-destructive text-center mb-3 animate-fade-in">
            Неверный пароль{attempts >= 3 ? ` · Попытка ${attempts}` : ""}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!password}
          className="w-full bg-amber text-background font-bold text-base py-4 rounded-xl hover:bg-amber/90 transition-all active:scale-95 disabled:opacity-30"
        >
          Войти
        </button>
      </div>
    </div>
  );
}
