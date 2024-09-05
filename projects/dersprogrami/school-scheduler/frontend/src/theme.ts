import { createTheme } from "@mui/material/styles";

// Material-UI teması oluşturuyoruz
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Ana renk
    },
    secondary: {
      main: "#ff4081", // İkincil renk
    },
  },
});

export default theme;
