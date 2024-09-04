import React from 'react';
import { Habit } from '../../@types/habit';
import '../../styles/HabitCard.css';

interface HabitCardProps {
  habit: Habit;
  isArchived: boolean;
  onArchive: (habit: Habit) => void;
  onReactivate: (habit: Habit) => void;
  archiving: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, isArchived, onArchive, onReactivate, archiving }) => {
  const handleTrack = () => {
    console.log(`${habit.name} tracked`);
  };

  const handleEdit = () => {
    console.log(`Open edit dialog for ${habit.name}`);
  };

  return (
    <div className="habit-card">
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
        <button 
          className="btn btn-tertiary"
          onClick={() => isArchived ? onReactivate(habit) : onArchive(habit)} 
          disabled={archiving}
        >
          {isArchived ? 'Reactivate' : 'Archive'}
        </button>
      </div>
    </div>
  );
};

export default HabitCard;