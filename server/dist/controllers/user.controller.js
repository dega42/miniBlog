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
exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const takenUsername = yield user_model_1.User.findOne({ username: user.username });
    const takenEmail = yield user_model_1.User.findOne({ email: user.email });
    if (takenUsername || takenEmail) {
        res.status(200).send({ message: 'Username or email has already been taken' });
    }
    else {
        user.password = yield bcrypt_1.default.hash(req.body.password, 10);
        const dbUser = new user_model_1.User({
            username: user.username,
            email: user.email.toLowerCase(),
            password: user.password
        });
        dbUser.save();
        res.status(200).send({ message: 'Success' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoggingIn = req.body;
    user_model_1.User.findOne({ username: userLoggingIn.username })
        .then(dbUser => {
        if (!dbUser) {
            return res.send({ message: 'Invalid Username or Password!' });
        }
        bcrypt_1.default.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username
                };
                jsonwebtoken_1.default.sign(payload, encodeURIComponent(process.env.JWT_SECRET || ''), { expiresIn: 86400 }, (err, token) => {
                    if (err)
                        return res.send({ message: err });
                    return res.send({
                        message: 'Success',
                        token: "Bearer " + token
                    });
                });
            }
            else {
                return res.send({ message: 'Invalid Username or Password!' });
            }
        });
    });
});
exports.loginUser = loginUser;
