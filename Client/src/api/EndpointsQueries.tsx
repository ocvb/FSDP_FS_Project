import axios from 'axios';

import { UsersDataResponse, EventsDataResponse } from './ApiType';

export const callAPI = axios.create({
    baseURL: 'http://localhost:3001/',
});

export const fetchUsers = async () => {
    const response = await callAPI.get<UsersDataResponse['data'][]>(
        '/api/admin/users/',
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
        '/api/admin/events/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};
