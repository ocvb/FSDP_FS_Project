import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import images from '@/assets/Courses/Courses.jpg';
import styles from '@/routes/Courses/css/Courses.module.css';

// Define the type for your course objects
interface Course {
    id: number;
    title: string;
    category: string;
    description: string;
}

// Function to fetch data from the API
const fetchCourses = async (): Promise<Course[]> => {
    try {
        const response = await fetch('/api/courses'); // Ensure this endpoint is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default function EducationEnrichment() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchCourses();
            setCourses(data); // Ensure the data structure matches your expectations
        };
        getData();
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.header}>
                <img src={images} className={styles.img} alt='Courses' />
                <div className={styles.header_details}>
                    <h1>Education & Enrichment</h1>
                    <br />
                    <p className={styles.p}>
                        These are the courses we have available for this category!
                    </p>
                </div>
            </div>
            <Container>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell>{course.id}</TableCell>
                                        <TableCell>{course.title}</TableCell>
                                        <TableCell>{course.category}</TableCell>
                                        <TableCell>{course.description}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No courses available
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
