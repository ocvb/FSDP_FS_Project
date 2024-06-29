import { useState } from 'react';
import { Select, MenuItem, MenuList } from '@mui/material';
import PropTypes from 'prop-types';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Events from './Modal/Events';
import Users from './Modal/Users';
import Courses from './Modal/Courses';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchUsers, fetchEvents } from '@api/api';

export default function Editor() {
    const [snackbar, setSnackbar] = useState(null);
    const [selected, setSelected] = useState(0);

    const QueryClient = useQueryClient();

    const handleOnChangeSelect = (event: any) => {
        setSelected(event.target.value);
    };

    const handleSnackbarFromModal = (data: object) => {
        setSnackbar(data as any);
    };

    const handleCloseSnackbar = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(null);
    };

    const handlePrefetchUsers = () => {
        QueryClient.prefetchQuery({
            queryKey: ['users'],
            queryFn: fetchUsers,
        });
    };

    const handlePrefetchEvents = () => {
        QueryClient.prefetchQuery({
            queryKey: ['events'],
            queryFn: fetchEvents,
        });
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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
            >
                <Select
                    variant='outlined'
                    defaultValue={0}
                    onChange={handleOnChangeSelect}
                    // onMouseEnter={(event) => console.log(event)}
                    sx={{
                        width: '200px',
                        color: 'black',
                        backgroundColor: 'white',
                        '& .MuiMenu-list': {
                            p: '5px',
                        },
                    }}
                >
                    <MenuItem onMouseOver={handlePrefetchUsers} value={0}>
                        Users
                    </MenuItem>
                    <MenuItem onMouseOver={handlePrefetchEvents} value={1}>
                        Events
                    </MenuItem>
                    <MenuItem value={2}>Courses</MenuItem>
                </Select>
            </div>
            <div
                style={{
                    position: 'relative',
                    height: 'calc(100vh - 135px - 2rem)',
                    width: '100%',
                    backgroundColor: 'white',
                }}
            >
                {selected == 0 ? (
                    <Users postSnackbar={handleSnackbarFromModal} />
                ) : selected == 1 ? (
                    <Events postSnackbar={handleSnackbarFromModal} />
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
                        onClose={handleCloseSnackbar}
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
