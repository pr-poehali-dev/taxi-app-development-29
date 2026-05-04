import Icon from "@/components/ui/icon";

interface Tab {
  id: string;
  icon: string;
  label: string;
}

interface Props {
  title: string;
  subtitle?: string;
  badge?: { text: string; color?: string };
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onBack: () => void;
  children: React.ReactNode;
}

export default function AppShell({ title, subtitle, badge, tabs, activeTab, onTabChange, onBack, children }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-5 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-amber transition-colors text-muted-foreground hover:text-foreground"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 bg-amber flex items-center justify-center rounded-lg flex-shrink-0">
            <span className="text-background font-black text-base">М</span>
          </div>
          <div>
            <div className="text-base font-bold tracking-wide leading-tight">{title}</div>
            {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
          </div>
        </div>
        {badge && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${badge.color || 'border-teal text-teal bg-teal/10'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {badge.text}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="animate-fade-in">{children}</div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card z-50">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition-all duration-200 relative ${
                activeTab === tab.id ? "text-amber" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-amber rounded-b-full" />
              )}
              <Icon name={tab.icon} size={19} />
              <span className="text-[10px] font-semibold uppercase tracking-wide">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}