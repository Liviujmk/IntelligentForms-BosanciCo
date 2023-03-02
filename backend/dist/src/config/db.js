"use strict";
//create db mongoose conection
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI_AZURE_COSMOS || '';
mongoose_1.default.connect(MONGO_URI);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
exports.default = db;
