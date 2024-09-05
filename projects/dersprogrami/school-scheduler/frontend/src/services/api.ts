import axios from "axios";

const API_URL = "http://localhost:5001";

// API hatalarını yakalamak için try-catch bloklarını ekliyoruz
export const getTeachers = async () => {
  try {
    const response = await axios.get(`${API_URL}/teachers`);
    return response.data;
  } catch (error) {
    console.error("Öğretmenler getirilirken bir hata oluştu:", error);
    throw error;
  }
};

export const createTeacher = async (teacher: any) => {
  const t = {
    name: teacher.name,
    branch: teacher.branch,
    availableDays: {},
    availableHours: {},
  };
  try {
    const response = await axios.post(`${API_URL}/teachers`, t);
    return response.data;
  } catch (error) {
    console.error("Öğretmen eklenirken bir hata oluştu:", error);
    throw error;
  }
};

// Benzer şekilde, diğer API işlemleri için hata yönetimi ekliyoruz

export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}/classes`);
    return response.data;
  } catch (error) {
    console.error("Sınıflar getirilirken bir hata oluştu:", error);
    throw error;
  }
};

export const createClass = async (classData: any) => {
  try {
    const response = await axios.post(`${API_URL}/classes`, classData);
    return response.data;
  } catch (error) {
    console.error("Sınıf eklenirken bir hata oluştu:", error);
    throw error;
  }
};

// Diğer API fonksiyonları da benzer şekilde güncellenecek

// Ders Programı API'si
export const getSchedules = async () => {
  try {
    const response = await axios.get(`${API_URL}/schedules`);
    return response.data;
  } catch (error) {
    console.error("Sınıf eklenirken bir hata oluştu:", error);
    throw error;
  }
};

export const autoGenerateSchedule = async () => {
  try {
    const response = await axios.post(`${API_URL}/schedules/auto-generate`);
    return response.data;
  } catch (error) {
    console.error("Sınıf eklenirken bir hata oluştu:", error);
    throw error;
  }
};
