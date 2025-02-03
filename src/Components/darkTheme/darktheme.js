import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // Blue color for primary
    },
    secondary: {
      main: "#f50057", // Pink color for secondary
    },
    background: {
      paper: "#424242", // Dark background for paper
      default: "#303030", // Default background color for dark theme
    },
    text: {
      primary: "#fff", // White text for dark theme
      secondary: "#bdbdbd", // Lighter gray text for secondary text
    },
  },
});
export default darkTheme;
