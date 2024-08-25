const express = require("express"); // Express.js kütüphanesini içe aktarır
const cookieParser = require("cookie-parser");
const app = express(); // Yeni bir Express uygulama nesnesi oluşturur

app.use(cookieParser());
app.set("view engine", "ejs"); // Şablon motoru olarak EJS'i ayarlar
app.use(express.urlencoded({ extended: false })); // URL encoded verileri parse etmek için middleware kullanır

const path = require("path"); // Dosya yolu işlemleri için path modülünü içe aktarır
const userRoutes = require("./routes/user"); // Kullanıcıyla ilgili yönlendirmeleri içeren modülü içe aktarır
const adminRoutes = require("./routes/admin"); // Yöneticiyle ilgili yönlendirmeleri içeren modülü içe aktarır
const authRoutes = require("./routes/auth"); // Kimlik doğrulama ile ilgili yönlendirmeleri içeren modülü içe aktarır

// 'node_modules' dizinindeki statik dosyaları '/libs' yolundan erişilebilir yapar
app.use("/libs", express.static(path.join(__dirname, "node_modules")));

// 'public' dizinindeki statik dosyaları '/static' yolundan erişilebilir yapar
app.use("/static", express.static(path.join(__dirname, "public")));

// Yönetici yönlendirmelerini '/admin' yolundan yönlendirir
app.use("/admin", adminRoutes);

// Kullanıcı yönlendirmelerini kök (/) yolundan yönlendirir
app.use(userRoutes);

// Kimlik doğrulama yönlendirmelerini '/account' yolundan yönlendirir
app.use("/account", authRoutes);

const sequelize = require("./data/db"); // Sequelize veritabanı bağlantısını içe aktarır
const dummyData = require("./data/dummy-data"); // Örnek verileri içe aktarır
const Category = require("./models/category"); // Kategori modelini içe aktarır
const Blog = require("./models/blog"); // Blog modelini içe aktarır
const User = require("./models/user"); // Kullanıcı modelini içe aktarır

// Blog ve Kullanıcı arasında bire bir ilişki kurar
Blog.belongsTo(User);
User.hasMany(Blog);

// Blog ve Kategori arasında çoktan çoğa ilişki kurar
Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });

// Veritabanını senkronize eder ve ardından dummy verileri ekler
(async () => {
  await sequelize.sync({ force: true }); // Veritabanını sıfırdan oluşturur
  await dummyData(); // Dummy verileri veritabanına ekler
})();

// Uygulamanın 3000 portunda dinlemesini başlatır
app.listen(3000, function () {
  console.log("listening on port 3000"); // Başarıyla dinlemeye başladığını belirtir
});
