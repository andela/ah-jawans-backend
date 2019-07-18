/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import passport from 'passport';
import socialLogin from '../controllers/socialLogin';
import socialAccount from '../middlewares/socialAcctExists';
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

const { verifyToken } = Auth;

const router = express.Router();
const { google, twitter } = socialAccount;

router.use('/api', articlesRoute);
// social route for test
router.use('/api/social', socialRoute);
router.use('/api/articles', commentRoute);
router.use('/api/users', followerRoute);
// social login routes
router.get('/api/social/login/google', passport.authenticate('google', { scope: ['profile', 'email'], }));
router.get('/api/social/login/google/redirect', passport.authenticate('google', { session: false }), google, socialLogin.loginGoogle);


router.get('/api/social/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/api/social/login/facebook/redirect', passport.authenticate('facebook', { session: false }), google, socialLogin.facebookLogin);

router.get('/api/social/login/twitter', passport.authenticate('twitter', { scope: ['profile', 'email'] }));
router.get('/api/social/login/twitter/redirect', passport.authenticate('twitter', { session: false }), twitter, socialLogin.twitterLogin);

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
