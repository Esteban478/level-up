import React from 'react';
import BottomNav from '../shared/BottomNav';
import '../../styles/ProfileLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children
}) => (
  <div className="profile-layout">
    <main>{children}</main>
    <BottomNav />
  </div>
);

export default MainLayout