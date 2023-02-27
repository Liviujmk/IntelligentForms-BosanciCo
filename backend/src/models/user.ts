//user model schema in mongoose

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
});

const User = model('User', userSchema);

export default User;
