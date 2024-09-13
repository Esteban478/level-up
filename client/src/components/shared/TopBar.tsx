import { useNavigate } from 'react-router-dom';
import '../../styles/TopBar.css';
import BackButton from './BackButton';

interface TopBarProps {
  title?: string;
  darkTitle?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  topNav?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, darkTitle, rightAction, topNav }) => {
  const navigate = useNavigate();
  const renderContent = () => {
    if (topNav) {
      return <header className="top-nav">
          { topNav }
      </header>
    }

    return (
      <header className="top-bar">
        <BackButton onClick={() => navigate(-1)}/>
        <h1 className={`title ${darkTitle ? 'dark-title' : ''}`}>
          {title}
        </h1>
        <div className="right-action">{rightAction}</div>
      </header>
    );
  };

  return renderContent();
};

export default TopBar;