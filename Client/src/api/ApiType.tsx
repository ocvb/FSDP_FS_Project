export interface UsersDataResponse {
    status?: string;
    data?: {
        id?: number;
        username?: string;
        password?: string;
        role?: string;
        createdAt?: string;
        updatedAt?: string;
    };
    token?: string;
}

export interface EventsDataResponse {
    status?: string;
    data?: {
        id?: number;
        title?: string;
        description?: string;
        location?: string;
        date?: string;
        price?: number;
        createdAt?: string;
        updatedAt?: string;
        userId?: number | null;
    };
    message?: string;
}

export interface CoursesDataResponse {
    status?: string;
    data?: {
        id?: number;
        title?: string;
        description?: string;
        category?: string;
    };
}

export interface CoursesDataResponse {
    status?: string;
    data?: {
        id?: number;
        title?: string;
        category?: string;
        description?: string;
    };
    token?: string;
}

export interface RewardsDataResponse {
    status?: string;
    data?: {
        id?: number;
        title?: string;
        description?: string;
        points?: number;
        claimed?: boolean;
        popular?: boolean;
        endDate?: string | null;
        imageUrl?: string;
        category?: string;
        createdAt?: string;
        updatedAt?: string;
    };
}

export interface SupportDataResponse {
    status?: string;
    data?: {
        id?: number;
        location?: string;
        urgency?: string;
        description?: string;
        createdAt?: string;
        updatedAt?: string;
    };
}
