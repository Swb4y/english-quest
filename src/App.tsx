import { useMemo, useState } from 'react';
import { BottomNav, type Tab } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { MapView } from './components/MapView';
import { ProfileView } from './components/ProfileView';
import { ReviewView } from './components/ReviewView';
import { UnitView } from './components/UnitView';
import { Welcome } from './components/Welcome';
import { units } from './data/units';
import { useProgress } from './hooks/useProgress';
import type { Unit } from './types';

export default function App() {
  const {
    progress,
    level,
    levelPercent,
    completedCount,
    unlockedUnitCount,
    start,
    completeUnit,
    recordReview,
    resetProgress,
  } = useProgress(units.length);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);

  const nextUnit = useMemo(
    () => units.find((unit) => !progress.completedUnitIds.includes(unit.id)),
    [progress.completedUnitIds],
  );

  if (!progress.started) {
    return <Welcome onStart={start} />;
  }

  if (activeUnit) {
    return (
      <UnitView
        unit={activeUnit}
        onExit={() => setActiveUnit(null)}
        onComplete={(correct, total) =>
          completeUnit({
            unitId: activeUnit.id,
            correct,
            total,
            wordEns: activeUnit.words.map((word) => word.en),
          })
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-quest-cream text-quest-ink">
      {activeTab === 'home' && (
        <HomeView
          progress={progress}
          level={level}
          levelPercent={levelPercent}
          completedCount={completedCount}
          totalUnits={units.length}
          nextUnit={nextUnit}
          onStart={setActiveUnit}
        />
      )}
      {activeTab === 'map' && (
        <MapView
          units={units}
          progress={progress}
          unlockedUnitCount={unlockedUnitCount}
          onStart={setActiveUnit}
        />
      )}
      {activeTab === 'review' && <ReviewView progress={progress} onFinish={recordReview} />}
      {activeTab === 'profile' && (
        <ProfileView progress={progress} level={level} onReset={resetProgress} />
      )}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
