const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes"); // Ders programı route'larını ekliyoruz

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("School Scheduler Backend Running");
});

// Öğretmen route'ları
app.use("/teachers", teacherRoutes);

// Sınıf route'ları
app.use("/classes", classRoutes);

// Ders programı route'ları
app.use("/schedules", scheduleRoutes); // Yeni route'ları ekledik

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
