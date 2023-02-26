"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const categoriesSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minLength: [1, 'Must be at least 1, got {VALUE}'],
        maxLength: [120, 'Must be at most 120, got {VALUE}'],
        trim: true
    },
    slug: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
        minLength: [1, 'Must be at least 1, got {VALUE}'],
        maxLength: [120, 'Must be at most 120, got {VALUE}'],
        lowercase: true,
        trim: true
    }
}, {
    collection: 'categories',
    timestamps: true
});
const Category = mongoose_1.default.model('Category', categoriesSchema);
exports.Category = Category;
