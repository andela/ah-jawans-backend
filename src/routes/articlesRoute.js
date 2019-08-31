import express from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import articlesController from '../controllers/articleController';
import { bodyValidationArticle } from '../middlewares/bodyValidation';
import Auth from '../middlewares/Auth';
import slugExist from '../middlewares/slugExists';
import shareArticle from '../helpers/shareArticle';
import ratingsController from '../controllers/ratingsController';
import Highlighter from '../controllers/highlighterController';
import multerUploads from '../middlewares/multerUploads';
import asyncHandler from '../middlewares/asyncHandler';

const { verifyToken } = Auth;
const articles = express.Router();

articles.post('/articles', verifyToken, multerUploads.array('image', 1), bodyValidationArticle, asyncHandler(articlesController.createArticle));
articles.patch('/articles/:id', verifyToken, authenticateUser.checkUserArticle, articlesController.updateArticle);
articles.get('/articles', articlesController.getArticles);
articles.get('/articles/:id', articlesController.getArticle);
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
