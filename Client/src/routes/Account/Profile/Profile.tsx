import React, { useEffect, useState } from 'react';

// Components
import { UseAuth } from '@contexts/Auth';
import { Box, Stack } from '@mui/material';
import MuiButton from '@mui/material/Button';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import Events from './Events';

import styles from './css/Profile.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { Award, Bell, Calendar, Ticket, User } from 'lucide-react';
import Rewards from './Reward';

import { motion } from 'framer-motion';
import { AccountCircle } from '@mui/icons-material';

export default function Profile() {
    const [navigationTab, setNavigationTab] = useState(-1);
    const { logout, fetchAuth } = UseAuth();

    const handleTabChange = (
        event: React.MouseEvent<HTMLButtonElement>,
        index: number
    ) => {
        if (
            event.currentTarget.dataset.name === tabs[index].name &&
            tabs[index].skip != true
        ) {
            setNavigationTab(index);
        }
    };

    const tabs = [
        {
            name: 'Profile',
            icon: <User />,
            desc: 'View and edit your profile',
            render: <UserProfile />,
        },
        {
            name: 'Notifications',
            icon: <Bell />,
            desc: 'View your notifications',
            // render: <Notifications />,
        },
        {
            name: 'Participated Events',
            icon: <Calendar />,
            desc: 'View your participated events',
            render: <Events />,
        },
        { name: 'Bookings', icon: <Ticket />, desc: 'View your bookings' },
        {
            name: 'Rewards',
            icon: <Award />,
            desc: 'View and redeem your rewards points',
            render: <Rewards />,
        },
        {
            skip: true,
            name: 'Logout',
            action: () => {
                logout();
            },
            icon: <LogoutIcon />,
        },
    ];

    return (
        <Box
            className={styles.profile}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '1rem',
                fontSize: '1rem',
                margin: '2rem auto 0',
                width: '100%',
                maxWidth: '460px',
            }}
        >
            <Stack alignItems={'start'} gap={'0.7rem'}>
                <Box
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    Dashboard
                </Box>
                <Stack flexDirection={'row'} gap={'1rem'} alignItems={'center'}>
                    {/* <img
                        src='https://via.placeholder.com/80'
                        alt='profile'
                        style={{
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                        }}
                    /> */}
                    <AccountCircle sx={{ fontSize: '4rem' }} />

                    <Stack alignItems={'start'}>
                        <Box
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: '500',
                                color: (theme) => theme.palette.text.primary,
                                textTransform: 'capitalize',
                            }}
                        >
                            {fetchAuth.User?.username}
                        </Box>
                        {/* <p style={{ fontSize: '1.1rem' }}>email@email.com</p> */}
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction={'column'}
                justifyContent={'space-between'}
                gap={'1rem'}
                className={styles.awdawdaw}
                width={'100%'}
            >
                {tabs.map((tab, index) => (
                    <MuiButton
                        data-name={tab.name}
                        key={index}
                        disableTouchRipple
                        disableFocusRipple
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: '10px',
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                            width: '100%',
                            border: '1px solid #e0e0e0',
                            textTransform: 'none',
                            color: (theme) => theme.palette.text.primary,
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    theme.palette.background.default,
                            },
                            '&:focus': {
                                outline: '#646cff',
                                outlineStyle: 'solid',
                                outlineWidth: '1px',
                            },
                        }}
                        onClick={(event) => handleTabChange(event, index)}
                        onMouseUp={tab.action}
                    >
                        <Stack
                            flexDirection={'column'}
                            gap={'1rem'}
                            sx={{ width: '100%' }}
                        >
                            <Stack
                                flexDirection={'row'}
                                alignItems={'center'}
                                gap={'0.4rem'}
                            >
                                {tab.icon}
                                <b>{tab.name}</b>
                            </Stack>

                            {navigationTab === index ? (
                                <motion.div
                                    initial={{ maxHeight: '0vh' }}
                                    animate={{
                                        maxHeight: '100vh',
                                    }}
                                    transition={{
                                        duration: 1.6,
                                        ease: [0.55, 0.02, -0.15, 1.7],
                                    }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {tab.render}
                                </motion.div>
                            ) : (
                                tab.skip != true && (
                                    <Stack alignItems={'start'}>
                                        <p style={{ fontSize: '1rem' }}>
                                            {tab.desc}
                                        </p>
                                    </Stack>
                                )
                            )}
                        </Stack>
                    </MuiButton>
                ))}
            </Stack>
        </Box>
    );
}
