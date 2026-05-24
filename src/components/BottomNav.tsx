type Tab = 'home' | 'map' | 'settings';

type BottomNavProps = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '★' },
  { id: 'map', label: 'Map', icon: '⌖' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-indigo-100 bg-white/95 px-4 py-2 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`rounded-2xl px-3 py-3 text-sm font-bold transition ${
                active
                  ? 'bg-quest-blue text-white shadow-soft'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="mr-1" aria-hidden="true">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
