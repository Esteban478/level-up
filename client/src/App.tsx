import Auth from "./pages/Auth";
import Today from "./pages/Today";
import { useAuth } from "./context/Auth";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/success" /> : <Auth />} />
        <Route path="/success" element={user ? <Today /> : <Navigate to="/auth" />} />
        <Route path="/" element={<Navigate to={user ? "/success" : "/auth"} />} />
      </Routes>
    </Router>
  )
}

export default App
