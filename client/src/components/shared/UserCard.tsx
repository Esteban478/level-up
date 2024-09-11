import React from 'react';
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

  return (
    <div className={`user-card ${isHorizontal ? 'horizontal' : 'vertical'}`}>
      <img src={avatarUrl} alt={`${user.username}'s avatar`} className="user-avatar" />
      <span className="user-name">{user.username}</span>
      {onAddFriend && (
        <button 
          onClick={() => onAddFriend(user._id)} 
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