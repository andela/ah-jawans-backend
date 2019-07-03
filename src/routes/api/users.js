import express from 'express';

import UserController from '../../controllers/userController';
import AuthController from '../../controllers/authController';

const router = express.Router();

router.post('/users/auth/login', AuthController.loginUser);
router.post('/users/auth/signup', UserController.createUser);

export default router;
