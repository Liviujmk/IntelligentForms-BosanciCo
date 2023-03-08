"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
//form schema with dynamic fields and sections in typescript with mongoose using all interfaces and types
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
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
const FormModel = (0, mongoose_1.model)('Form', formSchema);
exports.default = FormModel;
