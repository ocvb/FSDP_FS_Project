import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Input } from "@mui/material";

import styles from "./css/Account.module.css";

import CustomButton from "../../components/Button/CustomButton.module";

import bgImage from "../../assets/Account/login-bg.jpg";

export default function Account() {
    const [User, setUser] = useState(0);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!User) {
                    const response = await axios.get("http://localhost:3001/api/users");
                    console.log("Data fetched successfully");
                    // console.log(response.data);
                    setUser(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [User]);

    const onLogin = () => {
        setUsername('');
        setPassword('');

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
                            <Input sx={
                                {
                                    width: "90%",
                                    margin: "0.5rem 0",
                                }

                            } type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                            <Input sx={
                                {
                                    width: "90%",
                                    margin: "0.5rem 0",
                                }

                            } type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                            <CustomButton text="Login" onClick={onLogin} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}