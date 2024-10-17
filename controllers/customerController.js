import Customer from "../models/customerModel.js";
import asyncHandler from "express-async-handler";

// Create a Customer
export const createCustomer = asyncHandler(async (req, res) => {
  const { loanCode, nic, location, areaCode, firstName, surName, address, number, dateOfBirth, gender, civilStatus, income, homeFullIncome, profilePicture, homeImage, billImage, paySheetImage, signatureImage,customerCode } = req.body;

  try {
    const customer = new Customer({
      loanCode: loanCode || null,
      customerCode: customerCode || null,
      nic: nic || null,
      location: location || null,
      areaCode: areaCode || null,
      firstName: firstName || null,
      surName: surName || null,
      address: address || null,
      number: number || null,
      dateOfBirth: dateOfBirth || null,
      gender: gender || null,
      civilStatus: civilStatus || null,
      income: income || null,
      homeFullIncome: homeFullIncome || null,
      profilePicture: profilePicture || null,
      homeImage: homeImage || null,
      billImage: billImage || null,
      paySheetImage: paySheetImage || null,
      signatureImage: signatureImage || null,
    });

    await customer.save();
    res.status(201).json({ success: true, message: "Customer created successfully", customer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get a Customer by ID
export const getACustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Customers
export const getAllCustomer = asyncHandler(async (req, res) => {
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
    const totalCustomer = await Customer.countDocuments();
    const customers = await Customer.find().limit(pageSize).skip(skip)
    return res.json({ success: true, customers , totalPages: Math.ceil(totalCustomer / pageSize) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Update a Customer by ID
export const updateCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    
    Object.assign(customer, req.body);
    await customer.save();
    
    res.json({ success: true, message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export const searchCustomer = asyncHandler(async (req, res) => {
  const { customerCode } = req.query; 
  
  try {
    const customers = await Customer.find({
      customerCode
    }); 

    if (!customers || customers.length === 0) {
      return res.status(200).json({ success: false, message: "No customers found" });
    }

    res.status(200).json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});