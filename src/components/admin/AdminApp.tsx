import { useState } from "react";
import AppShell from "@/components/shared/AppShell";
import AdminOrders from "./AdminOrders";
import AdminDrivers from "./AdminDrivers";
import AdminTariffs from "./AdminTariffs";
import AdminChats from "./AdminChats";

const TABS = [
  { id: "orders", icon: "LayoutList", label: "Заказы" },
  { id: "drivers", icon: "Users", label: "Водители" },
  { id: "tariffs", icon: "Settings", label: "Тарифы" },
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
];

interface Props { onBack: () => void; }

export default function AdminApp({ onBack }: Props) {
  const [tab, setTab] = useState("orders");

  return (
    <AppShell
      title="Манул"
      subtitle="Администратор"
      badge={{ text: "Онлайн", color: "border-amber text-amber bg-amber/10" }}
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
      onBack={onBack}
    >
      {tab === "orders" && <AdminOrders />}
      {tab === "drivers" && <AdminDrivers />}
      {tab === "tariffs" && <AdminTariffs />}
      {tab === "chats" && <AdminChats />}
    </AppShell>
  );
}
