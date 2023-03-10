import { Schema, model } from 'mongoose';
import { Form } from '../types/form.types';

const formSchema = new Schema<Form>({
    userId: {
        type: String,
        required: true
    },
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fillFormUrl: {
        type: String,
        default: ''
    }
});

//change _id to id before save
formSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const FormModel = model<Form>('Form', formSchema);

export default FormModel;



