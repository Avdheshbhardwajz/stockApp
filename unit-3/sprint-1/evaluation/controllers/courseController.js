const Course = require("../models/User");

exports.getCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const courses = await Course.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};
