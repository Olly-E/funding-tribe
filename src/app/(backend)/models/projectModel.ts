import mongoose, { Schema, models, Document } from "mongoose";
import slugify from "slugify";

export interface IProject extends Document {
  title: string;
  description: string;
  imgUrls: { url: string; publicId: string }[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imgUrls: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    slug: { type: String, unique: true, index: true }, // Remove 'required: true'
  },
  { timestamps: true }
);

// Generate slug automatically before saving
ProjectSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("title")) return next();

  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  const Project = models.Project || mongoose.model("Project", ProjectSchema);

  while (await Project.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  next();
});

// Use existing model if exists, otherwise create new
const Project =
  models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
