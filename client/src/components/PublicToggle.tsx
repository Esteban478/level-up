import React from 'react';
import '../styles/PublicToggle.css';

interface PublicToggleProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

const PublicToggle: React.FC<PublicToggleProps> = ({ isPublic, onChange }) => {
  return (
    <div className="public-toggle">
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => onChange(e.target.checked)}
        />
        Make this habit public
      </label>
      <p className="explanation">
        Public habits are visible to other users and can inspire them.
      </p>
    </div>
  );
};

export default PublicToggle;