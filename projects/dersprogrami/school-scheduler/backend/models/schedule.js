module.exports = (sequelize, DataTypes) => {
  // 'Schedule' modelini tanımlıyoruz (ders programı için)
  const Schedule = sequelize.define("Schedule", {
    // Dersin yapılacağı gün (Pazartesi, Salı, vb.)
    day: {
      type: DataTypes.STRING, // Veri türü string
      allowNull: false, // Gün boş olamaz
    },
    // Dersin yapılacağı saat (9, 10, 11 vb.)
    hour: {
      type: DataTypes.INTEGER, // Veri türü integer (saat)
      allowNull: false, // Saat boş olamaz
    },
  });

  // İlişkiler: Her program öğretmen, sınıf ve derse bağlı olacak
  Schedule.associate = (models) => {
    // Her program bir öğretmene ait olacak
    Schedule.belongsTo(models.Teacher, { foreignKey: "teacherId" });
    // Her program bir sınıfa ait olacak
    Schedule.belongsTo(models.Class, { foreignKey: "classId" });
    // Her program bir derse ait olacak
    Schedule.belongsTo(models.Subject, { foreignKey: "subjectId" });
  };

  return Schedule;
};
