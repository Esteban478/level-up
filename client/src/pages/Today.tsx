import React, { useState } from 'react';
import { useActiveHabits } from '../hooks/habits/useActiveHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import { useDeleteHabit } from '../hooks/habits/useDeleteHabit';

const Today: React.FC = () => {
  const { habits, loading, error, refetch } = useActiveHabits();
  const { archiveHabit, loading: archiving } = useArchiveHabit();
  const { deleteHabit } = useDeleteHabit();
  const [habitToArchive, setHabitToArchive] = useState<Habit | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

  const handleArchive = async (habit: Habit) => {
    setHabitToArchive(habit);
  };

  const handleDelete = async (habit: Habit) => {
    setHabitToDelete(habit);
    console.log(habit);
    console.log(habitToDelete)
  };

  const confirmArchiveHabit = async () => {
    if (habitToArchive) {
      const success = await archiveHabit(habitToArchive._id, true);
      if (success) {
        await refetch();
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

  if (loading) return <div>Loading habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="today-container">
      <h2 className="today-title">Today's Habits</h2>
      <HabitList
        habits={habits}
        isArchived={false}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onReactivate={() => {}}
        archiving={archiving}
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

export default Today;