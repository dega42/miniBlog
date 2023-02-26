"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = require("../controllers/article.controller");
const router = (0, express_1.Router)();
router.get('/', article_controller_1.getArticles); // auth admin
router.get('/published', article_controller_1.getPublishedArticles);
router.get('/tags', article_controller_1.getTags);
router.get('/tag/:tagSlug', article_controller_1.getArticlesByTag);
router.get('/category/:categorySlug', article_controller_1.getArticlesByCategory);
router.get('/:articleSlug', article_controller_1.getArticle);
router.post('/', article_controller_1.createArticle); // auth admin
router.put('/:id', article_controller_1.updateArticle); // auth admin
router.delete('/:id', article_controller_1.deleteArticle); // auth admin
exports.default = router;
