import React, { useState, useEffect } from 'react';
import styles from './css/EventsSearch.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EventsSearch() {
    interface EventDataResponse {
        title?: string;
        description?: string;
        location?: string;
        date?: string;
        price?: number;
        createdAt?: string;
        updatedAt?: string;
    }

    const [searchedEvents, setSearchedEvents] = useState([]);
    const getPrevious = useLocation();
    const navigate = useNavigate();
    // const [eventData, setEventData] = useState({
    //     title: '',
    //     description: '',
    //     location: '',
    //     date: '',
    //     price: 0,
    //     createdAt: '',
    //     updatedAt: '',
    // } as EventDataResponse);

    const fetchEvents = useQuery({
        queryKey: ['conditionedEvents'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/events/search/',
                {
                    title: getPrevious.state.what,
                    location: getPrevious.state.where,
                    date: getPrevious.state.when,
                }
            );
            return response.data; // Assuming response.data is an array of events
        },
    });

    // const selectEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEventData({
    //         title: e.target.name == 'title' ? e.target.value : eventData.title,
    //         description:
    //             e.target.name == 'description'
    //                 ? e.target.value
    //                 : eventData.description,
    //         location:
    //             e.target.name == 'location'
    //                 ? e.target.value
    //                 : eventData.location,
    //         date: e.target.name == 'date' ? e.target.value : eventData.date,
    //         price:
    //             e.target.name == 'price'
    //                 ? e.target.valueAsNumber
    //                 : eventData.price,
    //         createdAt:
    //             e.target.name == 'createdAt'
    //                 ? e.target.value
    //                 : eventData.createdAt,
    //         updatedAt:
    //             e.target.name == 'updatedAt'
    //                 ? e.target.value
    //                 : eventData.updatedAt,
    //     });

    //     navigate('details', { state: eventData });
    // };

    useEffect(() => {
        if (fetchEvents.data) {
            setSearchedEvents(fetchEvents.data); // Update searchedEvents state with fetched data
        }
    }, [fetchEvents.data]);

    // Count the number of events found
    const numEventsFound = searchedEvents.length;

    return (
        <Box>
            <p className={styles.header2}>
                {numEventsFound > 0 ? `${numEventsFound} Results Found` : ''}
            </p>
            {numEventsFound < 1 ? (
                <p className={styles.header2}>
                    Sorry no events found that match those search conditions!
                </p>
            ) : (
                searchedEvents.map((item, index) => (
                    <div key={index} className={styles.row}>
                        <Button
                            className={styles.eventButton}
                            onClick={() =>
                                navigate('/events/details/', {
                                    state: { id: item.id },
                                })
                            }
                        >
                            <p className={styles.p}>{item.title}</p>
                        </Button>
                    </div>
                ))
            )}
        </Box>
    );
}
