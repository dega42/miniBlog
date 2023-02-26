import { Router } from 'express';
import {
  getCategories,

  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategories);

router.post('/', createCategory); // auth admin
router.put('/:id', updateCategory); // auth admin
router.delete('/:id', deleteCategory); // auth admin

export default router;