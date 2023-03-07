import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & {
  username: string;
  email: string;
  password: string;
};

type UserInput = {
  username: UserDocument['username'];
  email: UserDocument['email'];
  password: UserDocument['password'];
};

const usersSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      minLength: [1, 'Must be at least 1, got {VALUE}'],
      maxLength: [18, 'Must be at most 18, got {VALUE}'],
      trim: true
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minLength: [1, 'Must be at least 1, got {VALUE}'],
      maxLength: [255, 'Must be at most 255, got {VALUE}'],
      lowercase: true,
      trim: true
    },
    password: {
      type: Schema.Types.String,
      required: true,
      minLenth: [1, 'Must be at least 255, got {VALUE}']
    },
  },
  {
    collection: 'users',
    timestamps: true
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { User, UserInput, UserDocument };
