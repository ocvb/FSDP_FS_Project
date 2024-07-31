import React, { useState } from 'react';
import axios from 'axios';
import {
    Stack,
    TextField,
    IconButton,
    Alert,
    FormControl,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@/components/Button/CustomButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { GridToolbarContainer, DataGrid } from '@mui/x-data-grid';
import { MoreHoriz } from '@mui/icons-material';
import Dropdown from '@components/Dropdown/Dropdown';
import PopupModal from '@components/PopupModal/PopupModal';

interface RewardsProps {
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
    points?: number;
    claimed?: boolean;
    popular?: boolean;
    endDate?: string | null;
    imageUrl?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function AdminRewards({ postSnackbar }: RewardsProps) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SelectedRow>({
        id: 0,
        title: '',
        description: '',
        points: 0,
        claimed: false,
        popular: false,
        endDate: null,
        imageUrl: '',
        category: '',
        createdAt: '',
        updatedAt: '',
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(0);
    const [claimed, setClaimed] = useState(false);
    const [popular, setPopular] = useState(false);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');

    const {
        data: rewardsData,
        isFetching,
        isError,
        refetch: refetchRewards,
    } = useQuery({
        queryKey: ['rewards'],
        queryFn: async () =>
            await axios.get('http://localhost:3001/api/rewards'),
    });

    const createRewardMutation = useMutation({
        mutationKey: ['rewards'],
        mutationFn: async (data: SelectedRow) => {
            const r = await axios.post(
                'http://localhost:3001/api/rewards',
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

    const updateRewardMutation = useMutation({
        mutationKey: ['rewards'],
        mutationFn: async (data: SelectedRow) => {
            const r = await axios.put(
                `http://localhost:3001/api/rewards/${data.id}`,
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

    const deleteRewardMutation = useMutation({
        mutationKey: ['rewards'],
        mutationFn: async (data: SelectedRow) => {
            const r = await axios.delete(
                `http://localhost:3001/api/rewards/${data.id}`,
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

            const rowsIds = rewardsData?.map((value: SelectedRow) => value?.id);
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
                            refetchRewards().catch(() =>
                                console.log('Error refreshing')
                            );
                            postSnackbar({
                                children: 'Rewards refreshed',
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
            field: 'title',
            headerName: 'Title',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
            maxWidth: 200,
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'points',
            headerName: 'Points',
            type: 'number',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'claimed',
            headerName: 'Claimed',
            type: 'boolean',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'popular',
            headerName: 'Popular',
            type: 'boolean',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'imageUrl',
            headerName: 'Image URL',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'category',
            headerName: 'Category',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
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
        const data = rewardsData?.find(
            (row: SelectedRow) => row?.id === id
        ) as SelectedRow;

        if (data) {
            setOpenEditModal(true);
            setSelectedRow(data);
            setTitle(data.title ?? '');
            setDescription(data.description ?? '');
            setPoints(data.points ?? 0);
            setClaimed(data.claimed ?? false);
            setPopular(data.popular ?? false);
            setEndDate(data.endDate ?? null);
            setImageUrl(data.imageUrl ?? '');
            setCategory(data.category ?? '');
        } else {
            postSnackbar({
                children: `Reward with ID ${id} not found.`,
                severity: 'error',
            });
        }
    };

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({
            id: 0,
            title: '',
            description: '',
            points: 0,
            claimed: false,
            popular: false,
            endDate: null,
            imageUrl: '',
            category: '',
            createdAt: '',
            updatedAt: '',
        });
        setTitle('');
        setDescription('');
        setPoints(0);
        setClaimed(false);
        setPopular(false);
        setEndDate(null);
        setImageUrl('');
        setCategory('');
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoints(Number(event.target.value));
    };

    const handleClaimedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setClaimed(event.target.checked);
    };

    const handlePopularChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPopular(event.target.checked);
    };

    const handleEndDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndDate(event.target.value);
    };

    const handleImageUrlChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setImageUrl(event.target.value);
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCategory(event.target.value);
    };

    const handleDeleteClick = (id: number) => () => {
        deleteRewardMutation.mutate(
            { id },
            {
                onSuccess: () => {
                    postSnackbar({
                        children: `RewardID (${id}) has been deleted successfully`,
                        severity: 'success',
                    });
                    refetchRewards().catch(() =>
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
            title,
            description,
            points,
            claimed,
            popular,
            endDate,
            imageUrl,
            category,
        };

        if (selectedRow.id === 0) {
            createRewardMutation.mutate(data, {
                onSuccess: () => {
                    postSnackbar({
                        children: 'Reward created successfully',
                        severity: 'success',
                    });
                    refetchRewards().catch(() =>
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
            updateRewardMutation.mutate(data, {
                onSuccess: () => {
                    postSnackbar({
                        children: 'Reward updated successfully',
                        severity: 'success',
                    });
                    refetchRewards().catch(() =>
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

    return (
        <>
            {isError ? (
                <Alert severity='error'>Error fetching data</Alert>
            ) : (
                <DataGrid
                    rows={rewardsData ?? []}
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
                    {openEditModal ? `Update "${title}"` : 'Add Reward'}
                </p>

                <FormControl onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label='Title'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={title}
                            onChange={handleTitleChange}
                            autoFocus={true}
                        />
                        <TextField
                            label='Description'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <TextField
                            label='Points'
                            variant='outlined'
                            fullWidth
                            size='small'
                            type='number'
                            value={points}
                            onChange={handlePointsChange}
                        />
                        <TextField
                            label='Category'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={category}
                            onChange={handleCategoryChange}
                        />
                        <TextField
                            label='Image URL'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                        />
                        <TextField
                            label='End Date'
                            variant='outlined'
                            fullWidth
                            size='small'
                            type='date'
                            value={endDate || ''}
                            onChange={handleEndDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <label>
                            <input
                                type='checkbox'
                                checked={claimed}
                                onChange={handleClaimedChange}
                            />
                            Claimed
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                checked={popular}
                                onChange={handlePopularChange}
                            />
                            Popular
                        </label>
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
