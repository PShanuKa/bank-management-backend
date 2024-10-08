import mongoose from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new mongoose.Schema(
  {
    loanCode: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    areaCode: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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
      type: Date,
      required: true,
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
