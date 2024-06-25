import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
import { Container, colors } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

import images from "../../assets/Events/event-bg.jpg";

import styles from "./css/Events.module.css";

// component
import CustomButton from "../../components/Button/CustomButton.module";
import Footer from "../../components/Footer/Footer.module";
import { idID } from "@mui/material/locale";

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(0);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const itemsPerSlide = 3;

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
  var nullEvents = "";
  if (events == "") {
    nullEvents = "There are currently no up-coming events.";
  }
  return (
    <>
      <div styles="position: relative;">
        <div className={styles.header}>
          <img src={images} className={styles.img}></img>
          <div className={styles.header_details}>
            <p className={styles.p}>Welcome to the events page!</p>
            <p className={styles.p}>Find out about our events here!</p>
            <CustomButton
              text="Search"
              onClick={() => navigate("/events-search")}
              sx={{
                display: "inline-flex",
                marginTop: "10px",
                borderRadius: "50px",
                width: "fit-content",
                boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
                padding: "0.7rem 2rem",
                color: "black",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: colors.grey[300],
                },
              }}
            />
          </div>
        </div>
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <div className={styles.tile}>
            <div className={styles.header2}>Up-Coming Events & Facilities</div>
            <p className={styles.p}>{nullEvents}</p>
            <div className={styles.row}>
              <Carousel
                itemsPerSlide={itemsPerSlide}
                autoPlay={false}
                animation="slide"
                indicatorIconButtonProps={{
                  style: {
                    padding: "5px", // 1
                  },
                }}
                indicatorContainerProps={{
                  style: {
                    marginTop: "10px",
                  },
                }}
              >
                <div className={styles.carouselItems}>
                  {events &&
                    events.slice(0, 3).map((item, index) => (
                      <div className={styles.carcol} key={index}>
                        <div>
                          <h3 className={styles.h3}>{item.title}</h3>
                          <p className={styles.p}>{item.description}</p>
                        </div>
                        <p className={styles.dateText}>{item.date}</p>
                      </div>
                    ))}
                </div>
                <div className={styles.carouselItems}>
                  {events &&
                    events.slice(3, 6).map((item, index) => (
                      <div className={styles.carcol} key={index}>
                        <div>
                          <h3 className={styles.h3}>{item.title}</h3>
                          <p className={styles.p}>{item.description}</p>
                        </div>
                        <p className={styles.dateText}>{item.date}</p>
                      </div>
                    ))}
                </div>
                <div className={styles.carouselItems}>
                  {events &&
                    events.slice(6, 9).map((item, index) => (
                      <div className={styles.carcol} key={index}>
                        <div>
                          <h3 className={styles.h3}>{item.title}</h3>
                          <p className={styles.p}>{item.description}</p>
                        </div>
                        <p className={styles.dateText}>{item.date}</p>
                      </div>
                    ))}
                </div>
              </Carousel>
            </div>
            <a href="#target-element">
              <CustomButton
                text="more Events →"
                href="#events"
                sx={{
                  display: "inline-flex",
                  borderRadius: "50px",
                  width: "fit-content",
                  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
                  padding: "0.5rem 2rem",
                  color: "black",
                }}
              />
            </a>
          </div>
        </Container>

        <Container
          id="target-element"
          maxWidth={false}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <div className={styles.header2}>Events</div>
          <Container
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: matches ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              gap: "1rem",
            }}
          >
            <div className={styles.row}>
              {events &&
                events.slice(0, 3).map((item, index) => (
                  <div className={styles.col} key={index}>
                    <div>
                      <h3 className={styles.h3}>{item.title}</h3>
                      <p className={styles.p}>{item.description}</p>
                    </div>
                    <p className={styles.dateText}>{item.date}</p>
                  </div>
                ))}
            </div>
          </Container>
        </Container>

        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Container
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: matches ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              gap: "1rem",
            }}
          >
            <div className={styles.row}>
              {events &&
                events.slice(0, 3).map((item, index) => (
                  <div className={styles.col} key={index}>
                    <div>
                      <h3 className={styles.h3}>{item.title}</h3>
                      <p className={styles.p}>{item.description}</p>
                    </div>
                    <p className={styles.dateText}>{item.date}</p>
                  </div>
                ))}
            </div>
          </Container>
        </Container>
      </div>

      <Footer />
    </>
  );
}
