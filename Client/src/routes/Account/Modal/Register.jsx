import { useState } from "react";
import axios from "axios";

import { TextField, colors } from "@mui/material";
import Button from "@/components/Button/CustomButton.module";
import PasswordVisibility from "@/components/PasswordVIsibility/PasswordVisibility.module";

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
        await axios.post("http://localhost:3001/api/user/register", {
            username: Username,
            password: Password
        }).then((response) => {
            if (response.status == 200) {
                setStatusSuccess(true);
                setMessage("Registered successfully");

                new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                    pressedLogin();
                });

            }

        }).catch((error) => {
            setStatusSuccess(false);
            if (error.response) {
                setMessage(error.response.data.message);
            }
        });
    }

    const checkValidationAndProceed = () => {
        if (Username == "" || Password == "" || ConfirmPassword == "") {
            setMessage("Please fill in all fields");
            return false;
        }

        if (Password !== ConfirmPassword) {
            setMessage("Your password does not match");
            return false;
        }

        if (Password.length < 6) {
            setMessage("Password must be at least 6 characters long");
            return false;
        }

        registerUser();
    };


    const onSubmit = (event) => {
        event.preventDefault();

        // Logic to check if username and password are empty
        checkValidationAndProceed();
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

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
            <TextField sx={InputStyle} type="text" variant="standard" label="Username" value={Username} onChange={handleUsernameChange} autoFocus={true} />
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
            }}>
                <PasswordVisibility sx={InputStyle} type="password" label="Password" password={Password} handlePassword={handlePasswordChange} />
                <PasswordVisibility sx={InputStyle} type="password" label="Confirm Password" password={ConfirmPassword} handlePassword={handleConfirmPasswordChange} />
            </div>
            <div className={styles.buttonsContainer} style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
            }}>
                <Button text="Register" type='submit' sx={{
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
                    You've an account? <span className={styles.link} onClick={pressedLogin}>Login</span>
                </p>
            </div>
            <p style={{ color: StatusSuccess ? "green" : "red", fontSize: "1rem" }}>{Message != '' ? Message : ''}</p>
        </form>
    );
}