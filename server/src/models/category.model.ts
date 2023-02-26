import mongoose, { Schema, Model, Document } from 'mongoose';

type CategoryDocument = Document & {
  title: string;
  slug: string;
};

type CategoryInput = {
  title: CategoryDocument['title'];
  slug: CategoryDocument['slug'];
};

const categoriesSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      minLength: [1, 'Must be at least 1, got {VALUE}'],
      maxLength: [120, 'Must be at most 120, got {VALUE}'],
      trim: true
    },
    slug: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minLength: [1, 'Must be at least 1, got {VALUE}'],
      maxLength: [120, 'Must be at most 120, got {VALUE}'],
      lowercase: true,
      trim: true
    }
  },
  {
    collection: 'categories',
    timestamps: true
  },
);

const Category: Model<CategoryDocument> = mongoose.model<CategoryDocument>('Category', categoriesSchema);

export { Category, CategoryInput, CategoryDocument };
