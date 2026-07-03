export type Tab = 'home' | 'map' | 'review' | 'profile';

type BottomNavProps = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: 'home', label: 'Ana Sayfa', emoji: '🏠' },
  { id: 'map', label: 'Yolculuk', emoji: '🗺️' },
  { id: 'review', label: 'Tekrar', emoji: '🔁' },
  { id: 'profile', label: 'Profil', emoji: '⭐' },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-indigo-100 bg-white/95 backdrop-blur safe-bottom">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 px-4 pt-2">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-[11px] font-extrabold transition ${
                active ? 'bg-quest-blue/10 text-quest-blue' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className={`text-xl ${active ? 'animate-bounce-soft' : ''}`}>{tab.emoji}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
