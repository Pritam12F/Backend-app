const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({ username, password });
  res.json({
    message: "User created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  if (await User.findOne({ username, password })) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.send("User is not signed up, please sign up first");
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.body.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourse: courseId,
      },
    }
  );
  res.json({
    message: "Course Purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.body.username;
  const user = await User.findOne({ username });
  const purchasedCourses = user.purchasedCourse;
  res.json({
    purchasedCourses,
  });
});

module.exports = router;
