const mongoose = require('mongoose');
const room = require('../models/room');
const { successResponse, errorResponse } = require('../utils');

const viewRooms = async (req, res) => {
  try {
    const busData = await room.find();

    // check if bus is exist or not
    if (!busData) {
      return errorResponse(req, res, 'bus Not Found', 404);
    } else {
      res.render("viewRooms", {
        buses: busData, message: ' '
      });
      // return successResponse(req, res, busData, 200);
    }

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addRoom = async (req, res) => {
  try {
    const { roomname } = req.body.roomname;
    // check if bus allready registered or not
    const busData = await room.findOne({ roomname: roomname });
    if (busData) {
      return errorResponse(req, res, 'room allready registered', 400);
    };

    const payload = req.body;

    // insert bus payload in database
    const newbus = new room(payload);
    const insertBus = await newbus.save();

    res.redirect('/room');
    // return successResponse(req, res, insertBus, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const addRoomView = async (req, res) => {
  res.render("addRoom");
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // check if bus exist or not
    const busData = await room.findOne({ _id: id });
    if (!busData) {
      return errorResponse(req, res, 'room not found', 404);
    }

    // deleteing bus from database
    const deleteBusData = await room.findByIdAndDelete(id);
    res.redirect("/room");
    
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

module.exports = { viewRooms, addRoom, addRoomView, deleteRoom };
