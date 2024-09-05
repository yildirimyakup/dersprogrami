import React, { useEffect, useState } from "react";
import { getSchedules, autoGenerateSchedule } from "../services/api";
import { Button, List, ListItem, ListItemText, Snackbar } from "@mui/material";

const ScheduleList: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Başarı mesajı için state

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (error) {
        setErrorMessage("Ders programı yüklenirken bir hata oluştu.");
      }
    };
    fetchSchedules();
  }, []);

  const handleAutoGenerate = async () => {
    try {
      await autoGenerateSchedule();
      const updatedSchedules = await getSchedules();
      setSchedules(updatedSchedules);
      setSuccessMessage("Ders programı başarıyla oluşturuldu."); // Başarı mesajı
    } catch (error) {
      setErrorMessage("Ders programı otomatik oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div>
      <h2>Ders Programı</h2>
      <List>
        {schedules.map((schedule) => (
          <ListItem key={schedule.id}>
            <ListItemText
              primary={`${schedule.day} - ${schedule.hour}: ${schedule.Teacher.name} - ${schedule.Subject.name} (${schedule.Class.name})`}
            />
          </ListItem>
        ))}
      </List>

      <Button onClick={handleAutoGenerate} variant="contained" color="primary">
        Otomatik Ders Programı Oluştur
      </Button>

      {/* Hata mesajını göstermek için Snackbar bileşenini kullanıyoruz */}
      <Snackbar
        open={!!errorMessage}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
        autoHideDuration={4000}
      />

      {/* Başarı mesajını göstermek için Snackbar bileşeni */}
      <Snackbar
        open={!!successMessage}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
        autoHideDuration={4000}
      />
    </div>
  );
};

export default ScheduleList;
