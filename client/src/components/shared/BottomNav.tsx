import { faBell, faHouse, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import '../../styles/BottomNav.css';

const BottomNav: React.FC = () => (
  <nav className="bottom-nav">
    <NavLink to="/today"><FontAwesomeIcon icon={faHouse} /></NavLink>
    <NavLink to="/achievements"><FontAwesomeIcon icon={faTrophy} /></NavLink>
    <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /></NavLink>
    <NavLink to="/feed"><FontAwesomeIcon icon={faBell} /></NavLink>
  </nav>
);

export default BottomNav