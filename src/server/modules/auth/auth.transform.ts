import { User } from './auth.types';

export const userTransform = (user: User): Omit<User, 'password'> => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
