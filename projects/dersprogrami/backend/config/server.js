// config/server.js

// Express'i ve diğer gerekli paketleri import ediyoruz.
const express = require("express");
const cors = require("cors"); // CORS güvenlik politikalarını yönetmek için
const bodyParser = require("body-parser"); // Gelen isteklerdeki JSON verilerini çözümlemek için
const helmet = require("helmet"); // HTTP başlıklarını güvenli hale getirmek için
const rateLimit = require("express-rate-limit"); // DDoS saldırılarına karşı koruma sağlamak için
const timetableRoutes = require("../routes/timetableRoutes"); // Rota dosyalarını dahil ediyoruz
const errorHandler = require("../middleware/errorHandler"); // Hata yönetimi middleware'i

// Express uygulamasını başlatıyoruz
const app = express();
const PORT = process.env.PORT || 5000; // PORT numarası, ya environment'tan ya da varsayılan olarak 5000 olacak

// Helmet ile HTTP başlıklarını güvenli hale getiriyoruz
app.use(helmet());

// Rate Limiting: Her IP'den gelen istekleri sınırlıyoruz (15 dakika içinde en fazla 100 istek)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika içinde
  max: 100, // Her IP için maksimum 100 istek
});
app.use(limiter);

// CORS Middleware: Frontend ile backend arasındaki isteklerin düzgün çalışması için
app.use(cors());

// Body Parser Middleware: Gelen JSON verilerini çözümlüyoruz
app.use(bodyParser.json());

// API rotalarını tanımlıyoruz (timetable ile ilgili işlemler buradan yapılacak)
app.use("/api/timetable", timetableRoutes);

// Global hata yönetimi middleware'i. Herhangi bir hata oluştuğunda bu fonksiyon devreye girecek
app.use(errorHandler);

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
