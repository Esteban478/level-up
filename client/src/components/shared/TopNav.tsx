import { NavLink } from 'react-router-dom';
import '../../styles/TopNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faMinus, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

const TopNav: React.FC = () => (
  <>
    <NavLink to="/add-habit" end><FontAwesomeIcon icon={faPlus} /></NavLink>
    <NavLink to="/edit-habit"><FontAwesomeIcon icon={faPen} /></NavLink>
    <NavLink to="/archive-habit"><FontAwesomeIcon icon={faMinus} /></NavLink>
    <NavLink to="/archive"><FontAwesomeIcon icon={faBoxArchive} /></NavLink>
  </>
);

export default TopNav