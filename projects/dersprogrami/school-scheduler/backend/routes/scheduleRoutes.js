const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

// Yeni bir ders programı ekleme
router.post("/", scheduleController.createSchedule);

// Tüm ders programlarını listeleme
router.get("/", scheduleController.getAllSchedules);

// Ders programını güncelleme
router.put("/:id", scheduleController.updateSchedule);

// Ders programını silme
router.delete("/:id", scheduleController.deleteSchedule);

// Otomatik yerleştirme algoritmasını çalıştırma
router.post("/auto-generate", scheduleController.autoGenerateSchedule);

module.exports = router;
