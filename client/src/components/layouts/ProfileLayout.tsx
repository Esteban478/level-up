import React from 'react';
import BottomNav from '../shared/BottomNav';
import TopBar from '../shared/TopBar';
import '../../styles/ProfileLayout.css';

interface ProfileLayoutProps {
  children: React.ReactNode;
  isFriendProfile?: boolean;
  title?: string;
  leftAction?: React.ReactElement;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ 
  children,
  isFriendProfile = false,
  title,
  leftAction
}) => (
  <div className={`profile-layout ${isFriendProfile ? 'friend-profile' : ''}`}>
    {isFriendProfile && (
      <TopBar 
        title={title}
        leftAction={leftAction}
      />
    )}
    <main>{children}</main>
    {!isFriendProfile && <BottomNav />}
  </div>
);

export default ProfileLayout;