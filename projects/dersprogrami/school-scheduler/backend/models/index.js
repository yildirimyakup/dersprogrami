const { Sequelize, DataTypes } = require("sequelize"); // Sequelize ve veri tiplerini yüklüyoruz
const config = require("../config/config.js"); // Veritabanı yapılandırmasını yüklüyoruz

// Sequelize veritabanı bağlantısını başlatıyoruz
const sequelize = new Sequelize(config.development);

// Modelleri dahil ediyoruz
const Teacher = require("./teacher")(sequelize, DataTypes); // Öğretmen modeli
const Class = require("./class")(sequelize, DataTypes); // Sınıf modeli
const Subject = require("./subject")(sequelize, DataTypes); // Ders modeli
const Schedule = require("./schedule")(sequelize, DataTypes); // Ders programı modeli

// İlişkileri tanımlıyoruz (programlar öğretmen, sınıf ve derse bağlı olacak)
Schedule.associate({ Teacher, Class, Subject });

// Veritabanını senkronize ediyoruz
sequelize.sync({ force: false }).then(() => {
  console.log("Veritabanı senkronize edildi.");
});

// Modelleri dışa aktarıyoruz
module.exports = { sequelize, Teacher, Class, Subject, Schedule };
