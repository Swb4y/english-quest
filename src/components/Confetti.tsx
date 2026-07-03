const COLORS = ['#4f46e5', '#7c3aed', '#f59e0b', '#22c55e', '#38bdf8', '#fb7185'];
const PIECES = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 137.5) % 100}%`,
  delay: `${(i % 12) * 0.18}s`,
  color: COLORS[i % COLORS.length],
  size: 8 + (i % 3) * 4,
}));

export function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {PIECES.map((piece, i) => (
        <span
          key={i}
          className="absolute top-0 animate-confetti-fall rounded-sm"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size * 0.6,
          }}
        />
      ))}
    </div>
  );
}
