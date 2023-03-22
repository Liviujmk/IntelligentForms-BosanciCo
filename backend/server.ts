//express typescript

import express from 'express';
import { Request, Response } from 'express';

import { corsOptions } from './src/config/corsOptions';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import SubmissionModel from './src/models/submission';
import FormModel from './src/models/form';

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

// create a middleware that deletes submission date if today date is greater than form retention date
app.use(async(req: Request, res: Response, next: any) => {
    const today = new Date();
    const submissions = await SubmissionModel.find({});
    submissions.forEach(async (submission) => {
        const form = await FormModel.findOne({ _id: submission.formId });
        // @ts-ignore
        const dataRetentionDate = new Date(form?.createdAt.getTime() + form?.dataRetention * 24 * 60 * 60 * 1000);
        console.log("form is created ", form?.createdAt)
        console.log("dateRetention is ", dataRetentionDate)
        if (form) {
            if (today.getTime() > dataRetentionDate.getTime()) {
                await SubmissionModel.findByIdAndDelete(submission._id);
            }
        }
    })
})



//export default app;
app.listen(process.env.PORT || 80, () => {
    console.log('Server running on port http://localhost:3000');
});