import axios from 'axios';

export const fetchUsers = async () => {
    return await axios.get('http://localhost:3001/api/admin/users/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

export const fetchEvents = async () => {
    return await axios.get('http://localhost:3001/api/admin/events/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

export const fetchCourses = async() => {
    return await axios.get('http://localhost:3001/api/admin/courses/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};
