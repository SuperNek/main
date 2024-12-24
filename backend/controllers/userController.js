import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Employee from '../models/Employee.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const register = async (req, res) => {
  try {
    const { username, password, name, position, department, contactInfo } = req.body;

    if (!username || !password || !name || !position || !department) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: 'student',
    });

    await Employee.create({
      name,
      position,
      department,
      contactInfo,
      userId: newUser.id, 
    });

    res.status(201).json({ message: 'User and employee created successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!['admin', 'instructor', 'student'].includes(role)) {
      return res.status(400).json({ error: 'Недопустимая роль.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден.' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Роль успешно обновлена.', user });
  } catch (error) {
    console.error('Ошибка при обновлении роли:', error);
    res.status(500).json({ error: 'Ошибка сервера.' });
  }
};


export const createDefaultAdmin = async () => {
    try {
      const username = process.env.DEFAULT_ADMIN_USERNAME;
      const password = process.env.DEFAULT_ADMIN_PASSWORD;
      const role = process.env.DEFAULT_ADMIN_ROLE;
  
      const existingAdmin = await User.findOne({ where: { username } });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword, role });
        console.log('Default admin user created successfully.');
      }
    } catch (err) {
      console.error('Error creating default admin user:', err.message);
    }
  };

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '4d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: JWT_EXPIRES_IN * 100000,
    });

    console.log('Токен записан в Cookies:', token);
    res.status(200).json({ message: 'Logged in successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Извлекаем токен из Cookies
  console.log('Токен из Cookies:', token); // Логируем токен

  if (!token) {
    console.error('Токен отсутствует.');
    return res.status(401).json({ error: 'Токен отсутствует.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Проверяем токен
    console.log('Токен успешно декодирован:', decoded); // Логируем декодированные данные
    req.user = decoded; // Сохраняем данные пользователя в запросе
    next();
  } catch (error) {
    console.error('Ошибка проверки токена:', error.message);
    return res.status(403).json({ error: 'Неверный токен или токен истек.' });
  }
};



export const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Access denied.' });
  }
  next();
};

export const getCurrentUser = async (req, res) => {
  try {
    console.log('Декодированные данные пользователя:', req.user);

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден.' });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error('Ошибка получения пользователя:', error.message);
    res.status(500).json({ error: 'Ошибка сервера.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', newToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: JWT_EXPIRES_IN * 1000,
    });

    res.status(200).json({ message: 'Token refreshed successfully.' });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully.' });
};
