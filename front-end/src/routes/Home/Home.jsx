import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
import { Container } from "@mui/material";
import axios from "axios";

import images from "../../assets/Home/home-bg.webp";

import styles from "./css/Home.module.css";

export default function Home() {
  const [events, setEvents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!events) {
          const response = await axios.get("http://localhost:3001/api/events");
          console.log("Data fetched successfully");
          setEvents(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [events]);


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

        <Container style={{ padding: '2rem' }}>
          <div className={styles.eventsF}>
            <h2 className={styles.h2}>Up-Coming Events & Facilities</h2>
            <div className={styles.row}>
              {events && events.slice(0, 3).map((item, index) => (
                <div className={styles.col} key={index}>
                  <div>
                    <h3 className={styles.h3}>{item.title}</h3>
                    <p className={styles.p}>
                      {item.description}
                    </p>
                  </div>
                  <p className={styles.dateText}>
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>

        <div className={styles.container}>
          <Container>
            <h2 className={styles.h2}>About Us</h2>
            <p className={styles.p}>
              We are a community of people who love to meet new faces and share
              experiences. Our goal is to bring people together and create
              memories that will last a lifetime. Join us today and become a
              part of our community!
            </p>
          </Container>
        </div>
      </div>
    </>
  );
}
