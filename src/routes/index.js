import express from 'express';

import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
// middlwares
import { decodeResetPasswordToken, checkEmail } from '../middlewares/User';

const router = express.Router();

router.post('/api/users', UserController.createUser);
router.post('/api/users/login', AuthController.signin);
router.post('/api/users/passwordreset', UserController.passwordReset);
router.post('/api/users/passwordreset/:token', decodeResetPasswordToken, checkEmail, UserController.changePassword);

export default router;
