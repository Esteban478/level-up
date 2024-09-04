import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabitTemplates } from '../hooks/habits/useHabitTemplates';
import { Habit } from '../@types/habit';
import { useAuth } from '../hooks/useAuth';

const AddHabit: React.FC = () => {
  const { templates, loading, error } = useHabitTemplates();
  const [addingHabit, setAddingHabit] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

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
          customizations: {} // You can add customizations here if needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add habit');
      }

      // Habit added successfully, navigate to Today page
      navigate('/today');
    } catch (err) {
      console.error('Error adding habit:', err);
      // You might want to show an error message to the user here
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

  if (loading) return <div>Loading habits...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { keystoneHabits, otherHabits } = groupHabits(templates);

  // Sort areas by number of habits (descending)
  const sortedAreas = Object.keys(otherHabits).sort((a, b) => 
    otherHabits[b].length - otherHabits[a].length
  );

  return (
    <div>
      {addingHabit && <div>Adding habit...</div>}
      <>
        <h3>Keystone Habits</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {keystoneHabits.map(template => (
            <div 
              key={template._id} 
              style={{ 
                border: '1px solid #ccc', 
                padding: '10px', 
                margin: '5px', 
                cursor: 'pointer',
                width: '200px'
              }}
              onClick={() => handleAddHabit(template)}
            >
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          ))}
        </div>
      </>
      {sortedAreas.map(area => (
        <>
          <h3>{area}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {otherHabits[area].map(template => (
              <div 
                key={template._id} 
                style={{ 
                  border: '1px solid #ccc', 
                  padding: '10px', 
                  margin: '5px', 
                  cursor: 'pointer',
                  width: '200px'
                }}
                onClick={() => handleAddHabit(template)}
              >
                <h4>{template.name}</h4>
                <p>{template.description}</p>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default AddHabit;