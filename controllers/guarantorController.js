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

  try {
    const guarantorExists = await Guarantor.findOne({ nic });
    if (guarantorExists) {
      return res.status(400).json({ success: false, message: "Guarantor already exists with this NIC" });
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
      return res.status(201).json({ success: true, message: "Guarantor created successfully", guarantor });
    } else {
      return res.status(400).json({ success: false, message: "Invalid guarantor data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Get all Guarantors
export const getAllGuarantors = asyncHandler(async (req, res) => {
  try {
    const guarantors = await Guarantor.find({});
    return res.status(200).json({ success: true, guarantors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
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

  try {
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
      return res.status(200).json({ success: true, message: "Guarantor updated successfully", guarantor: updatedGuarantor });
    } else {
      return res.status(404).json({ success: false, message: "Guarantor not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a Guarantor
export const deleteGuarantor = asyncHandler(async (req, res) => {
  try {
    const guarantor = await Guarantor.findById(req.params.id);

    if (guarantor) {
      await guarantor.remove();
      return res.status(200).json({ success: true, message: "Guarantor removed successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Guarantor not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
