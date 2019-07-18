import express from 'express';
import Auth from '../middlewares/Auth';
import Followers from '../controllers/followers';

const { verifyToken } = Auth;

const router = express.Router();

router.patch('/:username/follow', verifyToken, Followers.followUser);
router.patch('/:username/unfollow', verifyToken, Followers.unFollowUser);
router.get('/followers', verifyToken, Followers.followers);
router.get('/following', verifyToken, Followers.following);
export default router;
