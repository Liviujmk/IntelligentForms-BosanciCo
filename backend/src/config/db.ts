//create db mongoose conection

import mongoose from 'mongoose';
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI_AZURE_COSMOS || '';

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Database connected');
});

export default db;

