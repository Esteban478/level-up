import React, { useState } from 'react';
import { useArchivedHabits } from '../hooks/habits/useArchivedHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';

const Archive: React.FC = () => {
  const { habits, loading, error, refetch } = useArchivedHabits();
  const { archiveHabit, loading: archiving } = useArchiveHabit();
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

  if (loading) return <div>Loading archived habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="archive-container">
      <HabitList
        habits={habits}
        isArchived={true}
        onArchive={() => {}}
        onReactivate={handleReactivate}
        archiving={archiving}
      />
      <ConfirmationDialog
        isOpen={!!habitToReactivate}
        message="Are you sure you want to reactivate this habit?"
        onConfirm={confirmReactivateHabit}
        onCancel={() => setHabitToReactivate(null)}
      />
    </div>
  );
};

export default Archive;