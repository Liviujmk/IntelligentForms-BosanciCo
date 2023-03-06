
/*import { Schema, model } from 'mongoose';

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

export default Form;*/

//form schema with dynamic fields and sections in typescript with mongoose using all interfaces and types

import { Schema, model } from 'mongoose';
import { Form } from '../types/form.types';

const formSchema = new Schema<Form>({
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

const FormModel = model<Form>('Form', formSchema);

export default FormModel;


