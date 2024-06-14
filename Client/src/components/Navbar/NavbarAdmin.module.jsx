import { AppBar, Toolbar } from "@mui/material";
import { navigation } from "./Navbar.module";


import styles from './css/Navbar.module.css';
import { Person } from "@mui/icons-material";


export default function NavbarAdmin({ logo }) {
    console.log(navigation)
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
                        Admin
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}