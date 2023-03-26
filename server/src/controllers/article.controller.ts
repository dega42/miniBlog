import { Request, Response } from 'express';
import { Article, ArticleInput } from '../models/article.model';
import { Category, } from '../models/category.model';

export const getPublishedArticles = async (req: Request, res: Response) => {
  await Article
    .find({ published: true })
    .populate({ path: 'category', model: Category, select: 'title slug' })
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
      })
    })
}

export const getArticles = async (req: Request, res: Response) => {
  await Article
    .find()
    .populate({ path: 'category', model: Category, select: 'title slug' })
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
      })
    })
}

export const getArticlesByCategory = async (req: Request, res: Response) => {
  const findCategory = req.params.categorySlug
  await Article
    .find({ published: true })
    .populate({ path: 'category', model: Category, select: 'title slug' })

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
      })
    })
}

export const getArticlesByTag = async (req: Request, res: Response) => {
  const findTag = req.params.tagSlug
  await Article
    .find({ published: true, tags: findTag })
    .populate({ path: 'category', model: Category, select: 'title slug' })
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
      })
    })
}

export const getArticle = async (req: Request, res: Response) => {
  const slug = req.params.articleSlug;
  await Article
    .find({ published: true, slug: slug })
    .populate({ path: 'category', model: Category, select: 'title slug' })
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
      })
    })
}

export const getTags = async (req: Request, res: Response) => {
  await Article
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
        const tagsWithCount: { [tag: string]: number } = {};
        tags.forEach(({ tag, count }) => {
          tagsWithCount[tag] = count;
        });
        res.status(201).json(tagsWithCount);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

export const createArticle = async (req: Request, res: Response) => {
  const { title, slug, content, category, tags } = req.body
  if (!title || !content || !slug) {
    return res.status(422).json({ message: 'The fields title, slug and content are required' });
  }
  const articleInput: ArticleInput = {
    title,
    slug,
    content,
    category,
    tags,
    published: false,
    publishedAt: new Date("2022-01-12T00:00:00.000+00:00"),
  };

  await Article.create(articleInput)
    .then(article => {
      if (!article) {
        res.status(404).send({
          message: `Cannot create Article`
        });
      } else {
        res.status(200).json({ article });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
export const updateArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content, slug, category, tags, published } = req.body
  if (!title || !content || !slug) {
    return res.status(422).json({ message: 'The fields title, slug and content are required' });
  }
  const articleInput: ArticleInput = {
    title,
    slug,
    content,
    category,
    tags,
    published,
    publishedAt: new Date("2022-01-12T00:00:00.000+00:00"),
  };
  await Article.findByIdAndUpdate(id, articleInput)
    .then(article => {
      if (!article) {
        res.status(404).send({

          message: `Cannot update Post` + article
        });
      } else {
        res.json({ article });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
export const deleteArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Article.findByIdAndRemove(id)
    .then(article => {
      if (!article) {
        res.status(404).send({
          message: `Cannot delete Article with id=${id}.`
        });
      } else {
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
}