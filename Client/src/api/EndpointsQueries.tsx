import axios from 'axios';

import { UsersDataResponse, EventsDataResponse } from './ApiType';

export const fetchUsers = async () => {
    const response = await axios.get<UsersDataResponse['data'][]>(
        'http://localhost:3001/api/admin/users/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

export const fetchEvents = async () => {
    const response = await axios.get<EventsDataResponse['data'][]>(
        'http://localhost:3001/api/admin/events/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};
