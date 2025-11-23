// src/middlewares/logger.js
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Buat stream file untuk logging akses
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '..', '..', 'access.log'), 
    { flags: 'a' } // 'a' = append
);

// Konfigurasi logger
// 'combined' format mencakup informasi standar Apache (IP, user-agent, dll.)
const logger = morgan(
    'combined', 
    { stream: accessLogStream }
);

// Selain log ke file, kita tetap log ke console untuk lingkungan development
const consoleLogger = morgan('dev');

// Mengekspor keduanya atau salah satu, tergantung kebutuhan
module.exports = {
    fileLogger: logger,
    consoleLogger: consoleLogger
};