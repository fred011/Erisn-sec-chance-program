import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue color for primary
    },
    secondary: {
      main: "#f50057", // Pink color for secondary
    },
    background: {
      paper: "#fff", // Light background for paper
      default: "#f5f5f5", // Default background color
    },
    text: {
      primary: "#000", // Primary text color (black)
      secondary: "#757575", // Secondary text color (gray)
    },
  },
});
export default lightTheme;
