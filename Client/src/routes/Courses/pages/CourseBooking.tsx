import React, { FormEvent, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import images from '@/assets/Courses/Courses.jpg';
import styles from '@/routes/Courses/css/Courses.module.css';

const CourseBooking: React.FC = () => {
    const location = useLocation<{ courses: Course[] }>();
    const courses = location.state?.courses || [];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic
        alert('Course booked successfully!');
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.header}>
                <img src={images} className={styles.img} alt='Courses' />
                <div className={styles.header_details}>
                    <h1>Book a Course</h1>
                    <br />
                    <p className={styles.p}>
                        Fill out the form below to book your desired course.
                    </p>
                </div>
            </div>
            <Container
                maxWidth='sm'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                    <TextField
                        label='Name'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        required
                    />
                    <TextField
                        label='Email'
                        type='email'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        required
                    />
                    <TextField
                        label='Course Title'
                        type='title'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        required
                    />
                    <FormControl fullWidth margin='normal' required>
                        <InputLabel id='course-select-label'>
                            Course Category
                        </InputLabel>
                        <Select
                            labelId='course-select-label'
                            label='Course Category'
                            defaultValue={courses}
                        >
                            <MenuItem value={1}>Health & Wellness</MenuItem>
                            <MenuItem value={2}>Lifestyle & Leisure</MenuItem>
                            <MenuItem value={3}>Sports & Fitness</MenuItem>
                            <MenuItem value={4}>
                                Education & Enrichment
                            </MenuItem>
                            <MenuItem value={5}>Lifelong Learning</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label='Preferred Start Date'
                        type='date'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={styles.submitButton}
                    >
                        Book Course
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default CourseBooking;
