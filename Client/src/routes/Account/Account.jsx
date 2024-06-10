import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// Components
import { Container, Input, colors, styled } from "@mui/material";
import styles from "./css/Account.module.css";
import CustomButton from "../../components/Button/CustomButton.module";
import bgImage from "../../assets/Account/login-bg.jpg";


export default function Account() {
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const [User, setUser] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const checkLogin = async () => {
        try {
            if (!User) {
                const response = await axios.post("http://localhost:3001/api/login", {
                    username: username,
                    password: password
                });
                console.log(response.data); // Debugging

                if (response.data['status'] === 'success') {
                    setMessage("Logging in...");
                    setUser(response.data['data']);
                    // setCookie("user", response.data['uuid'], { path: '/' });
                } else {
                    setUser(null); // Reset user state (if login fails
                    setMessage("Invalid username or password");
                    setUsername('');
                    setPassword('');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (User) {
                // Redirect to profile page
                navigate("/account/profile", { state: { user: User } });
            }
        }, 1000);
    }, [User]);

    const onSubmit = (event) => {
        event.preventDefault();

        // Logic to check if username and password are empty
        if (username == "" || password == "") {
            setMessage("Please fill in all fields");
            return;
        }

        checkLogin();

    }

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
                            <form onSubmit={onSubmit}>
                                <Input sx={InputStyle} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                                <Input sx={InputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                                <CustomButton text={User != null ? message : "login"} type='submit' sx={{
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
                                <p style={{ color: "red", fontSize: "1rem" }}>{User == null ? message : ''}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}