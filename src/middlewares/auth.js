const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { errorResponse } = require('../utils');

const auth = async (req, res, next) => {
    try {
      let token = req.cookies.accessToken;
      let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      let matchedUser = await user.findById(payload.id, "-password -__v");
      if (!matchedUser) {
        return errorResponse(req, res, "User Not Found", 404);
      }
      req.user = matchedUser;
      // res.redirect('/login');
      next();
    } catch (error) {
      console.log('er auth-->', error.message);
      res.redirect('/login');
      // return errorResponse(req, res, 'Unauthorized!!!', 401);
    }
}

module.exports = { auth }
