import React, { useState } from 'react';
import { useArchivedHabits } from '../hooks/habits/useArchivedHabits';
import { useArchiveHabit } from '../hooks/habits/useArchiveHabit';
import { Habit } from '../@types/habit';

const Archive: React.FC = () => {
  const { habits, loading, error, refetch } = useArchivedHabits();
  const { archiveHabit, loading: archiving } = useArchiveHabit();
  const [confirmReactivate, setConfirmReactivate] = useState<string | null>(null);

  const handleReactivate = async (habit: Habit) => {
    setConfirmReactivate(habit._id);
  };

  const confirmReactivateHabit = async () => {
    if (confirmReactivate) {
        const success = await archiveHabit(confirmReactivate, false);
      if (success) {
        await refetch();
      }
      setConfirmReactivate(null);
    }
  };

  if (loading) return <div>Loading archived habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {habits.length === 0 ? (
        <p>No archived habits.</p>
      ) : (
        habits.map(habit => (
          <div key={habit._id}>
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
            <button onClick={() => handleReactivate(habit)} disabled={archiving}>
              Reactivate
            </button>
            {confirmReactivate === habit._id && (
              <div>
                <p>Are you sure you want to reactivate this habit?</p>
                <button onClick={confirmReactivateHabit}>Yes</button>
                <button onClick={() => setConfirmReactivate(null)}>No</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Archive;