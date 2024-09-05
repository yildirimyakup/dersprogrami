import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeacherList from "./components/TeacherList";
import ScheduleList from "./components/ScheduleList";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Temayı dahil ediyoruz

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/" element={<h1>Okul Programı Yönetim Sistemi</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
