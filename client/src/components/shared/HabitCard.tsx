import React from 'react';
import { Habit } from '../../@types/habit';
import '../../styles/HabitCard.css';
import { useNavigate } from 'react-router-dom';

interface HabitCardProps {
  habit: Habit;
  isArchived: boolean;
  onArchive?: (habit: Habit) => void;
  onReactivate?: (habit: Habit) => void;
  onDelete?: (habit: Habit) => void;
  archiving?: boolean;
  onClick?: () => void;
  showActions?: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ 
  habit, 
  isArchived, 
  onArchive, 
  onReactivate,
  onDelete,
  archiving, 
  onClick,
  showActions = true
}) => {
  const navigate = useNavigate();

  const handleTrack = () => {
    console.log(`${habit.name} tracked`);
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
            {habit.goal.type} {habit.goal.value} {habit.goal.unit} ({habit.frequency.type})
          </p>
        )}
        {habit.streak && habit.streak.current > 0 && (
          <p className="habit-card__streak">Current streak: {habit.streak.current} days</p>
        )}
      </div>
      {showActions && (
        <div className="habit-card__actions">
          <button 
            className="btn btn-primary"
            onClick={handleTrack}
          >
            Track
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
    </div>
  );
};

export default HabitCard;