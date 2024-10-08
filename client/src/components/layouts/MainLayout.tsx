import TopBar from '../shared/TopBar';
import BottomNav from '../shared/BottomNav';
import '../../styles/MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  darkTitle?: boolean;
  backButton?: boolean;
  rightAction?: React.ReactNode;
  topNav?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title, 
  darkTitle, 
  backButton = false, 
  rightAction, 
  topNav 
}) => (
  <div className="main-layout">
    <TopBar 
      title={title} 
      darkTitle={darkTitle}
      backButton={backButton} 
      rightAction={rightAction} 
      topNav={topNav}
    />
    <main>{children}</main>
    <BottomNav />
  </div>
);

export default MainLayout