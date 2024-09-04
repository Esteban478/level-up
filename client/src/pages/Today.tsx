import React, { useState } from 'react';
import { useActiveHabits } from '../hooks/habits/useActiveHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';

const Today: React.FC = () => {
  const { habits, loading, error, refetch } = useActiveHabits();
  const { archiveHabit, loading: archiving } = useArchiveHabit();
  const [confirmArchive, setConfirmArchive] = useState<string | null>(null);

  const handleArchive = async (habit: Habit) => {
    setConfirmArchive(habit._id);
  };

  const confirmArchiveHabit = async () => {
    if (confirmArchive) {
      const success = await archiveHabit(confirmArchive, true);
      if (success) {
        await refetch();
      }
      setConfirmArchive(null);
    }
  };

  if (loading) return <div>Loading habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Today's Habits</h2>
      {habits.length === 0 ? (
        <p>No active habits. Add some habits to get started!</p>
      ) : (
        habits.map(habit => (
          <div key={habit._id}>
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
            <button onClick={() => handleArchive(habit)} disabled={archiving}>
              Archive
            </button>
            {confirmArchive === habit._id && (
              <div>
                <p>Are you sure you want to archive this habit?</p>
                <button onClick={confirmArchiveHabit}>Yes</button>
                <button onClick={() => setConfirmArchive(null)}>No</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Today;