import type { WordCard } from '../types';

type VocabularyCardsProps = {
  words: WordCard[];
};

export function VocabularyCards({ words }: VocabularyCardsProps) {
  return (
    <div className="space-y-3">
      {words.map((word) => (
        <article key={word.word} className="rounded-3xl bg-white p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-quest-ink">{word.word}</h3>
              <p className="mt-1 text-sm font-bold text-quest-blue">{word.meaning}</p>
            </div>
            <span className="rounded-2xl bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-600">Word</span>
          </div>
          <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">{word.example}</p>
        </article>
      ))}
    </div>
  );
}
