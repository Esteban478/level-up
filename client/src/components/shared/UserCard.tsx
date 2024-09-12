import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../@types/user';
import '../../styles/UserCard.css';

interface UserCardProps {
  user: User;
  isFriend: boolean;
  isHorizontal?: boolean;
  onAddFriend?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isFriend, isHorizontal = false, onAddFriend }) => {
  const avatarUrl = user.avatar?.imageUrl || '/default-avatar.jpg';
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (isFriend && location.pathname === '/profile') {
      navigate(`/friend/${user._id}`);
    }
  };

  const handleAddFriend = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddFriend) {
      onAddFriend(user._id);
    }
  };

  return (
    <div 
      className={`user-card ${isHorizontal ? 'horizontal' : 'vertical'}`} 
      onClick={handleClick}
    >
      <img src={avatarUrl} alt={`${user.username}'s avatar`} className="user-avatar" />
      <p className="user-name">{user.username}</p>
      {onAddFriend && (
        <button 
          onClick={handleAddFriend} 
          className={`add-friend-button ${isFriend ? 'already-friend' : ''}`}
          disabled={isFriend}
        >
          {isFriend ? 'Friends' : 'Add Friend'}
        </button>
      )}
    </div>
  );
};

export default UserCard;