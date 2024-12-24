import { useState } from 'react';
import { loginUser } from '../api/auth';
import InputField from '../components/InputField';
import Button from '../components/Button';
import InfoCard from '../components/InfoCard';

function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Состояние для переключения между входом и регистрацией
  const [formData, setFormData] = useState({ username: '', password: '', name: '', email: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegisterMode) {
      // Логика для регистрации
      try {
        console.log('Регистрация данных:', formData);
        // Вызов API для регистрации (если он уже реализован)
        alert('Регистрация успешна! Теперь войдите в систему.');
        setIsRegisterMode(false);
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
        setError('Ошибка регистрации. Попробуйте снова.');
      }
    } else {
      // Логика для входа
      try {
        const credentials = {
          username: formData.username.trim(),
          password: formData.password.trim(),
        };

        const user = await loginUser(credentials);
        console.log('Данные пользователя после логина:', user);

        if (user.role === 'admin') {
          window.location.href = '/admin'; // Редирект на админ-панель
        } else if (user.role === 'instructor') {
          window.location.href = '/dashboard';
        } else if (user.role === 'student') {
          window.location.href = '/student-dashboard';
        } else {
          console.error('Неизвестная роль пользователя:', user.role);
        }
      } catch (error) {
        console.error('Ошибка при входе:', error.response?.data || error.message);
        setError('Неверный логин или пароль.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">{isRegisterMode ? 'Регистрация' : 'Вход в систему'}</h2>
      <form className="bg-white p-6 rounded shadow-md space-y-4 w-80" onSubmit={handleSubmit}>
        {isRegisterMode && (
          <>
            <InputField
              id="name"
              label="Имя"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Введите ваше имя"
            />
            <InputField
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Введите ваш email"
            />
          </>
        )}
        <InputField
          id="username"
          label="Логин"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Введите логин"
        />
        <InputField
          id="password"
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Введите пароль"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
        </Button>
        <div className="text-center mt-4">
          <p>{isRegisterMode ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}</p>
          <Button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
          >
            {isRegisterMode ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </div>
      </form>
      <div className="mt-8 space-y-4 w-80">
        <InfoCard
          title="О системе"
          description="Система профессиональной переподготовки помогает сотрудникам получать необходимые знания и навыки для повышения квалификации и успешной карьеры."
        />
        <InfoCard
          title="Справочная информация"
          description="Здесь можно найти инструкции и ответы на часто задаваемые вопросы."
        />
      </div>
    </div>
  );
}

export default LoginPage;
