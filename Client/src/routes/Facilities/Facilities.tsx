import React, { useEffect, useState } from 'react';
import { Container, colors } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import styles from './css/facilities.module.css';

export default function Facilities() {
    const [facilities, setFacilities] = useState([]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const { data: facilityData, refetch } = useQuery({
        queryKey: ['facilities'],
        queryFn: async () => {
            const r = await axios.get<FacilityDataResponse[]>(
                'http://localhost:3001/api/facilities'
            );
            return r.data;
        },
    });

    interface FacilityDataResponse {
        title?: string;
        description?: string;
        price?: number;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!facilities) {
                    const response = await axios.get(
                        'http://localhost:3001/api/facilities'
                    );
                    console.log('Data fetched successfully');
                    setFacilities(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [facilities]);

    return (
        <>
            <Container
                id='target-element'
                maxWidth={false}
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <div className={styles.header2}>Facilities</div>
                <Container
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: matches ? 'column' : 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        gap: '1rem',
                    }}
                >
                    <div className={styles.row}>
                        {facilityData?.slice(0, 3).map((item, index) => (
                            <div className={styles.col} key={index}>
                                <div>
                                    <h3 className={styles.h3}>{item.title}</h3>
                                    <p className={styles.p}>
                                        {item.description.slice(0, 250).trim() +
                                            '...'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Container>
        </>
    );
}
