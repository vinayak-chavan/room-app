const { errorResponse } = require("../utils/index");

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return errorResponse(req, res, "Not Authorized", 404);
  }
  return next();
};

module.exports = { isAdmin };
