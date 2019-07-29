import express from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import articlesController from '../controllers/articleController';
import { bodyValidationArticle } from '../middlewares/bodyValidation';
import Auth from '../middlewares/Auth';
import Authorization from '../middlewares/AuthIfLoggedInn';
import slugExist from '../middlewares/slugExists';
import shareArticle from '../helpers/shareArticle';
import ratingsController from '../controllers/ratingsController';
import Highlighter from '../controllers/highlighterController';

const { verifyToken } = Auth;
const { AuthIfLoggedInn } = Authorization;
const articles = express.Router();

articles.post('/articles', verifyToken, bodyValidationArticle, articlesController.createArticle);
articles.patch('/articles/:id', verifyToken, authenticateUser.checkUserArticle, articlesController.updateArticle);
articles.get('/articles', AuthIfLoggedInn, articlesController.getArticles);
articles.get('/articles/:id', AuthIfLoggedInn, articlesController.getArticle);
articles.delete('/articles/:id', verifyToken, authenticateUser.checkUserArticle, articlesController.deleteArticle);
articles.get('/article/search', articlesController.searchArticles);
articles.get('/articles/slug/:slug', articlesController.getArticleSlug);


// sharing articles
articles.get('/articles/:slug/share/twitter', verifyToken, slugExist, shareArticle, articlesController.share);
articles.get('/articles/:slug/share/facebook', verifyToken, slugExist, shareArticle, articlesController.share);
articles.get('/articles/:slug/share/linkedin', verifyToken, slugExist, shareArticle, articlesController.share);
articles.get('/articles/:slug/share/email', verifyToken, slugExist, shareArticle, articlesController.share);

articles.post('/articles/:id/rating', Auth.verifyToken, ratingsController.createRatings);
articles.get('/articles/:id/ratings', ratingsController.getAllRatings);
articles.delete('/articles/:id', verifyToken, authenticateUser.checkUserArticle, articlesController.deleteArticle);
articles.post('/articles/:articleId/highlights', verifyToken, Highlighter.createHighlight);

export default articles;
