import { useState } from "react";
import Icon from "@/components/ui/icon";

const HISTORY = [
  { date: "03 мая 2026", from: "ул. Ленина, 12", to: "ж/д Вокзал", price: "280 ₽", tariff: "Простой", status: "completed", driver: "А. Громов" },
  { date: "01 мая 2026", from: "Торговый центр", to: "ул. Амурская, 45", price: "195 ₽", tariff: "Простой", status: "completed", driver: "С. Бурятов" },
  { date: "28 апр 2026", from: "Аэропорт Чита", to: "Центр города", price: "850 ₽", tariff: "Грузовой", status: "completed", driver: "В. Нимаев" },
  { date: "25 апр 2026", from: "ул. Бабушкина, 3", to: "Рынок", price: "220 ₽", tariff: "Доставка", status: "cancelled", driver: "—" },
];

const tariffColor: Record<string, string> = {
  "Простой": "text-amber border-amber/30 bg-amber/5",
  "Доставка": "text-teal border-teal/30 bg-teal/5",
  "Грузовой": "text-rust border-rust/30 bg-rust/5",
};

export default function PassengerProfile() {
  const [name, setName] = useState("Михаил Соколов");
  const [phone, setPhone] = useState("+7 (924) 555-10-22");
  const [email, setEmail] = useState("m.sokolov@mail.ru");
  const [editing, setEditing] = useState(false);

  const fields = [
    { icon: "User", label: "Имя", value: name, setter: setName },
    { icon: "Phone", label: "Телефон", value: phone, setter: setPhone },
    { icon: "Mail", label: "E-mail", value: email, setter: setEmail },
  ];

  return (
    <div className="px-5 py-5 space-y-5 animate-slide-up">
      <div>
        <h2 className="text-xl font-black">Мой профиль</h2>
        <div className="w-8 h-1 bg-amber rounded-full mt-1.5" />
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-secondary border border-border rounded-full flex items-center justify-center text-xl font-black text-amber flex-shrink-0">
          {name[0]}
        </div>
        <div>
          <div className="text-base font-bold">{name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Пассажир · {HISTORY.filter(h => h.status === "completed").length} поездок</div>
        </div>
      </div>

      {/* Personal */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Данные</label>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Поездок", value: String(HISTORY.filter(h => h.status === "completed").length) },
          { label: "Отменено", value: String(HISTORY.filter(h => h.status === "cancelled").length) },
          { label: "Рейтинг", value: "5.0 ★" },
        ].map((s) => (
          <div key={s.label} className="bg-secondary border border-border rounded-xl p-3 text-center">
            <div className="text-lg font-black text-amber">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* History */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2">История поездок</label>
        <div className="space-y-2">
          {HISTORY.map((trip, i) => (
            <div key={i} className={`bg-secondary rounded-xl p-4 border ${trip.status === "cancelled" ? "border-destructive/20 opacity-60" : "border-border"}`}>
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground">{trip.date}</span>
                  {trip.status === "cancelled" && <span className="text-[11px] text-destructive font-bold">Отменён</span>}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-[10px] font-semibold border px-1.5 py-0.5 rounded-md ${tariffColor[trip.tariff] || ""}`}>{trip.tariff}</span>
                  <span className="text-sm font-black text-amber">{trip.price}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 mb-2">
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
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="User" size={11} />
                <span>{trip.driver}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
