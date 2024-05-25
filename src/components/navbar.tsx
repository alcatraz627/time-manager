import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { AppLogo } from "./logo";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, zIndex: 100 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // TODO: Link this
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>

          <AppLogo />
          <Button LinkComponent={Link} href="logs" color="inherit">
            Logs
          </Button>
          <Button LinkComponent={Link} href="settings" color="inherit">
            Settings
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
