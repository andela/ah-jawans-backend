import express from 'express';
import users from './api/users'
const router = express();

router.use('/api', users);

export default router;