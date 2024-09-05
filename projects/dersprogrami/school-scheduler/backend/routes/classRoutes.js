const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

// Sınıf ekleme
router.post("/", classController.createClass);

// Tüm sınıfları listeleme
router.get("/", classController.getAllClasses);

// Sınıf güncelleme
router.put("/:id", classController.updateClass);

// Sınıf silme
router.delete("/:id", classController.deleteClass);

module.exports = router;
