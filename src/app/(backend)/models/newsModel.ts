import mongoose, { Schema, models, Document } from "mongoose";
import slugify from "slugify";

export interface INews extends Document {
  title: string;
  description: string;
  imgUrl: { url: string; publicId: string };
  category: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imgUrl: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    category: { type: String, required: true },
    slug: { type: String, unique: true, index: true }, // ✅ No 'required: true'
  },
  { timestamps: true }
);

// ✅ IMPORTANT: Use 'validate' instead of 'save' to run BEFORE validation
NewsSchema.pre("validate", async function (next) {
  // Only generate slug for new documents or when title changes
  if (!this.isNew && !this.isModified("title")) return next();

  try {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Use the model correctly
    const NewsModel = models.News || mongoose.model("News", NewsSchema);

    // Check for existing slugs
    while (await NewsModel.exists({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Use existing model if exists, otherwise create new
const News = models.News || mongoose.model<INews>("News", NewsSchema);
export default News;
