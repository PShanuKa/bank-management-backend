import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../config/jwtToken.js";
import { validateMongoDbId } from "../config/validateMongoDbId.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    surName,
    email,
    password,
    mobileNumber,
    nic,
    gender,
    dateOfBirth,
    civilStatus,
    address,
    location,
    profilePicture,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      firstName,
      surName,
      email,
      password,
      mobileNumber,
      nic,
      gender: gender || null,
      dateOfBirth : dateOfBirth || null,
      civilStatus : civilStatus || null,
      address,
      location,
      profilePicture,
    });

    const { password: pass, ...others } = newUser._doc;

    if (newUser) {
      res.status(201).json({
        message: "User created successfully",
        user: others,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatched(password))) {
      const { password, ...rest } = user._doc;
      res.json({
        user: rest,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    validateMongoDbId(id);

    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
