import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UseAuth } from '@contexts/Auth';
import { Box, TextField, useTheme } from '@mui/material';
import PasswordVisibility from '@components/PasswordVIsibility/PasswordVisibility';
import Button from '@components/Button/CustomButton';

import './css/Profile.module.css';
import './css/UserProfile.module.css';
import { useMutation } from '@tanstack/react-query';
import { UsersDataResponse } from '@api/ApiType';
import { callAPI } from '@api/EndpointsQueries';

export default function UserProfile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(0);

    interface MessageProps {
        message?: string;
        error?: string;
    }
    const [Message, setMessage] = useState<MessageProps>({
        message: 'Save' ?? '',
        error: '',
    });
    const { fetchAuth, checkTokenIsValid } = UseAuth();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setUsername(fetchAuth.User.username ?? '');
        setUserId(fetchAuth.User.id ?? 0);
    }, [fetchAuth.User]);

    const handleUsernameChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    // Update user information
    interface DataResponses extends UsersDataResponse {
        modifiedData?: {
            username: string;
            password: string;
        };
    }

    const userMutation = useMutation({
        mutationFn: async (data: DataResponses['data']) => {
            const r = await callAPI.put<DataResponses>(
                `/user/update/${userId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return r.data;
        },
    });

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setSuccess(false);

        if (password.length > 0 && password.length < 6) {
            setMessage(() => ({
                error: 'Password must be at least 6 characters',
            }));
            return;
        }

        const userData = {
            username: username,
            password: password,
        } as DataResponses['modifiedData'];

        // Trigger the mutation
        userMutation.mutate(userData, {
            onSuccess: (data) => {
                // Handle success response
                // console.log('Updated Data', data);
                setPassword('');
                setSuccess(true);
                checkTokenIsValid(data?.token ?? '')
                    .then(() => {
                        return;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // Visual feedback
                let timeoutId = null;
                timeoutId = setTimeout(() => {
                    setMessage(() => ({
                        message: 'Your information has updated',
                    }));
                }, 800);
                return () => clearTimeout(timeoutId);
            },
            onError: () => {
                // Handle error response
                setMessage(() => ({
                    error: 'Error updating user information',
                }));
                setSuccess(false);
            },
        });
    };

    return (
        <>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    padding: '1rem',
                    width: '100%',
                }}
            >
                <form
                    onSubmit={onSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: '100%',
                    }}
                >
                    <div>
                        <p>Username</p>
                        <TextField
                            value={username}
                            onChange={handleUsernameChange}
                            sx={{
                                width: '100%',
                                input: {
                                    padding: '0.5rem',
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                },
                            }}
                        />
                    </div>
                    <div>
                        <p>Password</p>
                        <PasswordVisibility
                            variant={'outlined'}
                            handlePassword={handlePasswordChange}
                            sx={{
                                width: '100%',
                            }}
                        />
                    </div>

                    <Button
                        text={Message.message ?? 'Save'}
                        type='submit'
                        sx={{
                            fontSize: '0.8rem',
                            display: 'inline-flex',
                            borderRadius: '10px',
                            width: '100%',
                            backgroundColor: 'black',
                            padding: '0.3rem 1rem',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'black',
                                color: 'white',
                            },
                        }}
                    />
                    <p
                        style={{
                            color: 'red',
                            fontSize: '1rem',
                            textAlign: 'center',
                        }}
                    >
                        {Message.error}
                    </p>
                </form>
            </Box>
        </>
    );
}
