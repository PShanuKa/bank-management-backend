import mongoose from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new mongoose.Schema(
  {
    loanCode: {
      type: String,
    },
    nic: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      
    },
    areaCode: {
      type: String,
      
    },
    firstName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
     
    },
    address: {
      type: String,
      
    },
    number: [
      {
        type: String,
      },
    ],
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    dateOfBirth: {
      type: String,
    },
    civilStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
      default: "single",
    },
    income: {
      type: String,
      enum: [
        "0-20000",
        "20000-40000",
        "40000-60000",
        "60000-80000",
        "80000-100000",
        "above 100000",
      ],
    },
    homeFullIncome: {
      type: String,
      enum: ["0-50000", "50000-100000", "above 100000"],
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dldtrjalo/image/upload/v1711012929/ov133xsp0pmas2rrwsex.jpg",
    },
    homeImage: {
      type: String,
    },
    billImage: {
      type: String,
    },
    paySheetImage: {
      type: String,
    },
    signatureImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
