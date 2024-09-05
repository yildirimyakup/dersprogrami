const { Teacher } = require("../models");

// Yeni öğretmen ekleme
exports.createTeacher = async (req, res) => {
  try {
    const { name, branch, availableDays, availableHours } = req.body;

    // Yeni öğretmen kaydediliyor
    const newTeacher = await Teacher.create({
      name,
      branch,
      availableDays,
      availableHours,
    });

    res.status(201).json(newTeacher); // Başarıyla eklendi yanıtı
  } catch (error) {
    res
      .status(500)
      .json({ message: "Öğretmen eklenirken bir hata oluştu.", error });
  }
};

// Tüm öğretmenleri listeleme
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json(teachers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Öğretmenler listelenirken bir hata oluştu.", error });
  }
};

// Belirli bir öğretmeni güncelleme
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, branch, availableDays, availableHours } = req.body;

    // Öğretmen güncelleniyor
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: "Öğretmen bulunamadı." });
    }

    // Verileri güncelle
    teacher.name = name;
    teacher.branch = branch;
    teacher.availableDays = availableDays;
    teacher.availableHours = availableHours;

    await teacher.save();

    res.status(200).json(teacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Öğretmen güncellenirken bir hata oluştu.", error });
  }
};

// Öğretmen silme
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // Öğretmen bulunuyor
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: "Öğretmen bulunamadı." });
    }

    // Öğretmen siliniyor
    await teacher.destroy();
    res.status(200).json({ message: "Öğretmen başarıyla silindi." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Öğretmen silinirken bir hata oluştu.", error });
  }
};
