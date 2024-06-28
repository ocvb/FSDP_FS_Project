import { useState } from "react";

// Components
import { Box, Container } from "@mui/material";
import Button from "@/components/Button/CustomButton.module";
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';

import styles from "./Admin.module.css";

import Editor from "./Modal/Editor/Editor";
import Analytics from "./Modal/Analytics/Analytics";

export default function Admin() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { name: "Editor", index: 0, action: () => { setActiveTab(0) }, icon: <EditIcon /> },
        { name: "Analytics", index: 1, action: () => { setActiveTab(1) }, icon: <BarChartIcon /> },
        { name: "Account", index: 2, action: () => { setActiveTab(2) } }
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
        <Container maxWidth="true" sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            padding: '0 !important',
            // backgroundColor: '#f8f8f8',
            height: 'calc(100vh - 64px)',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                maxWidth: '200px',
                padding: '1rem',
                height: '100%',
                backgroundColor: 'white',
                borderRight: '1px solid rgba(224, 224, 224, 1)',
            }}>
                <div className={styles.tabs} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',

                }}>
                    {tabs && tabs.map((tab, index) => {
                        return (
                            <div key={index} className={styles.tab}>
                                <Button
                                    startIcon={tab.icon}
                                    sx={{
                                        ...InputStyle,
                                        backgroundColor: activeTab == index ? 'black' : 'white',
                                        color: activeTab == index ? 'white' : '#212121',
                                        '&:hover': {
                                            backgroundColor: 'black',
                                            color: 'white',
                                        }
                                    }} text={tab.name} onClick={tab.action}></Button>
                            </div>
                        );
                    })}
                </div>
            </Box>
            <Box maxWidth={true} sx={{
                position: 'relative',
                padding: '1rem',
                width: '100%',
                gap: '1rem',

            }}>
                {activeTab == 0 ? <Editor /> : <Analytics />}

            </Box>
        </Container>
    );
}