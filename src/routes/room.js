const express = require('express');
const { auth } = require("../middlewares/auth");
const upload = require('./../middlewares/upload');

const {
  viewRooms,
  addRoom,
  addRoomView,
  deleteRoom,
  addGalleryView,
  addGallery,
  galleryView,
} = require('../controllers/bus.controller');

const route = express.Router();

route.get('/room', auth, viewRooms);
route.get('/addroom', auth, addRoomView);
route.post('/room', auth, upload.single("photo"), addRoom);
route.get('/room/:id', auth, deleteRoom);

route.get('/gallery', auth, addGalleryView);
route.post('/gallery', auth, upload.single("photo"), addGallery);
route.get('/galleryview', auth, galleryView);

module.exports = route;