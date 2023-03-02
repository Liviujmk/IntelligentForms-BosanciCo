"use strict";
//create submission from the form model
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const submissionSchema = new mongoose_1.Schema({
    formTitle: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const SubmissionModel = (0, mongoose_1.model)('Submission', submissionSchema);
exports.default = SubmissionModel;
