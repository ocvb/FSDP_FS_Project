import React, { useState, useRef } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { navigation } from './Navbar';

import { UseAuth } from '../Auth/Auth';
import styles from './css/Navbar.module.css';
import { Person } from '@mui/icons-material';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/CustomButton';
import LogoutIcon from '@mui/icons-material/Logout';

type NavbarAdminProps = {
    logo: string;
};

export default function NavbarAdmin({ logo }: NavbarAdminProps) {
    const [dropdown, setDropdown] = useState(false);
    const hoveredRef = useRef(null);
    const hoverButton = useRef(null);
    const { logout } = UseAuth();

    const menus = [
        {
            name: 'Logout',
            action: () => {
                logout();
            },
            icon: <LogoutIcon />,
        },
    ];

    const onMouseEnter = () => {
        setDropdown(!dropdown);
    };

    return (
        <AppBar
            position='fixed'
            className={styles.navbar}
            sx={{
                boxShadow: 'none',
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
            }}>
            <Toolbar
                className={styles.toolbar}
                style={{
                    padding: '0 2rem',
                }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <a
                        href={navigation[0].href}
                        style={{
                            display: 'inherit',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <img src={logo} width={'45px'} />
                    </a>
                    <p
                        style={{
                            fontSize: '1rem',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            marginLeft: '1rem',
                        }}>
                        People&apos;s <br />
                        Person
                    </p>
                </div>

                <div>
                    <Button
                        text='Admin'
                        onClick={onMouseEnter}
                        ref={hoverButton}
                        startIcon={<Person />}
                        sx={{
                            color: 'black',
                            border: '1px solid white',
                            padding: '0.5rem 1rem',
                            borderRadius: '1.5rem',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    />
                    <Dropdown
                        subitems={menus}
                        dropdown={dropdown}
                        ref={hoveredRef}
                        onMouseLeave={onMouseEnter}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}
