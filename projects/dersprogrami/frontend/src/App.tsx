// App.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import TimetableList from "./components/TimetableList"; // Listeleme component'i
import TimetableForm from "./components/TimetableForm"; // Form component'i

type Timetable = {
  id: number;
  course: string;
  teacher: string;
};

const App: React.FC = () => {
  const [timetable, setTimetable] = useState<Timetable[]>([]);

  // Backend'den ders programı verilerini çekmek için
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/timetable")
      .then((response) => {
        setTimetable(response.data);
      })
      .catch((error) => {
        console.error("Veri alınırken hata oluştu:", error);
      });
  }, []);

  // Yeni ders programı ekleme fonksiyonu
  const addTimetable = (newTimetable: { course: string; teacher: string }) => {
    setTimetable([...timetable, { id: timetable.length + 1, ...newTimetable }]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom align="center">
        Ders Programı
      </Typography>

      {/* Listeleme component'i */}
      <TimetableList timetable={timetable} />

      <Typography variant="h5" gutterBottom align="center">
        Yeni Ders Ekle
      </Typography>

      {/* Form component'i */}
      <TimetableForm onAdd={addTimetable} />
    </Container>
  );
};

export default App;
