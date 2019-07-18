/* eslint-disable import/no-named-as-default-member */
import express from 'express';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
// middlwares
import { decodeResetPasswordToken, checkEmail, usernameAvailability, usernameCheck } from '../middlewares/User';
import { bodyValidation, signinValidation } from '../middlewares/bodyValidation';
import socialRoute from './socialTestRoute';
import UserProfile from '../controllers/userProfile';
import Auth from '../middlewares/Auth';
import articlesRoute from './articlesRoute';
import commentRoute from './commentRoute';
import followerRoute from './followRoute';
import likeAndDislike from './likesAndDislikes';
import socialAPIRoute from './socialAPIRoute';
import optinAndOptOut from './optinAndOptOut';
import bookmarkRoute from './bookmarksRoutes';

const { verifyToken } = Auth;

const router = express.Router();


router.use('/api', bookmarkRoute);
// article routes
router.use('/api', articlesRoute);
router.use('/api', likeAndDislike);
// social route for test
router.use('/api/social', socialRoute);
router.use('/api/articles', commentRoute);
router.use('/api/users', followerRoute);
router.use('/api', socialAPIRoute);
// route for optin/Optout
router.use('/', optinAndOptOut);

router.post('/api/users', bodyValidation, UserController.createUser);
router.post('/api/users/passwordreset', UserController.passwordReset);
router.post('/api/users/passwordreset/:token', decodeResetPasswordToken, checkEmail, UserController.changePassword);
router.post('/api/users/logout', verifyToken, UserController.signOut);

router.get('/api/user/:username', usernameCheck, UserProfile.getProfile);
router.patch('/api/users/:username', verifyToken, bodyValidation, usernameAvailability, UserProfile.updateProfile);
router.get('/api/allusers/', verifyToken, UserProfile.getAllUser);
router.post('/api/users/login', signinValidation, AuthController.signin);
router.patch('/api/users/verification/:userToken', UserController.verifyUser);

router.patch('/api/users/:username', verifyToken, bodyValidation, usernameAvailability, UserProfile.updateProfile);
router.get('/api/users/', verifyToken, UserProfile.getAllUser);

export default router;
