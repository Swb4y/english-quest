type WelcomeProps = {
  onStart: () => void;
};

const features = [
  { emoji: '🐣', title: 'Sıfırdan başla', text: 'Hiç İngilizce bilmene gerek yok. Her şey Türkçe anlatılır.' },
  { emoji: '🔊', title: 'Dinle ve öğren', text: 'Her kelimenin telaffuzunu istediğin kadar dinle.' },
  { emoji: '🎮', title: 'Oyun gibi', text: 'Puan topla, seri yap, rozetler kazan. Ceza yok, stres yok.' },
  { emoji: '🐢', title: 'Kendi hızında', text: 'İstediğin zaman, istediğin kadar. Acele eden yok.' },
];

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <main className="min-h-screen bg-hero px-5 py-10">
      <section className="mx-auto flex min-h-[85vh] max-w-md flex-col justify-center">
        <div className="text-center animate-pop-in">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-quest text-5xl shadow-soft animate-bounce-soft">
            🦉
          </div>
          <h1 className="mt-6 text-4xl font-black text-quest-ink">English Quest</h1>
          <p className="mt-3 text-lg font-semibold leading-7 text-slate-600">
            Sıfırdan İngilizce öğrenme maceran
            <br />
            burada başlıyor! 🚀
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-3xl border border-indigo-100 bg-white p-4 shadow-card animate-slide-up"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <span className="text-3xl">{feature.emoji}</span>
              <div>
                <h2 className="text-base font-black text-quest-ink">{feature.title}</h2>
                <p className="text-sm leading-5 text-slate-500">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-8 w-full rounded-2xl bg-gradient-quest px-5 py-4 text-lg font-black text-white shadow-soft transition active:scale-95"
        >
          Haydi Başlayalım! 🎉
        </button>
        <p className="mt-3 text-center text-xs font-semibold text-slate-400">
          Ücretsiz • İnternetsiz çalışır • İlerlemen bu cihazda saklanır
        </p>
      </section>
    </main>
  );
}
