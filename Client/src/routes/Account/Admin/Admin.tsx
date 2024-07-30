import { useState } from 'react';

// Components
import { Box, IconButton } from '@mui/material';
import Button from '@components/Button/CustomButton';
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';

import styles from './Admin.module.css';

import Editor from './Pages/Editor/Editor';
import Analytics from './Pages/Analytics/Analytics';
import { KeyboardDoubleArrowLeftRounded } from '@mui/icons-material';

import { motion } from 'framer-motion';

export default function Admin() {
    const [activeTab, setActiveTab] = useState(
        sessionStorage.getItem('activeTab') ?? 0
    );
    const [collapse, setCollapse] = useState(true);

    sessionStorage.setItem('activeTab', activeTab.toString());
    const tabs = [
        {
            name: 'Editor',
            index: 0,
            action: () => {
                setActiveTab(0);
            },
            icon: (
                <EditIcon
                    sx={{
                        fontSize: '1.5rem !important',
                    }}
                />
            ),
        },
        {
            name: 'Analytics',
            index: 1,
            action: () => {
                setActiveTab(1);
            },
            icon: (
                <BarChartIcon
                    sx={{
                        fontSize: '1.5rem !important',
                    }}
                />
            ),
        },
    ];

    const InputStyle = {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '5px',
        outline: 'none',
        fontSize: '1rem',
        color: 'black',
        justifyContent: 'start',
    };

    const handleCallapse = () => {
        setCollapse(!collapse);
    };

    const transitionDuration = 0.32;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'start',
                padding: '0 !important',
                // backgroundColor: '#f8f8f8',
                height: 'calc(100vh - 64px)',
            }}
        >
            <motion.div
                initial={{ width: '80px' }}
                animate={{
                    width: collapse ? '80px' : '150px',
                }}
                transition={{ duration: transitionDuration }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    padding: '1rem',
                    height: '100%',
                    backgroundColor: 'white',
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                }}
            >
                <motion.div
                    className={styles.tabs}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                    }}
                    initial={{ width: '100%' }}
                    animate={{
                        width: '100%',
                    }}
                    transition={{ duration: transitionDuration }}
                >
                    {tabs.map((tab, index) => {
                        return (
                            <motion.div key={index} className={styles.tab}>
                                {collapse ? (
                                    <IconButton
                                        onClick={tab.action}
                                        disableFocusRipple
                                        sx={{
                                            padding: '0.5rem',
                                            '&:focus': {
                                                outline: 'none',
                                            },
                                            backgroundColor:
                                                activeTab == index
                                                    ? 'black'
                                                    : 'white',
                                            color:
                                                activeTab == index
                                                    ? 'white'
                                                    : '#212121',
                                            '&:hover': {
                                                backgroundColor: 'black',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {tab.icon}
                                    </IconButton>
                                ) : (
                                    <Button
                                        type='button'
                                        startIcon={tab.icon}
                                        sx={{
                                            ...InputStyle,
                                            padding: '0.5rem',
                                            backgroundColor:
                                                activeTab == index
                                                    ? 'black'
                                                    : 'white',
                                            color:
                                                activeTab == index
                                                    ? 'white'
                                                    : '#212121',
                                            '&:hover': {
                                                backgroundColor: 'black',
                                                color: 'white',
                                            },
                                            overflow: 'clip',
                                        }}
                                        text={tab.name}
                                        onClick={tab.action}
                                    ></Button>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
                <IconButton
                    disableFocusRipple
                    sx={{
                        width: 'fit-content',
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                    onClick={handleCallapse}
                >
                    <KeyboardDoubleArrowLeftRounded
                        sx={{
                            color: (theme) => theme.palette.text.primary,
                        }}
                    />
                </IconButton>
            </motion.div>
            <motion.div
                initial={{ width: '100%' }}
                animate={{
                    width: collapse ? '100%' : 'calc(100% - 150px)',
                }}
                transition={{ duration: transitionDuration }}
                style={{
                    position: 'relative',
                    padding: '1rem',
                }}
            >
                {activeTab == 0 ? <Editor /> : <Analytics />}
            </motion.div>
        </Box>
    );
}
