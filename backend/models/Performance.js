import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Employee from './Employee.js';
import Course from './Course.js';

const Performance = sequelize.define('Performance', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.ENUM('completed', 'in-progress', 'not-started'), allowNull: false },
  score: { type: DataTypes.FLOAT },
  completionDate: { type: DataTypes.DATE },
});

Performance.belongsTo(Employee, {
  foreignKey: 'employeeId',
  onDelete: 'CASCADE',
});
Performance.belongsTo(Course, { foreignKey: 'courseId' });

export default Performance;
