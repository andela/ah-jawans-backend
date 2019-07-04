import { Router } from 'express';
import socialLogin from '../controllers/socialLogin';
import socialAccount from '../middlewares/socialAcctExists';
import socialMiddleware from '../middlewares/socialTest';


const socialRoute = Router();
const { google, twitter } = socialAccount;

socialRoute.post('/login/google/test', socialMiddleware, google, socialLogin.loginGoogle);
socialRoute.post('/login/facebook/test', socialMiddleware, google, socialLogin.facebookLogin);
socialRoute.post('/login/twitter/test', socialMiddleware, twitter, socialLogin.twitterLogin);

export default socialRoute;
