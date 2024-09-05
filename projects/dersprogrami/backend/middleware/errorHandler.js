// middleware/errorHandler.js

// Hata yönetimi middleware'i
module.exports = (err, req, res, next) => {
  console.error(err.stack); // Hata yığınını konsola yazdırıyoruz (geliştirici için)
  res.status(500).json({ message: "Sunucu hatası oluştu!" }); // 500 statüsü ile bir hata mesajı döndürüyoruz
};
