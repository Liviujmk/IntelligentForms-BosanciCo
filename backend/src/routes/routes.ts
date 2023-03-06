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

router.post('/form/create', formController.createForm);
router.get('/form', formController.getForms);
router.get('/form/:id', formController.getFormById);
router.put('/form/:id', formController.updateForm);
router.delete('/form/:id', formController.deleteForm);

export default router;