import express from 'express';
import Auth from '../middlewares/Auth';
import reportArticle from '../controllers/ReportArticle';
import { reportValidation } from '../middlewares/bodyValidation';

const { verifyToken } = Auth;
const router = express.Router();

router.post('/reports/:articleId', verifyToken, reportValidation, reportArticle.createReport);
router.get('/reports/:articleId', verifyToken, reportArticle.getAllReports);
router.get('/reports/article/:articleId', verifyToken, reportArticle.getReport);
router.delete('/reports/:articleId', verifyToken, reportArticle.deleteReport);

export default router;
