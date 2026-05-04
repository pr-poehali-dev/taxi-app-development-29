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

export default function PassengerHistory() {
  return (
    <div className="px-5 py-6 animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-black">История поездок</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      <div className="space-y-3">
        {HISTORY.map((trip, i) => (
          <div key={i} className={`bg-secondary rounded-2xl p-5 border ${trip.status === "cancelled" ? "border-destructive/20 opacity-60" : "border-border"}`}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-mono text-muted-foreground">{trip.date}</span>
                {trip.status === "cancelled" && (
                  <span className="ml-2 text-xs text-destructive font-semibold">Отменён</span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-semibold border px-2 py-1 rounded-lg ${tariffColor[trip.tariff] || ""}`}>
                  {trip.tariff}
                </span>
                <span className="text-base font-black text-amber">{trip.price}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-amber" />
                <div className="w-px h-5 bg-border" />
                <div className="w-2.5 h-2.5 bg-amber rounded-sm" />
              </div>
              <div className="space-y-2 flex-1">
                <p className="text-base font-semibold leading-tight">{trip.from}</p>
                <p className="text-base font-semibold leading-tight">{trip.to}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="User" size={13} />
              <span>{trip.driver}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
