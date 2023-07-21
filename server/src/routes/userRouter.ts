import express from 'express';
import { signup } from '../controllers/userController';
import { login } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;