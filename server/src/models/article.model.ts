import mongoose, { Schema, Model, Document } from 'mongoose';
import { CategoryDocument } from './category.model';

type ArticleDocument = Document & {
  title: string;
  slug: string;
  content: string;
  category: CategoryDocument;
  tags: string[];
  published: boolean;
  publishedAt: Date;
  
};

type ArticleInput = {
  title: ArticleDocument['title'];
  slug: ArticleDocument['slug'];
  content: ArticleDocument['content'];
  category: ArticleDocument['category'];
  tags: ArticleDocument['tags'];
  published: ArticleDocument['published'];
  publishedAt: ArticleDocument['publishedAt'];
  
};

const articlesSchema = new Schema(
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
    },
    content: {
      type: Schema.Types.String,
      required: true,
      minLenth: [1, 'Must be at least 1, got {VALUE}']
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    tags: {
      type: Schema.Types.Array,
      required: false
    },
    published: {
      type: Schema.Types.Boolean,
      required: true
    },
    publishedAt: {
      type: Schema.Types.Date,
      required: false,
    },

  },
  {
    collection: 'articles',
    timestamps: true
  },
);

const Article: Model<ArticleDocument> = mongoose.model<ArticleDocument>('Article', articlesSchema);

export { Article, ArticleInput, ArticleDocument };
