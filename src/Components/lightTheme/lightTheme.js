import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2a4d78", // Enhanced blue for primary
    },
    secondary: {
      main: "#6c8ea0", // Soft grayish blue for secondary
    },
    background: {
      paper: "#ffffff", // Paper background
      default: "#f4f6f9", // Light grayish background
    },
    text: {
      primary: "#333333", // Dark gray for readability
      secondary: "#666666", // Soft gray for secondary text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#2a4d78", // Primary blue for headings
    },
    body1: {
      fontSize: "1rem",
      color: "#333333",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#333333",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#CCCCCC",
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
          color: "#666666",
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

export default lightTheme;
