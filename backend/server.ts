//express typescript

import express from 'express';
import { Request, Response } from 'express';

import { corsOptions } from './src/config/corsOptions';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();

require('dotenv').config();
require('./src/config/db')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}));


//import router
import router from './src/routes/routes';

app.use('/', router);



//export default app;
app.listen(process.env.PORT || 80, () => {
    console.log('Server running on port http://localhost:3000');
});