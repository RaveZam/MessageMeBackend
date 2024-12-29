const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const getChatRooms = async (req, res) => {
  const { id } = req.body;

  try {
    const chatRooms = await Chat.find({
      participants: id,
    });

    if (!chatRooms.length) {
      res.status(404).json({ message: "No Rooms Found!" });
    }
    console.log(chatRooms);
    res.status(200).json({
      chatRooms,
      message: "Chatrooms found successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Error Loading Chatrooms", error });
  }
};

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

module.exports = { CreateRoom, sendMessage, getChatRooms };
