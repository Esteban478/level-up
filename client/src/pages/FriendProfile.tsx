import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile } from '../@types/userProfile';
import ProfileLayout from '../components/layouts/ProfileLayout';
import BackButton from '../components/shared/BackButton';
import { formatDatelongMonthYear } from '../utils/formatDate';
import { toast } from 'react-toastify';
import '../styles/Profile.css';
import { usePublicHabits } from '../hooks/habits/usePublicHabits';

const FriendProfile: React.FC = () => {
  const [friendProfile, setFriendProfile] = useState<UserProfile | null>(null);
  const { friendId } = useParams<{ friendId: string }>();
  const { habits, loading: habitsLoading, error: habitsError } = usePublicHabits(friendId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URI}/users/friends/${friendId}/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch friend profile');
        }

        const data = await response.json();
        setFriendProfile(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendProfile();
  }, [friendId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!friendProfile) return <div>No profile data available</div>;

  const isProfilePrivate = friendProfile.settings.privacy.profileVisibility === 'private';
  const avatarUrl = friendProfile.avatar?.imageUrl || '/default-avatar.jpg';

  return (
    <ProfileLayout
      isFriendProfile={true}
      title={`${friendProfile.username}'s profile`}
      leftAction={<BackButton onClick={handleBack} />}
    >
      <div className="profile-avatar-container">
        <img src={avatarUrl} alt="Friend Avatar" className="profile-avatar-image" />
      </div>
      <div className="user-profile-page">

        {isProfilePrivate ? (
          <div className="private-profile-message">
            <p>This user has chosen to keep their profile private.</p>
          </div>
        ) : (
          <>
            <div className="profile-header">
              <h1 className="profile-username">{friendProfile.username}</h1>
              <p className="profile-email">Joined {formatDatelongMonthYear(new Date(friendProfile.createdAt))}</p>
            </div>

            {friendProfile.bio && (
              <div className="profile-bio">
                <h2>Bio</h2>
                <p>{friendProfile.bio}</p>
              </div>
            )}

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

            <div className="profile-overview">
              <h2>Overview</h2>
              <div className='overview-items'>
                <div className="overview-item">
                  <h3 className="overview-item-heading">Level</h3>
                  <p className="overview-item-value">{friendProfile.level}</p>
                </div>
                <div className="overview-item">
                  <h3 className="overview-item-heading">Streak days</h3>
                  <p className="overview-item-value">{friendProfile.streakDays}</p>
                </div>
                <div className="overview-item">
                  <h3 className="overview-item-heading">Total XP</h3>
                  <p className="overview-item-value">{friendProfile.totalXp}</p>
                </div>
              </div>
            </div>

            {friendProfile.achievements && friendProfile.achievements.length > 0 && (
              <div className="profile-achievements">
                <h2>Achievements</h2>
                <p className="achievements-count">{friendProfile.achievements.length} achievements</p>
              </div>
            )}
          </>
        )}
      </div>
    </ProfileLayout>
  );
};

export default FriendProfile;