import Contacts from "../models/contacts.model.js";
import User from "../models/user.model.js";

export const listUser = async(req, res) => {
  try{
    const loginUserId = req.user._id;

    const users = await User.find({_id: {$ne: loginUserId}}).select("customId email fullName profilePic createdAt");

    res.status(200).json(users);
  }catch(err){
    console.log("Error in listUser controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const listContact = async(req, res) => {
  try{
    const loginUserId = req.user.customId;

    const contacts = await Contacts.find({userId: loginUserId}).select("contactId contactName createdAt");
    const profilePics = await User.find({ customId: { $in: contacts.map(c => c.contactId) } })
    .select("customId profilePic");
    
    const result = contacts.map(contact => {
      const profile = profilePics.find(p => p.customId.toString() === contact.contactId.toString());
      return {
          ...contact.toObject(), 
          profilePic: profile ? profile.profilePic : null
      };
    });

    res.status(200).json(result);
  }catch(err){
    console.log("Error in listContact controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const searchContact = async (req, res) => {
  try {
    const loginUserId = req.user.customId;
    const {contactName} = req.body;
    const filteredContacts = await Contacts.find({
      userId: loginUserId,
      $or: [
        { contactName: { $regex: contactName, $options: "i" } }, // Pencarian nama kontak
      ],
    }).select("-__v"); 
    
    if (!filteredContacts || filteredContacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json(filteredContacts);
  } catch (err) {
    console.log("Error in searchContacts controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const saveContact = async(req, res) => {
  try { 
    const {contactId, contactName} = req.body;
    const userId = req.user.customId;
    
    // input validation
    if (!contactId || !contactName) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // user validation
    const existUser = await User.findOne({customId: contactId});
    if(!existUser) return res.status(404).json({message: "User not found"});

    const contacts = await Contacts.findOne({contactId});
    if(contacts) return res.status(400).json({message: "Contact already exist"});

    const newContact = new Contacts({
      userId,
      contactId,
      contactName
    });

    await newContact.save(); 

    res.status(201).json({newContact, message: "Contact saved successfully"});
  } catch (err) {
    console.log("Error in saveContact controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}