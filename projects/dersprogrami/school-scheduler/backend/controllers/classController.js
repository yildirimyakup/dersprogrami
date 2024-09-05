const { Class } = require("../models");

// Yeni sınıf ekleme
exports.createClass = async (req, res) => {
  try {
    const { name, weeklySchedule } = req.body;

    // Yeni sınıf ekleniyor
    const newClass = await Class.create({
      name,
      weeklySchedule,
    });

    res.status(201).json(newClass); // Başarıyla eklendi
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sınıf eklenirken bir hata oluştu.", error });
  }
};

// Tüm sınıfları listeleme
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.status(200).json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sınıflar listelenirken bir hata oluştu.", error });
  }
};

// Belirli bir sınıfı güncelleme
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weeklySchedule } = req.body;

    // Sınıf güncelleniyor
    const classData = await Class.findByPk(id);

    if (!classData) {
      return res.status(404).json({ message: "Sınıf bulunamadı." });
    }

    classData.name = name;
    classData.weeklySchedule = weeklySchedule;

    await classData.save();

    res.status(200).json(classData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sınıf güncellenirken bir hata oluştu.", error });
  }
};

// Sınıf silme
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Sınıf bulunuyor
    const classData = await Class.findByPk(id);

    if (!classData) {
      return res.status(404).json({ message: "Sınıf bulunamadı." });
    }

    // Sınıf siliniyor
    await classData.destroy();
    res.status(200).json({ message: "Sınıf başarıyla silindi." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sınıf silinirken bir hata oluştu.", error });
  }
};
