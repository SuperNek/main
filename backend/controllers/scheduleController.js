import { Op } from 'sequelize'; // Для фильтрации и поиска
import Schedule from '../models/Schedule.js';
import Course from '../models/Course.js';

export const createSchedule = async (req, res) => {
  try {
    const { date, time, location, courseId } = req.body;

    if (!date || !time || !location || !courseId) {
      return res.status(400).json({ error: 'Date, time, location, and courseId are required.' });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    const newSchedule = await Schedule.create({ date, time, location, courseId });
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSchedules = async (req, res) => {
  const { date, location, courseId } = req.query;

  try {
    const where = {};
    if (date) where.date = date;
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (courseId) where.courseId = courseId;

    const schedules = await Schedule.findAll({
      where,
      include: [{ model: Course, attributes: ['title', 'description'] }],
    });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id, {
      include: [{ model: Course, attributes: ['title', 'description'] }],
    });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { date, time, location, courseId } = req.body;

    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    if (courseId) {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }
    }

    await schedule.update({ date, time, location, courseId });
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    await schedule.destroy();
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
