import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  contactInfo: { type: DataTypes.STRING },
});

export default Employee;
