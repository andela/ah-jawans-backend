import express from 'express';
import Auth from '../middlewares/Auth';
import Followers from '../controllers/followers';

const { verifyToken } = Auth;

const router = express.Router();

router.post('/:username/follow', verifyToken, Followers.followUser);
router.delete('/:username/follow', verifyToken, Followers.unfollowUser);
router.get('/followers', verifyToken, Followers.followers);
router.get('/following', verifyToken, Followers.following);
export default router;
