import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './api/auth';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(true);
        setUserRole(user.role);
        console.log('Пользователь авторизован:', user);
      } catch (error) {
        console.error('Ошибка авторизации:', error.response?.data || error.message);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>; // Показываем индикатор загрузки
  }

  return (
    <Router>
      <Routes>
        {/* Если не авторизован, перенаправляем на страницу логина */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={`/${userRole}`} />} />
        
        {/* Для роли admin */}
        <Route
          path="/admin"
          element={
            isAuthenticated && userRole === 'admin' ? <AdminPanel /> : <Navigate to="/login" />
          }
        />
        
        {/* Для роли instructor */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && userRole === 'instructor' ? <AdminPanel /> : <Navigate to="/login" />
          }
        />

        {/* Перенаправляем всех пользователей на их роли */}
        <Route path="*" element={<Navigate to={isAuthenticated ? `/${userRole}` : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
