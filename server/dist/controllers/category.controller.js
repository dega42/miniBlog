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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const category_model_1 = require("../models/category.model");
const react_slugify_1 = __importDefault(require("react-slugify"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield category_model_1.Category
        .find({ published: true })
        .exec()
        .then(categories => {
        if (!categories) {
            res.status(404).send({
                message: `Not found categories.`
            });
        }
        else {
            res.status(201).json({ categories });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getCategories = getCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    if (!title) {
        return res.status(422).json({ message: 'The fields title are required.' });
    }
    const categoryInput = {
        title,
        slug: (0, react_slugify_1.default)(title)
    };
    yield category_model_1.Category.create(categoryInput)
        .then(category => {
        if (!category) {
            res.status(404).send({
                message: `Cannot create category.`
            });
        }
        else {
            res.status(200).json({ category });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, slug, } = req.body;
    if (!title || !slug || !slug) {
        return res.status(422).json({ message: 'The fields title and slug are required.' });
    }
    ;
    const categoryInput = {
        title,
        slug
    };
    yield category_model_1.Category.findByIdAndUpdate(id, categoryInput)
        .then(category => {
        if (!category) {
            res.status(404).send({
                message: `Cannot update Category` + category
            });
        }
        else {
            res.json({ category });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield category_model_1.Category.findByIdAndRemove(id)
        .then(category => {
        if (!category) {
            res.status(404).send({
                message: `Cannot delete Category with id=${id}.`
            });
        }
        else {
            res.send({
                message: "Category was deleted successfully!"
            });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.deleteCategory = deleteCategory;
