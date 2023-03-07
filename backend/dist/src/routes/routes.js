"use strict";
// express typescript router
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const form_controller_1 = require("../controllers/form.controller");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Intelligent forms app' });
});
router.post('/auth/signup', auth_controller_1.authController.create);
router.post('/auth/login', auth_controller_1.authController.login);
//create routes for forms base on form controller
router.post('/forms', form_controller_1.formController.createForm);
router.get('/forms', form_controller_1.formController.getForms);
router.get('/forms/:id', form_controller_1.formController.getFormById);
router.put('/forms/:id', form_controller_1.formController.updateForm);
router.delete('/forms/:id', form_controller_1.formController.deleteForm);
exports.default = router;
