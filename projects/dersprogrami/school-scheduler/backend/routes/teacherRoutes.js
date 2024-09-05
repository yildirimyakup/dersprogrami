const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// Öğretmen ekleme
router.post("/", teacherController.createTeacher);

// Tüm öğretmenleri listeleme
router.get("/", teacherController.getAllTeachers);

// Öğretmen güncelleme
router.put("/:id", teacherController.updateTeacher);

// Öğretmen silme
router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
