import { useState } from "react";
import AppShell from "@/components/shared/AppShell";
import PassengerOrder from "./PassengerOrder";
import PassengerHistory from "./PassengerHistory";
import PassengerProfile from "./PassengerProfile";
import PassengerSupport from "./PassengerSupport";

const TABS = [
  { id: "order", icon: "MapPin", label: "Заказ" },
  { id: "history", icon: "Clock", label: "История" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "chat", icon: "MessageCircle", label: "Поддержка" },
];

interface Props { onBack: () => void; }

export default function PassengerApp({ onBack }: Props) {
  const [tab, setTab] = useState("order");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  return (
    <AppShell
      title="Манул"
      subtitle="Пассажир"
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
      onBack={onBack}
    >
      {tab === "order" && <PassengerOrder onOrderPlaced={(id) => setActiveOrderId(id)} activeOrderId={activeOrderId} onCancelOrder={() => setActiveOrderId(null)} />}
      {tab === "history" && <PassengerHistory />}
      {tab === "profile" && <PassengerProfile />}
      {tab === "chat" && <PassengerSupport />}
    </AppShell>
  );
}
