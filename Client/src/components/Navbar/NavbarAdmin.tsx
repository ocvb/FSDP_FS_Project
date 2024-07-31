import { useState, useRef } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { navigation } from './Navbar';

import { UseAuth } from '@contexts/Auth';
import styles from './css/Navbar.module.css';
import { Person } from '@mui/icons-material';
import Dropdown from '@components/Dropdown/Dropdown';
import Button from '@components/Button/CustomButton';
import LogoutIcon from '@mui/icons-material/Logout';

interface NavbarAdminProps {
    logo: string;
}

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
        return;
    };

    return (
        <AppBar
            position='fixed'
            className={styles.navbar}
            sx={{
                boxShadow: 'none',
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
            }}
        >
            <Toolbar
                className={styles.toolbar}
                style={{
                    padding: '0 2rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <a
                        href={navigation[0].href}
                        style={{
                            display: 'inherit',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={logo} width={'45px'} />
                    </a>
                    <p
                        style={{
                            fontSize: '1rem',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            lineHeight: '1',
                            position: 'absolute',
                            left: '80px',
                        }}
                    >
                        People&apos;s <br />
                        Project
                    </p>
                </div>

                <div>
                    <Button
                        type='button'
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
