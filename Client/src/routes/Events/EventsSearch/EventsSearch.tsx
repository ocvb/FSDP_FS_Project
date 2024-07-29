import React, { useState, useEffect } from 'react';
import styles from './css/EventsSearch.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function EventsSearch() {
    const [searchedEvents, setSearchedEvents] = useState([]);

    const getPrevious = useLocation();

    const fetchEvents = useQuery({
        queryKey: ['conditionedEvents'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/search/',
                {
                    title: getPrevious.state.what,
                    location: getPrevious.state.where,
                    date: getPrevious.state.when,
                }
            );
            return response.data; // Assuming response.data is an array of events
        },
    });

    useEffect(() => {
        if (fetchEvents.data) {
            setSearchedEvents(fetchEvents.data); // Update searchedEvents state with fetched data
        }
    }, [fetchEvents.data]);

    // Count the number of events found
    const numEventsFound = searchedEvents.length;

    return (
        <Box>
            <p className={styles.header2}>{numEventsFound} Results Found</p>
            {searchedEvents.map((item, index) => (
                <div key={index} className={styles.row}>
                    <p className={styles.p}>{item.title}</p>
                </div>
            ))}
        </Box>
    );
}
