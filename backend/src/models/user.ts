//user model schema in typescript

import { Schema, model } from 'mongoose';
import { User } from '../types/user.types';

const userSchema = new Schema<User>({
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

const UserModel = model<User>('User', userSchema);

export default UserModel;