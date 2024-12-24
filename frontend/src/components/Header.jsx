import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../api/auth';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Ошибка получения пользователя:', error.response?.data || error.message);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="https://apps3proxy.mosmetro.tech/webapp-mosmetro/mm-logo-red.svg" alt="Логотип" className="h-8" />
        <h1 className="text-2xl font-bold text-red-600">Профессиональная переподготовка</h1>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-semibold">{user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
