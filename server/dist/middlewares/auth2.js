"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, "secret_this_should_be_longer");
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
    //     try {
    //         const token = req.header('Authorization')?.replace('Bearer ', '');
    //         if (!token) {
    //             throw new Error();
    //           }
    //           const decoded = jwt.verify(token, process.env.PASSPORT_SECRET || '') as UserPayLoad;
    //           req.user = decoded;
    //           next();
    //     } catch (error) {
    //         res.status(401).send('Please authenticate');
    //     }
    // const token = req.headers["x-access-token"]?.split(' ')[1]
    // if (token) {
    //     jwt.verify(token, encodeURIComponent(process.env.PASSPORT_SECRET || ''), (err: any, decoded: { id: any; username: any; }) => {
    //         if (err) return res.send({ isLoggedIn: false, message: 'Failed to Authenticate' })
    //         req.user = {};
    //         req.user.id = decoded.id
    //         req.user.username = decoded.username
    //         next()
    //     })
    // } else {
    //     res.send({ message: 'Incorrect Token Given', isLoggedIn: false })
    // }
};
