import { useState } from 'react';
import { Habit } from '../../@types/habit';
import { useNavigate } from 'react-router-dom';
import { useTrackHabit } from '../../hooks/habits/useTrackHabit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import '../../styles/HabitCard.css';

interface HabitCardProps {
  habit: Habit;
  isArchived: boolean;
  onArchive?: (habit: Habit) => void;
  onReactivate?: (habit: Habit) => void;
  onHabitUpdate?: (updatedHabit: Habit) => void;
  isEditMode?: boolean;
  isArchiveMode?: boolean;
  isTemplate?: boolean;
  onClick?: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  isArchived,
  onArchive,
  onReactivate,
  onHabitUpdate,
  isEditMode,
  isArchiveMode,
  isTemplate = false,
  onClick
}) => {
  const navigate = useNavigate();
  const { trackHabit, isLoading, error } = useTrackHabit();
  const [isTracked, setIsTracked] = useState(habit.isTrackedToday);

  const handleClick = async () => {
    if (onClick) {
      // This is for the Add Habit page
      onClick();
    } else if (isArchived && onReactivate) {
      onReactivate(habit);
    } else if (isEditMode) {
      navigate(`/edit-habit/${habit._id}`);
    } else if (isArchiveMode && onArchive) {
      onArchive(habit);
    } else if (!isTracked && !isArchived && !isTemplate) {
      const updatedHabit = await trackHabit(habit._id, habit.goal.value, "Habit tracked via habit card");
      if (updatedHabit) {
        setIsTracked(updatedHabit.isTrackedToday);
        if (onHabitUpdate) {
          onHabitUpdate(updatedHabit);
        }
      }
    }
  };

  return (
    <div 
      className={`habit-card ${isTracked ? 'tracked' : ''} ${isEditMode ? 'edit-mode' : ''} ${isArchiveMode ? 'archive-mode' : ''} ${isArchived ? 'archived' : ''} ${isTemplate ? 'template' : ''}`} 
      onClick={handleClick}
    >
      <h3 className="habit-card__title">{habit.name}</h3>
      <p className="habit-card__description">{habit.description}</p>
      <div className="habit-card__details">
        {habit.goal && (
          <p className="habit-card__goal">
            Goal: {habit.goal.type} {habit.goal.value} {habit.goal.unit}
          </p>
        )}
        {habit.streak && habit.streak.current > 0 && (
          <p className="habit-card__streak">Current streak: {habit.streak.current} days</p>
        )}
      </div>
      {isTracked && !isArchived && !isTemplate && (
        <div className="habit-card__tracked">
          <p>Tracked</p>
          <FontAwesomeIcon icon={faCheck} className="habit-card__check-icon" />
        </div>
      )}
      {isArchived && (
        <div className="habit-card__reactivate">
          <p>Reactivate</p>
          <FontAwesomeIcon icon={faUndo} className="habit-card__undo-icon" />
        </div>
      )}
      {isLoading && <p className="habit-card__loading">Tracking...</p>}
      {error && <p className="habit-card__error">Error: {error}</p>}
    </div>
  );
};

export default HabitCard;