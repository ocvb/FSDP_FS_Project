import React, { useState } from 'react';
import {
    Stack,
    TextField,
    IconButton,
    Link,
    Alert,
    Box,
    SelectChangeEvent,
    FormControl,
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

import { callAPI, fetchCourses } from '@api/EndpointsQueries';
import { CoursesDataResponse } from '@api/ApiType';
import EditorSelector from '@components/Admin/EditorSelector';

interface CourseProps {
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
    category?: string;
}

export default function Course({
    postSnackbar,
    handleOnChangeSelect,
    selectedCategory,
}: CourseProps) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        title: '',
        description: '',
        category: '',
    } as SelectedRow);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const {
        data: courseData,
        isFetching,
        isError,
        refetch: refetchCourses,
    } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
    });

    const courseUpdateMutation = useMutation({
        mutationKey: ['courses'],
        mutationFn: async (data: CoursesDataResponse) => {
            console.log(data);
            const response = await callAPI.put<CoursesDataResponse[]>(
                `/admin/course/${data?.id}`,
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

    const courseDeleteMutation = useMutation({
        mutationKey: ['courses'],
        mutationFn: async (data: CoursesDataResponse) => {
            const response = await callAPI.delete<CoursesDataResponse[]>(
                `/admin/course/${data?.id}`,
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
            const rowsIds = courseData.map((value) => value?.id);
            const id = Math.max(0, ...rowsIds) + 1;
            setOpenAddModal(true);

            interface data {
                id?: number;
            }

            setSelectedRow({ id } as data);
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
                            refetchCourses().catch(() =>
                                console.log('Error refreshing')
                            ),
                                postSnackbar({
                                    children: 'Courses refreshed',
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
        courseDeleteMutation.mutate(
            { id },
            {
                onSuccess: () => {
                    postSnackbar({
                        children: 'Course deleted successfully',
                        severity: 'success',
                    });
                    refetchCourses().catch(() => {
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
            field: 'category',
            headerName: 'Category',
            type: 'string',
            flex: 1,
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
        const row = courseData?.find(
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
            setDescription(row?.description ?? '');
            setCategory(row?.category ?? '');
        }
    };

    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenAddModal(false);
        setSelectedRow({
            id: 0,
            title: '',
            description: '',
            category: '',
        });
    };

    const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        interface data {
            id: number;
            title: string;
            description: string;
            category: string;
        }

        const data = {
            id: selectedRow.id,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
        } as data;

        courseUpdateMutation.mutate(data, {
            onSuccess: () => {
                postSnackbar({
                    children: `${title} updated successfully`,
                    severity: 'success',
                });
                refetchCourses().catch(() => {
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
                    rows={courseData ?? []}
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
                        footer: () => null,
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

                <FormControl
                    component={'form'}
                    onSubmit={(e) => {
                        handleSubmitUpdate(e);
                    }}
                >
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            label='Title'
                            name='title'
                            variant='outlined'
                            fullWidth
                            size='small'
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label='Description'
                            name='description'
                            variant='outlined'
                            fullWidth
                            multiline
                            maxRows={10}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label='Category'
                            name='category'
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        {(openEditModal && (
                            <Button
                                text='Update'
                                type='submit'
                                fullWidth
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
