import React from 'react';
import { Habit } from '../../@types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  isArchived: boolean;
  onArchive: (habit: Habit) => void;
  onReactivate: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  archiving: boolean;
}

const HabitList: React.FC<HabitListProps> = ({ habits, isArchived, onArchive, onReactivate, onDelete, archiving }) => {
  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <p>{isArchived ? "No archived habits." : "No active habits. Add some habits to get started!"}</p>
      ) : (
        habits.map(habit => (
          <HabitCard
            key={habit._id}
            habit={habit}
            isArchived={isArchived}
            onArchive={onArchive}
            onReactivate={onReactivate}
            onDelete={onDelete}
            archiving={archiving}
          />
        ))
      )}
    </div>
  );
};

export default HabitList;