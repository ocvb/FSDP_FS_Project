import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Input, colors, styled } from "@mui/material";

import styles from "./css/Account.module.css";

import CustomButton from "../../components/Button/CustomButton.module";

import bgImage from "../../assets/Account/login-bg.jpg";

export default function Account() {
    const [User, setUser] = useState(0);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const postData = async () => {
        try {
            if (!User) {
                const response = await axios.post("http://localhost:3001/api/login", {
                    username: username,
                    password: password
                });

                console.log("Login data sent");
                console.log(response.data); // Debugging

                if (response.data['status'] === 'success') {
                    console.log("Login successful");
                    setUser(response.data['data']);
                } else {
                    console.log("Login failed");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    const onLogin = () => {
        setUsername('');
        setPassword('');
        postData();
    };

    const InputStyle = {
        width: "90%",
        margin: "0.5rem 0",
        color: "black",
        backgroundColor: "white",
        fontSize: "1.2rem",
        fontFamily: "Lato",
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
        <div style={{ position: 'relative' }}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 !important',
            }}>
                <div className={styles.container}>
                    <div className={styles.bg}>
                        <img src={bgImage}></img>
                    </div>
                    <div className={styles.login}>
                        <div className={styles.loginContainer}>
                            <p>Login</p>
                            <Input sx={InputStyle} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                            <Input sx={InputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                            <CustomButton text="Login" onClick={onLogin} sx={{
                                display: "inline-flex",
                                borderRadius: "10px",
                                width: "90%",
                                backgroundColor: "black",
                                padding: "0.5rem 2rem",
                                color: "white",
                                '&:hover': {
                                    backgroundColor: colors.grey[900],
                                },
                            }} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}