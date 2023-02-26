"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
router.get('/', category_controller_1.getCategories);
router.post('/', category_controller_1.createCategory); // auth admin
router.put('/:id', category_controller_1.updateCategory); // auth admin
router.delete('/:id', category_controller_1.deleteCategory); // auth admin
exports.default = router;
