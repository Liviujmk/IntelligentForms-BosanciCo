//create submission from the form model

import { Schema, model } from 'mongoose';

const submissionSchema = new Schema({
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

const Submission = model('Submission', submissionSchema);

export default Submission;