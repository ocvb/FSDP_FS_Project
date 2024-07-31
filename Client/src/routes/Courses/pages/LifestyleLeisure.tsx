import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import images from '@/assets/Courses/Courses.jpg';
import styles from '@/routes/Courses/css/Courses.module.css';
import axios from 'axios';
import { Query, useQuery } from '@tanstack/react-query';

// Define the type for your course objects
interface Course {
    title: string;
    category: string;
    description: string;
}

// Function to fetch data from the API
const fetchCoursesByCategory = async (category: string): Promise<Course[]> => {
    try {
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default function LifestyleLeisure() {
    const [courses, setCourses] = useState<Course[]>([]);

    const { data } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await axios.post(
                'http://localhost:3001/api/courses/category',
                { category: 'Lifestyle & Leisure' }
            ); // Ensure this endpoint is correct
            return response.data;
        },
    });

    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.header}>
                <img src={images} className={styles.img} alt='Courses' />
                <div className={styles.header_details}>
                    <h1>Lifestyle & Leisure</h1>
                    <br />
                    <p className={styles.p}>
                        These are the courses we have available for this
                        category!
                    </p>
                </div>
            </div>
            <Container>
                <TableContainer
                    component={Paper}
                    className={styles.tableContainer}
                >
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data != undefined ? (
                                data.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.title}</TableCell>
                                        <TableCell>{course.category}</TableCell>
                                        <TableCell>
                                            {course.description}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align='center'>
                                        No courses available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}
