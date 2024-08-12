import { Box } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';

import styles from './css/EventDetails.module.css';

import Button from '@components/Button/CustomButton';

// component
import { useEffect, useState } from 'react';
import { callAPI } from '@api/EndpointsQueries';
import { UseAuth } from '@contexts/Auth';

interface StatusMessageProps {
    message?: string;
    error?: string;
    success?: boolean;
    registered?: boolean;
}

export default function EventDetails() {
    const getPrevious = useLocation();
    // console.log(getPrevious.state.id);

    const { fetchAuth } = UseAuth();

    const [statusMessage, setStatusMessage] = useState<StatusMessageProps>({
        message: '',
        error: '',
        success: false,
        registered: false,
    });

    const handleSignup = async () => {
        const response = await callAPI.post(
            '/events/signup',
            {
                eventId: getPrevious.state.id,
                userId: fetchAuth.User.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${fetchAuth.AccessToken}`,
                },
            }
        );

        if (response.data.code == 1100) {
            return setStatusMessage(() => ({
                message: 'Successfully signed up for event',
                success: true,
            }));
        } else {
            return setStatusMessage(() => ({
                // error: 'Failed to sign up for event, please try again later...',
                error:
                    response.data.code == 1110
                        ? response.data.message
                        : 'Theres an error, please try again later...',
                registered: response.data.code == 1110,
            }));
        }
    };

    const { data: fetchEvent } = useQuery({
        queryKey: ['conditionedEvents'],
        queryFn: async () => {
            const response = await callAPI.post('/events/details', {
                id: getPrevious.state.id,
            });
            return response.data;
        },
    });

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
                        type='submit'
                        text={
                            fetchAuth.isAuthenticated == true
                                ? 'Sign Up'
                                : 'Login to Sign Up'
                        }
                        sx={{
                            fontSize: '1.1rem',
                            color: 'white',
                            backgroundColor: '#fd4444',
                            borderRadius: '20px',

                            padding: '0.8rem 1.4rem',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: '#ea3939',
                            },

                            '&:disabled': {
                                filter: 'opacity(0.7)',
                                backgroundColor: '#b63535',
                                color: 'white',
                            },
                        }}
                        onClick={() => {
                            handleSignup().catch((error) => {
                                console.error(error);
                            });
                        }}
                        disabled={
                            fetchAuth.isAuthenticated != true ||
                            statusMessage.registered == true ||
                            statusMessage.success == true
                                ? true
                                : false
                        }
                    />

                    <p>
                        {statusMessage.success == true
                            ? statusMessage.message
                            : statusMessage.error}
                    </p>
                </div>
            </Box>
        </Stack>
    );
}
