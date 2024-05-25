"use client";
import { createTheme } from "@mui/material/styles";
import { openSans } from "./font";

export const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
    allVariants: {
      letterSpacing: 1,
    },
  },
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#009688",
    },
    error: {
      main: "#ff5722",
    },
    background: {
      default: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
