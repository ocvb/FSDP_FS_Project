import React, { useState } from 'react';
import axios from 'axios';
import {
    Stack,
    TextField,
    IconButton,
    Alert,
    FormControl,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@components/Button/CustomButton';
import RefreshIcon from '@mui/icons-material/Refresh';

import { GridToolbarContainer, DataGrid } from '@mui/x-data-grid';
import { MoreHoriz } from '@mui/icons-material';
import Dropdown from '@components/Dropdown/Dropdown';
import PopupModal from '@components/PopupModal/PopupModal';
import { fetchUsers } from '@api/EndpointsQueries';
import { UsersDataResponse } from '@api/ApiType';
import zIndex from '@mui/material/styles/zIndex';

interface UsersProps {
    postSnackbar: (data: {
        children?: string;
        severity?: 'success' | 'error' | 'info' | 'warning' | undefined;
    }) => void;
}

interface SelectedRow {
    id?: number;
    username?: string;
    password?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function Users({ postSnackbar }: UsersProps) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        username: '',
        password: '',
        role: 'Member',
        createdAt: '',
        updatedAt: '',
    } as SelectedRow);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Member');

    const {
        data: usersData,
        isFetching,
        isError,
        refetch: refetchUsers,
    } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const usersMutation = useMutation({
        mutationKey: ['users'],
        mutationFn: async (data: UsersDataResponse['data']) => {
            const r = await axios.put<UsersDataResponse>(
                `http://localhost:3001/api/admin/user/${data?.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return r.data;
        },
    });

    const userDeleteMutation = useMutation({
        mutationKey: ['users'],
        mutationFn: async (data: UsersDataResponse['data']) => {
            const r = await axios.delete<UsersDataResponse>(
                `http://localhost:3001/api/admin/user/${data?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return r.data;
        },
    });

    function EditToolbar() {
        const handleClick = () => {
            if (isFetching)
                return postSnackbar({
                    children: 'Please wait for the data to load',
                    severity: 'info',
                });
            const rowsIds = usersData?.map((value) => value?.id);
            const id = Math.max(0, ...rowsIds) + 1;
            setOpenAddModal(true);

            interface UserData {
                id?: number;
            }
            setSelectedRow({ id } as UserData);
        };

        return (
            <GridToolbarContainer
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <IconButton
                    onClick={() => {
                        refetchUsers().catch(console.error),
                            postSnackbar({
                                children: 'Users refreshed',
                                severity: 'success',
                            });
                    }}
                >
                    <RefreshIcon sx={{ fontSize: 25, color: 'black' }} />
                </IconButton>
                <Button
                    type='button'
                    text='Add record'
                    startIcon={<AddIcon sx={{ fontSize: '25px !important' }} />}
                    onClick={handleClick}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2a2a2a',
                        },
                    }}
                />
            </GridToolbarContainer>
        );
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            editable: false,
            width: 30,
            maxWidth: 70,
        },
        {
            field: 'username',
            headerName: 'Username',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'password',
            headerName: 'Password',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'singleSelect',
            editable: false,
            flex: 1,
            width: 0,
            renderCell: (params: {
                value:
                    | string
                    | number
                    | boolean
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
            }) => {
                return (
                    <span style={{ textTransform: 'capitalize' }}>
                        {params.value}
                    </span>
                );
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            editable: false,
            width: 0,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            editable: false,
            width: 0,
        },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Action',
            width: 0,
            cellClassName: 'actions',
            getActions: ({ id }: { id: number }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [dropdown, setDropdown] = React.useState(false);
                const buttons = [
                    {
                        name: 'Edit',
                        action: () => handleOpenEditModal(id),
                        icon: <EditIcon />,
                    },
                    {
                        name: 'Delete',
                        action: handleDeleteClick(id),
                        icon: <DeleteIcon />,
                    },
                ];

                const handleOpenDropdown = () => {
                    setDropdown(!dropdown);
                };

                const handleWhenMouseLeave = () => {
                    setDropdown(false);
                };

                return [
                    <div key={'dropdown'}>
                        <IconButton
                            key={'IconButton'}
                            onClick={handleOpenDropdown}
                            sx={{
                                '&:focus': {
                                    outline: 'none',
                                },
                                '&:hover': {
                                    outline: 'none',
                                },
                            }}
                        >
                            <MoreHoriz />
                        </IconButton>
                        <Dropdown
                            key={'More'}
                            dropdown={dropdown}
                            onMouseDown={handleOpenDropdown}
                            onMouseLeave={handleWhenMouseLeave}
                            subitems={buttons}
                            style={{
                                transform: 'translateX(-50%)',
                            }}
                        />
                    </div>,
                ];
            },
        },
    ];

    const handleOpenEditModal = (id: number) => {
        const data = usersData?.find((row) => row?.id === id) as SelectedRow;

        if (data) {
            setOpenEditModal(true);
            setSelectedRow(data);
            setUsername(data.username ?? '');
            setPassword(data.password ?? '');
            setRole(data.role ?? 'Member');
        } else {
            postSnackbar({
                children: `User with ID ${id} not found.`,
                severity: 'error',
            });
        }
    };
    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({
            id: 0,
            username: '',
            password: '',
            role: 'Member',
            updatedAt: '',
            createdAt: '',
        });
        setUsername('');
        setPassword('');
        setRole('member');
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSelectOptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRole(event.target.value);
    };

    const handleDeleteClick = (id: number) => () => {
        
        userDeleteMutation.mutate(
            { id },
            {
                onSuccess: () => {
                    postSnackbar({
                        children: `UserID (${id}) has deleted successfully`,
                        severity: 'success',
                    });
                    refetchUsers().catch(() =>
                        postSnackbar({
                            children: 'Error refreshing',
                            severity: 'error',
                        })
                    );
                },
                onError: (error) => {
                    postSnackbar({
                        children: error.message,
                        severity: 'error',
                    });
                },
            }
        );
    };

    const handleSubmitUpdate = (event) => {
        event.preventDefault();

        interface UserData {
            id?: number;
            username?: string;
            password?: string;
            role?: string;
        }

        console.log(selectedRow.id);

        const data = {
            id: selectedRow.id,
            username,
            password,
            role,
        } as UserData;

        usersMutation.mutate(data, {
            onSuccess: () => {
                postSnackbar({
                    children: 'User updated successfully',
                    severity: 'success',
                });
                refetchUsers().catch(() =>
                    postSnackbar({
                        children: 'Error refreshing',
                        severity: 'error',
                    })
                );
            },
            onError: (error) => {
                postSnackbar({
                    children: error.message,
                    severity: 'error',
                });
            },
        });

        setOpenEditModal(false);
        setOpenAddModal(false);
        handleCloseModal();
    };

    return (
        <>
            {isError ? (
                <Alert severity='error'>Error fetching data</Alert>
            ) : (
                <DataGrid
                    rows={usersData ?? []}
                    columns={columns}
                    disableSelectionOnClick
                    disableColumnResize
                    loading={isFetching}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                createdAt: false,
                                updatedAt: false,
                            },
                        },
                    }}
                    slots={{
                        toolbar: EditToolbar,
                        pagination: () => null,
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
                        '& .MuiDataGrid-cell': {
                            '&:hover ': {
                                outline: 'none',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
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
                    backgroundColor: 'background.paper',
                }}
            >
                <p
                    style={{
                        fontSize: '1.4rem',
                        textTransform: 'capitalize',
                    }}
                >
                    {openEditModal ? `Update "${username}"` : 'Add User'}
                </p>

                <FormControl onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label='Username'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={username}
                            onChange={handleUsernameChange}
                            autoFocus={true}
                        />
                        <TextField
                            label='Password'
                            variant='outlined'
                            fullWidth
                            size='small'
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            variant='outlined'
                            label='Role'
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                            select
                            size='small'
                            value={role}
                            onChange={handleSelectOptionChange}
                        >
                            <option value='Member'>Member</option>
                            <option value='Admin'>Admin</option>
                        </TextField>

                        {(openEditModal && (
                            <Button
                                text='Update'
                                type='submit'
                                fullWidth={true}
                                onClick={handleSubmitUpdate}
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#2a2a2a',
                                    },
                                }}
                            />
                        )) || (
                            <Button
                                text='Add'
                                type='submit'
                                fullWidth={true}
                                onClick={handleSubmitUpdate}
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#2a2a2a',
                                    },
                                }}
                            />
                        )}
                    </Stack>
                </FormControl>
            </PopupModal>
        </>
    );
}
