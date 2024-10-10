import Customer from "../models/customerModel.js";
import asyncHandler from "express-async-handler";

export const createCustomer = asyncHandler(async (req, res) => {
    const { loanCode, nic, location, areaCode, firstName, surName, address, number, dateOfBirth, gender, civilStatus, income, homeFullIncome, profilePicture, homeImage, billImage, paySheetImage, signatureImage } = req.body;  

    try {
      
      const customer = new Customer({
        loanCode : loanCode || null,
        nic : nic || null,
        location : location || null,
        areaCode : areaCode || null,
        firstName : firstName || null,
        surName : surName || null,
        address : address || null,
        number : number || null,
        dateOfBirth : dateOfBirth || null,
        gender : gender || null,
        civilStatus: civilStatus || null,
        income : income || null,
        homeFullIncome : homeFullIncome || null,
        profilePicture : profilePicture || null,
        homeImage : homeImage || null,
        billImage : billImage || null,
        paySheetImage : paySheetImage || null,
        signatureImage : signatureImage || null
      });
      await customer.save();
      res.status(201).json({ message: "Customer created successfully", customer });
    } catch (error) {
      res.status(400)
      throw new Error(error);
    }
  
  });
  

 
  export const getACustomer = asyncHandler(async (req, res) => {
    try {
      
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        res.json(customer);
      }
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  });

  export const getAllCustomer = asyncHandler(async (req, res) => {
    try {
      const customers = await Customer.find({});
      res.json(customers);
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  });
  

  export const updateCustomer = asyncHandler(async (req, res) => {
    try {
      
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        Object.assign(customer, req.body);
        await customer.save();
        res.json({ message: "Customer updated successfully", customer });
      }
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  });