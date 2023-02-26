"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = __importDefault(require("./category.routes"));
const article_routes_1 = __importDefault(require("./article.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const routes = (0, express_1.Router)();
routes.use('/category', category_routes_1.default);
routes.use('/article', article_routes_1.default);
routes.use('/user', user_routes_1.default);
exports.default = routes;
