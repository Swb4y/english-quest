let voice: SpeechSynthesisVoice | null = null;

function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-US' && v.localService) ??
    voices.find((v) => v.lang === 'en-US') ??
    voices.find((v) => v.lang.startsWith('en')) ??
    null
  );
}

if ('speechSynthesis' in window) {
  voice = pickVoice();
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    voice = pickVoice();
  });
}

export const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

/** İngilizce metni yavaş ve net şekilde seslendirir. */
export function speak(text: string, rate = 0.85) {
  if (!speechSupported) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}
