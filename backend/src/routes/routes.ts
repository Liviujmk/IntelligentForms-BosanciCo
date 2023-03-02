// express typescript router

import express from 'express';
import { Request, Response } from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

router.post('/auth/signup', authController.create);
router.post('/auth/login', authController.login);
export default router;