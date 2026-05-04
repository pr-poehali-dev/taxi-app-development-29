import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Tariff {
  id: string;
  name: string;
  icon: string;
  basePrice: string;
  pricePerKm: string;
  minPrice: string;
  active: boolean;
  color: string;
  accent: string;
}

const INITIAL: Tariff[] = [
  { id: "standard", name: "Простой", icon: "Car", basePrice: "100", pricePerKm: "15", minPrice: "150", active: true, color: "border-amber/40", accent: "text-amber" },
  { id: "delivery", name: "Доставка", icon: "Package", basePrice: "150", pricePerKm: "18", minPrice: "200", active: true, color: "border-teal/40", accent: "text-teal" },
  { id: "cargo", name: "Грузовой", icon: "Truck", basePrice: "300", pricePerKm: "30", minPrice: "500", active: true, color: "border-rust/40", accent: "text-rust" },
];

export default function AdminTariffs() {
  const [tariffs, setTariffs] = useState<Tariff[]>(INITIAL);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const update = (id: string, field: keyof Tariff, value: string | boolean) => {
    setTariffs((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
  };

  const save = (id: string) => {
    setEditId(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="px-5 py-6 animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-black">Настройка тарифов</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      <div className="space-y-4">
        {tariffs.map((tariff) => {
          const isEditing = editId === tariff.id;
          const isSaved = saved === tariff.id;
          return (
            <div key={tariff.id} className={`bg-secondary border-2 rounded-2xl overflow-hidden transition-all ${tariff.active ? tariff.color : "border-border opacity-50"}`}>
              {/* Header */}
              <div className="flex items-center gap-4 p-5">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0`}>
                  <Icon name={tariff.icon} size={22} className={tariff.accent} />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-black">{tariff.name}</div>
                  <div className={`text-sm font-semibold ${tariff.accent}`}>
                    от {tariff.minPrice} ₽ · {tariff.pricePerKm} ₽/км
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {/* Toggle */}
                  <button
                    onClick={() => update(tariff.id, "active", !tariff.active)}
                    className={`w-12 h-6 relative rounded-full transition-colors duration-300 ${tariff.active ? "bg-amber" : "bg-muted"}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-all duration-300 ${tariff.active ? "left-6" : "left-0.5"}`} />
                  </button>
                  <span className="text-xs text-muted-foreground">{tariff.active ? "Активен" : "Выкл"}</span>
                </div>
              </div>

              {/* Edit fields */}
              {tariff.active && (
                <div className="border-t border-border px-5 py-4 space-y-3">
                  {[
                    { field: "basePrice" as keyof Tariff, label: "Базовая стоимость (₽)", value: tariff.basePrice },
                    { field: "pricePerKm" as keyof Tariff, label: "Цена за км (₽)", value: tariff.pricePerKm },
                    { field: "minPrice" as keyof Tariff, label: "Минимальная поездка (₽)", value: tariff.minPrice },
                  ].map((f) => (
                    <div key={f.field} className="flex items-center justify-between gap-3">
                      <label className="text-sm text-muted-foreground flex-1">{f.label}</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={f.value as string}
                          onChange={(e) => update(tariff.id, f.field, e.target.value)}
                          className="w-24 bg-muted border border-amber/50 rounded-lg px-3 py-2 text-base font-bold text-right focus:outline-none text-foreground"
                        />
                      ) : (
                        <span className={`text-base font-black ${tariff.accent}`}>{f.value} ₽</span>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-2 pt-1">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => save(tariff.id)}
                          className="flex-1 bg-amber text-background font-bold text-sm py-3 rounded-xl hover:bg-amber/90 transition-colors"
                        >
                          Сохранить
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="px-5 border border-border text-muted-foreground rounded-xl text-sm font-semibold"
                        >
                          Отмена
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditId(tariff.id)}
                        className="flex-1 border border-border text-sm font-bold py-3 rounded-xl hover:border-amber hover:text-amber transition-colors flex items-center justify-center gap-2"
                      >
                        <Icon name="Edit2" size={15} />
                        {isSaved ? "✓ Сохранено!" : "Изменить цены"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
