import express from "express";
import { login, signup, logout, updateProfile, updatePhotoProfile, checkAuth } from "../controllers/auth.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.patch("/update-profile", protectRoute, updateProfile);
router.put("/update-photo-profile", protectRoute, updatePhotoProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
