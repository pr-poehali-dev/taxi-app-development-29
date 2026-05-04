import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

export interface RideChatMessage {
  id: number;
  text: string;
  time: string;
  isMe: boolean;
}

interface Props {
  isPassenger: boolean;
  driverName?: string;
  passengerName?: string;
  onClose: () => void;
}

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const DRIVER_RESPONSES = [
  "Понял, уже еду!",
  "Хорошо, буду вовремя.",
  "Принято!",
  "Ок, жду вас.",
];

export default function RideChat({ isPassenger, driverName = "А. Громов", passengerName = "Пассажир", onClose }: Props) {
  const [messages, setMessages] = useState<RideChatMessage[]>([
    { id: 1, text: isPassenger ? "Добрый день! Буду у вас через 3 минуты." : "Добрый день! Я у главного входа.", time: now(), isMe: false },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const t = now();
    setMessages((prev) => [...prev, { id: Date.now(), text: input.trim(), time: t, isMe: true }]);
    setInput("");
    if (isPassenger) {
      setTimeout(() => {
        const resp = DRIVER_RESPONSES[Math.floor(Math.random() * DRIVER_RESPONSES.length)];
        setMessages((prev) => [...prev, { id: Date.now() + 1, text: resp, time: now(), isMe: false }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-3 flex items-center gap-3">
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
          <Icon name="ChevronLeft" size={18} />
        </button>
        <div className="flex-1">
          <div className="text-sm font-bold">{isPassenger ? `Водитель: ${driverName}` : `Пассажир: ${passengerName}`}</div>
          <div className="flex items-center gap-1.5 text-xs text-teal">
            <Icon name="Lock" size={10} />
            <span>E2E шифрование</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span className="text-xs text-teal font-semibold">В поездке</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 animate-slide-up ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`max-w-[80%] space-y-1 ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.isMe ? "bg-amber text-background rounded-tr-sm" : "bg-secondary text-foreground rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground font-mono px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3">
        <div className="flex-1 bg-secondary rounded-xl px-4 py-2.5 flex items-center">
          <input
            type="text"
            placeholder="Сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-10 h-10 bg-amber rounded-xl flex items-center justify-center hover:bg-amber/90 transition-colors disabled:opacity-30 flex-shrink-0"
        >
          <Icon name="Send" size={16} className="text-background" />
        </button>
      </div>
    </div>
  );
}
