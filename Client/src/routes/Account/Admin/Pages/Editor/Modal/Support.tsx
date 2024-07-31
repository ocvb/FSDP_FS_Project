import React, { useState } from 'react';
import axios from 'axios';
import {
    Stack,
    TextField,
    IconButton,
    Alert,
    FormControl,
    Box,
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

interface SupportProps {
    postSnackbar: (data: {
        children?: string;
        severity?: 'success' | 'error' | 'info' | 'warning' | undefined;
    }) => void;
}

interface SelectedRow {
    id?: number;
    location?: string;
    urgency?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function Support({ postSnackbar }: SupportProps) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SelectedRow>({
        id: 0,
        location: '',
        urgency: '',
        description: '',
        createdAt: '',
        updatedAt: '',
    });

    const [location, setLocation] = useState('');
    const [urgency, setUrgency] = useState('');
    const [description, setDescription] = useState('');

    const {
        data: supportData,
        isFetching,
        isError,
        refetch: refetchSupport,
    } = useQuery({
        queryKey: ['support'],
        queryFn: async () =>
            await axios.get('http://localhost:3001/api/support'),
    });

    const createSupportMutation = useMutation({
        mutationKey: ['support'],
        mutationFn: async (data: SelectedRow) => {
            const r = await axios.post(
                'http://localhost:3001/api/support',
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

    const updateSupportMutation = useMutation({
        mutationKey: ['support'],
        mutationFn: async (data: SelectedRow) => {
            const r = await axios.put(
                `http://localhost:3001/api/support/${data.id}`,
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

    const deleteSupportMutation = useMutation({
        mutationKey: ['support'],
        mutationFn: async (data: SelectedRow) => {
            const r = await axios.delete(
                `http://localhost:3001/api/support/${data.id}`,
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

            const rowsIds = supportData?.map((value: SelectedRow) => value?.id);
            const id = Math.max(0, ...rowsIds) + 1;
            setOpenAddModal(true);

            setSelectedRow({ id } as SelectedRow);
        };

        return (
            <GridToolbarContainer
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <Box display={'flex'} flexDirection={'row'} gap={'0.6rem'}>
                    <Button
                        type='button'
                        text='Refresh'
                        startIcon={<RefreshIcon sx={{ fontSize: '25px' }} />}
                        onClick={() => {
                            refetchSupport().catch(() =>
                                console.log('Error refreshing')
                            );
                            postSnackbar({
                                children: 'Support refreshed',
                                severity: 'success',
                            });
                        }}
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#2a2a2a',
                            },
                        }}
                    />
                    <Button
                        type='button'
                        text='Add record'
                        startIcon={
                            <AddIcon sx={{ fontSize: '25px !important' }} />
                        }
                        onClick={handleClick}
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#2a2a2a',
                            },
                        }}
                    />
                </Box>
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
            field: 'location',
            headerName: 'Location',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
            maxWidth: 200,
        },
        {
            field: 'urgency',
            headerName: 'Urgency',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            flex: 1,
            editable: false,
            renderCell: (params: { value: string }) => (
                <ExpandableCell value={params.value} />
            ),
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
                const [dropdown, setDropdown] = useState(false);
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
        const data = supportData?.find(
            (row: SelectedRow) => row?.id === id
        ) as SelectedRow;

        if (data) {
            setOpenEditModal(true);
            setSelectedRow(data);
            setLocation(data.location ?? '');
            setUrgency(data.urgency ?? '');
            setDescription(data.description ?? '');
        } else {
            postSnackbar({
                children: `Support with ID ${id} not found.`,
                severity: 'error',
            });
        }
    };

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({
            id: 0,
            location: '',
            urgency: '',
            description: '',
            createdAt: '',
            updatedAt: '',
        });
        setLocation('');
        setUrgency('');
        setDescription('');
    };

    const handleLocationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocation(event.target.value);
    };

    const handleUrgencyChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUrgency(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleDeleteClick = (id: number) => () => {
        deleteSupportMutation.mutate(
            { id },
            {
                onSuccess: () => {
                    postSnackbar({
                        children: `SupportID (${id}) has been deleted successfully`,
                        severity: 'success',
                    });
                    refetchSupport().catch(() =>
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

    const handleSubmitUpdate = (event: React.FormEvent) => {
        event.preventDefault();

        const data: SelectedRow = {
            id: selectedRow.id,
            location,
            urgency,
            description,
        };

        if (selectedRow.id === 0) {
            createSupportMutation.mutate(data, {
                onSuccess: () => {
                    postSnackbar({
                        children: 'Support created successfully',
                        severity: 'success',
                    });
                    refetchSupport().catch(() =>
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
        } else {
            updateSupportMutation.mutate(data, {
                onSuccess: () => {
                    postSnackbar({
                        children: 'Support updated successfully',
                        severity: 'success',
                    });
                    refetchSupport().catch(() =>
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
        }

        handleCloseModal();
    };

    function ExpandableCell({ value }) {
        const [expanded, setExpanded] = useState(false);
        const length = 300;
        return (
            <div>
                {expanded ? value : value.slice(0, length)}&nbsp;
                {value.length > length && (
                    <Link
                        type='button'
                        component='button'
                        sx={{ fontSize: 'inherit' }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'view less' : 'view more'}
                    </Link>
                )}
            </div>
        );
    }

    return (
        <>
            {isError ? (
                <Alert severity='error'>Error fetching data</Alert>
            ) : (
                <DataGrid
                    rows={supportData ?? []}
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
                        width: '100%',
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
                    {openEditModal
                        ? `Update Support Request`
                        : 'Add Support Request'}
                </p>

                <FormControl onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label='Location'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={location}
                            onChange={handleLocationChange}
                            autoFocus={true}
                        />
                        <TextField
                            label='Urgency'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={urgency}
                            onChange={handleUrgencyChange}
                        />
                        <TextField
                            label='Description'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <Button
                            text={openEditModal ? 'Update' : 'Add'}
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
                    </Stack>
                </FormControl>
            </PopupModal>
        </>
    );
}
