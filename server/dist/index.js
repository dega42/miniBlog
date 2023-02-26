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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_service_1 = require("./services/database.service");
const routes_1 = __importDefault(require("./routes"));
//import  jwt from 'jsonwebtoken';
//import verifyJwt from './middlewares/auth'
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || '6000';
//app.use(verifyJwt);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const allowedOrigins = ['http://127.0.0.1:5173'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server for miniBlog');
});
// --- Error handler
app.use((req, res, next) => {
    res.status(404).send({
        statusCode: '404',
        message: 'Page not found'
    });
});
app.use((err, req, res, next) => {
    console.error('Error stack: ', err.stack);
    res.status(500).send({
        statusCode: '500',
        message: 'Internal Server Error',
    });
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_service_1.connectToDatabase)();
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
}));
