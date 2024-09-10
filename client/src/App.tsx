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
import BackButton from './components/shared/BackButton';
import EditProfile from './pages/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <MainLayout topNav={<TopNav />}>
              <Today />
            </MainLayout>
          } />
          <Route path="/achievements" element={
            <MainLayout title="Achievements" leftAction={<BackButton />}>
              <Achievements />
            </MainLayout>
          } />
          <Route path="/profile" element={
            <Profile />
          } />
          <Route path="/feed" element={
            <MainLayout title="Feed">
              <Feed />
            </MainLayout>
          } />

          {/* Full-screen overlays */}
          <Route path="/add-habit" element={
            <AddHabit />
          } />
          <Route path="/edit-habit/:habitId" element={
            <EditHabit />
          } />
          <Route path="/archive-habit" element={
            <FullScreenLayout title="Archive Habit" leftAction={<BackButton />}>
              <Archive />
            </FullScreenLayout>
          } />
          <Route path="/archive" element={
            <FullScreenLayout title="Habit Archive" leftAction={<BackButton />}>
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
    <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  );
};

export default App;