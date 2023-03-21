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

// POST routes for form recognizer: at the moment identity-card and passport only 
router.post('/analyze/identity', formRecognizerController.analyzeIdentityCard);
router.post('/analyze/passport', formRecognizerController.analyzePassport);
router.post('/analyze/caridentity', formRecognizerController.analyzeCarIdentification);
router.post('/analyze/birthcertificate', formRecognizerController.analyzeBirthCertificate);

// routes for register/login service
router.post('/auth/signup', userController.create);
router.post('/auth/login', authController.login);

// create routes for users based on user controller
router.all('/users*', isAuthenticated)
router.post('/users', userController.create);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

// exception route for forms without authentication;
// used when filling forms
router.get('/fill/forms/:id', formController.getFormById);

//create routes for forms based on form controller
router.all('/forms*', isAuthenticated)
router.post('/forms', formController.createForm);
router.get('/forms', formController.getFormsByUserId);
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);

// create routes for submissions based on submission controller
router.post('/client/submissions', submissionController.create);
//router.all('/forms/:id/submissions*', isAuthenticated)
router.get('/forms/:formID/submissions', submissionController.getAllByFormId);
router.get('/forms/submissions/:subID', submissionController.getById);
router.delete('/forms/submissions/:subID', submissionController.deleteById);

export default router;