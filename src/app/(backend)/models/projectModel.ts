import { Schema, model } from "mongoose";
import mongoose from "mongoose";

import { createError } from "../utils/utils";
import { IProject } from "../types";

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrls: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.pre<IProject>("validate", function (next) {
  if (!this.title) {
    const error = createError({
      type: "MissingFieldError",
      message: "The project title cannot be empty.",
      statusCode: 400,
    });
    return next(error);
  }

  if (!this.description) {
    const error = createError({
      type: "MissingFieldError",
      message: "The project description is a required field.",
      statusCode: 400,
    });
    return next(error);
  }

  next();
});

const Project =
  mongoose.models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
