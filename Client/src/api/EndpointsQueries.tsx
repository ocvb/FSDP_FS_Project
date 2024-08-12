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

export const fetchRewardsByCategory = async (
    category: string
): Promise<RewardsDataResponse[]> => {
    const response = await callAPI.get<RewardsDataResponse[]>(
        `/rewards/category/${category}`
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

// Support APIs
// Fetch all support requests
export const fetchSupportRequests = async (): Promise<
    SupportDataResponse[]
> => {
    const response = await callAPI.get<SupportDataResponse[]>('/support');
    return response.data;
};

// Create a new support request
export const createSupportRequest = async (
    data: SupportDataResponse
): Promise<SupportDataResponse> => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await callAPI.post('/support', data, {
        headers, // Conditionally include the Authorization header
    });
    return response.data;
};

// Update an existing support request
export const updateSupportRequest = async (
    id: number,
    data: SupportDataResponse
): Promise<SupportDataResponse> => {
    const response = await callAPI.put(`/support/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

// Delete a support request
export const deleteSupportRequest = async (id: number): Promise<void> => {
    await callAPI.delete(`/support/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};
