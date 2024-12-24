import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../api/auth';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Пользователь не авторизован.');
          navigate('/');
        } else if (error.response && error.response.status === 403) {
          console.error('Неверный токен.');
          navigate('/');
        } else {
          console.error('Неизвестная ошибка:', error.message);
        }
      }
    };
  
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Выход из системы
      setIsAuthenticated(false);
      navigate('/login'); // Перенаправление на страницу входа
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      alert('Не удалось выйти из системы.');
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 border-b border-gray-200">
      <div className="flex justify-center items-center">
        <img
          src="https://apps3proxy.mosmetro.tech/webapp-mosmetro/mm-logo-red.svg"
          alt="Логотип"
          className="h-10"
          style={{ marginRight: '20px' }}
        />
        <h1 className="text-2xl font-bold text-red-600">Профессиональная переподготовка</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
