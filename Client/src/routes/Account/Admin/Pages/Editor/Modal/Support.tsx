import React, { useState } from 'react';
import { Stack, TextField, IconButton, Alert, Box } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@components/Button/CustomButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { GridToolbarContainer, DataGrid } from '@mui/x-data-grid';
import PopupModal from '@components/PopupModal/PopupModal';
import {
    fetchSupportRequests,
    updateSupportRequest,
    deleteSupportRequest,
} from '@api/EndpointsQueries';
import { SupportDataResponse } from '@api/ApiType';

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
    reply?: string;
}

export default function SupportEditor({ postSnackbar }: SupportProps) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SelectedRow>({
        id: 0,
        location: '',
        urgency: '',
        description: '',
        reply: '',
    });
    const [reply, setReply] = useState('');

    const {
        data: supportData,
        isFetching,
        isError,
        refetch: refetchSupport,
    } = useQuery({
        queryKey: ['support'],
        queryFn: fetchSupportRequests,
    });

    const updateSupportMutation = useMutation({
        mutationKey: ['support'],
        mutationFn: async (data: SelectedRow) =>
            updateSupportRequest(data.id!, data),
    });

    const deleteSupportMutation = useMutation({
        mutationKey: ['support'],
        mutationFn: (id: number) => deleteSupportRequest(id),
    });

    function EditToolbar() {
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
                <Button
                    type='button'
                    text='Refresh'
                    startIcon={<RefreshIcon sx={{ fontSize: '25px' }} />}
                    onClick={() => {
                        refetchSupport().catch(() =>
                            console.log('Error refreshing')
                        );
                        postSnackbar({
                            children: 'Support requests refreshed',
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
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'reply',
            headerName: 'Reply',
            type: 'string',
            editable: false,
            flex: 1,
            width: 0,
        },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Action',
            width: 0,
            cellClassName: 'actions',
            getActions: ({ id }: { id: number }) => {
                const handleOpenEditModal = () => {
                    const data = supportData?.find(
                        (row: SelectedRow) => row?.id === id
                    ) as SelectedRow;

                    if (data) {
                        setOpenEditModal(true);
                        setSelectedRow(data);
                        setReply(data.reply ?? '');
                    } else {
                        postSnackbar({
                            children: `Support request with ID ${id} not found.`,
                            severity: 'error',
                        });
                    }
                };

                const handleDeleteClick = () => {
                    deleteSupportMutation.mutate(id, {
                        onSuccess: () => {
                            postSnackbar({
                                children: `Support request (${id}) has been deleted successfully`,
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
                };

                return [
                    <IconButton
                        key={'edit'}
                        onClick={handleOpenEditModal}
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:hover': {
                                outline: 'none',
                            },
                        }}
                    >
                        <EditIcon />
                    </IconButton>,
                    <IconButton
                        key={'delete'}
                        onClick={handleDeleteClick}
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:hover': {
                                outline: 'none',
                            },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>,
                ];
            },
        },
    ];

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setSelectedRow({
            id: 0,
            location: '',
            urgency: '',
            description: '',
            reply: '',
        });
        setReply('');
    };

    const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReply(event.target.value);
    };

    const handleSubmitUpdate = (event: React.FormEvent) => {
        event.preventDefault();

        const data: SelectedRow = {
            id: selectedRow.id,
            location: selectedRow.location,
            urgency: selectedRow.urgency,
            description: selectedRow.description,
            reply: reply,
        };

        updateSupportMutation.mutate(data, {
            onSuccess: () => {
                postSnackbar({
                    children: 'Support request updated successfully',
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

        handleCloseModal();
    };

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
                open={openEditModal}
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
                    {`Update Support Request ID: ${selectedRow.id}`}
                </p>

                <form onSubmit={handleSubmitUpdate}>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label='Reply'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={reply}
                            onChange={handleReplyChange}
                            autoFocus={true}
                        />
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
                    </Stack>
                </form>
            </PopupModal>
        </>
    );
}
