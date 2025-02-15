import Contacts from "../models/contacts.model.js";
import User from "../models/user.model.js";

export const userList = async (req, res) => {
  try {
    const loginUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loginUserId } }).select(
      "customId email fullName profilePic createdAt"
    );

    res.status(200).json(users);
  } catch (err) {
    console.log("Error in userList controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { searchId } = req.query;
    const users = await User.find({
      customId: { $regex: new RegExp(`^${searchId}`, "i") },
      _id: { $ne: userId },
    }).select("-__v");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.log("Error in userList controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const detailContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const loginUserId = req.user.customId;

//     const contact = await Contacts.findOne({
//       userId: loginUserId,
//       contactId: id,
//     }).lean();

//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     const profile = await User.findOne({ customId: id })
//       .select("customId profilePic")
//       .lean();

//     const result = {
//       ...contact,
//       profilePic: profile ? profile.profilePic : null,
//     };

//     res.status(200).json(result);
//   } catch (err) {
//     console.error("Error in detailContact controller:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const contactList = async (req, res) => {
  try {
    const loginUserId = req.user.customId;

    const contacts = await Contacts.find({ userId: loginUserId }).select(
      "userId contactId contactRef contactName createdAt"
    );
    const profilePics = await User.find({
      customId: { $in: contacts.map((c) => c.contactId) },
    }).select("customId profilePic");

    const result = contacts.map((contact) => {
      const profile = profilePics.find(
        (p) => p.customId.toString() === contact.contactId.toString()
      );
      return {
        ...contact.toObject(),
        profilePic: profile ? profile.profilePic : null,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.log("Error in contactList controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchContact = async (req, res) => {
  try {
    const loginUserId = req.user.customId;
    const { contactName } = req.query;
    const contacts = await Contacts.find({
      userId: loginUserId,
      $or: [{ contactName: { $regex: contactName, $options: "i" } }],
    }).select("-__v");
    const profilePics = await User.find({
      customId: { $in: contacts.map((c) => c.contactId) },
    }).select("customId profilePic");

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    const result = contacts.map((contact) => {
      const profile = profilePics.find(
        (p) => p.customId.toString() === contact.contactId.toString()
      );
      return {
        ...contact.toObject(),
        profilePic: profile ? profile.profilePic : null,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.log("Error in searchContacts controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveContact = async (req, res) => {
  try {
    const { contactId, contactName } = req.body;
    const userId = req.user.customId;

    // Input validation
    if (!contactId || !contactName) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // User validation
    const existUser = await User.findOne({ customId: contactId });
    if (!existUser) return res.status(404).json({ message: "User not found" });

    const contactRef = existUser._id.toString();

    // Cek apakah kontak sudah ada
    const contacts = await Contacts.findOne({ contactId, userId });
    if (contacts)
      return res.status(400).json({ message: "Contact already exists" });

    // Simpan kontak baru
    const newContact = new Contacts({
      userId,
      contactRef,
      contactId,
      contactName,
    });

    await newContact.save();

    res.status(201).json({
      newContact: {
        ...newContact.toObject(),
        profilePic: existUser.profilePic,
      },
      message: "Contact saved successfully",
    });
  } catch (err) {
    console.log("Error in saveContact controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.user.customId;

    const deletedUser = await Contacts.findOneAndDelete({ contactId, userId });

    if (!deletedUser) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("Error in deleteContact controller", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
