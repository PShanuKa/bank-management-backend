import Customer from "../models/customerModel.js";
import asyncHandler from "express-async-handler";

export const createCustomer = asyncHandler(async (req, res) => {
    const { loanCode, nic, location, areaCode, firstName, surName, address, number, dateOfBirth, gender, civilStatus, income, homeFullIncome, profilePicture, homeImage, billImage, paySheetImage, signatureImage } = req.body;  

    const profilePic =req.files.profilePicture ? "/api/image/" + req.files.profilePicture[0].filename : null
    const homePic =req.files.homeImage ? "/api/image/" + req.files.homeImage[0].filename : null
    const billPic = req.files.billImage ? "/api/image/" + req.files.billImage[0].filename : null
    const paySheetPic =req.files.paySheetImage[0] ? "/api/image/" + req.files.paySheetImage[0].filename : null
    const signaturePic = req.files.signatureImage ? "/api/image/" + req.files.signatureImage[0].filename : null

    const customer = new Customer({
      loanCode,
      nic,
      location,
      areaCode,
      firstName,
      surName,
      address,
      number,
      dateOfBirth,
      gender,
      civilStatus,
      income,
      homeFullIncome,
      profilePicture:profilePic,
      homeImage:homePic,
      billImage:billPic,
      paySheetImage:paySheetPic,
      signatureImage:signaturePic
    });
    await customer.save();
    res.status(201).json({ message: "Customer created successfully", customer });
  });
  

 
  export const getACustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.json(customer);
    }
  });

  export const getAllCustomer = asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
  });
  

  export const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      Object.assign(customer, req.body);
      await customer.save();
      res.json({ message: "Customer updated successfully", customer });
    }
  });