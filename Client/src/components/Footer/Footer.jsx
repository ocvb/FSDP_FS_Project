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
                    gap: '0.5rem',
                }}>
                    <img src={logo} className={styles.logo} style={{
                        width: "70px",
                        height: "70px",
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
            <p className={styles.footer_text} style={{
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                © 2024 People's Project. All rights reserved.
                {/* // heartshape logo */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{ fill: 'white' }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 16.16 2 13.27 2 9.5 2 7.5 3.5 6 5.5 6c1.34 0 2.61.99 3 2.36C8.89 6.99 10.16 6 11.5 6 13.5 6 15 7.5 15 9.5c0 3.77-3.4 6.66-8.55 10.54L12 21.35z" />
                </svg>
            </p>
        </Container >
    );

}