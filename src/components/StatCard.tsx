type StatCardProps = {
  label: string;
  value: string | number;
  tone: 'blue' | 'green' | 'gold' | 'rose';
};

const tones = {
  blue: 'bg-indigo-100 text-quest-blue',
  green: 'bg-emerald-100 text-emerald-700',
  gold: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
};

export function StatCard({ label, value, tone }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-soft">
      <span className={`inline-flex rounded-2xl px-3 py-1 text-xs font-black ${tones[tone]}`}>{label}</span>
      <strong className="mt-3 block text-2xl font-black text-quest-ink">{value}</strong>
    </div>
  );
}
