import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface courses {
    title: string
    category: string
    description: string
}

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourses] = useState<courses | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            const response = await axios.get(`http://localhost:3001/api/admin/courses/${id}`);
            setCourses(response.data);
        }
        fetchCourses();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.category}</p>
            <p>{course.description}</p>
        </div>
    );
}
