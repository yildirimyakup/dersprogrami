// services/timetableService.js

// Geçici olarak verileri saklamak için bir dizi (bu aşamada veritabanı kullanmıyoruz)
const timetable = [];

// GET isteği: Tüm ders programını döndürmek için
exports.getTimetable = () => {
  return timetable; // Şu anda tüm programı statik olarak döndürüyoruz
};

// POST isteği: Yeni bir ders programı oluşturmak için
exports.createTimetable = (data) => {
  // Yeni ders programına bir id veriyoruz ve gelen verileri ekliyoruz
  const newTimetable = {
    id: timetable.length + 1, // ID, mevcut dizinin uzunluğuna göre belirleniyor
    ...data, // Gelen veriler ders programına ekleniyor
  };
  // Yeni ders programını diziye ekliyoruz
  timetable.push(newTimetable);
  return newTimetable; // Yeni oluşturulan programı döndürüyoruz
};
