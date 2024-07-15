import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourses] = useState(null);

    useEffect(() => {
        async function fetchCourse() {
            const response = await axios.get(`http://localhost:3001/api/courses/${id}`);
            setCourses(response.data);
        }
        fetchCourse();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{course.
// @ts-ignore
            title}</h1>
            <p>{course.
// @ts-ignore
            description}</p>
        </div>
    );
}
