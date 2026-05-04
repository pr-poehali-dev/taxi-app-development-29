import { useState } from "react";
import ChatPanel, { type ChatMessage } from "@/components/shared/ChatPanel";
import Icon from "@/components/ui/icon";

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const GENERAL_INIT: ChatMessage[] = [
  { id: 1, from: "А. Громов", text: "Добрый день, Лена! Сколько сейчас заказов?", time: "08:50", isMe: false },
  { id: 2, from: "С. Бурятов", text: "Привет коллеги, сегодня погода хорошая — поток должен быть.", time: "08:52", isMe: false },
];

const SUPPORT_INIT: ChatMessage[] = [
  { id: 1, from: "И. Петров", text: "Помогите! Водитель не приехал, заказ висит 30 минут.", time: "09:10", isMe: false },
  { id: 2, from: "О. Чернова", text: "У меня проблема с оплатой, списали лишнее.", time: "09:15", isMe: false },
];

export default function AdminChats() {
  const [chatTab, setChatTab] = useState<"general" | "support">("support");
  const [general, setGeneral] = useState<ChatMessage[]>(GENERAL_INIT);
  const [support, setSupport] = useState<ChatMessage[]>(SUPPORT_INIT);

  const handleGeneralSend = (text: string) => {
    setGeneral((prev) => [...prev, { id: Date.now(), from: "Администратор", text, time: now(), isMe: true }]);
  };
  const handleSupportSend = (text: string) => {
    setSupport((prev) => [...prev, { id: Date.now(), from: "Администратор", text, time: now(), isMe: true }]);
  };

  const unread = support.filter((m) => !m.isMe).length;

  return (
    <div className="animate-slide-up">
      <div className="px-5 pt-6 pb-3">
        <h2 className="text-2xl font-black">Чаты</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      <div className="px-5 mb-4">
        <div className="flex bg-secondary rounded-xl p-1 gap-1">
          {([
            { id: "support", icon: "Headphones", label: "Поддержка", badge: unread },
            { id: "general", icon: "Users", label: "Водители" },
          ] as { id: "general" | "support"; icon: string; label: string; badge?: number }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setChatTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all relative ${
                chatTab === t.id ? "bg-amber text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
              {t.badge && t.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {chatTab === "general" && (
        <ChatPanel
          title="Общий чат водителей"
          subtitle="Управление · вы модератор"
          messages={general}
          onSend={handleGeneralSend}
        />
      )}
      {chatTab === "support" && (
        <ChatPanel
          title="Чат поддержки"
          subtitle="Обращения пользователей"
          messages={support}
          onSend={handleSupportSend}
        />
      )}
    </div>
  );
}
