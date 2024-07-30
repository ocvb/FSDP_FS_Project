import React, { useState } from 'react';
import axios from 'axios';
import {
    Stack,
    TextField,
    IconButton,
    Link,
    Alert,
    Box,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@components/Button/CustomButton';
import RefreshIcon from '@mui/icons-material/Refresh';

import { GridToolbarContainer, DataGrid } from '@mui/x-data-grid';
import { MoreHoriz } from '@mui/icons-material';
import Dropdown from '@components/Dropdown/Dropdown';
import PopupModal from '@components/PopupModal/PopupModal';

import { fetchEvents } from '@api/EndpointsQueries';
import { EventsDataResponse } from '@api/ApiType';
import EditorSelector from '@components/Admin/EditorSelector';

interface EventsProps {
    postSnackbar: (data: {
        children?: string;
        severity?: 'success' | 'error' | 'info' | 'warning' | undefined;
    }) => void;
    handleOnChangeSelect: (event: SelectChangeEvent<number>) => void;
    selectedCategory: number;
}

interface SelectedRow {
    id?: number;
    title?: string;
    description?: string;
    location?: string;
    price?: number;
    date?: string;
    userId?: number | null;
}

export default function Events({
    postSnackbar,
    handleOnChangeSelect,
    selectedCategory,
}: EventsProps) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        title: '',
        description: '',
        location: '',
        price: 0,
        date: '',
        userId: null,
    } as SelectedRow);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Yishun');
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState(
        new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    );
    const [userId, setUserId] = useState(0);

    const {
        data: eventsData,
        isFetching,
        isError,
        refetch: refetchEvents,
    } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    const eventUpdateMutation = useMutation({
        mutationKey: ['events'],
        mutationFn: async (data: EventsDataResponse['data']) => {
            console.log(data);
            const response = await axios.put<EventsDataResponse>(
                `http://localhost:3001/api/admin/event/${data?.id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return response.data;
        },
    });

    const eventDeleteMutation = useMutation({
        mutationKey: ['events'],
        mutationFn: async (data: EventsDataResponse['data']) => {
            const response = await axios.delete<EventsDataResponse>(
                `http://localhost:3001/api/admin/event/${data?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return response.data;
        },
    });

    function EditToolbar() {
        const handleClick = () => {
            if (isFetching)
                return postSnackbar({
                    children: 'Please wait for the data to load',
                    severity: 'info',
                });
            const rowsIds = eventsData?.map((value) => value?.id);
            const id = Math.max(0, ...rowsIds) + 1;
            setOpenAddModal(true);

            interface EventData {
                id?: number;
            }

            setSelectedRow({ id } as EventData);
        };

        return (
            <GridToolbarContainer
                sx={{
                    display: 'flex',
                    justifyContent: ' space-between',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: '1rem',
                    }}
                >
                    <EditorSelector
                        selectedCategory={selectedCategory}
                        handleOnChangeSelect={handleOnChangeSelect}
                    />
                </Box>
                <Box display={'flex'} flexDirection={'row'} gap={'0.6rem'}>
                    <Button
                        type='button'
                        text='Refresh'
                        startIcon={<RefreshIcon sx={{ fontSize: '25px' }} />}
                        onClick={() => {
                            refetchEvents().catch(() =>
                                console.log('Error refreshing')
                            ),
                                postSnackbar({
                                    children: 'Events refreshed',
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

    function ExpandableCell(param: { value: string }) {
        const [expanded, setExpanded] = useState(false);
        const length = 300;
        return (
            <div>
                {expanded ? param.value : param.value.slice(0, length)}
                &nbsp;
                {param.value.length > length && (
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

    const handleDeleteClick = (id: number) => () => {
        eventDeleteMutation.mutate(
            { id },
            {
                onSuccess: () => {
                    postSnackbar({
                        children: 'Event deleted successfully',
                        severity: 'success',
                    });
                    refetchEvents().catch(() => {
                        console.log('Error refreshing');
                    });
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

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 30,
            maxWidth: 70,
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
            renderCell: (params: { formattedValue: string }) => {
                return (
                    <Tooltip title={params.formattedValue}>
                        <span>
                            {new Date(params.formattedValue).toLocaleDateString(
                                'en-GB',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                }
                            )}
                        </span>
                    </Tooltip>
                );
            },
            valueGetter: (value: string) => {
                const date = new Date(value);
                return date;
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            renderCell: (params: { value: number }) => {
                if (params.value === 0) {
                    return 'Free';
                } else if (params.value > 0) {
                    return `$${params.value.toFixed(2)}`;
                }
                return params.value;
            },
        },
        {
            field: 'userId',
            headerName: 'Assigned ID(s)',
            type: 'number',
            editable: false,
            width: 160,
            renderCell: (params: { value: number }) => {
                if (params.value === null) {
                    return '-';
                }
                return params.value;
            },
        },
        { field: 'createdAt', headerName: 'Created At', editable: false },
        { field: 'updatedAt', headerName: 'Updated At', editable: false },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Action',
            cellClassName: 'actions',
            getActions: ({ id }: { id: number }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
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
        const row = eventsData?.find(
            (value) => value?.id === id
        ) as SelectedRow;
        if (row === undefined || row === null) {
            return postSnackbar({
                children: 'Error fetching data',
                severity: 'error',
            });
        }
        if (row) {
            setOpenEditModal(true);
            setSelectedRow(row);
            setTitle(row?.title ?? '');
            setDescription(
                row?.description ?? 'No description available for this event'
            );
            setDate(row?.date ?? '');
            setPrice(row?.price ?? 0);
            setUserId(row?.userId ?? 0);
        }
    };

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({
            id: 0,
            title: '',
            description: '',
            location: '',
            price: 0,
            date: '',
            userId: null,
        });
        setTitle('');
        setDescription('');
        setPrice(0);
        setDate('');
        setUserId(0);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(event.target.value));
    };

    const handleLocationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocation(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(Number(event.target.value) ?? null);
    };

    const handleSubmitUpdate = (event: React.FormEvent) => {
        event.preventDefault();

        interface EventData {
            id: number;
            title: string;
            description: string;
            location: string;
            price: number;
            date: string;
            userId: number | null;
        }

        const eventData = {
            id: selectedRow.id,
            title,
            description,
            location,
            price,
            date,
            userId: userId === null ? null : userId ?? 0,
        } as EventData;

        eventUpdateMutation.mutate(eventData, {
            onSuccess: () => {
                postSnackbar({
                    children: 'Event updated successfully',
                    severity: 'success',
                });
                refetchEvents().catch(() => {
                    console.log('Error refreshing');
                });
            },
            onError: (error) => {
                postSnackbar({ children: error.message, severity: 'error' });
            },
        });
        setOpenEditModal(false);
        setOpenAddModal(false);
    };

    return (
        <>
            {isError ? (
                <Alert severity='error'>Error fetching data</Alert>
            ) : (
                <DataGrid
                    rows={eventsData ?? []}
                    columns={columns}
                    getEstimatedRowHeight={() => 100}
                    getRowHeight={() => 'auto'}
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
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell':
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
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
                    {openEditModal ? `Update "${title}"` : 'Add Event'}
                </p>

                <form onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label='Title'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={title}
                            onChange={handleTitleChange}
                            autoFocus
                        />
                        <TextField
                            label='Description'
                            variant='outlined'
                            fullWidth
                            multiline
                            maxRows={10}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <TextField
                            label='Price'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={price}
                            onChange={handlePriceChange}
                        />
                        <TextField
                            variant='outlined'
                            label='Location'
                            fullWidth
                            select
                            SelectProps={{
                                native: true,
                            }}
                            size='small'
                            value={location}
                            onChange={handleLocationChange}
                            defaultChecked={true}
                        >
                            <option value='Ang Mo Kio'>Ang Mo Kio</option>
                            <option value='Yishun'>Yishun</option>
                        </TextField>
                        <TextField
                            label='Date'
                            type='date'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={date}
                            onChange={handleDateChange}
                        />
                        <TextField
                            label='User Id'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={userId}
                            defaultValue={null}
                            onChange={handleUserIdChange}
                        />

                        {(openEditModal && (
                            <Button
                                text='Update'
                                type='submit'
                                fullWidth
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
                                fullWidth
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
                </form>
            </PopupModal>
        </>
    );
}
