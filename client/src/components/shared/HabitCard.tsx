import React, { useState } from 'react';
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
  const [localHabit, setLocalHabit] = useState(habit);
  const [isTracked, setIsTracked] = useState(false);


  const handleTrack = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await trackHabit(localHabit._id, localHabit.goal.value, "test creating log via habit card");
    if (result) {
      console.log(`${localHabit.name} tracked successfully`);
      setIsTracked(true);
      setLocalHabit(result.updatedHabit);
      onHabitUpdate(result.updatedHabit);
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
        {localHabit.goal && (
          <p className="habit-card__goal">
            {localHabit.goal.type} {localHabit.goal.value} {localHabit.goal.unit}
          </p>
        )}
        {localHabit.streak && localHabit.streak.current > 0 && (
          <p className="habit-card__streak">Current streak: {localHabit.streak.current} days</p>
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