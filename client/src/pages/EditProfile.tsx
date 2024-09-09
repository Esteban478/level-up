import { useState, useEffect } from 'react';
import { useUserProfile } from '../hooks/profile/useUserProfile';
import { useEditProfileNavigation } from '../hooks/navigation/useEditProfileNavigation';
import { useUpdateProfile } from '../hooks/profile/useUpdateProfile';
import FullScreenLayout from '../components/layouts/FullScreenLayout';
import BackButton from '../components/shared/BackButton';
import TextButton from '../components/shared/ConfirmButton';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { UserProfile } from '../@types/userProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faUpload, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../styles/EditProfile.css';

const EditProfile: React.FC = () => {
  const { profile, loading, error } = useUserProfile();
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { handleBack, handleSave } = useEditProfileNavigation();
  const { updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  const handleFieldChange = (field: keyof UserProfile, value: string) => {
    if (editedProfile) {
      setEditedProfile(prevProfile => ({
        ...prevProfile,
        [field]: value,
      }) as UserProfile);
    }
  };

  const handleSettingsChange = (category: 'notifications' | 'privacy', field: string, value: boolean | string) => {
    if (editedProfile) {
      setEditedProfile(prevProfile => ({
        ...prevProfile,
        settings: {
          ...prevProfile?.settings,
          [category]: {
            ...prevProfile?.settings[category],
            [field]: value,
          },
        },
      }) as UserProfile);
    }
  };

  const handleRandomizeAvatar = async () => {
    // Implement avatar randomization logic here
  };

  const handleUploadAvatar = async () => {
    // Implement avatar upload logic here
  };

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return false;
    }
    setPasswordError('');
    return true;
  };

  const onSave = async () => {
    if (editedProfile) {
      if (showPasswordChange && !validatePasswords()) {
        return;
      }

      const updateData = {
        ...editedProfile,
        currentPassword: showPasswordChange ? currentPassword : undefined,
        newPassword: showPasswordChange ? newPassword : undefined,
      };

      try {
        const updatedProfile = await updateProfile(updateData);
        if (updatedProfile) {
          handleSave(updatedProfile);
          console.log('Profile updated successfully');
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
        // Handle error (show error message to user)
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!editedProfile) return <div>No profile found</div>;

  return (
    <FullScreenLayout
      title="Settings"
      leftAction={<BackButton onClick={handleBack} />}
      rightAction={<TextButton text="Save" onClick={onSave} />}
    >
      <div className='profile-settings-container'>
        <div className="profile-picture-container">
          <img src={editedProfile.avatar.imageUrl} alt="Profile" className="profile-picture" />
          <div className="profile-picture-actions">
            <button onClick={handleUploadAvatar} className="avatar-action-btn">
              <FontAwesomeIcon icon={faUpload} />
            </button>
            <button onClick={handleRandomizeAvatar} className="avatar-action-btn">
              <FontAwesomeIcon icon={faDice} />
            </button>
          </div>
        </div>

        <div className="edit-field">
          <h3>Username</h3>
          <input 
            type="text" 
            value={editedProfile.username} 
            onChange={(e) => handleFieldChange('username', e.target.value)}
          />
        </div>

        <div className="edit-field">
          <h3>Email</h3>
          <input 
            type="email" 
            value={editedProfile.email} 
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
        </div>


        <div className="password-section">
          <h3>Password</h3>
          <button 
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="toggle-password-btn"
          >
            {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
          </button>

          {showPasswordChange && (
            <>
              <div className="edit-field">
                <h4>Current Password</h4>
                <div className="password-input-container">
                  <input 
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="password-toggle">
                    <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              <div className="edit-field">
                <h4>New Password</h4>
                <div className="password-input-container">
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button onClick={() => setShowNewPassword(!showNewPassword)} className="password-toggle">
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <PasswordStrengthMeter password={newPassword} />
              </div>
              <div className="edit-field">
                <h4>Confirm New Password</h4>
                <div className="password-input-container">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </>
          )}
        </div>


        <div className="settings-section">
          <h3>Notification Settings</h3>
          <div className="toggle-field">
            <label>
              Email Notifications
              <input 
                type="checkbox" 
                checked={editedProfile.settings.notifications.email} 
                onChange={(e) => handleSettingsChange('notifications', 'email', e.target.checked)}
              />
            </label>
          </div>
          <div className="toggle-field">
            <label>
              Push Notifications
              <input 
                type="checkbox" 
                checked={editedProfile.settings.notifications.push} 
                onChange={(e) => handleSettingsChange('notifications', 'push', e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy Settings</h3>
          <div className="select-field">
            <label>
              Profile Visibility
              <select 
                value={editedProfile.settings.privacy.profileVisibility}
                onChange={(e) => handleSettingsChange('privacy', 'profileVisibility', e.target.value)}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </label>
          </div>
          <div className="select-field">
            <label>
              Activity Visibility
              <select 
                value={editedProfile.settings.privacy.activityVisibility}
                onChange={(e) => handleSettingsChange('privacy', 'activityVisibility', e.target.value)}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default EditProfile;