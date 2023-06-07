const express = require('express');
const { auth } = require("../middlewares/auth");

const {
  viewRooms,
  addRoom,
  addRoomView,
  deleteRoom,
} = require('../controllers/bus.controller');

const route = express.Router();

route.get("/room", auth, viewRooms);
route.get("/addroom", auth, addRoomView);
route.post('/room', auth, addRoom);
route.get('/room/:id', auth, deleteRoom);

module.exports = route;