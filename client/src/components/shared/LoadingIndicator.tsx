import '../../styles/LoadingIndicator.css';
import logo from '/assets/icon_x128.png';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-indicator">
      <img src={logo} alt="Loading" className="loading-logo" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;