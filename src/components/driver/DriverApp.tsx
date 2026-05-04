import { useState } from "react";
import AppShell from "@/components/shared/AppShell";
import DriverProfile from "./DriverProfile";
import DriverOrders from "./DriverOrders";
import DriverChats from "./DriverChats";

const TABS = [
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "orders", icon: "List", label: "Заказы" },
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
];

interface Props { onBack: () => void; }

export default function DriverApp({ onBack }: Props) {
  const [tab, setTab] = useState("profile");
  const [isOnline, setIsOnline] = useState(false);

  return (
    <AppShell
      title="Манул"
      subtitle="Водитель"
      badge={isOnline ? { text: "Свободен", color: "border-teal text-teal bg-teal/10" } : { text: "Занят", color: "border-muted-foreground text-muted-foreground bg-muted/20" }}
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
      onBack={onBack}
    >
      {tab === "profile" && <DriverProfile isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />}
      {tab === "orders" && <DriverOrders isOnline={isOnline} />}
      {tab === "chats" && <DriverChats />}
    </AppShell>
  );
}
