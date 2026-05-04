import { useState } from "react";
import ChatPanel, { type ChatMessage } from "@/components/shared/ChatPanel";

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const INITIAL: ChatMessage[] = [
  { id: 1, from: "Поддержка", text: "Здравствуйте! Чем могу помочь?", time: "09:00", isMe: false },
];

export default function PassengerSupport() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL);

  const handleSend = (text: string) => {
    const t = now();
    setMessages((prev) => [...prev, { id: Date.now(), from: "Я", text, time: t, isMe: true }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "Поддержка", text: "Принято! Разбираемся, ответим в течение нескольких минут.", time: now(), isMe: false },
      ]);
    }, 1000);
  };

  return (
    <div className="px-0 py-0 animate-slide-up">
      <div className="px-5 pt-6 pb-3">
        <h2 className="text-2xl font-black">Чат с поддержкой</h2>
        <div className="w-10 h-1 bg-amber rounded-full mt-2" />
      </div>
      <ChatPanel
        title="Служба поддержки"
        subtitle="Обычно отвечаем за 5 минут"
        messages={messages}
        onSend={handleSend}
      />
    </div>
  );
}
