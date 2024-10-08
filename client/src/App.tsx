import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/auth/useAuth';
import ProtectedRoute from './components/shared/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import FullScreenLayout from './components/layouts/FullScreenLayout';
import Auth from './pages/Auth';
import Today from './pages/Today';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import AddHabit from './pages/AddHabit';
import Archive from './pages/Archive';
import Achievements from './pages/Achievements';
import TopNav from './components/shared/TopNav';
import EditHabit from './pages/EditHabit';
import EditProfile from './pages/EditProfile';
import { TodayProvider } from './context/Today';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFriend from './pages/AddFriend';
import FriendProfile from './pages/FriendProfile';
import ProfileLayout from './components/layouts/ProfileLayout';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
            <Route path="/today" element={
              <TodayProvider>
                <MainLayout topNav={<TopNav />}>
                  <Today />
                </MainLayout>
              </TodayProvider>
          } />
          <Route path="/achievements" element={
            <MainLayout title="Achievements">
              <Achievements />
            </MainLayout>
          } />
            <Route path="/profile" element={
              <ProfileLayout title="Profile">
                <Profile />
              </ProfileLayout>
          } />   
          <Route path="/friend/:friendId" element={
            <FriendProfile />
          } />
          <Route path="/feed" element={
            <MainLayout title="Feed">
              <Feed />
            </MainLayout>
          } />

          {/* Full-screen overlays */}
          <Route path="/add-habit" element={
              <FullScreenLayout title="Add Habit" backButton>
              <AddHabit />
            </FullScreenLayout>
          } />
          <Route path="/add-friend" element={
            <AddFriend />
          } />
          <Route path="/edit-habit/:habitId" element={    
            <EditHabit />
          } />
          <Route path="/archive" element={
            <FullScreenLayout title="Habit Archive" backButton>
              <Archive />
            </FullScreenLayout>
          } />
          <Route path="/profile-settings" element={
            <EditProfile />
          } />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to={user ? "/today" : "/auth"} replace />} />
      </Routes>
    </Router>
    <ToastContainer position="bottom-center" autoClose={2000} />
    </>
  );
};

export default App;