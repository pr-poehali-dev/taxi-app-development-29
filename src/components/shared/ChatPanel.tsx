import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

export interface ChatMessage {
  id: number;
  from: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Props {
  title: string;
  subtitle?: string;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  encryptedBadge?: boolean;
}

export default function ChatPanel({ title, subtitle, messages, onSend, encryptedBadge = true }: Props) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Chat header */}
      <div className="border-b border-border px-5 py-3 flex items-center justify-between">
        <div>
          <div className="text-base font-bold">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        {encryptedBadge && (
          <div className="flex items-center gap-1.5 text-xs text-teal">
            <Icon name="Lock" size={13} />
            <span className="font-medium">E2E</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-12">
            Сообщений пока нет
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 animate-slide-up ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
            {!msg.isMe && (
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground mt-0.5">
                {msg.from[0]}
              </div>
            )}
            <div className={`max-w-[78%] space-y-1 ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
              {!msg.isMe && <span className="text-xs text-muted-foreground px-1">{msg.from}</span>}
              <div className={`px-4 py-3 rounded-2xl text-base leading-relaxed ${
                msg.isMe ? "bg-amber text-background rounded-tr-sm" : "bg-secondary text-foreground rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-[11px] text-muted-foreground font-mono px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3">
        <div className="flex-1 bg-secondary rounded-xl px-4 py-3 flex items-center">
          <input
            type="text"
            placeholder="Сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-11 h-11 bg-amber rounded-xl flex items-center justify-center hover:bg-amber/90 transition-colors disabled:opacity-30 flex-shrink-0"
        >
          <Icon name="Send" size={18} className="text-background" />
        </button>
      </div>
    </div>
  );
}
