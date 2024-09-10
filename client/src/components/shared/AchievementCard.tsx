import { Achievement } from '../../@types/achievement';
import '../../styles/AchievementCard.css';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <div className="achievement-card">
      <h3 className="achievement-card__title">{achievement.name}</h3>
      <p className="achievement-card__description">{achievement.description}</p>
      <p className="achievement-card__xp-reward">XP Reward: {achievement.xpReward}</p>
      <p className="achievement-card__date-earned">Earned on: {new Date(achievement.dateEarned).toLocaleDateString()}</p>
      {/* {achievement.icon && <img className="achievement-card__icon" src={achievement.icon} alt={`${achievement.name} icon`} />} */}
    </div>
  );
};

export default AchievementCard;