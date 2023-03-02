//express typescript

import express from 'express';
import { Request, Response } from 'express';

const app = express();
require('dotenv').config();

require('./src/config/db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//import router
import router from './src/routes/routes';

app.use('/', router);




app.listen(3000, () => {
    console.log('Server running on port http://localhost:3000');
});