import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Select, MenuItem, Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import Button from "@/components/Button/CustomButton.module";

export default function Editor() {
    const [data, setData] = useState([]);

    const getEventData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/events");
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getEventData();
    }, []);


    // const rows = data.map((item) => ({
    //     id: item.id,
    //     col1: item.title,
    //     col2: item.description,
    //     col3: item.location,
    //     col4: item.date,
    //     col5: item.price,
    //     col6: item.createdAt,
    //     col7: item.updatedAt,

    // }));

    const head = [
        { name: "ID" },
        { name: "Title" },
        { name: "Description" },
        { name: "Location" },
        { name: "Date" },
        { name: "Price" },
        { name: "Created At" },
        { name: "Updated At" },
    ];

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',

        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '1rem',

            }}>
                <Select
                    variant="filled"
                    defaultValue={30}
                    label="Select"
                >
                    <MenuItem value={10}>Users</MenuItem>
                    <MenuItem value={30}>Events</MenuItem>
                    <MenuItem value={20}>Courses</MenuItem>
                </Select>

                <Button text="Create"  />


            </div>

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
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.createdAt}</TableCell>
                                <TableCell>{row.updatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
