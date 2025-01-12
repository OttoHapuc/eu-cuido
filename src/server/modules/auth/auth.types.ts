export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface UserRegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    user: User;
}

export interface AuthRequest {
    user?: User | null;
}
