import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../config/jwtToken.js";
import { validateMongoDbId } from "../config/validateMongoDbId.js";
import bcrypt from "bcrypt";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const {
    designation,
    location,
    profilePicture,
    firstName,
    surName,
    email,
    password,
    nic,
    gender,
    dateOfBirth,
    mobileNumber,
    address,
    civilStatus,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({
      firstName: firstName || null,
      surName:  surName   || null,
      email: email || null,
      password: password || null,
      mobileNumber: mobileNumber || null,
      isAdmin: designation === "admin" ? true : false,
      nic: nic || null,
      gender: gender || null,
      dateOfBirth: dateOfBirth || null,
      civilStatus: civilStatus || null,
      address: address || null,
      location: location || null,
      profilePicture: profilePicture || null,
    });

    const { password: pass, ...others } = newUser._doc;

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: others,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatched(password))) {
      const { password, ...rest } = user._doc;
      return res.json({
        success: true,
        message: "Login successful",
        user: rest,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Update User
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    validateMongoDbId(id);

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (updatedUser) {
      const { password, ...others } = updatedUser._doc;
      return res.json({
        success: true,
        message: "User updated successfully",
        user: others,
      });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Get a User
export const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    validateMongoDbId(id);

    const user = await User.findById(id);
    if (user) {
      return res.json({ success: true, user });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Users
export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
