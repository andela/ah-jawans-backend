import { Router } from 'express';
import passport from 'passport';
import socialLogin from '../../controllers/socialLogin';
import socialAccount from '../../middleware/socialAcctExists';
import socialMiddleware from '../../middleware/socialTests';

const socialRout = Router();
const { google, twitter } = socialAccount;

// social login testing routes

socialRout.post('social/login/google/test', socialMiddleware, google, socialLogin.googleLogin);
socialRout.post('social/login/facebook/test', socialMiddleware, google, socialLogin.facebookLogin);
socialRout.post('social/login/twitter/test', socialMiddleware, twitter, socialLogin.twitterLogin);

// social login routes

socialRout.get('social/login/google', passport.authenticate('google', { scope: ['profile', 'email'], }));
socialRout.get('social/login/google/redirect', passport.authenticate('google', { session: false }), google, socialLogin.googleLogin);


socialRout.get('social/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
socialRout.get('social/login/facebook/redirect', passport.authenticate('facebook', { session: false }), google, socialLogin.facebookLogin);

socialRout.get('social/login/twitter', passport.authenticate('twitter', { scope: ['profile', 'email'] }));
socialRout.get('social/login/twitter/redirect', passport.authenticate('twitter', { session: false }), twitter, socialLogin.twitterLogin);

export default socialRout;
