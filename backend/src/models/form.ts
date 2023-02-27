//form schema with dynamic fields

import { Schema, model } from 'mongoose';

const formSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    fields: [{
        label: String,
        fieldType: String,
        placeholder: String,
        keyword: String,
        mandatory: Boolean,
        options: [String]
    }],
    sections: [{
        rtfText: String,
        documentType: {
            type: String,
            default: 'None'
        }
    }],
    dataRetention: {
        type: Number,
        default: 30
    }
});

const Form = model('Form', formSchema);

export default Form;