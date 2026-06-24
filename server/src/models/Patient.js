import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    phone: String,

    age: Number,

    doctor: String,

    status: {
      type: String,
      enum: [
        "waiting",
        "serving",
        "completed",
      ],
      default: "waiting",
    },

    priority: {
      type: String,
      enum: [
        "normal",
        "emergency",
      ],
      default: "normal",
    },

    consultationStart: Date,

    consultationEnd: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Patient",
  patientSchema
);