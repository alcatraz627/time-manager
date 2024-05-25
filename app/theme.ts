"use client";
import { createTheme } from "@mui/material/styles";
import { openSans } from "./init";

export const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
});
