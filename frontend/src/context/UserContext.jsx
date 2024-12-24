import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Создаем контекст для пользователя
const UserContext = createContext();

// Провайдер контекста пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Локальное состояние пользователя

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Хук для использования контекста пользователя
export const useUser = () => useContext(UserContext);
