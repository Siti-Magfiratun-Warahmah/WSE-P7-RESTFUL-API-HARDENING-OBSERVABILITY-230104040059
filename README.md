# P7 WSE RESTful API Hardening & Observability
# Proyek: UTS-WSE-230104040059

RESTful API ini dibuat untuk memenuhi instruksi **Praktikum 7: API Hardening & Observability** mata kuliah Web Service Engineering. Proyek ini merupakan pengembangan dari API CRUD sebelumnya dengan fokus pada peningkatan keamanan dan kemampuan pemantauan.

---

## 👩‍🎓 Identitas Mahasiswa

* **Nama:** Siti Magfiratun Warahmah
* **NIM:** 230104040059
* **Kelas:** TI23B
* **Dosen:** Muhayat, M.IT
* **Resource:** `movies`

---

## 🚀 Deskripsi Proyek

API ini adalah layanan RESTful sederhana yang dibangun menggunakan **Node.js** dan **Express.js**. API ini mengelola data film (resource `movies`) yang disimpan dalam memori (file `movies.data.js`).

Fokus utama proyek ini adalah implementasi fitur **Hardening (Keamanan)** dan **Observability (Pemantauan)**, yaitu:

### 🛡️ Fitur Hardening (Keamanan)
1.  **Helmet:** Menambahkan header HTTP keamanan untuk mitigasi serangan web umum.
2.  **CORS:** Mengamankan akses API dengan membatasi *origin* yang diizinkan (diatur via `.env`).
3.  **Rate Limiting:** Mencegah serangan *brute-force* atau *Denial-of-Service* (DoS) dengan membatasi jumlah *request* per IP dalam periode waktu tertentu (diatur via `.env`).

### 🔭 Fitur Observability (Pemantauan)
1.  **Morgan Logger:** Mencatat semua *request* API ke *console* (`dev` format) dan ke file `access.log` (`combined` format).
2.  **Health Check Endpoint:** Menyediakan endpoint `/api/health` untuk memantau status *uptime* dan lingkungan server.
3.  **Global Error Handler:** Menggunakan *middleware* terpusat (`errorHandler.js`) untuk menangani *Internal Server Error* (500) dan *Not Found Error* (404) dalam format respons **JSON** yang konsisten.

---

## 🛠️ Teknologi dan Dependencies

* **Node.js** & **Express.js**
* **Dependencies Utama:** `dotenv`, `express`, `helmet`, `cors`, `morgan`, `express-rate-limit`.
* **Dev Dependency:** `nodemon`.

---

## 🏃 Cara Menjalankan Proyek

1.  **Install Dependencies:**
    Buka terminal di folder proyek dan jalankan:
    ```bash
    npm install
    ```

2.  **Konfigurasi Environment:**
    Buat file `.env` di *root* proyek dan isi dengan konfigurasi dasar dari `.env.example`:
    ```
    PORT=3000
    RATE_LIMIT=100
    NODE_ENV=development
    CORS_ORIGIN=http://localhost:5173 
    ```

3.  **Jalankan Server:**
    Untuk menjalankan server dalam mode development:
    ```bash
    npm run dev
    ```

4.  **Server Aktif:**
    Server akan berjalan di port `3000`. Cek status di `http://localhost:3000/api/health`.

---

## 📖 Endpoint API & Pengujian

Berikut adalah semua *endpoint* yang tersedia dan skenario *error handling* untuk pengujian di **Postman**:

| Method | Endpoint | Deskripsi | Status Sukses / Gagal | Fitur |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/info` | Informasi identitas & fitur service. | `200 OK` | Observability |
| `GET` | `/api/health` | Mengecek status *uptime* dan lingkungan server. | `200 OK` | Observability |
| `GET` | `/api/movies` | Ambil semua data film. | `200 OK` | CRUD |
| `GET` | `/api/movies/:id` | Ambil satu data film berdasarkan ID. | `200 OK` / `404 Not Found` | CRUD |
| `POST` | `/api/movies` | Tambah data film baru. | `201 Created` / `400 Bad Request` (Validasi) | CRUD |
| `PUT` | `/api/movies/:id` | Update data film berdasarkan ID. | `200 OK` / `400 / 404` | CRUD |
| `DELETE`| `/api/movies/:id` | Hapus data film berdasarkan ID. | `204 No Content` / `404 Not Found` | CRUD |
| **ANY** | `/api/unknown` | **Handler 404 Global (Custom JSON)** untuk *endpoint* tidak dikenal. | **404 Not Found** | Error Handling |
| **ERROR** | N/A (Internal) | **Global Error Handler** untuk *internal server error*. | **500 Internal Server Error** | Error Handling |