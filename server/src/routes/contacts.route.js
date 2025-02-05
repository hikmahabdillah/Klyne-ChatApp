import express from "express";
import {
  saveContact,
  searchContact,
  searchUser,
  contactList,
  deleteContact,
  userList,
} from "../controllers/contacts.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, contactList);
// router.get("/detail-contact/:id", protectRoute, detailContact);
router.get("/list-user", protectRoute, userList);
router.get("/search-user", protectRoute, searchUser);
router.get("/search-contact", protectRoute, searchContact);
router.post("/save-contact", protectRoute, saveContact);
router.delete("/delete-contact/:contactId", protectRoute, deleteContact);

export default router;
