import { useEffect, useState, useRef } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { navigation } from "./Navbar.module";


import styles from './css/Navbar.module.css';
import { Person } from "@mui/icons-material";
import Dropdown from "../Dropdown/Dropdown.module";
import Button from "../Button/CustomButton.module";
import { UseAuth } from "../Auth/Auth";


export default function NavbarAdmin({ logo }) {

    const [dropdown, setDropdown] = useState(false);
    const hoveredRef = useRef(null);
    const hoverButton = useRef(null);
    const { logout } = UseAuth();

    const menus = [
        {
            name: "Profile", action: () => {
                console.log("Profile")
            }
        },
        {
            name: "Logout", action: () => {
                logout();
            }
        },
    ]

    useEffect(() => {
        const handler = (event) => {
            if (hoveredRef.current.style.display == "block" && !hoverButton.current.contains(event.target) && !hoveredRef.current.contains(event.target)) {
                setDropdown(false);
            }
        }

        document.addEventListener('mousemove', handler);

        return () => {
            document.removeEventListener('mousemove', handler);
        }

    }, []);


    const onMouseEnter = () => {
        setDropdown(true);
    }


    const handlerDropdownOnMouseLeave = () => {
        setDropdown(false);
    }

    return (
        <AppBar position="fixed" className={styles.navbar} >
            <Toolbar className={styles.toolbar}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <a href={navigation[0].href} style={{
                        display: "inherit",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img src={logo} width={"45px"} />
                    </a>
                    <p style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        fontStyle: "italic",
                        marginLeft: "1rem",

                    }}>
                        People&apos;s <br />Person
                    </p>
                </div>

                <div style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    justifyContent: "center",

                }}>
                    <Person />
                    <div>
                        <Button text="Admin" onMouseEnter={onMouseEnter} ref={hoverButton} />
                        <Dropdown subitems={menus} dropdown={dropdown} ref={hoveredRef} onMouseLeave={handlerDropdownOnMouseLeave} />
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}