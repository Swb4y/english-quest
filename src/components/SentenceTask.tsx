import type { SentenceTask as SentenceTaskType } from '../types';

type SentenceTaskProps = {
  task: SentenceTaskType;
  value: string;
  onChange: (value: string) => void;
};

export function SentenceTask({ task, value, onChange }: SentenceTaskProps) {
  return (
    <article className="rounded-3xl bg-white p-4 shadow-soft">
      <p className="text-sm font-black text-slate-500">Writing Task</p>
      <h3 className="mt-2 text-lg font-black leading-7 text-quest-ink">{task.prompt}</h3>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder="Type your sentence here..."
        className="mt-4 w-full resize-none rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-base font-bold text-quest-ink outline-none ring-quest-blue/20 transition focus:border-quest-blue focus:ring-4"
      />
      <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm leading-6 text-amber-800">
        Sample: {task.sampleAnswer}
      </p>
    </article>
  );
}
