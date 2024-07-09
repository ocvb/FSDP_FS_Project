import axios from 'axios';

import mainStyles from './css/Profile.module.css';
import styles from './css/Events.module.css';
import {
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseAuth } from '@components/Auth/Auth';

export default function Events() {
    const { fetchAuth } = UseAuth();
    const retrieveToken = localStorage.getItem('token');

    console.log(fetchAuth.User?.id);

    const { data: eventData } = useQuery({
        queryKey: ['events'],
        queryFn: async () =>
            await axios.get('http://localhost:3001/api/events/user', {
                params: {
                    userId: fetchAuth.User?.id,
                },
                headers: { Authorization: `Bearer ${retrieveToken}` },
            }),
    });

    const head = [
        { name: 'ID' },
        { name: 'Title' },
        { name: 'Location' },
        { name: 'Date' },
        { name: 'Price' },
    ];
    return (
        <>
            <div
                className={mainStyles.header}
                style={{
                    padding: '1rem',
                    backgroundColor: '#F9F9F9',
                    width: '100%',
                }}
            >
                <p>Events</p>
            </div>

            <div
                className={styles.events}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    padding: '1rem',
                    width: '100%',
                }}
            >
                <p>You have participate in these Events</p>
                <TableContainer
                    component={Paper}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Table
                        sx={{
                            backgroundColor: 'rgba(255,255,255, 0.8)',
                        }}
                        aria-label='simple table'
                    >
                        <TableHead
                            sx={{
                                backgroundColor: 'rgba(0,0,0, 0.15)',
                            }}
                        >
                            <TableRow>
                                {head.map((item, index) => (
                                    <TableCell key={index}>
                                        {item.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventData?.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
