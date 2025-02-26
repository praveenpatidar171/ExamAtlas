import express from 'express'
import { userLogout, userSignIn, userSignup } from '../controllers/userControllers';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', userSignup);
router.post('/signin', userSignIn);
router.get('/logout', authMiddleware, userLogout);

export default router