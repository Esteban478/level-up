import { useState } from 'react';
import { useArchivedHabits } from '../hooks/habits/useArchivedHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';

const Archive: React.FC = () => {
  const { habits, loading, error, refetch } = useArchivedHabits();
  const { archiveHabit } = useArchiveHabit();
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

  const handleHabitUpdate = () => {
    refetch();
  };

  if (loading) return <div>Loading archived habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="archive-container">
      {habits.length === 0 ? (
        <div className="archive-empty">
          <p>Your habit archive is currently empty.</p>
          <p>You can archive habits to pause tracking and reactivate them later with a single click.</p>
          <p>Use the archive feature to manage seasonal habits or take breaks without losing your progress.</p>
        </div>
      ) : (
        <HabitList
          habits={habits}
          isArchived={true}
          isEditMode={false}
          isArchiveMode={false}
          onArchive={() => {}}
          onReactivate={handleReactivate}
          onHabitUpdate={handleHabitUpdate}
        />
      )}
      <ConfirmationDialog
        isOpen={!!habitToReactivate}
        message="Want to jump back on the habit train? All aboard!"
        onConfirm={confirmReactivateHabit}
        onCancel={() => setHabitToReactivate(null)}
      />
    </div>
  );
};

export default Archive;