// components/TimetableForm.tsx

import React, { useState } from "react";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import axios from "axios";

interface TimetableFormProps {
  onAdd: (newTimetable: { course: string; teacher: string }) => void;
}

const TimetableForm: React.FC<TimetableFormProps> = ({ onAdd }) => {
  const [newCourse, setNewCourse] = useState<string>("");
  const [newTeacher, setNewTeacher] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Form doğrulama
  const validateForm = () => {
    if (newCourse === "" || newTeacher === "") {
      setError("Ders adı ve öğretmen adı boş olamaz!");
      return false;
    }
    setError("");
    return true;
  };

  // Formu gönderme işlemi
  const handleSubmit = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:5000/api/timetable", {
        course: newCourse,
        teacher: newTeacher,
      })
      .then((response) => {
        onAdd(response.data); // Yeni ders programı eklendiğinde listeyi güncelle
        setNewCourse("");
        setNewTeacher("");
      })
      .catch((error) => {
        console.error("Ders programı eklenirken hata oluştu:", error);
      });
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2}>
        <TextField
          label="Ders Adı"
          fullWidth
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <TextField
          label="Öğretmen Adı"
          fullWidth
          value={newTeacher}
          onChange={(e) => setNewTeacher(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Ekle
        </Button>
      </Stack>
    </Box>
  );
};

export default TimetableForm;
