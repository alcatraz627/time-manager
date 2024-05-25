"use client";
import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { openSans } from "./font";

export const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
    allVariants: {
      letterSpacing: 1,
    },
    h1: {
      fontSize: "4.5rem",
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
      color: grey[800],
    },
    h2: {
      fontSize: "3.75rem",
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      color: grey[800],
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: "0em",
      color: grey[800],
    },
    h4: {
      fontSize: "2.125rem",
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      color: grey[900],
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: "0em",
      color: grey[900],
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
      color: grey[500],
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
      color: grey[600],
    },
    subtitle2: {
      fontSize: "0.95rem",
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
      color: grey[500],
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
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
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "16px!important",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 8,
          ":hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
