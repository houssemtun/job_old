import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideBar from "../../layout/SideBar";
import Header from "../../layout/Header";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {
  const [open, setOpen] = useState(
    window.localStorage.getItem("navbar-open") === "true"
  );

  const toggleDrawer = () => {
    setOpen(!open);
    window.localStorage.setItem("navbar-open", !open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
        window.localStorage.setItem("navbar-open", false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} toggleDrawer={toggleDrawer} />
        <SideBar toggleDrawer={toggleDrawer} open={open} />
        {props.children}
      </Box>
    </ThemeProvider>
  );
}
