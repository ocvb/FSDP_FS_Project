import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
import { Container } from "@mui/material";

import images from "../../assets/Home/home-bg.png";

import styles from "./css/Home.module.css";

export default function Home() {
  return (
    <>
      <div styles="position: relative;">
        <div className={styles.header}>
          <img src={images} className={styles.img}></img>
          <div className={styles.header_details}>
            {/* <h1 className={styles.h1}>W</h1> */}
            <p className={styles.p}>
              Hello
            </p>
            <p className={styles.p}>
              Welcome to our Community website
            </p>
            <p className={styles.p}>
              Where you can join events & meet new faces!
            </p>
          </div>
        </div>

        <div className={styles.container}>
          <h1 className={styles.h1}>Welcome eeto the Home Page</h1>
          <p className={styles.p}>
            This is a simple home page for the front-end of the project.
          </p>
        </div>
      </div>
    </>
  );
}
