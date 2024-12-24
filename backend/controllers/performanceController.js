import { Op } from 'sequelize';
import Performance from '../models/Performance.js';
import Employee from '../models/Employee.js';
import Course from '../models/Course.js';

export const createPerformance = async (req, res) => {
  try {
    const { grade, remarks, employeeId, courseId } = req.body;

    if (!grade || !employeeId || !courseId) {
      return res.status(400).json({ error: 'Grade, employeeId, and courseId are required.' });
    }

    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    const newPerformance = await Performance.create({ grade, remarks, employeeId, courseId });
    res.status(201).json(newPerformance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPerformances = async (req, res) => {
  const { employeeId, courseId, grade } = req.query;

  try {
    const where = {};
    if (employeeId) where.employeeId = employeeId;
    if (courseId) where.courseId = courseId;
    if (grade) where.grade = grade;

    const performances = await Performance.findAll({
      where,
      include: [
        { model: Employee, attributes: ['name', 'position', 'department'] },
        { model: Course, attributes: ['title', 'description'] },
      ],
    });
    res.status(200).json(performances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id, {
      include: [
        { model: Employee, attributes: ['name', 'position', 'department'] },
        { model: Course, attributes: ['title', 'description'] },
      ],
    });

    if (!performance) {
      return res.status(404).json({ error: 'Performance record not found.' });
    }

    res.status(200).json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePerformance = async (req, res) => {
  try {
    const { grade, remarks } = req.body;

    const performance = await Performance.findByPk(req.params.id);
    if (!performance) {
      return res.status(404).json({ error: 'Performance record not found.' });
    }

    // Валидация данных
    if (grade && typeof grade !== 'string') {
      return res.status(400).json({ error: 'Grade must be a string.' });
    }

    await performance.update({ grade, remarks });
    res.status(200).json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (!performance) {
      return res.status(404).json({ error: 'Performance record not found.' });
    }

    await performance.destroy();
    res.status(200).json({ message: 'Performance record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
