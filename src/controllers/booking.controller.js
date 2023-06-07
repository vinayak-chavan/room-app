const mongoose = require("mongoose");

const user = require("../models/user");
const room = require("../models/room");
const booking = require("../models/booking");

const { successResponse, errorResponse } = require("../utils/index");
const { sendmail } = require("../utils/mail");

const addBooking = async (req, res) => {
  try {
    const roomId = req.params.id;
    const userId = req.user._id;
    const roomDetails = await room.findOne({_id: roomId});
    const { date, reason, timeSlot } = req.body;

    const book = await booking.findOne({roomId: roomId, date: date, timeSlot: timeSlot});
    
    if(book != null) {
      const busData = await room.find();
      res.render("viewRooms", { buses: busData, message: 'Sorry!! This slot is already booked.' });
    } else {
    const payload = {
      userId,
      roomId,
      date,
      reason,
      timeSlot,
    };

    const newBooking = new booking(payload);
    const insertBooking = await newBooking.save();

    let a = new Date(date).toString();
    a = a.substring(4,15);

    sendmail(
      req.user.emailID,
      "Room Booking Confirmation",
      ` <p> Hello <strong>${req.user.username}</strong> </p> <
            <p> Your request for booking ${roomDetails.roomname} has been confirmed</p>
            <p> Details </p>
            <p> Room : ${roomDetails.roomname} <br>
            Reason : ${reason} </p>
            <p> On Date : <strong> ${a} </strong> </br>
            <p> <strong> ${timeSlot} </strong> </p>`
    );
    res.redirect('/mybooking');
    }
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 500, { err: error });
  }
};

const viewBookingByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookingData = await booking
      .find({ userId: userId })
      .populate("userId")
      .populate("roomId");

      res.render("myBookings", { bookings: bookingData });

  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // check if booking exist or not
    const bookingData = await booking.findByIdAndDelete({ _id: id });
    if (!bookingData) {
      return errorResponse(req, res, "data not found", 404);
    }
    else {
      res.redirect("/myBooking");
    }
    // return successResponse(req, res, cancelBookingData, 200);
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const addBookingView = async (req, res) => {
  try {
    let roomId = req.params.id;
    const roomData = await room.findOne({ _id: roomId });
    res.render("addBooking", { room: roomData });
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const fetchAllData = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingData = await booking.find({date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } })
      .populate("userId")
      .populate("roomId");

    bookingData.sort(function(a, b) {
    return a.roomId.roomname.localeCompare(b.roomId.roomname);
    });

    res.render("allBookings", { bookings: bookingData });
  } catch (error) {
    console.log('err-->', error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const bookingDetails = async (req, res) => {
  try {
    const today = req.body.date;
    // today.setHours(0, 0, 0, 0);
    const bookingData = await booking.find({date: today })
      .populate("userId")
      .populate("roomId");

    bookingData.sort(function(a, b) {
    return a.roomId.roomname.localeCompare(b.roomId.roomname);
    });
    res.render("allBookings", { bookings: bookingData });
  } catch (error) {
    console.log('err-->', error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

module.exports = {
  addBooking,
  cancelBooking,
  viewBookingByUser,
  fetchAllData,
  addBookingView,
  bookingDetails,
};
