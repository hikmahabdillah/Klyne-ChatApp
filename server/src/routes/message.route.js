import express from "express";
import {
  getUsersForContacts,
  getMessages,
  getChatList,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForContacts);
router.get("/chat", protectRoute, getChatList);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
