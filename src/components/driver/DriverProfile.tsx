import { useState } from "react";
import Icon from "@/components/ui/icon";

const DRIVER_HISTORY = [
  { date: "03 мая 2026", from: "ул. Ленина, 5", to: "Аэропорт Чита", price: "650 ₽", tariff: "Простой", payment: "Перевод" },
  { date: "03 мая 2026", from: "Торговый центр", to: "ул. Амурская, 90", price: "280 ₽", tariff: "Доставка", payment: "Наличные" },
  { date: "02 мая 2026", from: "Рынок Забайкальский", to: "ул. Бабушкина, 12", price: "750 ₽", tariff: "Грузовой", payment: "Перевод" },
  { date: "01 мая 2026", from: "ж/д Вокзал", to: "ул. Профсоюзная, 7", price: "190 ₽", tariff: "Простой", payment: "Наличные" },
];

const tariffColor: Record<string, string> = {
  "Простой": "text-amber border-amber/30 bg-amber/5",
  "Доставка": "text-teal border-teal/30 bg-teal/5",
  "Грузовой": "text-rust border-rust/30 bg-rust/5",
};

interface Props {
  isOnline: boolean;
  onToggle: () => void;
}

export default function DriverProfile({ isOnline, onToggle }: Props) {
  const [name, setName] = useState("Александр Громов");
  const [phone, setPhone] = useState("+7 (914) 300-22-11");
  const [carMake, setCarMake] = useState("Toyota Camry");
  const [carNum, setCarNum] = useState("А 123 ВС 75");
  const [carColor, setCarColor] = useState("Серебристый");
  const [carYear, setCarYear] = useState("2021");
  const [editing, setEditing] = useState(false);

  const fields = [
    { icon: "User", label: "Имя", value: name, setter: setName },
    { icon: "Phone", label: "Телефон", value: phone, setter: setPhone },
  ];

  const carFields = [
    { icon: "Car", label: "Марка и модель", value: carMake, setter: setCarMake },
    { icon: "Hash", label: "Гос. номер", value: carNum, setter: setCarNum },
    { icon: "Palette", label: "Цвет", value: carColor, setter: setCarColor },
    { icon: "Calendar", label: "Год выпуска", value: carYear, setter: setCarYear },
  ];

  return (
    <div className="px-5 py-5 space-y-5 animate-slide-up">
      <div>
        <h2 className="text-xl font-black">Мой профиль</h2>
        <div className="w-8 h-1 bg-amber rounded-full mt-1.5" />
      </div>

      {/* Compact status toggle */}
      <div className="flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-teal animate-pulse" : "bg-muted-foreground"}`} />
          <span className="text-sm font-semibold">{isOnline ? "Свободен" : "Занят"}</span>
          <span className="text-xs text-muted-foreground">{isOnline ? "— принимаю заказы" : "— не принимаю"}</span>
        </div>
        <button
          onClick={onToggle}
          className={`w-12 h-6 relative rounded-full transition-colors duration-300 flex-shrink-0 ${isOnline ? "bg-teal" : "bg-border"}`}
        >
          <div className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-all duration-300 ${isOnline ? "left-6" : "left-0.5"}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Поездок", value: "312" },
          { label: "Рейтинг", value: "4.9 ★" },
          { label: "Стаж", value: "2 г." },
        ].map((s) => (
          <div key={s.label} className="bg-secondary border border-border rounded-xl p-3 text-center">
            <div className="text-lg font-black text-amber">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Personal */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Личные данные</label>
          <button onClick={() => setEditing(!editing)} className="text-xs font-bold text-amber">
            {editing ? "Сохранить" : "Изменить"}
          </button>
        </div>
        <div className="bg-secondary rounded-xl divide-y divide-border border border-border">
          {fields.map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-4 py-3">
              <Icon name={f.icon} size={14} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-muted-foreground mb-0.5">{f.label}</div>
                {editing ? (
                  <input value={f.value} onChange={(e) => f.setter(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none border-b border-amber/50 pb-0.5" />
                ) : (
                  <div className="text-sm font-semibold truncate">{f.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Car */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Автомобиль</label>
        <div className="bg-secondary rounded-xl divide-y divide-border border border-border">
          {carFields.map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-4 py-3">
              <Icon name={f.icon} size={14} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-muted-foreground mb-0.5">{f.label}</div>
                {editing ? (
                  <input value={f.value} onChange={(e) => f.setter(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none border-b border-amber/50 pb-0.5" />
                ) : (
                  <div className="text-sm font-semibold truncate">{f.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">История поездок</label>
        <div className="space-y-2">
          {DRIVER_HISTORY.map((trip, i) => (
            <div key={i} className="bg-secondary rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-mono text-muted-foreground">{trip.date}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-semibold border px-1.5 py-0.5 rounded-md ${tariffColor[trip.tariff] || ""}`}>{trip.tariff}</span>
                  <span className="text-xs font-mono text-muted-foreground">{trip.payment}</span>
                  <span className="text-sm font-black text-amber">{trip.price}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="flex flex-col items-center gap-0.5 pt-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full border-2 border-amber" />
                  <div className="w-px h-4 bg-border" />
                  <div className="w-2 h-2 bg-amber rounded-sm" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="text-sm font-semibold leading-tight">{trip.from}</p>
                  <p className="text-sm font-semibold leading-tight">{trip.to}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
