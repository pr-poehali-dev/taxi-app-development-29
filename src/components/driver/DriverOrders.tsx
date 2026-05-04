import Icon from "@/components/ui/icon";

const ORDERS = [
  { id: "001", from: "ул. Ленина, 5", to: "Аэропорт Чита", tariff: "Простой", price: "650 ₽", dist: "18 км", time: "2 мин назад" },
  { id: "002", from: "Торговый центр", to: "ул. Амурская, 90", tariff: "Доставка", price: "280 ₽", dist: "7 км", time: "5 мин назад" },
  { id: "003", from: "Рынок «Забайкальский»", to: "ул. Бабушкина, 12", tariff: "Грузовой", price: "750 ₽", dist: "4 км", time: "8 мин назад" },
];

const tariffColor: Record<string, string> = {
  "Простой": "text-amber border-amber/40 bg-amber/5",
  "Доставка": "text-teal border-teal/40 bg-teal/5",
  "Грузовой": "text-rust border-rust/40 bg-rust/5",
};

interface Props { isOnline: boolean; }

export default function DriverOrders({ isOnline }: Props) {
  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-24 text-center animate-fade-in">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-5">
          <Icon name="Car" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-black mb-2">Вы не в сети</h3>
        <p className="text-muted-foreground text-base">Нажмите «Свободен» на вкладке Профиль, чтобы начать принимать заказы</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-black">Свободные заказы</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      <div className="space-y-3">
        {ORDERS.map((order) => (
          <div key={order.id} className="bg-secondary border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold border px-2.5 py-1 rounded-lg ${tariffColor[order.tariff] || ""}`}>
                  {order.tariff}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{order.time}</span>
              </div>
              <span className="text-lg font-black text-amber flex-shrink-0">{order.price}</span>
            </div>

            <div className="flex items-start gap-3 mb-4">
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

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Icon name="Navigation" size={13} />
              <span>{order.dist}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-amber text-background font-bold text-base py-3.5 rounded-xl hover:bg-amber/90 transition-colors active:scale-95">
                Принять
              </button>
              <button className="px-5 border border-border text-muted-foreground rounded-xl hover:border-destructive hover:text-destructive transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
