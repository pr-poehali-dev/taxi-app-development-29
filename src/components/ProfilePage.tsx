import { useState } from "react";
import Icon from "@/components/ui/icon";

const trips = [
  { date: "02 мая 2026", from: "Тверская, 15", to: "Домодедово", price: "2 100 ₽", class: "Бизнес" },
  { date: "28 апр 2026", from: "Офис Ленинградская", to: "Кутузовский, 32", price: "890 ₽", class: "Бизнес" },
  { date: "25 апр 2026", from: "Шереметьево T-D", to: "Красная площадь", price: "3 400 ₽", class: "VIP" },
];

export default function ProfilePage() {
  const [name, setName] = useState("Михаил Соколов");
  const [phone, setPhone] = useState("+7 (916) 422-11-88");
  const [email, setEmail] = useState("m.sokolov@company.ru");
  const [editing, setEditing] = useState(false);

  return (
    <div className="px-6 py-6 space-y-6 animate-slide-up">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-wide uppercase">Профиль</h1>
        <div className="w-8 h-0.5 bg-gold mt-2"></div>
      </div>

      {/* Avatar block */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-secondary border border-border flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={28} className="text-muted-foreground" />
        </div>
        <div>
          <div className="font-semibold text-base">{name}</div>
          <div className="text-xs font-mono-plex text-gold mt-0.5">Бизнес-клиент · ★ 5.0</div>
          <div className="text-xs text-muted-foreground mt-1">Поездок: 47</div>
        </div>
      </div>

      {/* Personal data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Личные данные</label>
          <button
            onClick={() => setEditing(!editing)}
            className="text-[10px] uppercase tracking-widest text-gold hover:text-amber-400 transition-colors"
          >
            {editing ? "Сохранить" : "Изменить"}
          </button>
        </div>
        <div className="border border-border divide-y divide-border">
          {[
            { icon: "User", label: "Имя", value: name, setter: setName },
            { icon: "Phone", label: "Телефон", value: phone, setter: setPhone },
            { icon: "Mail", label: "Email", value: email, setter: setEmail },
          ].map((field) => (
            <div key={field.label} className="flex items-center gap-4 px-4 py-3">
              <Icon name={field.icon} size={14} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">{field.label}</div>
                {editing ? (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground focus:outline-none border-b border-gold/50 pb-0.5"
                  />
                ) : (
                  <div className="text-sm text-foreground truncate">{field.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Предпочтения</label>
        <div className="border border-border divide-y divide-border">
          {[
            { label: "Тихая поездка", desc: "Без лишних разговоров", active: true },
            { label: "Кондиционер", desc: "Всегда включён", active: true },
            { label: "Зарядное устройство", desc: "USB-C / Lightning", active: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center gap-4 px-4 py-3">
              <div className="flex-1">
                <div className="text-sm text-foreground">{pref.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{pref.desc}</div>
              </div>
              <div
                className={`w-10 h-5 relative transition-colors duration-200 cursor-pointer ${
                  pref.active ? "bg-gold" : "bg-secondary border border-border"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-background transition-all duration-200 ${
                    pref.active ? "left-5" : "left-0.5"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip history */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">История поездок</label>
        <div className="space-y-2">
          {trips.map((trip, i) => (
            <div key={i} className="border border-border p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[10px] font-mono-plex text-muted-foreground">{trip.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">{trip.class}</span>
                  <span className="text-sm font-semibold text-gold font-mono-plex">{trip.price}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full border border-gold"></div>
                  <div className="w-px h-5 bg-border"></div>
                  <div className="w-1.5 h-1.5 bg-gold"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-foreground">{trip.from}</span>
                  <span className="text-xs text-foreground">{trip.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="w-full border border-border text-muted-foreground text-xs uppercase tracking-widest py-3 hover:border-destructive hover:text-destructive transition-colors flex items-center justify-center gap-2">
        <Icon name="LogOut" size={14} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
