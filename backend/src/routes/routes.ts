// express typescript router

import express from 'express';
import { Request, Response } from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

router.get('/forms', (req: Request, res: Response) => {
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
     }]});
});

router.post('/auth/signup', authController.create);
router.post('/auth/login', authController.login);
export default router;