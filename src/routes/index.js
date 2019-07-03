import express from 'express';

import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';

const router = express.Router();

router.post('/api/users', UserController.createUser);
router.post('/api/users/login', AuthController.signin);

export default router;
