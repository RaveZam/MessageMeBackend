const express = require("express");
const router = express.Router();

const { CreateRoom, sendMessage } = require("../Controllers/chat.controller");

router.post("/CreatRoom", CreateRoom);
router.post("/sendMessage", sendMessage);

module.exports = router;
