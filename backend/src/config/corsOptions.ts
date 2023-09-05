import { CorsOptions } from "cors";

const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.137.1:5173',
    'https://zealous-pebble-085bc8303.2.azurestaticapps.net',
    'http://localhost:4173',
    'https://frontend--gentle-figolla-3ef08d.netlify.app'
];

const corsOptions: CorsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    allowedHeaders: ["*", "x-authorization"]
}

export {allowedOrigins, corsOptions}