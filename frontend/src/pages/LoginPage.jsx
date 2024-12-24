import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, getCurrentUser } from '../api/auth';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard'; // Импорт InfoCard

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
        // Вход пользователя
        await loginUser({
          username: formData.username,
          password: formData.password,
        });

        // Получение данных о текущем пользователе
        const user = await getCurrentUser();

        // Редирект на страницу в зависимости от роли
        if (user.role === 'admin') {
          navigate('/admin'); // Редирект на панель администратора
        } else {
          navigate('/dashboard'); // Редирект на основную панель
        }
      } catch (error) {
        console.error('Ошибка при входе:', error);
        setError('Неверный логин или пароль.');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }

      try {
        // Регистрация нового пользователя
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
        {/* Форма авторизации/регистрации */}
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
                <InputField
                  id="position"
                  label="Должность"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Введите должность"
                />
                <InputField
                  id="department"
                  label="Отдел"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Введите отдел"
                />
                <InputField
                  id="contactInfo"
                  label="Контактная информация"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="Введите телефон или email"
                />
              </>
            )}
            <Button type="submit" className="w-full">
              {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-blue-600 hover:underline transition-colors duration-300"
            >
              {isLoginMode
                ? 'Нет аккаунта? Зарегистрироваться'
                : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>

        {/* Информационные карточки */}
        <div className="space-y-4">
          <InfoCard
            title="О системе"
            description="Система профессиональной переподготовки помогает сотрудникам получать необходимые знания и навыки для успешной карьеры."
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
