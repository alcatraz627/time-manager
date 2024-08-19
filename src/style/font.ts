import { Comfortaa, Nunito } from "next/font/google";

export const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
});

export const comfortaa = Comfortaa({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
});

export const titleFont = comfortaa;
export const textFont = nunito;
