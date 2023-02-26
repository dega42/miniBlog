import { Router } from 'express';
import {
  getArticles,
  getPublishedArticles,
  getTags,
  getArticlesByTag,
  getArticlesByCategory,
  getArticle,

  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/article.controller';

const router = Router();

router.get('/', getArticles); // auth admin
router.get('/published', getPublishedArticles);
router.get('/tags', getTags);
router.get('/tag/:tagSlug', getArticlesByTag);
router.get('/category/:categorySlug', getArticlesByCategory);
router.get('/:articleSlug', getArticle);

router.post('/', createArticle); // auth admin
router.put('/:id', updateArticle); // auth admin
router.delete('/:id', deleteArticle); // auth admin

export default router;