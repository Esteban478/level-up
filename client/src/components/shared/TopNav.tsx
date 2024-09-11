import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faMinus, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTodayContext } from '../../hooks/today/useToday';
import { useEffect } from 'react';
import '../../styles/TopNav.css';

const TopNav: React.FC = () => {
  const { isEditMode, isArchiveMode, setIsEditMode, setIsArchiveMode } = useTodayContext();
  const location = useLocation();
  const isTodayPage = location.pathname === '/today';

  useEffect(() => {
    if (!isTodayPage) {
      setIsEditMode(false);
      setIsArchiveMode(false);
    }
  }, [isTodayPage, setIsEditMode, setIsArchiveMode]);

  const handleEditModeToggle = () => {
    if (isTodayPage) {
      setIsEditMode(!isEditMode);
      setIsArchiveMode(false);
    }
  };

  const handleArchiveModeToggle = () => {
    if (isTodayPage) {
      setIsArchiveMode(!isArchiveMode);
      setIsEditMode(false);
    }
  };

  return (
    <>
      <NavLink to="/add-habit" end>
        <FontAwesomeIcon icon={faPlus} />
      </NavLink>
      {isTodayPage && (
        <>
          <FontAwesomeIcon 
            icon={faPen} 
            className={isEditMode ? 'active' : ''} 
            onClick={handleEditModeToggle}
          />
          <FontAwesomeIcon 
            icon={faMinus} 
            className={isArchiveMode ? 'active' : ''} 
            onClick={handleArchiveModeToggle}
          />
        </>
      )}
      <NavLink to="/archive">
        <FontAwesomeIcon icon={faBoxArchive} />
      </NavLink>
    </>
  );
};

export default TopNav;