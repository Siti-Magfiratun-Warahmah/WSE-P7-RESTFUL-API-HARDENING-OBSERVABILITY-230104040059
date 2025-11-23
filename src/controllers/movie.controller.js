// src/controllers/movie.controller.js

// Kita import data dummy.
// Kita pakai 'let' di file data, tapi di sini kita import sebagai 'var'
// agar bisa mereferensi ke array yang sama di memori.
// (Alternatif: buat service terpisah, tapi ini cukup untuk soal)
let movies = require("../data/movies.data");

// Helper untuk validasi (Prinsip RESTful ke-6) [cite: 56]
const validateMovie = (data) => {
  // Field 'title' dan 'genre' wajib diisi 
  // Kita ikuti format validasi dari contoh 'books' [cite: 69]
  if (!data.title || !data.genre) {
    return {
      status: "fail",
      message: "Field 'title' dan 'genre' wajib diisi", // [cite: 77]
    };
  }
  return null; // Tidak ada error
};

// GET /api/movies
exports.getAllMovies = (req, res) => {
  res.status(200).json({ // 
    status: "success",
    message: "Data semua film berhasil diambil",
    data: movies,
  });
};

// GET /api/movies/:id
exports.getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    // Jika tidak ditemukan, kirim 404 
    return res.status(404).json({
      status: "fail",
      message: "Data film tidak ditemukan",
    });
  }

  // Jika ditemukan, kirim 200 
  res.status(200).json({
    status: "success",
    message: "Data film berhasil diambil",
    data: movie,
  });
};

// POST /api/movies
exports.createMovie = (req, res) => {
  const { title, genre, year } = req.body; // [cite: 72, 76]

  // Validasi Input (Prinsip 6) [cite: 56, 34]
  const error = validateMovie(req.body);
  if (error) {
    return res.status(400).json(error); // [cite: 60, 74]
  }

  // Buat ID baru (cara sederhana, di dunia nyata gunakan UUID)
  const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
  
  const newMovie = {
    id: newId,
    title,
    genre,
    // Mirip contoh, jika year tidak diisi, pakai tahun sekarang [cite: 86]
    year: year || new Date().getFullYear(),
  };

  movies.push(newMovie); // [cite: 87]

  // Kirim respon 201 Created [cite: 60, 88]
  res.status(201).json({
    status: "success",
    message: "Data film berhasil dibuat", // [cite: 90]
    data: newMovie, // [cite: 91]
  });
};

// PUT /api/movies/:id
exports.updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === id);

  // Cek apakah data ada (404)
  if (movieIndex === -1) {
    return res.status(404).json({ // 
      status: "fail",
      message: "Data film tidak ditemukan",
    });
  }

  // Validasi Input (Prinsip 6) [cite: 56, 34]
  const error = validateMovie(req.body);
  if (error) {
    return res.status(400).json(error); // [cite: 60, 74]
  }

  // Update data
  const { title, genre, year } = req.body;
  const updatedMovie = {
    ...movies[movieIndex], // Ambil data lama
    title: title, // Timpa dengan data baru
    genre: genre,
    year: year || movies[movieIndex].year, // Jika 'year' tidak dikirim, pakai data lama
  };
  
  movies[movieIndex] = updatedMovie;

  // Kirim respon 200 OK 
  res.status(200).json({
    status: "success",
    message: "Data film berhasil diperbarui",
    data: updatedMovie,
  });
};

// DELETE /api/movies/:id
exports.deleteMovie = (req, res) => {
  // PASTIKAN ADA 'parseInt' DI SINI:
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === id);

  // Cek apakah data ada (404)
  if (movieIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Data film tidak ditemukan",
    });
  }

  // Hapus data dari array
  movies.splice(movieIndex, 1);

  // Kirim respon 204 No Content 
  // Respon 204 tidak boleh memiliki body
  res.status(204).send();
};