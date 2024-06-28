import { useEffect, useState } from "react";
import axios from "axios";

import { UseAuth } from "@components/Auth/Auth";
import mainStyles from "./css/Profile.module.css";
import styles from "./css/Events.module.css";
import { Box, Container, Table, TableHead, TableBody, TableContainer, TableRow, TableCell, Paper } from "@mui/material";


export default function Events() {
    const [data, setData] = useState([]);
    const { fetchAuth, checkTokenIsValid } = UseAuth();
    const retrieveToken = localStorage.getItem("token");

    const getEventData = async () => {
        checkTokenIsValid(retrieveToken).then(async (response) => {
            if (response) {
                await axios.get("http://localhost:3001/api/events/user", {
                    params: {
                        userId: fetchAuth().User.id,
                    },
                    headers: {
                        'Authorization': `Bearer ${retrieveToken}`,
                    },
                }).then((response) => {
                    setData(response.data);
                });
                return;
            }
        });
    }

    useEffect(() => {
        getEventData();
    }, []);

    const head = [
        { name: "ID" },
        { name: "Title" },
        { name: "Location" },
        { name: "Date" },
        { name: "Price" },
    ];
    return (
        <>
            <div className={mainStyles.header} style={{
                padding: "1rem",
                backgroundColor: "#F9F9F9",
                width: "100%",

            }}>
                <p>Events</p>
            </div>

            <div
                className={styles.events}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    padding: "1rem",
                    width: "100%",
                }}>
                <p>You have participate in these Events</p>
                <TableContainer component={Paper} sx={{
                    width: '100%',
                }}>
                    <Table sx={{
                        backgroundColor: 'rgba(255,255,255, 0.8)',
                    }} aria-label="simple table">
                        <TableHead sx={{
                            backgroundColor: 'rgba(0,0,0, 0.15)',
                        }}>
                            <TableRow>
                                {head.map((item, index) => (
                                    <TableCell key={index}>{item.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
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