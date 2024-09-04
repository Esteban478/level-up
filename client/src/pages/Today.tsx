import React, { useState } from 'react';
import { useActiveHabits } from '../hooks/habits/useActiveHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';
import HabitList from '../components/shared/HabitList';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';

const Today: React.FC = () => {
  const { habits, loading, error, refetch } = useActiveHabits();
  const { archiveHabit, loading: archiving } = useArchiveHabit();
  const [habitToArchive, setHabitToArchive] = useState<Habit | null>(null);

  const handleArchive = async (habit: Habit) => {
    setHabitToArchive(habit);
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

  if (loading) return <div>Loading habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="today-container">
      <h2 className="today-title">Today's Habits</h2>
      <HabitList
        habits={habits}
        isArchived={false}
        onArchive={handleArchive}
        onReactivate={() => {}}
        archiving={archiving}
      />
      <ConfirmationDialog
        isOpen={!!habitToArchive}
        message="Are you sure you want to archive this habit?"
        onConfirm={confirmArchiveHabit}
        onCancel={() => setHabitToArchive(null)}
      />
    </div>
  );
};

export default Today;