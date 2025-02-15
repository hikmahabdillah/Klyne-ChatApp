import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import mongoose from "mongoose";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Contacts from "../models/contacts.model.js";

export const getUsersForContacts = async (req, res) => {
  try {
    const loginUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUserForContacts controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatList = async (req, res) => {
  try {
    const idUser = req.user._id;
    const customId = req.user.customId;

    if (!mongoose.Types.ObjectId.isValid(idUser)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const messages = await Message.find({
      $or: [{ senderId: idUser }, { receiverId: idUser }],
    }).sort({ createdAt: 1 });

    const userIds = new Set();

    messages.forEach((msg) => {
      if (
        mongoose.Types.ObjectId.isValid(msg.senderId) &&
        mongoose.Types.ObjectId.isValid(msg.receiverId)
      ) {
        if (msg.receiverId.toString() === idUser.toString()) {
          userIds.add(msg.senderId.toString());
        } else {
          userIds.add(msg.receiverId.toString());
        }
      }
    });

    const userList = await User.find({ _id: { $in: [...userIds] } });
    const contacts = await Contacts.find({
      userId: customId,
    }).select("-__v");
    const chatList = new Map();

    userList.forEach((user) => {
      const contact = contacts.find(
        (contact) => contact.contactRef.toString() === user._id.toString()
      );

      if (!contact) {
        chatList.set(user._id.toString(), {
          _id: user._id,
          customId: user.customId,
          fullName: user.fullName,
          profilePic: user.profilePic,
        });
      }
    });

    const profilePics = await User.find({
      customId: { $in: contacts.map((c) => c.contactId) },
    }).select("customId profilePic");

    contacts.forEach((contact) => {
      const profile = profilePics.find((p) => p.customId === contact.contactId);

      chatList.set(contact.contactRef.toString(), {
        _id: contact.contactRef,
        customId: contact.contactId,
        fullName: contact.contactName,
        profilePic: profile.profilePic ?? null,
      });
    });

    res.status(200).json([...chatList.values()]);
  } catch (err) {
    console.log("Error in getChatList controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
