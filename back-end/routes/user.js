import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import authenticateToken from "./userAuth.js";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 3" });
    }

    const existUsername = await User.findOne({ username: username });

    if (existUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });

    return res.status(200).json({
      message: "Signup successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existUser = await User.findOne({ username: username });

    if (!existUser) {
      return res.status(400).json({ message: "Username is incorrect" });
    }

    const verified = bcrypt.compareSync(password, existUser.password);

    if (!verified) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const authClaim = [{ name: existUser.username }, { role: existUser.role }];
    const token = jwt.sign({ authClaim }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "Sign in successfully",
      id: existUser._id,
      role: existUser.role,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Update address successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
