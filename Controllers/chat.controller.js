const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const getChatRooms = async (req, res) => {
  const { id } = req.body;
  try {
    const chatRooms = await Chat.find({
      participants: id,
    });

    const chatRoomName = await Promise.all(
      chatRooms.map(async (room) => {
        const otherParticipantId = room.participants.find(
          (participantid) => participantid != id
        );

        const otherParticipant = await User.findById(otherParticipantId).select(
          "username"
        );

        // const SessionUser = await User.findById(id).select("username");

        return {
          ...room.toObject(),
          otherParticipantName: otherParticipant
            ? otherParticipant.username
            : "Unknown",
          // SessionUser: SessionUser ? SessionUser.username : "Unknown",
        };
      })
    );

    res.status(200).json({
      chatRoomName,
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
