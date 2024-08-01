import axios from 'axios';

import {
    UsersDataResponse,
    EventsDataResponse,
    CoursesDataResponse,
} from './ApiType';

export const callAPI = axios.create({
    baseURL: 'http://localhost:3001/api/',
});

export const fetchUsers = async () => {
    const response = await callAPI.get<UsersDataResponse['data'][]>(
        '/admin/users/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

export const fetchEvents = async () => {
    const response = await callAPI.get<EventsDataResponse['data'][]>(
        '/admin/events/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

export const fetchCourses = async () => {
    const response = await callAPI.get<CoursesDataResponse['data'][]>(
        '/admin/courses/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

// Non-admin endpoints
export const fetchSkillshare = async () => {
    const response = await callAPI.get('/skillshare/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
