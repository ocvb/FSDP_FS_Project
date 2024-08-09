import { Box, Container, colors, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';

import images from '@assets/Events/event-bg.jpg';

import styles from './css/EventDetails.module.css';

// component
import CustomButton from '@components/Button/CustomButton';
import PopupModal from '@components/PopupModal/PopupModal';
import Footer from '@components/Footer/Footer';
import { useEffect, useState } from 'react';
import { alignProperty } from '@mui/material/styles/cssUtils';
import {
    DisplaySettings,
    Margin,
    Padding,
    Start,
    WidthFull,
} from '@mui/icons-material';

export default function EventDetails() {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const getPrevious = useLocation();
    console.log(getPrevious.state.id);
    const handleSignUp = () => {
        setIsSignedUp(true);
    };
    const { data: signUp } = useQuery({
        queryKey: ['signedupEvent'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/events/details',
            );
        }

    });
    const { data: fetchEvent } = useQuery({
        queryKey: ['conditionedEvents'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/events/details',
                {
                    id: getPrevious.state.id,
                }
            );
            return response.data;
        },
    });

    // const { data: fetchUser } = useQuery({
    //     queryKey: ['conditionedEvents'],
    //     queryFn: async () => {
    //         const response = await axios.post(
    //             'http://localhost:3001/api/events/signup',
    //             {
    //                 uuid: getPrevious.state.uuid,
    //             }
    //         );
    //         return response.data;
    //     },
    // });

    return (
        <Stack flexDirection={'row'} className='eventdetail'>
            <Box className={styles.row}>
                <div
                    className={styles.col}
                    style={{
                        padding: '20px',
                        width: 'fit-content',
                        margin: '40px',
                        marginLeft: '170px',
                        marginRight: '170px',
                        alignItems: 'end',
                        gap: '20px',
                    }}
                >
                    <Stack alignItems={'start'} style={{ margin: '20px' }}>
                        <h1>{fetchEvent.title}</h1>
                        <p className={styles.p}>{fetchEvent.description}</p>
                        <h3 style={{ marginTop: '20px' }}>
                            Location: {fetchEvent.location}
                        </h3>
                        <h3>Date: {fetchEvent.date}</h3>
                        <h3>
                            Price:{' '}
                            {fetchEvent.price == 0
                                ? 'Free'
                                : `$${fetchEvent.price}`}
                        </h3>
                    </Stack>
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: '#fd4444',
                            borderRadius: '20px',
                            width: '10%',
                        }}
                        onClick={() => {
                            handleSignUp();
                        }}
                    >
                        {isSignedUp ? 'Signed Up' : 'Sign Up'}
                    </Button>
                    <p>
                        {isSignedUp
                            ? `${fetchEvent.title} is now registered into your account`
                            : ''}
                    </p>
                </div>
            </Box>
        </Stack>
    );
}
