import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2a4d78", // Same deep blue for consistency
    },
    secondary: {
      main: "#6c8ea0", // Muted blue-gray for contrast
    },
    background: {
      paper: "#2a2d35", // Slightly lighter dark gray
      default: "#1c1f26", // Dark gray background
    },
    text: {
      primary: "#e0e0e0", // Light gray for readability
      secondary: "#b0b0b0", // Muted gray for subtle text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#e0e0e0", // Light text for headings
    },
    body1: {
      fontSize: "1rem",
      color: "#e0e0e0",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#e0e0e0",
          backgroundColor: "#2a2d35",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6c8ea0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2a4d78",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2a4d78",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#b0b0b0",
          "&.Mui-focused": {
            color: "#2a4d78",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default darkTheme;
