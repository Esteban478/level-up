import { Habit } from '../../@types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  isArchived: boolean;
  onArchive: (habit: Habit) => void;
  onReactivate: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onHabitUpdate: (updatedHabit: Habit) => void;
  isEditMode: boolean;
  isArchiveMode: boolean;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  isArchived,
  onArchive,
  onReactivate,
  onDelete,
  onHabitUpdate,
  isEditMode,
  isArchiveMode
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
          onHabitUpdate={onHabitUpdate}
          isEditMode={isEditMode}
          isArchiveMode={isArchiveMode}
        />
      ))}
    </div>
  );
};

export default HabitList;