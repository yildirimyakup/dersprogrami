// routes/timetableRoutes.js

const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

// GET isteği: Ders programını al
router.get("/", timetableController.getTimetable);

// POST isteği: Ders programı ekle
router.post("/", timetableController.createTimetable);

module.exports = router;
