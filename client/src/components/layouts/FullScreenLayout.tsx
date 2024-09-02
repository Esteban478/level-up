import TopBar from '../shared/TopBar';
import '../../styles/FullScreenLayout.css';

interface FullScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  darkTitle?: boolean;
  fromRight?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
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

export default FullScreenLayout