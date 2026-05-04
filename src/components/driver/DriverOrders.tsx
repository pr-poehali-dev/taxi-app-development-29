import { useState } from "react";
import Icon from "@/components/ui/icon";
import RideChat from "@/components/shared/RideChat";

interface Order {
  id: string;
  from: string;
  to: string;
  tariff: string;
  price: string;
  dist: string;
  time: string;
  payment: "transfer" | "cash";
  children: boolean;
  luggage: boolean;
  comment: string;
  passenger: string;
  scheduleTime?: string;
}

const ORDERS: Order[] = [
  {
    id: "001",
    from: "ул. Ленина, 5",
    to: "Аэропорт Чита",
    tariff: "Простой",
    price: "650 ₽",
    dist: "18 км",
    time: "2 мин назад",
    payment: "transfer",
    children: false,
    luggage: true,
    comment: "Буду у центрального входа",
    passenger: "М. Соколов",
    scheduleTime: "",
  },
  {
    id: "002",
    from: "Торговый центр",
    to: "ул. Амурская, 90",
    tariff: "Доставка",
    price: "280 ₽",
    dist: "7 км",
    time: "5 мин назад",
    payment: "cash",
    children: false,
    luggage: false,
    comment: "",
    passenger: "И. Петров",
  },
  {
    id: "003",
    from: "Рынок «Забайкальский»",
    to: "ул. Бабушкина, 12",
    tariff: "Грузовой",
    price: "750 ₽",
    dist: "4 км",
    time: "8 мин назад",
    payment: "cash",
    children: true,
    luggage: false,
    comment: "Двое детей, нужно детское кресло",
    passenger: "О. Чернова",
    scheduleTime: "14:30",
  },
];

const tariffColor: Record<string, string> = {
  "Простой": "text-amber border-amber/40 bg-amber/5",
  "Доставка": "text-teal border-teal/40 bg-teal/5",
  "Грузовой": "text-rust border-rust/40 bg-rust/5",
};

interface Props { isOnline: boolean; }

export default function DriverOrders({ isOnline }: Props) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [takenOrders, setTakenOrders] = useState<string[]>([]);

  if (activeChat) {
    return (
      <RideChat
        isPassenger={false}
        passengerName={ORDERS.find((o) => o.id === activeChat)?.passenger}
        onClose={() => setActiveChat(null)}
      />
    );
  }

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
          <Icon name="Car" size={28} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-black mb-2">Вы не в сети</h3>
        <p className="text-sm text-muted-foreground">Переключитесь в режим «Свободен» на вкладке Профиль</p>
      </div>
    );
  }

  const availableOrders = ORDERS.filter((o) => !takenOrders.includes(o.id));

  return (
    <div className="px-5 py-5 animate-slide-up">
      <div className="mb-5">
        <h2 className="text-xl font-black">Свободные заказы</h2>
        <div className="w-8 h-1 bg-amber rounded-full mt-1.5" />
      </div>

      {availableOrders.length === 0 && (
        <div className="text-center text-muted-foreground py-16 text-sm">Новых заказов пока нет</div>
      )}

      <div className="space-y-3">
        {availableOrders.map((order) => (
          <div key={order.id} className="bg-secondary border border-border rounded-xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold border px-2 py-0.5 rounded-lg ${tariffColor[order.tariff] || ""}`}>
                  {order.tariff}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{order.time}</span>
                {order.scheduleTime && (
                  <span className="flex items-center gap-1 text-xs text-amber font-semibold">
                    <Icon name="Clock" size={11} />
                    {order.scheduleTime}
                  </span>
                )}
              </div>
              <span className="text-base font-black text-amber">{order.price}</span>
            </div>

            {/* Route */}
            <div className="flex items-start gap-3 px-4 py-3 border-b border-border">
              <div className="flex flex-col items-center gap-0.5 pt-1 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-amber" />
                <div className="w-px h-5 bg-border" />
                <div className="w-2.5 h-2.5 bg-amber rounded-sm" />
              </div>
              <div className="space-y-1.5 flex-1">
                <p className="text-sm font-semibold leading-tight">{order.from}</p>
                <p className="text-sm font-semibold leading-tight">{order.to}</p>
              </div>
            </div>

            {/* Details */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Navigation" size={11} />
                  {order.dist}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold">
                  <Icon name={order.payment === "transfer" ? "Smartphone" : "Banknote"} size={11} className="text-muted-foreground" />
                  <span className={order.payment === "transfer" ? "text-teal" : "text-foreground"}>
                    {order.payment === "transfer" ? "Перевод" : "Наличные"}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="User" size={11} />
                  {order.passenger}
                </span>
                {order.children && (
                  <span className="flex items-center gap-1 text-xs text-amber font-semibold">
                    <Icon name="Baby" size={11} />
                    Дети до 7 лет
                  </span>
                )}
                {order.luggage && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Luggage" size={11} />
                    Багаж
                  </span>
                )}
              </div>
              {order.comment && (
                <div className="mt-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 italic">
                  «{order.comment}»
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 px-4 py-3">
              <button
                onClick={() => setTakenOrders((p) => [...p, order.id])}
                className="flex-1 bg-amber text-background font-bold text-sm py-3 rounded-xl hover:bg-amber/90 transition-colors active:scale-95"
              >
                Взять в работу
              </button>
              <button
                onClick={() => setActiveChat(order.id)}
                className="w-11 h-11 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:border-amber hover:text-amber transition-colors"
              >
                <Icon name="MessageCircle" size={17} />
              </button>
              <button className="w-11 h-11 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:border-destructive hover:text-destructive transition-colors">
                <Icon name="X" size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
