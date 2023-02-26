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
exports.Article = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const articlesSchema = new mongoose_1.Schema({
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
    },
    content: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minLenth: [1, 'Must be at least 1, got {VALUE}']
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: {
        type: mongoose_1.Schema.Types.Array,
        required: false
    },
    published: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true
    },
}, {
    collection: 'articles',
    timestamps: true
});
const Article = mongoose_1.default.model('Article', articlesSchema);
exports.Article = Article;
