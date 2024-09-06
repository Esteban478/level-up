import { useState } from 'react';
import { Goal } from '../@types/habit';
import '../styles/GoalCustomizer.css';

interface GoalCustomizerProps {
  goal: Goal;
  onChange: (goal: Goal) => void;
}

const GoalCustomizer: React.FC<GoalCustomizerProps> = ({ goal, onChange }) => {
  const [value, setValue] = useState(goal.value.toString());

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setValue(newValue);
      onChange({ ...goal, value: newValue === '' ? 0 : parseInt(newValue, 10) });
    }
  };

  return (
    <div className="goal-customizer">
      <h2>Goal</h2>
      <div>
        <label>Type:</label>
        <select
          value={goal.type}
          onChange={(e) => onChange({ ...goal, type: e.target.value as Goal['type'] })}
        >
          <option value="At least">At least</option>
          <option value="At most">At most</option>
          <option value="Exactly">Exactly</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          onBlur={() => {
            if (value === '') setValue('1');
          }}
        />
      </div>
      <div>
        <span>{goal.unit}</span>
      </div>
      <div>
        <label>Direction:</label>
        <select
          value={goal.direction}
          onChange={(e) => onChange({ ...goal, direction: e.target.value as Goal['direction'] })}
        >
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
          <option value="maintain">Maintain</option>
        </select>
      </div>
    </div>
  );
};

export default GoalCustomizer;