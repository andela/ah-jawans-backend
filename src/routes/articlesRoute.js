import express from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import articlesController from '../controllers/articleController';
import { bodyValidationArticle } from '../middlewares/bodyValidation';
import checkUser from '../middlewares/checkUser';

const articles = express.Router();

articles.post('/articles', checkUser.checkUser, bodyValidationArticle, articlesController.createArticle);
articles.patch('/articles/:id', checkUser.checkUser, authenticateUser.checkUserArticle, articlesController.updateArticle);
articles.get('/articles', checkUser.checkUser, articlesController.getAllArticles);
articles.get('/articles/:id', checkUser.checkUser, articlesController.getOneArticle);
articles.delete('/articles/:id', checkUser.checkUser, authenticateUser.checkUserArticle, articlesController.deleteArticle);

export default articles;
