import React from 'react';
import { Habit } from '../../@types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  isArchived: boolean;
  onArchive: (habit: Habit) => void;
  onReactivate: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  archiving?: boolean;
  onHabitUpdate: (updatedHabit: Habit) => void;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  isArchived,
  onArchive,
  onReactivate,
  onDelete,
  archiving,
  onHabitUpdate
}) => {
  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          isArchived={isArchived}
          onArchive={onArchive}
          onReactivate={onReactivate}
          onDelete={onDelete}
          archiving={archiving}
          onHabitUpdate={onHabitUpdate}
        />
      ))}
    </div>
  );
};

export default HabitList;