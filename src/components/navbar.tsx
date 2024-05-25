import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1 }}
            href={"/"}
          >
            Time Manager
          </Typography>
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
