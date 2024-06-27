import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Modal, Select, Stack, TextField, IconButton, FormControl } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from "@mui/material/Tooltip";
import Button from "@/components/Button/CustomButton.module";
import PropTypes from 'prop-types';
import RefreshIcon from '@mui/icons-material/Refresh';

import {
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    DataGrid,
    useGridApiContext,
} from '@mui/x-data-grid';
import { FlareSharp, MoreHoriz } from "@mui/icons-material";
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('member');

    const { data: newData, isFetching, isError, refetch: refetchUsers } = useQuery({
        queryKey: ['user'],
        queryFn: async () => await axios.get("http://localhost:3001/api/admin/users/", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }),
    });

    const handleUpdateToDatabase = async (id, updatedRow) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/admin/user/${id}`, updatedRow, {
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
            const response = await axios.delete(`http://localhost:3001/api/admin/user/${id}`, {
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
                <IconButton onClick={() => refetchUsers()} >
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



    useEffect(() => {
        setRows(newData?.data || [])
    }, [newData]);

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        handleDeleteFromDatabase(id);
    };

    const columns = [
        {
            field: 'id', headerName: 'ID', editable: false, width: 30, maxWidth: 70,
        },
        {
            field: 'username',
            headerName: 'Username',
            type: 'string',
            editable: false,
            flex: 1,
        },
        {
            field: 'password',
            headerName: 'Password',
            type: 'string',
            editable: false,
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'singleSelect',
            editable: false,
            flex: 1,
            // renderEditCell: renderSelectEditInputCell,
            renderCell: (params) => {
                return <span style={{ textTransform: 'capitalize' }}>{params.value}</span>
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
        setUsername(rows.find((row) => row.id === id).username);
        setPassword(rows.find((row) => row.id === id).password);
        setRole(rows.find((row) => row.id === id).role);
    }

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({});
        setUsername('');
        setPassword('');
        setRole('member');
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSelectOptionChange = (event) => {
        setRole(event.target.value);
    }

    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        handleUpdateToDatabase(selectedRow.id, { username, password, role });
        refetchUsers()
        setOpenEditModal(false);
        setOpenAddModal(false);
    }
    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
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


            {/* TODO: Modal for Add User */}

            <PopupModal open={openEditModal || openAddModal} handleClose={handleCloseModal}
                title="Edit User"
                sxBox={{
                    backgroundColor: 'background.paper'
                }}>
                <p style={{ fontSize: '1.4rem', textTransform: 'capitalize' }}>{openEditModal ? `Update User ${username}` : "Add User"}</p>

                <form onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={username}
                            onChange={handleUsernameChange}
                            autoFocus
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Select
                            variant="outlined"
                            fullWidth
                            native
                            size="small"
                            value={role}
                            onChange={handleSelectOptionChange}
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </Select>

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