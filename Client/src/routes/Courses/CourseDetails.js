import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        async function fetchCourse() {
            const response = await axios.get(`http://localhost:3001/api/courses/${id}`);
            setCourse(response.data);
        }
        fetchCourse();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
        </div>
    );
}
