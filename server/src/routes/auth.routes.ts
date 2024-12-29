import express from 'express';
import registerController from '../controllers/auth/register';
import loginController from '../controllers/auth/login';
import logoutController from '../controllers/auth/logout';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/logout', logoutController);

export default router;
