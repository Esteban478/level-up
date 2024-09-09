import React, { useState } from 'react';
import { useArchivedHabits } from '../hooks/habits/useArchivedHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import { useDeleteHabit } from '../hooks/habits/useDeleteHabit';

const Archive: React.FC = () => {
  const { habits, loading, error, refetch } = useArchivedHabits();
  const { archiveHabit, loading: archiving } = useArchiveHabit();
  const { deleteHabit } = useDeleteHabit();
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [habitToReactivate, setHabitToReactivate] = useState<Habit | null>(null);

  const handleReactivate = async (habit: Habit) => {
    setHabitToReactivate(habit);
  };

  const confirmReactivateHabit = async () => {
    if (habitToReactivate) {
      const success = await archiveHabit(habitToReactivate._id, false);
      if (success) {
        await refetch();
      }
      setHabitToReactivate(null);
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

  const handleDelete = async (habit: Habit) => {
    setHabitToDelete(habit);
  };
  
  const handleHabitUpdate = () => {
    refetch();
  };

  if (loading) return <div>Loading archived habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="archive-container">
      <HabitList
        habits={habits}
        isArchived={true}
        onArchive={() => {}}
        onReactivate={handleReactivate}
        onDelete={handleDelete}
        archiving={archiving}
        onHabitUpdate={handleHabitUpdate}
      />
      <ConfirmationDialog
        isOpen={!!habitToReactivate}
        message="Are you sure you want to reactivate this habit?"
        onConfirm={confirmReactivateHabit}
        onCancel={() => setHabitToReactivate(null)}
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

export default Archive;