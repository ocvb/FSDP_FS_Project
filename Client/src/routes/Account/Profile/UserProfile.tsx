import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UseAuth } from '@components/Auth/Auth';
import { TextField } from '@mui/material';
import PasswordVisibility from '@components/PasswordVIsibility/PasswordVisibility';
import Button from '@components/Button/CustomButton';

import mainStyles from './css/Profile.module.css';
import './css/UserProfile.module.css';

export default function UserProfile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(0);
    const [Message, setMessage] = useState('');
    const { fetchAuth, checkTokenIsValid } = UseAuth();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setUsername(fetchAuth.User?.username ?? '');
        setUserId(fetchAuth.User?.id ?? 0);
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
    const updateUser = async () => {
        let timeoutId = null;
        await axios
            .put(
                `http://localhost:3001/api/user/update/${userId}`,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setMessage('Updated');
                    setPassword('');
                    checkTokenIsValid(response.data.token);
                    setSuccess(true);
                } else {
                    setMessage('Failed to update');
                    setSuccess(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        // Visual feedback
        timeoutId = setTimeout(() => {
            setMessage('Save changes');
        }, 2000);
        return () => clearTimeout(timeoutId);
    };

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setSuccess(false);

        if (password.length > 0 && password.length < 6) {
            setMessage('Password must be at least 6 characters');
            return;
        }

        updateUser();
    };

    return (
        <>
            <div
                className={mainStyles.header}
                style={{
                    padding: '1rem',
                    backgroundColor: '#F9F9F9',
                    width: '100%',
                }}
            >
                <p>Profile</p>
            </div>
            <div
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
                    {/* <div>
                        <img src="https://via.placeholder.com/80" alt="profile" />
                    </div> */}
                    <div>
                        <p>User Name</p>
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
                        text={success ? Message : 'Save Changes'}
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
                        {!success ? Message : ''}
                    </p>
                </form>
            </div>
        </>
    );
}
