const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { errorResponse } = require('../utils');

const loginAuth = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;
    if(token === undefined) {
      let message = '';
      res.render("login", {message: message});
    } else {
      let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      let matchedUser = await user.findById(payload.id, "-password -__v");
      if (!matchedUser) {
        return errorResponse(req, res, "User Not Found", 404);
      }
      req.user = matchedUser;
      res.redirect('/alladmin');
    }
  } catch (error) {
    console.log('loginAuth-->', error.message);
    console.log('here');
    // res.redirect('/login');
    next();
    // return errorResponse(req, res, 'Unauthorized!!!', 401);
  }
}

module.exports = { loginAuth }
