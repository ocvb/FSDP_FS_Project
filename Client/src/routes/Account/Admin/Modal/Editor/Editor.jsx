import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import PropTypes from 'prop-types';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Events from "./Modal/Event";
import Users from "./Modal/Users";
import Courses from "./Modal/Courses";

export default function Editor() {
    const [snackbar, setSnackbar] = useState(null);
    const [selected, setSelected] = useState(0)

    const handleOnChangeSelect = (event) => {
        setSelected(event.target.value);
    }

    const handleSnackbarFromModal = (data) => {
        setSnackbar(data);
    }

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: 'fit-content',
        }} >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '1rem',

            }}>
                <Select
                    variant="outlined"
                    defaultValue={0}
                    sx={{
                        width: '200px',
                        color: 'black',
                        backgroundColor: 'white',
                    }}
                    onChange={handleOnChangeSelect}
                >
                    <MenuItem value={0}>Users</MenuItem>
                    <MenuItem value={1}>Events</MenuItem>
                    <MenuItem value={2}>Courses</MenuItem>
                </Select>
            </div>
            <div style={{ position: 'relative', height: 'calc(100vh - 135px - 2rem)', width: '100%', backgroundColor: "white" }}>
                {selected == 0 ? <Users postSnackbar={handleSnackbarFromModal} /> : selected == 1 ? <Events postSnackbar={handleSnackbarFromModal} /> : <Courses />}

                {!!snackbar && (
                    <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        autoHideDuration={3000} onClose={() => setSnackbar(null)}>
                        <Alert onClose={() => setSnackbar(null)} {...snackbar} sx={{ width: '100%' }} />
                    </Snackbar>
                )}
            </div>
        </div >
    );
}