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

import styles from './css/Events.module.css';

// component
import CustomButton from '@components/Button/CustomButton';
import Footer from '@components/Footer/Footer';
import { useEffect, useState, } from 'react';

export default function EventDetails() {
    const [eventDetails, setEventDetails] = useState([]);
    const getPrevious = useLocation();
    const fetchEvent = useQuery({
        queryKey: ['conditionedEvents'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/events/',
                // {
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
                // }
            );
            return response.data; // Assuming response.data is an array of events
        },
    });
    useEffect(() => {
        if (fetchEvent.data) {
            setEventDetails(fetchEvent.data); // Update searchedEvents state with fetched data
        }
    }, [fetchEvent.data]);

    console.log(eventDetails)

    return (
        <Box>
            {eventDetails.map((item, index) => (
                <div key={index} className={styles.row}>
                    <p className={styles.p}>{item.title}</p>
                    <p className={styles.p}>{item.description}</p>
                    <p className={styles.p}>{item.location}</p>
                    <p className={styles.p}>{item.date}</p>
                    <p className={styles.p}>{item.price}</p>
                    <p className={styles.p}>{item.createdAt}</p>
                    <p className={styles.p}>{item.updatedAt}</p>
                </div>
            ))}
        </Box>
    );
}
