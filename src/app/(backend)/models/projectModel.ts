import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrls: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);
export default Project;
