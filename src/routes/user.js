const express = require("express");
const { auth } = require('../middlewares/auth');
const { isAdmin } = require("../middlewares/isAdmin");

const {
  login,
  logout,
  loginView,
  addAdminView,
  viewAllAdmins,
  deleteAdmin,
  addAdmin,
} = require("../controllers/user.controller");

const route = express.Router();

route.get('/login', loginView);
route.post('/login', login);
route.get('/logout', auth, logout);
route.post('/admin', auth, addAdmin);
route.get('/delete/:id', auth, deleteAdmin);
route.get('/admin', auth, addAdminView);
route.get('/alladmin', auth, viewAllAdmins);

module.exports = route;
