interface AchievementToastProps {
  name: string;
  description: string;
  xpReward: number;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ name, description, xpReward }) => {
  return (
    <div className="achievement-toast">
      <strong>Achievement Unlocked!</strong>
      <p>{name}</p>
      <p>{description}</p>
      <p>XP Reward: {xpReward}</p>
    </div>
  );
};

export default AchievementToast;