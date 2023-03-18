// express typescript router

import express from 'express';
import { Request, Response } from 'express';
import {authController, isAuthenticated} from '../controllers/auth.controller';
import {formController} from '../controllers/form.controller';
import {formRecognizerController} from '../controllers/formRecognizer.controller';
import {userController} from '../controllers/user.controller';
import {submissionController} from '../controllers/submission.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Intelligent forms app' });
});

// POST routes for form recognizer: identity card and passport only at the moment
router.post('/analyze/identity', formRecognizerController.analyzeIdentityCard);
router.post('/analyze/passport', formRecognizerController.analyzePassport);

// routes for register/login service
router.post('/auth/signup', userController.create);
router.post('/auth/login', authController.login);

// create routes for users base on user controller
router.all('/users*', isAuthenticated)
router.post('/users', userController.create);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// exception route for forms without authentication;
// used when filling forms
router.get('/fill/forms/:id', formController.getFormById);

//create routes for forms base on form controller
router.all('/forms*', isAuthenticated)
router.post('/forms', formController.createForm);
router.get('/forms', formController.getFormsByUserId);
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);

// create routes for submissions base on submission controller
router.all('/submissions*', isAuthenticated)
router.post('/client/submissions', submissionController.create);
router.get('/submissions', submissionController.getAll);
router.get('/submissions/:id', submissionController.getById);
router.delete('/submissions/:id', submissionController.deleteById);

export default router;