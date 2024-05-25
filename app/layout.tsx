import { Navbar } from "@/src/components/navbar";
import "@/src/style/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { openSans } from "../src/style/font";
import { theme } from "../src/style/theme";

export const metadata: Metadata = {
  title: "Time Manager",
  description: "Coming Soon",
  icons: [
    {
      url: "/favicon.svg",
      rel: "icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Container sx={{ py: 2 }}>{children}</Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
