import express from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import articlesController from '../controllers/articleController';
import { bodyValidationArticle } from '../middlewares/bodyValidation';
import checkUser from '../middlewares/checkUser';
import Auth from '../middlewares/Auth';
import slugExist from '../middlewares/slugExists';
import shareArticle from '../helpers/shareArticle';


const articles = express.Router();
const { verifyToken } = Auth;

articles.post('/articles', checkUser.checkUser, bodyValidationArticle, articlesController.createArticle);
articles.patch('/articles/:id', checkUser.checkUser, authenticateUser.checkUserArticle, articlesController.updateArticle);
articles.get('/articles', checkUser.checkUser, articlesController.getAllArticles);
articles.get('/articles/:id', checkUser.checkUser, articlesController.getOneArticle);
articles.delete('/articles/:id', checkUser.checkUser, authenticateUser.checkUserArticle, articlesController.deleteArticle);

// sharing articles
articles.get('/articles/:slug/share/twitter', verifyToken, slugExist, shareArticle, articlesController.share);
articles.get('/articles/:slug/share/facebook', verifyToken, slugExist, shareArticle, articlesController.share);
articles.get('/articles/:slug/share/linkedin', verifyToken, slugExist, shareArticle, articlesController.share);
articles.get('/articles/:slug/share/email', verifyToken, slugExist, shareArticle, articlesController.share);


export default articles;
