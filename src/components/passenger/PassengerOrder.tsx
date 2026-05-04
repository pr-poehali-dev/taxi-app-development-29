import { useState } from "react";
import Icon from "@/components/ui/icon";
import RideChat from "@/components/shared/RideChat";

const TARIFFS = [
  { id: "standard", icon: "Car", name: "Простой", price: "от 150 ₽", time: "3–5 мин", color: "border-amber", accent: "text-amber" },
  { id: "delivery", icon: "Package", name: "Доставка", price: "от 200 ₽", time: "5–10 мин", color: "border-teal", accent: "text-teal" },
  { id: "cargo", icon: "Truck", name: "Грузовой", price: "от 500 ₽", time: "10–20 мин", color: "border-rust", accent: "text-rust" },
];

interface Props {
  onOrderPlaced?: (id: string) => void;
  activeOrderId?: string | null;
  onCancelOrder?: () => void;
}

export default function PassengerOrder({ onOrderPlaced, onCancelOrder }: Props) {
  const [from, setFrom] = useState("");
  const [waypoints, setWaypoints] = useState<string[]>([]);
  const [to, setTo] = useState("");
  const [tariff, setTariff] = useState("standard");
  const [comment, setComment] = useState("");
  const [children, setChildren] = useState(false);
  const [luggage, setLuggage] = useState(false);
  const [payment, setPayment] = useState<"transfer" | "cash">("transfer");
  const [scheduleTime, setScheduleTime] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const addWaypoint = () => setWaypoints((p) => [...p, ""]);
  const removeWaypoint = (i: number) => setWaypoints((p) => p.filter((_, idx) => idx !== i));
  const updateWaypoint = (i: number, val: string) => setWaypoints((p) => p.map((v, idx) => idx === i ? val : v));

  const handleOrder = () => {
    if (!from || !to) return;
    const id = `ORD-${Date.now()}`;
    setOrdered(true);
    onOrderPlaced?.(id);
  };

  if (showChat) {
    return <RideChat isPassenger={true} driverName="А. Громов" onClose={() => setShowChat(false)} />;
  }

  if (ordered) {
    return (
      <div className="flex flex-col items-center px-5 py-10 animate-scale-in text-center">
        <div className="w-16 h-16 bg-amber/10 border-2 border-amber rounded-full flex items-center justify-center mb-4">
          <Icon name="CheckCircle" size={30} className="text-amber" />
        </div>
        <h2 className="text-xl font-black mb-1">Заказ принят!</h2>
        <p className="text-sm text-muted-foreground mb-1">Ищем водителя...</p>
        <div className="flex gap-1 my-3">
          {[0.1, 0.25, 0.4].map((d, i) => (
            <div key={i} className="w-2 h-2 bg-amber rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>

        <div className="w-full bg-secondary rounded-xl p-4 mb-3 text-left">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-amber" />
              {waypoints.map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-px h-4 bg-border" />
                  <div className="w-2 h-2 bg-amber/50 rounded-full" />
                </div>
              ))}
              <div className="w-px h-4 bg-border" />
              <div className="w-2.5 h-2.5 bg-amber rounded-sm" />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-sm font-semibold">{from}</p>
              {waypoints.map((w, i) => w && <p key={i} className="text-sm text-muted-foreground">{w}</p>)}
              <p className="text-sm font-semibold">{to}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
            {children && <span className="text-xs bg-amber/10 text-amber border border-amber/30 px-2 py-0.5 rounded-full">Дети до 7 лет</span>}
            {luggage && <span className="text-xs bg-amber/10 text-amber border border-amber/30 px-2 py-0.5 rounded-full">Багаж</span>}
            <span className="text-xs bg-secondary text-muted-foreground border border-border px-2 py-0.5 rounded-full">
              {payment === "transfer" ? "Перевод" : "Наличные"}
            </span>
          </div>
        </div>

        {/* Найден водитель */}
        <div className="w-full bg-teal/10 border border-teal/30 rounded-xl p-4 mb-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-sm font-black">А</div>
          <div className="flex-1">
            <div className="text-sm font-bold">А. Громов нашёлся!</div>
            <div className="text-xs text-muted-foreground font-mono">Toyota Camry · А 123 ВС 75</div>
          </div>
          <span className="text-xs text-teal font-semibold">~3 мин</span>
        </div>

        <button
          onClick={() => setShowChat(true)}
          className="w-full bg-amber text-background font-bold text-sm py-3.5 rounded-xl hover:bg-amber/90 transition-all flex items-center justify-center gap-2 mb-2"
        >
          <Icon name="MessageCircle" size={16} />
          Написать водителю
        </button>

        <button
          onClick={() => { setOrdered(false); setFrom(""); setTo(""); setComment(""); setWaypoints([]); onCancelOrder?.(); }}
          className="w-full border border-border text-muted-foreground text-sm font-semibold py-3.5 rounded-xl hover:border-destructive hover:text-destructive transition-colors"
        >
          Отменить заказ
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-5 space-y-5 animate-slide-up">
      <div>
        <h2 className="text-xl font-black">Новый заказ</h2>
        <div className="w-8 h-1 bg-amber rounded-full mt-1.5" />
      </div>

      {/* Tariff */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Тариф</label>
        <div className="grid grid-cols-3 gap-2">
          {TARIFFS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTariff(t.id)}
              className={`border-2 rounded-xl p-3 text-left transition-all duration-200 ${
                tariff === t.id ? `${t.color} bg-secondary` : "border-border hover:border-muted-foreground"
              }`}
            >
              <Icon name={t.icon} size={18} className={tariff === t.id ? t.accent : "text-muted-foreground"} />
              <div className={`text-xs font-bold mt-2 mb-0.5 ${tariff === t.id ? "text-foreground" : "text-muted-foreground"}`}>{t.name}</div>
              <div className={`text-xs font-bold ${t.accent}`}>{t.price}</div>
              <div className="text-[10px] text-muted-foreground">{t.time}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Route */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Маршрут</label>
          <button onClick={addWaypoint} className="text-xs text-amber font-semibold flex items-center gap-1">
            <Icon name="Plus" size={12} />
            Промежуточный
          </button>
        </div>
        <div className="bg-secondary rounded-xl overflow-hidden border border-border">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-amber flex-shrink-0" />
            <input
              type="text" placeholder="Откуда" value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
            />
          </div>
          {waypoints.map((wp, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <div className="w-2.5 h-2.5 bg-amber/40 rounded-full flex-shrink-0" />
              <input
                type="text" placeholder={`Промежуточная точка ${i + 1}`} value={wp}
                onChange={(e) => updateWaypoint(i, e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button onClick={() => removeWaypoint(i)} className="text-muted-foreground hover:text-destructive">
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-2.5 h-2.5 bg-amber rounded-sm flex-shrink-0" />
            <input
              type="text" placeholder="Куда" value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* Options row */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setChildren(!children)}
          className={`flex items-center gap-2 px-3 py-3 rounded-xl border transition-all text-sm font-semibold ${
            children ? "border-amber bg-amber/5 text-amber" : "border-border text-muted-foreground"
          }`}
        >
          <Icon name="Baby" size={16} />
          Дети до 7 лет
        </button>
        <button
          onClick={() => setLuggage(!luggage)}
          className={`flex items-center gap-2 px-3 py-3 rounded-xl border transition-all text-sm font-semibold ${
            luggage ? "border-amber bg-amber/5 text-amber" : "border-border text-muted-foreground"
          }`}
        >
          <Icon name="Luggage" size={16} />
          Багаж
        </button>
      </div>

      {/* Schedule time */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Время подачи</label>
        <div className="flex gap-2">
          <button
            onClick={() => setScheduleTime("")}
            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${!scheduleTime ? "border-amber bg-amber/5 text-amber" : "border-border text-muted-foreground"}`}
          >
            Сейчас
          </button>
          <div className={`flex-1 flex items-center gap-2 px-3 rounded-xl border transition-all ${scheduleTime ? "border-amber" : "border-border"}`}>
            <Icon name="Clock" size={13} className="text-muted-foreground flex-shrink-0" />
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Оплата</label>
        <div className="flex gap-2">
          {([
            { id: "transfer", icon: "Smartphone", label: "Перевод" },
            { id: "cash", icon: "Banknote", label: "Наличные" },
          ] as { id: "transfer" | "cash"; icon: string; label: string }[]).map((p) => (
            <button
              key={p.id}
              onClick={() => setPayment(p.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all ${
                payment === p.id ? "border-amber bg-amber/5 text-amber" : "border-border text-muted-foreground"
              }`}
            >
              <Icon name={p.icon} size={15} />
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Комментарий</label>
        <textarea
          rows={2}
          placeholder="Примечание для водителя..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber transition-colors resize-none"
        />
      </div>

      <button
        onClick={handleOrder}
        disabled={!from || !to}
        className="w-full bg-amber text-background font-black text-base py-4 rounded-xl hover:bg-amber/90 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(245,158,11,0.3)]"
      >
        Заказать
      </button>
    </div>
  );
}
