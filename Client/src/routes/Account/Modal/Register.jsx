import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input, colors } from "@mui/material";
import CustomButton from "@/components/Button/CustomButton.module";

import styles from "./css/Modals.module.css";

export default function Register({ passToChangeModal }) {
    const pressedLogin = () => {
        
        // reset before changing
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setStatusSuccess(false);

        // Change to login modal
        passToChangeModal({
            login: true
        });

    }

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const [Message, setMessage] = useState('');

    const [StatusSuccess, setStatusSuccess] = useState(false);

    const registerUser = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/register", {
                username: Username,
                password: Password
            });

            if (response.status != 200) {
                setMessage("An error occured, please try again later");
                return;
            }

            if (response.data['status'] === 'success') {
                setStatusSuccess(true);
                setMessage("Registered successfully");
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setMessage(response.data['message']);
                setStatusSuccess(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { console.log(Username, Password, ConfirmPassword) }), [Username, Password, ConfirmPassword];

    const checkValidationAndProceed = () => {
        if (Username == "" || Password == "" || ConfirmPassword == "") {
            setMessage("Please fill in all fields");
            return false;
        }

        if (Password !== ConfirmPassword) {
            setMessage("Please check your password is matching");
            return false;
        }

        registerUser();
    };


    const onSubmit = (event) => {
        event.preventDefault();

        // Logic to check if username and password are empty
        checkValidationAndProceed();
    }

    const InputStyle = {
        width: "100%",
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
        <form onSubmit={onSubmit} className={styles.modal}>
            <Input sx={InputStyle} type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} autoFocus></Input>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
            }}>
                <Input sx={InputStyle} type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Input sx={InputStyle} type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Input>
            </div>
            <div className={styles.buttonsContainer} style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
            }}>
                <CustomButton text="Register" type='submit' onClick={checkValidationAndProceed} sx={{
                    display: "inline-flex",
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
                    You've an account? <span className={styles.link} onMouseDown={pressedLogin}>Login</span>
                </p>
            </div>
            <p style={{ color: StatusSuccess ? "green" : "red", fontSize: "1rem" }}>{Message != '' ? Message : ''}</p>
        </form>
    );
}