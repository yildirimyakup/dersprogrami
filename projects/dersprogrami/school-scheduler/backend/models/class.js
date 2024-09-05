module.exports = (sequelize, DataTypes) => {
  // 'Class' modelini tanımlıyoruz (sınıf ve şubeler için)
  const Class = sequelize.define("Class", {
    // Sınıfın adı (örn: 5A, 6B)
    name: {
      type: DataTypes.STRING, // Veri türü string (metin)
      allowNull: false, // Sınıf adı boş olamaz
    },
    // Sınıfın haftalık ders müfredatını JSON formatında saklıyoruz
    weeklySchedule: {
      type: DataTypes.JSONB, // JSONB formatında saklanacak
      allowNull: true, // Müfredat boş olabilir, sonra doldurulacak
    },
  });

  // İlişkiler (daha sonra tanımlanacak)
  return Class;
};
