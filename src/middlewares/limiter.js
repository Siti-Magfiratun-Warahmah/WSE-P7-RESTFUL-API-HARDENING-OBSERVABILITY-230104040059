// src/middlewares/limiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    // Window: 15 menit
    windowMs: 15 * 60 * 1000, 
    // Max request: diambil dari Environment Variable
    max: process.env.RATE_LIMIT || 100, 
    // Menggunakan header X-Real-IP jika di belakang proxy (misal: Heroku, Nginx)
    standardHeaders: true, 
    // Menggunakan header RateLimit- * untuk batas
    legacyHeaders: false, 
    // Pesan jika batas terlampaui
    message: { 
        status: "fail", 
        message: "Terlalu banyak request dari IP ini, coba lagi dalam 15 menit." 
    },
});

module.exports = limiter;