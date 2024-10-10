import mongoose from "mongoose";


const guarantorSchema = new mongoose.Schema(
  {
    nic: {
      type: String,
      required: true,
      
    },
    location: {
      type: String,
      required: true,
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
      type: Date,  
    },
    civilStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
      default: "single",
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dldtrjalo/image/upload/v1711012929/ov133xsp0pmas2rrwsex.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Guarantor = mongoose.model("Guarantor", guarantorSchema);

export default Guarantor;