import { Schema, model } from 'mongoose';
import { Form } from '../types/form.types';
import { allowedOrigins } from '../config/corsOptions';

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
        sectionNr: Number,
        label: String,
        fieldType: String,
        placeholder: String,
        keyword: String,
        mandatory: Boolean,
        options: [{
            name: String
        }]
    }],
    sections: [{
        sectionNr: Number,
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
        returnedObject.fillFormUrl = `${allowedOrigins[2]}/fill/${returnedObject.id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const FormModel = model<Form>('Form', formSchema);

export default FormModel;



