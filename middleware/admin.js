const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const auth = req.headers.authorization;
  const word = auth.split(" ");
  const token = word[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.json({
        msg: "Admin is not signed in",
      });
    } else {
      next();
    }
  });
}

module.exports = adminMiddleware;
