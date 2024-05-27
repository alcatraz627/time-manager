import { Typography } from "@mui/material";
import Link from "next/link";

export const AppLogo = () => (
  <Typography
    variant="h6"
    component={Link}
    sx={{ flexGrow: 1 }}
    href="/dashboard"
    color="white"
  >
    Time Manager
  </Typography>
);
