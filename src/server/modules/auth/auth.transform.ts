import { User } from './auth.types';

export const userTransform = (user: User): Omit<User, 'password'> => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
