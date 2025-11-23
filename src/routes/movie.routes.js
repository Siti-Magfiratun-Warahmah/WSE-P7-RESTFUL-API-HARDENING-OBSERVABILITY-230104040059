// src/routes/movie.routes.js

const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

// Spesifikasi Endpoint yang Wajib Ada [cite: 59, 60]

// GET /api/movies (Ambil semua data) 
router.get("/", movieController.getAllMovies);

// GET /api/movies/:id (Ambil data berdasarkan id) 
router.get("/:id", movieController.getMovieById);

// POST /api/movies (Tambah data baru) 
router.post("/", movieController.createMovie);

// PUT /api/movies/:id (Update data) 
router.put("/:id", movieController.updateMovie);

// DELETE /api/movies/:id (Hapus data) 
router.delete("/:id", movieController.deleteMovie);

module.exports = router;