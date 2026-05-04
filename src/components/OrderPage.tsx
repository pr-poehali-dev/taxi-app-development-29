import { useState } from "react";
import Icon from "@/components/ui/icon";

const carClasses = [
  { id: "business", label: "Бизнес", icon: "Car", price: "от 850 ₽", time: "3 мин" },
  { id: "premium", label: "Премиум", icon: "Star", price: "от 1400 ₽", time: "5 мин" },
  { id: "vip", label: "VIP", icon: "Crown", price: "от 2200 ₽", time: "8 мин" },
];

export default function OrderPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedClass, setSelectedClass] = useState("business");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleOrder = () => {
    if (!from || !to) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 animate-slide-up">
        <div className="w-16 h-16 bg-gold flex items-center justify-center mb-6">
          <Icon name="Check" size={28} className="text-background" />
        </div>
        <h2 className="text-xl font-bold tracking-wide mb-2">Заказ принят</h2>
        <p className="text-muted-foreground text-sm text-center mb-1">
          Водитель выехал к вам
        </p>
        <p className="font-mono-plex text-gold text-sm mb-8">ГА 7423 МО · Mercedes E-Class</p>

        <div className="w-full border border-border p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Маршрут</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="w-2 h-2 rounded-full border-2 border-gold"></div>
              <div className="w-px h-8 bg-border"></div>
              <div className="w-2 h-2 bg-gold"></div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-foreground">{from}</span>
              <span className="text-sm text-foreground">{to}</span>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Прибытие", value: "~5 мин" },
            { label: "Поездка", value: "~22 мин" },
            { label: "Стоимость", value: "970 ₽" },
          ].map((item) => (
            <div key={item.label} className="border border-border p-3 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-gold font-mono-plex">{item.value}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="w-full border border-border text-muted-foreground text-sm py-3 uppercase tracking-widest hover:border-gold hover:text-foreground transition-colors"
        >
          Отменить заказ
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 space-y-6 animate-slide-up">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-wide uppercase">Заказ поездки</h1>
        <div className="w-8 h-0.5 bg-gold mt-2"></div>
      </div>

      {/* Route */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Маршрут</label>
        <div className="border border-border">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="w-2 h-2 rounded-full border-2 border-gold flex-shrink-0"></div>
            <input
              type="text"
              placeholder="Откуда"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-2 h-2 bg-gold flex-shrink-0"></div>
            <input
              type="text"
              placeholder="Куда"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Car class */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Класс автомобиля</label>
        <div className="grid grid-cols-3 gap-2">
          {carClasses.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`border p-3 text-left transition-all duration-200 ${
                selectedClass === cls.id
                  ? "border-gold bg-gold/5"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <Icon
                name={cls.icon}
                size={16}
                className={selectedClass === cls.id ? "text-gold mb-2" : "text-muted-foreground mb-2"}
              />
              <div className={`text-xs font-semibold mb-1 ${selectedClass === cls.id ? "text-foreground" : "text-muted-foreground"}`}>
                {cls.label}
              </div>
              <div className="text-[10px] font-mono-plex text-gold">{cls.price}</div>
              <div className="text-[10px] text-muted-foreground">{cls.time}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date / Time */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Время подачи</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-border px-4 py-3 flex items-center gap-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <input
              type="date"
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="border border-border px-4 py-3 flex items-center gap-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <input
              type="time"
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
              defaultValue="09:00"
            />
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Комментарий водителю</label>
        <textarea
          rows={2}
          placeholder="Например: встретьте у главного входа"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleOrder}
        disabled={!from || !to}
        className="w-full bg-gold text-background font-bold text-sm uppercase tracking-widest py-4 transition-all duration-200 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Заказать поездку
      </button>
    </div>
  );
}
