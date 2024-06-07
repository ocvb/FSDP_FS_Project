import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import styles from "./css/Navbar.module.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Courses", href: "/courses" },
  { name: "Rewards", href: "/rewards" },
  { name: "FAQ", href: "/faq" },
  { name: "Account", href: "/account" },
];

export default function navbar(props) {
  return (
    <>
      <AppBar position="fixed" className={styles.navbar} >
        <Toolbar className={styles.toolbar}>
          <div style={{ flexGrow: 1 }}>
            <img src={props.imgUrl} width={"45px"} />
          </div>
          {/* <Typography style={{ flexGrow: 1}} className={styles.fontLato}>
          </Typography> */}
          {navigation.map((item, index) => (
            <div className={styles.buttonWrapper} key={index}>
              <Button color="inherit" key={index} href={item.href} className={styles.fontLato} >
                {item.name}
              </Button>
            </div>
          ))}
          <div style={{ flexGrow: 1 }}></div>
        </Toolbar>
      </AppBar>
    </>
  );
}
