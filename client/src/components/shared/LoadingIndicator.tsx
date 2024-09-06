import React from 'react';
import './LoadingIndicator.css';
import logo from '/logos/icon_144.png';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-indicator">
      <img src={logo} alt="Loading" className="loading-logo" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;