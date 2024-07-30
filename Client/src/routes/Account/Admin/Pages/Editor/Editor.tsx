import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Events from './Modal/Events';
import Users from './Modal/Users';
import Courses from './Modal/Courses';

interface snackBar {
    message?: string;
    severity?: 'success' | 'error' | 'info' | 'warning';
}

export default function Editor() {
    const [snackbar, setSnackbar] = useState(null as snackBar | null);
    const [selected, setSelected] = useState(0);

    const handleOnChangeSelect = (event: SelectChangeEvent<number>) => {
        setSelected(Number(event.target.value));
    };

    const handleSnackbarFromModal = (data: snackBar) => {
        setSnackbar(data);
    };

    const handleCloseSnackbar = (reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(null);
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: 'fit-content',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    height: 'calc(100vh - 90px)',
                    width: '100%',
                    backgroundColor: 'white',
                }}
            >
                {selected == 0 ? (
                    <Users
                        postSnackbar={handleSnackbarFromModal}
                        handleOnChangeSelect={handleOnChangeSelect}
                        selectedCategory={selected}
                    />
                ) : selected == 1 ? (
                    <Events
                        postSnackbar={handleSnackbarFromModal}
                        handleOnChangeSelect={handleOnChangeSelect}
                        selectedCategory={selected}
                    />
                ) : (
                    <Courses />
                )}

                {snackbar != null && (
                    <Snackbar
                        open
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        autoHideDuration={3000}
                        onClose={() => handleCloseSnackbar}
                    >
                        <Alert
                            onClose={() => setSnackbar(null)}
                            {...(snackbar as object)}
                            sx={{ width: '100%' }}
                        />
                    </Snackbar>
                )}
            </div>
        </div>
    );
}
