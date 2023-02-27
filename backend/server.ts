//express typescript

import express from 'express';
import { Request, Response } from 'express';

const app = express();
require('dotenv').config();

require('./src/config/db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

app.get('/forms', (req: Request, res: Response) => {
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

app.listen(3001, () => {
    console.log('Server running on port http://localhost:3001');
});