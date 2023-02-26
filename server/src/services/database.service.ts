import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

var username: string = encodeURIComponent(process.env.DB_USER || '');
var password: string = encodeURIComponent(process.env.DB_PASS || '');
var dbName: string = encodeURIComponent(process.env.DB_NAME || '');
//var dbUrl:string = encodeURIComponent(process.env.DATABASE_URL || '')

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.v4lgrp5.mongodb.net/${dbName}?retryWrites=true&w=majority`, { autoIndex: true });
  //await mongoose.connect(dbUrl);
};

export { connectToDatabase };