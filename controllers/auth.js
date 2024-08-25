const { where } = require("sequelize");
const User = require("../models/user"); // Kullanıcı modelini içe aktarır
const bcrypt = require("bcrypt"); // Şifreleri hash'lemek için bcrypt kütüphanesini içe aktarır

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
    res.redirect("/account/login");
  }
};

// POST /register: Kullanıcı kayıt formundan gelen verileri işleyen işlev
exports.post_register = async (req, res) => {
  // Formdan gelen kullanıcı verilerini alır
  const { name, email, password } = req.body;

  try {
    // Şifreyi bcrypt ile hash'ler (şifreleme işlemi)
    const hashPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı veritabanına kaydeder
    await User.create({
      full_name: name, // Kullanıcının tam adı
      e_mail: email, // Kullanıcının e-posta adresi
      password: hashPassword, // Hashlenmiş şifre
    });

    // Kayıt başarılıysa, kullanıcıyı login sayfasına yönlendirir
    res.redirect("/account/login");
  } catch (error) {
    // Hata oluşursa, hata mesajını konsola yazdırır ve kullanıcıyı kayıt sayfasına yönlendirir
    console.log("Sayfa => auth.js:", error);
    res.redirect("/account/register?error=true"); // Hata parametresi ile kayıt sayfasına yönlendirir
  }
};

// GET /login: Kullanıcı giriş sayfasını render eden işlev
exports.get_login = async (req, res) => {
  try {
    // 'auth/login' şablonunu 'title' değişkeni ile render eder
    res.render("auth/login", {
      title: "Login Page.",
    });
  } catch (error) {
    // Hata oluşursa, hata mesajını konsola yazdırır
    console.log("Sayfa => login.js:", error);
    res.redirect("/account/login");
  }
};

// POST /login: Kullanıcı giriş formundan gelen verileri işleyen işlev
exports.post_login = async (req, res) => {
  // Formdan gelen kullanıcı verilerini alır
  const { email, password } = req.body;

  try {
    // Şifreyi bcrypt ile hash'ler (şifreleme işlemi)
    const hashPassword = await bcrypt.hash(password, 10);

    const userControl = await User.findOne({
      where: {
        e_mail: email,
      },
    });

    if (!userControl) {
      return res.render("auth/login", {
        title: "Login Page",
        message: "E-mail hatalı",
      });
    }

    const match = await bcrypt.compare(password, userControl.password);

    if (match) {
      // Login Yapıldı...
      req.sew;
      sessionStorage.isAuth = 1;
      return res.redirect("/");
    }

    // Giriş başarılıysa, kullanıcıyı login sayfasına yönlendirir
    res.render("auth/login", {
      title: "Login Page",
      message: "Parola Hatalı",
    });
  } catch (error) {
    // Hata oluşursa, hata mesajını konsola yazdırır ve kullanıcıyı kayıt sayfasına yönlendirir
    console.log("Sayfa => login.js:", error);
    res.redirect("account/login?error=true"); // Hata parametresi ile kayıt sayfasına yönlendirir
  }
};

exports.get_logout = async function (req, res) {
  try {
    await req.session.destroy();
    return res.redirect("/account/login");
  } catch (err) {
    console.log(err);
  }
};
