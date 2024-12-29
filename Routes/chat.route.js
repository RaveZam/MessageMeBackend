const express = require("express");
const router = express.Router();

const {
  CreateRoom,
  sendMessage,
  getChatRooms,
} = require("../Controllers/chat.controller");

router.post("/CreatRoom", CreateRoom);
router.post("/sendMessage", sendMessage);
router.post("/getChatRooms", getChatRooms);

module.exports = router;
