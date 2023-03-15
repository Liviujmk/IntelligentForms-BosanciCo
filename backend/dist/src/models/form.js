"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const corsOptions_1 = require("../config/corsOptions");
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
        returnedObject.fillFormUrl = `${corsOptions_1.allowedOrigins[2]}/fill/${returnedObject.id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const FormModel = (0, mongoose_1.model)('Form', formSchema);
exports.default = FormModel;
