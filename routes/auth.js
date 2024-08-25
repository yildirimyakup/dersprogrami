const express = require("express"); // Express modülünü içe aktarır
const router = express.Router(); // Express router nesnesini oluşturur

const authController = require("../controllers/auth"); // Auth controller'ını içe aktarır

// GET /auth/register: Kullanıcı kayıt sayfasını sunan işlevi tanımlar
router.get("/auth/register", authController.get_register);

// POST /auth/register: Kullanıcı kayıt formundan gelen verileri işleyen işlevi tanımlar
router.post("/auth/register", authController.post_register);

// GET /auth/login: Kullanıcı giriş sayfasını sunan işlevi tanımlar
router.get("/auth/login", authController.get_login);

// POST /auth/login: Kullanıcı giriş formundan gelen verileri işleyen işlevi tanımlar
router.post("/auth/login", authController.post_login);

module.exports = router; // Router'ı dışa aktarır, böylece diğer modüllerde kullanılabilir
