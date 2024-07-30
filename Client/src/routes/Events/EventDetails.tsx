import { Box, Container, colors } from '@mui/material';
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
    const getPrevious = useLocation();
    console.log(getPrevious.state.id);
    const { data: fetchEvent } = useQuery({
        queryKey: ['conditionedEvents'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/events/details',
                {
                    id: getPrevious.state.id,
                    //     title: getPrevious.state.title,
                    //     location: getPrevious.state.location,
                    //     date: getPrevious.state.date,

                    //     // title?: string;
                    //     // description?: string;
                    //     // location?: string;
                    //     // date?: string;
                    //     // price?: number;
                    //     // createdAt?: string;
                    //     // updatedAt?: string;
                }
            );
            return response.data; // Assuming response.data is an array of events
        },
    });

    console.log(fetchEvent);

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
                    }}
                >
                    <h1>{fetchEvent.title}</h1>
                    <p className={styles.p}>{fetchEvent.description}</p>
                    <h3>Location: {fetchEvent.location}</h3>
                    <h3>Date: {fetchEvent.date}</h3>
                    <h3>
                        Price:{' '}
                        {fetchEvent.price == 0
                            ? 'Free'
                            : `$${fetchEvent.price}`}
                    </h3>
                </div>
            </Box>
        </Stack>
    );
}
