const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const getChatRooms = async (req, res) => {};

const CreateRoom = async (req, res) => {
  const { participants, chatname } = req.body;

  try {
    const room = new Chat({ participants, chatname });
    await room.save();
    res.status(201).json({ message: "Room Created" });
  } catch (error) {
    res.status(500).json({ message: "Failed To Create", error });
  }
};

const sendMessage = async (req, res) => {};

module.exports = { CreateRoom, sendMessage };
