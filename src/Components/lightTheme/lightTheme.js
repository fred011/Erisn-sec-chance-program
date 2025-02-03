import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light", // this ensures the theme is in light mode
    primary: {
      main: "#1976d2", // Replace with your light theme primary color
    },
    secondary: {
      main: "#9c27b0", // Replace with your light theme secondary color
    },
  },
});
export default lightTheme;
