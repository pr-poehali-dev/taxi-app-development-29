import { useState } from "react";
import WelcomePage from "@/components/WelcomePage";
import PassengerApp from "@/components/passenger/PassengerApp";
import DriverApp from "@/components/driver/DriverApp";
import AdminApp from "@/components/admin/AdminApp";
import AdminLogin from "@/components/admin/AdminLogin";

export type Role = "passenger" | "driver" | "admin" | null;

export default function Index() {
  const [role, setRole] = useState<Role>(null);
  const [adminAuth, setAdminAuth] = useState(false);

  const handleSelectRole = (r: Role) => {
    if (r === "admin") {
      setRole("admin");
      setAdminAuth(false);
    } else {
      setRole(r);
    }
  };

  const handleBack = () => {
    setRole(null);
    setAdminAuth(false);
  };

  if (!role) return <WelcomePage onSelectRole={handleSelectRole} />;
  if (role === "passenger") return <PassengerApp onBack={handleBack} />;
  if (role === "driver") return <DriverApp onBack={handleBack} />;
  if (role === "admin") {
    if (!adminAuth) return <AdminLogin onSuccess={() => setAdminAuth(true)} onBack={handleBack} />;
    return <AdminApp onBack={handleBack} />;
  }
  return null;
}
