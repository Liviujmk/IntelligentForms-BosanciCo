"use strict";
// express typescript router
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const form_controller_1 = require("../controllers/form.controller");
const formRecognizer_controller_1 = require("../controllers/formRecognizer.controller");
const user_controller_1 = require("../controllers/user.controller");
const submission_controller_1 = require("../controllers/submission.controller");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Intelligent forms app' });
});
router.post('/auth/signup', auth_controller_1.authController.create);
router.post('/auth/login', auth_controller_1.authController.login);
// create routes for users base on user controller
router.all('/users*', auth_controller_1.isAuthenticated);
router.post('/users', user_controller_1.userController.create);
router.get('/users', user_controller_1.userController.getAll);
router.get('/users/:id', user_controller_1.userController.getById);
router.put('/users/:id', user_controller_1.userController.update);
router.delete('/users/:id', user_controller_1.userController.delete);
// create routes for submissions base on submission controller
router.all('/submissions*', auth_controller_1.isAuthenticated);
router.post('/client/submissions', submission_controller_1.submissionController.create);
router.get('/submissions', submission_controller_1.submissionController.getAll);
router.get('/submissions/:id', submission_controller_1.submissionController.getById);
//router.put('/submissions/:id', submissionController.updateById);
router.delete('/submissions/:id', submission_controller_1.submissionController.deleteById);
router.post('/analyze/identity', formRecognizer_controller_1.formRecognizerController.analyzeIdentityCard);
router.post('/analyze/passport', formRecognizer_controller_1.formRecognizerController.analyzePassport);
// exception route for forms without authentication;
// used when filling forms
router.get('/fill/forms/:id', form_controller_1.formController.getFormById);
//create routes for forms base on form controller
router.all('/forms*', auth_controller_1.isAuthenticated);
router.post('/forms', form_controller_1.formController.createForm);
router.get('/forms', form_controller_1.formController.getForms);
router.put('/forms/:id', form_controller_1.formController.updateForm);
router.delete('/forms/:id', form_controller_1.formController.deleteForm);
exports.default = router;
