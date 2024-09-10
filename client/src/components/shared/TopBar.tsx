import '../../styles/TopBar.css';

interface TopBarProps {
  title?: string;
  darkTitle?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  topNav?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, darkTitle, leftAction, rightAction, topNav }) => {
  const renderContent = () => {
    if (topNav) {
      return <header className="top-nav">
          { topNav }
      </header>
    }

    return (
      <header className="top-bar">
        <div className="left-action">{leftAction}</div>
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