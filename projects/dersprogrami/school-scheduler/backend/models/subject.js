module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    // Ders adı (örneğin: Matematik, Fen Bilgisi)
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Ders adı boş bırakılamaz
    },
    // Haftalık ders saati
    weeklyHours: {
      type: DataTypes.INTEGER,
      allowNull: false, // Haftalık ders saatleri belirtilmeli
    },
  });

  // İlişkiler ileride tanımlanacak
  return Subject;
};
