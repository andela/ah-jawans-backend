import express from 'express';
import Comments from '../controllers/comments';
import Auth from '../middlewares/Auth';
import LikeComment from '../controllers/likeComment';
import { commentValidation } from '../middlewares/bodyValidation';

const { verifyToken } = Auth;

const router = express.Router();

router.post('/:articleId/comments/:commentId', verifyToken, commentValidation, Comments.createThreadComment);
router.post('/:articleId/comments', verifyToken, commentValidation, Comments.createComment);
router.delete('/:articleId/comments/:commentId', verifyToken, Comments.deleteComment);
router.get('/:articleId/comments', Comments.getAllcomments);
router.patch('/:articleId/comments/:commentId', verifyToken, commentValidation, Comments.updateComment);

router.post('/comments/:commentParamsId/likes', verifyToken, LikeComment.likeComment);
router.post('/comments/:commentParamsId/dislikes', verifyToken, LikeComment.DislikeComment);
router.get('/comments/:id/likes', LikeComment.getNumberOfLikes);
router.get('/comments/:id/dislikes', LikeComment.getNumberOfDislikes);
router.get('/comments/:commentId/history', verifyToken, Comments.commentHistory);
router.get('/:articleId/comments/:commentId', Comments.getSpecificComment);
export default router;
