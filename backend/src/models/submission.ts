//create submission from the form model

import { Schema, model } from 'mongoose';
import Submission from '../types/submission.types';

const submissionSchema = new Schema<Submission>({
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

const SubmissionModel = model<Submission>('Submission', submissionSchema);

export default SubmissionModel;