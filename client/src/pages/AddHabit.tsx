import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabitTemplates } from '../hooks/habits/useHabitTemplates';
import { useActiveHabits } from '../hooks/habits/useActiveHabits';
import { useArchivedHabits } from '../hooks/habits/useArchivedHabits';
import { Habit } from '../@types/habit';
import { useAuth } from '../hooks/useAuth';
import HabitCard from '../components/shared/HabitCard';
import FullScreenLayout from '../components/layouts/FullScreenLayout';
import BackButton from '../components/shared/BackButton';

const AddHabit: React.FC = () => {
  const { templates, loading: templatesLoading, error: templatesError } = useHabitTemplates();
  const { habits: activeHabits, loading: activeLoading } = useActiveHabits();
  const { habits: archivedHabits, loading: archivedLoading } = useArchivedHabits();
  const [addingHabit, setAddingHabit] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const filteredTemplates = useMemo(() => {
    if (!templates || !activeHabits || !archivedHabits) return [];
    const userHabitIds = new Set([
      ...activeHabits.map(h => h.habitId),
      ...archivedHabits.map(h => h.habitId)
    ]);
    return templates.filter(t => !userHabitIds.has(t.habitId));
  }, [templates, activeHabits, archivedHabits]);

  const handleAddHabit = async (template: Habit) => {
    setAddingHabit(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/habits`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template._id,
          customizations: {},
          isArchived: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add habit');
      }

      const newHabit = await response.json();
      navigate(`/edit-habit/${newHabit._id}`, { state: { isNewHabit: true } });
    } catch (err) {
      console.error('Error adding habit:', err);
    } finally {
      setAddingHabit(false);
    }
  };

  const groupHabits = (habits: Habit[]) => {
    const keystoneHabits = habits.filter(habit => habit.area === 'Keystone');
    const otherHabits = habits.filter(habit => habit.area !== 'Keystone').reduce((acc, habit) => {
      if (!acc[habit.area]) {
        acc[habit.area] = [];
      }
      acc[habit.area].push(habit);
      return acc;
    }, {} as Record<string, Habit[]>);

    return { keystoneHabits, otherHabits };
  };

  const handleBack = () => {
    navigate('/today');
  };

  if (templatesLoading || activeLoading || archivedLoading) return <div>Loading habits...</div>;
  if (templatesError) return <div>Error: {templatesError.message}</div>;

  const { keystoneHabits, otherHabits } = groupHabits(filteredTemplates);

  const sortedAreas = Object.keys(otherHabits).sort((a, b) => 
    otherHabits[b].length - otherHabits[a].length
  );

  return (
    <FullScreenLayout
      title={"Add Habit"}
      leftAction={<BackButton onClick={handleBack} />}
    >
      {addingHabit && <div>Adding habit...</div>}
      {keystoneHabits.length > 0 && (
        <>
          <h3>Keystone Habits</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {keystoneHabits.map(template => (
              <HabitCard
                key={template._id}
                habit={template}
                isArchived={false}
                onClick={() => handleAddHabit(template)}
                showActions={false}
              />
            ))}
          </div>
        </>
      )}
      {sortedAreas.map(area => (
        <React.Fragment key={area}>
          <h3>{area}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {otherHabits[area].map(template => (
              <HabitCard
                key={template._id}
                habit={template}
                isArchived={false}
                onClick={() => handleAddHabit(template)}
                showActions={false}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </FullScreenLayout>
  );
};

export default AddHabit;