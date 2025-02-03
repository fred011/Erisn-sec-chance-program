import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // this ensures the theme is in dark mode
    primary: {
      main: "#90caf9", // Replace with your dark theme primary color
    },
    secondary: {
      main: "#ce93d8", // Replace with your dark theme secondary color
    },
  },
});
export default darkTheme;
