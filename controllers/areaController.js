import Area from "../models/areaModel.js";
import asyncHandler from "express-async-handler";

export const createArea = asyncHandler(async (req, res) => {
  const { name, code, date, employeeId } = req.body;

  const areaExists = await Area.findOne({ name });
  if (areaExists) {
    res.status(400);
    throw new Error("Area already exists");
  }

  const area = await Area.create({
    name,
    code,
    date,
    employeeId: employeeId || null,
  });

  if (area) {
    res.status(201).json({
      _id: area._id,
      name: area.name,
      loanCode: area.loanCode,
    });
  } else {
    res.status(400);
    throw new Error("Invalid area data");
  }
});

export const getAllAreas = asyncHandler(async (req, res) => {
  const areas = await Area.find({}).populate("employeeId");
  res.json(areas);
});

export const updateArea = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  const updatedArea = await Area.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (updatedArea) {
    res.json(updatedArea);
  } else {
    res.status(404);
    throw new Error("Area not found");
  }
});

export const deleteArea = asyncHandler(async (req, res) => {
  const area = await Area.findById(req.params.id);
  if (area) {
    await area.remove();
    res.json({ message: "Area removed" });
  } else {
    res.status(404);
    throw new Error("Area not found");
  }
});
