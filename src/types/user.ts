export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateUserPayload {
    name: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: Omit<User, "password">;
}