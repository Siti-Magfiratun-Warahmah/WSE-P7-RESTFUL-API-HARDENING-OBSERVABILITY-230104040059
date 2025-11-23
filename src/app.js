require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// --- REQUIRE MIDLEWARE & UTILS ---
// Middleware keamanan dan error
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter'); 
const { fileLogger, consoleLogger } = require('./middlewares/logger'); // Menggunakan logger dari middlewares

const app = express();

// --- MIDLEWARE GLOBAL (HARUS DI AWAL) ---
app.use(express.json()); // Body parser untuk JSON

// 1. Logging
// Log ke konsol saat development, selalu log ke file
if (process.env.NODE_ENV === 'development') {
    app.use(consoleLogger);
}
app.use(fileLogger); 

// 2. Middleware Keamanan (Hardening)
app.use(helmet());
// Menggunakan CORS_ORIGIN dari .env
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

// 3. Rate Limiter (Hardening)
app.use(limiter);

// --- ROUTES ---

// 4. Routes Movies
const movieRoutes = require('./routes/movie.routes'); 
app.use('/api/movies', movieRoutes); 

// 5. Endpoint /api/info (Observability - Metadata)
app.get('/api/info', (req, res) => {
    res.status(200).json({
        "service": "P7 WSE RESTful API Hardening & Observability - Movies",
        "author": "Siti Magfiratun Warahmah",
        "nim": "230104040059",
        "description": "API CRUD Movies (lanjutan UTS) yang telah diimplementasikan fitur keamanan dan pemantauan.",
        "features": {
            "security": ["Helmet (HTTP Headers)", "CORS", "Rate Limiting"],
            "observability": ["Morgan Logging (Console & File)", "Global Error Handler", "/api/health Endpoint"]
        },
        "version": "1.0.0"
    });
});

// 6. Endpoint /api/health (Observability - Uptime Check)
app.get('/api/health', (req, res) => {
    res.json({ 
        status: "ok", 
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString() 
    });
});

// --- ERROR HANDLERS (HARUS DI AKHIR) ---

// 7. 404 Handler Kustom (Menggantikan default HTML dengan JSON)
// Menangkap request yang tidak cocok dengan route manapun
app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Endpoint tidak ditemukan"
    });
});

// 8. Global Error Handler (500 Internal Server Error)
app.use(errorHandler);

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on console port ${PORT}`));