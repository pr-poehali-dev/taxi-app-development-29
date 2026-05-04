import { useState } from "react";
import ChatPanel, { type ChatMessage } from "@/components/shared/ChatPanel";
import Icon from "@/components/ui/icon";

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const GENERAL_INIT: ChatMessage[] = [
  { id: 1, from: "С. Бурятов", text: "Привет всем! Как поток сегодня на Лениной?", time: "08:45", isMe: false },
  { id: 2, from: "В. Нимаев", text: "Нормально, пробок нет, только у вокзала чуть задержался.", time: "08:47", isMe: false },
  { id: 3, from: "Я", text: "Аэропортовое направление тоже чистое.", time: "08:50", isMe: true },
];

const SUPPORT_INIT: ChatMessage[] = [
  { id: 1, from: "Поддержка", text: "Добрый день, Александр! Как дела?", time: "09:00", isMe: false },
];

export default function DriverChats() {
  const [chatTab, setChatTab] = useState<"general" | "support">("general");
  const [general, setGeneral] = useState<ChatMessage[]>(GENERAL_INIT);
  const [support, setSupport] = useState<ChatMessage[]>(SUPPORT_INIT);

  const handleGeneralSend = (text: string) => {
    setGeneral((prev) => [...prev, { id: Date.now(), from: "Я", text, time: now(), isMe: true }]);
  };

  const handleSupportSend = (text: string) => {
    const t = now();
    setSupport((prev) => [...prev, { id: Date.now(), from: "Я", text, time: t, isMe: true }]);
    setTimeout(() => {
      setSupport((prev) => [...prev, { id: Date.now() + 1, from: "Поддержка", text: "Понял, разбираемся!", time: now(), isMe: false }]);
    }, 900);
  };

  return (
    <div className="animate-slide-up">
      <div className="px-5 pt-6 pb-3">
        <h2 className="text-2xl font-black">Чаты</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>

      {/* Tab switcher */}
      <div className="px-5 mb-4">
        <div className="flex bg-secondary rounded-xl p-1 gap-1">
          {([
            { id: "general", icon: "Users", label: "Общий чат" },
            { id: "support", icon: "Headphones", label: "Поддержка" },
          ] as { id: "general" | "support"; icon: string; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setChatTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                chatTab === t.id ? "bg-amber text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {chatTab === "general" && (
        <ChatPanel
          title="Общий чат водителей"
          subtitle="Манул · Забайкалье"
          messages={general}
          onSend={handleGeneralSend}
        />
      )}
      {chatTab === "support" && (
        <ChatPanel
          title="Служба поддержки"
          subtitle="Для водителей"
          messages={support}
          onSend={handleSupportSend}
        />
      )}
    </div>
  );
}
