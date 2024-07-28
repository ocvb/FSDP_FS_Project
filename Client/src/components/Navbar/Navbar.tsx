/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import styles from './css/Navbar.module.css';
import Dropdown from '@components/Dropdown/Dropdown';
import { useTheme } from '@mui/material/styles';
import ChangeThemeModeButton from '@components/ThemeMode/ChangeThemeModeButton';

export const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    {
        name: 'Courses',
        href: '/courses',
        submenu: [
            { name: 'Health & Wellness', href: '/courses/HealthWellness' },
            { name: 'Lifestyle & Leisure', href: '/courses/LifestyleLeisure' },
            { name: 'Sports & Fitness', href: '/courses/SportsFitness' },
            {
                name: 'Education & Enrichment',
                href: '/courses/EducationEnrichment',
            },
            { name: 'Lifelong Learning', href: '/courses/LifelongLearning' },
            { name: 'Interest Groups', href: '/interest-groups' },
        ],
    },
    { name: 'Rewards', href: '/rewards' },
    { name: 'Skill-share', href: '/skill-share' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Account', href: '/account' },
];

interface NavbarProps {
    imgUrl: string;
}

export default function navbar(props: NavbarProps) {
    const [dropdown, setDropdown] = useState(false);
    const [getIndex, setIndex] = useState(0);
    const hoveredRef = useRef(null);
    const hoverButton = useRef(null);

    const theme = useTheme();

    const onMouseEnter = (index: number) => {
        setIndex(index);
        setDropdown(true);
    };

    const handlerDropdownOnMouseLeave = () => {
        setDropdown(false);
    };

    return (
        <>
            <AppBar
                position='fixed'
                className={styles.navbar}
                sx={{
                    boxShadow:
                        '0px 2px 3px -1px rgba(0,0,0,0.09), 0px 4px 3px 0px rgba(0,0,0,0.05)',
                    backgroundColor: theme.palette.background.paper,
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
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <a
                            href={navigation[0].href}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <img src={props.imgUrl} width={'45px'} />
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
                    {navigation.map((item, index) => (
                        <div className={styles.buttonWrapper} key={index}>
                            <Button
                                color='inherit'
                                key={index}
                                href={item.href}
                                aria-expanded={
                                    getIndex === index ? 'true' : 'false'
                                }
                                onMouseEnter={() => onMouseEnter(index)}
                                ref={hoverButton}
                                sx={{
                                    minWidth: 'fit-content',
                                    borderRadius: '10%',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                {item.name}
                            </Button>
                            {getIndex === index && (
                                <Dropdown
                                    subitems={item.submenu}
                                    allowHover={true}
                                    dropdown={dropdown}
                                    ref={hoveredRef}
                                    onMouseLeave={handlerDropdownOnMouseLeave}
                                />
                            )}
                        </div>
                    ))}
                    <div style={{ flexGrow: 1 }}></div>
                    {/* <ChangeThemeModeButton /> */}
                </Toolbar>
            </AppBar>
        </>
    );
}
