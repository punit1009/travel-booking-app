import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// Authentication routes
router.post('/register', authController.signup);
router.post('/login', authController.login);

// Protected routes (require authentication)
// router.use(authController.protect);

// Example protected route:
// router.get('/me', userController.getMe, userController.getUser);

export default router;
