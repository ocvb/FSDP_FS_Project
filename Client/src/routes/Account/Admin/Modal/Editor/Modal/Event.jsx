import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from "@mui/material/Tooltip";
import Button from "@/components/Button/CustomButton.module";
import PropTypes from 'prop-types';

import {
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    DataGrid,
} from '@mui/x-data-grid';


export default function Events({ postSnackbar }) {
    Events.propTypes = {
        postSnackbar: PropTypes.func.isRequired,
    }

    const { data: newData, isFetching, isError } = useQuery({
        queryKey: ['events'],
        queryFn: async () => await axios.get("http://localhost:3001/api/admin/events", {
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


    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = Math.max(0, ...rows.map((row) => row.id)) + 1;
            setRows((oldRows) => [...oldRows, { id, updatedAt: 'NA', createdAt: 'NA', isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title', isNew: true },
            }));
        };

        return (
            <GridToolbarContainer sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                alignItems: 'center',
                padding: '1rem',

            }}>
                <Button text="Add record" color="primary" startIcon={<AddIcon sx={{ marginLeft: 0 }} />} onClick={handleClick} sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#2a2a2a',
                    }

                }} />
            </GridToolbarContainer>
        );
    }

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    useEffect(() => {
        setRows(newData?.data || [])
    }, [newData]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => async () => {
        const row = rows.find((row) => row.id === id);
        handleUpdateToDatabase(id, row);
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        handleDeleteFromDatabase(id);
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        handleUpdateToDatabase(newRow.id, newRow);
        return updatedRow;
    };

    const handleCancelClick = (id) => () => {
        if (rowModesModel[id]?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
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




    const columns = [
        {
            field: 'id', headerName: 'ID', editable: false, width: 30, maxWidth: 70,
        },
        {
            field: 'title',
            headerName: 'Title',
            type: 'string',
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            flex: 1,
            editable: true,
            renderCell: (params) => <ExpandableCell {...params} />,
        },
        {
            field: 'location',
            headerName: 'Location',
            type: 'string',
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Date',
            type: 'date',
            editable: true,
            width: 130,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.formattedValue}>
                        <span>{params.formattedValue}</span>
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
            editable: true,
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
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={"Save"}
                            icon={<SaveIcon sx={{ color: '#0c9878', fontSize: 25 }} />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={"Cancel"}
                            icon={<CancelIcon sx={{ color: 'darkred', fontSize: 25 }} />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}

                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={"Edit"}
                        icon={<EditIcon sx={{ color: '#0c9878', fontSize: 25 }} />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                    />,
                    <GridActionsCellItem
                        key={"Delete"}
                        icon={<DeleteIcon sx={{ color: 'darkred', fontSize: 25 }} />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                    />,
                ];
            },
        }
    ];
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            getRowHeight={() => 'auto'}
            // getEstimatedRowHeight={() => 200}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: EditToolbar,
            }}
            slotProps={{
                toolbar: { setRows, setRowModesModel },
            }}
            sx={{
                '& .MuiDataGrid-main': {
                    borderTop: '1px solid #e0e0e0',
                },
                '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                    py: '15px',
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
                    backgroundColor: '#f4f4f4',
                },
                '& .MuiDataGrid-cell--editing': {
                    p: '0.3rem !important',
                    borderRight: '1px solid #e0e0e0',
                },
                '& .MuiDataGrid-cell--editable': {
                    bgcolor: (theme) => {
                        return theme.palette.mode === 'dark' ? '#376331' : 'rgb(252 252 252)'
                    },
                },
                '& .MuiDataGrid-row--editing': {
                    '& .MuiDataGrid-cell': {
                        backgroundColor: 'unset',

                    }
                },
            }}
        />
    );
}