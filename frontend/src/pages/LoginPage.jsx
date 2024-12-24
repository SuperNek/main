import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, getCurrentUser } from '../api/auth';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';

function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    position: '',
    department: '',
    contactInfo: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        await loginUser({
          username: formData.username,
          password: formData.password,
        });
        const user = await getCurrentUser();
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Ошибка при входе:', error.response?.data || error.message);
        setError('Неверный логин или пароль.');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      try {
        await registerUser({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          position: formData.position,
          department: formData.department,
          contactInfo: formData.contactInfo,
        });
        alert('Регистрация успешна!');
        setIsLoginMode(true);
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
        alert('Ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex justify-center items-start mt-8 mb-10 space-x-8">
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {isLoginMode ? 'Вход' : 'Регистрация'}
          </h2>
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
            {!isLoginMode && (
              <>
                <InputField
                  id="confirmPassword"
                  label="Повторите пароль"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Введите пароль ещё раз"
                />
                <InputField
                  id="name"
                  label="Полное имя"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите полное имя"
                />
              </>
            )}
            <Button type="submit" className="w-full">
              {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
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
