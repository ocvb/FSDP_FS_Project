import { SetStateAction, useState } from 'react';

// Components
import { Container } from '@mui/material';
import styles from './css/Account.module.css';
import bgImage from '@/assets/Account/login-bg.jpg';

import Login from './Modal/Login';
import Register from './Modal/Register';

interface ModalChangedData {
    login?: boolean;
    register?: boolean;
}

export default function Account() {
    const [modalChanged, setModalChanged] = useState({
        login: true,
        register: false,
    } as ModalChangedData);

    const handleRecievedData = (data: SetStateAction<ModalChangedData>) => {
        setModalChanged(data);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Container
                maxWidth={false}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 !important',
                }}
            >
                <div className={styles.container}>
                    <div className={styles.bg}>
                        <img src={bgImage}></img>
                    </div>
                    <div className={styles.login}>
                        <div className={styles.loginContainer}>
                            <h2>{modalChanged.login ? 'Login' : 'Register'}</h2>
                            {modalChanged.login ? (
                                <Login passToChangeModal={handleRecievedData} />
                            ) : (
                                <Register
                                    passToChangeModal={handleRecievedData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
