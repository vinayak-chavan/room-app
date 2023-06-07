const express = require('express');
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

const {
  addBooking,
  cancelBooking,
  viewBookingByUser,
  addBookingView,
  fetchAllData,
  bookingDetails
} = require("../controllers/booking.controller");

const route = express.Router();

route.get('/bookingpage/:id', auth, addBookingView);
route.post('/booking/:id', auth, addBooking);
route.get('/cancel/:id', auth, cancelBooking);
route.get('/mybooking', auth, viewBookingByUser);
route.get('/', fetchAllData);
route.post('/bydate', bookingDetails);

module.exports = route;
