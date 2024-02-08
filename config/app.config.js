const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const config = {
    APP: {
        NAME: process.env.APP_NAME || 'Node Server',
        PORT: process.env.PORT || 8080,
        BASE_PATH: path.join(__dirname, '..'),
        MORGAN_LEVEL: 'combined'
    },
    DB: {
        CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 10,
        HOST: process.env.DB_HOST || 'localhost',
        PORT: process.env.DB_PORT || 3306,
        USER: process.env.DB_USER || 'root',
        PASSWORD: process.env.DB_PASSWORD || '',
        NAME: process.env.DB_NAME || 'n1'
    }
};

module.exports = config;