// controllers/timetableController.js

// Servis katmanını dahil ediyoruz. Tüm iş mantığı burada gerçekleştirilecek.
const timetableService = require("../services/timetableService");

// GET isteği: Tüm ders programını almak için bu fonksiyon kullanılıyor
exports.getTimetable = (req, res, next) => {
  try {
    // Servisten ders programını alıyoruz
    const timetable = timetableService.getTimetable();
    // Başarılı bir yanıt döndürüyoruz
    res.json(timetable);
  } catch (error) {
    // Eğer bir hata oluşursa, bunu global hata yönetimi middleware'ine yönlendiriyoruz
    next(error);
  }
};

// POST isteği: Yeni bir ders programı oluşturmak için
exports.createTimetable = (req, res, next) => {
  try {
    // Servise gelen verileri gönderip yeni bir ders programı oluşturuyoruz
    const newTimetable = timetableService.createTimetable(req.body);
    // Başarılı bir yanıt döndürüyoruz (201: Created)
    res.status(201).json(newTimetable);
  } catch (error) {
    // Eğer bir hata oluşursa, bunu global hata yönetimi middleware'ine yönlendiriyoruz
    next(error);
  }
};
