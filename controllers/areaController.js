import Area from "../models/areaModel.js";
import asyncHandler from "express-async-handler";

// Create a new Area
export const createArea = asyncHandler(async (req, res) => {
  const { name,  date, employeeId } = req.body;

  try {
    const areaExists = await Area.findOne({ name });
    
    if (areaExists) {
      return res.status(400).json({ success: false, message: "Area already exists" });
    }

    const area = await Area.create({
      name,
    
      date,
      employeeId: employeeId || null,
    });

    if (area) {
      res.status(201).json({ 
        success: true, 
        message: "Area created successfully", 
        area: {
          _id: area._id,
          name: area.name,
          date: area.date,
          employeeId: area.employeeId
        } 
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid area data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all Areas
export const getAllAreas = asyncHandler(async (req, res) => {
  try {
    const areas = await Area.find({}).populate("employeeId");
    res.status(200).json({ success: true, areas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update an Area by ID
export const updateArea = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedArea) {
      res.status(200).json({ success: true, message: "Area updated successfully", area: updatedArea });
    } else {
      res.status(404).json({ success: false, message: "Area not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete an Area by ID
export const deleteArea = asyncHandler(async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);

    if (area) {
      await area.remove();
      res.status(200).json({ success: true, message: "Area removed successfully" });
    } else {
      res.status(404).json({ success: false, message: "Area not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
