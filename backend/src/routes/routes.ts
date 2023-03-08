// express typescript router

import express from 'express';
import { Request, Response } from 'express';
import {authController, isAuthenticated} from '../controllers/auth.controller';
import {formController} from '../controllers/form.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Intelligent forms app' });
});

router.post('/auth/signup', authController.create);
router.post('/auth/login', authController.login);

//create routes for forms base on form controller

router.all('/forms/*', isAuthenticated)

router.post('/forms', formController.createForm);
router.get('/forms', formController.getForms);
router.get('/forms/:id', formController.getFormById);
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);

export default router;