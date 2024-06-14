import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Select, MenuItem } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

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


    const rows = data.map((item) => ({
        id: item.id,
        col1: item.title,
        col2: item.description,
        col3: item.location,
        col4: item.date,
        col5: item.price,
        col6: item.createdAt,
        col7: item.updatedAt,

    }));

    const columns = [

        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'col1',
            headerName: 'Title',
            width: 150,
            editable: true,
        },
        {
            field: 'col2',
            headerName: 'Description',
            width: 150,
            editable: true,
        },
        {
            field: 'col3',
            headerName: 'Location',
            width: 150,
            editable: true,
        },
        {
            field: 'col4',
            headerName: 'Date',
            width: 150,
            editable: true,
        },
        {
            field: 'col5',
            headerName: 'Price',
            width: 150,
            editable: true,
        },
        {
            field: 'col6',
            headerName: 'Created At',
            width: 150,
            editable: true,
        },
        {
            field: 'col7',
            headerName: 'Updated At',
            width: 150,
            editable: true,
        },
    ];

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
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
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                sx={{
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                }}
            />
        </Container>
    );
}
