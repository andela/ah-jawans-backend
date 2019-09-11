import express from 'express';
import Auth from '../middlewares/Auth';
import LikesAndDislikes from '../controllers/likeAndDislike';


const likeAndDislike = express.Router();
const { verifyToken } = Auth;

likeAndDislike.post('/articles/:id/like', verifyToken, LikesAndDislikes.likeArticle);
likeAndDislike.post('/articles/:id/dislike', verifyToken, LikesAndDislikes.dislikeArticle);
likeAndDislike.get('/articles/:id/likes', LikesAndDislikes.getNumberOfLikes);
likeAndDislike.get('/articles/:id/dislikes', LikesAndDislikes.getNumberOfDislikes);

export default likeAndDislike;
