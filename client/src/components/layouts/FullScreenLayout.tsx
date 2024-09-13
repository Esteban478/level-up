import TopBar from '../shared/TopBar';
import '../../styles/FullScreenLayout.css';

interface FullScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  darkTitle?: boolean;
  fromRight?: boolean;
  backButton?: boolean;
  rightAction?: React.ReactElement;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ 
  children, 
  title, 
  darkTitle,
  fromRight,
  backButton, 
  rightAction 
}) => (
  <div className={`full-screen-layout ${fromRight ? 'from-right' : ''}`}>
    <TopBar 
      title={title} 
      darkTitle={darkTitle}
      backButton={backButton} 
      rightAction={rightAction} 
    />
    <main>{children}</main>
  </div>
);

export default FullScreenLayout;