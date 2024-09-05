const { Schedule, Teacher, Class, Subject } = require("../models");

// Yeni bir ders programı ekleme
exports.createSchedule = async (req, res) => {
  try {
    const { teacherId, classId, subjectId, day, hour } = req.body;

    // Yeni bir ders programı oluşturuyoruz
    const newSchedule = await Schedule.create({
      teacherId, // Öğretmen kimliği
      classId, // Sınıf kimliği
      subjectId, // Ders kimliği
      day, // Hangi gün (örn. Pazartesi)
      hour, // Hangi saat (örn. 9)
    });

    res.status(201).json(newSchedule); // Yeni program başarıyla eklendi yanıtı
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ders programı eklenirken bir hata oluştu.", error });
  }
};

// Tüm ders programlarını listeleme
exports.getAllSchedules = async (req, res) => {
  try {
    // Tüm programları ilişkili öğretmen, sınıf ve ders ile birlikte getiriyoruz
    const schedules = await Schedule.findAll({
      include: [Teacher, Class, Subject], // İlişkili tabloları dahil ediyoruz
    });
    res.status(200).json(schedules); // Başarıyla yanıt veriyoruz
  } catch (error) {
    res.status(500).json({
      message: "Ders programları listelenirken bir hata oluştu.",
      error,
    });
  }
};

// Otomatik ders programı yerleştirme algoritması
exports.autoGenerateSchedule = async (req, res) => {
  try {
    // Tüm sınıfları ve öğretmenleri getiriyoruz
    const classes = await Class.findAll();
    const teachers = await Teacher.findAll();
    const subjects = await Subject.findAll();

    // Haftanın günleri ve saatleri
    const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    const hours = [9, 10, 11, 12, 13, 14, 15];

    // Tüm sınıflar için ders programı oluşturacağız
    for (const classData of classes) {
      // Her sınıfın müfredatını alıyoruz (dersler ve saatler)
      for (const subject of subjects) {
        let remainingHours = subject.weeklyHours;

        // Sınıfın müfredatına göre saatleri yerleştireceğiz
        for (const day of weekdays) {
          for (const hour of hours) {
            if (remainingHours <= 0) break; // Ders saatini tamamladık mı?

            // Müsait bir öğretmen bul
            const availableTeacher = teachers.find((teacher) => {
              return (
                teacher.branch === subject.name && // Öğretmen o branşın dersini verebiliyor mu?
                teacher.availableDays.includes(day) && // Öğretmen o gün müsait mi?
                teacher.availableHours.includes(hour) // Öğretmen o saatte müsait mi?
              );
            });

            if (availableTeacher) {
              // Ders programını kaydediyoruz
              await Schedule.create({
                teacherId: availableTeacher.id,
                classId: classData.id,
                subjectId: subject.id,
                day,
                hour,
              });

              // Haftalık ders saatinden bir saat eksilt
              remainingHours--;
            }
          }
        }
      }
    }

    res.status(200).json({ message: "Ders programı başarıyla oluşturuldu." });
  } catch (error) {
    res.status(500).json({
      message: "Ders programı oluşturulurken bir hata oluştu.",
      error,
    });
  }
};

// Ders programını güncelleme fonksiyonu tanımlı mı?
exports.updateSchedule = async (req, res) => {
  // Fonksiyonun içeriği yukarıdaki tanımlamada olduğu gibi olmalıdır.
};

// Ders programını güncelleme fonksiyonu tanımlı mı?
exports.deleteSchedule = async (req, res) => {
  // Fonksiyonun içeriği yukarıdaki tanımlamada olduğu gibi olmalıdır.
};
