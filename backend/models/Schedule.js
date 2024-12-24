import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Course from './Course.js';

const Schedule = sequelize.define('Schedule', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
});

Schedule.belongsTo(Course, { foreignKey: 'courseId' });

export default Schedule;
