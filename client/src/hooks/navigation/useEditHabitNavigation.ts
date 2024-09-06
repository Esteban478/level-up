import { useNavigate, useLocation } from 'react-router-dom';
import { useDeleteHabit } from '../habits/useDeleteHabit';
import { useUpdateHabit } from '../habits/useUpdateHabit';
import { Habit } from '../../@types/habit';

export const useEditHabitNavigation = (habitId: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteHabit } = useDeleteHabit();
  const { updateHabit } = useUpdateHabit();
  const isNewHabit = location.state?.isNewHabit || false;

  const handleBack = async () => {
    if (isNewHabit) {
      await deleteHabit(habitId);
      navigate('/add-habit', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const handleSave = async (habit: Habit) => {
    const result = await updateHabit(habit);
    if (result) {
      navigate('/today');
    } else {
      console.error('Failed to update habit');
    }
  };

  return { handleBack, handleSave, isNewHabit };
};