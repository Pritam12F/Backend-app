const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (await Admin.findOne({ username })) {
    res.send("User already exists in database");
    return;
  }
  await Admin.create({ username, password });
  res.send("Admin created successfully");
});

router.post("/signin", async (req, res) => {
  // Implement admin signin logic
  const username = req.body.username;
  const password = req.body.password;
  if (await Admin.findOne({ username, password })) {
    res.json({
      token: jwt.sign({ username }, JWT_SECRET),
    });
    return;
  } else {
    res.send("User is not registered as an admin");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const newCourse = await Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
  });
  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  res.json({
    allCourses,
  });
});

module.exports = router;
