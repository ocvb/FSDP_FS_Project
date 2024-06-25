import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Select } from "@mui/material";
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
    useGridApiContext,
} from '@mui/x-data-grid';
import { FlareSharp, MoreHoriz } from "@mui/icons-material";
import Dropdown from "@/components/Dropdown/Dropdown.module";


export default function Users({ postSnackbar }) {
    Users.propTypes = {
        postSnackbar: PropTypes.func.isRequired,
    }

    const { data: newData, isFetching, isError } = useQuery({
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


    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = Math.max(0, ...rows.map((row) => row.id)) + 1;
            setRows((oldRows) => [...oldRows, { id, role: 'member', updatedAt: 'NA', createdAt: 'NA', isNew: true }]);
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



    function SelectEditInputCell(props) {
        const { id, value, field } = props;
        const apiRef = useGridApiContext();

        const handleChange = async (event) => {
            await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
            apiRef.current.stopCellEditMode({ id, field });
        };

        return (
            <Select
                value={value}
                onChange={handleChange}
                size="small"
                sx={{ height: 1, width: '100%', }}
                native
                autoFocus
            >
                <option>member</option>
                <option>admin</option>
            </Select>
        );
    }

    const renderSelectEditInputCell = (params) => {
        return <SelectEditInputCell {...params} />;
    };

    const columns = [
        {
            field: 'id', headerName: 'ID', editable: false, width: 30, maxWidth: 70,
        },
        {
            field: 'username',
            headerName: 'Username',
            type: 'string',
            editable: true,
            flex: 1,
        },
        {
            field: 'password',
            headerName: 'Password',
            type: 'string',
            editable: true,
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'singleSelect',
            editable: true,
            flex: 1,
            renderEditCell: renderSelectEditInputCell,
        },
        { field: 'createdAt', headerName: 'Created At', editable: false },
        { field: 'updatedAt', headerName: 'Updated At', editable: false },
        {
            field: 'action', type: 'actions', headerName: 'Action', cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                const [dropdown, setDropdown] = useState(false)
                const buttons = [
                    {
                        submenu: [
                            { name: "Save" },
                            { name: "Cancel" }
                        ],
                    }, {
                        submenu: [
                            {
                                name: "Edit",
                                action: handleEditClick(id),

                            },
                            {
                                name: "Delete",
                                action: handleDeleteClick(id),

                            }
                        ]
                    }

                ]



                const handleOpenDropdown = () => {
                    setDropdown(!dropdown)
                }


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
                        icon={< EditIcon sx={{ color: '#0c9878', fontSize: 25 }} />}
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
                '& .actions': {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                },
                '& .MuiDataGrid-cell': {
                    backgroundColor: '#f4f4f4',

                },
                '& .MuiDataGrid-cell--editing': {
                    borderRight: '1px solid #e0e0e0',
                    p: '0.3rem !important',
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