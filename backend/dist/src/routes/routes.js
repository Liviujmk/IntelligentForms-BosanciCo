"use strict";
// express typescript router
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
router.get('/forms', (req, res) => {
    res.status(200).json({ forms: [{
                name: 'form1',
                fields: [
                    {
                        label: 'label1',
                        fieldType: 'text',
                        placeholder: 'placeholder1',
                        keyword: 'keyword1',
                        mandatory: true,
                        options: ['option1', 'option2']
                    },
                    {
                        label: 'label2',
                        fieldType: 'text',
                        placeholder: 'placeholder2',
                        keyword: 'keyword2',
                        mandatory: true,
                        options: ['option1', 'option2']
                    }
                ],
            }] });
});
router.post('/auth/signup', auth_controller_1.default.create);
router.post('/auth/login', auth_controller_1.default.login);
exports.default = router;
