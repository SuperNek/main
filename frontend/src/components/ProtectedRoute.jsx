import { Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, role }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const currentUser = await getCurrentUser();
          console.log('Проверка авторизации, данные пользователя:', currentUser);
  
          if (currentUser.role === role) {
            setIsAuthenticated(true);
            setUser(currentUser);
          } else {
            console.error(`Роль "${currentUser.role}" не соответствует ожидаемой: "${role}"`);
            navigate('/login'); // Если роль не соответствует, перенаправляем на логин
          }
        } catch (error) {
          console.error('Ошибка авторизации:', error.response?.data || error.message);
          setIsAuthenticated(false);
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, [role, navigate]);
  
    if (loading) return null; // Показываем индикатор загрузки
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default ProtectedRoute;
