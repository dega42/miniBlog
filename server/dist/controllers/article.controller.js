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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getTags = exports.getArticle = exports.getArticlesByTag = exports.getArticlesByCategory = exports.getArticles = exports.getPublishedArticles = void 0;
const article_model_1 = require("../models/article.model");
const category_model_1 = require("../models/category.model");
const getPublishedArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield article_model_1.Article
        .find({ published: true })
        .populate({ path: 'category', model: category_model_1.Category, select: 'title slug' })
        .sort('-createdAt')
        .exec()
        .then(articles => {
        if (!articles) {
            res.status(404).send({
                message: `Not found!`
            });
        }
        else {
            res.status(201).json({ articles });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getPublishedArticles = getPublishedArticles;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield article_model_1.Article
        .find()
        .populate({ path: 'category', model: category_model_1.Category, select: 'title slug' })
        .sort('-createdAt')
        .exec()
        .then(articles => {
        if (!articles) {
            res.status(404).send({
                message: `Not found!`
            });
        }
        else {
            res.status(201).json({ articles });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getArticles = getArticles;
const getArticlesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = req.params.categorySlug;
    yield article_model_1.Article
        .find({ published: true })
        .populate({ path: 'category', model: category_model_1.Category, select: 'title slug' })
        // .aggregate([
        //     {
        //         $lookup: {
        //             from: 'category',
        //             localField: "categories.slug",
        //             foreignField: "_id",
        //             as: "category"
        //         },
        //     },
        //     {
        //         $unwind:
        //             '$category'
        //     }, {
        //         $match: {
        //             // 'category.slug': findCategory,
        //             'published': true
        //         }
        //     }
        // ])
        .sort('-createdAt')
        .lean()
        .exec()
        .then(articles => {
        if (!articles) {
            res.status(404).send({
                message: `Not found!`
            });
        }
        else {
            const filteredArticles = articles.filter(article => article.category.slug === findCategory);
            res.status(201).json({ articles: filteredArticles });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getArticlesByCategory = getArticlesByCategory;
const getArticlesByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findTag = req.params.tagSlug;
    yield article_model_1.Article
        .find({ published: true, tags: findTag })
        .populate({ path: 'category', model: category_model_1.Category, select: 'title slug' })
        .sort('-createdAt')
        .exec()
        .then(articles => {
        if (!articles) {
            res.status(404).send({
                message: `Not found!`
            });
        }
        else {
            res.status(201).json({ articles });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getArticlesByTag = getArticlesByTag;
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.articleSlug;
    yield article_model_1.Article
        .find({ published: true, slug: slug })
        .populate({ path: 'category', model: category_model_1.Category, select: 'title slug' })
        .sort('-createdAt')
        .exec()
        .then(article => {
        if (!article) {
            res.status(404).send({
                message: `Not found!`
            });
        }
        else {
            res.status(201).json({ article });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getArticle = getArticle;
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield article_model_1.Article
        .aggregate([
        { $match: { published: true } },
        { $unwind: '$tags' },
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                tag: '$_id',
                count: 1
            }
        }
    ])
        .exec()
        .then(tags => {
        if (!tags || tags.length === 0) {
            res.status(404).send({
                message: `Not found!`
            });
        }
        else {
            const tagsWithCount = {};
            tags.forEach(({ tag, count }) => {
                tagsWithCount[tag] = count;
            });
            res.status(201).json(tagsWithCount);
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.getTags = getTags;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, slug, content, category, tags } = req.body;
    if (!title || !content || !slug) {
        return res.status(422).json({ message: 'The fields title, slug and content are required' });
    }
    const articleInput = {
        title,
        slug,
        content,
        category,
        tags,
        published: false,
        publishedAt: new Date("2022-01-12T00:00:00.000+00:00"),
    };
    yield article_model_1.Article.create(articleInput)
        .then(article => {
        if (!article) {
            res.status(404).send({
                message: `Cannot create Article`
            });
        }
        else {
            res.status(200).json({ article });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.createArticle = createArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, content, slug, category, tags, published } = req.body;
    if (!title || !content || !slug) {
        return res.status(422).json({ message: 'The fields title, slug and content are required' });
    }
    const articleInput = {
        title,
        slug,
        content,
        category,
        tags,
        published,
        publishedAt: new Date("2022-01-12T00:00:00.000+00:00"),
    };
    yield article_model_1.Article.findByIdAndUpdate(id, articleInput)
        .then(article => {
        if (!article) {
            res.status(404).send({
                message: `Cannot update Post` + article
            });
        }
        else {
            res.json({ article });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield article_model_1.Article.findByIdAndRemove(id)
        .then(article => {
        if (!article) {
            res.status(404).send({
                message: `Cannot delete Article with id=${id}.`
            });
        }
        else {
            res.send({
                message: "Article was deleted successfully!"
            });
        }
    })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});
exports.deleteArticle = deleteArticle;
