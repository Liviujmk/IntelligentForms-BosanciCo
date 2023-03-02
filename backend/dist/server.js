"use strict";
//express typescript
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('dotenv').config();
require('./src/config/db');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//import router
const routes_1 = __importDefault(require("./src/routes/routes"));
app.use('/', routes_1.default);
app.listen(process.env.PORT || 80, () => {
    console.log('Server running on port http://localhost:3000');
});
