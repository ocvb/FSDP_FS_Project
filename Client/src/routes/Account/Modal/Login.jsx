import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@/components/Button/CustomButton.module";
import PasswordVisibility from "@/components/PasswordVIsibility/PasswordVisibility.module";
import { TextField, colors } from "@mui/material";

import styles from "./css/Modals.module.css";

export default function Login({ passToChangeModal }) {
    const pressedRegister = () => {
        // Reset before changing
        setUsername('');
        setPassword('');
        setMessage('');
        setUser(null);

        // Change to register modal
        passToChangeModal({
            register: true
        });
    }

    const [User, setUser] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();



    useEffect(() => {
        setTimeout(() => {
            if (User) {
                // Redirect to profile page
                navigate('/account/profile', { state: { user: User } });
            }
        }, 1000);
    }, [User]);

    const checkLogin = async () => {
        try {
            if (!User) {
                const response = await axios.post("http://localhost:3001/api/user", {
                    username: username,
                    password: password
                });
                // console.log(response.data); // Debugging

                if (response.data['status'] === 'success') {
                    setMessage("Logging in...");
                    setUser(response.data['data']);
                    localStorage.setItem("user", response.data['data']['uuid']);
                    // setCookie("user", response.data['uuid'], { path: '/' });
                } else {
                    setUser(null);
                    setMessage("Invalid username or password");
                    setUsername('');
                    setPassword('');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        // Logic to check if username and password are empty
        if (username == "" || password == "") {
            setMessage("Please fill in all fields");
            return;
        }

        checkLogin();
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const InputStyle = {
        width: "100%",
        margin: "0.5rem 0",
        color: "black",
        backgroundColor: "white",
        fontSize: "1.6rem",
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
            <TextField sx={InputStyle} type="text" label="Username" variant="standard" value={username} onChange={handleUsernameChange} autoFocus={true} />
            {/* <InputModel2 sx={InputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></InputModel2> */}
            <PasswordVisibility sx={InputStyle} label="Password" password={password} handlePassword={handlePasswordChange} />

            <div className={styles.buttonsContainer} style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
            }}>
                <Button text={User != null ? message : "login"} type='submit' sx={{
                    borderRadius: "10px",
                    backgroundColor: "black",
                    padding: "0.5rem 2rem",
                    color: "white",
                    '&:hover': {
                        backgroundColor: "rgb(0, 0, 0, 0.85)",
                    },
                }} />
                <p style={{
                    color: colors.grey[700],
                    fontSize: "1rem",
                    marginTop: "1rem",
                    textAlign: "center",
                }}>
                    Don't have an account? <span className={styles.link} onMouseDown={pressedRegister}>Register</span>
                </p>

            </div>
            <p style={{ color: "red", fontSize: "1rem" }}>{User == null ? message : ''}</p>
        </form>
    );
}