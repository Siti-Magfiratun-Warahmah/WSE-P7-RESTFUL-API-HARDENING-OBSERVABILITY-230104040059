// src/utils/env.js

/**
 * File ini digunakan untuk mengelola Environment Variable
 * dan memastikan variabel penting tersedia.
 */
module.exports = {
    PORT: process.env.PORT || 3000,
    RATE_LIMIT: parseInt(process.env.RATE_LIMIT) || 100,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',

    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
};