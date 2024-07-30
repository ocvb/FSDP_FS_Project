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
    token?: string;
}

// export interface CoursesDataResponse {
//     status?: string;
//     data?: {
//         id?: number;
//         title?: string;
//         path?: string;
//         description?: string;
//         createdAt?: string;
//         updatedAt?: string;
//     };
//     token?: string;
// }
