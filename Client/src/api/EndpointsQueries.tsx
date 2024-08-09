import axios from 'axios';

import {
    UsersDataResponse,
    EventsDataResponse,
    CoursesDataResponse,
    SkillShareDataResponse,
    RewardsDataResponse,
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
    const response = await callAPI.get<CoursesDataResponse[]>(
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
    const response = await callAPI.get<SkillShareDataResponse>('/skillshare/', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

// Rewards endpoints
export const fetchRewards = async () => {
    const response = await callAPI.get<RewardsDataResponse>('/rewards');
    return response.data;
};

export const fetchPopularRewards = async () => {
    const response = await callAPI.get<RewardsDataResponse>('/rewards/popular');
    return response.data;
};

export const fetchRewardsByCategory = async (category: string) => {
    const response = await callAPI.get<RewardsDataResponse>(
        `/api/rewards/category/${category}`
    );
    return response.data;
};

export const createReward = async (data: RewardsDataResponse) => {
    const response = await callAPI.post<RewardsDataResponse>('/rewards', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const updateReward = async (id: number, data: RewardsDataResponse) => {
    const response = await callAPI.put<RewardsDataResponse>(
        `/rewards/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

export const deleteReward = async (id: number) => {
    const response = await callAPI.delete<RewardsDataResponse>(
        `/rewards/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};
