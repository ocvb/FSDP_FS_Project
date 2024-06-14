import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


// TODO: AuthProvider and useAuth is not defined
import { UseAuth } from "@/components/Auth/Auth";
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

        // Change to register modal
        passToChangeModal({
            register: true
        });
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginStatus, setloginStatus] = useState(false);

    const navigate = useNavigate();
    const { state } = useLocation();

    const { login, user } = UseAuth();

    const checkLogin = () => {
        // Logic to check if username and password are empty
        if (username == "" || password == "") {
            setMessage("Please fill in all fields");
            setloginStatus(false);
            return;
        }

        login({ username, password }).then((value) => {
            if (value) {
                setMessage("Logging in...");
                setloginStatus(true);
                setTimeout(() => {
                    navigate(state?.path ? state.path : "/account/profile");
                }, 1000);
            }
            return;
        }).catch((error) => {
            setloginStatus(false);
            setMessage("Invalid username or password");
        });

    };

    const onSubmit = (event) => {
        event.preventDefault();

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
                <Button text={loginStatus ? message : "login"} type='submit' sx={{
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
            <p style={{ color: "red", fontSize: "1rem" }}>{!loginStatus ? message : ''}</p>
        </form>
    );
}