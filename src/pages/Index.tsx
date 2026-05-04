import { useState } from "react";
import WelcomePage from "@/components/WelcomePage";
import PassengerApp from "@/components/passenger/PassengerApp";
import DriverApp from "@/components/driver/DriverApp";
import AdminApp from "@/components/admin/AdminApp";

export type Role = "passenger" | "driver" | "admin" | null;

export default function Index() {
  const [role, setRole] = useState<Role>(null);

  if (!role) return <WelcomePage onSelectRole={setRole} />;
  if (role === "passenger") return <PassengerApp onBack={() => setRole(null)} />;
  if (role === "driver") return <DriverApp onBack={() => setRole(null)} />;
  if (role === "admin") return <AdminApp onBack={() => setRole(null)} />;
  return null;
}
