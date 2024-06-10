import React, { useState, useEffect } from "react";

import { TextField } from "@mui/material";
import PasswordVisibility from "../../../components/PasswordVIsibility/PasswordVisibility.module";
import Button from "../../../components/Button/CustomButton.module";

import mainStyles from "./css/Profile.module.css";
import styles from "./css/UserProfile.module.css";

export default function UserProfile({ user }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setUsername(user.username);
        setPassword(user.password);

    }, [user]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>
            <div className={mainStyles.header} style={{
                padding: "1rem",
                backgroundColor: "#F9F9F9",
                width: "100%",
            }}>
                <p>Profile</p>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                padding: "1rem",
                width: "100%",
            }}>
                <form style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "100%",
                }}>
                    {/* <div>
                        <img src="https://via.placeholder.com/80" alt="profile" />
                    </div> */}
                    <div>
                        <p>User Name</p>
                        <TextField value={username} onChange={handleUsernameChange} sx={{
                            width: "100%",
                            'input': {
                                padding: "0.5rem",
                                "&:focus": {
                                    outline: "none",
                                },
                            },
                        }}></TextField>
                    </div>
                    <div>
                        <p>Password</p>
                        <PasswordVisibility password={password} handlePassword={handlePasswordChange} sx={{
                            width: "100%",
                        }} />
                    </div>

                    <Button text="Save changes" sx={{
                        fontSize: "0.8rem",
                        display: "inline-flex",
                        borderRadius: "10px",
                        width: "100%",
                        backgroundColor: "black",
                        padding: "0.3rem 1rem",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                        },
                    }} />
                </form>
            </div>
        </>
    );
}