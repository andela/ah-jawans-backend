import { Router } from 'express';
import OptController from '../controllers/optController';
import Auth from '../middlewares/Auth';

const { verifyToken } = Auth;
const { optOutEmail, optOutApp, OptInApp, OptInEmail, ViewNotification } = OptController;

const optinAndOptOut = Router();
// Opt in-app or Email
optinAndOptOut.post('/api/optinemail', verifyToken, OptInEmail);
optinAndOptOut.post('/api/optinapp', verifyToken, OptInApp);
optinAndOptOut.delete('/api/optinemail', verifyToken, optOutEmail);
optinAndOptOut.delete('/api/optinapp', verifyToken, optOutApp);

// view notifications

optinAndOptOut.get('/api/viewNotifications/:id', verifyToken, ViewNotification);

export default optinAndOptOut;
