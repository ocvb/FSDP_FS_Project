import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Components
import { Container, TextField, Box, Skeleton } from "@mui/material";
import Button from "../../../components/Button/CustomButton.module";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";
import Events from "./Events";


import styles from "./css/Profile.module.css";


export default function Profile() {
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);

    if (!user) {
        useEffect(() => {
            setTimeout(() => {
                navigate("/account")
            }, 1000)
        }, [])
        return (
            <Container>
                <p className={styles.error}>403 Not permitted, <br /> redirecting...</p>
            </Container>
        );
    }


    const buttonStyle = {
        justifyContent: "start",
        width: "100%",
        color: "black",
        // "&:hover": {
        //     backgroundColor: "black",
        //     color: "white",
        // },
    };

    const tabs = [
        { name: "Profile" },
        { name: "Notifications", link: "/account/profile/notifications" },
        { name: "Events", link: "/account/profile/events" },
        { name: "Bookings", link: "/account/profile/bookings" },
        { name: "Rewards", link: "/account/profile/rewards" },
    ];


    const [notLoading, setNotloading] = useState(false);
    const handleTabChange = async (event, index) => {
        if (event.target.textContent === tabs[index].name) {
            setNotloading(false); // Set loading to true when a tab is clicked
            setTab(index);
            // navigate(tabs[index].link, { state: { user: user } });
            // Simulate a network request or some operation
            // After the operation is complete, set loading to false
            await new Promise(resolve => setTimeout(resolve, 500));
            setNotloading(true);
        }
    };

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setNotloading(true);
        }, 1000);

        // Clear the timeout when the component is unmounted or when stillLoading changes
        return () => clearTimeout(loadingTimeout);
    }, []);

    return (
        <Box className={styles.profile} sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
            gap: "1rem",
            fontSize: "1rem",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "start",
                margin: "1rem 0",
                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: "white",
                width: "fit-content",
                boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)",
            }}>
                {tabs && tabs.map((tab, index) => (
                    <Button key={index} text={tab.name} sx={buttonStyle} onMouseDown={(event) => handleTabChange(event, index)} />
                ))}
            </div>

            <div className={styles.profileContainer} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                margin: "1rem 0",
                backgroundColor: "white",
                boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)",
                fontSize: "1rem",
                width: "100%",
                maxWidth: "460px",
                borderRadius: "10px",
            }}>

                {tab == 0 && notLoading ? <UserProfile user={user} /> :
                    tab == 1 && notLoading ? <Notifications /> : tab == 2 && notLoading ? <Events /> :
                        <Skeleton variant="rectangular" width="100%" height="300px" />}
            </div>

            {/* <Outlet /> */}
        </Box>
    );
};