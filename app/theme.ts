"use client";
import { createTheme } from "@mui/material/styles";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
});
