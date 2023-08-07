const mongoose = require('mongoose');
const room = require('../models/room');
const gallery = require('../models/gallery');
const { successResponse, errorResponse } = require('../utils');

const viewRooms = async (req, res) => {
  try {
    let role = req.user.emailID;
    const busData = await room.find();

    // check if bus is exist or not
    if (!busData) {
      return errorResponse(req, res, 'bus Not Found', 404);
    } else {
      res.render("viewRooms", {
        buses: busData, message: ' ', role
      });
      // return successResponse(req, res, busData, 200);
    }

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addRoom = async (req, res) => {
  try {
    const { roomname } = req.body;
 
    // check if bus allready registered or not
    const busData = await room.findOne({ roomname: roomname });
    if (busData) {
      return errorResponse(req, res, 'room allready registered', 400);
    };

    const payload = {
    roomname: req.body.roomname,
    photo: req.file.path,
    };

    // insert bus payload in database
    const newbus = new room(payload);
    const insertBus = await newbus.save();

    res.redirect('/room');
    // return successResponse(req, res, insertBus, 200);
  } catch (error) {
    console.log(error.message);
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

const addGallery = async (req, res) => {
  try {

    const payload = {
      title: req.body.title,
      photo: req.file.path,
    };

    // insert bus payload in database
    const newbus = new gallery(payload);
    const insertBus = await newbus.save();

    res.redirect('/galleryview');
    // return successResponse(req, res, insertBus, 200);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const addGalleryView = async (req, res) => {
  res.render("addGallery");
};

const galleryView = async (req, res) => {
  try {
    const photos = await gallery.find();
    res.render("viewGallery", { photos: photos });
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

module.exports = { viewRooms, addRoom, addRoomView, deleteRoom, addGalleryView, addGallery, galleryView, };
