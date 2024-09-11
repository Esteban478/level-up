import { useEffect, useState } from 'react';
import { useActiveHabits } from '../hooks/habits/useActiveHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import { useDeleteHabit } from '../hooks/habits/useDeleteHabit';
import { useTodayContext } from '../hooks/today/useToday';
import '../styles/TodayPage.css';

const TodayContent: React.FC = () => {
  const { habits, loading, error, refetch } = useActiveHabits();
  const { archiveHabit } = useArchiveHabit();
  const { deleteHabit } = useDeleteHabit();
  const [habitToArchive, setHabitToArchive] = useState<Habit | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const { isEditMode, isArchiveMode, setIsArchiveMode } = useTodayContext();

  const handleArchive = async (habit: Habit) => {
    setHabitToArchive(habit);
  };

  const handleDelete = async (habit: Habit) => {
    setHabitToDelete(habit);
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

  const confirmDeleteHabit = async () => {
    if (habitToDelete) {
      const success = await deleteHabit(habitToDelete._id);
      if (success) {
        await refetch();
      }
      setHabitToDelete(null);
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
      {habits.length === 0 && <h2 className="today-title">Start adding habits to track</h2>}   
      <HabitList
        habits={habits}
        isArchived={false}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onReactivate={() => {}}
        onHabitUpdate={handleHabitUpdate}
        isEditMode={isEditMode}
        isArchiveMode={isArchiveMode}
      />
      <ConfirmationDialog
        isOpen={!!habitToArchive}
        message="Are you sure you want to archive this habit?"
        onConfirm={confirmArchiveHabit}
        onCancel={() => setHabitToArchive(null)}
      />
      <ConfirmationDialog
        isOpen={!!habitToDelete}
        message="Are you sure you want to delete this habit?"
        onConfirm={confirmDeleteHabit}
        onCancel={() => setHabitToDelete(null)}
      />
    </div>
  );
};

export default TodayContent;