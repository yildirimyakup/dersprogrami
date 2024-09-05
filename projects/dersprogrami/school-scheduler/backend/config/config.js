const dotenv = require("dotenv");

// .env dosyasını kullan
dotenv.config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database.sqlite", // Veritabanı dosyası
  },
};
