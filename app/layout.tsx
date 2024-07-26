import { prisma } from "@/db/client";
import { AppBreadcrumbs } from "@/src/components/app-breadcrumbs";
import { Navbar } from "@/src/components/navbar";
import "@/src/style/globals.css";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { textFont } from "../src/style/font";
import { theme } from "../src/style/theme";
import { ContextProvider } from "../src/utils/context";

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

export const AppBarHeight = 48;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const firstUser = await prisma.user.findFirst();

  if (!firstUser) {
    return <Box>No users found. Implement sign up.</Box>;
  }

  return (
    <html lang="en">
      <body className={textFont.className}>
        <ContextProvider value={{ user: firstUser }}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              <Container
                sx={{
                  height: `calc(100vh - ${AppBarHeight}px)`,
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <AppBreadcrumbs />
                {children}
              </Container>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
