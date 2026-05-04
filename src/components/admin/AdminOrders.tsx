import { useState } from "react";
import Icon from "@/components/ui/icon";

type OrderStatus = "active" | "searching" | "done" | "cancelled";

interface Order {
  id: string;
  from: string;
  to: string;
  tariff: string;
  price: string;
  status: OrderStatus;
  driver: string;
  passenger: string;
  time: string;
}

const INITIAL_ORDERS: Order[] = [
  { id: "ORD-001", from: "ул. Ленина, 5", to: "Аэропорт Чита", tariff: "Простой", price: "650 ₽", status: "active", driver: "А. Громов", passenger: "М. Соколов", time: "09:12" },
  { id: "ORD-002", from: "Торговый центр", to: "ул. Амурская, 45", tariff: "Доставка", price: "280 ₽", status: "searching", driver: "—", passenger: "И. Петров", time: "09:18" },
  { id: "ORD-003", from: "Рынок Забайкальский", to: "ул. Бабушкина, 12", tariff: "Грузовой", price: "750 ₽", status: "active", driver: "В. Нимаев", passenger: "О. Чернова", time: "09:05" },
  { id: "ORD-004", from: "ж/д Вокзал", to: "ул. Профсоюзная, 7", tariff: "Простой", price: "190 ₽", status: "done", driver: "С. Бурятов", passenger: "Н. Иванов", time: "08:45" },
];

const statusMeta: Record<OrderStatus, { label: string; color: string }> = {
  active: { label: "В пути", color: "text-teal border-teal/40 bg-teal/5" },
  searching: { label: "Поиск", color: "text-amber border-amber/40 bg-amber/5" },
  done: { label: "Завершён", color: "text-muted-foreground border-border bg-muted/30" },
  cancelled: { label: "Отменён", color: "text-destructive border-destructive/40 bg-destructive/5" },
};

const tariffColor: Record<string, string> = {
  "Простой": "text-amber",
  "Доставка": "text-teal",
  "Грузовой": "text-rust",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const activeCount = orders.filter((o) => o.status === "active" || o.status === "searching").length;

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" } : o));
  };

  return (
    <div className="px-5 py-6 animate-slide-up">
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Заказы онлайн</h2>
          <span className="text-sm font-bold text-amber bg-amber/10 border border-amber/30 px-3 py-1 rounded-full">
            {activeCount} активных
          </span>
        </div>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {([
          { id: "all", label: "Все" },
          { id: "active", label: "В пути" },
          { id: "searching", label: "Поиск" },
          { id: "done", label: "Готово" },
          { id: "cancelled", label: "Отмены" },
        ] as { id: "all" | OrderStatus; label: string }[]).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              filter === f.id ? "bg-amber text-background" : "bg-secondary border border-border text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const s = statusMeta[order.status];
          return (
            <div key={order.id} className="bg-secondary border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                  <span className={`text-xs font-semibold border px-2 py-0.5 rounded-lg ${s.color}`}>{s.label}</span>
                  <span className={`text-xs font-semibold ${tariffColor[order.tariff] || ""}`}>{order.tariff}</span>
                </div>
                <span className="text-base font-black text-amber flex-shrink-0">{order.price}</span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-amber" />
                  <div className="w-px h-5 bg-border" />
                  <div className="w-2.5 h-2.5 bg-amber rounded-sm" />
                </div>
                <div className="space-y-2 flex-1">
                  <p className="text-base font-semibold leading-tight">{order.from}</p>
                  <p className="text-base font-semibold leading-tight">{order.to}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Icon name="Car" size={13} />{order.driver}</span>
                <span className="flex items-center gap-1"><Icon name="User" size={13} />{order.passenger}</span>
                <span className="flex items-center gap-1 ml-auto font-mono"><Icon name="Clock" size={13} />{order.time}</span>
              </div>

              {(order.status === "active" || order.status === "searching") && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="w-full border border-destructive/40 text-destructive text-sm font-bold py-3 rounded-xl hover:bg-destructive/5 transition-colors"
                >
                  Отменить заказ
                </button>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-12 text-base">Заказов нет</div>
        )}
      </div>
    </div>
  );
}
