import React, { useState, useEffect } from "react";
import { getTeachers, createTeacher } from "../services/api";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", branch: "" });
  const [loading, setLoading] = useState<boolean>(false); // Yükleniyor durumu
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true); // Yüklenmeye başla
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        setErrorMessage("Öğretmenler yüklenirken bir hata oluştu.");
      }
      setLoading(false); // Yüklenme bitti
    };
    fetchTeachers();
  }, []);

  const handleCreateTeacher = async () => {
    try {
      if (newTeacher.name && newTeacher.branch) {
        await createTeacher(newTeacher);
        setNewTeacher({ name: "", branch: "" });
        const updatedTeachers = await getTeachers();
        setTeachers(updatedTeachers);
        setSuccessMessage("Öğretmen başarıyla eklendi.");
      }
    } catch (error) {
      setErrorMessage("Öğretmen eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <h2>Öğretmen Listesi</h2>
      {loading ? (
        <CircularProgress /> // Yükleniyor animasyonu
      ) : (
        <List>
          {teachers.map((teacher) => (
            <ListItem key={teacher.id}>
              <ListItemText primary={`${teacher.name} - ${teacher.branch}`} />
            </ListItem>
          ))}
        </List>
      )}

      <h3>Yeni Öğretmen Ekle</h3>
      <TextField
        label="Öğretmen Adı"
        value={newTeacher.name}
        onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
      />
      <TextField
        label="Branş"
        value={newTeacher.branch}
        onChange={(e) =>
          setNewTeacher({ ...newTeacher, branch: e.target.value })
        }
      />
      <Button onClick={handleCreateTeacher} variant="contained" color="primary">
        Ekle
      </Button>

      <Snackbar
        open={!!errorMessage}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
        autoHideDuration={4000}
      />

      <Snackbar
        open={!!successMessage}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
        autoHideDuration={4000}
      />
    </div>
  );
};

export default TeacherList;
