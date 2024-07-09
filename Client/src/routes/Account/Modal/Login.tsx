import React, { useState } from 'react';
import { To, useNavigate } from 'react-router-dom';

import { UseAuth } from '@components/Auth/Auth';
import Button from '@components/Button/CustomButton';
import PasswordVisibility from '@components/PasswordVIsibility/PasswordVisibility';
import { TextField, colors } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { CircularProgress } from '@mui/material';

import styles from './css/Modals.module.css';

interface LoginProps {
    passToChangeModal: any;
}

export default function Login({ passToChangeModal }: LoginProps) {
    const pressedRegister = () => {
        // Reset before changing
        setUsername('');
        setPassword('');
        setMessage('');

        // Change to register modal
        passToChangeModal({
            register: true,
        });
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginStatus, setloginStatus] = useState(false);
    const navigate = useNavigate();
    const { login } = UseAuth();

    const checkLogin = async () => {
        if (username == '' || password == '') {
            setMessage('Please fill in all fields');
            setloginStatus(false);
            return;
        }

        await login({ username, password })
            .then((value) => {
                if (value.result == true) {
                    setloginStatus(true);
                    setMessage('Logging in...');
                    setTimeout(() => {
                        return navigate(value.path, {
                            replace: true,
                        });
                    }, 1000);
                } else {
                    setloginStatus(false);
                    setMessage('Invalid username or password');
                }
            })
            .catch((error: any) => {
                console.log(error);
                setloginStatus(false);
                setMessage('Invalid username or password');
            });
    };

    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        checkLogin();
    };

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

    const InputStyle = {
        width: '100%',
        margin: '0.5rem 0',
        color: 'black',
        backgroundColor: 'white',
        fontSize: '1.6rem',
        '&::after': {
            borderColor: colors.grey[700],
        },
        '& .MuiInputBase-input': {
            '&::placeholder': {
                color: colors.grey[800],
            },
        },
    };

    return (
        <form onSubmit={onSubmit} className={styles.modal}>
            <TextField
                sx={InputStyle}
                type='text'
                label='Username'
                variant='standard'
                value={username}
                onChange={handleUsernameChange}
                autoFocus={true}
            />
            <PasswordVisibility
                sx={InputStyle}
                label='Password'
                password={password}
                handlePassword={handlePasswordChange}
            />

            <div
                className={styles.buttonsContainer}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '100%',
                }}
            >
                <Button
                    text={loginStatus ? message : 'login'}
                    type='submit'
                    startIcon={
                        loginStatus ? (
                            <CircularProgress size={20} />
                        ) : (
                            <LoginIcon />
                        )
                    }
                    sx={{
                        borderRadius: '10px',
                        backgroundColor: 'black',
                        padding: '0.5rem 2rem',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(0, 0, 0, 0.85)',
                        },
                    }}
                />
                <p
                    style={{
                        color: colors.grey[700],
                        fontSize: '1rem',
                        marginTop: '1rem',
                        textAlign: 'center',
                    }}
                >
                    Don't have an account?{' '}
                    <span className={styles.link} onMouseDown={pressedRegister}>
                        Register
                    </span>
                </p>
            </div>
            <p style={{ color: 'red', fontSize: '1rem' }}>
                {!loginStatus ? message : ''}
            </p>
        </form>
    );
}
