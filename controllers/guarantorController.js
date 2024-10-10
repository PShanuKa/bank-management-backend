import Guarantor from "../models/guarantorModel.js";
import asyncHandler from "express-async-handler";

// Create a Guarantor
export const createGuarantor = asyncHandler(async (req, res) => {
  const {
    nic,
    location,
    firstName,
    surName,
    address,
    number,
    gender,
    dateOfBirth,
    civilStatus,
    profilePicture,
  } = req.body;

  const guarantorExists = await Guarantor.findOne({ nic });
  if (guarantorExists) {
    res.status(400);
    throw new Error("Guarantor already exists with this NIC");
  }

  const guarantor = await Guarantor.create({
    nic,
    location,
    firstName,
    surName,
    address,
    number,
    gender,
    dateOfBirth,
    civilStatus,
    profilePicture,
  });

  if (guarantor) {
    res.status(201).json(guarantor);
  } else {
    res.status(400);
    throw new Error("Invalid guarantor data");
  }
});

// Get all Guarantors
export const getAllGuarantors = asyncHandler(async (req, res) => {
  const guarantors = await Guarantor.find({});
  res.json(guarantors);
});

// Update a Guarantor
export const updateGuarantor = asyncHandler(async (req, res) => {
  const {
    nic,
    location,
    firstName,
    surName,
    address,
    number,
    gender,
    dateOfBirth,
    civilStatus,
    profilePicture,
  } = req.body;

  const guarantor = await Guarantor.findById(req.params.id);

  if (guarantor) {
    guarantor.nic = nic || guarantor.nic;
    guarantor.location = location || guarantor.location;
    guarantor.firstName = firstName || guarantor.firstName;
    guarantor.surName = surName || guarantor.surName;
    guarantor.address = address || guarantor.address;
    guarantor.number = number || guarantor.number;
    guarantor.gender = gender || guarantor.gender;
    guarantor.dateOfBirth = dateOfBirth || guarantor.dateOfBirth;
    guarantor.civilStatus = civilStatus || guarantor.civilStatus;
    guarantor.profilePicture = profilePicture || guarantor.profilePicture;

    const updatedGuarantor = await guarantor.save();
    res.json(updatedGuarantor);
  } else {
    res.status(404);
    throw new Error("Guarantor not found");
  }
});

// Delete a Guarantor
export const deleteGuarantor = asyncHandler(async (req, res) => {
  const guarantor = await Guarantor.findById(req.params.id);

  if (guarantor) {
    await guarantor.remove();
    res.json({ message: "Guarantor removed" });
  } else {
    res.status(404);
    throw new Error("Guarantor not found");
  }
});
