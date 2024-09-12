import { useEffect, useState } from 'react';
import { useActiveHabits } from '../hooks/habits/useActiveHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import { useTodayContext } from '../hooks/today/useToday';
import '../styles/TodayPage.css';

const TodayContent: React.FC = () => {
  const { habits, loading, error, refetch } = useActiveHabits();
  const { archiveHabit } = useArchiveHabit();
  const [habitToArchive, setHabitToArchive] = useState<Habit | null>(null);
  const { isEditMode, isArchiveMode, setIsArchiveMode } = useTodayContext();

  const handleArchive = async (habit: Habit) => {
    setHabitToArchive(habit);
  };

const confirmArchiveHabit = async () => {
  if (habitToArchive) {
    const success = await archiveHabit(habitToArchive._id, true);
    if (success) {
      await refetch();
      // Check if there are any active habits left
      if (habits.length === 1) {  // If this was the last active habit
        setIsArchiveMode(false);
      }
    }
    setHabitToArchive(null);
  }
};

  const handleHabitUpdate = () => {
    refetch();
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--is-edit-mode', isEditMode ? '1' : '0');
    document.documentElement.style.setProperty('--is-archive-mode', isArchiveMode ? '1' : '0');

    return () => {
      document.documentElement.style.removeProperty('--is-edit-mode');
      document.documentElement.style.removeProperty('--is-archive-mode');
    };
  }, [isEditMode, isArchiveMode]);

  if (loading) return <div>Loading habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="today-container" data-edit-mode={isEditMode} data-archive-mode={isArchiveMode}>
      {habits.length === 0 &&
        <div className="intro-container">
          <h2 className="today-title">Welcome aboard!</h2>
          <p>Use the top navigation to add or edit your habits.</p>
          <p>You can also archive them when you need a break.</p>
          <p>Let’s get started on your habit journey!</p>
        </div>
      }   
      <HabitList
        habits={habits}
        isArchived={false}
        onArchive={handleArchive}
        onReactivate={() => {}}
        onHabitUpdate={handleHabitUpdate}
        isEditMode={isEditMode}
        isArchiveMode={isArchiveMode}
      />
      <ConfirmationDialog
        isOpen={!!habitToArchive}
        message="Do you want to give this habit a break and archive it?"
        onConfirm={confirmArchiveHabit}
        onCancel={() => setHabitToArchive(null)}
      />
    </div>
  );
};

export default TodayContent;