import { useUserProfile } from '../hooks/profile/useUserProfile';
import { formatDatelongMonthYear } from '../utils/formatDate';
import UserCard from '../components/shared/UserCard';
import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCheck, faX, faRightFromBracket, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { usePublicHabits } from '../hooks/habits/usePublicHabits';
import { useAuth } from '../hooks/auth/useAuth';

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const { habits, loading: habitsLoading, error: habitsError } = usePublicHabits();
  const navigate = useNavigate();

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;

  const handleOpenSettings = async () => {
    navigate('/profile-settings');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <div className="profile-avatar-container">
        <img src={profile.avatar.imageUrl} alt="User Avatar" className="profile-avatar-image" />
        <FontAwesomeIcon icon={faGear} className='profile-settings-icon' onClick={handleOpenSettings} />
      </div>
      <div className="user-profile-page">
        <div className="profile-header">
          <div>
            <h1 className="profile-username">{profile.username}</h1>
            <p className="profile-email">{profile.email} - Joined {formatDatelongMonthYear(new Date(profile.createdAt))}</p>
          </div>
        </div>

        {habits && habits.length > 0 && (
          <div className="profile-public-habits">
            <h2>Habits</h2>
            {habitsLoading ? (
              <p>Loading habits...</p>
            ) : habitsError ? (
              <p>Error loading habits: {habitsError.message}</p>
            ) : habits.length > 0 ? (
              <ul className="habits-list">
                {habits.map((habit) => (
                  <li key={habit._id} className="habit-item">
                    <h3 className="habit-name">{habit.name}</h3>
                    <p className="habit-streak">Streak: {habit.streak.current} days</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No public habits to display.</p>
            )}
          </div> 
        )}

        <div className="profile-friends">
          <div className="profile-friends-header">
            <h2>Friends</h2>
            <Link to="/add-friend" className="add-friend-link">              
              <FontAwesomeIcon icon={faUserGroup} className='add-friend-icon' />
              Add Friends
            </Link>
          </div>
          {profile.friends && profile.friends.length > 0 ? (
            <>
              <div className="friends-list">
                {profile.friends.map(friend => (
                  <UserCard
                    key={friend._id}
                    user={friend}
                    isFriend={true}
                    isHorizontal={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>No friends added yet.</p>
          )}
        </div>

        {profile.bio && (
          <div className="profile-bio">
            <h2>Bio</h2>
            <p>{profile.bio}</p>
          </div>
        )}

        <div className="profile-overview">
          <h2>Overview</h2>
          <div className='overview-items'>
            <div className="overview-item">
              <h3 className="overview-item-heading">Level</h3>
              <p className="overview-item-value">{profile.level}</p>
            </div>
            <div className="overview-item">
              <h3 className="overview-item-heading">Streak days</h3>
              <p className="overview-item-value">{profile.streakDays}</p>
            </div>
            <div className="overview-item">
              <h3 className="overview-item-heading">Current XP</h3>
              <p className="overview-item-value">{profile.xp}</p>
            </div>
            <div className="overview-item">
              <h3 className="overview-item-heading">Total XP</h3>
              <p className="overview-item-value">{profile.totalXp}</p>
            </div>
          </div>
        </div>

        <div className="profile-settings">
          <div className="settings-notifications">
            <h2>Notifications</h2>
            <div className="settings-item">
              <p className="settings-heading">Email:</p>
              <p className="settings-value">
                {
                profile.settings.notifications.email ?
                  <FontAwesomeIcon icon={faCheck} className='notification-on' /> :
                  <FontAwesomeIcon icon={faX} className='notification-off'/>
                }
              </p>
            </div>
            <div className="settings-item">
              <p className="settings-heading">Push:</p>
              <p className="settings-value">
                {
                profile.settings.notifications.push ?
                  <FontAwesomeIcon icon={faCheck} className='notification-on' /> :
                  <FontAwesomeIcon icon={faX} className='notification-off'/>
                }
              </p>
            </div>
          </div>
          <div className="settings-privacy">
            <h2>Privacy</h2>
            <div className="settings-item">
              <p className="settings-heading">Profile:</p>
              <p className="settings-value">{profile.settings.privacy.profileVisibility}</p>
            </div>
            <div className="settings-item">
              <p className="settings-heading">Activity:</p>
              <p className="settings-value">{profile.settings.privacy.activityVisibility}</p>
            </div>
          </div>
        </div>

        {profile.achievements && profile.achievements.length > 0 && (
          <div className="profile-achievements">
            <h2>Achievements</h2>
            <p className="achievements-count">{profile.achievements.length} achievements</p>
          </div>
        )}
        <div className='profile-logout' onClick={handleLogout}>
          <p className='logout-link'>
            <FontAwesomeIcon icon={faRightFromBracket} className='logout-icon' />
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;