import express from 'express';

import UserController from '../../controllers/userController';
import AuthController from '../../controllers/authController';

const router = express.Router();

router.get('/user', UserController.getUserProfile);
router.put('/user', UserController.updateUserProfile);
router.post('/users/login', AuthController.loginUser);
router.post('/users', UserController.createUser);

module.exports = router;
