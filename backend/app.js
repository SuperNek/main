import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';
import cookieParser from 'cookie-parser';
import models from './models/index.js';

import { createDefaultAdmin } from './controllers/userController.js';

import employeeRoutes from './routes/employeeRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

createDefaultAdmin();

app.use('/api/employees', employeeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.SERVER_PORT || 3000;


// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing models:', err);
  });
