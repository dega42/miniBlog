import { Router } from 'express';
import categoryRoutes from './category.routes';
import articleRoutes from './article.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/category', categoryRoutes);
routes.use('/article', articleRoutes);
routes.use('/user', userRoutes);

export default routes;