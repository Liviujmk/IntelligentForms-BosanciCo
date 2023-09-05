"use strict";
//express typescript
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const corsOptions_1 = require("./src/config/corsOptions");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
require('dotenv').config();
require('./src/config/db');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
//import router
const routes_1 = __importDefault(require("./src/routes/routes"));
app.use('/', routes_1.default);
// create a middleware that deletes submission date if today date is greater than form retention date
/*app.use(async(req: Request, res: Response, next: any) => {
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
})*/
//export default app;
app.listen(process.env.PORT || 80, () => {
    console.log('Server running on port http://localhost:3000');
});
