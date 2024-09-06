import React from 'react';
import TopBar from '../shared/TopBar';
import '../../styles/FullScreenLayout.css';

interface FullScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  darkTitle?: boolean;
  fromRight?: boolean;
  leftAction?: React.ReactElement;
  rightAction?: React.ReactElement;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ 
  children, 
  title, 
  darkTitle,
  fromRight,
  leftAction, 
  rightAction 
}) => (
  <div className={`full-screen-layout ${fromRight ? 'from-right' : ''}`}>
    <TopBar 
      title={title} 
      darkTitle={darkTitle}
      leftAction={leftAction} 
      rightAction={rightAction} 
    />
    <main>{children}</main>
  </div>
);

export default FullScreenLayout;