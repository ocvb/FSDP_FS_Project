import React, { useState, useEffect } from "react";
import axios from "axios";

import { TextField } from "@mui/material";
import PasswordVisibility from "@/components/PasswordVIsibility/PasswordVisibility.module";
import Button from "@/components/Button/CustomButton.module";

import mainStyles from "./css/Profile.module.css";
import styles from "./css/UserProfile.module.css";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ user }) {
    const [retrieveUser, setRetrieveUser] = useState({});

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [Message, setMessage] = useState('');

    const navigate = useNavigate();

    const checkUser = async (user) => {
        await axios.post(`http://localhost:3001/api/user`, {
            uuid: user,
        }).then((response) => {
            if (response.status != 200) {
                console.error("User not found");
                navigate("/account");
                return;
            }

            setRetrieveUser(response.data['data']);
        });
    };

    useEffect(() => {
        checkUser(user);
    }, [user]);

    useEffect(() => {
        setUsername(retrieveUser.username || '');
        setPassword(retrieveUser.password || '');
    }, [retrieveUser]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const updateUser = async () => {
        let timeoutId = null;

        // Update user information
        await axios.put(`http://localhost:3001/api/user/update/${retrieveUser.uuid}`, {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response.data)

            if (response.status === 200) {
                setRetrieveUser(response.data['data']);
                setMessage("Updated");
            }
        }).catch((error) => {
            console.error(error);
        });


        checkUser(user);

        // Visual feedback
        timeoutId = setTimeout(() => {
            setMessage('Save changes');
        }, 2000);
        return () => clearTimeout(timeoutId);

    }

    const onSubmit = (event) => {
        event.preventDefault();

    }

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
                <form onSubmit={onSubmit} style={{
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

                    <Button text={Message ? Message : 'Save Changes'} type="submit" onClick={updateUser} sx={{
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