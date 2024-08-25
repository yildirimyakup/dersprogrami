const User = require("../models/user");

// GET /register: Kullanıcı kayıt sayfasını render eden işlev
exports.get_register = async (req, res) => {
  try {
    // 'auth/register' şablonunu 'title' değişkeni ile render eder
    res.render("auth/register", {
      title: "Register Page.",
    });
  } catch (error) {
    // Hata oluşursa, hata mesajını konsola yazdırır
    console.log("Sayfa => auth.js:", error);
  }
};

// POST /register: Kullanıcı kayıt formundan gelen verileri işleyen işlev
exports.post_register = async (req, res) => {
  // Formdan gelen kullanıcı verilerini alır
  const { name, email, password } = req.body;

  try {
    // Yeni kullanıcıyı veritabanına kaydeder
    await User.create({
      full_name: name,
      e_mail: email,
      password: password,
    });
    // Kayıt başarılıysa, kullanıcıyı login sayfasına yönlendirir
    res.redirect("account/login");
  } catch (error) {
    // Hata oluşursa, hata mesajını konsola yazdırır ve kullanıcıyı kayıt sayfasına yönlendirir
    console.log("Sayfa => auth.js:", error);
    res.redirect("/account/register?error=true");
  }
};
