import React from 'react';
import TopBar from '../shared/TopBar';
import BottomNav from '../shared/BottomNav';
import '../../styles/MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  darkTitle?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  topNav?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title, 
  darkTitle, 
  leftAction, 
  rightAction, 
  topNav 
}) => (
  <div className="main-layout">
    <TopBar 
      title={title} 
      darkTitle={darkTitle}
      leftAction={leftAction} 
      rightAction={rightAction} 
      topNav={topNav}
    />
    <main>{children}</main>
    <BottomNav />
  </div>
);

export default MainLayout