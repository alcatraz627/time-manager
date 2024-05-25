"use client";
import { AppLogo } from "@/src/components/logo";
import { Box, Divider, Drawer, Toolbar } from "@mui/material";
import { useState } from "react";

const DrawerWidth = 240;

export const DrawerContainer = ({ children }: { children: JSX.Element }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box zIndex={-1}>
      <Toolbar sx={{ bgcolor: "primary.main" }}>
        <AppLogo />
      </Toolbar>
      <Divider />
      {children}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DrawerWidth }, flexShrink: { sm: 0 }, zIndex: 1 }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="persistent"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DrawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DrawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
