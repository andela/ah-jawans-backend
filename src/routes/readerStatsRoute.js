import express from 'express';
import Auth from '../middlewares/Auth';
import ReaderStatsController from '../controllers/ReadStatsController';

const { verifyToken } = Auth;
const router = express.Router();
router.get('/readerstats/:articleId', verifyToken, ReaderStatsController.getArticleReaders);
router.get('/readerstats/comments/:articleId', verifyToken, ReaderStatsController.numberOfComments);

export default router;
