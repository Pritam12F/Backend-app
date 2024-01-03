const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const auth = req.headers.authorization;
  const words = auth.split(" ");
  const token = words[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({
        message: "User is not singed in",
      });
    } else {
      next();
    }
  });
}

module.exports = userMiddleware;
