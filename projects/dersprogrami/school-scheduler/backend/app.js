const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // CORS'u import ediyoruz
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Tüm kaynaklardan gelen istekleri kabul eder
// const corsOptions = {
//   origin: 'http://localhost:5173', // Sadece bu origin'den gelen istekleri kabul eder
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions)); // CORS ayarlarını belirli bir origin için uyguluyoruz

// Backend API'leri
app.use("/teachers", teacherRoutes);
app.use("/classes", classRoutes);
app.use("/schedules", scheduleRoutes);

// Frontend statik dosyaları sunma (React build klasörü)
// app.use(express.static(path.join(__dirname, "build")));

// Herhangi bir route yakalanmadığında React'in index.html'ini döndür
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
