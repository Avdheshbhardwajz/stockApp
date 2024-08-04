const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  cancelEnrollment,
  getMyCourses,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/enroll", auth, enrollCourse);
router.post("/cancel-enrollment", auth, cancelEnrollment);
router.get("/my-courses", auth, getMyCourses);

module.exports = router;
