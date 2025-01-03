const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;

  const decode = jwt.verify(token, JWT_ADMIN_PASSWORD);

  if (decode) {
    req.userId = decode.id;
    next();
  } else {
    res.json({
      message: "You are not signed in",
    });
  }
}

module.exports = {
  adminMiddleware,
};
