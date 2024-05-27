"use client";
import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppBreadcrumbs = () => {
  const pathname = usePathname().slice(1).split("/");

  return (
    <Box>
      <Breadcrumbs
        sx={{
          "& [class$='-separator']": { mx: 0 },
        }}
        separator={<NavigateNext fontSize="small" />}
      >
        <Button variant="text" LinkComponent={Link} href="/">
          Home
        </Button>
        {pathname.map((path, idx) => (
          <Button
            size="small"
            variant="text"
            LinkComponent={Link}
            href={"/" + pathname.slice(0, idx + 1).join("/")}
            key={path}
          >
            {path}
          </Button>
        ))}
      </Breadcrumbs>
    </Box>
  );
};
