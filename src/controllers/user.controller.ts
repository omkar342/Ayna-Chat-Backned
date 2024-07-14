import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateAccessToken } from "../middlewares/jwt.middleware";
import { CustomRequest } from "../middlewares/jwt.middleware";

const User = require("../models/user.model");

const registerController = async (req: Request, res: Response) => {
  try {
    const { userEmail, password, confirmPassword } = req.body;

    if (!userEmail || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password does not match." });
    }

    const userExists = await User.findOne({ email: userEmail });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      email: userEmail,
      password: hashedPassword,
    });

    user.save();

    const token = await generateAccessToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userData: user,
      accessToken: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { userEmail, password } = req.body;

    if (!userEmail || !password) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const passwordMatches = bcrypt.compareSync(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      userData: user,
      accessToken: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginWithTokenController = async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req?.userId);

    if (user) {
      return res.status(200).json({ success: true, userData: user, message: "User logged in successfully!" });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerController, loginController, loginWithTokenController };
