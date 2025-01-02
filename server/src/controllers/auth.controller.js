import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
 
}
export const signup = async (req, res) => {
  const {fullName, email, password, profilePic} = req.body;
  try{
    // input validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // hash password
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    const user = await User.findOne({email});

    if(user) return res.status(400).json({message: "Email already exists"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({fullName, email, password: hashedPassword});

    if(newUser){
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
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
  res.send("logout router");
}