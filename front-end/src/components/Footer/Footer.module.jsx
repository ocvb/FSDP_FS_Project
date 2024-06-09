import React from "react";

import { Container } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import styles from "./css/Footer.module.css";

import logo from "../../assets/Navbar/logo.png";

export default function Footer() {
    return (
        <Container maxWidth={false} className={styles.footer} sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'black',
            color: 'white',
            padding: '20px',
            marginTop: '20px',
            gap: '1rem',
        }}>
            <Container style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                }}>
                    <img src={logo} className={styles.logo} style={{
                        width: "100px",
                        height: "100px",
                        margin: "auto",
                        display: "block",
                    }} />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '-0.5rem',

                    }}>
                        <p>
                            People's
                        </p>
                        <p>
                            Project
                        </p>
                    </div>

                </div>

                <div className={styles.nagivator}>
                    <p>People's Project</p>
                    <ul>
                        <li>Home</li>
                        <li>Events</li>
                        <li>Courses</li>
                        <li>Rewards</li>
                        <li>FAQ</li>
                        <li>Account</li>
                    </ul>
                </div>

                {/* social medias icons */}
                <div className={styles.social}>
                    <p>Follow Us</p>
                    <div className={styles.socialIcons} style={{
                        display: 'flex',
                        gap: '1rem',

                    }}>
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </div>
                </div>

            </Container>
            <p className={styles.footer_text}>
                © 2021 People's Project. All rights reserved.
            </p>
        </Container >
    );

}