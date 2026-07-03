import { useState } from 'react';
import { speak, speechSupported } from '../utils/speech';

type SpeakButtonProps = {
  text: string;
  size?: 'sm' | 'lg';
  className?: string;
};

export function SpeakButton({ text, size = 'sm', className = '' }: SpeakButtonProps) {
  const [playing, setPlaying] = useState(false);

  if (!speechSupported) return null;

  function play(event: React.MouseEvent) {
    event.stopPropagation();
    speak(text);
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 900);
  }

  const sizeClasses =
    size === 'lg'
      ? 'h-14 w-14 text-2xl'
      : 'h-10 w-10 text-lg';

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`"${text}" telaffuzunu dinle`}
      className={`inline-flex items-center justify-center rounded-full bg-quest-blue/10 text-quest-blue transition hover:bg-quest-blue/20 active:scale-90 ${playing ? 'animate-wiggle bg-quest-blue text-white' : ''} ${sizeClasses} ${className}`}
    >
      🔊
    </button>
  );
}
