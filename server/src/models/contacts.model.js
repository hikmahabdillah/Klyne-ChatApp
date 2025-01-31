import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    contactId: {
      type: String,
      ref: "User",
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contacts = mongoose.model("contacts", contactsSchema);

export default Contacts;
