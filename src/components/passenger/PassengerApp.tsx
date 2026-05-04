import { useState } from "react";
import AppShell from "@/components/shared/AppShell";
import PassengerOrder from "./PassengerOrder";
import PassengerHistory from "./PassengerHistory";
import PassengerSupport from "./PassengerSupport";

const TABS = [
  { id: "order", icon: "MapPin", label: "Заказ" },
  { id: "history", icon: "Clock", label: "История" },
  { id: "chat", icon: "MessageCircle", label: "Поддержка" },
];

interface Props { onBack: () => void; }

export default function PassengerApp({ onBack }: Props) {
  const [tab, setTab] = useState("order");

  return (
    <AppShell
      title="Манул"
      subtitle="Пассажир"
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
      onBack={onBack}
    >
      {tab === "order" && <PassengerOrder />}
      {tab === "history" && <PassengerHistory />}
      {tab === "chat" && <PassengerSupport />}
    </AppShell>
  );
}
