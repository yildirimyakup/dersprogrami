// Gerekli modülleri içe aktarıyoruz
const express = require("express"); // Express.js kütüphanesini içe aktarır
const cookieParser = require("cookie-parser"); // Çerezleri işlemek için cookie-parser kütüphanesini içe aktarır
const session = require("express-session"); // Oturum yönetimi için express-session kütüphanesini içe aktarır
const path = require("path"); // Dosya yolu işlemleri için path modülünü içe aktarır
const sequelize = require("./data/db"); // Sequelize veritabanı bağlantısını içe aktarır
const dummyData = require("./data/dummy-data"); // Örnek verileri içe aktarır
const Category = require("./models/category"); // Kategori modelini içe aktarır
const Blog = require("./models/blog"); // Blog modelini içe aktarır
const User = require("./models/user"); // Kullanıcı modelini içe aktarır
const userRoutes = require("./routes/user"); // Kullanıcıyla ilgili yönlendirmeleri içeren modülü içe aktarır
const adminRoutes = require("./routes/admin"); // Yöneticiyle ilgili yönlendirmeleri içeren modülü içe aktarır
const authRoutes = require("./routes/auth"); // Kimlik doğrulama ile ilgili yönlendirmeleri içeren modülü içe aktarır

// Yeni bir Express uygulama nesnesi oluşturuyoruz
const app = express();

// Express uygulamasında oturum yönetimi için `session` middleware'ini kullanıyoruz
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const local = require("./middlewares/local");
const authControl = require("./middlewares/auth");

app.use(
  session({
    secret: "hello world", // Oturumun şifrelenmesi için kullanılan gizli anahtar
    resave: false, // Oturum verilerinin her istekten sonra yeniden kaydedilmesini engeller
    saveUninitialized: false, // Yeni oluşturulmuş ama henüz oturum verisi içermeyen oturumları kaydetmez
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Çerezin geçerlilik süresi (24 saat)
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(local);

// Çerezleri işlemek için cookie-parser middleware'ini kullanıyoruz
app.use(cookieParser());

// Şablon motoru olarak EJS'i ayarlıyoruz
app.set("view engine", "ejs");

// URL encoded verileri parse etmek için middleware kullanıyoruz
app.use(express.urlencoded({ extended: false }));

// 'node_modules' dizinindeki statik dosyaları '/libs' yolundan erişilebilir yapıyoruz
app.use("/libs", express.static(path.join(__dirname, "node_modules")));

// 'public' dizinindeki statik dosyaları '/static' yolundan erişilebilir yapıyoruz
app.use("/static", express.static(path.join(__dirname, "public")));

// Yönetici yönlendirmelerini '/admin' yolundan yönlendiriyoruz
app.use("/admin", authControl, adminRoutes);

// Kullanıcı yönlendirmelerini kök (/) yolundan yönlendiriyoruz
app.use(userRoutes);

// Kimlik doğrulama yönlendirmelerini '/account' yolundan yönlendiriyoruz
app.use("/account", authRoutes);

// Blog ve Kullanıcı modelleri arasındaki ilişkileri tanımlıyoruz
Blog.belongsTo(User); // Her blog bir kullanıcıya ait
User.hasMany(Blog); // Bir kullanıcı birçok bloga sahip olabilir

// Blog ve Kategori modelleri arasındaki ilişkileri tanımlıyoruz
Blog.belongsToMany(Category, { through: "blogCategories" }); // Bir blog birçok kategoriye sahip olabilir
Category.belongsToMany(Blog, { through: "blogCategories" }); // Bir kategori birçok bloga sahip olabilir

// Veritabanını senkronize ediyoruz ve ardından dummy verileri ekliyoruz
(async () => {
  //await sequelize.sync({ force: true }); // Veritabanını sıfırdan oluşturur
  //await dummyData(); // Dummy verileri veritabanına ekler
})();

// Uygulamanın 3000 portunda dinlemesini başlatıyoruz
app.listen(3000, function () {
  console.log("listening on port 3000"); // Başarıyla dinlemeye başladığını belirtir
});
