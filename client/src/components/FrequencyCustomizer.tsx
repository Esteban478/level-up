import { Frequency } from '../@types/habit';
import '../styles/FrequencyCustomizer.css';

interface FrequencyCustomizerProps {
  frequency: Frequency;
  onChange: (frequency: Frequency) => void;
}

const FrequencyCustomizer: React.FC<FrequencyCustomizerProps> = ({ frequency, onChange }) => {
  const handleDayChange = (day: number) => {
    let newDays: number[];
    if (frequency.type === 'Weekly') {
      newDays = frequency.daysOfWeek?.includes(day)
        ? frequency.daysOfWeek.filter(d => d !== day)
        : [...(frequency.daysOfWeek || []), day];
      onChange({ ...frequency, daysOfWeek: newDays });
    } else if (frequency.type === 'Monthly') {
      newDays = frequency.daysOfMonth?.includes(day)
        ? frequency.daysOfMonth.filter(d => d !== day)
        : [...(frequency.daysOfMonth || []), day];
      onChange({ ...frequency, daysOfMonth: newDays });
    }
  };

  return (
    <div className="frequency-customizer">
      <h2>Frequency</h2>
      <div>
        <label>Type:</label>
        <select
          value={frequency.type}
          onChange={(e) => onChange({ type: e.target.value as Frequency['type'] })}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      {frequency.type === 'Weekly' && (
        <div className="day-selector">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <button
              key={day}
              onClick={() => handleDayChange(index)}
              className={frequency.daysOfWeek?.includes(index) ? 'selected' : ''}
            >
              {day}
            </button>
          ))}
        </div>
      )}
      {frequency.type === 'Monthly' && (
        <div className="day-selector">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={frequency.daysOfMonth?.includes(day) ? 'selected' : ''}
            >
              {day}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrequencyCustomizer;