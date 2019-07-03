import express from 'express';

import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
// middlwares
import { decodeResetPasswordToken, checkEmail } from '../middlewares/User';
import bodyValidate from '../middlewares/bodyValidation';
import signupValidation from '../middlewares/signupValidation';

const router = express.Router();

router.post('/api/users', bodyValidate, signupValidation.validateUser, UserController.createUser);
router.post('/api/users/login', AuthController.signin);
router.post('/api/users/passwordreset', UserController.passwordReset);
router.post('/api/users/passwordreset/:token', decodeResetPasswordToken, checkEmail, UserController.changePassword);

export default router;
