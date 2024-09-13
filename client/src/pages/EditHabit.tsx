import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHabit } from '../hooks/habits/useHabit';
import { useEditHabitNavigation } from '../hooks/navigation/useEditHabitNavigation';
import FullScreenLayout from '../components/layouts/FullScreenLayout';
import TextButton from '../components/shared/ConfirmButton';
import GoalCustomizer from '../components/GoalCustomizer';
import PublicToggle from '../components/PublicToggle';
import { Habit } from '../@types/habit';
import '../styles/EditHabit.css';
import TipDisplay from '../components/TipDisplay';

const EditHabit: React.FC = () => {
  const { habitId } = useParams<{ habitId: string }>();
  const { habit, loading, error } = useHabit(habitId);
  const [editedHabit, setEditedHabit] = useState<Habit | null>(null);
  const { handleSave, isNewHabit } = useEditHabitNavigation(habitId!);

  useEffect(() => {
    if (habit) {
      setEditedHabit(habit);
    }
  }, [habit]);

  const onSave = () => {
    if (editedHabit) {
      const habitToUpdate = {
        ...editedHabit,
        customizations: {
          ...editedHabit.customizations,
          goal: editedHabit.goal,
          frequency: editedHabit.frequency,
          isPublic: editedHabit.isPublic
        }
      };
      handleSave(habitToUpdate);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!editedHabit) return <div>No habit found</div>;

  return (
    <FullScreenLayout
      title={isNewHabit ? "Add Habit" : "Edit Habit"}
      backButton
      rightAction={<TextButton text="Save" onClick={onSave} />}
    >
      <div className='edit-habit'>
        <h1>{editedHabit.name}</h1>
        <p>{editedHabit.description}</p>
        <TipDisplay/>
        <GoalCustomizer
          goal={editedHabit.goal}
          onChange={(goal) => setEditedHabit({ ...editedHabit, goal })}
        />
        <PublicToggle
          isPublic={editedHabit.isPublic}
          onChange={(isPublic) => setEditedHabit({ ...editedHabit, isPublic })}
        />
      </div>
    </FullScreenLayout>
  );
};

export default EditHabit;