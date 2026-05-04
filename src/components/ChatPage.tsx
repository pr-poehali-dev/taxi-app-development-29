import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Message = {
  id: number;
  from: "passenger" | "driver";
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  { id: 1, from: "driver", text: "Добрый день. Выезжаю к вам, буду через 4 минуты.", time: "09:12" },
  { id: 2, from: "passenger", text: "Хорошо, я у главного входа.", time: "09:13" },
  { id: 3, from: "driver", text: "Понял, подъеду к центральному крыльцу. Автомобиль — тёмно-синий Mercedes.", time: "09:13" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "passenger", text: input.trim(), time },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "driver", text: "Принял, понятно.", time },
      ]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* Driver info */}
      <div className="border-b border-border px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={18} className="text-muted-foreground" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Александр Громов</div>
          <div className="text-xs text-muted-foreground font-mono-plex">ГА 7423 МО · ★ 4.97</div>
        </div>
        <button className="border border-border p-2 hover:border-gold transition-colors">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Status bar */}
      <div className="bg-gold/10 border-b border-gold/20 px-6 py-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
        <span className="text-xs font-mono-plex text-gold uppercase tracking-widest">Водитель в пути · ~3 мин</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-slide-up ${msg.from === "passenger" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.from === "driver" && (
              <div className="w-7 h-7 bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="User" size={12} className="text-muted-foreground" />
              </div>
            )}
            <div className={`max-w-[75%] space-y-1 ${msg.from === "passenger" ? "items-end" : "items-start"} flex flex-col`}>
              <div
                className={`px-4 py-3 text-sm leading-relaxed ${
                  msg.from === "passenger"
                    ? "bg-gold text-background"
                    : "bg-secondary text-foreground border border-border"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] font-mono-plex text-muted-foreground">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3">
        <input
          type="text"
          placeholder="Сообщение водителю..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-10 h-10 bg-gold flex items-center justify-center hover:bg-amber-400 transition-colors disabled:opacity-30"
        >
          <Icon name="Send" size={16} className="text-background" />
        </button>
      </div>
    </div>
  );
}
