module.exports = (sequelize, DataTypes) => {
  // 'Teacher' modelini tanımlıyoruz
  const Teacher = sequelize.define("Teacher", {
    // Öğretmen adını saklıyoruz (zorunlu alan)
    name: {
      type: DataTypes.STRING, // Veri türü string (metin)
      allowNull: false, // Boş olamaz
    },
    // Öğretmenin branşı (örneğin: Matematik, Fen Bilgisi)
    branch: {
      type: DataTypes.STRING, // Veri türü string
      allowNull: false, // Boş olamaz
    },
    // Öğretmenin haftanın hangi günlerinde müsait olduğunu JSON formatında saklıyoruz
    availableDays: {
      type: DataTypes.JSON, // Dizileri JSON formatında saklıyoruz
      allowNull: false, // Müsait günler boş olamaz
    },
    // Öğretmenin hangi saatlerde müsait olduğunu JSON formatında saklıyoruz
    availableHours: {
      type: DataTypes.JSON, // Saatleri JSON formatında saklıyoruz
      allowNull: false, // Müsait saatler boş olamaz
    },
  });

  // İlişkiler (daha sonra tanımlanacak)
  return Teacher;
};
