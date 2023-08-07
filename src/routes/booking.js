const express = require('express');
const { auth } = require("../middlewares/auth");
const { loginAuth } = require("../middlewares/loginAuth");

const {
  addBooking,
  cancelBooking,
  viewBookingByUser,
  addBookingView,
  fetchAll,
  fetchAllData,
  bookingDetails,
  updateBooking,
  bookingDetail,
} = require("../controllers/booking.controller");

const route = express.Router();

route.get('/bookingpage/:id', auth, addBookingView);
route.post('/booking/:id', auth, addBooking);
route.get('/cancel/:id', auth, cancelBooking);
route.get('/mybooking', auth, viewBookingByUser);
route.get('/', fetchAll);
route.get('/schedule', auth, fetchAllData);
route.post('/bydate', auth, bookingDetails);
route.post('/date', bookingDetail);
route.get('/update/:id', auth, updateBooking);

module.exports = route;
