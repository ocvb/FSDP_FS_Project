import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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

export default function Courses({ postSnackbar }) {
    Events.propTypes = {
        postSnackbar: PropTypes.func.isRequired,
    }

    const { data: newData, isFetching, isError } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => await axios.get("http://localhost:3001/api/courses"),
    });

    const handleUpdateToDatabase = async (id, updatedRow) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/courses/${id}`, updatedRow, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                postSnackbar({ children: 'Course updated successfully', severity: 'success' });
            } else {
                return new Error('Error updating the course');
            }
        } catch (error) {
            setRows(rows.filter((row) => row.id !== id));
            postSnackbar({ children: 'Error updating the course', severity: 'error' });
        }
    };

    const handleDeleteFromDatabase = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/courses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                postSnackbar({ children: 'Event deleted successfully', severity: 'success' });
            } else {
                return new Error('Error deleting the course');
            }
        } catch (error) {
            postSnackbar({ children: 'Error deleting the course', severity: 'error' });
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
            <GridToolbarContainer>
                <Button text="Add record" color="primary" startIcon={<AddIcon />} onClick={handleClick} />
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
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={"Cancel"}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={"Edit"}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={"Delete"}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
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
            getEstimatedRowHeight={() => 200}
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
                '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                    py: 1,
                },
                '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                    py: '15px',
                },
                '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                    py: '22px',
                },
                '& .actions': {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                },
                '& .MuiDataGrid-cell': {
                    backgroundColor: '#f4f4f4',
                },
                '& .MuiDataGrid-cell--editable': {
                    bgcolor: (theme) => {
                        return theme.palette.mode === 'dark' ? '#376331' : 'rgb(252 252 252)'
                    },
                },
                '& .MuiDataGrid-row--editing': {
                    backgroundColor: 'transparent',
                },
            }}
        />
    );
}