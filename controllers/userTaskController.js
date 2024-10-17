import asyncHandler from "express-async-handler";
import UserTask from "../models/userTaskModel.js";


export const createTask = asyncHandler(async (req, res) => {
     const { userId, customerName, description,address, areaId, amount, date } = req.body; 
     try {
        const userTask = await UserTask.create({
            userId: userId || undefined, 
            customerName: customerName || undefined,
            address: address || undefined,
            areaId: areaId || undefined, 
            amount: amount || undefined, 
            date: date || undefined,
            description: description || undefined
        })
        if (!userTask) {
            return res.status(400).json({success: false, message: "Task not created"})
        }
        return res.status(201).json({success: true, message: "Task created successfully", userTask})
     } catch (error) {
        return res.status(500).json({success: false, message: error.message})
     }
})


export const updateTask = asyncHandler(async (req, res) => {
    const { userId, customerName, address, description, areaId, amount, date } = req.body; 
    try {
        const userTask = await UserTask.findByIdAndUpdate(req.params.id, {
            userId: userId || undefined, 
            customerName: customerName || undefined,
            address: address || undefined,
            areaId: areaId || undefined, 
            amount: amount || undefined, 
            date: date || undefined,
            description: description || undefined
        })
        if (!userTask) {
            return res.status(400).json({success: false, message: "Task not updated"})
        }
        return res.status(201).json({success: true, message: "Task updated successfully", userTask})
    } catch (error) {
       return res.status(500).json({success: false, message: error.message})
    }
})


export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const userTask = await UserTask.findById(req.params.id);
        if (userTask) {
            userTask.isDeleted = true;
            await userTask.save();
            return res.status(200).json({ success: true, message: "Task removed successfully" });
        } else {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

export const submitTask = asyncHandler(async (req, res) => {
    const {statusDescription} = req.body
    try {
        const userTask = await UserTask.findByIdAndUpdate(req.params.id, {
            status : "completed",
            statusDescription : statusDescription || undefined
        })
        if (!userTask) {
            return res.status(400).json({success: false, message: "Task not submitted"})
        }
        return res.status(201).json({success: true, message: "Task submitted successfully", userTask})
    } catch (error) {
       return res.status(500).json({success: false, message: error.message})
    }
})



export const getAllUserTask = asyncHandler(async (req, res) => {
    const { search } = req.query;
    try {
        const query = search ? { userId: search } : {};
        query.isDeleted = false

        const userTask = await UserTask.find(query).populate({ path: "userId", select: "-password" }).populate("areaId")
        if (userTask) {
            return res.status(200).json({ success: true, message: "Task fetched successfully", userTask });
        } else {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})