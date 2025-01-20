export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserRolesDTO {
    roles: number[]
}

export interface UserAdressDTO {
    id: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
}