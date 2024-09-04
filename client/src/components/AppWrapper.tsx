import React, { useEffect, useState } from 'react';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [displayMode, setDisplayMode] = useState<'standalone' | 'browser'>('browser');
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDisplayMode = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ('standalone' in window.navigator && (window.navigator as any).standalone === true)) {
        setDisplayMode('standalone');
      }
    };

    const checkDeviceType = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setDeviceType(mobileRegex.test(userAgent.toLowerCase()) ? 'mobile' : 'desktop');
    };

    checkDisplayMode();
    checkDeviceType();

    const mql = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setDisplayMode(e.matches ? 'standalone' : 'browser');
    };

    mql.addEventListener('change', handleDisplayModeChange);
    return () => mql.removeEventListener('change', handleDisplayModeChange);
  }, []);

  const isFullScreen = displayMode === 'standalone' || deviceType === 'mobile';

  const wrapperStyle: React.CSSProperties = {
    width: isFullScreen ? '100%' : '414px',
    height: isFullScreen ? '100%' : '736px',
    margin: '0 auto',
    overflow: 'hidden',
    position: isFullScreen ? 'absolute' : 'relative',
    border: !isFullScreen ? '1px solid #ccc' : 'none',
    boxShadow: !isFullScreen ? '0 0 10px rgba(0,0,0,0.1)' : 'none',
  };

  return (
    <div style={wrapperStyle} className={isFullScreen ? 'full-screen' : ''}>
      {children}
    </div>
  );
};

export default AppWrapper;