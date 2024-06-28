import React, { useState } from "react";
import axios from "axios";
import { Stack, TextField, IconButton, Alert, Skeleton, LinearProgress, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@components/Button/CustomButton";
import RefreshIcon from '@mui/icons-material/Refresh';

import {
    GridToolbarContainer,
    DataGrid,
} from '@mui/x-data-grid';
import { MoreHoriz } from "@mui/icons-material";
import Dropdown from "@components/Dropdown/Dropdown";
import PopupModal from "@components/PopupModal/PopupModal";
import Loading from "@components/Loading/Loading";

export default function Users({ postSnackbar }) {

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        username: '',
        password: '',
        role: 'Member',
        createdAt: '',
        updatedAt: '',
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Member');

    const { data: usersData, isFetching, isFetched, isError, refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => await axios.get("http://localhost:3001/api/admin/users/", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }),
    });


    const handleUpdateToDatabase = async (id: number, updatedRow: { username: string; password?: string; role?: string; newRow: boolean; }) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/admin/user/${id}`, updatedRow, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                if (updatedRow.newRow) {
                    postSnackbar({ children: `${updatedRow.username} added successfully.`, severity: 'success' });
                } else {
                    postSnackbar({ children: `${updatedRow.username} updated successfully.`, severity: 'success' });
                }
                refetchUsers();
            } else {
                return new Error(`Failed to update ${updatedRow.username}.`);
            }
        } catch (error: any) {
            postSnackbar({ children: error.message, severity: 'error' });
        }
    };

    const handleDeleteFromDatabase = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                postSnackbar({ children: `UserID (${id}) has deleted successfully`, severity: 'success' });
                refetchUsers();
            } else {
                return new Error(`Failed to delete UserID: ${id}.`);
            }
        } catch (error: any) {
            postSnackbar({ children: error.message, severity: 'error' });
        }
    };

    function EditToolbar() {

        const handleClick = () => {
            if (isFetching) return postSnackbar({ children: 'Please wait for the data to load', severity: 'info' });
            const id = Math.max(0, ...usersData?.data.map((row: any) => row.id)) + 1;
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
                <IconButton onClick={() => { refetchUsers(), postSnackbar({ children: 'Users refreshed', severity: 'success' }) }} >
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



    const handleDeleteClick = (id) => () => {
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
            renderCell: (params) => {
                return <span style={{ textTransform: 'capitalize' }}>{params.value}</span>
            }
        },
        { field: 'createdAt', headerName: 'Created At', editable: false },
        { field: 'updatedAt', headerName: 'Updated At', editable: false },
        {
            field: 'action', type: 'actions', headerName: 'Action', cellClassName: 'actions',
            getActions: ({ id }) => {

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

    const handleOpenEditModal = (id: number) => {
        setOpenEditModal(true);
        setSelectedRow(usersData?.data.find((row: { id: number; }) => row.id === id));
        setUsername(usersData?.data.find((row) => row.id === id).username);
        setPassword(usersData?.data.find((row) => row.id === id).password);
        setRole(usersData?.data.find((row) => row.id === id).role);
    }

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({});
        setUsername('');
        setPassword('');
        setRole('member');
    }

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSelectOptionChange = (event: any) => {
        setRole(event.target.value);
    }

    const handleSubmitUpdate = (event: any) => {
        event.preventDefault();
        handleUpdateToDatabase(selectedRow.id, { username, password, role, newRow: openAddModal });
        setOpenEditModal(false);
        setOpenAddModal(false);
        handleCloseModal();
    }

    return (
        <>
            {isError
                ? <Alert severity="error">Error fetching data</Alert>
                : (
                    <DataGrid
                        rows={usersData?.data || []}
                        columns={columns}
                        disableSelectionOnClick
                        disableColumnResize
                        loading={isFetching}
                        initialState={{
                            columns: {
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
                )}

            <PopupModal
                open={openEditModal || openAddModal}
                handleClose={handleCloseModal}
                sxBox={{
                    backgroundColor: 'background.paper'
                }}>
                <p style={{ fontSize: '1.4rem', textTransform: 'capitalize' }}>{openEditModal ? `Update "${username}"` : "Add User"}</p>

                <form onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={username}
                            onChange={handleUsernameChange}
                            autoFocus={true}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Role"
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                            select
                            size="small"
                            value={role}
                            onChange={handleSelectOptionChange}
                        >
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                        </TextField>

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