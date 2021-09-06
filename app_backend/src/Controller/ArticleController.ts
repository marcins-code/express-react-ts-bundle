import Validator from '../Validator/Validator';
import { NextFunction, Request, Response } from 'express';
import ArticleRepository from '../Repository/ArticleRepository';

class ArticleController {
    static validator: Validator = new Validator();

    public static async getSingleArticleById (req: Request, res: Response, next: NextFunction) {
      try {
        const lang = ArticleController.validator.validateLanguage(req.headers);
        const id = ArticleController.validator.validateIsValidObjectId(req.params.id);
        const isAdminRequest = ArticleController.validator.validateAdminRequest(req.headers, req.url);
        const repository = new ArticleRepository(lang, isAdminRequest.isAuthorized);
        const article = await repository.getSingleDocumentById(id);
        res.status(200).header({ 'Content-Language': lang }).json({ ...article });
      } catch (err:any) {
        return next(res.status(err.code).json(err.message));
      }
    }
}

export default ArticleController;
