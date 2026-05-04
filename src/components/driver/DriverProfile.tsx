import { useState } from "react";
import Icon from "@/components/ui/icon";

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
    <div className="px-5 py-6 space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-black">Мой профиль</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      {/* Status toggle */}
      <button
        onClick={onToggle}
        className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 ${
          isOnline
            ? "bg-teal text-background shadow-[0_4px_20px_rgba(45,186,163,0.4)]"
            : "bg-secondary border-2 border-border text-muted-foreground"
        }`}
      >
        <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-background animate-pulse" : "bg-muted-foreground"}`} />
        {isOnline ? "Свободен — принимаю заказы" : "Занят — не принимаю заказы"}
      </button>

      {/* Personal */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Личные данные</label>
          <button onClick={() => setEditing(!editing)} className="text-sm font-semibold text-amber">
            {editing ? "Сохранить" : "Изменить"}
          </button>
        </div>
        <div className="bg-secondary rounded-2xl divide-y divide-border border border-border">
          {fields.map((f) => (
            <div key={f.label} className="flex items-center gap-4 px-4 py-4">
              <Icon name={f.icon} size={16} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                {editing ? (
                  <input value={f.value} onChange={(e) => f.setter(e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-foreground focus:outline-none border-b border-amber/50 pb-0.5" />
                ) : (
                  <div className="text-base font-semibold">{f.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Car */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Автомобиль</label>
        </div>
        <div className="bg-secondary rounded-2xl divide-y divide-border border border-border">
          {carFields.map((f) => (
            <div key={f.label} className="flex items-center gap-4 px-4 py-4">
              <Icon name={f.icon} size={16} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                {editing ? (
                  <input value={f.value} onChange={(e) => f.setter(e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-foreground focus:outline-none border-b border-amber/50 pb-0.5" />
                ) : (
                  <div className="text-base font-semibold">{f.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Поездок", value: "312" },
          { label: "Рейтинг", value: "4.9 ★" },
          { label: "Стаж", value: "2 года" },
        ].map((s) => (
          <div key={s.label} className="bg-secondary border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-amber">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
