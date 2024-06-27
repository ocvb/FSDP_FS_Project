import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Modal, Select, Stack, TextField, IconButton, FormControl, Link } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import Button from "@/components/Button/CustomButton.module";
import PropTypes from 'prop-types';
import RefreshIcon from '@mui/icons-material/Refresh';

import {
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
    DataGrid,
} from '@mui/x-data-grid';
import { MoreHoriz } from "@mui/icons-material";
import Dropdown from "@/components/Dropdown/Dropdown.module";
import PopupModal from "@/components/PopupModal/PopupModal.module";


export default function Users({ postSnackbar }) {
    Users.propTypes = {
        postSnackbar: PropTypes.func.isRequired,
    }

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("Yishun");
    const [price, setPrice] = useState("")
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
    const [userId, setUserId] = useState(null);

    const { data: newData, isFetching, isError, refetch: refetchEvents } = useQuery({
        queryKey: ['events'],
        queryFn: async () => await axios.get("http://localhost:3001/api/admin/events/", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }),
    });

    const handleUpdateToDatabase = async (id, updatedRow) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/admin/event/${id}`, updatedRow, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                postSnackbar({ children: 'Event updated successfully', severity: 'success' });
            } else {
                return new Error('Error updating the event');
            }
        } catch (error) {
            setRows(rows.filter((row) => row.id !== id));
            postSnackbar({ children: 'Error updating the event', severity: 'error' });
        }
    };

    const handleDeleteFromDatabase = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/event/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                postSnackbar({ children: 'Event deleted successfully', severity: 'success' });
            } else {
                return new Error('Error deleting the event');
            }
        } catch (error) {
            postSnackbar({ children: 'Error deleting the event', severity: 'error' });
        }
    };

    function EditToolbar() {

        const handleClick = () => {
            const id = Math.max(0, ...rows.map((row) => row.id)) + 1;
            setOpenAddModal(true);
            setSelectedRow({ id });
        };

        return (
            <GridToolbarContainer sx={{
                display: 'flex',
                justifyContent: 'end',
                gap: '1rem',
                alignItems: 'center',
                padding: '1rem',
            }}>
                <IconButton onClick={() => refetchEvents()} >
                    <RefreshIcon sx={{ fontSize: 25, color: 'black' }} />
                </IconButton>
                <Button text="Add record" startIcon={<AddIcon sx={{ fontSize: '25px !important' }} />} onClick={handleClick} sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#2a2a2a',
                    }
                }} />
            </GridToolbarContainer>
        );
    }

    function ExpandableCell({ value }) {
        ExpandableCell.propTypes = {
            value: PropTypes.string.isRequired,
        };

        const [expanded, setExpanded] = useState(false);
        const length = 300;
        return (
            <div>
                {expanded ? value : value.slice(0, length)}&nbsp;
                {value.length > length && (
                    <Link
                        type="button"
                        component="button"
                        sx={{ fontSize: 'inherit' }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'view less' : 'view more'}
                    </Link>
                )}
            </div>
        );
    }

    useEffect(() => {
        setRows(newData?.data || [])
    }, [newData]);

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        handleDeleteFromDatabase(id);
    };

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 30, maxWidth: 70,
        },
        {
            field: 'title',
            headerName: 'Title',
            type: 'string',
            width: 160,
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            flex: 1,
            renderCell: (params) => <ExpandableCell {...params} />,
        },
        {
            field: 'location',
            headerName: 'Location',
            type: 'string',
            flex: 1,
        },
        {
            field: 'date',
            headerName: 'Date',
            type: 'date',
            width: 130,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.formattedValue}>
                        <span>{new Date(params.formattedValue).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </Tooltip>
                )
            },
            valueGetter: (params) => {
                const date = new Date(params);
                return date;
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            renderCell: (params) => {
                if (params.value === 0) {
                    return 'Free';
                } else if (params.value > 0) {
                    return `$${params.value.toFixed(2)}`;
                }
                return params.value;
            }
        },
        { field: 'createdAt', headerName: 'Created At', editable: false },
        { field: 'updatedAt', headerName: 'Updated At', editable: false },
        {
            field: 'action', type: 'actions', headerName: 'Action', cellClassName: 'actions',
            getActions: ({ id }) => {
                // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                const [dropdown, setDropdown] = useState(false)
                const buttons = [
                    {
                        name: "Edit",
                        action: () => handleOpenEditModal(id),
                        icon: <EditIcon />

                    },
                    {
                        name: "Delete",
                        action: handleDeleteClick(id),
                        icon: <DeleteIcon />

                    }
                ]

                const handleOpenDropdown = () => {
                    setDropdown(!dropdown)
                }

                const handleWhenMouseLeave = () => {
                    setDropdown(false)
                }

                return [
                    <div key={"dropdown"}>
                        <IconButton key={"IconButton"} onClick={handleOpenDropdown} sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:hover': {
                                outline: 'none',
                            },
                        }}>
                            <MoreHoriz />
                        </IconButton>
                        <Dropdown key={"More"} dropdown={dropdown} onMouseDown={handleOpenDropdown} onMouseLeave={handleWhenMouseLeave} subitems={buttons}
                            style={{
                                transform: 'translateX(-50%)'
                            }}
                        />
                    </div>
                ];
            },
        }
    ];

    const handleOpenEditModal = (id) => {
        setOpenEditModal(true);
        setSelectedRow(rows.find((row) => row.id === id));
        setTitle(rows.find((row) => row.id === id).title);
        setDescription(rows.find((row) => row.id === id).description);
        setDate(new Date(rows.find((row) => row.id === id).date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
        setPrice(rows.find((row) => row.id === id).price);
        setUserId(rows.find((row) => row.id === id).userId);
    }

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({});
        setTitle('');
        setDescription('');
        setPrice('');
        setDate(new Date());
        setUserId(null);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    }

    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        handleUpdateToDatabase(selectedRow.id, { title, description, location, price, date, userId });
        refetchEvents()
        setOpenEditModal(false);
        setOpenAddModal(false);
    }

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                getEstimatedRowHeight={() => 100}
                getRowHeight={() => 'auto'}
                initialState={{
                    ...rows.initialState,
                    columns: {
                        ...rows.initialState?.column,
                        columnVisibilityModel: {
                            createdAt: false,
                            updatedAt: false
                        },
                    },
                }}
                slots={{
                    toolbar: EditToolbar,
                }}

                sx={{
                    '& .MuiDataGrid-main': {
                        borderTop: '1px solid #e0e0e0',
                    },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    },
                    '& .actions': {
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    },
                    '& .MuiDataGrid-cell--editing': {
                        p: '0.3rem !important',
                    },
                }}
            />

            <PopupModal open={openEditModal || openAddModal} handleClose={handleCloseModal}
                title="Edit User"
                sxBox={{
                    backgroundColor: 'background.paper'
                }}>
                <p style={{ fontSize: '1.4rem', textTransform: 'capitalize' }}>{openEditModal ? `Update "${title}"` : "Add Event"}</p>

                <form onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={title}
                            onChange={handleTitleChange}
                            autoFocus
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            maxRows={10}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={price}
                            onChange={handlePriceChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Location"
                            fullWidth
                            select
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                            value={location}
                            onChange={handleLocationChange}
                            defaultChecked="yishun"
                        >
                            <option value="Ang Mo Kio">Ang Mo Kio</option>
                            <option value="Yishun">Yishun</option>
                        </TextField>
                        <TextField
                            label="Date"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={date}
                            onChange={handleDateChange}
                        />
                        <TextField
                            label="User Id"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={userId}
                            defaultValue={null}
                            onChange={handleUserIdChange}
                        />

                        {
                            openEditModal && (
                                <Button text="Update" type="submit" fullWidth
                                    onClick={handleSubmitUpdate}
                                    sx={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#2a2a2a',
                                        }

                                    }} />
                            ) || (
                                <Button text="Add" type="submit" fullWidth
                                    onClick={handleSubmitUpdate}
                                    sx={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#2a2a2a',
                                        }

                                    }} />
                            )
                        }


                    </Stack>
                </form>
            </PopupModal>
        </>
    );
}