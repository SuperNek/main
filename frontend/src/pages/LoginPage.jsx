import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = {
        username: formData.username.trim(),
        password: formData.password.trim(),
      };
  
      const user = await loginUser(credentials);
      console.log('Данные пользователя после логина:', user);
  
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'instructor') {
        navigate('/dashboard');
      } else if (user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        console.error('Неизвестная роль пользователя:', user.role);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error.response?.data || error.message);
      setError('Неверный логин или пароль.');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-start mt-8 mb-10 space-x-8">
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Вход</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="username"
              label="Логин"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
            />
            <InputField
              id="password"
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
            />
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
        <div className="space-y-4">
          <InfoCard
            title="О системе"
            description="Система профессиональной переподготовки помогает сотрудникам получать необходимые знания и навыки."
          />
          <InfoCard
            title="Контакты"
            description="Телефон: +7 (123) 456-78-90\nEmail: support@system.ru"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
