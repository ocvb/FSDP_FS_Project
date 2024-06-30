import React, { useEffect, useState } from 'react';
import { Container, colors } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import images from '@/assets/Home/home-bg.jpeg';

import styles from './css/Home.module.css';

// component
import CustomButton from '@components/Button/CustomButton';
import Footer from '@components/Footer/Footer';

export default function Home() {
    const navigate = useNavigate();
    const [events, setEvents] = useState(0);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!events) {
                    const response = await axios.get(
                        'http://localhost:3001/api/events',
                    );
                    console.log('Data fetched successfully');
                    setEvents(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [events]);

    const navigateToEvents = () => {
        navigate('/events');
    };

    return (
        <>
            <div styles='position: relative;'>
                <div className={styles.header}>
                    <img src={images} className={styles.img}></img>
                    <div className={styles.header_details}>
                        {/* <h1 className={styles.h1}>W</h1> */}
                        <p className={styles.p}>
                            Welcome,
                            <br />
                            We are People's project community!
                        </p>
                        <p className={styles.p}>
                            Where you can join events & meet new faces!
                        </p>
                        <CustomButton
                            text='Join Us'
                            onClick={() => navigate('/account')}
                            sx={{
                                display: 'inline-flex',
                                borderRadius: '50px',
                                width: 'fit-content',
                                boxShadow:
                                    '0px 2px 6px 0px rgba(0, 0, 0, 0.15)',
                                padding: '0.4rem 2rem',
                                color: 'black',
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: colors.grey[300],
                                },
                            }}
                        />
                    </div>
                </div>

                <Container
                    maxWidth={false}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                >
                    <div className={styles.tile}>
                        <h2 className={styles.h2}>
                            Up-Coming Events & Facilities
                        </h2>
                        <div className={styles.row}>
                            {events &&
                                events.slice(0, 3).map((item, index) => (
                                    <div className={styles.col} key={index}>
                                        <div>
                                            <h3 className={styles.h3}>
                                                {item.title}
                                            </h3>
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
                        <CustomButton
                            text='more Events →'
                            onClick={navigateToEvents}
                            sx={{
                                display: 'inline-flex',
                                borderRadius: '50px',
                                width: 'fit-content',
                                boxShadow:
                                    '0px 2px 6px 0px rgba(0, 0, 0, 0.15)',
                                padding: '0.5rem 2rem',
                                color: 'black',
                            }}
                        />
                    </div>
                </Container>

                <Container
                    maxWidth={false}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    }}
                >
                    <Container
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: matches ? 'column' : 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '4rem',
                            gap: '1rem',
                        }}
                    >
                        <div className={styles.box}>
                            <p className={styles.leadingTitle}>Leading Title</p>
                            <h2 className={styles.h2}>title</h2>
                            <p className={styles.p}>
                                We are a community of people who love to meet
                                new faces and share experiences. Our goal is to
                                bring people together and create memories that
                                will last a lifetime. Join us today and become a
                                part of our community!
                            </p>
                        </div>
                        <div className={styles.imageBox}>
                            {/* placeholder image */}
                            <img
                                src='https://via.placeholder.com/500x500'
                                className={styles.img}
                            ></img>
                        </div>
                    </Container>
                </Container>

                <Container maxWidth={false} sx={{}}>
                    <Container
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: matches ? 'column' : 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '4rem',
                            gap: '1rem',
                        }}
                    >
                        <div className={styles.imageBox}>
                            {/* placeholder image */}
                            <img
                                src='https://via.placeholder.com/500x500'
                                className={styles.img}
                            ></img>
                        </div>

                        <div className={styles.box}>
                            <p className={styles.leadingTitle}>Leading Title</p>
                            <h2 className={styles.h2}>title</h2>
                            <p className={styles.p}>
                                We are a community of people who love to meet
                                new faces and share experiences. Our goal is to
                                bring people together and create memories that
                                will last a lifetime. Join us today and become a
                                part of our community!
                            </p>
                        </div>
                    </Container>
                </Container>
            </div>

            <Footer />
        </>
    );
}
