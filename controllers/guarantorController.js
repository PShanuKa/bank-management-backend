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
    guarantorCode

  } = req.body;

  try {
    const guarantorExists = await Guarantor.findOne({ nic });
    if (guarantorExists) {
      return res.status(400).json({ success: false, message: "Guarantor already exists with this NIC" });
    }

    const guarantor = await Guarantor.create({
      nic: nic || null,
      location: location || null,
      firstName: firstName || null,
      surName: surName || null,
      address: address || null,
      number: number || null,
      gender: gender || null,
      dateOfBirth: dateOfBirth || null,
      civilStatus: civilStatus || null,
      profilePicture: profilePicture || null,
      guarantorCode: guarantorCode || null

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
export const getAllGuarantors =  asyncHandler(async (req, res) => {
  const {
    sortBy = "createdAt", 
    sortOrder = "desc",   
    page = 1,            
    limit = 20           
  } = req.query

  const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;
  
  try {
    const totalGuarantor = await Guarantor.countDocuments();
    const guarantors = await Guarantor.find().limit(pageSize).skip(skip).sort(sortOptions);
    return res.json({ success: true, guarantors , totalPages: Math.ceil(totalGuarantor / pageSize) });
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
    guarantorCode
  } = req.body;
  

  try {
    const guarantor = await Guarantor.findById(req.params.id);
    
    if (guarantor) {
      guarantor.nic = nic || guarantor.nic || null;
      guarantor.location = location || guarantor.location || null;
      guarantor.firstName = firstName || guarantor.firstName  || null;
      guarantor.surName = surName || guarantor.surName || null;
      guarantor.address = address || guarantor.address || null;
      guarantor.number = number || guarantor.number || null;
      guarantor.gender = gender || guarantor.gender || null;
      guarantor.dateOfBirth = dateOfBirth || guarantor.dateOfBirth || null;
      guarantor.civilStatus = civilStatus || guarantor.civilStatus || null;
      guarantor.profilePicture = profilePicture || guarantor.profilePicture || null;
      guarantor.guarantorCode = guarantorCode || guarantor.guarantorCode || null

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


export const searchGuarantor = asyncHandler(async (req, res) => {
  const { guarantorCode } = req.query; 

  try {
    const guarantors = await Guarantor.find({
      guarantorCode
    }); 
    
    if (!guarantors || guarantors.length === 0) {
      return res.status(200).json({ success: false, message: "No Guarantors found" });
    }

    res.status(200).json({ success: true, guarantors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});