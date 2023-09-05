"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.allowedOrigins = void 0;
const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.137.1:5173',
    'https://zealous-pebble-085bc8303.2.azurestaticapps.net',
    'http://localhost:4173',
    'https://frontend--gentle-figolla-3ef08d.netlify.app'
];
exports.allowedOrigins = allowedOrigins;
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    // credentials: true
};
exports.corsOptions = corsOptions;
