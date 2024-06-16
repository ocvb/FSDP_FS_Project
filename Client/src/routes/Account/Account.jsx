import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Components
import { UseAuth } from "@/components/Auth/Auth";
import { Container } from "@mui/material";
import styles from "./css/Account.module.css";
import bgImage from "@/assets/Account/login-bg.jpg";

import Login from "./Modal/Login";
import Register from "./Modal/Register";

export default function Account() {
    const [modalChanged, setModalChanged] = useState({
        login: true,
        register: false
    });

    const handleRecievedData = (data) => {
        setModalChanged(data);
    }

    return (
        <div style={{ position: 'relative' }}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 !important',
            }}>
                <div className={styles.container}>
                    <div className={styles.bg}>
                        <img src={bgImage}></img>
                    </div>
                    <div className={styles.login}>
                        <div className={styles.loginContainer}>
                            <p>{modalChanged.login ? "Login" : "Register"}</p>
                            {modalChanged.login ? <Login passToChangeModal={handleRecievedData} /> : <Register passToChangeModal={handleRecievedData} />}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
