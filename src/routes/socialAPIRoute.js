import { Router } from 'express';
import passport from 'passport';
import socialLogin from '../controllers/socialLogin';
import socialAccount from '../middlewares/socialAcctExists';


const socialAPIRoute = Router();
const { google, twitter } = socialAccount;

// social login routes
socialAPIRoute.get('/social/login/google', passport.authenticate('google', { scope: ['profile', 'email'], }));
socialAPIRoute.get('/social/login/google/redirect', passport.authenticate('google', { session: false }), google, socialLogin.loginGoogle);


socialAPIRoute.get('/social/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
socialAPIRoute.get('/social/login/facebook/redirect', passport.authenticate('facebook', { session: false }), google, socialLogin.facebookLogin);

socialAPIRoute.get('/social/login/twitter', passport.authenticate('twitter', { scope: ['profile', 'email'] }));
socialAPIRoute.get('/social/login/twitter/redirect', passport.authenticate('twitter', { session: false }), twitter, socialLogin.twitterLogin);

export default socialAPIRoute;
