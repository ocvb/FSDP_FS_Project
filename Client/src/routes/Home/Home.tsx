import { Box, Container, colors } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import images from '@/assets/Home/home-bg.jpeg';
import bg2 from '@/assets/Home/home-bg2.png';

import styles from './css/Home.module.css';

// component
import CustomButton from '@components/Button/CustomButton';
import Footer from '@components/Footer/Footer';
import { useQuery } from '@tanstack/react-query';
import Carousel from 'react-material-ui-carousel';

interface EventDataResponse {
    title: string;
    description: string;
    location: string;
    date: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export default function Home() {
    const navigate = useNavigate();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const limitDescriptionLength = 320;

    const {
        data: eventData,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const r = await axios.get<EventDataResponse[]>(
                'http://localhost:3001/api/events'
            );
            return r.data;
        },
    });

    const navigateToEvents = () => {
        navigate('/events');
    };

    return (
        <>
            <div style={{ position: 'relative' }} className={styles.home}>
                <div className={styles.header}>
                    <Carousel
                        className={styles.carousel}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            top: 0,
                        }}
                        autoPlay={true}
                        animation='slide'
                        NextIcon={<NavigateNext />}
                        PrevIcon={
                            <NavigateNext sx={{ transform: 'scale(-1, -1)' }} />
                        }
                    >
                        <img src={images} className={styles.img}></img>
                        <img src={bg2} className={styles.img}></img>
                    </Carousel>
                    <div
                        className={styles.header_details}
                        style={{ zIndex: '2' }}
                    >
                        {/* <h1 className={styles.h1}>W</h1> */}
                        <Box>
                            <h1>
                                Welcome,
                                <br />
                                We are People&apos;s project community!
                            </h1>
                            <h2 style={{ fontWeight: 500 }}>
                                Where you can join events & meet new faces!
                            </h2>
                        </Box>
                        <CustomButton
                            type='button'
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
                                fontWeight: 500,
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
                            {isError && <p>Currently theres no events</p>}
                            {isFetching && (
                                <p style={{ fontSize: '1rem' }}>Loading...</p>
                            )}
                            {!isError &&
                                eventData?.slice(0, 3).map((item, index) => (
                                    <div className={styles.col} key={index}>
                                        <div>
                                            <h3 className={styles.h3}>
                                                {item.title}
                                            </h3>
                                            <p className={styles.p}>
                                                {item.description
                                                    .slice(
                                                        0,
                                                        limitDescriptionLength
                                                    )
                                                    .trim() + '...'}
                                            </p>
                                        </div>
                                        <p className={styles.dateText}>
                                            {item.date}
                                        </p>
                                    </div>
                                ))}
                        </div>
                        <CustomButton
                            type='button'
                            text='View Events →'
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
