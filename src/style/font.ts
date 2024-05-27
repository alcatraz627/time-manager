import { Comfortaa, Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const montserrat = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const titleFont = montserrat;
export const textFont = nunito;
