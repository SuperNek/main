import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCurrentUser } from './api/auth';
import { UserProvider, useUser } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

function AppRoutes() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to={`/${user.role}`} />}
      />
      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={user ? `/${user.role}` : '/login'} />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
