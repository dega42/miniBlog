"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
mongoose_1.default.Promise = global.Promise;
dotenv_1.default.config();
var username = encodeURIComponent(process.env.DB_USER || '');
var password = encodeURIComponent(process.env.DB_PASS || '');
var dbName = encodeURIComponent(process.env.DB_NAME || '');
//var dbUrl:string = encodeURIComponent(process.env.DATABASE_URL || '')
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb+srv://${username}:${password}@cluster0.v4lgrp5.mongodb.net/${dbName}?retryWrites=true&w=majority`, { autoIndex: true });
    //await mongoose.connect(dbUrl);
});
exports.connectToDatabase = connectToDatabase;
