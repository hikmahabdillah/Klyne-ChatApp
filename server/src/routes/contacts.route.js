import express from "express";
import { saveContact, searchContact, searchUser, listContact, listUser } from "../controllers/contacts.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, listContact);
router.get("/list-user", protectRoute, listUser);
router.get("/search-user", protectRoute, searchUser);
router.get("/search-contact", protectRoute, searchContact);
router.post("/save-contact", protectRoute, saveContact);

export default router;
