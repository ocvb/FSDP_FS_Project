import './css/Profile.module.css';
import styles from './css/Events.module.css';
import {
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Paper,
    Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseAuth } from '@contexts/Auth';
import { EventsDataResponse } from '@api/ApiType';
import { callAPI } from '@api/EndpointsQueries';

export default function Events() {
    const { fetchAuth } = UseAuth();
    const retrieveToken = localStorage.getItem('token');

    const { data: eventData } = useQuery({
        queryKey: ['userEvents'],
        queryFn: async () => {
            const response = await callAPI.post<EventsDataResponse['data'][]>(
                '/user/event',
                { userId: fetchAuth.User.id },
                {
                    headers: { Authorization: `Bearer ${retrieveToken}` },
                }
            );

            return response.data;
        },
    });

    const head = [
        { name: 'ID' },
        { name: 'Title' },
        { name: 'Location' },
        { name: 'Date' },
        { name: 'Price' },
    ];
    return (
        <Box
            className={styles.events}
            style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '1rem',
                width: '100%',
                alignItems: 'start',
            }}
        >
            <p>Your current participated Events</p>
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                }}
            >
                <Table
                    sx={{
                        backgroundColor: 'rgba(255,255,255, 0.2)',
                    }}
                    aria-label='simple table'
                >
                    <TableHead
                        sx={{
                            backgroundColor: 'rgba(0,0,0, 0.05)',
                        }}
                    >
                        <TableRow>
                            {head.map((item, index) => (
                                <TableCell key={index}>{item.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventData?.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component='th' scope='row'>
                                    {item?.id}
                                </TableCell>
                                <TableCell>{item?.title}</TableCell>
                                <TableCell>{item?.location}</TableCell>
                                <TableCell>{item?.date}</TableCell>
                                <TableCell>
                                    {item?.price == 0 ? 'Free' : item?.price}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
