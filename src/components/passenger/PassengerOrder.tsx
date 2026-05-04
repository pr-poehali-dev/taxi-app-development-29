import { useState } from "react";
import Icon from "@/components/ui/icon";

const TARIFFS = [
  {
    id: "standard",
    icon: "Car",
    name: "Простой",
    desc: "Поездка по городу",
    price: "от 150 ₽",
    time: "3–5 мин",
    color: "border-amber",
    accent: "text-amber",
  },
  {
    id: "delivery",
    icon: "Package",
    name: "Доставка",
    desc: "Курьерская доставка",
    price: "от 200 ₽",
    time: "5–10 мин",
    color: "border-teal",
    accent: "text-teal",
  },
  {
    id: "cargo",
    icon: "Truck",
    name: "Грузовой",
    desc: "Перевозка грузов",
    price: "от 500 ₽",
    time: "10–20 мин",
    color: "border-rust",
    accent: "text-rust",
  },
];

export default function PassengerOrder() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tariff, setTariff] = useState("standard");
  const [comment, setComment] = useState("");
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    if (!from || !to) return;
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 animate-scale-in text-center">
        <div className="w-20 h-20 bg-amber/10 border-2 border-amber rounded-full flex items-center justify-center mb-6">
          <Icon name="CheckCircle" size={36} className="text-amber" />
        </div>
        <h2 className="text-2xl font-black mb-2">Заказ принят!</h2>
        <p className="text-muted-foreground text-base mb-1">Ищем водителя...</p>
        <div className="flex gap-1 my-4">
          {[0.1, 0.25, 0.4].map((d, i) => (
            <div key={i} className="w-2 h-2 bg-amber rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>

        <div className="w-full bg-secondary rounded-2xl p-5 mb-4 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-amber" />
              <div className="w-px h-6 bg-border" />
              <div className="w-2.5 h-2.5 bg-amber rounded-sm" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold">{from}</p>
              <p className="text-base font-semibold">{to}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setOrdered(false); setFrom(""); setTo(""); setComment(""); }}
          className="w-full border border-border text-muted-foreground text-base font-semibold py-4 rounded-xl hover:border-destructive hover:text-destructive transition-colors"
        >
          Отменить заказ
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-black">Новый заказ</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      {/* Tariff */}
      <div>
        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest block mb-3">Тариф</label>
        <div className="grid grid-cols-3 gap-2.5">
          {TARIFFS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTariff(t.id)}
              className={`border-2 rounded-xl p-3 text-left transition-all duration-200 ${
                tariff === t.id ? `${t.color} bg-secondary` : "border-border hover:border-muted-foreground"
              }`}
            >
              <Icon name={t.icon} size={20} className={tariff === t.id ? t.accent : "text-muted-foreground"} />
              <div className={`text-sm font-bold mt-2 mb-1 ${tariff === t.id ? "text-foreground" : "text-muted-foreground"}`}>
                {t.name}
              </div>
              <div className={`text-sm font-bold ${t.accent}`}>{t.price}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{t.time}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Route */}
      <div>
        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest block mb-3">Маршрут</label>
        <div className="bg-secondary rounded-2xl overflow-hidden border border-border">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
            <div className="w-3 h-3 rounded-full border-2 border-amber flex-shrink-0" />
            <input
              type="text"
              placeholder="Откуда"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-3 h-3 bg-amber rounded-sm flex-shrink-0" />
            <input
              type="text"
              placeholder="Куда"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest block mb-3">Комментарий</label>
        <textarea
          rows={2}
          placeholder="Примечание для водителя..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-secondary border border-border rounded-2xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-amber transition-colors resize-none"
        />
      </div>

      <button
        onClick={handleOrder}
        disabled={!from || !to}
        className="w-full bg-amber text-background font-black text-lg py-5 rounded-2xl hover:bg-amber/90 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(245,158,11,0.35)]"
      >
        Заказать
      </button>
    </div>
  );
}
