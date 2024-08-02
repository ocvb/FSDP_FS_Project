import axios from 'axios';

import {
    UsersDataResponse,
    EventsDataResponse,
    CoursesDataResponse,
    RewardsDataResponse,
    SupportDataResponse,
} from './ApiType';

export const callAPI = axios.create({
    baseURL: 'http://localhost:3001/api/',
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

export const fetchCourses = async () => {
    const response = await callAPI.get<CoursesDataResponse['data'][]>(
        '/api/admin/courses/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

export const fetchSupport = async () => {
    const response = await callAPI.get<SupportDataResponse['data'][]>(
        '/api/support/',
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
    const response = await callAPI.get('/api/skillshare/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

// Rewards endpoints
export const fetchRewards = async (): Promise<RewardsDataResponse[]> => {
    const response = await callAPI.get<RewardsDataResponse[]>('/rewards');
    return response.data;
};

export const fetchPopularRewards = async (): Promise<RewardsDataResponse[]> => {
    const response = await callAPI.get<RewardsDataResponse[]>(
        '/api/rewards/popular'
    );
    return response.data;
};

export const fetchRewardsByCategory = async (
    category: string
): Promise<RewardsDataResponse[]> => {
    const response = await callAPI.get<RewardsDataResponse[]>(
        `/api/rewards/category/${category}`
    );
    return response.data;
};

export const createReward = async (data: RewardsDataResponse) => {
    const response = await callAPI.post('/rewards', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const updateReward = async (id: number, data: RewardsDataResponse) => {
    const response = await callAPI.put(`/rewards/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const deleteReward = async (id: number) => {
    const response = await callAPI.delete(`/rewards/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
