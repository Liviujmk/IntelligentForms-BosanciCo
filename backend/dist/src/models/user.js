"use strict";
//user model schema in typescript
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    userType: {
        type: String,
        required: true
    },
    fiscalCode: String,
    subscriptionPlan: {
        type: String,
        default: 'free'
    },
    access_token: {
        type: String,
        required: true,
    },
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
