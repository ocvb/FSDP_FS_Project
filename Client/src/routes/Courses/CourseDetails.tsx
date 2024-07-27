import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchCourses } from '@/api/api';

export default function CourseDetails() {
    const { id } = useParams();
    const [Course, setCourses] = useState(null);

    useEffect(() => {
        async function fetchCourses() {
            const response = await axios.get(`http://localhost:3001/api/admin/courses/${id}`);
            setCourses(response.data);
        }
        fetchCourses();
    }, [id]);

    if (!Course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{Course.
// @ts-ignore
            title}</h1>
            <p>{Course.
// @ts-ignore
            category}</p>
            <p>{Course.
// @ts-ignore
            description}</p>
        </div>
    );
}
