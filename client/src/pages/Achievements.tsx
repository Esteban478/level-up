import { useMemo } from 'react';
import { useAchievements } from '../hooks/achievements/useAchievements';
import AchievementCard from '../components/shared/AchievementCard';
import '../styles/Achievements.css';

const Achievements: React.FC = () => {
  const { achievements, isLoading, error } = useAchievements();

  const groupedAchievements = useMemo(() => {
    return achievements.reduce((acc, achievement) => {
      const type = achievement.type.replace('_', ' ');
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(achievement);
      return acc;
    }, {} as Record<string, typeof achievements>);
  }, [achievements]);

  if (isLoading) return <div>Loading achievements...</div>;
  if (error) return <div>Error: {error}</div>;
  if (achievements.length === 0) return <p>No achievements earned yet. Keep up the good work!</p>;

  return (
    <div className="achievements-container">
      {Object.entries(groupedAchievements).map(([type, typeAchievements]) => (
        <div key={type} className="achievement-group">
          <h2 className="achievement-group-title">{type}</h2>
          <div className="achievement-list">
            {typeAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;