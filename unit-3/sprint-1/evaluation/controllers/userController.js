const User = require("../models/User");
const Course = require("../models/Course");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.status(200).json({ message: "Enrollment successful" });
  } catch (err) {
    next(err);
  }
};

exports.cancelEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id.toString() !== courseId
    );
    await user.save();

    res.status(200).json({ message: "Enrollment cancelled" });
  } catch (err) {
    next(err);
  }
};

exports.getMyCourses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("enrolledCourses");

    res.status(200).json(user.enrolledCourses);
  } catch (err) {
    next(err);
  }
};
