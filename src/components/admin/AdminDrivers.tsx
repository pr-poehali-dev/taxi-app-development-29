import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Driver {
  id: string;
  name: string;
  phone: string;
  car: string;
  num: string;
  status: "online" | "offline" | "busy";
  rating: string;
  trips: number;
  blocked: boolean;
}

const DRIVERS: Driver[] = [
  { id: "d1", name: "Александр Громов", phone: "+7 914 300-22-11", car: "Toyota Camry", num: "А 123 ВС 75", status: "online", rating: "4.9", trips: 312, blocked: false },
  { id: "d2", name: "Сергей Бурятов", phone: "+7 914 500-11-22", car: "Hyundai Sonata", num: "В 456 КМ 75", status: "busy", rating: "4.7", trips: 198, blocked: false },
  { id: "d3", name: "Владимир Нимаев", phone: "+7 924 100-33-44", car: "Kia K5", num: "С 789 ОР 75", status: "offline", rating: "4.8", trips: 445, blocked: false },
  { id: "d4", name: "Дмитрий Зотов", phone: "+7 914 700-55-66", car: "Nissan Teana", num: "Е 321 МН 75", status: "offline", rating: "3.9", trips: 67, blocked: true },
];

const statusMeta: Record<Driver["status"], { label: string; color: string; dot: string }> = {
  online: { label: "Свободен", color: "text-teal", dot: "bg-teal" },
  busy: { label: "В пути", color: "text-amber", dot: "bg-amber" },
  offline: { label: "Офлайн", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleBlock = (id: string) => {
    setDrivers((prev) => prev.map((d) => d.id === id ? { ...d, blocked: !d.blocked } : d));
  };

  return (
    <div className="px-5 py-6 animate-slide-up">
      <div className="mb-5">
        <h2 className="text-2xl font-black">Водители</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Онлайн", value: drivers.filter((d) => d.status === "online" && !d.blocked).length, color: "text-teal" },
          { label: "В пути", value: drivers.filter((d) => d.status === "busy").length, color: "text-amber" },
          { label: "Всего", value: drivers.length, color: "text-foreground" },
        ].map((s) => (
          <div key={s.label} className="bg-secondary border border-border rounded-2xl p-4 text-center">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {drivers.map((driver) => {
          const s = statusMeta[driver.status];
          const isOpen = expanded === driver.id;
          return (
            <div key={driver.id} className={`bg-secondary border rounded-2xl overflow-hidden transition-all ${driver.blocked ? "border-destructive/30 opacity-60" : "border-border"}`}>
              <button
                onClick={() => setExpanded(isOpen ? null : driver.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-base font-black">
                  {driver.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold truncate">{driver.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    <span className={`text-xs font-semibold ${s.color}`}>{s.label}</span>
                    <span className="text-xs text-muted-foreground">· ★ {driver.rating}</span>
                    {driver.blocked && <span className="text-xs text-destructive font-bold">Заблокирован</span>}
                  </div>
                </div>
                <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground flex-shrink-0" />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-border pt-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "Car", label: "Автомобиль", value: driver.car },
                      { icon: "Hash", label: "Номер", value: driver.num },
                      { icon: "Phone", label: "Телефон", value: driver.phone },
                      { icon: "BarChart2", label: "Поездок", value: String(driver.trips) },
                    ].map((f) => (
                      <div key={f.label} className="bg-muted/40 rounded-xl px-3 py-3">
                        <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                        <div className="text-sm font-bold">{f.value}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleBlock(driver.id)}
                    className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                      driver.blocked
                        ? "bg-teal/10 border border-teal/40 text-teal hover:bg-teal/20"
                        : "bg-destructive/10 border border-destructive/40 text-destructive hover:bg-destructive/20"
                    }`}
                  >
                    {driver.blocked ? "Разблокировать" : "Заблокировать"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
