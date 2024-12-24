import { Op } from 'sequelize';
import Employee from '../models/Employee.js';

export const createEmployee = async (req, res) => {
  try {
    const { name, position, department, contactInfo } = req.body;

    if (!name || !position || !department) {
      return res.status(400).json({ error: 'Name, position, and department are required.' });
    }

    const existingEmployee = await Employee.findOne({
      where: { name, position, department },
    });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with the same name, position, and department already exists.' });
    }

    const newEmployee = await Employee.create({ name, position, department, contactInfo });
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllEmployees = async (req, res) => {
  const { department, position, query } = req.query;

  try {
    const where = {};
    if (department) where.department = department;
    if (position) where.position = position;
    if (query) {
      where[Op.or] = [
        { name: { [Op.like]: `%${query}%` } },
        { position: { [Op.like]: `%${query}%` } },
        { department: { [Op.like]: `%${query}%` } },
      ];
    }

    const employees = await Employee.findAll({ where });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { name, position, department, contactInfo } = req.body;

    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    if (name && typeof name !== 'string') {
      return res.status(400).json({ error: 'Name must be a string.' });
    }
    if (position && typeof position !== 'string') {
      return res.status(400).json({ error: 'Position must be a string.' });
    }
    if (department && typeof department !== 'string') {
      return res.status(400).json({ error: 'Department must be a string.' });
    }

    await employee.update({ name, position, department, contactInfo });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee and associated performance records deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
