/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import passport from 'passport';
import socialLogin from '../controllers/socialLogin';
import socialAccount from '../middlewares/socialAcctExists';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
// middlwares
import { decodeResetPasswordToken, checkEmail } from '../middlewares/User';
import bodyValidate from '../middlewares/bodyValidation';
import signupValidation from '../middlewares/signupValidation';
import socialRoute from './socialTestRoute';
import Auth from '../middlewares/Auth';

const { verifyToken } = Auth;

const router = express.Router();
const { google, twitter } = socialAccount;

// social route for test
router.use('/api/social', socialRoute);

// social login routes
router.get('/api/social/login/google', passport.authenticate('google', { scope: ['profile', 'email'], }));
router.get('/api/social/login/google/redirect', passport.authenticate('google', { session: false }), google, socialLogin.loginGoogle);


router.get('/api/social/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/api/social/login/facebook/redirect', passport.authenticate('facebook', { session: false }), google, socialLogin.facebookLogin);

router.get('/api/social/login/twitter', passport.authenticate('twitter', { scope: ['profile', 'email'] }));
router.get('/api/social/login/twitter/redirect', passport.authenticate('twitter', { session: false }), twitter, socialLogin.twitterLogin);

router.post('/api/users', bodyValidate, signupValidation.validateUser, UserController.createUser);
router.post('/api/users/login', AuthController.signin);
router.post('/api/users/passwordreset', UserController.passwordReset);
router.post('/api/users/passwordreset/:token', decodeResetPasswordToken, checkEmail, UserController.changePassword);
router.post('/api/users/logout', verifyToken, UserController.signOut);


export default router;
