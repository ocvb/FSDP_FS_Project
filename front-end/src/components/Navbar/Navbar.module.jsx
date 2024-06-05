import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import styles from "./css/Navbar.module.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function navbar(props) {
  return (
    <>
      <AppBar position="fixed" className={styles.navbar}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          {navigation.map((item, index) => (
            <Button color="inherit" key={index} href={item.href}>
              {item.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
}
