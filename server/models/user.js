import mongoose from "mongoose";

const advocateSchema = new mongoose.Schema(
  {
    s_no: {
      type: Number,
      required: true
    },
    enrollment_no: {
      type: String,
      required: true,
      trim: true,
      unique: true // Ensures no two advocates have the same number
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    father_name: {
      type: String,
      required: true,
      trim: true
    },
    bar_association: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    district: {
      type: String,
      required: true,
      trim: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Search index for text-based filtering
advocateSchema.index({ name: "text", father_name: "text" });

export default mongoose.model("Advocate", advocateSchema);