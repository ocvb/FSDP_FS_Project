// import {
//     JSXElementConstructor,
//     ReactElement,
//     ReactNode,
//     useState,
// } from 'react';
// import axios from 'axios';
// import { Stack, TextField, IconButton, Link, Alert } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Tooltip from '@mui/material/Tooltip';
// import Button from '@components/Button/CustomButton';
// import RefreshIcon from '@mui/icons-material/Refresh';

// import { GridToolbarContainer, DataGrid } from '@mui/x-data-grid';
// import { MoreHoriz } from '@mui/icons-material';
// import Dropdown from '@components/Dropdown/Dropdown';
// import PopupModal from '@/components/PopupModal/PopupModal';

// export default function Users({ postSnackbar }) {
//     const [openAddModal, setOpenAddModal] = useState(false);
//     const [openEditModal, setOpenEditModal] = useState(false);
//     const [selectedRow, setSelectedRow] = useState({
//         id: 0,
//         title: '',
//         category: '',
//         description: '',
//     });
//     const [title, setTitle] = useState('');
//     const [category, setCategory] = useState('');
//     const [description, setDescription] = useState('');
//     const [userId, setUserId] = useState(null);

//     const {
//         data: coursesData,
//         isFetching,
//         isError,
//         refetch: refetchEvents,
//     } = useQuery({
//         queryKey: ['events'],
//         queryFn: async () =>
//             await axios.get('http://localhost:3001/api/admin/courses/', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             }),
//     });

//     const handleUpdateToDatabase = async (id: number, updatedRow: object) => {
//         try {
//             const response = await axios.put(
//                 `http://localhost:3001/api/admin/courses/${id}`,
//                 updatedRow,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 postSnackbar({
//                     children: 'Course updated successfully',
//                     severity: 'success',
//                 });
//             } else {
//                 return new Error('Error updating the course');
//             }
//         } catch (error: any) {
//             postSnackbar({ children: error.message, severity: 'error' });
//         }
//     };

//     const handleDeleteFromDatabase = async (id: number) => {
//         try {
//             const response = await axios.delete(
//                 `http://localhost:3001/api/admin/courses/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 postSnackbar({
//                     children: 'Course deleted successfully',
//                     severity: 'success',
//                 });
//             } else {
//                 return new Error('Error deleting the course');
//             }
//         } catch (error: any) {
//             postSnackbar({ children: error.message, severity: 'error' });
//         }
//     };

//     function EditToolbar() {
//         const handleClick = () => {
//             if (isFetching)
//                 return postSnackbar({
//                     children: 'Please wait for the data to load',
//                     severity: 'info',
//                 });
//             const id =
//                 Math.max(0, ...coursesData?.data.map((row: any) => row.id)) + 1;
//             setOpenAddModal(true);
//             setSelectedRow({ id });
//         };

//         return (
//             <GridToolbarContainer
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'end',
//                     gap: '1rem',
//                     alignItems: 'center',
//                     padding: '1rem',
//                 }}
//             >
//                 <IconButton
//                     onClick={() => {
//                         refetchEvents(),
//                             postSnackbar({
//                                 children: 'Courses refreshed',
//                                 severity: 'success',
//                             });
//                     }}
//                 >
//                     <RefreshIcon sx={{ fontSize: 25, color: 'black' }} />
//                 </IconButton>
//                 <Button
//                     text='Add record'
//                     startIcon={<AddIcon sx={{ fontSize: '25px !important' }} />}
//                     onClick={handleClick}
//                     sx={{
//                         backgroundColor: 'black',
//                         color: 'white',
//                         '&:hover': {
//                             backgroundColor: '#2a2a2a',
//                         },
//                     }}
//                 />
//             </GridToolbarContainer>
//         );
//     }

//     function ExpandableCell(param: any) {
//         const [expanded, setExpanded] = useState(false);
//         const length = 300;
//         return (
//             <div>
//                 {expanded ? param.value : param.value.slice(0, length)}
//                 &nbsp;
//                 {param.value.length > length && (
//                     <Link
//                         type='button'
//                         component='button'
//                         sx={{ fontSize: 'inherit' }}
//                         onClick={() => setExpanded(!expanded)}
//                     >
//                         {expanded ? 'view less' : 'view more'}
//                     </Link>
//                 )}
//             </div>
//         );
//     }

//     const handleDeleteClick = (id: number) => () => {
//         handleDeleteFromDatabase(id);
//     };

//     const columns = [
//         {
//             field: 'id',
//             headerName: 'ID',
//             width: 30,
//             maxWidth: 70,
//         },
//         {
//             field: 'title',
//             headerName: 'Title',
//             type: 'string',
//             width: 160,
//         },
//         {
//             field: 'category',
//             headerName: 'Category',
//             type: 'string',
//             maxWidth: 150,
//         },
//         {
//             field: 'description',
//             headerName: 'Description',
//             type: 'string',
//             flex: 1,
//             renderCell: (params: any) => <ExpandableCell {...params} />,
//         },

        
//         { field: 'createdAt', headerName: 'Created At', editable: false },
//         { field: 'updatedAt', headerName: 'Updated At', editable: false },
//         {
//             field: 'action',
//             type: 'actions',
//             headerName: 'Action',
//             cellClassName: 'actions',
//             getActions: ({ id }) => {
//                 const [dropdown, setDropdown] = useState(false);
//                 const buttons = [
//                     {
//                         name: 'Edit',
//                         action: () => handleOpenEditModal(id),
//                         icon: <EditIcon />,
//                     },
//                     {
//                         name: 'Delete',
//                         action: handleDeleteClick(id),
//                         icon: <DeleteIcon />,
//                     },
//                 ];

//                 const handleOpenDropdown = () => {
//                     setDropdown(!dropdown);
//                 };

//                 const handleWhenMouseLeave = () => {
//                     setDropdown(false);
//                 };

//                 return [
//                     <div key={'dropdown'}>
//                         <IconButton
//                             key={'IconButton'}
//                             onClick={handleOpenDropdown}
//                             sx={{
//                                 '&:focus': {
//                                     outline: 'none',
//                                 },
//                                 '&:hover': {
//                                     outline: 'none',
//                                 },
//                             }}
//                         >
//                             <MoreHoriz />
//                         </IconButton>
//                         <Dropdown
//                             key={'More'}
//                             dropdown={dropdown}
//                             onMouseDown={handleOpenDropdown}
//                             onMouseLeave={handleWhenMouseLeave}
//                             subitems={buttons}
//                             style={{
//                                 transform: 'translateX(-50%)',
//                             }}
//                         />
//                     </div>,
//                 ];
//             },
//         },
//     ];

//     const handleOpenEditModal = (id) => {
//         setOpenEditModal(true);
//         setSelectedRow(coursesData?.data.find((row) => row.id === id));
//         setTitle(coursesData?.data.find((row) => row.id === id).title);
//         setCategory(coursesData?.data.find((row) => row.id === id).category);
//         setDescription(
//             coursesData?.data.find((row) => row.id === id).description
//         );
//         setUserId(coursesData?.data.find((row) => row.id === id).userId);
//     };

//     const handleCloseModal = () => {
//         setOpenEditModal(false);
//         setOpenAddModal(false);
//         setSelectedRow({});
//         setTitle('');
//         setCategory('');
//         setDescription('');
//         setUserId(null);
//     };

//     const handleTitleChange = (courses) => {
//         setTitle(courses.target.value);
//     };

//     const handleCategoryChange = (courses) => {
//         setCategory(courses.target.value);
//     }

//     const handleDescriptionChange = (courses) => {
//         setDescription(courses.target.value);
//     };

//     const handleUserIdChange = (courses) => {
//         setUserId(courses.target.value);
//     };

//     const handleSubmitUpdate = (courses) => {
//         courses.preventDefault();
//         handleUpdateToDatabase(selectedRow.id, {
//             title,
//             category,
//             description,
//             userId,
//         });
//         refetchCourses();
//         setOpenEditModal(false);
//         setOpenAddModal(false);
//     };

//     return (
//         <>
//             {isError ? (
//                 <Alert severity='error'>Error fetching data</Alert>
//             ) : (
//                 <DataGrid
//                     rows={coursesData?.data || []}
//                     columns={columns}
//                     getEstimatedRowHeight={() => 100}
//                     getRowHeight={() => 'auto'}
//                     disableSelectionOnClick
//                     disableColumnResize
//                     loading={isFetching}
//                     initialState={{
//                         columns: {
//                             columnVisibilityModel: {
//                                 createdAt: false,
//                                 updatedAt: false,
//                             },
//                         },
//                     }}
//                     slots={{
//                         toolbar: EditToolbar,
//                     }}
//                     sx={{
//                         '& .MuiDataGrid-main': {
//                             borderTop: '1px solid #e0e0e0',
//                         },
//                         '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell':
//                             {
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                             },
//                         '& .actions': {
//                             display: 'flex',
//                             justifyContent: 'center',
//                             gap: '0.5rem',
//                         },
//                         '& .MuiDataGrid-cell': {
//                             '&:hover ': {
//                                 outline: 'none',
//                             },
//                             '&:focus': {
//                                 outline: 'none',
//                             },
//                         },
//                         '& .MuiDataGrid-cell--editing': {
//                             p: '0.3rem !important',
//                         },
//                     }}
//                 />
//             )}

//             <PopupModal
//                 open={openEditModal || openAddModal}
//                 handleClose={handleCloseModal}
//                 title='Edit User'
//                 sxBox={{
//                     backgroundColor: 'background.paper',
//                 }}
//             >
//                 <p
//                     style={{
//                         fontSize: '1.4rem',
//                         textTransform: 'capitalize',
//                     }}
//                 >
//                     {openEditModal ? `Update "${title}"` : 'Add Event'}
//                 </p>

//                 <form onSubmit={handleSubmitUpdate}>
//                     <Stack spacing={2} sx={{ width: '100%' }}>
//                         <TextField
//                             label='Title'
//                             variant='outlined'
//                             fullWidth
//                             size='small'
//                             value={title}
//                             onChange={handleTitleChange}
//                             autoFocus
//                         />
//                         <TextField
//                             label='Category'
//                             variant='outlined'
//                             fullWidth
//                             size='small'
//                             value={category}
//                             onChange={handleCategoryChange}
//                             autoFocus
//                         />
//                         <TextField
//                             label='Description'
//                             variant='outlined'
//                             fullWidth
//                             multiline
//                             maxRows={10}
//                             value={description}
//                             onChange={handleDescriptionChange}
//                         />
//                         <TextField
//                             label='User Id'
//                             variant='outlined'
//                             fullWidth
//                             size='small'
//                             value={userId}
//                             defaultValue={null}
//                             onChange={handleUserIdChange}
//                         />

//                         {(openEditModal && (
//                             <Button
//                                 text='Update'
//                                 type='submit'
//                                 fullWidth
//                                 onClick={handleSubmitUpdate}
//                                 sx={{
//                                     backgroundColor: 'black',
//                                     color: 'white',
//                                     '&:hover': {
//                                         backgroundColor: '#2a2a2a',
//                                     },
//                                 }}
//                             />
//                         )) || (
//                             <Button
//                                 text='Add'
//                                 type='submit'
//                                 fullWidth
//                                 onClick={handleSubmitUpdate}
//                                 sx={{
//                                     backgroundColor: 'black',
//                                     color: 'white',
//                                     '&:hover': {
//                                         backgroundColor: '#2a2a2a',
//                                     },
//                                 }}
//                             />
//                         )}
//                     </Stack>
//                 </form>
//             </PopupModal>
//         </>
//     );
// }
