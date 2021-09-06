import { Router } from 'express';
import ArticleController from '../Controller/ArticleController';

const router = Router();

router.get('/article/:id', ArticleController.getSingleArticleById);
router.get('/admin/article/:id', ArticleController.getSingleArticleById);

export default router;
