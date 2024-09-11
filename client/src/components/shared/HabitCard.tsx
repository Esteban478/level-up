import { useState } from 'react';
import { Habit } from '../../@types/habit';
import { useNavigate } from 'react-router-dom';
import { useTrackHabit } from '../../hooks/habits/useTrackHabit';
import '../../styles/HabitCard.css';

interface HabitCardProps {
  habit: Habit;
  isArchived: boolean;
  onArchive?: (habit: Habit) => void;
  onReactivate?: (habit: Habit) => void;
  onDelete?: (habit: Habit) => void;
  archiving?: boolean;
  onClick?: () => void;
  showActions?: boolean;
  onHabitUpdate?: (updatedHabit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  isArchived,
  onArchive,
  onReactivate,
  onDelete,
  archiving,
  onClick,
  showActions = true,
  onHabitUpdate
}) => {
  const navigate = useNavigate();
  const { trackHabit, isLoading, error } = useTrackHabit();
  const [isTracked, setIsTracked] = useState(habit.isTrackedToday);

  const handleTrack = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTracked) return; // Prevent tracking if already tracked

    const updatedHabit = await trackHabit(habit._id, habit.goal.value, "Habit tracked via habit card");
    if (updatedHabit) {
      setIsTracked(updatedHabit.isTrackedToday);
      if (onHabitUpdate) {
        onHabitUpdate(updatedHabit);
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-habit/${habit._id}`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div className="habit-card" onClick={handleCardClick}>
      <h3 className="habit-card__title">{habit.name}</h3>
      <p className="habit-card__description">{habit.description}</p>
      <div className="habit-card__details">
        {habit.goal && (
          <p className="habit-card__goal">
            {habit.goal.type} {habit.goal.value} {habit.goal.unit}
          </p>
        )}
        {habit.streak && habit.streak.current > 0 && (
          <p className="habit-card__streak">Current streak: {habit.streak.current} days</p>
        )}
      </div>
      {showActions && (
        <div className="habit-card__actions">
          <button
            className={`btn ${isTracked ? 'btn-success' : 'btn-primary'}`}
            onClick={handleTrack}
            disabled={isLoading || isTracked}
          >
            {isLoading ? 'Tracking...' : isTracked ? 'Tracked' : 'Track'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleEdit}
          >
            Edit
          </button>
          {onArchive && onReactivate && (
            <button
              className="btn btn-tertiary"
              onClick={() => isArchived ? onReactivate(habit) : onArchive(habit)}
              disabled={archiving}
            >
              {isArchived ? 'Reactivate' : 'Archive'}
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn-tertiary"
              onClick={() => onDelete(habit)}
            >
              Delete
            </button>
          )}
        </div>
      )}
      {error && <p className="habit-card__error">Error: {error}</p>}
    </div>
  );
};

export default HabitCard;