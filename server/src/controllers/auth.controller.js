import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const login = async (req, res) => {
  const {email, password} = req.body;
  try{
    // input validation
    if(!email || !password) return res.status(400).json({ message: "Please provide all required fields" });

    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message: "User not found!"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: "Invalid password!"});

    // after validation email and password, generate jwt token
    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      customId: user.customId,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: "User login successfully"
    });
  }catch(err){
    console.log("Error in login controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const signup = async (req, res) => {
  const {customId, fullName, email, password} = req.body;
  try{
    // input validation
    if (!customId || !fullName || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // hash password
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }

   // Check for existing customId
   const existingCustomId = await User.findOne({ customId });
   if (existingCustomId) {
     return res.status(400).json({ message: "Custom ID already exists" });
   }

   // Check for existing email
   const existingEmail = await User.findOne({ email });
   if (existingEmail) {
     return res.status(400).json({ message: "Email already exists" });
   }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({customId, fullName, email, password: hashedPassword});

    if(newUser){
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        customId: newUser.customId,
        fullName: newUser.fullName,
        email: newUser.email,
        message: "User created successfully"
      });
    }else{
      res.status(400).json({message: "Invalid user data"});
    }
  }catch(err){
    console.log("Error in signup controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}
export const logout = (req, res) => {
  try{
    // res.cookie("jwt", "", {maxAge:0});
    res.clearCookie('jwt');
    res.status(200).json({message: "Logout successfully"});
  }catch(err){
    console.log("Error in logout controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const updateProfile = async (req, res) => {
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic){
      return res.status(400).json({message: "Profile pic is required!"});
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true})

    res.status(200).json(updatedUser);
  }catch(err){
    console.log("Error in update profile controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}

export const checkAuth = async(req,res) => {
  try{
    res.status(200).json(req.user);
  }catch(err){
    console.log("Error in check auth controller", err);
    res.status(500).json({message: "Internal server error"});
  }
}