const expressJwt = require("express-jwt");
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.checkAdminRoute = (req, res, next) => {
  if (req?.auth?.user?.role === 0) {
    return res.status(400).json({
      message: "You are not logged in as an Admin",
    });
  } else {
    next();
  }
};
