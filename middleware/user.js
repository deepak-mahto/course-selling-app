const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.body.token;

  const decode = jwt.verify(token, JWT_USER_PASSWORD);

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
  userMiddleware,
};
