import { useState } from "react";
import OrderPage from "@/components/OrderPage";
import ProfilePage from "@/components/ProfilePage";
import ChatPage from "@/components/ChatPage";
import Icon from "@/components/ui/icon";

type Tab = "order" | "chat" | "profile";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("order");

  return (
    <div className="min-h-screen bg-background flex flex-col font-golos">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold flex items-center justify-center">
            <span className="text-background font-bold text-sm tracking-widest">A</span>
          </div>
          <div>
            <div className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">Atlas</div>
            <div className="text-[10px] font-mono-plex text-muted-foreground tracking-widest uppercase">Деловые поездки</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-muted-foreground font-mono-plex">Онлайн</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fade-in">
          {activeTab === "order" && <OrderPage />}
          {activeTab === "chat" && <ChatPage />}
          {activeTab === "profile" && <ProfilePage />}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-border bg-card">
        <div className="flex">
          {([
            { id: "order", icon: "MapPin", label: "Заказ" },
            { id: "chat", icon: "MessageSquare", label: "Связь" },
            { id: "profile", icon: "User", label: "Профиль" },
          ] as { id: Tab; icon: string; label: string }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-4 transition-all duration-200 relative
                ${activeTab === item.id
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {activeTab === item.id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold" />
              )}
              <Icon name={item.icon} size={20} />
              <span className="text-[10px] uppercase tracking-widest font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
