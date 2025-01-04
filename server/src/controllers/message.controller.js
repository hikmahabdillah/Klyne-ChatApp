import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForContacts = async (req, res) => {
  try {
    const loginUserId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne:loginUserId}}).select("-password");

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUserForContacts controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const getMessages = async(req,res) => {
  try {
    const {id:userToChatId} = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({$or: 
    [
      {senderId:senderId, receiverId:userToChatId},
      {senderId:userToChatId, receiverId:senderId},
    ]})

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const sendMessage = async(req, res) => {
  try { 
    const {text, image} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save(); // save it to database

    // todo: realtime functionality => socket.io

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}