import express from "express";
import { saveContact, searchContact, listContact } from "../controllers/contacts.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, listContact);
router.get("/search-contact", protectRoute, searchContact);
router.post("/save-contact", protectRoute, saveContact);

export default router;
