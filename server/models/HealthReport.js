import mongoose from "mongoose";

const healthReportSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HealthReport = mongoose.model(
  "HealthReport",
  healthReportSchema
);

export default HealthReport;