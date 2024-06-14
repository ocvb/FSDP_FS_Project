import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { UseAuth } from "@/components/Auth/Auth";
import { Box, Container } from "@mui/material";
import Button from "@/components/Button/CustomButton.module";

import Editor from "./Modal/Editor";

import styles from "./Admin.module.css";

export default function Admin() {

    const { userRole } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== "admin") {
            // Redirect to account page
            navigate("/account");
        }
    }, [ ]);

    const tabs = [
        { name: "Editor", },
        { name: "Analytics", },
        { name: "Account", }
    ]

    const InputStyle = {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '5px',
        outline: 'none',
        fontSize: '1rem',
        color: 'black',
        justifyContent: 'start',
    }

    return (
        <Container maxWidth={true} sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            padding: '0 !important',
            height: '100vh',
            backgroundColor: 'lightgrey',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                width: '200px',
                padding: '1rem',
                height: '100%',
                backgroundColor: 'white',
            }}>
                {/* TODO: EVERYTHing ;) */}
                <div className={styles.tabs}>
                    {tabs && tabs.map((tab, index) => {
                        console.log(tab)
                        return (
                            <div key={index} className={styles.tab}>
                                <Button sx={InputStyle} text={tab.name}></Button>
                            </div>
                        );
                    })}
                </div>
            </Box>

            <Box sx={{
                padding: '1rem',
            }}>
                <Editor />

            </Box>
        </Container>
    );
}