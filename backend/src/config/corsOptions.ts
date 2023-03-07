const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.137.1:5173',
    'https://zealous-pebble-085bc8303.2.azurestaticapps.net',
    'https://frontend--gentle-figolla-3ef08d.netlify.app'
];

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export {allowedOrigins, corsOptions}